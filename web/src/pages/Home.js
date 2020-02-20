import React from 'react'
import { Link } from "react-router-dom"
import { withTranslation, Trans } from 'react-i18next'
import {default as BasePage} from '../components/Page'

import iconFamily from '../img/icons/family.svg'
import iconFood from '../img/icons/food.svg'
import iconPhone from '../img/icons/phone.svg'

const Page = () => (
  <BasePage>
    <div>
      <h1><Trans>Find out if you are eligible for food assistance.</Trans></h1>
      <div className="home-icons">
        <p><img alt="" src={iconFamily} /><Trans>Tell us some information about the members of your family.</Trans></p>
        <p><img alt="" src={iconPhone} /><Trans>Let us know how we can get in touch with you.</Trans></p>
        <p><img alt="" src={iconFood} /><Trans>Find out what assistance you might qualify for.</Trans></p>
      </div>
      <p className="my-16">
        <Link className="btn" to="/form"><Trans>Get Started</Trans></Link>
      </p>
    </div>
  </BasePage>
)

export default withTranslation()(Page)
