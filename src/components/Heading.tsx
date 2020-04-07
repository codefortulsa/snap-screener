import styled from 'styled-components/macro';

const Heading = styled.h2`
  margin: 0;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary.darker};
  @media screen and (min-width: 720px) {
    font-size: 30px;
  }
`;
export default Heading;
