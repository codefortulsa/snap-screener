import React from 'react'
import { withTranslation, Trans } from 'react-i18next';
import logo from '../img/tulsa-public-schools-logo.svg';

const Footer = () => (
  <footer>
    <p><img className="h-32 mx-auto" alt="" src={logo} /></p>
    <p><Trans>Special thanks to <b>Tulsa Public Schools</b> for their support and partnership on this project. The Supplemental Nutrition Assistance Program (SNAP) is a federal program, administered by the office of the <b>Oklahoma Department of Human Services</b> (OKDHS). For more information about OKDHS, visit <a href="http://www.okdhslive.org/">okdhslive.org</a> or call (405) 487-5483.</Trans></p>
  </footer>
)

export default withTranslation()(Footer)
