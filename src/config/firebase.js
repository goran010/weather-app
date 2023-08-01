import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq6ookBUECHdr9SLVCcwiD2fOtrXLnhEw",
  authDomain: "weather-app-db7ca.firebaseapp.com",
  projectId: "weather-app-db7ca",
  storageBucket: "weather-app-db7ca.appspot.com",
  messagingSenderId: "284296015517",
  appId: "1:284296015517:web:28978be12837027384ee74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
