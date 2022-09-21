import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  setData,
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
// import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
  const teamNum = report["info.team"];
  const team = "team-" + teamNum;
  const match = "match-" + report["info.match"];
  await setDoc(doc(db, team, match), report);
  //add updating averages list
  const colRef = collection(db, "averages");
  getDocs(colRef).then((querySnapshot) => {
    if (querySnapshot.docs[0].data()[teamNum] === undefined) {
      const template = {
        totalMatches: 0,
        averageData: {
          totalScore: 0,
          totalClimbTime: 0
        }
      }
      /* querySnapshot.docs[0].data()[teamNum] = template; 
          doc.push(querySnapshot);
      */
    } 
    const teamDoc = querySnapshot.docs[0].data()[teamNum];
      //update teamDoc
      updateDoc(teamDoc, {
          // matches += 1
      })
  });

};

export const getUserFromID = async (id) => {
  const user = await getDoc(doc(db, "users", id));
  return user.data() ?? null;
};

export const getMatchesPerTeam = async (team) => {
  let matches = [];
  const docs = await getDocs(collection(db, "team-" + team));
  docs.forEach((doc) => matches.push(doc.data()));
  return matches;
};

export const getAverages = async () => {
  /*
  const avgDoc = await getDoc(doc(db, "averages", "average"));
  for (team in avgDoc)
    for ((key, stat) in team["averageData"])
      averages[key] = stat / team["totalMatches"];
  */

  /*
  const colRef = collection(db, "averages");
  getDocs(colRef).then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      return ({...doc.data()});
    });
  });*/
}

export const registerWithEmailAndPassword = async (email, password) => {
  try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res.user.uid;
  } catch (err) {
      console.error(err);
      alert(err.message);
      return null;
  }
};

export const createUser = async (first, last, password, admin) => {
  const id = (last.substring(0, 5) + first.substring(0, 3)).toLowerCase();
  console.log(id);
  const email = id + "@torquescout.com";
  const uid = registerWithEmailAndPassword(email, password);
  setDoc(doc(db, "users", id), {
    id: id,
    admin: admin,
    first: first,
    last: last,
    email: email,
    // uid: uid ?? 0
  });
};

export const deleteUserByName = async (first, last) => deleteUserByID(last.substring(0, 5) + first.substring(0, 3));

export const deleteUserByID = async (id) => {
  alert("Deleting users from admin not yet implemented.");
};
