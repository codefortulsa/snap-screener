import styled, { css } from 'styled-components/macro';
import ReactSelect from 'react-select';

const Select = styled(ReactSelect).attrs({ classNamePrefix: 'react-select' })<{ block?: boolean }>`
  flex-shrink: 0;
  min-width: 128px;

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `};

  .react-select__control {
    padding: 6px 2px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.primary.darker};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 2px solid ${({ theme }) => theme.colors.primary.darker};
    @media screen and (min-width: 720px) {
      padding: 6px;
      font-size: 20px;
    }
    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

export default Select;
