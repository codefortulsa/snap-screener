import * as functions from 'firebase-functions';
import mailjet from 'node-mailjet';

// Public/private keys are stored in environment config for this firebase project
// https://firebase.google.com/docs/functions/config-env
//
// Review config vars with `firebase functions:config:get`
// when signed in and have access to firebase project.
export default mailjet.connect(
  functions.config().mailjet.key.public,
  functions.config().mailjet.key.private
);
