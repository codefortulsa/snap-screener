import React from 'react';
import useFormState from '../contexts/formState';
import FormState, { numberedSelectionOptions } from '../types/FormState';
import RadioLabel from './RadioLabel';

const NumberedRadioSelect: React.FC<{ formStateKey: keyof FormState }> = ({ formStateKey }) => {
  const [formState, setFormState] = useFormState();
  return (
    <>
      {numberedSelectionOptions.map(option => (
        <RadioLabel key={option}>
          <input
            name={formStateKey}
            type='radio'
            value={option}
            checked={formState[formStateKey] === option}
            onChange={() => setFormState(prev => ({ ...prev, [formStateKey]: option }))}
          />
          <span>{option}</span>
        </RadioLabel>
      ))}
    </>
  );
};
export default NumberedRadioSelect;
