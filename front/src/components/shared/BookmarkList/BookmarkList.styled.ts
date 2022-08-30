import styled, { css } from 'styled-components';
import { DROP_DOWN, DROP_UP } from 'styles/keyframe';

export const Container = styled.div`
  margin-bottom: 5rem;
`;

export const BookmarkWrapper = styled.div``;

export const BookmarkListPageTitle = styled.h1`
  margin: 1rem 0.5rem;
  font-size: 2rem;

  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.hex};
`;

export const BookmarkBox = styled.div`
  width: 100%;
  padding: 0.25rem;
  margin-bottom: 0.25rem;

  & > * {
    color: ${({ theme }) => theme.colors.primary.hex};
  }
  ${({ theme }) => css`
    ${theme.media.tablet} {
      /* max-width: 25rem; */
    }
  `}
`;

interface ToggleType {
  toggle: boolean;
}

export const BookmarkTitleDiv = styled.div<ToggleType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.75rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  padding: 0 1.25rem;
  cursor: pointer;

  :hover {
    font-weight: bold;
  }

  ${({ toggle }) =>
    toggle &&
    css`
      background: ${({ theme }) => theme.colors.primary.hex};
      color: white;

      i {
        background: white;
        color: ${({ theme }) => theme.colors.primary.hex};
      }
    `}
`;

export const BookmarkTitle = styled.h2`
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      font-size: 1.125rem;
    }
  `}
`;

export const BookmarkIconDiv = styled.div<ToggleType>`
  width: 11.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    width: 1.75rem;
    height: 1.75rem;
    padding: 0.25rem;
    border-radius: 50%;
    margin-right: 0.75rem;
    ${({ toggle }) =>
      toggle &&
      css`
        background: white;
      `}
  }
`;

export const BookmarkCount = styled.i`
  width: 1rem;
  height: 1rem;
  background: ${({ theme }) => theme.colors.primary.hex};
  padding: 10px;
  border-radius: 9999px;

  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

export const YoutubeCard = styled.div<ToggleType>`
  /* height: 100%; */
  flex-direction: column;
  margin-top: -1px;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  border-top: none;
  overflow: scroll;

  ${({ toggle }) =>
    toggle
      ? css`
          animation: ${DROP_DOWN} 0.5s forwards ease-in-out;
        `
      : css`
          animation: ${DROP_UP} 0.5s forwards ease-in-out;
        `}

  ${({ theme }) => css`
    ${theme.media.tablet} {
      overflow-y: scroll;
    }
  `}
`;

export const YoutubeContent = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.hex};

  :last-child {
    border-bottom: none;
  }

  ${({ theme }) => css`
    ${theme.media.tablet} {
      display: flex;
    }
  `}
`;

export const YoutubeThumbnailDiv = styled.div`
  ${({ theme }) => theme.media.tablet} {
    width: 25%;
  }
`;
export const YoutubeThumbnail = styled.img`
  width: 100%;
  object-fit: contain;
  ${({ theme }) => theme.media.tablet} {
    height: 100%;
    /* width: 15rem; */
  }
`;

export const YoutubeTextArea = styled.div`
  width: 90%;
  padding: 1rem 0.875rem;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 70%;
    }
  `}
`;

export const YoutubeTitle = styled.p`
  width: 100%;
  margin-bottom: 0.375rem;
  padding: 0 0.25rem;

  font-size: 1.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const YoutubeChannelName = styled.p`
  margin-bottom: 1rem;
  padding: 0 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary.hex};
  font-weight: bold;
`;

export const YoutubeDescription = styled.p`
  padding: 0 0.25rem;
  display: -webkit-box;
  overflow: hidden;
  line-height: 1.125;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: 0.875rem;
  color: ${({ theme }) => `rgba(${theme.colors.primary.rgb}, 0.5)`};

  ${({ theme }) => css`
    ${theme.media.tablet} {
      -webkit-line-clamp: 4;
    }
    ${theme.media.desktop} {
      -webkit-line-clamp: 7;
    }
  `}
`;
