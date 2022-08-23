import styled, { css } from 'styled-components';
import { SLIDE_DOWN } from 'styles/keyframe';

interface ActiveType {
  active: boolean;
}

export const Container = styled.div<ActiveType>`
  display: none;
  background: none;
  position: fixed;

  ${({ active }) =>
    active &&
    css`
      display: block;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
    `}
`;

export const ModalWrapper = styled.div`
  display: block;
  position: absolute;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${SLIDE_DOWN} 0.5s ease-in-out forwards;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.primary.hex};
  margin-bottom: 1rem;
  font-weight: bold;
`;
