import { initializeApp } from "firebase/app";
import { getFirestore,  } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2zSoUTbdbIQfdy6nYSQz7oGwbybBn7uw",
  authDomain: "forum-5d7fb.firebaseapp.com",
  projectId: "forum-5d7fb",
  storageBucket: "forum-5d7fb.appspot.com",
  messagingSenderId: "737450186884",
  appId: "1:737450186884:web:54ae51b1408171a9a44ad1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db };
