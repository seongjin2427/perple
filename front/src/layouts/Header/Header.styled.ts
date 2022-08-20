import styled, { css } from 'styled-components';
import { HEADER_HEIGHT } from 'constants/common';

export const Container = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};
  background: red;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 5000;
`;

export const Logo = styled.div`
  width: 5rem;
  background: blue;
`;

interface ActiveType {
  active: boolean;
}

export const SideMenu = styled.div<ActiveType>`
  width: 20rem;
  height: calc(100% - ${HEADER_HEIGHT});
  margin-top: ${HEADER_HEIGHT};
  background: lightgreen;
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
`;

export const MenuButton = styled.button`
  width: 3rem;
  background: lightpink;
`;
