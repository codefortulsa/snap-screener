import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const ButtonLink = styled(Link)`
  position: relative;
  display: block;
  @media screen and (min-width: 720px) {
    width: 384px;
    margin: 0 auto;
  }
  padding: 16px 24px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme }) => theme.colors.primary.darkest};
  background-color: ${({ theme }) => theme.colors.primary.darker};
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary.darker};
    background-color: ${({ theme }) => theme.colors.primary.darkest};
  }
  text-align: center;
  color: white;
  text-decoration: none;
  font-size: 20px;
`;
export default ButtonLink;
