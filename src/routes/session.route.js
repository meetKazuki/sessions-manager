import { Router } from 'express';
import asyncWrapper from '../middleware/asyncWrapper';
import sessionController from '../controllers/session.controller';
import sessionSchema from '../validations/session.validator';
import authentication from '../middleware/auth';
import validator from '../middleware/validator';

const router = Router();

const { verifyToken } = authentication;
const { getAllSessions, logoutSession, logoutAllSessions } = sessionController;
const { logoutSchema } = sessionSchema;

router.get(
  '/',
  verifyToken,
  asyncWrapper(getAllSessions),
);

router.delete(
  '/',
  verifyToken,
  asyncWrapper(logoutAllSessions),
);

router.delete(
  '/:sessionId',
  verifyToken,
  validator(logoutSchema),
  asyncWrapper(logoutSession),
);

export default router;
