// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf6obMXSBKpG4piR-0ZqN-XuyWfwIi9MY",
  authDomain: "portfolio-a96be.firebaseapp.com",
  projectId: "portfolio-a96be",
  storageBucket: "portfolio-a96be.firebasestorage.app",
  messagingSenderId: "1050551985651",
  appId: "1:1050551985651:web:6e73c65d681a38e839de86",
  measurementId: "G-9WX58LLM3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirebaseMessaging = () => {
  if (typeof window === "undefined") return null;
  return getMessaging(app);
};