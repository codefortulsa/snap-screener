import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import usePageView from '../hooks/usePageView';
import { CLOUD_FUNCTIONS_SUBMIT_URL } from '../lib/config';
import FormState from '../types/FormState';
import useFormState from '../contexts/formState';
import useSchoolInfo from '../contexts/schoolInfo';
import kebabCase from 'lodash/kebabCase';

import Loader from './Loader';
import Panel from './Panel';
import Heading from './Heading';
import Spacer from './Spacer';
import Select from './Select';
import ButtonRow from './ButtonRow';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import InputLabel from './InputLabel';
import Input from './Input';
import { ReactComponent as LeftArrow } from '../img/icons/arrow-left.svg';

const Disclaimer = styled.div`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey.darker};
`;
const DevEmailBlock = styled.div`
  padding: 12px;
  border: 2px solid red;
  border-radius: 6px;
`;

const StageFour: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  usePageView('School | SNAP Screener');

  const [hideDevBlock, setHideDevBlock] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useFormState();
  const { school, devEmail } = formState;
  const [, schoolNames, isFetchingSchools] = useSchoolInfo();

  const stageIsValid =
    !isSubmitting &&
    !isFetchingSchools &&
    school &&
    (process.env.NODE_ENV !== 'development' || devEmail.trim());

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        if (stageIsValid) {
          try {
            setIsSubmitting(true);
            // Submit form data to cloud function for processing and emailing
            const resp = await fetch(CLOUD_FUNCTIONS_SUBMIT_URL, {
              method: 'POST',
              body: JSON.stringify(formState),
            });
            if (resp.status === 400) throw new Error(await resp.text());
            // Returns boolen with eligibility status
            const isEligible = await resp.json();
            // Go to page based on eligibility status
            history.replace(isEligible ? `/eligible/${kebabCase(school)}` : '/ineligible');
            // Reset form status
            setFormState({ ...new FormState() });
          } catch (error) {
            alert('An error occurred submitting this form. Please try again.\n' + error);
            setIsSubmitting(false);
          }
        }
      }}
    >
      {(isSubmitting || isFetchingSchools) && <Loader />}
      <Panel>
        {/* Header - Select School */}
        <Heading>{t('stageFour.heading')}</Heading>
        <Spacer height='48px' />

        {/* Search/Select school */}
        <Select
          placeholder={t('stageFour.searchSchools')}
          options={schoolNames.map(name => ({ label: name, value: name }))}
          value={school ? { label: school, value: school } : null}
          onChange={(selection: { label: string; value: string }) => {
            setFormState(prev => ({ ...prev, school: selection.value }));
          }}
        />

        <Spacer height='96px' />

        {/* Submit Button */}
        <ButtonRow>
          <SecondaryButton
            type='button'
            onClick={e => {
              e.preventDefault();
              setFormState(prev => ({ ...prev, stage: 3 }));
            }}
          >
            <LeftArrow />
            <span>{t('formControls.previous')}</span>
          </SecondaryButton>
          <PrimaryButton disabled={!stageIsValid} type='submit'>
            <span>{t('formControls.submit')}</span>
          </PrimaryButton>
        </ButtonRow>
        <Spacer height='32px' />
        {stageIsValid && <Disclaimer>{t('stageFour.pressingSubmitDisclaimer')}</Disclaimer>}
      </Panel>
      {/* Development email (if in dev environment) */}
      {process.env.NODE_ENV === 'development' && (
        <>
          {!hideDevBlock && (
            <>
              <Spacer height='12px' />
              <DevEmailBlock>
                <InputLabel>
                  <strong>You're in dev mode.</strong>
                  <br />
                  Which email address would you like to send tests to?
                  <br />
                  <Input
                    block
                    type='email'
                    required
                    placeholder='developer email address'
                    onChange={e => {
                      const val = e.currentTarget.value;
                      setFormState(prev => ({ ...prev, devEmail: val }));
                    }}
                    value={devEmail}
                  />
                  <small>This block will not show in production</small>
                </InputLabel>
              </DevEmailBlock>
            </>
          )}
          <Spacer height='12px' />
          <a
            href='/'
            onClick={e => {
              e.preventDefault();
              setHideDevBlock(prev => !prev);
            }}
          >
            {hideDevBlock ? 'Show' : 'Hide'}
          </a>
        </>
      )}
    </form>
  );
};
export default StageFour;
