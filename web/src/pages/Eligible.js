import React from 'react'
import { withTranslation, Trans } from 'react-i18next'
import BasePage from '../components/Page'
import ContactInformation from '../components/ContactInformation'
import iconConnect from '../img/icons/family.svg'

const Page = () => (
  <BasePage>
    <div className="light-blue-page-content">
      <div className="lg:flex text-left lg:flex-wrap">
        <div className="w-full">
          <img alt="" src={iconConnect} className="float-right m-4 mr-0 w-32 hidden md:inline" />
          <h1><Trans>You may be eligible for food assistance.</Trans></h1>
          <p><Trans>OKDHS determines eligibility for SNAP benefits. Based on the income information you provided you are likely eligible to receive SNAP benefits.</Trans></p>
        </div>

        <div className="lg:w-2/3 lg:pr-16">

          <h2><Trans>What happens next:</Trans></h2>

          <p><Trans>A school staff member will contact you within 3-5 business days to assist you with the SNAP application.</Trans></p>

          <ContactInformation />
        </div>

        <div className="lg:w-1/3">
          <h2><Trans>You will need the following information when applying for SNAP benefits:</Trans></h2>

          <ul>
            <li><Trans>All household members: name, date of birth, social security number (if available)</Trans></li>
            <li><Trans>Income (if applicable): paycheck stubs, child support, alimony, social security payments, etc.</Trans></li>
            <li><Trans>Expenses: housing and utility expenses</Trans></li>
            <li><Trans>Utility bills to verify residency</Trans></li>
            <li><Trans>Private health insurance information</Trans></li>
          </ul>

          <p><Trans>For immediate resource assistance <a href="tel:211">Call 211</a>.</Trans></p>
          <p><Trans>You can also contact the <a href="https://www.tulsa-health.org/personal-and-family-health/child-health/wic">Tulsa Health Department WIC Office</a>.</Trans></p>
          <p><Trans>You can also apply for SNAP benefits online <a href="https://www.okdhslive.org/AuthApplicantLogin.aspx">click here</a>.</Trans></p>

          <p>
            <button className="btn"><Trans>Apply Online</Trans></button>
          </p>
        </div>
      </div>
    </div>
  </BasePage>
)

export default withTranslation()(Page)
