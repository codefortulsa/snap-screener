import styled from 'styled-components/macro';

const RadioLabel = styled.label`
  span {
    display: inline-block;
    padding: 4px 8px;
    margin: 0 8px 8px 0;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.grey.lightest};
    border: 2px solid ${({ theme }) => theme.colors.grey.lighter};
    color: ${({ theme }) => theme.colors.grey.darker};
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.primary.lightest};
      border: 2px solid ${({ theme }) => theme.colors.primary.lighter};
      color: ${({ theme }) => theme.colors.grey.darkest};
    }
  }
  input {
    position: absolute;
    opacity: 0;
    &:focus ~ span {
      box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary.light};
      border: 2px solid ${({ theme }) => theme.colors.primary.lighter};
    }
    &:checked ~ span {
      background-color: ${({ theme }) => theme.colors.primary.darker};
      border: 2px solid ${({ theme }) => theme.colors.primary.dark};
      color: white;
    }
  }
`;
export default RadioLabel;
