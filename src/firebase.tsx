import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJiGJXwDN8tjIimJvoDRRB7kZx_I0tq8g",
  authDomain: "workout-24371.firebaseapp.com",
  projectId: "workout-24371",
  storageBucket: "workout-24371.appspot.com",
  messagingSenderId: "900756781313",
  appId: "1:900756781313:web:abf9141cc87b241e758300",
  measurementId: "G-4L17XCFZRW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
