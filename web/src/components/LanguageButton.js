import React from 'react'
import { useTranslation } from 'react-i18next';

const LanguageButton = ({code, name}) => {
  const { i18n } = useTranslation()

  const changeLanguage = lang => {
    i18n.changeLanguage(lang)
  }

  return (
    <button
      className={i18n.language===code?'active':''}
      onClick={() => changeLanguage(code)}
    >{name}</button>
  )
}

export default LanguageButton
