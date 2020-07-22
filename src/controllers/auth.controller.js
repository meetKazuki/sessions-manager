// import debug from 'debug';
import parser from 'ua-parser-js';
import { ApplicationError } from '../helpers/error';
import { generateToken } from '../helpers/auth';
import models from '../models';

const { User, Session } = models;

// const DEBUG = debug('dev');

export default {
  signup: async (request, response) => {
    const existingUser = await User.getExistingUser(request.body.email);
    if (existingUser) throw new ApplicationError(409, 'you are already registered');

    const user = await User.create(request.body);
    const token = generateToken(user);

    const uaParser = parser(request.headers['user-agent']);
    const userDevice = {
      deviceId: request.fingerprint.hash,
      deviceName: `${uaParser.os.name} ${uaParser.browser.name}`,
      location: `${request.ipInfo.city} ${request.ipInfo.country}`,
      ipAddress: `${request.ipInfo.ip}`,
    };

    const session = { userId: user.id, ...userDevice };
    await Session.create(session);

    return response.status(201).json({
      status: 'success',
      data: { user, session, token },
    });
  },

  signin: async (request, response) => {
    const { email, password } = request.body;

    const user = await User.getExistingUser(email);
    if (!user) throw new ApplicationError(401, 'email or password is incorrect');

    const isPassword = await user.validatePassword(password);
    if (!isPassword) {
      throw new ApplicationError(401, 'email or password is incorrect');
    }

    const token = generateToken(user);

    // search for device fingerprint in session table
    // if fingerprint does not exist, save device details plus new fingerprint in
    // the database as a new session for a user
    // else proceed and log in user
    const fingerPrint = request.fingerprint.hash;
    const getSession = await Session.findOne({ where: { deviceId: fingerPrint } });
    if (!getSession) {
      const uaParser = parser(request.headers['user-agent']);
      const userDevice = {
        deviceId: fingerPrint,
        deviceName: `${uaParser.os.name} ${uaParser.browser.name}`,
        location: `${request.ipInfo.city} ${request.ipInfo.country}`,
        ipAddress: `${request.ipInfo.ip}`,
      };
      const session = await Session.create({ userId: user.id, ...userDevice });

      // Here, you can probably send the login activity notification to the user

      return response.status(200).json({
        status: 'success',
        data: { user, session, token },
      });
    }

    return response.status(200).json({
      status: 'success',
      data: { user, token },
    });
  },
};
