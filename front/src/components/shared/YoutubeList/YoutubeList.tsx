import { Fragment, MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { YoutubeVideosItemType } from 'api/youtube';
import { RootState } from 'store/store';
import useModal from 'hooks/useModal';
import Pagination from 'components/shared/Pagination';
import VideoStatistics from 'components/shared/VideoStatistics';
import SelectBookmark from 'components/shared/SelectBookmark';
import * as S from './YoutubeList.styled';
import useYoutube from 'hooks/useYoutube';

const YoutubeList = () => {
  const { searchWord } = useParams();
  const isAuth = useSelector(({ global }: RootState) => global.isLogin);
  const [title, setTitle] = useState<string>('');
  const [videos, pageInfo, getVideos] = useYoutube();

  useEffect(() => {
    getVideos();
    if (searchWord) setTitle(searchWord);
  }, [getVideos, searchWord]);

  const [, { open, close }, Modal, videoInfo] = useModal({
    title: '북마크 추가',
  });

  const openModal = (e: MouseEvent, item: YoutubeVideosItemType) => {
    e.stopPropagation();
    if (isAuth) {
      open({ sTitle: item.snippet.title, item });
    }
  };

  return (
    <S.Container>
      <Modal>
        <SelectBookmark item={videoInfo} close={close} />
      </Modal>
      <S.Title>
        {(searchWord && `검색단어 : ${title}`) || '인기 동영상'}
      </S.Title>
      <S.VideoListDiv>
        {videos?.items.map((item) => (
          <Fragment key={item.etag}>
            <S.VideoWrapper onClick={(e) => openModal(e, item)}>
              <S.VideoThumbnailDiv>
                <S.VideoIframe
                  title="영상"
                  src={`//www.youtube.com/embed/${item.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </S.VideoThumbnailDiv>
              <S.VideoTextArea>
                <S.VideoTitle>{item.snippet.localized.title}</S.VideoTitle>
                <S.VideoChannelTitle>
                  {item.snippet.channelTitle}
                </S.VideoChannelTitle>
              </S.VideoTextArea>
              <VideoStatistics statistics={item?.statistics} />
            </S.VideoWrapper>
          </Fragment>
        ))}
      </S.VideoListDiv>
      <Pagination
        prevPageToken={pageInfo?.prevPageToken}
        nextPageToken={pageInfo?.nextPageToken}
        pageInfo={pageInfo}
        getVideos={getVideos}
      />
    </S.Container>
  );
};

export default YoutubeList;
