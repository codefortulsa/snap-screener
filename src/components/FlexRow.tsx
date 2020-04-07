import styled from 'styled-components/macro';

type Props = { align?: 'center' | 'start'; justify?: 'center' | 'start'; inline?: boolean };
const FlexRow = styled.div.attrs(({ align = 'center', justify = 'start' }: Props) => ({ align }))<
  Props
>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: ${({ align }) => (align === 'start' ? 'flex-start' : 'center')};
  justify-content: ${({ justify }) => (justify === 'center' ? 'center' : 'flex-start')};
  width: ${({ inline }) => (inline ? 'auto' : '100%')};
`;

export default FlexRow;
