import styled from 'styled-components/macro';

const Subheading = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.dark};
  @media screen and (min-width: 720px) {
    font-size: 18px;
  }
`;
export default Subheading;
