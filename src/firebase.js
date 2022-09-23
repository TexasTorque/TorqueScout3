import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
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
    let avgDoc = querySnapshot.docs[0];
    if (avgDoc.data()[teamNum] === undefined) {
      updateDoc( doc(db, "averages", avgDoc.id), {
        [teamNum]: {
          totalMatches: 0,
          totalScore: 0,
          totalAutoLow: 0,
          totalAutoUpper: 0,
          totalAutoMissed: 0,
          totalAutoScore: 0,
          totalAutoAccuracy: 0,
          totalTeleopLow: 0,
          totalTeleopUpper: 0,
          totalTeleopMissed: 0,
          totalTeleopScore: 0,
          totalTeleopAccuracy: 0,
          totalClimbTime: 0,
          totalClimbScore: 0,
        }
      }).then(() => {
        updateAverages(teamNum, report)
      }); 
    } else {
      updateAverages(teamNum, report);
    }
  });
};

const updateAverages = async (teamNum, report) => {
  getDocs(collection(db, "averages")).then((querySnapshot) => {
    let docx = querySnapshot.docs[0];
    let scoreFields = docx.data()[teamNum];
    updateDoc( doc(db, "averages", docx.id), {
      [teamNum]: {
        teamName: teamNum,
        totalMatches: scoreFields.totalMatches + 1,
        totalScore: scoreFields.totalScore + report["total.score"],
        totalAutoLow: scoreFields.totalAutoLow + report["auto.low"],
        totalAutoUpper: scoreFields.totalAutoUpper + report["auto.upper"],
        totalAutoMissed: scoreFields.totalAutoMissed + report["auto.missed"],
        totalAutoScore: scoreFields.totalAutoScore + report["auto.score"],
        totalAutoAccuracy: scoreFields.totalAutoAccuracy + parseFloat(report["auto.accuracy"]),
        totalTeleopLow: scoreFields.totalTeleopLow + report["teleop.low"],
        totalTeleopUpper: scoreFields.totalTeleopUpper + report["teleop.upper"],
        totalTeleopMissed: scoreFields.totalTeleopMissed + report["teleop.missed"],
        totalTeleopScore: scoreFields.totalTeleopScore + report["teleop.score"],
        totalTeleopAccuracy: scoreFields.totalTeleopAccuracy + parseFloat(report["teleop.accuracy"]),
        totalClimbTime: scoreFields.totalClimbTime + report["climb.time"],
        totalClimbScore: scoreFields.totalClimbScore + report["climb.score"],
      }
    });
  });
}

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
  let averages = [];
  const docs = await getDocs(collection(db, "averages"));
  let docx = docs.docs[0];
  for (let team in docx.data()) {
    let scoreFields = docx.data()[team];
    let totalMatches = scoreFields.totalMatches;
    averages.push({
      teamName: team,
      totalMatches: totalMatches,
      totalScore: parseFloat(Number(scoreFields.totalScore / totalMatches).toFixed(2)),
      totalAutoLow: parseFloat(Number(scoreFields.totalAutoLow / totalMatches).toFixed(2)),
      totalAutoUpper: parseFloat(Number(scoreFields.totalAutoUpper / totalMatches).toFixed(2)),
      totalAutoMissed: parseFloat(Number(scoreFields.totalAutoMissed / totalMatches).toFixed(2)),
      totalAutoScore: parseFloat(Number(scoreFields.totalAutoScore / totalMatches).toFixed(2)),
      totalAutoAccuracy: parseFloat(Number(scoreFields.totalAutoAccuracy / totalMatches).toFixed(2)),
      totalTeleopLow: parseFloat(Number(scoreFields.totalTeleopLow / totalMatches).toFixed(2)),
      totalTeleopUpper: parseFloat(Number(scoreFields.totalTeleopUpper / totalMatches).toFixed(2)),
      totalTeleopMissed: parseFloat(Number(scoreFields.totalTeleopMissed / totalMatches).toFixed(2)),
      totalTeleopScore: parseFloat(Number(scoreFields.totalTeleopScore / totalMatches).toFixed(2)),
      totalTeleopAccuracy: parseFloat(Number(scoreFields.totalTeleopAccuracy / totalMatches).toFixed(2)),
      totalClimbTime: parseFloat(Number(scoreFields.totalClimbTime / totalMatches).toFixed(2)),
      totalClimbScore: parseFloat(Number(scoreFields.totalClimbScore / totalMatches).toFixed(2)),
    });
  }
  return averages;
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
