import React, { createContext, ReactNode, useContext, useState } from 'react';

import useBookmark, { BookmarkInfoType } from 'hooks/useBookmark';
import * as S from './BookmarkList.styled';
import IconSet from 'components/shared/IconSet';
import { BallpenIcon } from 'assets/icon';

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

interface BookmarkTitleProps extends BookmarkBoxProps {}

const BookmarkTitle = ({ bookmark }: BookmarkTitleProps) => {
  const { bookmarkName, count } = bookmark;
  const { toggle, setToggle } = useContext(BookmarkContext);

  return (
    <S.BookmarkTitleDiv toggle={toggle} onClick={setToggle}>
      {toggle && <IconSet iconType="ArrowUpIcon" />}
      {!toggle && <IconSet iconType="ArrowDownIcon" />}
      <S.BookmarkTitle>{bookmarkName}</S.BookmarkTitle>
      <S.BookmarkIconDiv toggle={toggle}>
        <IconSet iconType="BallpenIcon" />
        <IconSet iconType="BinIcon" />
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
