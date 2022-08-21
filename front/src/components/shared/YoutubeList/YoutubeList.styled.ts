import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h1`
  margin: 1.5rem 1rem 1.75rem 1rem;
  font-size: 2rem;
  font-weight: bold;
`;

export const VideoListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const VideoWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.375rem;
  padding: 2rem;
  border: 1px black solid;
  border-radius: 2rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  :hover {
    transform: translate(-2.5px, -2.5px);
    box-shadow: 2.5px 2.5px 2.5px black;
  }

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 90%;
      flex-direction: row;
    }

    ${theme.media.desktop} {
      width: 40%;
      flex-direction: row;
      margin: 0.75rem;
      padding: 2rem;
    }
  `}
`;

export const VideoThumbnailDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 35%;
      margin-right: 1rem;
    }

    ${theme.media.desktop} {
      width: 50%;
    }
  `}
`;

export const VideoThumbnail = styled.img`
  width: 100%;
  object-fit: contain;
  margin-bottom: 0.75rem;
`;

export const VideoTextArea = styled.div`
  width: 100%;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 65%;
      display: flex;
      flex-direction: column;
      margin: 0;
    }
    ${theme.media.desktop} {
      width: 50%;
    }
  `}
`;

export const VideoTitle = styled.p`
  display: -webkit-box;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;

  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.25;
  white-space: normal;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
export const VideoChannelTitle = styled(VideoTitle)`
  height: 1.125rem;
  font-size: 0.75rem;
`;

export const VideoDescription = styled.p`
  display: -webkit-box;
  padding: 0 0.5rem;
  overflow: hidden;

  line-height: 1.375;
  white-space: normal;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  ${({ theme }) => css`
    ${theme.media.tablet} {
      -webkit-line-clamp: 5;
    }
    ${theme.media.desktop} {
      -webkit-line-clamp: 5;
    }
  `}
`;
