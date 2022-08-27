import mongoose, { Schema, Document, Model } from 'mongoose';

interface IBookmark {
  title: string;
  channel_name: string;
  description: string;
  video_id: string;
  thumbnail_url: string;
}

export interface IBookmarkDocument extends IBookmark, Document {}

interface IBookmarkModel extends Model<IBookmarkDocument> {}

const bookmarkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

export default mongoose.model<IBookmarkDocument, IBookmarkModel>(
  'Bookmark',
  bookmarkSchema,
);
