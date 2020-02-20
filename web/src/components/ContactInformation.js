import React, { useContext } from 'react'
import { withTranslation } from 'react-i18next'
import SchoolContactContext from '../contexts/SchoolContactContext'

function ContactInformation(props) {
  const { selectedSchoolContact } = useContext(SchoolContactContext)

  if (!selectedSchoolContact) {
    return null
  }

  return (
    <div>
      { selectedSchoolContact.contacts.map((contact, index) => (
        <p key={index}>
          <b className="text-lg">{ `${contact.firstName} ${contact.lastName}` }</b><br />
          {contact.school}<br />
          {contact.phone}<br />
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      ))}
    </div>
  )
}

export { ContactInformation }
export default withTranslation()(ContactInformation)
