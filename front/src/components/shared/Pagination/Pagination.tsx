import React from 'react';

import * as S from './Pagination.styled';

interface PaginationProps {
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo?: {
    resultsPerPage: number;
    totalResults: number;
  };
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
          ←
        </S.PrevNextButton>
      )}
      {nextPageToken && (
        <S.PrevNextButton onClick={() => getVideos(nextPageToken)}>
          →
        </S.PrevNextButton>
      )}
    </S.Container>
  );
};

export default Pagination;
