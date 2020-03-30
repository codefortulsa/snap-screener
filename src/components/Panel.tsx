import styled from 'styled-components/macro';

const Panel = styled.div`
  position: relative;
  padding: 24px 12px;
  @media screen and (min-width: 720px) {
    padding: 32px 24px;
  }
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: white;
`;
export default Panel;
