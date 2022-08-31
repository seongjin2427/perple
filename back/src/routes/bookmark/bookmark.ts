import {
  createBookmark,
  getAllBookmark,
  addBookmark,
  modifyTitleName,
  removeBookmark,
} from '@/src/controllers/bookmark/bookmark';
import isAuth from '@/src/utils/is-auth';
import { Router } from 'express';

const router = Router();

// 북마크 생성하기
router.post('/create/bookmark', isAuth, createBookmark);

// 로그인한 사용자의 모든 북마크 정보 가져오기
router.get('/bookmark', isAuth, getAllBookmark);

// 북마크 내 유튜브 정보 추가하기
router.post('/bookmark', isAuth, addBookmark);

// 북마크 타이틀 수정하기
router.put('/modify/bookmark-name', isAuth, modifyTitleName);

// 북마크 삭제하기
router.delete('/remove/:bookmarkId', isAuth, removeBookmark);

export default router;
