import styled, { keyframes } from "styled-components";

const rotate = keyframes`
100% {
      transform: rotate(360deg);
    }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export const Loader = styled.svg`
  animation: ${rotate} 2s linear infinite;

  circle {
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;
