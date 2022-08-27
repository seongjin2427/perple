import { Fragment, MouseEvent, useCallback, useEffect, useState } from 'react';

import { getPopularVideos, GetPopularVideosType } from 'api/youtube';
import Pagination from 'components/shared/Pagination';
import VideoStatistics from 'components/shared/VideoStatistics';
import * as S from './YoutubeList.styled';
import useModal from 'hooks/useModal';
import SelectBookmark from 'components/shared/SelectBookmark';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const YoutubeList = () => {
  const isAuth = useSelector((state: RootState) => state.global.isLogin);
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

  const [, { open }, Modal] = useModal({ title: '북마크 추가' });

  const openModal = (e: MouseEvent, text: string) => {
    e.stopPropagation();
    if (isAuth) open(text);
  };

  return (
    <S.Container>
      <Modal>
        <SelectBookmark />
      </Modal>
      <S.Title>인기 동영상</S.Title>
      <S.VideoListDiv>
        {videos?.items.map((item, idx) => (
          <Fragment key={item.etag}>
            <S.VideoWrapper
              onClick={(e) => openModal(e, item.snippet.localized.title)}
            >
              <S.VideoThumbnailDiv>
                <S.VideoIframe
                  title="영상"
                  src={`//www.youtube.com/embed/${item.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {statistics && statistics?.items[idx].id === item.id && (
                  <VideoStatistics
                    statistics={statistics?.items[idx].statistics}
                  />
                )}
              </S.VideoThumbnailDiv>
              <S.VideoTextArea>
                <S.VideoTitle>
                  {item.snippet.localized.title || item.snippet.title}
                </S.VideoTitle>
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
