import { Router } from 'express';

import userRoutes from './user/user';
import googleRoutes from './user/google';

const router = Router();

router.use('/user', userRoutes);
router.use('/auth/google', googleRoutes);

export default router;
