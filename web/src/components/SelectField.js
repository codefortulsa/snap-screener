import React from 'react'
import { Field } from 'react-final-form'

const SelectField = ({component, ...props}) => {
  return (
    <div className="relative">
      <Field
        {...props}
        component={component}
      >
        {props.children}
      </Field>
      <div className="pointer-events-none absolute inset-y-0 right-0 mr-1 flex items-center">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  )
}

SelectField.propTypes = Field.propTypes

SelectField.defaultProps = {
  ...Field.defaultProps,
  component: 'select',
}

export default SelectField
