// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0io2eH_7oE45wLxzc7uDV3XHQcgHcZrA",
  authDomain: "deepface-a1dfd.firebaseapp.com",
  databaseURL: "https://deepface-a1dfd-default-rtdb.firebaseio.com",
  projectId: "deepface-a1dfd",
  storageBucket: "deepface-a1dfd.appspot.com",
  messagingSenderId: "642212907515",
  appId: "1:642212907515:web:a581dadb6dbe8cc226e35e",
  measurementId: "G-PRQP0D3QL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)