// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmGVOIn6BHQqJXlBrwwwFvPi88osBNYOU",
  authDomain: "d4k2k23.firebaseapp.com",
  databaseURL: "https://d4k2k23-default-rtdb.firebaseio.com",
  projectId: "d4k2k23",
  storageBucket: "d4k2k23.appspot.com",
  messagingSenderId: "318799019108",
  appId: "1:318799019108:web:2b34d9fed0fc340b153371",
  measurementId: "G-M3H22MCN0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
export  {
    storage, db
  }