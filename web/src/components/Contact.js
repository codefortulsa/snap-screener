import React from 'react'
import { Field } from 'react-final-form'
import { withTranslation, Trans } from 'react-i18next';

import Condition from './Condition'
import { Error, required } from './Error'

const Contact = ({ name }) => (
  <React.Fragment>
    <div className="contact text-left">
      <div className="flex flex-col-reverse">
        <label><Trans>Your first name</Trans> <Error name={`${name}.firstName`} /></label>
        <Field
          name={`${name}.firstName`}
          component="input"
          type="text"
          validate={required}
          autoFocus
        />
      </div>

      <div className="my-4">
        <p><Trans>How do you want to be contacted?</Trans> <Error name={`${name}.contactPreference`} /></p>

        <div className="pretty p-default p-round">
          <Field
            name={`${name}.contactPreference`}
            component="input"
            type="radio"
            value="email"
            validate={required}
          />
          <div className="state">
            <label><Trans>Email</Trans></label>
          </div>
        </div>

        <div className="pretty p-default p-round">
          <Field
            name={`${name}.contactPreference`}
            component="input"
            type="radio"
            value="phone"
            validate={required}
          />
          <div className="state">
            <label><Trans>Phone</Trans></label>
          </div>
        </div>

        <div className="pretty p-default p-round">
          <Field
            name={`${name}.contactPreference`}
            component="input"
            type="radio"
            value="sms"
            validate={required}
          />
          <div className="state">
            <label><Trans>Text Message</Trans></label>
          </div>
        </div>
      </div>

      <Condition when={`${name}.contactPreference`} is={['phone','sms']}>
        <div className="flex flex-col-reverse">
          <label><Trans>Phone Number</Trans> <Error name={`${name}.phone`} /></label>
          <Field
            name={`${name}.phone`}
            component="input"
            type="text"
            validate={required}
          />
        </div>
      </Condition>

      <Condition when={`${name}.contactPreference`} is={'email'}>
        <div className="flex flex-col-reverse">
          <label><Trans>Email Address</Trans> <Error name={`${name}.email`} /></label>
          <Field
            name={`${name}.email`}
            component="input"
            type="email"
            validate={required}
          />
        </div>
      </Condition>

      <div className="my-4">
        <p><Trans>May we contact you for food assistance opportunities?</Trans> <Error name={`${name}.contactMe`} /></p>

        <div className="pretty p-default p-round">
          <Field
            name={`${name}.contactMe`}
            component="input"
            type="radio"
            value="yes"
            validate={required}
          />
          <div className="state">
            <label><Trans>Yes</Trans></label>
          </div>
        </div>

        <div className="pretty p-default p-round">
          <Field
            name={`${name}.contactMe`}
            component="input"
            type="radio"
            value="no"
            validate={required}
          />
          <div className="state">
            <label><Trans>No</Trans></label>
          </div>
        </div>
      </div>

    </div>
  </React.Fragment>
)

export default withTranslation('contact')(Contact)
