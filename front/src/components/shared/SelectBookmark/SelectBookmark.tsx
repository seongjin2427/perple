import React, { useCallback } from 'react';

import useBookmark from 'hooks/useBookmark';
import * as S from './SelectBookmark.styled';
import { YoutubeVideosItemType } from 'api/youtube';
import CreateFolder from 'components/shared/CreateFolder';

interface SelectBookmarkProps {
  item: YoutubeVideosItemType | undefined;
  close: () => void;
}

const SelectBookmark = ({ item, close }: SelectBookmarkProps) => {
  const [bookmark, actions] = useBookmark();

  const onClickAddBookmark = useCallback(async () => {
    if (item) {
      const videoId = item.id;
      const title = item.snippet.localized.title;
      const channelName = item.snippet.channelTitle;
      const description = item.snippet.description;
      const thumbnailUrl = item.snippet.thumbnails.high.url;

      const videoInfo = {
        videoId,
        title,
        channelName,
        description,
        thumbnailUrl,
      };
      await actions.onClickConfirmAddBookmark(videoInfo);
      close();
    }
  }, [item, actions, close]);

  return (
    <S.Container>
      <S.BookmarkWrapper>
        {bookmark &&
          bookmark.length > 0 &&
          bookmark.map(({ bookmarkName, count, _id }) => (
            <S.BookmarkLabel key={_id} htmlFor={_id}>
              <S.BookmarkCheckbox
                id={_id}
                name="bookmark"
                type="checkbox"
                onChange={() => actions.onChangeBookmarkCheck(_id)}
              />
              <S.Title>{bookmarkName}</S.Title>
            </S.BookmarkLabel>
          ))}
        <CreateFolder onClickCreateBookmark={actions.onClickCreateBookmark} />
      </S.BookmarkWrapper>
      <S.ConfirmButton onClick={onClickAddBookmark}>확인</S.ConfirmButton>
    </S.Container>
  );
};

export default React.memo(SelectBookmark);
