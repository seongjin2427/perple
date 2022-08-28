import React from 'react';

import useBookmark from 'hooks/useBookmark';
import * as S from './SelectBookmark.styled';
import { YoutubeVideosItemType } from 'api/youtube';

interface SelectBookmarkProps {
  item: YoutubeVideosItemType | undefined;
}

const SelectBookmark = ({ item }: SelectBookmarkProps) => {
  const [bookmark, actions] = useBookmark();

  const onClickAddBookmark = () => {
    if (item) {
      const videoId = item.id;
      const title = item.snippet.localized.title;
      const channelName = item.snippet.channelTitle;
      const description = item.snippet.description;

      actions.onClickConfirmAddBookmark(videoId);
    }
  };

  return (
    <S.Container>
      <S.BookmarkWrapper>
        {bookmark.length > 1 &&
          bookmark.map(({ title, count }, idx) => (
            <S.BookmarkLabel key={title + idx} htmlFor={title}>
              <S.BookmarkCheckbox
                id={title}
                name="bookmark"
                type="checkbox"
                onChange={() => actions.onChangeBookmarkCheck(idx)}
              />
              <S.Title>{title}</S.Title>
            </S.BookmarkLabel>
          ))}
        {bookmark.length === 0 && (
          <S.AddBookmarkDiv>+ 폴더 추가</S.AddBookmarkDiv>
        )}
      </S.BookmarkWrapper>
      <S.ConfirmButton onClick={onClickAddBookmark}>확인</S.ConfirmButton>
    </S.Container>
  );
};

export default SelectBookmark;
