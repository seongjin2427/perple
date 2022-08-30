import {
  createBookmark,
  getAllBookmark,
  addBookmark,
} from '@/src/controllers/bookmark/bookmark';
import isAuth from '@/src/utils/is-auth';
import { Router } from 'express';

const router = Router();

router.post('/create/bookmark', isAuth, createBookmark);
router.get('/bookmark', isAuth, getAllBookmark);
router.post('/bookmark', isAuth, addBookmark);

export default router;
