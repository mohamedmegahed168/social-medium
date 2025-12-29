import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCSbB1nsHMHBsyudLEaudxzWTmmEdPohFE",
  authDomain: "social-medium-3288f.firebaseapp.com",
  projectId: "social-medium-3288f",
  storageBucket: "social-medium-3288f.firebasestorage.app",
  messagingSenderId: "1636739272464",
  appId: "1:636739272464:web:6cd83c71e57f70cab76f95",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const collectionRefrerence = collection(db, "users");
await addDoc(collectionRefrerence, {
  field1: "firstDocument",
});
