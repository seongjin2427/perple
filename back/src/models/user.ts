import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser {
  snsId: string;
  email: string;
  nickname: string;
  profileImage: string;
  types: string;
}

export interface IUserDocument extends IUser, Document {}

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema(
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
    bookmarks: {
      bookmark: [
        {
          bookmarkId: {
            type: Schema.Types.ObjectId,
            ref: 'Bookmark',
            required: true,
          },
          count: { type: Number, required: true },
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

export default mongoose.model<IUserDocument, IUserModel>('User', userSchema);
