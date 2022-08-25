import { Router } from 'express';

import userRoutes from './user/user';
import authRoutes from './user/auth';

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;
