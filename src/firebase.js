import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 Remplace ces valeurs par celles de ton projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCCTgYVjiBjWp-fNThZ9XRATNfMDMvxoMw",
  authDomain: "qrinvitation-57e49.firebaseapp.com",
  projectId: "qrinvitation-57e49",
  storageBucket: "qrinvitation-57e49.firebasestorage.com",
  messagingSenderId: "647494921947",
  appId: "1:647494921947:web:1e5db15050c469972fe6fe"
};

// Initialisation de Firebased
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
