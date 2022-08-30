import React, { createContext, ReactNode, useContext, useState } from 'react';

import useBookmark, { BookmarkInfoType } from 'hooks/useBookmark';
import * as S from './BookmarkList.styled';

interface BookmarkContextType {
  toggle: boolean;
  setToggle: () => void;
}

const BookmarkContext = createContext<BookmarkContextType>({
  toggle: false,
  setToggle: () => {},
});

const BookmarkBoxProvider = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <BookmarkContext.Provider
      value={{ toggle, setToggle: () => setToggle(!toggle) }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

const BookmarkList = () => {
  const [bookmarkList] = useBookmark('true');

  if (bookmarkList.length === 0) return <p>로딩중...</p>;
  else
    return (
      <S.Container>
        <S.BookmarkListPageTitle>북마크</S.BookmarkListPageTitle>
        <S.BookmarkWrapper>
          {bookmarkList.map((bm) => (
            <BookmarkBox key={bm._id} bookmark={bm} />
          ))}
        </S.BookmarkWrapper>
      </S.Container>
    );
};

interface BookmarkBoxProps {
  bookmark: {
    _id: string;
    bookmarkName: string;
    count: number;
    videos: {
      videoId: BookmarkInfoType;
    }[];
  };
}

const BookmarkBox = ({ bookmark }: BookmarkBoxProps) => {
  return (
    <BookmarkBoxProvider>
      <S.BookmarkBox>
        <BookmarkTitle bookmark={bookmark} />
        <BookmarkCard videos={bookmark.videos} />
      </S.BookmarkBox>
    </BookmarkBoxProvider>
  );
};

const BallPenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M17.849 11.808l-.707-.707-9.9 9.9H3v-4.243L14.313 5.444l5.657 5.657a1 1 0 0 1 0 1.414l-7.07 7.071-1.415-1.414 6.364-6.364zm.707-9.192l2.829 2.828a1 1 0 0 1 0 1.414L19.97 8.273 15.728 4.03l1.414-1.414a1 1 0 0 1 1.414 0z"
      fill="rgba(74,43,140,1)"
    />
  </svg>
);

const BinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm2-2v2h6V4H9z"
      fill="rgba(74,43,140,1)"
    />
  </svg>
);

interface BookmarkTitleProps extends BookmarkBoxProps {}

const BookmarkTitle = ({ bookmark }: BookmarkTitleProps) => {
  const { bookmarkName, count } = bookmark;
  const { toggle, setToggle } = useContext(BookmarkContext);

  return (
    <S.BookmarkTitleDiv toggle={toggle} onClick={setToggle}>
      <S.BookmarkTitle>{bookmarkName}</S.BookmarkTitle>
      <S.BookmarkIconDiv toggle={toggle}>
        <BallPenIcon />
        <BinIcon />
        <S.BookmarkCount>{count}</S.BookmarkCount>
      </S.BookmarkIconDiv>
    </S.BookmarkTitleDiv>
  );
};

interface BookmarkCardProps {
  videos: {
    videoId: BookmarkInfoType;
  }[];
}

const BookmarkCard = ({ videos }: BookmarkCardProps) => {
  const { toggle } = useContext(BookmarkContext);

  return (
    <S.YoutubeCard toggle={toggle}>
      {videos.map((v) => (
        <S.YoutubeContent key={v.videoId.videoId}>
          <S.YoutubeThumbnailDiv>
            <S.YoutubeThumbnail src={v.videoId.thumbnailUrl} />
          </S.YoutubeThumbnailDiv>
          <S.YoutubeTextArea>
            <S.YoutubeTitle>{v.videoId.title}</S.YoutubeTitle>
            <S.YoutubeChannelName>{v.videoId.channelName}</S.YoutubeChannelName>
            <S.YoutubeDescription>{v.videoId.description}</S.YoutubeDescription>
          </S.YoutubeTextArea>
        </S.YoutubeContent>
      ))}
    </S.YoutubeCard>
  );
};

export default BookmarkList;
