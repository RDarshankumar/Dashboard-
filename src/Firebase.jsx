
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJcayfJG-dvmP2zThgmqSR6id2IuLU_ds",
  authDomain: "internee-project.firebaseapp.com",
  projectId: "internee-project",
  storageBucket: "internee-project.firebasestorage.app",
  messagingSenderId: "354383396350",
  appId: "1:354383396350:web:e09f387a9c59f20cd054af"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };