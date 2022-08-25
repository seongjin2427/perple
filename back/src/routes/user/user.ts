import { getUser } from '@/src/controllers/user/user';
import isAuth from '@/src/utils/is-auth';
import { Router } from 'express';

const router = Router();

router.get('/', isAuth, getUser);

export default router;
