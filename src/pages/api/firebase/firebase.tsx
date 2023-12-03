// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQA47I6tZg-BhfN0mBUEHHcgVpD9akyVs",
  authDomain: "bookmarkdailydenis.firebaseapp.com",
  projectId: "bookmarkdailydenis",
  storageBucket: "bookmarkdailydenis.appspot.com",
  messagingSenderId: "506285069956",
  appId: "1:506285069956:web:edf9ec3099f8adf0b0d4d1",
};

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(firebaseApp);

export default firebaseApp;
