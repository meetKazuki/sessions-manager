import { ApplicationError, NotFoundError } from '../helpers/error';
import models from '../models';
import paginator from '../helpers/paginator';

const { Session } = models;

export default {
  getAllSessions: async (request, response) => {
    const { user, query: { page = 1, limit = 10 } } = request;
    const { data, count } = await paginator(Session, {
      where: { userId: user.id },
      page,
      limit,
    });

    return response.status(200).json({
      status: 'success',
      message: 'sessions retrieved for user',
      sessions: data,
      count,
      page: +page,
      limit: +limit,
    });
  },

  logoutSession: async (request, response) => {
    const { user, params: { sessionId } } = request;

    const session = await Session.findByPk(sessionId);
    if (!session) {
      throw new NotFoundError(`session with ${sessionId} does not exist`);
    }
    if (session.userId !== user.id) {
      throw ApplicationError(403, 'operation is forbidden');
    }

    await Session.destroy({ where: { id: sessionId } });

    return response.status(200).json({
      status: 'success',
      message: 'session has been logged-out',
    });
  },
};
