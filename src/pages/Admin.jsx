import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, submitReport, getUserFromID, createUser, deleteUserByID, deleteUserByName } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Card from "react-bootstrap/Card";

import Loader from "../components/Loader";
import Numeric from "../components/Numeric";
import Group from "../components/Group";
import Toggle from "../components/Toggle";
import TextField from "../components/TextField";
import MutuallyExclusive from "../components/MutuallyExclusive";
import ButtonHalf from "../components/ButtonHalf";
import ButtonFull from "../components/ButtonFull";
import Stopwatch from "../components/Stopwatch";

const Admin = () => {
  const [user, loading, error] = useAuthState(auth);

  const [name, setName] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return <Loader />;
    if (!user) return navigate("/login/admin");
    getUserFromID(user.email.split("@")[0]).then(user => {
      if (user == null) {
        alert("User was can not be found (was probably deleted).");
        logout();
        return navigate("login/scout");
      }
      setName(user["first"])
      if (!user["admin"]) return navigate("/");
    });
  }, [user, loading]);

  // Create fields
  const [createPassword,  setCreatePassword]  = useState("");
  const [createConfirm,   setCreateConfirm]   = useState("");
  const [createFirst,     setCreateFirst]     = useState("");
  const [createLast,      setCreateLast]      = useState("");
  const [createAdmin,     setCreateAdmin]     = useState(false);

  const createUserSubmit = () => {
    if (createPassword != createConfirm) {
      alert("Passwords do not match.");
      return;
    }
    if (createPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (createFirst.length == 0) {
      alert("First name cannot be empty.");
      return;
    }
    if (createLast.length == 0) {
      alert("Last name cannot be empty.");
      return;
    }
    
    createUser(createFirst, createLast, createPassword, createAdmin);
  }

  // Delete fields
  const [deleteFirst,     setDeleteFirst]     = useState("");
  const [deleteLast,      setDeleteLast]      = useState("");
  const [deleteID,        setDeleteID]        = useState("");

  const deleteUserSubmit = () => {
    if ((deleteFirst.length == 0 || deleteLast.length == 0) && deleteID.length == 0) {
      alert("To delete a user, you must either provide an ID or first and last name.")
      return;
    }

    if (deleteID.length > 0)
      deleteUserByID(deleteID);
    else
      deleteUserByName(deleteFirst, deleteLast);
  };


  return (
    <div className="admin">
      <div className="container mt-4">
        <Group name="Admin Dashboard">
          <TextField name="User" callback={(_) => _} readonly={name ?? ""} />
          <ButtonFull name="Exit" callback={() => navigate("/")} />
        </Group>
       
        <Group name="Create User">
          <TextField name="First" callback={setCreateFirst} />
          <TextField name="Last" callback={setCreateLast} />
          <TextField name="Password" callback={setCreatePassword} type="password" />
          <TextField name="Confirm" callback={setCreateConfirm} type="password" />
          <Toggle name="Admin" callback={setCreateAdmin} />
          <ButtonFull name="Create" callback={createUserSubmit} />
        </Group>


        <Group name="Delete User">
          <TextField name="ID" callback={setDeleteID} />
          <TextField name="First" callback={setDeleteFirst} />
          <TextField name="Last" callback={setDeleteLast} />
          <ButtonFull name="Delete" callback={deleteUserSubmit} />
        </Group>
      </div>
    </div>
  );
};

export default Admin;
