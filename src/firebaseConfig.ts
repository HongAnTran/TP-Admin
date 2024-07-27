// Import the functions you need from the SDKs you need
import {  initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth  } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBQPvY432I-_puCmEXX7Evr5LJjAm_kuWs",
  authDomain: "tpmobile-9e980.firebaseapp.com",
  projectId: "tpmobile-9e980",
  storageBucket: "tpmobile-9e980.appspot.com",
  messagingSenderId: "410891395660",
  appId: "1:410891395660:web:5a9bae144e88e0cd498ae9",
  measurementId: "G-7VNM0TZ6YG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth , db };

