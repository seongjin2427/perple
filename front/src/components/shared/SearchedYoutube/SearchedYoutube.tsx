import { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getSearchVideos,
  getSearchVideosStatisticsType,
  GetSearchVideosType,
} from 'api/youtube';
import Pagination from 'components/shared/Pagination';
import VideoStatistics from 'components/shared/VideoStatistics';
import * as S from './SearchedYoutube.styled';

interface YoutubeListProps {
  title: string;
}

const YoutubeList = ({ title }: YoutubeListProps) => {
  const { search } = useParams();
  const [videos, setVideos] = useState<GetSearchVideosType | undefined>();
  const [statistics, setStatistics] = useState<
    getSearchVideosStatisticsType | undefined
  >();

  const getVideos = useCallback(
    async (token?: string) => {
      const { searchedVideos, searchedStatistics } = await getSearchVideos({
        token,
        searchWord: search || '',
      });

      setVideos(searchedVideos);
      setStatistics(searchedStatistics);

      window.scrollTo({ top: 0 });
    },
    [setVideos, search],
  );

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  return (
    <S.Container>
      <S.Title>{`검색 단어 : ${title}`}</S.Title>
      <S.VideoListDiv>
        {videos?.items.map((item, idx) => (
          <Fragment key={item.etag}>
            <S.VideoWrapper>
              <S.VideoThumbnailDiv>
                <S.VideoIframe
                  title="영상"
                  src={`//www.youtube.com/embed/${item.id.videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {statistics &&
                  statistics?.items[idx].id === item.id.videoId && (
                    <VideoStatistics
                      statistics={statistics?.items[idx].statistics}
                    />
                  )}
              </S.VideoThumbnailDiv>
              <S.VideoTextArea>
                <S.VideoTitle>{item.snippet.title || ''}</S.VideoTitle>
                <S.VideoChannelTitle>
                  {item.snippet.channelTitle || ''}
                </S.VideoChannelTitle>
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
