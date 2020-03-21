# SNAP Screener

- [Hunger Free Oklahoma](https://hungerfreeok.org/)
- [Tulsa Public Schools](https://www.tulsaschools.org/)
- [Oklahoma Department of Human Services](http://www.okdhs.org/)
- [Spark Collaborative](https://creativespark.group/)
- [Underdog Systems](https://underdog.systems/)

## Operation

### Envrionment

PHP API Application

- `APP_ENV`: Application environment. (example: `development` or `production`)
  - `development` used for permissive CORS headers.
- `APP_NOTIFY_FROM`: **required** (example: `"SNAP Screener (no-reply)" <no-reply@hungerfreeok.org>`)
- `APP_NOTIFY_CC`: **required** (example: `"Jane Doe" <jane.doe@hungerfreeok.org>`)
- `APP_MAIL_HOST`: **required** Host server for SMTP delivery
- `APP_MAIL_PORT`: **required** Host server port for SMTP delivery
- `APP_MAIL_USERNAME`: Username for SMTP authentication
- `APP_MAIL_PASSWORD`: Password for SMTP authentication
- `APP_MAIL_SECURE`: Security setting (example: `tls`)
  - `tls` used by Heroku/Mailtrap.

React APP

- `REACT_APP_API_FORM_SUBMIT`: **required** API URL for form submission. (example: `/api/form-submit`)

### Development

```bash
# web/.env
APP_ENV=development
APP_MAIL_HOST=mailhog
APP_MAIL_PORT=1025
APP_NOTIFY_FROM='"SNAP Screener (no-reply)" <no-reply@hungerfreeok.org>'
APP_NOTIFY_CC='"Jane Doe" <jane.doe@hungerfreeok.org>'
```

```bash
# web/api/.env
REACT_APP_API_FORM_SUBMIT='http://localhost:5000/api/form-submit'
```

```console
$ docker-compose up -d
$ cd web && npm install && yarn start
```

### Generate Contacts

Edit `web/data/contacts.csv`

```console
$ cd web
$ npm install
$ yarn install
$ node scripts/generate-contacts.js
```

## Software

### Requirements

- node v10.16.3
- docker
- yarn

### Primary Dependencies

- [create-react-app](https://create-react-app.dev/)
- [react-final-form](https://final-form.org/react)
- [react-i18next](https://react.i18next.com/)
- [react-router](https://reacttraining.com/react-router/)
- [tailwindcss](https://tailwindcss.com/)

## What we need and how to help.

We’re launching the tool as a pilot. Throughout the next few months, we’ll want to collect information from users about what they found to be easy, what challenges they ran into, and how we can make the tool even better and easier to use.

The code for the SNAP screener is here on GitHub, but it’s not easily deployed to the live website. We’d like to streamline that process so we can have a repo that automatically pushes updates to the live site when we have changes or improvements in the future.

We would also love to build an easy way for HFO to edit the list of TPS contacts, so that when this information changes, HFO can quickly and easily keep this information accurate and up-to-date.


### original deploy to heroku followed these instructions:

https://devcenter.heroku.com/articles/build-docker-images-heroku-yml

and the fix for the `more than one MPM loaded` error:
https://github.com/docker-library/wordpress/issues/293