import React from 'react';
import styled from 'styled-components/macro';
import useFormState from '../contexts/formState';

import Breadcrumbs from '../components/Breadcrumbs';
import StageOne from '../components/StageOne';
import StageTwo from '../components/StageTwo';
import StageThree from '../components/StageThree';
import StageFour from '../components/StageFour';

const PageWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const Form: React.FC = () => {
  const [{ stage }] = useFormState();

  return (
    <PageWrapper>
      <Breadcrumbs />

      {/* Family Information */}
      {stage === 1 && <StageOne />}

      {/* Income Information */}
      {stage === 2 && <StageTwo />}

      {/* Contact Information */}
      {stage === 3 && <StageThree />}

      {/* School Selection */}
      {stage === 4 && <StageFour />}
    </PageWrapper>
  );
};
export default Form;
