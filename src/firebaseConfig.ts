// Import the functions you need from the SDKs you need
import {  initializeApp } from "firebase/app";
import { getFirestore ,connectFirestoreEmulator} from "firebase/firestore";
import { getAuth , connectAuthEmulator } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.FIRE_BASE_KEY,
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId:  import.meta.env.FIRE_BASE_APP_ID,
  measurementId: ""
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

