import { keyframes } from 'styled-components';

export const SlideToLeft = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const SlideToRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 1;
  }
`;
