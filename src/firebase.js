// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendSignInLinkToEmail, 
    isSignInWithEmailLink, 
    signInWithEmailLink,
    signOut,
    updateProfile
  } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
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
const auth = getAuth(app);
const analytics = getAnalytics(app);
export {auth , analytics , app ,  createUserWithEmailAndPassword
  , signInWithEmailAndPassword ,updateProfile, sendSignInLinkToEmail,isSignInWithEmailLink , signInWithEmailLink , signOut };