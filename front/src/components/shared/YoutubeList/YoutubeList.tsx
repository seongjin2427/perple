import { Fragment, useCallback, useEffect, useState } from 'react';

import Pagination from 'components/shared/Pagination';
import VideoStatistics from 'components/shared/VideoStatistics';
import { getPopularVideos, GetPopularVideosType } from 'api/youtube';
import * as S from './YoutubeList.styled';

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
          <Fragment key={item.id}>
            <S.VideoWrapper>
              <S.VideoThumbnailDiv>
                <S.VideoThumbnail src={item.snippet.thumbnails.high.url} />
                {statistics?.items[idx].id === item.id && (
                  <VideoStatistics
                    statistics={statistics?.items[idx].statistics}
                  />
                )}
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
            </S.VideoWrapper>
          </Fragment>
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
