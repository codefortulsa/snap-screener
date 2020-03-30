import styled from 'styled-components/macro';

const InputLabel = styled.label`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary.dark};
  @media screen and (min-width: 720px) {
    font-size: 20px;
  }
  & > input,
  .react-select__control {
    margin-top: 8px;
  }
`;
export default InputLabel;
