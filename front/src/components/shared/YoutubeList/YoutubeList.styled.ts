import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 1.5rem 1rem 2rem 1rem;
  font-weight: bold;
`;

export const VideoListDiv = styled.div``;

export const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  padding: 3rem;
  border: 1px black solid;
  border-radius: 2rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  :hover {
    transform: translate(-2.5px, -2.5px);
    box-shadow: 2.5px 2.5px 2.5px black;
  }
`;

export const VideoThumbnailDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VideoThumbnail = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const VideoTextArea = styled.div`
  width: 100%;
  margin: 1rem 0 0 0;
`;

export const VideoTitle = styled.p`
  display: -webkit-box;
  font-size: 1.125rem;
  line-height: 1.25;
  font-weight: bold;
  margin-bottom: 0.5rem;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 0 0.5rem;
`;
export const VideoChannelTitle = styled(VideoTitle)`
  font-size: 0.75rem;
  height: 1.125rem;
`;

export const VideoDescription = styled.p`
  display: -webkit-box;
  line-height: 1.375;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  padding: 0 0.5rem;
`;
