import { IVideoDocument } from '@/src/models/video';
import { Schema, Document, Model, ObjectId, model } from 'mongoose';

export interface IUserBookmark {
  bookmarkId: ObjectId;
  bookmarkName: string;
  count: number;
  _id: ObjectId;
  videos: {
    videoId: ObjectId;
  }[];
}

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
      required: true,
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
          bookmarkName: {
            type: String,
            required: true,
          },
          count: { type: Number, required: true },
          videos: [
            {
              videosId: {
                type: Schema.Types.ObjectId,
                ref: 'Videos',
              },
            },
          ],
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
  const updatedBookmarks = [...this.bookmarks.bookmark];
  updatedBookmarks.push({
    bookmarkName: title,
    count: 0,
  });

  this.bookmarks = { bookmark: updatedBookmarks };

  return this.save();
};

userSchema.methods.addBookmark = async function (
  videoInfo: IVideoDocument,
  selectBookmarkId: string[],
) {
  const updatedBookmark = [...this.bookmarks.bookmark];

  const selectBookmark = selectBookmarkId.map((id: string) => {
    return updatedBookmark.findIndex(
      (bm: IUserBookmark) => bm._id.toString() === id.toString(),
    );
  });

  selectBookmark.forEach((index) => {
    const existedVideo = updatedBookmark[index].videos.findIndex(
      (bm: { videosId: ObjectId }) => {
        return bm.videosId.toString() === videoInfo._id.toString();
      },
    );

    if (existedVideo < 0) {
      updatedBookmark[index].videos.push({ videosId: videoInfo._id });
    }
  });

  const updateBookmark = {
    bookmark: updatedBookmark,
  };

  this.bookmarks = updateBookmark;
  this.save();
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
