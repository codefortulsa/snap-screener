export const numberedSelectionOptions = [0, 1, 2, 3, 4, 'More'] as const;
export type NumberedSelection = typeof numberedSelectionOptions[number];

export const incomeFreqOptions = ['Week', '2 Weeks', 'Month', 'Year'] as const;
export type IncomeFreq = typeof incomeFreqOptions[number];

export const contactMethodOptions = ['Email', 'Phone', 'Text'] as const;
export type ContactMethod = typeof contactMethodOptions[number];

export default class FormState {
  stage: 1 | 2 | 3 | 4 = 1;

  childrenUnder18: NumberedSelection | null = null;
  adultsOver18: NumberedSelection | null = null;
  adultsOver60: NumberedSelection | null = null;

  incomeAmount: number | null = null;
  incomeFreq: IncomeFreq = 'Week';

  firstName = '';
  contactMethod: ContactMethod = 'Email';
  email = '';
  phone = '';
  contactPermission = true;

  address = '';
  city = 'Tulsa';
  // TODO: Limited to Tulsa for now so can assume OK state.
  // Potential state options below if/when needed.
  state = 'OK';
  zip = '';

  school = '';

  // Override email address to send tests to when in dev environment
  devEmail = '';
}

// TODO: Limited to Tulsa for now so can assume OK state.
// May eventually need to collect state info though.
// Taken from here: https://gist.github.com/mshafrir/2646763
// export const stateOptions = {
//   AL: 'Alabama',
//   AK: 'Alaska',
//   AS: 'American Samoa',
//   AZ: 'Arizona',
//   AR: 'Arkansas',
//   CA: 'California',
//   CO: 'Colorado',
//   CT: 'Connecticut',
//   DE: 'Delaware',
//   DC: 'District Of Columbia',
//   FM: 'Federated States Of Micronesia',
//   FL: 'Florida',
//   GA: 'Georgia',
//   GU: 'Guam',
//   HI: 'Hawaii',
//   ID: 'Idaho',
//   IL: 'Illinois',
//   IN: 'Indiana',
//   IA: 'Iowa',
//   KS: 'Kansas',
//   KY: 'Kentucky',
//   LA: 'Louisiana',
//   ME: 'Maine',
//   MH: 'Marshall Islands',
//   MD: 'Maryland',
//   MA: 'Massachusetts',
//   MI: 'Michigan',
//   MN: 'Minnesota',
//   MS: 'Mississippi',
//   MO: 'Missouri',
//   MT: 'Montana',
//   NE: 'Nebraska',
//   NV: 'Nevada',
//   NH: 'New Hampshire',
//   NJ: 'New Jersey',
//   NM: 'New Mexico',
//   NY: 'New York',
//   NC: 'North Carolina',
//   ND: 'North Dakota',
//   MP: 'Northern Mariana Islands',
//   OH: 'Ohio',
//   OK: 'Oklahoma',
//   OR: 'Oregon',
//   PW: 'Palau',
//   PA: 'Pennsylvania',
//   PR: 'Puerto Rico',
//   RI: 'Rhode Island',
//   SC: 'South Carolina',
//   SD: 'South Dakota',
//   TN: 'Tennessee',
//   TX: 'Texas',
//   UT: 'Utah',
//   VT: 'Vermont',
//   VI: 'Virgin Islands',
//   VA: 'Virginia',
//   WA: 'Washington',
//   WV: 'West Virginia',
//   WI: 'Wisconsin',
//   WY: 'Wyoming'
// };
// type State = keyof typeof stateOptions;
