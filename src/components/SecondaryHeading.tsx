import styled from 'styled-components/macro';

const SecondaryHeading = styled.h3`
  margin: 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.grey.darker};
  @media screen and (min-width: 720px) {
    font-size: 22px;
  }
`;
export default SecondaryHeading;
