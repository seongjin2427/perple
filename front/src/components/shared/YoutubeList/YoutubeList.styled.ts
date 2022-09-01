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
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.25rem;
  /* padding: 1.75rem; */
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  border-radius: 1.5rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.primary.hex};
  overflow: hidden;

  :hover {
    transform: translate(-2.5px, -2.5px);
    box-shadow: 2.5px 2.5px 5px ${({ theme }) => theme.colors.primary.hex};
  }

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 45%;
      margin: 1rem;
    }

    ${theme.media.desktop} {
      width: 30%;
      margin: 0.5rem;
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
  padding: 1.75rem;
  padding-bottom: 0.75rem;
  background: black;
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
  margin-bottom: 0.25rem;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      margin-bottom: 0.5rem;
    }
  `}
`;

export const VideoTitle = styled.p`
  display: -webkit-box;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
  overflow: hidden;

  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.25;
  white-space: normal;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      padding: 0 0.75rem;
      margin: 0 0.75rem;
      margin-bottom: 0.5rem;
    }
  `}
`;
export const VideoChannelTitle = styled(VideoTitle)`
  height: 1.125rem;
  font-size: 0.75rem;
  font-weight: 500;
`;
