import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
// import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAEikcnQD--AUc1pAxY36TtFUT9hO3J51o",
    authDomain: "simple-notes-firebase-70ce2.firebaseapp.com",
    projectId: "simple-notes-firebase-70ce2",
    storageBucket: "simple-notes-firebase-70ce2.appspot.com",
    messagingSenderId: "701772240251",
    appId: "1:701772240251:web:4ddd8f05ba1cc2a2c059de",
    measurementId: "G-H05J9DL10C"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export const database = firebase.database();

export default firebase;