import { keyframes } from "styled-components";

export const AniShow = keyframes`
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;

export const AniFrameIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100%{
    opacity: 1;
    transform: translateX(0%);
  }
`;

