import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";

// Sign in with email and password
export const loginUser = async (email, password) => {};

// Create new user with email and password
export const registerUser = async (email, password) => {};

// Sign out user
export const logoutUser = async () => {};

// Auth state observer
export const subscribeToAuthChanges = (callback) => {};

// Add Google Sign In
export const signInWithGoogle = async () => {};
