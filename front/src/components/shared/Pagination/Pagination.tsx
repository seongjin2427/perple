import { DefaultYoutubeType } from 'api/youtube';
import IconSet from 'components/shared/IconSet';
import React from 'react';

import * as S from './Pagination.styled';

interface PaginationProps {
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo?: DefaultYoutubeType;
  getVideos: (token?: string) => void;
}

const Pagination = ({
  prevPageToken,
  nextPageToken,
  pageInfo,
  getVideos,
}: PaginationProps) => {
  return (
    <S.Container>
      {prevPageToken && (
        <S.PrevNextButton onClick={() => getVideos(prevPageToken)}>
          <IconSet iconType="ChevronLeftIcon" />
        </S.PrevNextButton>
      )}
      {nextPageToken && (
        <S.PrevNextButton onClick={() => getVideos(nextPageToken)}>
          <IconSet iconType="ChevronRightIcon" />
        </S.PrevNextButton>
      )}
    </S.Container>
  );
};

export default Pagination;
