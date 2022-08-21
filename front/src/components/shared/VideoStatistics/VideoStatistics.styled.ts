import styled, { css } from 'styled-components';

export const VideoStatisticsArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const VideoStatisticsParagraphBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 0 0.25rem;
  padding: 0.375rem 0.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;

  font-size: 0.675rem;
  line-height: 1.25;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      flex
    }
  `}
`;

export const VideoStatisticsParagraph = styled.p`
  margin: 0 0.125rem;
`;
