import styled from 'styled-components/macro';

const Input = styled.input<{ block?: boolean }>`
  width: ${({ block }) => (block ? '100%' : 'auto')};
  padding: 12px 8px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary.darker};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme }) => theme.colors.primary.darker};
  @media screen and (min-width: 720px) {
    padding: 12px;
    font-size: 20px;
  }
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary.dark};
  }
`;
export default Input;
