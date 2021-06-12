import firebase, { FirebaseAuth } from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzDFTHi5b0MCMa5FbKoLTBxvQCw7YM1H8",
  authDomain: "would-bee.firebaseapp.com",
  projectId: "would-bee",
  storageBucket: "would-bee.appspot.com",
  messagingSenderId: "1036032420408",
  appId: "1:1036032420408:web:2733a784b41dbdae9a54cd",
  measurementId: "G-C0QMWMLK2L",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
