import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-PEeJiuYXjFAM8clSKuCuKewN_svV7ow",
  authDomain: "master-class-97666.firebaseapp.com",
  projectId: "master-class-97666",
  storageBucket: "master-class-97666.firebasestorage.app",
  messagingSenderId: "507449038806",
  appId: "1:507449038806:web:93d464aef6233d14f9b677",
  measurementId: "G-4KHDVMFBNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore();

// Export services
export { auth, db };
