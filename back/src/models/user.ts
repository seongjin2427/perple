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
  addBookmark(
    videoInfo: IVideoDocument,
    selectBookmarkId: string,
  ): { success: string[]; fail: string[] };
  removeBookmark(bookmarkId: string): void;
  removeYoutube(bookmarkId: string, videoId: string): void;
  modifyUser(userInfo: ModifiedUserInfoType): void;
  withDrawUser(): void;
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
  console.log('methods.removeBookmark');

  // ????????? ???????????? ??????
  const foundBookmark = await UserBookmarkModel.findByIdAndRemove(bookmarkId);

  // ?????? ????????? ??? ???????????? ????????? ????????? ????????? ??????
  foundBookmark?.videos.forEach(async ({ videoId }) => {
    const result = await UserBookmarkModel.find({
      videos: {
        $elemMatch: {
          videoId,
        },
      },
    }).exec();
    if (result.length <= 0) await Video.findByIdAndRemove(videoId);
  });

  // ?????? ????????? ??????
  const updatedBookmark = this.bookmarks.bookmark.filter(
    (bm: ObjectId) => bm.toString() !== bookmarkId.toString(),
  );
  this.bookmarks = { bookmark: updatedBookmark };
  this.save();
};

userSchema.methods.removeYoutube = async function (
  bookmarkId: string,
  videoId: string,
) {
  console.log('methods.removeYoutube');
  const foundBookmark = await UserBookmarkModel.findById(bookmarkId);
  const updateVideos = foundBookmark?.videos.filter(
    (vId) => vId.videoId.toString() !== videoId.toString(),
  );

  // ??????????????? ?????? ????????? ??????
  if (updateVideos) {
    foundBookmark!.count -= 1;
    foundBookmark!.videos = updateVideos;
    await foundBookmark!.save();
  }

  // ???????????? ???????????? ????????? ????????? ????????? ???????????? ??????
  const result = await UserBookmarkModel.find({
    videos: {
      $elemMatch: {
        videoId,
      },
    },
  }).exec();
  if (result.length <= 0) await Video.findByIdAndRemove(videoId);
};

interface ModifiedUserInfoType {
  nickname: string;
  profileImage: string;
}

userSchema.methods.modifyUser = async function ({
  nickname,
  profileImage,
}: ModifiedUserInfoType) {
  console.log('methods.modifyUser');
  this.profileImage = profileImage;
  this.nickname = nickname;

  await this.save();
};

userSchema.methods.withDrawUser = async function () {
  console.log('methods.withDrawUser');
  const bookmarks = this.bookmarks.bookmark;

  bookmarks.forEach(async (bm: ObjectId) => {
    const bookmark = await UserBookmarkModel.findByIdAndRemove(bm);

    await bookmark!.videos.forEach(async ({ videoId }) => {
      const result = await UserBookmarkModel.find({
        videos: {
          $elemMatch: {
            videoId,
          },
        },
      }).exec();
      if (result.length <= 0) await Video.findByIdAndRemove(videoId);
    });
  });

  await this.remove();
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
