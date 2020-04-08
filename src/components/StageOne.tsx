import React from 'react';

import { useTranslation, Trans } from 'react-i18next';
import usePageView from '../hooks/usePageView';
import useFormState from '../contexts/formState';

import Panel from './Panel';
import Heading from './Heading';
import Spacer from './Spacer';
import NumberedRadioSelect from './NumberedRadioSelect';
import Question from './Question';
import ButtonRow from './ButtonRow';
import PrimaryButton from './PrimaryButton';
import { ReactComponent as RightArrow } from '../img/icons/arrow-right.svg';

const StageOne: React.FC = () => {
  const { t } = useTranslation();
  usePageView('Family | SNAP Screener');
  const [{ childrenUnder18, adultsOver18, adultsOver60 }, setFormState] = useFormState();

  const stageIsValid = childrenUnder18 !== null && adultsOver18 !== null && adultsOver60 !== null;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (stageIsValid) {
          setFormState(prev => ({ ...prev, stage: 2 }));
        }
      }}
    >
      <Panel>
        {/* Header - Tell about household */}
        <Heading>{t('stageOne.heading')}</Heading>
        <Spacer height='48px' />

        {/* Children under 18 */}
        <Question>
          <Trans i18nKey='stageOne.howManyChildrenUnder18'>
            How many children <strong>under the age of 18</strong> live in your home?
          </Trans>
        </Question>
        <NumberedRadioSelect formStateKey='childrenUnder18' />
        <Spacer height='32px' />

        {/* Adults over 18 */}
        <Question>
          <Trans i18nKey='stageOne.howManyAdultsOver18'>
            How many adults <strong>18 and over</strong> live in your home? <em>Including you.</em>
          </Trans>
        </Question>
        <NumberedRadioSelect formStateKey='adultsOver18' />
        <Spacer height='32px' />

        {/* Adults over 60 */}
        <Question>
          <Trans i18nKey='stageOne.howManyAdultsOver60'>
            How many adults <strong>over the age of 60</strong> live in your home?
          </Trans>
        </Question>
        <NumberedRadioSelect formStateKey='adultsOver60' />
        <Spacer height='48px' />

        {/* Next Button */}
        <ButtonRow>
          <div />
          <PrimaryButton disabled={!stageIsValid} type='submit'>
            <span>{t('formControls.next')}</span>
            <RightArrow />
          </PrimaryButton>
        </ButtonRow>
      </Panel>
    </form>
  );
};
export default StageOne;
