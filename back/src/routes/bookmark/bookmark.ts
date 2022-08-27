import { postBookmark } from '@/src/controllers/bookmark/bookmark';
import isAuth from '@/src/utils/is-auth';
import { Router } from 'express';

const router = Router();

router.get('/get-bookmark');
router.post('/post-bookmark', isAuth, postBookmark);

export default router;
