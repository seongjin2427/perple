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

export const DROP_DOWN = keyframes`
  0% {
    max-height: 0rem;
  }
  100% {
    max-height: 39rem;
  }
`;

export const DROP_UP = keyframes`
  0% {
    max-height: 39rem;
  }
  100% {
    max-height: 0rem;
  }
`;

export const LOAD_EFFECT = keyframes`
  0% {
    opacity: 0;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
