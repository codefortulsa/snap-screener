import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation, Trans } from 'react-i18next';

import Panel from '../components/Panel';
import Heading from '../components/Heading';
import SecondaryHeading from '../components/SecondaryHeading';
import Subheading from '../components/Subheading';
import Spacer from '../components/Spacer';
import { ReactComponent as IconFamily } from '../img/icons/family.svg';

const PageWrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;

  svg {
    display: block;
    max-width: 64px;
    margin: 0 auto 48px;
    @media screen and (min-width: 720px) {
      max-width: 96px;
    }
    path,
    ellipse {
      fill: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

const Ineligible: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Panel>
        <IconFamily />
        {/* Header - You may be eligible */}
        <Heading>{t('ineligible.heading')}</Heading>
        <Spacer height='8px' />
        <Subheading>{t('ineligible.subheading')}</Subheading>
        <Spacer height='48px' />

        {/* What happens next */}
        <SecondaryHeading>{t('ineligible.otherResourcesHeading')}</SecondaryHeading>
        <Spacer height='8px' />
        <Subheading>
          <Trans i18nKey='ineligible.otherResourcesDescription'>
            For immediate community resources <a href='https://csctulsa.org/211eok/'>click here</a>.
          </Trans>
        </Subheading>
        <Spacer height='48px' />
      </Panel>
    </PageWrapper>
  );
};
export default Ineligible;
