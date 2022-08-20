import instance from './instance';

interface ThumbnailType {
  width: number;
  height: number;
  url: string;
}

export interface GetPopularVideosType {
  items: {
    id: string;
    title: string;
    etag: string;
    kind: string;
    snippet: {
      categoryId: string;
      channelId: string;
      channelTitle: string;
      defaultAudioLanguage: string;
      description: string;
      liveBroadcastContent: string;
      localized: {
        description: string;
        title: string;
      };
      publishedAt: string;
      thumbnails: {
        default: ThumbnailType;
        high: ThumbnailType;
        medium: ThumbnailType;
      };
      tags: string[];
    };
  }[];
  prevPageToken: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

export const getPopularVideos = async () => {
  console.log(process.env.REACT_APP_YOUTUBE_BASE_URL);
  try {
    const { data } = await instance.get<GetPopularVideosType>(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&pageToken=CBkQAA&chart=mostPopular&maxResults=25&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    );
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
