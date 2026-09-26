// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzKA48STvF1gSQUgIqk0uQsfVST91tEpU",
  authDomain: "ma-prueba.firebaseapp.com",
  projectId: "ma-prueba",
  storageBucket: "ma-prueba.firebasestorage.app",
  messagingSenderId: "220940682619",
  appId: "1:220940682619:web:f1c52814a9fa6f809ee9de",
  measurementId: "G-MB7X9KB1G1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
