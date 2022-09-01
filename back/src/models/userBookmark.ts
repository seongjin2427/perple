import { Schema, Document, Model, ObjectId, model } from 'mongoose';

export interface IUserBookmark {
  userId: ObjectId;
  bookmarkName: string;
  count: number;
  videos: {
    videoId: ObjectId;
  }[];
}

export interface IUserBookmarkDocument extends IUserBookmark, Document {
  filterBookmarkDontHaveVideo: (videoId: string) => IUserBookmarkDocument[];
}

interface IUserBookmarkModel extends Model<IUserBookmarkDocument> {}

const userBookmarkSchema: Schema<
  IUserBookmarkDocument,
  {},
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

userBookmarkSchema.methods.filterBookmarkDontHaveVideo = async function (
  videoId: string,
) {
  const filteredBookmarks = this.find({
    videos: { $nin: videoId },
  });
  console.log('filteredBookmarks', filteredBookmarks);
};

export const UserBookmarkModel = model<
  IUserBookmarkDocument,
  IUserBookmarkModel
>('UserBookmark', userBookmarkSchema);
