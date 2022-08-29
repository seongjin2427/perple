import User, { IUserBookmark, IUserDocument } from '@/src/models/user';
import Video from '@/src/models/video';
import { RequestHandler } from 'express';

export const getAllBookmark: RequestHandler = async (req, res, next) => {
  console.log('getAllBookmark');
  const user = await req.userInfo?.populate<IUserDocument>('bookmarks');

  res.status(200).json({ bookmark: user?.bookmarks.bookmark });
};

export const createBookmark: RequestHandler = async (req, res, next) => {
  console.log('createBookmark');
  const bookmarkTitle = req.body.bookmarkTitle;

  const user = await req.userInfo?.createBookmark(bookmarkTitle);

  res.status(200).json({ bookmark: user?.bookmarks.bookmark });
};

export const addBookmark: RequestHandler = async (req, res, next) => {
  console.log('addBookmark');

  const selectBookmarkId = req.body.selectBookmarkId;
  if (!selectBookmarkId.length) {
    return res.status(400).json({ message: '북마크를 선택하세요!' });
  }

  const title = req.body.bookmarkInfo.title;
  const channelName = req.body.bookmarkInfo.channelName;
  const description = req.body.bookmarkInfo.description;
  const videoId = req.body.bookmarkInfo.videoId;
  const thumbnailUrl = req.body.bookmarkInfo.thumbnailUrl;
  const video = new Video({
    title,
    channelName,
    description,
    videoId,
    thumbnailUrl,
    userId: req.userInfo,
  });

  const existedVideo = await Video.findOne({
    videoId,
  });

  if (existedVideo) {
    await req.userInfo?.addBookmark(existedVideo, selectBookmarkId);
  } else {
    const result = await video.save();
    await req.userInfo?.addBookmark(result, selectBookmarkId);
  }
  res.status(200).json({ message: '등록 성공!' });
};
