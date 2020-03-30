import styled from 'styled-components/macro';
import PrimaryButton from './PrimaryButton';

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grey.darker};
  border: none;
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.grey.lightest};
    border: none;
    color: ${({ theme }) => theme.colors.primary.darker};
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary.light};
      }
    }
  }
  svg {
    path {
      fill: ${({ theme }) => theme.colors.grey.base};
    }
  }
`;
export default SecondaryButton;
