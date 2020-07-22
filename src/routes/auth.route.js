import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authSchema from '../validations/auth.validations';
import asyncWrapper from '../middleware/asyncWrapper';
import validator from '../middleware/validator';

const router = Router();

const { signup, signin } = authController;
const { signupSchema, signinSchema } = authSchema;

router.post(
  '/signup',
  validator(signupSchema),
  asyncWrapper(signup),
);

router.post(
  '/signin',
  validator(signinSchema),
  asyncWrapper(signin),
);

export default router;
