import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import logoImage from '../img/HFO_logo_horiz.png'
import logoImage_white from '../img/HFO_logo_horiz-white.png'
import { createBrowserHistory } from 'history'

const Page = props => {
  const history = createBrowserHistory()

  const logo = () => {
    if (props.bodyClass.indexOf('dark-blue') !== -1) {
      return logoImage_white
    }

    return logoImage
  }

  useEffect(() => {
    document.body.dataset['pageHash'] = history.location.hash
    document.body.dataset['pagePathname'] = history.location.pathname

    if (props.bodyClass) {
      document.body.classList.add(...props.bodyClass.split(' '))
    }

    return () => {
      if (props.bodyClass) {
        document.body.classList.remove(...props.bodyClass.split(' '))
      }
    }
  })

  return (
    <div>
      <Header logo={logo()} />

      {props.children}

      <Footer />
    </div>
  )
}

Page.propTypes = {
  bodyClass: PropTypes.string
}

Page.defaultProps = {
  bodyClass: ''
}

export { Page }
export default Page
