import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
  onValue,
} from "firebase/database";
import { doc, setDoc } from "firebase/firestore";

// This is secret
const firebaseConfig = {
  apiKey: "AIzaSyCjOgj6gPed12x3s7byOacpBtOQDbHjQt8",
  authDomain: "torquescout.firebaseapp.com",
  projectId: "torquescout",
  storageBucket: "torquescout.appspot.com",
  messagingSenderId: "730292463260",
  appId: "1:730292463260:web:f53b5948cdc5f8231aaf59",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};

export const submitReport = async (report) => {
  const team = 'team-' + report['info.team'];
  const match = 'match-' + report['info.match'];
  await setDoc(doc(db, match, team), report);
  await setDoc(doc(db, team, match), report);
}
