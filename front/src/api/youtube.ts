import axios from 'axios';
interface ThumbnailType {
  width: number;
  height: number;
  url: string;
}

interface SnippetType {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  localized: {
    description: string;
    title: string;
  };
  title: string;
  publishedAt: string;
  thumbnails: {
    default: ThumbnailType;
    high: ThumbnailType;
    medium: ThumbnailType;
  };
  tags: string[];
}

interface StatisticsType {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}

interface DefaultYoutubeType {
  prevPageToken: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

interface PopularVideosType {
  items: {
    id: string;
    title: string;
    etag: string;
    kind: string;
    snippet: SnippetType;
    statistics: StatisticsType;
  }[];
}

interface SearchedVideosType {
  items: {
    id: {
      kind: string;
      videoId: string;
    };
    title: string;
    etag: string;
    kind: string;
    snippet: Omit<SnippetType, 'categoryId' | 'localized' | 'tags'>;
    statistics: StatisticsType;
  }[];
}

export interface getSearchVideosStatisticsType {
  items: {
    id: string;
    title: string;
    etag: string;
    kind: string;
    statistics: StatisticsType;
  }[];
}

export type GetPopularVideosType = DefaultYoutubeType & PopularVideosType;
export type GetSearchVideosType = DefaultYoutubeType & SearchedVideosType;

interface getPopularVideosParamsType {
  token: string | undefined;
}

export const getPopularVideos = async ({
  token,
}: getPopularVideosParamsType) => {
  const urlPageToken = token || '';

  try {
    const { data } = await axios.get<GetPopularVideosType>(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&pageToken=${urlPageToken}&chart=mostPopular&maxResults=24&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
      {
        withCredentials: false,
      },
    );
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

interface getSearchVideosParamsType {
  searchWord: string;
  token?: string;
}

export const getSearchVideos = async ({
  searchWord,
  token,
}: getSearchVideosParamsType) => {
  const urlPageToken = token || '';
  const searchResponse = await axios.get<GetSearchVideosType>(
    `https://www.googleapis.com/youtube/v3/search?&videoEmbeddable=true&type=video&part=snippet&pageToken=${urlPageToken}&q=${searchWord}&order=relevance&maxResults=24&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    {
      withCredentials: false,
    },
  );

  const searchIds = searchResponse.data.items
    .map((item) => item.id.videoId)
    .join(',');

  const statisticsResponse = await axios.get<getSearchVideosStatisticsType>(
    `https://www.googleapis.com/youtube/v3/videos?id=${searchIds}&part=statistics&maxResults=24&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  );

  return {
    searchedVideos: searchResponse.data,
    searchedStatistics: statisticsResponse.data,
  };
};
