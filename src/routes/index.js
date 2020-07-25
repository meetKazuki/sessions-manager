import { Router } from 'express';
import authRoutes from './auth.route';
import sessionRoutes from './session.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user/sessions', sessionRoutes);

export default router;
