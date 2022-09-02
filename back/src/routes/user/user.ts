import { Router } from 'express';
import { getUser, modifyUser } from '@/src/controllers/user/user';
import isAuth from '@/src/utils/is-auth';

const router = Router();

// 로그인한 유저정보 불러오기
router.get('/', isAuth, getUser);

router.put('/', isAuth, modifyUser);

export default router;
