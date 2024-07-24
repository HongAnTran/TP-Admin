// Import the functions you need from the SDKs you need
import {  initializeApp } from "firebase/app";
import { getFirestore ,connectFirestoreEmulator} from "firebase/firestore";
import { getAuth , connectAuthEmulator } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: import.meta.env.FIRE_BASE_KEY,
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId:  import.meta.env.FIRE_BASE_APP_ID,
//   measurementId: ""
// };
const firebaseConfig = {
  apiKey: "AIzaSyBQPvY432I-_puCmEXX7Evr5LJjAm_kuWs",
  authDomain: "tpmobile-9e980.firebaseapp.com",
  projectId: "tpmobile-9e980",
  storageBucket: "tpmobile-9e980.appspot.com",
  messagingSenderId: "410891395660",
  appId: "1:410891395660:web:5a9bae144e88e0cd498ae9",
  measurementId: "G-7VNM0TZ6YG"
};
// const PORT_URL = 8080
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firestore
const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost',PORT_URL);
//firebase auth
const auth = getAuth(app);
// auth.languageCode = 'vi'
// connectAuthEmulator(auth, "http://localhost:9099");
export { auth , db };

