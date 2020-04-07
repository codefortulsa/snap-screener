import React from 'react';
import styled from 'styled-components/macro';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

const FlexColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;
const PageContent = styled.div`
  flex: 1;
  padding: 12px;
  @media screen and (min-width: 480px) {
    padding: 24px;
  }
`;

const PageWrapper: React.FC = ({ children }) => {
  return (
    <FlexColumn>
      <PageHeader />
      <PageContent>{children}</PageContent>
      <PageFooter />
    </FlexColumn>
  );
};
export default PageWrapper;
