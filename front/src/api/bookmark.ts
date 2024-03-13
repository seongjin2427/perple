import instance from 'api/instance';
import { BookmarkInfoType } from 'hooks/useBookmark';

export interface BookmarkVideoInfoType {
  _id: string;
  videoId: string;
  channelName: string;
  description: string;
  thumbnailUrl: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkType {
  bookmarkName: string;
  _id: string;
  count: number;
  videos: {
    videoId: BookmarkVideoInfoType;
  }[];
}

interface getAllBookmarkResponseType {
  bookmark: BookmarkType[];
}

export const getAllBookmark = async (option: string) => {
  try {
    const { data } = await instance.get<getAllBookmarkResponseType>(
      `/bm/bookmark/?deep=${option}`,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const addBookmark = async (
  bookmarkInfo: BookmarkInfoType,
  selectBookmarkId: string[],
) => {
  try {
    const res = await instance.post('/bm/bookmark', {
      bookmarkInfo,
      selectBookmarkId,
    });
    if (res.status === 200) alert('등록 완료!');
  } catch (e) {
    console.log(e);
  }
};

export const createBookmark = async (bookmarkTitle: string) => {
  try {
    await instance.post('/bm/create/bookmark', { bookmarkTitle });
  } catch (e) {
    console.log(e);
  }
};

export const modifyBookmarkNameApi = async (id: string, title: string) => {
  try {
    const res = await instance.put(`/bm/modify/bookmark-name`, { id, title });
    return res.data.message;
  } catch (e) {
    console.log(e);
  }
};

export const removeBookmarkApi = async (id: string) => {
  try {
    const res = await instance.delete(`/bm/remove/${id}`);
    return res.data.message;
  } catch (e) {
    console.log(e);
  }
};

export const removeYoutubeApi = async (bookmarkId: string, videoId: string) => {
  try {
    const { data } = await instance.delete(
      `/bm/remove-youtube/${bookmarkId}/${videoId}`,
    );
    return data.message;
  } catch (e) {
    console.log(e);
  }
};
