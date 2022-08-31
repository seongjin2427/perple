import { Schema, Document, Model, ObjectId, model } from 'mongoose';

import { IUserBookmark, UserBookmarkModel } from '@/src/models/userBookmark';
import Video, { IVideoDocument } from '@/src/models/video';

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
  createBookmark(title: string): IUserDocument;
  addBookmark(videoInfo: IVideoDocument, selectBookmarkId: string): string;
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

  await selectBookmarkId.forEach(async (id: string) => {
    const foundBookmark = await UserBookmarkModel.findById(id);

    const existedVideo = foundBookmark?.videos.findIndex(
      (v) => v.videoId.toString() === videoInfo._id.toString(),
    );

    if (existedVideo! < 0) {
      foundBookmark!.videos.push({ videoId: videoInfo._id });
      foundBookmark!.count += 1;
      await foundBookmark?.save();
    }
  });
};

userSchema.methods.removeBookmark = async function (bookmarkId: string) {
  const updatedBookmark = this.bookmarks.bookmark.filter(
    (bm: ObjectId) => bm.toString() !== bookmarkId.toString(),
  );
  this.bookmarks = { bookmark: updatedBookmark };
  this.save();

  await UserBookmarkModel.findByIdAndRemove(bookmarkId);
};

userSchema.methods.removeYoutube = async function (
  bookmarkId: string,
  videoId: string,
) {
  const foundBookmark = await UserBookmarkModel.findById(bookmarkId);
  const updateBookmark = foundBookmark?.videos.filter(
    (vId) => vId.videoId.toString() !== videoId.toString(),
  );
  foundBookmark!.count -= 1;

  if (updateBookmark) foundBookmark!.videos = updateBookmark;
  foundBookmark!.save();

  await Video.findByIdAndRemove(videoId);
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
