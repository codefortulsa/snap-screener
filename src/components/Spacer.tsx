import styled, { css } from 'styled-components/macro';

interface Props {
  width?: string;
  height?: string;
  mobileWidth?: string;
  mobileHeight?: string;
}
const Spacer = styled.div<Props>`
  flex-shrink: 0;
  position: relative;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '16px')};

  ${({ mobileWidth }) =>
    !!mobileWidth !== undefined &&
    css`
      @media (max-width: 720px) {
        width: ${mobileWidth};
      }
    `};

  ${({ mobileHeight }) =>
    !!mobileHeight !== undefined &&
    css`
      @media (max-width: 720px) {
        height: ${mobileHeight};
      }
    `};
`;
export default Spacer;
