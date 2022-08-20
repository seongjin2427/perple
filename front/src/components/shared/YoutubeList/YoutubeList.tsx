import { useEffect, useState } from 'react';

import * as S from './YoutubeList.styled';
import { getPopularVideos, GetPopularVideosType } from 'api/youtube';

const YoutubeList = () => {
  const [videos, setVideos] = useState<GetPopularVideosType | undefined>();

  useEffect(() => {
    (async function () {
      const data: GetPopularVideosType | undefined = await getPopularVideos();
      setVideos(data);
    })();
  }, []);

  return (
    <S.Container>
      <S.Title>인기 동영상</S.Title>
      <S.VideoListDiv>
        {videos?.items.map((item) => (
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
          </S.VideoWrapper>
        ))}
      </S.VideoListDiv>
    </S.Container>
  );
};

export default YoutubeList;
