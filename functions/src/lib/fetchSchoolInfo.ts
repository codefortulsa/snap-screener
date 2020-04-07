import {
  GSHEETS_SHEET_ID,
  GSHEETS_SHEET_NAME,
  GSHEETS_API_KEY,
  CLOUD_FUNCTIONS_SUBMIT_URL
} from './config';
import SchoolContact from '../types/SchoolContact';
import fetch from 'node-fetch';
import camelCase from 'lodash/camelCase';

// FYI: Very similar to what's going on in `src/contexts/schoolInfo.tsx`
export default async function fetchSchoolInfo() {
  try {
    const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GSHEETS_SHEET_ID}/values/${GSHEETS_SHEET_NAME}/?key=${GSHEETS_API_KEY}`;
    const response = await fetch(jsonUrl, { headers: { Referer: CLOUD_FUNCTIONS_SUBMIT_URL } });
    const data = await response.json();
    const rows: string[][] = data.values;

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

    return schoolContacts;
  } catch (error) {
    console.error('Error fetching school info');
    console.error(error);
    return [];
  }
}
