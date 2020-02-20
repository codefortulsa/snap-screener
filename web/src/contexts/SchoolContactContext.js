import React, { useState } from 'react'
import { default as schoolContacts } from '../data/contacts'

const SchoolContactContext = React.createContext({})
const SchoolContactContextConsumer = SchoolContactContext.Consumer

function SchoolContactContextProvider(props) {
  const [selectedSchoolContact, setSelectedSchoolContact] = useState(null)

  function setSelectedSchoolContactBySchool(school) {
    const contacts = schoolContacts[school]
    const selectedSchoolContact = {school, contacts}

    return setSelectedSchoolContact(selectedSchoolContact)
  }

  return (
    <SchoolContactContext.Provider value={ {selectedSchoolContact, setSelectedSchoolContactBySchool} }>
      {props.children}
    </SchoolContactContext.Provider>
  )
}

function schoolContactOptions() {
  return Object.keys(schoolContacts).map(school => <option key={school} value={school}>{school}</option>)
}

export {
  SchoolContactContext,
  SchoolContactContextConsumer,
  SchoolContactContextProvider,
  schoolContacts,
  schoolContactOptions,
}
export default SchoolContactContext
