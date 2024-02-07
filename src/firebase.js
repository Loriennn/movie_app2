// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVBwNZRZXrZE90tIv9VdYJUf185duIJAo",
  authDomain: "movielist-fb456.firebaseapp.com",
  projectId: "movielist-fb456",
  storageBucket: "movielist-fb456.appspot.com",
  messagingSenderId: "958890733606",
  appId: "1:958890733606:web:319a06b9b1d73922acf6e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)