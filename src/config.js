// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB6UBFEXAyDT1uLuXnmwDCKUyTjD69QxBw",
  authDomain: "feedverse-app.firebaseapp.com",
  projectId: "feedverse-app",
  storageBucket: "feedverse-app.appspot.com",
  messagingSenderId: "673764081611",
  appId: "1:673764081611:web:3f5072047d252ea01cc04e",
  measurementId: "G-0GNSW95G8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };