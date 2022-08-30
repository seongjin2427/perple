import { Router } from 'express';
import { getUser } from '@/src/controllers/user/user';
import isAuth from '@/src/utils/is-auth';

const router = Router();

router.get('/', isAuth, getUser);

export default router;
