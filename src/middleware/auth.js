import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { ApplicationError } from '../helpers/error';
import { User } from '../models';

config();

export default {
/**
   * Verify Token
   *
   * @param {Object} request - the request object
   * @param {Object} response - express response object
   * @param {Function} next
   *
   * @returns {void} - undefined
   */
  /* verifyToken: async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader === '') throw new ApplicationError(400, 'No token provided. Please signup or login');

    if (!authHeader) throw new ApplicationError(412, 'Authorization header not set');

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
      if (error) return next(new ApplicationError(401, `${error.message}`));

      const { id: userId } = decodedToken;
      const user = await User.findByPk(userId);

      if (!user) return next(new ApplicationError(403, 'Invalid credentials'));

      request.user = user;

      return next();
    });
  }, */

  verifyToken: (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new ApplicationError(412, 'Authorization header not set');

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
      if (error) return next(new ApplicationError(401, `${error.message}`));

      const { id } = decodedToken;
      const user = await User.findByPk(id);
      if (!user) return next(new ApplicationError(403, 'Invalid credentials'));

      request.user = user;

      return next();
    });
  },
};
