import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
// import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAFWq3KYbdaF1tvP-VSdkhehXUrTTBOHjU",
    authDomain: "simple-notes-da743.firebaseapp.com",
    projectId: "simple-notes-da743",
    storageBucket: "simple-notes-da743.appspot.com",
    messagingSenderId: "536079352234",
    appId: "1:536079352234:web:01f01f593483d1a0b0abd3",
    measurementId: "G-SK1XX6HT4K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase;