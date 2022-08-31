import { Schema, Document, Model, ObjectId, model } from 'mongoose';

export interface IUserBookmark {
  userId: ObjectId;
  bookmarkName: string;
  count: number;
  videos: {
    videoId: ObjectId;
  }[];
}

export interface IUserBookmarkDocument extends IUserBookmark, Document {}

interface IUserBookmarkModel extends Model<IUserBookmark> {}

const userBookmarkSchema: Schema<
  IUserBookmarkDocument,
  IUserBookmarkDocument,
  IUserBookmarkModel
> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  bookmarkName: {
    type: String,
    required: true,
  },
  count: Number,
  videos: [
    {
      videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    },
  ],
});

export const UserBookmarkModel = model<
  IUserBookmarkDocument,
  IUserBookmarkModel
>('UserBookmark', userBookmarkSchema);
