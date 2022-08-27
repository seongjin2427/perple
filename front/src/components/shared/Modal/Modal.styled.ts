import styled, { css } from 'styled-components';
import { SLIDE_DOWN } from 'styles/keyframe';

interface ToggleType {
  toggle: boolean;
}

export const BlackBackground = styled.div<ToggleType>`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: ${({ theme }) => theme.zIndex.modal};

  ${({ toggle }) =>
    toggle &&
    css`
      display: block;
    `}
`;

export const ModalContentWrapper = styled.div`
  display: block;
  position: fixed;
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
