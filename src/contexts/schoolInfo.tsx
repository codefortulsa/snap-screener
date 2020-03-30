import React, { createContext, useContext, useState, useEffect } from 'react';
import SchoolContact from '../types/SchoolContact';
import { GSHEETS_SHEET_ID, GSHEETS_SHEET_NAME, GSHEETS_API_KEY } from '../lib/config';
import uniq from 'lodash/uniq';
import camelCase from 'lodash/camelCase';

// Form State Context ( with hook shortcut )
const fetchingSchoolInfo: [SchoolContact[], string[], boolean] = [[], [], true];
const schoolInfoContext = createContext(fetchingSchoolInfo);
const useSchoolInfo = () => useContext(schoolInfoContext);
export default useSchoolInfo;

// Context definition w/ provider
export const SchoolInfoProvider: React.FC = ({ children }) => {
  const [schoolInfoState, setSchoolInfoState] = useState(fetchingSchoolInfo);

  // Fetch school info
  useEffect(() => {
    (async () => {
      const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GSHEETS_SHEET_ID}/values/${GSHEETS_SHEET_NAME}/?key=${GSHEETS_API_KEY}`;
      try {
        // Begin benchmark for fetch time
        const fetchT0 = performance.now();

        // Fetch data rows
        const response = await fetch(jsonUrl);
        const data = await response.json();

        const rows: string[][] = data.values;

        // Print to the console how long the fetch took
        const fetchT1 = performance.now();
        console.info('Fetched Google Sheet data in ' + Math.round(fetchT1 - fetchT0) + 'ms');

        // Begin benchmark for transform time
        const transformT0 = performance.now();

        // Headers are the first row in the document
        const headers = rows[0].map(header => camelCase(header)) as [keyof SchoolContact];

        // Initialize array to store formatted data
        const schoolContacts: SchoolContact[] = [];

        // Loop through each row and convert into keyed SchoolContact
        rows.forEach((rowData, rowIndex) => {
          // Don't need headers here, so return early first row
          if (rowIndex === 0) return;

          // Object to store the row's formatted data
          const rowContact = { ...new SchoolContact() };

          // Loop through the headers and assign as a keys to each row cell's value
          headers.forEach((header, headerIndex) => {
            const value = rowData[headerIndex];
            rowContact[header] = value?.trim() ?? '';
          });

          // If row doesn't include school name, toss it out
          if (!rowContact.schoolName) return;

          // Push `rowContact` object into `schoolContacts` array
          schoolContacts.push(rowContact);
        });

        // Print to the console how long transforming/formatting took
        const transformT1 = performance.now();
        console.info('Formatted data in ' + Math.round(transformT1 - transformT0) + 'ms');

        // Get out just list of school names
        const schoolNames = uniq(schoolContacts.map(({ schoolName }) => schoolName));

        setSchoolInfoState([schoolContacts, schoolNames, false]);
      } catch (error) {
        console.error('Error fetching school contacts spreadsheet', error);
      }
    })();
  }, []);

  return (
    <schoolInfoContext.Provider value={schoolInfoState}>{children}</schoolInfoContext.Provider>
  );
};
