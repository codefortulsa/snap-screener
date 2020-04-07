import React, { createContext, useContext, useState } from 'react';
import FormState from '../types/FormState';

// Form State Context ( with hook shortcut )
const formStateContext = createContext<
  [FormState, React.Dispatch<React.SetStateAction<FormState>>]
>([{ ...new FormState() }, () => {}]);
const useFormState = () => useContext(formStateContext);
export default useFormState;

// Context definition w/ provider
export const FormStateProvider: React.FC = ({ children }) => {
  const state = useState<FormState>({ ...new FormState() });
  return <formStateContext.Provider value={state}>{children}</formStateContext.Provider>;
};
