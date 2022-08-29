import { createBookmark, getAllBookmark, addBookmark } from 'api/bookmark';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export interface BookmarkInfoType {
  videoId: string;
  title: string;
  channelName: string;
  description: string;
  thumbnailUrl: string;
}

export type BookmarkType = {
  bookmarkName: string;
  _id: string;
  count: number;
}[];

interface UseBookmarkActionType {
  onChangeBookmarkCheck: (idx: string) => void;
  onClickConfirmAddBookmark: (videoInfo: BookmarkInfoType) => void;
  onClickCreateBookmark: (bookmark: string) => void;
}

const useBookmark = (): [BookmarkType, UseBookmarkActionType] => {
  const isAuth = useSelector(({ global }: RootState) => global.isLogin);
  const [bookmarkList, setBookmarkList] = useState<BookmarkType>([]);
  const [addBookmarkList, setAddBookmarkList] = useState<string[]>([]);

  const getBookmarkList = async () => {
    const fetchedBookmark = await getAllBookmark();
    if (fetchedBookmark) setBookmarkList(fetchedBookmark.bookmark);
  };

  useEffect(() => {
    if (isAuth) getBookmarkList();
  }, [isAuth]);

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
  };

  return [bookmarkList, actions];
};

export default useBookmark;
