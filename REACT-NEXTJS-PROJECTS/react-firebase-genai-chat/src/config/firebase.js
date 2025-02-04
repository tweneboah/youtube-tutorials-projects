import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAoOWMl-mopoWc_GLYseGamZpm_EtrBDDM",
  authDomain: "master-class-97666.firebaseapp.com",
  projectId: "master-class-97666",
  storageBucket: "master-class-97666.appspot.com",
  messagingSenderId: "507449038806",
  appId: "1:507449038806:web:93d464aef6233d14f9b677",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

// Set persistence correctly using imported functions
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});
