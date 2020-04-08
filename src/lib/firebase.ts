// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAjS83q0HpeEEA4njujit6oWSSlKZshvw8',
  authDomain: 'snap-screener-ok.firebaseapp.com',
  databaseURL: 'https://snap-screener-ok.firebaseio.com',
  projectId: 'snap-screener-ok',
  storageBucket: 'snap-screener-ok.appspot.com',
  messagingSenderId: '377844565969',
  appId: '1:377844565969:web:b42def1f7a2c2a023502f0',
  measurementId: 'G-SN47YPMV1T',
};

// Initialize Firebase (if isn't already)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize and export analytics
export const analytics = firebase.analytics();
