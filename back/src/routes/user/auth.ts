import { Router } from 'express';
import {
  getGoogleCode,
  getGoogleToken,
  getToken,
  userLogout,
} from '@/src/controllers/user/auth';

const router = Router();

router.post('/logout', userLogout);
router.post('/token', getToken);

router.get('/google', getGoogleCode);
router.get('/google/callback', getGoogleToken);

export default router;
