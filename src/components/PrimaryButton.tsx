import styled from 'styled-components/macro';

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary.darker};
  border: 2px solid ${({ theme }) => theme.colors.primary.darkest};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.primary.lightest};
  font-size: 18px;
  font-weight: bold;
  @media screen and (min-width: 720px) {
    min-width: 192px;
    padding: 16px 32px;
    font-size: 20px;
  }
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.darkest};
    border: 2px solid ${({ theme }) => theme.colors.primary.darker};
    color: white;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  svg {
    width: 24px;
    path {
      fill: ${({ theme }) => theme.colors.primary.light};
    }

    &:first-child {
      margin-left: -8px;
      margin-right: 12px;
    }
    &:last-child {
      margin-left: 12px;
      margin-right: -8px;
    }
  }
`;
export default PrimaryButton;
