import { keyframes } from 'styled-components';

export const SLIDE_DOWN = keyframes`
  0% {
    dislpay: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
    top: 45%;
  }

`;
