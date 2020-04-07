import * as functions from 'firebase-functions';

import FormState from './types/FormState';

import { MAILJET_TEMPLATE_ID, NOTIFY_CC } from './lib/config';
import mailjet from './lib/mailjet';
import { v4 as uuidv4 } from 'uuid';
import upperCase from 'lodash/upperCase';

import determineEligibility from './lib/determineEligibility';
import fetchSchoolInfo from './lib/fetchSchoolInfo';

// Called from react app to determine eligibility
// and sends appropriate emails via Mailjet.
//
// Returns either True or False to the client for eligibility status.
export const submitForm = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  try {
    const formData: FormState = JSON.parse(request.body || '{}');
    const {
      childrenUnder18,
      adultsOver18,
      adultsOver60,
      firstName,
      contactMethod,
      email,
      phone,
      contactPermission,
      address,
      city,
      state,
      zip,
      school,
      devEmail
    } = formData;

    // Form validation
    if (
      !firstName?.trim() ||
      !contactMethod ||
      (contactMethod === 'Email' && !email?.trim()) ||
      (contactMethod !== 'Email' && !phone?.trim()) ||
      !zip?.trim() ||
      !school?.trim()
    )
      return response.status(400).send('The form was invalid');

    let mailtoContacts: { Name?: string; Email: string }[];
    let ccContact = [{ Email: NOTIFY_CC }];
    if (devEmail.trim()) {
      // Override with developer email if provided
      mailtoContacts = [{ Name: 'DEVELOPER', Email: devEmail.trim() }];
      ccContact = [];
    } else {
      // Get schools and contact information from GSheets
      const allSchoolContacts = await fetchSchoolInfo();
      // Isolate contacts for selected school
      const schoolContacts = allSchoolContacts.filter(
        ({ schoolName, contactFirstName, email: contactEmail }) =>
          schoolName.trim() === school.trim() && contactFirstName.trim() && contactEmail.trim()
      );
      mailtoContacts = schoolContacts.map(
        ({ contactFirstName, contactLastName, email: contactEmail }) => ({
          Name: [contactFirstName, contactLastName].join(' ').trim(),
          Email: contactEmail.trim()
        })
      );
    }

    // Determine eligibility and return
    const { eligibility, difference } = determineEligibility(formData);

    // Send email(s)
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Subject: `SNAP Screener [${upperCase(eligibility)}]`,
          // From: {
          //   Email: 'noreply@notebird.app',
          //   Name: sendingUser.name.full + ' (via Notebird)'
          // },
          To: mailtoContacts,
          CC: ccContact,
          // ReplyTo: {
          //   Email: sendingUser.email,
          //   Name: sendingUser.name.full
          // },
          Variables: {
            eligibility,
            firstName,
            school,
            canContact: contactPermission ? 'Yes' : 'No',
            contactMethod,
            contactInfo: contactMethod === 'Email' ? email : phone,
            address: address.trim() ? address : 'NO ADDRESS PROVIDED',
            city: city.trim() ? city : 'NO CITY',
            state: state.trim() ? state : 'NO STATE',
            zip,
            childrenUnder18: childrenUnder18 === 'More' ? 'More than 4' : childrenUnder18,
            adultsOver18: adultsOver18 === 'More' ? 'More than 4' : adultsOver18,
            adultsOver60: adultsOver60 === 'More' ? 'More than 4' : adultsOver60,
            overUnder: difference < 0 ? `$${difference * -1} over` : `$${difference} under`
          },
          Headers: {
            // Need to add this header in order to prevent automatic threading in gmail
            // Check out 'Additional details' section here:
            // https://gsuiteupdates.googleblog.com/2019/03/threading-changes-in-gmail-conversation-view.html
            references: `<${uuidv4()}>`
          }
        }
      ]
    });

    // Return boolean with eligibility status
    return response.status(200).send(eligibility === 'eligible');
  } catch (error) {
    console.error(error);
    return response.status(400).send('Unkown error');
  }
});
