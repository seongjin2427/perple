import { getUser } from '@/src/controllers/user/user';
import { Router } from 'express';

const router = Router();

router.get('/', getUser);

export default router;
