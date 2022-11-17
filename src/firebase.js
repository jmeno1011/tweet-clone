// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnCAitYibBhUSdcCaLviOmyS_DucGKXts",
  authDomain: "tweet-clone-f7e83.firebaseapp.com",
  projectId: "tweet-clone-f7e83",
  storageBucket: "tweet-clone-f7e83.appspot.com",
  messagingSenderId: "995381975606",
  appId: "1:995381975606:web:b308a9806362f9df25d697",
};

// Initialize Firebase
const firebaseInit = initializeApp(firebaseConfig);

export default firebaseInit;
