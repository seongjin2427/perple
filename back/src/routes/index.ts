import { Router } from 'express';

import userRoutes from './user/user';
import authRoutes from './user/auth';
import bookmarkRoutes from './bookmark/bookmark';

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/bm', bookmarkRoutes);

export default router;
