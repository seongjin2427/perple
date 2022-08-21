import { HEADER_HEIGHT } from 'constants/common';
import styled, { css } from 'styled-components';

interface ActiveType {
  active: boolean;
}

export const Container = styled.div<ActiveType>`
  width: 20rem;
  height: calc(100% - ${HEADER_HEIGHT});
  margin-top: calc(${HEADER_HEIGHT} + 1px);
  background: ${({ theme }) => theme.colors.primary.hex};
  color: ${({ theme }) => theme.colors.thirdary.hex};

  position: fixed;
  right: 0;
  opacity: 0;

  transition: transform 0.2s ease-in-out, opacity 0.2s;
  transform: translateX(100%);

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      transform: translateX(0);
    `}

  ${({ theme }) => css`
    ${theme.media.tablet} {
      display: none;
    }
  `}
`;

export const UserDiv = styled.div`
  margin: 2rem 0;
`;

export const SideMenuUl = styled.ul`
  margin: 4rem 3rem;
`;

export const SideMenuLi = styled.li`
  height: 4rem;
  font-size: 1.75rem;
  font-weight: bold;
  cursor: pointer;
`;
