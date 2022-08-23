import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.hex};
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
  align-items: center;
  margin: 0.25rem;
  padding: 1.75rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  border-radius: 2rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.primary.hex};

  :hover {
    transform: translate(-2.5px, -2.5px);
    box-shadow: 2.5px 2.5px 5px ${({ theme }) => theme.colors.primary.hex};
  }

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 35%;
      margin: 1rem;
    }
    
    ${theme.media.desktop} {
      width: 25%;
      margin: 0.5rem;
      padding: 2rem;
    }
  `}
`;

export const VideoThumbnailDiv = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
`;

export const VideoThumbnail = styled.img`
  width: 100%;
  object-fit: contain;
  margin-bottom: 0.75rem;
`;

export const VideoIframe = styled.iframe`
  width: 100%;
  aspect-ratio: 2 / 1.5;
  object-fit: contain;
  margin-bottom: 0.75rem;
`;

export const VideoTextArea = styled.div`
  width: 100%;
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
  font-weight: 500;
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
