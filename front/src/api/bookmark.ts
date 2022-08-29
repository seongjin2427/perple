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
  const { data } = await instance.get<getAllBookmarkResponseType>(
    '/bm/bookmark',
  );
  console.log('getAllBookmark', data);
  return data;
};

export const addBookmark = async (
  bookmarkInfo: BookmarkInfoType,
  selectBookmarkId: string[],
) => {
  const res = await instance.post('/bm/bookmark', {
    bookmarkInfo,
    selectBookmarkId,
  });
  console.log(res);
};

export const createBookmark = async (bookmarkTitle: string) => {
  const res = await instance.post('/bm/create/bookmark', { bookmarkTitle });
  console.log(res);
};
