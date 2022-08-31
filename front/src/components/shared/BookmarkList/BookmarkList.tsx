import React, {
  ChangeEvent,
  createContext,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import useBookmark, {
  BookmarkInfoType,
  UseBookmarkActionType,
} from 'hooks/useBookmark';
import * as S from './BookmarkList.styled';
import IconSet from 'components/shared/IconSet';
import CreateFolder from 'components/shared/CreateFolder';
import useModal from 'hooks/useModal';

interface BookmarkContextType {
  toggle: boolean;
  setToggle: (tg: boolean) => void;
}

const BookmarkContext = createContext<BookmarkContextType>({
  toggle: false,
  setToggle: () => {},
});

const BookmarkBoxProvider = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <BookmarkContext.Provider
      value={{
        toggle,
        setToggle: (tg) => setToggle(tg),
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

interface BookmarkProps {
  bookmark: {
    _id: string;
    bookmarkName: string;
    count: number;
    videos: {
      videoId: BookmarkInfoType & { _id: string };
    }[];
  };
  actions?: UseBookmarkActionType;
}

const BookmarkList = () => {
  const [bookmarkList, actions] = useBookmark('true');

  return (
    <S.Container>
      <S.BookmarkListPageTitle>북마크</S.BookmarkListPageTitle>
      <CreateFolder onClickCreateBookmark={actions.onClickCreateBookmark} />
      {bookmarkList.length > 0 && (
        <S.BookmarkWrapper>
          {bookmarkList.map((bm) => (
            <BookmarkBox key={bm._id} bookmark={bm} actions={actions} />
          ))}
        </S.BookmarkWrapper>
      )}
    </S.Container>
  );
};

const BookmarkBox = ({ bookmark, actions }: BookmarkProps) => {
  return (
    <BookmarkBoxProvider>
      <S.BookmarkBox>
        <BookmarkTitle bookmark={bookmark} actions={actions} />
        <BookmarkCard bookmark={bookmark} actions={actions} />
      </S.BookmarkBox>
    </BookmarkBoxProvider>
  );
};

const BookmarkTitle = ({ bookmark, actions }: BookmarkProps) => {
  const { bookmarkName, count, _id } = bookmark;
  const { toggle, setToggle } = useContext(BookmarkContext);

  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const [bookmarkNameState, setBookmarkNameState] =
    useState<string>(bookmarkName);

  const stopPropa = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  const convertToToggle = useCallback(() => {
    if (modifyMode) setToggle(false);
    else setToggle(!toggle);
  }, [toggle, modifyMode, setToggle]);

  const convertToModifyMode = useCallback(
    (e: MouseEvent) => {
      stopPropa(e);
      setToggle(false);
      setModifyMode(!modifyMode);
    },
    [modifyMode, setToggle, stopPropa],
  );

  const onChangeBookmarkName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setBookmarkNameState(e.target.value),
    [],
  );

  const modifyBookmarkName = useCallback(
    async (e: MouseEvent) => {
      stopPropa(e);
      alert(await actions?.onClickModifyBookmarkTitle(_id, bookmarkNameState));
      setModifyMode(!modifyMode);
    },
    [_id, bookmarkNameState, modifyMode, stopPropa, actions],
  );

  const removeBookmark = useCallback(
    async (e: MouseEvent) => {
      stopPropa(e);
      if (window.confirm(`${bookmarkNameState}을/를 삭제하시겠습니까?`))
        alert(await actions!.onClickRemoveBookmark(_id));
    },
    [bookmarkNameState, _id, stopPropa, actions],
  );

  const cancelModifyMode = useCallback(
    (e: MouseEvent) => {
      stopPropa(e);
      setBookmarkNameState(bookmark.bookmarkName);
      setToggle(false);
      setModifyMode(!modifyMode);
    },
    [modifyMode, bookmark, setToggle, stopPropa],
  );

  return (
    <S.BookmarkTitleDiv toggle={toggle} onClick={convertToToggle}>
      {!modifyMode && (
        <>
          {toggle && <IconSet iconType="ArrowUpIcon" />}
          {!toggle && <IconSet iconType="ArrowDownIcon" />}
          <S.BookmarkTitle>{bookmarkNameState}</S.BookmarkTitle>
          <S.BookmarkIconDiv toggle={toggle}>
            <IconSet iconType="BallpenIcon" onClick={convertToModifyMode} />
            <IconSet iconType="BinIcon" onClick={removeBookmark} />
            <S.BookmarkCount>{count}</S.BookmarkCount>
          </S.BookmarkIconDiv>
        </>
      )}
      {modifyMode && (
        <>
          <S.BookmarkTitleInput
            onClick={stopPropa}
            onChange={onChangeBookmarkName}
            value={bookmarkNameState}
          />
          <S.BookmarkIconDiv toggle={toggle}>
            <IconSet iconType="CheckIcon" onClick={modifyBookmarkName} />
            <IconSet iconType="CrossIcon" onClick={cancelModifyMode} />
            <S.BookmarkCount>{count}</S.BookmarkCount>
          </S.BookmarkIconDiv>
        </>
      )}
    </S.BookmarkTitleDiv>
  );
};

const BookmarkCard = ({ bookmark, actions }: BookmarkProps) => {
  const { toggle } = useContext(BookmarkContext);
  const { videos, bookmarkName } = bookmark;
  const [videoIdState, setVideoIdState] = useState<string>('');
  const [, { open }, Modal] = useModal({
    title: bookmarkName,
  });

  const activeModal = useCallback(
    (v: BookmarkInfoType, id: string) => {
      open({ sTitle: v.title });
      setVideoIdState(id);
    },
    [open],
  );

  const removeYoutube = useCallback(
    async (
      e: MouseEvent,
      bookmarkId: string,
      video: BookmarkInfoType & { _id: string },
    ) => {
      e.stopPropagation();
      if (window.confirm(`${video.title}을/를 삭제하시겠습니까?`)) {
        const res = await actions?.onClickRemoveVideo(bookmarkId, video._id);
        alert(res);
      }
    },
    [actions],
  );

  return (
    <S.YoutubeCard toggle={toggle}>
      <Modal>
        {videoIdState && (
          <S.VideoIframe
            title="영상"
            src={`//www.youtube.com/embed/${videoIdState}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </Modal>
      {videos.length > 0 &&
        videos.map((v, idx) => (
          <S.YoutubeContent key={v.videoId.videoId + idx.toString()}>
            <S.YoutubeThumbnailDiv
              onClick={() => activeModal(v.videoId, v.videoId.videoId)}
            >
              <S.YoutubeThumbnail src={v.videoId.thumbnailUrl} />
              <IconSet
                iconType="CrossIcon"
                onClick={(e) => removeYoutube(e, bookmark._id, v.videoId)}
              />
            </S.YoutubeThumbnailDiv>
            <S.YoutubeTextArea>
              <S.YoutubeTitle>{v.videoId.title}</S.YoutubeTitle>
              <S.YoutubeChannelName>
                {v.videoId.channelName}
              </S.YoutubeChannelName>
              <S.YoutubeDescription>
                {v.videoId.description}
              </S.YoutubeDescription>
            </S.YoutubeTextArea>
          </S.YoutubeContent>
        ))}
    </S.YoutubeCard>
  );
};

export default BookmarkList;
