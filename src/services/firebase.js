import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig =
{
    apiKey: "AIzaSyAtsYcMD_Of_IxGYLiMOqwdB_tiSO6TDYM",
  authDomain: "mood-based-movie-generator.firebaseapp.com",
  projectId: "mood-based-movie-generator",
  storageBucket: "mood-based-movie-generator.firebasestorage.app",
  messagingSenderId: "10140873947",
  appId: "1:10140873947:web:c49fab12695e81418988fe"
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
