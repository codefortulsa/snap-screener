import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form'

const NumberedRadioField = ({name, value, label, validate, className}) => {
  const { t } = useTranslation();

  return (
    <div className={('numbered ' + className).trim()}>
      <Field
        name={name}
        component="input"
        type="radio"
        value={value}
        validate={validate}
      />
      <div className="state">
        <label>{t(label ? label : value)}</label>
      </div>
    </div>
  )
}

NumberedRadioField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  label: PropTypes.any,
  validate: PropTypes.func
}

NumberedRadioField.defaultProps = {
  className: '',
  validate: () => {}
}

export default NumberedRadioField
