import { useEffect, useState } from 'react';

const dummyBookmark = [
  {
    _id: '1',
    title: '안녕하세요',
    count: 5,
  },
  {
    _id: '2',
    title: '북마크입니다.',
    count: 4,
  },
];

export type BookmarkType = {
  _id: string;
  title: string;
  count: number;
}[];

interface UseBookmarkActionType {
  onChangeBookmarkCheck: (idx: number) => void;
  onClickConfirmAddBookmark: () => void;
}

const useBookmark = (): [BookmarkType, UseBookmarkActionType] => {
  // const [bookmarkList, setBookmarkList] = useState<BookmarkType>(dummyBookmark);
  const [bookmarkList, setBookmarkList] = useState<BookmarkType>([]);
  const [addBookmarkList, setAddBookmarkList] = useState<string[]>([]);

  // useEffect(() => {
  //   setBookmarkList()
  // }, [])

  const actions = {
    onChangeBookmarkCheck: function (idx: number) {
      const bookmarkId = bookmarkList.filter((_, bmId) => bmId === idx)[0]._id;
      if (addBookmarkList.includes(bookmarkId))
        setAddBookmarkList(() =>
          addBookmarkList.filter((id) => id !== bookmarkId),
        );
      else setAddBookmarkList((prev) => [bookmarkId, ...prev]);
    },
    onClickConfirmAddBookmark: function () {
      console.log('addBookmarkList', addBookmarkList);
    },
  };

  return [bookmarkList, actions];
};

export default useBookmark;
