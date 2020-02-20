import React from 'react'
import { Field } from 'react-final-form'
import { Trans } from 'react-i18next';

const required = value => (value ? undefined : <Trans>Required</Trans>)

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span className="error">{error}</span> : null
    }
  />
)

export { Error, required }
export default Error
