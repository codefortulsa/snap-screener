import React, { useRef } from 'react';
import styled from 'styled-components/macro';

import { useTranslation } from 'react-i18next';
import usePageView from '../hooks/usePageView';
import useFormState from '../contexts/formState';
import { contactMethodOptions } from '../types/FormState';

import Panel from './Panel';
import Heading from './Heading';
import Spacer from './Spacer';
import Question from './Question';
import InputLabel from './InputLabel';
import Input from './Input';
import RadioLabel from './RadioLabel';
// import Select from './Select';
import ButtonRow from './ButtonRow';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { ReactComponent as LeftArrow } from '../img/icons/arrow-left.svg';
import { ReactComponent as RightArrow } from '../img/icons/arrow-right.svg';

const CityStateZipRow = styled.div`
  display: flex;
  align-items: center;
  label {
    flex: 1;
  }
  @media screen and (min-width: 720px) {
    label:first-child {
      flex: 2;
    }
  }
`;

const StageThree: React.FC = () => {
  const { t } = useTranslation();
  usePageView('Contact | SNAP Screener');
  const [
    { firstName, contactMethod, email, phone, contactPermission, address, city, zip },
    setFormState,
  ] = useFormState();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const stageIsValid = !!(
    firstName.trim() &&
    ((contactMethod === 'Email' && email.trim()) ||
      (['Phone', 'Text'].includes(contactMethod) && phone.trim()))
  );

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (stageIsValid) {
          setFormState(prev => ({ ...prev, stage: 4 }));
        }
      }}
    >
      <Panel>
        {/* Header - How we can get in touch */}
        <Heading>{t('stageThree.heading')}</Heading>
        <Spacer height='48px' />

        {/* First name */}
        <InputLabel>
          {t('stageThree.yourFirstName')}
          <Input
            block
            autoFocus
            minLength={2}
            maxLength={100}
            required
            onChange={e => {
              const val = e.currentTarget.value;
              setFormState(prev => ({ ...prev, firstName: val }));
            }}
            value={firstName}
          />
        </InputLabel>
        <Spacer height='48px' />

        {/* Contact method */}
        <Question>{t('stageThree.whichContactMethod')}</Question>
        {/* Method selection (Email, Phone, Text) */}
        {contactMethodOptions.map(option => (
          <RadioLabel key={option}>
            <input
              name='contactMethod'
              type='radio'
              value={option}
              checked={contactMethod === option}
              onChange={() => {
                setFormState(prev => ({ ...prev, contactMethod: option }));
                // Focus appropriate input (need to defer cycle)
                setTimeout(() => {
                  switch (option) {
                    case 'Email':
                      emailInputRef.current?.focus();
                      break;
                    case 'Phone':
                    case 'Text':
                      phoneInputRef.current?.focus();
                      break;
                  }
                });
              }}
            />
            <span>{t(`stageThree.${option}`)}</span>
          </RadioLabel>
        ))}
        {/* Email input (conditional) */}
        {contactMethod === 'Email' && (
          <Input
            block
            type='email'
            required
            maxLength={200}
            ref={emailInputRef}
            placeholder={t('stageThree.emailAddress')}
            onChange={e => {
              const val = e.currentTarget.value;
              setFormState(prev => ({ ...prev, email: val }));
            }}
            value={email}
          />
        )}
        {/* Phone input (conditional) */}
        {(contactMethod === 'Phone' || contactMethod === 'Text') && (
          <Input
            block
            type='tel'
            required
            minLength={10}
            maxLength={16}
            ref={phoneInputRef}
            placeholder={t('stageThree.phoneNumber')}
            onChange={e => {
              const val = e.currentTarget.value;
              setFormState(prev => ({ ...prev, phone: val }));
            }}
            value={phone}
          />
        )}
        <Spacer height='48px' />

        {/* Contact permission (Yes or No) */}
        <Question>{t('stageThree.contactPermission')}</Question>
        {['Yes', 'No'].map(option => (
          <RadioLabel key={option}>
            <input
              name='contactPermission'
              type='radio'
              value={option}
              checked={option === 'Yes' ? !!contactPermission : !contactPermission}
              onChange={() => {
                setFormState(prev => ({ ...prev, contactPermission: option === 'Yes' }));
              }}
            />
            <span>{t(`stageThree.${option}`)}</span>
          </RadioLabel>
        ))}
        <Spacer height='48px' />

        {/* Address Info */}
        <InputLabel>
          {t('stageThree.address')}
          <Input
            block
            maxLength={200}
            onChange={e => {
              const val = e.currentTarget.value;
              setFormState(prev => ({ ...prev, address: val }));
            }}
            value={address}
          />
        </InputLabel>
        <Spacer height='16px' />
        {/* City, State, Zip */}
        <CityStateZipRow>
          {/* City */}
          <InputLabel>
            {t('stageThree.city')}
            <Input
              block
              maxLength={200}
              onChange={e => {
                const val = e.currentTarget.value;
                setFormState(prev => ({ ...prev, city: val }));
              }}
              value={city}
            />
          </InputLabel>
          <Spacer width='12px' />
          {/* State selector */}
          {/* TODO: Limited to Tulsa for now so can assume OK state. */}
          {/* May eventually need to collect state info though. */}
          {/* <InputLabel>
            {t('stageThree.state')}
            <Select
              block
              options={Object.entries(stateOptions).map(([value, label]) => ({ label, value }))}
              value={{ label: stateOptions[state], value: state }}
              onChange={(selection: { label: string; value: typeof state }) => {
                setFormState(prev => ({ ...prev, state: selection.value }));
              }}
            />
          </InputLabel>
          <Spacer width='12px' /> */}
          {/* Zip code */}
          <InputLabel>
            {t('stageThree.zip')}
            <Input
              block
              type='tel'
              required
              minLength={5}
              maxLength={10}
              onChange={e => {
                const val = e.currentTarget.value;
                setFormState(prev => ({ ...prev, zip: val }));
              }}
              value={zip}
            />
          </InputLabel>
        </CityStateZipRow>

        <Spacer height='96px' mobileHeight='64px' />

        {/* Next/Prev Buttons */}
        <ButtonRow>
          <SecondaryButton
            type='button'
            onClick={e => {
              e.preventDefault();
              setFormState(prev => ({ ...prev, stage: 2 }));
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
export default StageThree;
