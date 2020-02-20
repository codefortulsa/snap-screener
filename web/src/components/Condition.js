import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => ([is].flat().includes(value) ? children : null)}
  </Field>
)

Condition.propTypes = {
  when: PropTypes.string.isRequired,
  is: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  children: PropTypes.any,
}

Condition.defaultProps = {}

export { Condition }
export default Condition
