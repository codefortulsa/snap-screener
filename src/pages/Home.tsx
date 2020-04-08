import React from 'react';
import styled from 'styled-components/macro';

import { withTranslation, useTranslation } from 'react-i18next';
import usePageView from '../hooks/usePageView';
import useFormState from '../contexts/formState';

import Panel from '../components/Panel';
import Spacer from '../components/Spacer';
import ButtonLink from '../components/ButtonLink';
import { ReactComponent as IconFamily } from '../img/icons/family.svg';
import { ReactComponent as IconPhone } from '../img/icons/phone.svg';
import { ReactComponent as IconFood } from '../img/icons/food.svg';
import { ReactComponent as ArrowSvg } from '../img/icons/chevron-right.svg';

const Heading = styled.h2`
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary.darker};
  @media screen and (min-width: 720px) {
    font-size: 30px;
  }
`;
const PanelsFlex = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 720px) {
    flex-direction: row;
  }
`;
const StepPanel = styled(Panel)`
  flex: 1;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 18px;
  @media screen and (min-width: 720px) {
    font-size: 20px;
  }

  svg {
    max-width: 64px;
    margin-bottom: 24px;
    @media screen and (min-width: 720px) {
      max-width: 96px;
    }
    path,
    ellipse {
      fill: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;
const StepNumber = styled.div`
  text-align: center;
  position: absolute;
  top: 8px;
  left: 8px;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary.lightest};
  border: 2px solid ${({ theme }) => theme.colors.primary.lighter};
  color: ${({ theme }) => theme.colors.primary.base};
  font-size: 20px;
  font-weight: bold;
`;
const Arrow = styled(ArrowSvg)`
  width: 100%;
  height: 48px;
  transform: rotate(90deg);
  path {
    fill: ${({ theme }) => theme.colors.grey.darker};
  }
  @media screen and (min-width: 720px) {
    width: 48px;
    height: 100%;
    transform: rotate(0);
  }
`;

const Home: React.FC = () => {
  const { t } = useTranslation();
  usePageView('Get Started | SNAP Screener');
  const [{ stage }] = useFormState();
  return (
    <>
      {/* Heading - Find out eligibility */}
      <Heading>{t('home.heading')}</Heading>

      {/* 3-steps panels */}
      <PanelsFlex>
        {/* Step 1 - Family info */}
        <StepPanel>
          <StepNumber>1</StepNumber>
          {/* <img alt='Family Icon' src={IconFamily} /> */}
          <IconFamily />
          {t('home.stepOne')}
        </StepPanel>
        <div>
          <Arrow />
        </div>

        {/* Step 2 - Contact info */}
        <StepPanel>
          <StepNumber>2</StepNumber>
          <IconPhone />
          {t('home.stepTwo')}
        </StepPanel>
        <div>
          <Arrow />
        </div>

        {/* Step 3 - Eligibility */}
        <StepPanel>
          <StepNumber>3</StepNumber>
          <IconFood />
          {t('home.stepThree')}
        </StepPanel>
      </PanelsFlex>

      {/* Get Started Link/Button */}
      <Spacer height='32px' />
      <ButtonLink to='/form'>{stage === 1 ? t('home.getStarted') : t('home.continue')}</ButtonLink>
      <Spacer height='96px' />
    </>
  );
};
export default withTranslation()(Home);
