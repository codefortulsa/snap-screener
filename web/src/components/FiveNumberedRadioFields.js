import React from 'react'
import NumberedRadioField from './NumberedRadioField'
import propTypes from 'prop-types'

const FiveNumberedRadioFields = ({startIndex, ...props}) => (
  <div className="flex flex-wrap">
    <div className="flex-no-wrap">
      <NumberedRadioField {...props} value={(startIndex + 0) + ''} />
      <NumberedRadioField {...props} value={(startIndex + 1) + ''} />
      <NumberedRadioField {...props} value={(startIndex + 2) + ''} />
    </div>
    <div className="flex-no-wrap">
      <NumberedRadioField {...props} value={(startIndex + 3) + ''} />
      <NumberedRadioField {...props} value={(startIndex + 4) + '+'} label="more" className="more" />
    </div>
  </div>
)

FiveNumberedRadioFields.propTypes = {
  startIndex: propTypes.number,
  ...NumberedRadioField.propTypes
}

FiveNumberedRadioFields.defaultProps = {
  startIndex: 0,
  ...NumberedRadioField.defaultProps
}

export default FiveNumberedRadioFields
