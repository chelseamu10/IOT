const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyCV1TXkXu5ZE7CkI-tFSnaH9WPSXv4CFbk",
    authDomain: "projectiot-c5a07.firebaseapp.com",
    databaseURL: "https://projectiot-c5a07-default-rtdb.firebaseio.com",
    projectId: "projectiot-c5a07",
    storageBucket: "projectiot-c5a07.appspot.com",
    messagingSenderId: "845797346987",
    appId: "1:845797346987:web:89c742cc39e125de9231ee",
    measurementId: "G-E3PBTVT1XQ"
  };

  firebase.initializeApp(firebaseConfig);
  export const MyData = firebase.database().ref('IOT-DEVICES');


