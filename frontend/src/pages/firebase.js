import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArrkOU4xpoiABbhHGkVW2dQMry98y34CA",
  authDomain: "instagram-clone-7d5b6.firebaseapp.com",
  projectId: "instagram-clone-7d5b6",
  storageBucket: "instagram-clone-7d5b6.firebasestorage.app",
  messagingSenderId: "992050503750",
  appId: "1:992050503750:web:d650c3a5b900089f2e2a47"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 

// Exporting services
export { auth, db, storage }; 

