// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyAM7BBnKCZMbSyAOJvtUbknIMTMgpiYWLY",
  authDomain: "game-vault-70f07.firebaseapp.com",
  projectId: "game-vault-70f07",
  storageBucket: "game-vault-70f07.firebasestorage.app",
  messagingSenderId: "532361593720",
  appId: "1:532361593720:web:5d52ab3f97979122d0be8d",
  measurementId: "G-0DBK6B5GYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();