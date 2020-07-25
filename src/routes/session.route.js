import { Router } from 'express';
import asyncWrapper from '../middleware/asyncWrapper';
import sessionController from '../controllers/session.controller';
import sessionSchema from '../validations/session.validator';
import authentication from '../middleware/auth';
import validator from '../middleware/validator';

const router = Router();

const { verifyToken } = authentication;
const { getAllSessions, logoutSession } = sessionController;
const { logoutSchema } = sessionSchema;

router.post(
  '/:sessionId',
  verifyToken,
  validator(logoutSchema),
  asyncWrapper(logoutSession),
);

router.get(
  '/',
  verifyToken,
  asyncWrapper(getAllSessions),
);

export default router;
