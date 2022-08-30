import { Schema, Document, Model, ObjectId, model } from 'mongoose';

export interface IUserBookmark {
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
