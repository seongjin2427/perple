import { Fragment, useCallback, useEffect, useState } from 'react';

import {
  getPopularVideos,
  GetPopularVideosType,
  getSearchVideos,
} from 'api/youtube';
import Pagination from 'components/shared/Pagination';
import VideoStatistics from 'components/shared/VideoStatistics';
import * as S from './YoutubeList.styled';
interface YoutubeListProps {
  title: string;
}

const YoutubeList = ({ title }: YoutubeListProps) => {
  const [videos, setVideos] = useState<GetPopularVideosType | undefined>();
  const [statistics, setStatistics] = useState<
    GetPopularVideosType | undefined
  >();

  const getVideos = useCallback(
    async (token?: string) => {
      const fetchedVideos: GetPopularVideosType | undefined =
        await getPopularVideos({ token });

      setVideos(fetchedVideos);
      setStatistics(fetchedVideos);

      window.scrollTo({ top: 0 });
    },
    [setVideos],
  );

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  const test = async () => {
    const res = await getSearchVideos({ searchWord: '한국' });
    console.log(res);
  };

  return (
    <S.Container>
      <button onClick={test}>test</button>
      <S.Title>{title ? `검색 단어 : ${title}` : '인기 동영상'}</S.Title>
      <S.VideoListDiv>
        {videos?.items.map((item, idx) => (
          <Fragment key={item.id}>
            <S.VideoWrapper>
              <S.VideoThumbnailDiv>
                <S.VideoIframe
                  title="영상"
                  src={`//www.youtube.com/embed/${item.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
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
