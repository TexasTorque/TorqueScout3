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
          averageData: {
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
    updateDoc( doc(db, "averages", docx.id), {
      [teamNum]: {
        totalMatches: docx.data()[teamNum].totalMatches + 1,
        averageData: {
          totalScore: docx.data()[teamNum].averageData.totalScore + report["total.score"],
          totalAutoLower: docx.data()[teamNum].averageData.totalAutoLow + report["auto.low"],
          totalAutoUpper: docx.data()[teamNum].averageData.totalAutoUpper + report["auto.upper"],
          totalAutoMissed: docx.data()[teamNum].averageData.totalAutoMissed + report["auto.missed"],
          totalAutoScore: docx.data()[teamNum].averageData.totalAutoScore + report["auto.score"],
          totalAutoAccuracy: docx.data()[teamNum].averageData.totalAutoAccuracy + parseFloat(report["auto.accuracy"]),
          totalTeleopLower: docx.data()[teamNum].averageData.totalTeleopLow + report["teleop.low"],
          totalTeleopUpper: docx.data()[teamNum].averageData.totalTeleopUpper + report["teleop.upper"],
          totalTeleopMissed: docx.data()[teamNum].averageData.totalTeleopMissed + report["teleop.missed"],
          totalTeleopScore: docx.data()[teamNum].averageData.totalTeleopScore + report["teleop.score"],
          totalTeleopAccuracy: docx.data()[teamNum].averageData.totalTeleopAccuracy + parseFloat(report["teleop.accuracy"]),
          totalClimbTime: docx.data()[teamNum].averageData.totalClimbTime + report["climb.time"],
          totalClimbScore: docx.data()[teamNum].averageData.totalClimbScore + report["climb.score"],
        }
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
