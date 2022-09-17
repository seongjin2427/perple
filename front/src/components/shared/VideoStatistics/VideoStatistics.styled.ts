import styled from 'styled-components';

export const VideoStatisticsArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary.hex};
`;

export const VideoStatisticsParagraphBox = styled.div`
  display: flex;
  justify-content: center;
  background: white;
  margin: 0.25rem 0;
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1.25;
`;

export const VideoStatisticsParagraph = styled.p`
  margin: 0 0.125rem;
`;
