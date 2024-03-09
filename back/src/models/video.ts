import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

interface IVideo {
  title: string;
  channel_name: string;
  description: string;
  video_id: string;
  thumbnail_url: string;
}

export interface IVideoDocument extends IVideo, Document {}

interface IVideoModel extends Model<IVideoDocument> {
  findByIdAndRemove: (videoId: Schema.Types.ObjectId | string) => IVideo;
}

const videoSchema = new Schema(
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
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export default mongoose.model<IVideoDocument, IVideoModel>(
  "Video",
  videoSchema
);
