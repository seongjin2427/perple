import React from 'react';

import abbreviateNumber from 'util/abbreviate';
import * as S from './VideoStatistics.styled';

interface VideoStatisticsBoxProps {
  minTitle: string;
  statisticsString: string;
}

const VideoStatisticsBox = ({
  minTitle,
  statisticsString,
}: VideoStatisticsBoxProps) => {
  return (
    <S.VideoStatisticsParagraphBox>
      <S.VideoStatisticsParagraph>{minTitle}</S.VideoStatisticsParagraph>
      <S.VideoStatisticsParagraph>
        {abbreviateNumber(statisticsString)}
      </S.VideoStatisticsParagraph>
    </S.VideoStatisticsParagraphBox>
  );
};

interface VideoStatisticsProps {
  statistics: {
    commentCount: string;
    likeCount: string;
    viewCount: string;
  };
}

const VideoStatistics = ({ statistics }: VideoStatisticsProps) => {
  const { commentCount, likeCount, viewCount } = statistics;
  return (
    <S.VideoStatisticsArea>
      <VideoStatisticsBox minTitle="💬" statisticsString={commentCount} />
      <VideoStatisticsBox minTitle="👍" statisticsString={likeCount} />
      <VideoStatisticsBox minTitle="👀" statisticsString={viewCount} />
    </S.VideoStatisticsArea>
  );
};

export default VideoStatistics;
