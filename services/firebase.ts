// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// NOTE: Replace these with your actual Firebase project configuration keys.
const firebaseConfig = {
  authDomain: "jane-and-company-website.firebaseapp.com",
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  projectId: "jane-and-company-website",
  storageBucket: "jane-and-company-website.firebasestorage.app",
  messagingSenderId: "1050356796526",
  appId: "1:1050356796526:web:bfc98bf09b51df6e68aa7f",
  measurementId: "G-21539M55WQ"
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Firebase
// We use a check to avoid re-initialization in strict mode or hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;