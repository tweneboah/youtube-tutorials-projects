import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCL3Hf8WqeI3UBUrZCvnivYNXUtYB_YPnE",
  authDomain: "masync-ai-seo-keyword.firebaseapp.com",
  projectId: "masync-ai-seo-keyword",
  storageBucket: "masync-ai-seo-keyword.firebasestorage.app",
  messagingSenderId: "120450984510",
  appId: "1:120450984510:web:61cb132b0d68124f4e3f6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
