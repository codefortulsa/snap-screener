import React from 'react'
import { withTranslation } from 'react-i18next'
import BasePage from '../components/Page'
import Form from '../components/Form'

const Page = () => (
  <BasePage>
    <Form />
  </BasePage>
)

export default withTranslation()(Page)
