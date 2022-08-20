import { useCallback, useEffect, useState } from 'react';

import * as S from './YoutubeList.styled';
import { getPopularVideos, GetPopularVideosType } from 'api/youtube';
import Pagination from 'components/shared/Pagination';
import abbreviateNumber from 'util/abbreviate';

const YoutubeList = () => {
  const [videos, setVideos] = useState<GetPopularVideosType | undefined>();
  const [statistics, setStatistics] = useState<
    GetPopularVideosType | undefined
  >();

  const getVideos = useCallback(
    async (token?: string) => {
      const fetchedVideos: GetPopularVideosType | undefined =
        await getPopularVideos({ divide: 'snippet', token });

      const fetchedStatistics: GetPopularVideosType | undefined =
        await getPopularVideos({
          divide: 'statistics',
          token,
        });

      setVideos(fetchedVideos);
      setStatistics(fetchedStatistics);

      window.scrollTo({ top: 0 });
    },
    [setVideos],
  );

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  return (
    <S.Container>
      <S.Title>인기 동영상</S.Title>
      <S.VideoListDiv>
        {videos?.items.map((item, idx) => (
          <S.VideoWrapper key={item.id}>
            <S.VideoThumbnailDiv>
              <S.VideoThumbnail src={item.snippet.thumbnails.high.url} />
            </S.VideoThumbnailDiv>
            <S.VideoTextArea>
              <S.VideoTitle>{item.snippet.localized.title}</S.VideoTitle>
              <S.VideoChannelTitle>
                {item.snippet.channelTitle}
              </S.VideoChannelTitle>
              <S.VideoDescription>
                {item.snippet.localized.description}
              </S.VideoDescription>
            </S.VideoTextArea>
            {statistics?.items[idx].id === item.id && (
              <S.VideoStatisticsArea>
                <S.VideoStatisticsParagraph>
                  댓글 {' / '}
                  {abbreviateNumber(
                    statistics?.items[idx].statistics.commentCount,
                  )}
                </S.VideoStatisticsParagraph>
                <S.VideoStatisticsParagraph>
                  좋아요 {' / '}
                  {abbreviateNumber(
                    statistics?.items[idx].statistics.likeCount,
                  )}
                </S.VideoStatisticsParagraph>
                <S.VideoStatisticsParagraph>
                  조회 {' / '}
                  {abbreviateNumber(
                    statistics?.items[idx].statistics.viewCount,
                  )}
                </S.VideoStatisticsParagraph>
              </S.VideoStatisticsArea>
            )}
          </S.VideoWrapper>
        ))}
      </S.VideoListDiv>
      <Pagination
        prevPageToken={videos?.prevPageToken}
        nextPageToken={videos?.nextPageToken}
        pageInfo={videos?.pageInfo}
        getVideos={getVideos}
      />
    </S.Container>
  );
};

export default YoutubeList;
