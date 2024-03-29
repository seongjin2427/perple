import React, { useCallback } from "react";

import useBookmark from "hooks/useBookmark";
import * as S from "./SelectBookmark.styled";
import { YoutubeVideosItemType } from "api/youtube";
import CreateFolder from "components/shared/CreateFolder";

interface SelectBookmarkProps {
  item: YoutubeVideosItemType | undefined;
  close: () => void;
}

const SelectBookmark = ({ item, close }: SelectBookmarkProps) => {
  const [bookmarkList, actions] = useBookmark();

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
        {bookmarkList &&
          bookmarkList.length > 0 &&
          bookmarkList.map(({ bookmarkName, count, _id, videos }) => {
            const isExist =
              videos.findIndex((v) => v.videoId.videoId === item?.id) >= 0;

            return (
              <S.BookmarkLabel key={_id} htmlFor={_id} title={bookmarkName}>
                <S.BookamrkLabelDiv>
                  <S.BookmarkCheckbox
                    id={_id}
                    name="bookmark"
                    type="checkbox"
                    onChange={() => actions.onChangeBookmarkCheck(_id)}
                    disabled={isExist}
                    checked={isExist || undefined}
                  />
                  <S.Title>{`${bookmarkName}`}</S.Title>
                </S.BookamrkLabelDiv>
                <S.BookmarkCount>{count > 99 ? "99+" : count}</S.BookmarkCount>
              </S.BookmarkLabel>
            );
          })}
        {bookmarkList && bookmarkList.length === 0 && (
          <S.BlankBookmark>북마크가 없어요!</S.BlankBookmark>
        )}
      </S.BookmarkWrapper>
      <CreateFolder onClickCreateBookmark={actions.onClickCreateBookmark} />
      <S.ConfirmButton onClick={onClickAddBookmark}>확인</S.ConfirmButton>
    </S.Container>
  );
};

export default React.memo(SelectBookmark);
