import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DefaultYoutubeType,
  getYoutubeVideos,
  GetYoutubeVideosType,
} from 'api/youtube';

const useYoutube = (): [
  GetYoutubeVideosType | undefined,
  DefaultYoutubeType | undefined,
  (receivedToken?: string) => Promise<void>,
] => {
  const { searchWord } = useParams();
  const [videos, setVideos] = useState<GetYoutubeVideosType>();
  const [pageInfo, setPageInfo] = useState<DefaultYoutubeType>();

  const getVideos = useCallback(
    async (receivedToken?: string) => {
      const token = receivedToken || '';
      const data = await getYoutubeVideos({ token, searchWord });
      setVideos(data?.data);
      setPageInfo(data?.pageInfo);
      window.scrollTo({ top: 0 });
    },
    [searchWord],
  );

  return [videos, pageInfo, getVideos];
};

export default useYoutube;
