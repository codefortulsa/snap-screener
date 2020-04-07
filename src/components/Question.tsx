import styled from 'styled-components/macro';

const Question = styled.div`
  margin-bottom: 12px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary.dark};
  strong {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary.base};
  }
  @media screen and (min-width: 720px) {
    font-size: 20px;
  }
`;
export default Question;
