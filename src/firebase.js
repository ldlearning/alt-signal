// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChkn3smWeVp_jlUl2DiSUV3mvlsn5Et1k",
    authDomain: "altsignal-a9258.firebaseapp.com",
    projectId: "altsignal-a9258",
    storageBucket: "altsignal-a9258.appspot.com",
    messagingSenderId: "425072541239",
    appId: "1:425072541239:web:0a5b4778983fc10e07c9b2",
    measurementId: "G-77Q1NR66XS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()