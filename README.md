<p align="center">
  <img width="384" height="48" src='./src/img/HFO_logo_horiz.png?raw=true' alt="Hunger Free Oklahoma" />
</p>

<h1 align="center">
  <b>SNAP Screener</b>
</h1>

<h3 align="center">
  Find out if you are eligible for food assistance at <b><a href="https://snap-screener-ok.web.app/">web address TBD</a></b>.
</h3>

---

The SNAP Screener is a single-page web application built with React and hosted on Firebase Hosting. Currently avaiable at [snap-screener-ok.firebaseapp.com](https://snap-screener-ok.web.app/) with final domain forthcoming. School contacts are managed with a [Google Sheet available here](https://docs.google.com/spreadsheets/d/1V1vWm9HNuiVOnXYAXoXW5f6KmsoAKjA3En_GYl93kYk/edit?usp=sharing). All other pertinent settings are available within `src/lib/config.js`—such as who recieves all email notifications with the variable `NOTIFY_CC`.

**PLEASE NOTE**: The spreadsheet uses real email addresses so submitting a form will, in fact, send emails out to all contacts listed for the selected school.

---

## Partners

- [Hunger Free Oklahoma](https://hungerfreeok.org/)
- [Tulsa Public Schools](https://www.tulsaschools.org/)
- [Oklahoma Department of Human Services](http://www.okdhs.org/)
- [Spark Collaborative](https://creativespark.group/)
- [Underdog Systems](https://underdog.systems/)
- [Code for Tulsa](https://codefortulsa.org/)

---

## Technology

- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/) via [Create React App](https://create-react-app.dev/)
- [Styled Components](https://styled-components.com/)
- [React i18next](https://react.i18next.com/)
- [React Router](https://reacttraining.com/react-router/)
- [Firebase](https://firebase.google.com/) via [Hosting](https://firebase.google.com/products/hosting) + [Functions](https://firebase.google.com/products/functions)
- [Mailjet](https://www.mailjet.com/)

---

## Development

To get started developing locally, clone the project. The from the root directory, run:

```console
npm install
npm start
```

#### Requirements

- node > v10

---

## Task List

- [x] Front-end UI
- [x] Back-end hosting
- [x] Cloud function to determine eligibility and send mail
- [x] Establish mail service and template via Mailjet
- [x] Update `NOTIFY_CC` in `src/lib/config.ts` to reflect email address to receive all submissions
- [x] Add Google Analytics for tracking
- [ ] Domain handling (_to get site pointed from \*.hungerfreeok.org_)
- [ ] Domain email validation (_to get emails as sent from HFO_)
- [ ] Continus deployment via GitHub Actions (_to redeploy cloud function + web app whenever commit is pushed to master branch_)
- [ ] Possibly use Google Places Autocomplete API for address lookup?
- [ ] Possibly set up a hosted staging environment linked with a dev branch?
- [ ] Possibly move NOTIFY_CC from hard-coded config file to google spreadsheet
