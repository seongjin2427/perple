import instance from 'api/instance';
import { BookmarkInfoType } from 'hooks/useBookmark';

interface getAllBookmarkResponseType {
  bookmark: {
    bookmarkName: string;
    _id: string;
    count: number;
  }[];
}

export const getAllBookmark = async () => {
  try {
    const { data } = await instance.get<getAllBookmarkResponseType>(
      '/bm/bookmark',
    );
    console.log('getAllBookmark', data);
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
    console.log(res);
    if (res.status === 200) alert('등록 완료!');
  } catch (e) {
    console.log(e);
  }
};

export const createBookmark = async (bookmarkTitle: string) => {
  try {
    const res = await instance.post('/bm/create/bookmark', { bookmarkTitle });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
