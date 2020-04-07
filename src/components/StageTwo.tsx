import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import useFormState from '../contexts/formState';
import { incomeFreqOptions } from '../types/FormState';

import Panel from './Panel';
import Heading from './Heading';
import Spacer from './Spacer';
import ButtonRow from './ButtonRow';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import Subheading from './Subheading';
import FlexRow from './FlexRow';
import Input from './Input';
import Select from './Select';
import { ReactComponent as LeftArrow } from '../img/icons/arrow-left.svg';
import { ReactComponent as RightArrow } from '../img/icons/arrow-right.svg';

const InputExtra = styled.div`
  padding: 24px 4px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grey.dark};
  @media screen and (min-width: 720px) {
    font-size: 20px;
  }
`;
const IncomeInput = styled(Input)`
  text-align: right;
  width: 128px;
`;

const StageTwo: React.FC = () => {
  const { t } = useTranslation();
  const [{ incomeAmount, incomeFreq }, setFormState] = useFormState();

  const stageIsValid = incomeAmount !== null && !!incomeFreq;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (stageIsValid) {
          setFormState(prev => ({ ...prev, stage: 3 }));
        }
      }}
    >
      <Panel>
        {/* Header (and subhead description) - What is household income */}
        <Heading>{t('stageTwo.heading')}</Heading>
        <Spacer height='12px' />
        <Subheading>{t('stageTwo.subheading')}</Subheading>
        <Spacer height='48px' />

        {/* Income Amount Input */}
        <FlexRow inline>
          <InputExtra>$</InputExtra>
          <IncomeInput
            placeholder='00'
            autoFocus
            type='tel'
            required
            maxLength={7}
            onChange={e => {
              const input = parseInt(e.currentTarget.value.replace(/[^0-9]+/g, ''));
              const val = isNaN(input) ? null : input;
              setFormState(prev => ({ ...prev, incomeAmount: val }));
            }}
            value={incomeAmount?.toString() || ''}
          />
          <InputExtra>.00</InputExtra>
        </FlexRow>
        {/* Income Frequency Selector */}
        <FlexRow inline>
          <InputExtra>{t(`stageTwo.every`)}</InputExtra>
          {/* Unused alt 'per' instead of 'every' */}
          {/* <InputExtra>{t(`stageTwo.per`)}</InputExtra> */}
          <Select
            block
            isSearchable={false}
            options={incomeFreqOptions.map(freq => ({
              label: t(`stageTwo.${freq}`),
              value: freq
            }))}
            value={{
              label: t(`stageTwo.${incomeFreq}`),
              value: incomeFreq
            }}
            onChange={(selection: { label: string; value: typeof incomeFreq }) => {
              setFormState(prev => ({ ...prev, incomeFreq: selection.value }));
            }}
          />
        </FlexRow>
        <Spacer height='96px' mobileHeight='64px' />

        {/* Next/Prev Buttons */}
        <ButtonRow>
          <SecondaryButton
            type='button'
            onClick={e => {
              e.preventDefault();
              setFormState(prev => ({ ...prev, stage: 1 }));
            }}
          >
            <LeftArrow />
            <span>{t('formControls.previous')}</span>
          </SecondaryButton>
          <PrimaryButton disabled={!stageIsValid} type='submit'>
            <span>{t('formControls.next')}</span>
            <RightArrow />
          </PrimaryButton>
        </ButtonRow>
      </Panel>
    </form>
  );
};
export default StageTwo;
