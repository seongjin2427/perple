import { RequestHandler } from "express";

import Video from "@/src/models/video";
import { UserBookmarkModel } from "@/src/models/userBookmark";

export const createBookmark: RequestHandler = async (req, res, next) => {
  console.log("createBookmark");
  const bookmarkTitle = req.body.bookmarkTitle;

  const user = await req.userInfo?.createBookmark(bookmarkTitle);

  res.status(200).json({ bookmark: user?.bookmarks.bookmark });
};

export const getAllBookmark: RequestHandler = async (req, res, next) => {
  console.log("getAllBookmark");
  const deepPopulate = req.query.deep;
  let user;
  if (deepPopulate === "true") {
    user = await req.userInfo?.populate({
      path: "bookmarks.bookmark",
      populate: {
        path: "videos.videoId",
        model: Video,
      },
    });
  } else {
    user = await req.userInfo?.populate({
      path: "bookmarks.bookmark",
      populate: {
        path: "videos.videoId",
        model: Video,
        select: "videoId",
      },
    });
  }

  console.log(user?.bookmarks.bookmark[0].videos);

  res.status(200).json({ bookmark: user?.bookmarks.bookmark });
};

export const addBookmark: RequestHandler = async (req, res, next) => {
  console.log("addBookmark");

  const selectBookmarkId = req.body.selectBookmarkId;
  if (!selectBookmarkId.length) {
    return res.status(400).json({ message: "북마크를 선택하세요!" });
  }

  const videoId = req.body.bookmarkInfo.videoId;

  const existedVideo = await Video.findOne({
    videoId,
  });

  if (existedVideo) {
    await req.userInfo?.addBookmark(existedVideo, selectBookmarkId);
  } else {
    const title = req.body.bookmarkInfo.title;
    const channelName = req.body.bookmarkInfo.channelName;
    const description = req.body.bookmarkInfo.description;
    const thumbnailUrl = req.body.bookmarkInfo.thumbnailUrl;
    const video = new Video({
      videoId,
      title,
      channelName,
      description,
      thumbnailUrl,
    });
    await video.save();
    await req.userInfo?.addBookmark(video, selectBookmarkId);
  }
  return res.status(200).json({ message: "성공!" });
};

export const removeBookmark: RequestHandler = async (req, res, next) => {
  console.log("removeBookmark");

  const id = req.params.bookmarkId;
  await req.userInfo?.removeBookmark(id);

  res.status(200).json({ message: "삭제 완료!" });
};

export const modifyTitleName: RequestHandler = async (req, res, next) => {
  console.log("modifyTitleName");
  const { id, title } = req.body;
  const result = await UserBookmarkModel.findByIdAndUpdate(id, {
    $set: {
      bookmarkName: title,
    },
  });
  console.log(result);
  res.status(200).json({ message: "업데이트 완료!" });
};

export const removeYoutube: RequestHandler = async (req, res, next) => {
  console.log("removeYoutube");

  const bookmarkId = req.params.bookmarkId;
  const videoId = req.params.videoId;

  await req.userInfo?.removeYoutube(bookmarkId, videoId);

  res.status(200).json({ message: "삭제 완료!" });
};
