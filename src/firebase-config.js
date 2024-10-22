// //src/firebase-config.js
// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import {getAuth} from 'firebase/auth';
//uncomment because of error message about exports 

//import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4iy5kjCuR--L_SoELadu8LLXUCeS1oUU",
  authDomain: "bb-react-f3374.firebaseapp.com",
  projectId: "bb-react-f3374",
  storageBucket: "bb-react-f3374.appspot.com",
  messagingSenderId: "753372043484",
  appId: "1:753372043484:web:bc8c7eb6586a8dd5b07c19",
  measurementId: "G-KB4GCRZ9KZ"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

//const firebaseApp = firebase.initializeApp(firebaseConfig);

//const database = firebaseApp.firestore();

export {db, auth} ;