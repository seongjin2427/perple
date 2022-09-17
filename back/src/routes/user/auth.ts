import { Router } from 'express';
import {
  getGoogleCode,
  getGoogleToken,
  getToken,
  userLogout,
} from '@/src/controllers/user/auth';

const router = Router();

// 유저 로그아웃
router.post('/logout', userLogout);

// Access token 요청
router.post('/token', getToken);

// 구글 로그인해서 코드 받기
router.get('/google', getGoogleCode);

// 구글 Access Token 받기
router.get('/google/callback', getGoogleToken);

export default router;
