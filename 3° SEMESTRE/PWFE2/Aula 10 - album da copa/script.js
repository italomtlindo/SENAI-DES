import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIYcbx7XuR_AnFEwEJL-c-OgOVLCl4UPA",
  authDomain: "album-da-copa-ab234.firebaseapp.com",
  projectId: "album-da-copa-ab234",
  storageBucket: "album-da-copa-ab234.firebasestorage.app",
  messagingSenderId: "941581100477",
  appId: "1:941581100477:web:482261773d9447d0d15ed4",
  measurementId: "G-KSZBGFSV18"
};