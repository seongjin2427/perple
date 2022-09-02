import { Router } from 'express';
import { getUser, modifyUser, withDrawUser } from '@/src/controllers/user/user';
import isAuth from '@/src/utils/is-auth';

const router = Router();

// 로그인한 유저정보 불러오기
router.get('/', isAuth, getUser);

// 유저정보 수정
router.put('/', isAuth, modifyUser);

// 유저 탈퇴
router.post('/withdraw', isAuth, withDrawUser);

export default router;
