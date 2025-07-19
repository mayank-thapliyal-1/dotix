// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import {  getAuth } from "firebase/auth";
  import {getFirestore} from "firebase/firestore"
const firebaseConfig = { 
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "quizzy-c9322.firebaseapp.com",
  projectId: "quizzy-c9322",
  storageBucket: "quizzy-c9322.firebasestorage.app",
  messagingSenderId: "641053263728",
  appId: "1:641053263728:web:7cdc22430fa44fb00bb1b5",
  measurementId: "G-0LHRWHT44J"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 export const db = getFirestore(app);
