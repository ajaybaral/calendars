// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCU1ycnGMNuYuKUsZAeDiz4gsj8nyIzhQE",
  authDomain: "calendar-app-c73b3.firebaseapp.com",
  projectId: "calendar-app-c73b3",
  storageBucket: "calendar-app-c73b3.appspot.com",
  messagingSenderId: "728648404181",
  appId: "1:728648404181:web:b587a81c458982c232665c",
  measurementId: "G-PWW4CW0L23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;