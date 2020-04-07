import styled, { keyframes } from 'styled-components/macro';

const LoadingAnimation = keyframes`
  from {
      left: 0;
      width: 0;
    }
    30% {
      left: 0;
    }
    50% {
      width: 80%;
    }
    to {
      left: 100%;
    }
`;

const Loader = styled.div`
  position: relative;
  flex-shrink: 0;
  z-index: 100;
  height: 4px;
  margin-bottom: -4px;
  width: 100%;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  &:before {
    display: block;
    position: absolute;
    content: '';
    left: -200px;
    width: 200px;
    height: 4px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.primary.base};
    animation: ${LoadingAnimation} 600ms cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;
export default Loader;
