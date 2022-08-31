import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store/store';
import {
  createBookmark,
  getAllBookmark,
  addBookmark,
  BookmarkType,
} from 'api/bookmark';

export interface BookmarkInfoType {
  videoId: string;
  title: string;
  channelName: string;
  description: string;
  thumbnailUrl: string;
}

export interface UseBookmarkActionType {
  onChangeBookmarkCheck: (idx: string) => void;
  onClickConfirmAddBookmark: (videoInfo: BookmarkInfoType) => void;
  onClickCreateBookmark: (bookmark: string) => void;
  onClickRemoveBookmark: (id: string) => void;
}

const useBookmark = (
  options?: 'true',
): [BookmarkType[], UseBookmarkActionType] => {
  const isAuth = useSelector(({ global }: RootState) => global.isLogin);
  const [bookmarkList, setBookmarkList] = useState<BookmarkType[]>([]);
  const [addBookmarkList, setAddBookmarkList] = useState<string[]>([]);

  const getBookmarkList = async (option?: string) => {
    const fetchedBookmark = await getAllBookmark(option || '');
    if (fetchedBookmark) setBookmarkList(fetchedBookmark.bookmark);
  };

  useEffect(() => {
    if (isAuth) getBookmarkList(options);
  }, [isAuth, options]);

  const actions = {
    onChangeBookmarkCheck: function (idx: string) {
      const selectedId = bookmarkList.filter(({ _id }) => _id === idx)[0]._id;

      if (addBookmarkList.includes(selectedId))
        setAddBookmarkList(() =>
          addBookmarkList.filter((id) => id !== selectedId),
        );
      else setAddBookmarkList((prev) => [selectedId, ...prev]);
    },
    onClickConfirmAddBookmark: async function (videoInfo: BookmarkInfoType) {
      if (addBookmarkList.length > 0)
        await addBookmark(videoInfo, addBookmarkList);
    },
    onClickCreateBookmark: async function (bookmarkTitle: string) {
      await createBookmark(bookmarkTitle);
      await getBookmarkList();
    },
    onClickRemoveBookmark: async function (id: string) {
      const removedBookmarkList = bookmarkList.filter((bm) => bm._id !== id);
      setBookmarkList(removedBookmarkList);
      await getBookmarkList('true');
    },
  };

  return [bookmarkList, actions];
};

export default useBookmark;
