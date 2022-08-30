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

export interface StatisticsType {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}

export interface DefaultYoutubeType {
  prevPageToken: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

export interface YoutubeVideosItemType {
  id: string;
  title: string;
  etag: string;
  kind: string;
  snippet: SnippetType;
  statistics: StatisticsType;
}

interface YoutubeVideoItemsType {
  items: YoutubeVideosItemType[];
}

interface SearchedVideoIdType extends DefaultYoutubeType {
  dtag: string;
  items: {
    etag: string;
    kind: string;
    id: {
      kind: string;
      videoId: string;
    };
  }[];
}

export type GetYoutubeVideosType = DefaultYoutubeType & YoutubeVideoItemsType;

interface GetYoutubeVideoParamsType {
  searchWord?: string;
  token?: string;
}

export const getYoutubeVideos = async ({
  token,
  searchWord,
}: GetYoutubeVideoParamsType) => {
  let urlPageToken = (token && `pageToken=${token}`) || '';
  let searchOrChart = 'chart=mostPopular';
  let pageInfo;

  if (searchWord) {
    const { data } = await axios.get<SearchedVideoIdType>(
      `https://www.googleapis.com/youtube/v3/search?${urlPageToken}&q=${searchWord}&videoEmbeddable=true&type=video&maxResults=12&part=id&order=relevance&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
      {
        withCredentials: false,
      },
    );

    const chart = `id=${data.items.map((item) => item.id.videoId).join(',')}`;
    searchOrChart = chart;
    pageInfo = {
      nextPageToken: data.nextPageToken,
      pageInfo: data.pageInfo,
      prevPageToken: data.prevPageToken,
    };

    urlPageToken = ``;
  }

  try {
    const { data } = await axios.get<GetYoutubeVideosType>(
      `https://www.googleapis.com/youtube/v3/videos?${searchOrChart}&part=snippet,statistics&${urlPageToken}&maxResults=12&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
      {
        withCredentials: false,
      },
    );

    if (!searchWord) {
      pageInfo = {
        nextPageToken: data.nextPageToken,
        pageInfo: data.pageInfo,
        prevPageToken: data.prevPageToken,
      };
    }
    console.log(data);
    const youtubeData = {
      data,
      pageInfo,
    };
    return youtubeData;
  } catch (e) {
    console.log(e);
  }
};
