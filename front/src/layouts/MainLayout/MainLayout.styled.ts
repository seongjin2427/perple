import styled from 'styled-components';
import { HEADER_HEIGHT } from 'constants/common';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.header``;

export const MainWrapper = styled.div`
  max-width: 100%;
  min-height: 90vh;
  padding: 8px;
  padding-top: calc(${HEADER_HEIGHT} + 8px);

  ${({ theme }) => theme.media.tablet} {
    padding: 12px;
    padding-top: calc(${HEADER_HEIGHT} + 12px);
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 0 auto;
    padding: 24px;
    padding-top: calc(${HEADER_HEIGHT} + 24px);
  }
`;
