import { Router } from 'express';
import {
  getGoogleCode,
  getGoogleToken,
  getToken,
} from '@/src/controllers/user/auth';

const router = Router();

router.post('/token', getToken);

router.get('/google', getGoogleCode);
router.get('/google/callback', getGoogleToken);

export default router;
