import { Schema, Document, Model, ObjectId, model } from 'mongoose';
import { IVideoDocument } from '@/src/models/video';
import { IUserBookmark, UserBookmarkModel } from '@/src/models/userBookmark';

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
  test(test: string): void;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema<IUserDocument, IUserDocument, IUserModel> = new Schema(
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

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
