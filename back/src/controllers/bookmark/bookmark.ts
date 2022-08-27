import Bookmark from '@/src/models/bookmark';
import { RequestHandler } from 'express';

export const getAllBookmark: RequestHandler = async (req, res, next) => {};

export const postBookmark: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const channelName = req.body.channelName;
  const description = req.body.description;
  const video_id = req.body.videoId;
  const thumbnailUrl = req.body.thumbnailUrl;
  const bookmark = new Bookmark({
    title,
    channelName,
    description,
    video_id,
    thumbnailUrl,
    userId: req.userInfo,
  });

  const result = await bookmark.save();
  console.log(result);
  res.redirect('/');
};
