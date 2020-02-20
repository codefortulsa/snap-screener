import React from 'react'
import { Link } from "react-router-dom"
import { Trans } from 'react-i18next'
import LanguageButton from './LanguageButton'

const Header = ({ logo }) => {
  return (
    <header>
      <Link to="/" className="block">
        <img alt="" src={logo} className="max-w-full mx-auto" />
      </Link>

      <div className="control-bar ; flex items-center">
        <div className="flex-1 text-left">
          <div className="font-bold leading-tight text-2xl md:text-4xl">
            <Trans>Food Assistance</Trans>
          </div>
        </div>
        <div className="flex-1 text-right text-xs md:text-base">
          <LanguageButton code="en" name="English" />
          {' '}|{' '}
          <LanguageButton code="es" name="Español" />
        </div>
      </div>
    </header>
  )
}

export default Header
