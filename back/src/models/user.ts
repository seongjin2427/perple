import { Schema, Document, Model, ObjectId, model } from 'mongoose';

import { IUserBookmark, UserBookmarkModel } from '@/src/models/userBookmark';
import Video, { IVideoDocument } from '@/src/models/video';
import video from '@/src/models/video';

interface IUser {
  snsId: string;
  email: string;
  nickname: string;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
  type: string;
  bookmarks: {
    bookmark: IUserBookmark[];
  };
}
export interface IUserDocument extends IUser, Document {
  modifyUser(userInfo: ModifiedUserInfoType): void;
  createBookmark(title: string): IUserDocument;
  addBookmark(
    videoInfo: IVideoDocument,
    selectBookmarkId: string,
  ): { success: string[]; fail: string[] };
  removeBookmark(bookmarkId: string): void;
  removeYoutube(bookmarkId: string, videoId: string): void;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema<IUserDocument, {}, IUserModel> = new Schema(
  {
    snsId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    nickname: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    bookmarks: {
      bookmark: [
        {
          type: Schema.Types.ObjectId,
          ref: 'UserBookmark',
        },
      ],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

userSchema.methods.createBookmark = async function (title: string) {
  console.log('methods.createBookmark');
  const result = await UserBookmarkModel.create({
    bookmarkName: title,
    count: 0,
    videos: [],
    userId: this._id,
  });
  await result.save();

  this.bookmarks.bookmark.push(result);
  return this.save();
};

userSchema.methods.addBookmark = async function (
  videoInfo: IVideoDocument,
  selectBookmarkId: string[],
) {
  console.log('methods.addBookmark');

  await selectBookmarkId.forEach(async (bmId: string) => {
    const foundBookmark = await UserBookmarkModel.findById(bmId);
    const existedVideo = foundBookmark?.videos.findIndex(
      (v) => v.videoId.toString() === videoInfo._id.toString(),
    );

    if (0 > existedVideo!) {
      foundBookmark!.videos.push({ videoId: videoInfo._id });
      foundBookmark!.count += 1;
      await foundBookmark?.save();
    }
  });
};

userSchema.methods.removeBookmark = async function (bookmarkId: string) {
  const foundBookmark = await UserBookmarkModel.findById(bookmarkId);
  foundBookmark?.videos.forEach(async ({ videoId }) => {
    const result = await UserBookmarkModel.findOne(videoId);
    if (!result) await Video.findByIdAndRemove(videoId);
  });

  // 유저 북마크 삭제
  const updatedBookmark = this.bookmarks.bookmark.filter(
    (bm: ObjectId) => bm.toString() !== bookmarkId.toString(),
  );
  this.bookmarks = { bookmark: updatedBookmark };
  this.save();

  // 북마크 도큐먼트 삭제
  await UserBookmarkModel.findByIdAndRemove(bookmarkId);
};

userSchema.methods.removeYoutube = async function (
  bookmarkId: string,
  videoId: string,
) {
  const foundBookmark = await UserBookmarkModel.findById(bookmarkId);
  const updateVideos = foundBookmark?.videos.filter(
    (vId) => vId.videoId.toString() !== videoId.toString(),
  );

  // 북마크에서 해당 유튜브 삭제
  if (updateVideos) {
    foundBookmark!.count -= 1;
    foundBookmark!.videos = updateVideos;
    foundBookmark!.save();
  }

  // 북마크에 남아있는 유튜브 영상이 없다면 유튜브도 삭제
  const foundVideo = await Video.findById(videoId);
  const result = await UserBookmarkModel.findOne(foundVideo!._id);
  if (!result) await Video.findByIdAndRemove(videoId);
};

interface ModifiedUserInfoType {
  nickname: string;
  profileImage: string;
}

userSchema.methods.modifyUser = async function ({
  nickname,
  profileImage,
}: ModifiedUserInfoType) {
  this.profileImage = profileImage;
  this.nickname = nickname;

  await this.save();
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
