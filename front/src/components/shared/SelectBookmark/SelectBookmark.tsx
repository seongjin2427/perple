import React from 'react';

import useBookmark from 'hooks/useBookmark';
import * as S from './SelectBookmark.styled';

const SelectBookmark = () => {
  const [bookmark, actions] = useBookmark();

  console.log(bookmark);

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
      <S.ConfirmButton>확인</S.ConfirmButton>
    </S.Container>
  );
};

export default SelectBookmark;
