import axios from 'axios';
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
    player: {
      embedHhtml: string;
    };
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
    statistics: {
      commentCount: string;
      favoriteCount: string;
      likeCount: string;
      viewCount: string;
    };
  }[];
  prevPageToken: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

interface getPopularVideosParamsType {
  token: string | undefined;
}

export const getPopularVideos = async ({
  token,
}: getPopularVideosParamsType) => {
  const urlPageToken = token || '';

  try {
    const { data } = await axios.get<GetPopularVideosType>(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,player&pageToken=${urlPageToken}&chart=mostPopular&maxResults=24&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
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

interface getSearchVidiosParamsType {
  searchWord: string;
  urlPageToken?: string;
}

export const getSearchVideos = async ({
  searchWord,
}: getSearchVidiosParamsType) => {
  // `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?part=snippet,statistics,player&order=viewCount&q=${searchWord}&type=video&videoDefinition=high&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=한국&maxResults=24&regionCode=KR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    {
      withCredentials: false,
    },
  );

  console.log(data);
  return data;
};
