// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqkqt9qzWesXArTSGmgq8Km3PnA7izRJI",
  authDomain: "bookbound-app.firebaseapp.com",
  projectId: "bookbound-app",
  storageBucket: "bookbound-app.appspot.com",
  messagingSenderId: "834142604504",
  appId: "1:834142604504:web:c53df1f529211792079bad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get Firestore
const db = getFirestore(app)
// Get Auth for Login
const auth = getAuth();

// Export db
export {
  db,
  auth
}
