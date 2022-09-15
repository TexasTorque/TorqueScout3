import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, logInWithEmailAndPassword } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Card from "react-bootstrap/Card";

import { default as Loader } from "../components/Loader";
import { default as Numeric } from "../components/Numeric";
import { default as Group } from "../components/Group";
import { default as Toggle } from "../components/Toggle";
import { default as Field } from "../components/Field";
import { default as Exclusive } from "../components/Exclusive";
import { default as Click } from "../components/Click";
import { default as Click2 } from "../components/Click2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return <Loader />;
    }
    if (user) navigate("/scout");
  }, [user, loading]);

  const login = () => {
    console.log(email);
    console.log(password);
    logInWithEmailAndPassword(email, password);
    navigate('/scout');
    // auth.signInWithEmailAndPassword(email, password).catch((error) => {
      // alert(error.message);
    // });
  }

  return (
    <div className="scout">
      <div className="container mt-4">
        {/* <div className="row ml-2"> */}
          {/* <h1>Torque Scout 3</h1> */}
        {/* </div> */}
        <Group name="Login">
        {/* <Group> */}
          <Click2 name="Back to home" callback={() => navigate('/')} />
          <Field name="EMail" callback={e => setEmail(e)} />
          <Field name="Password" callback={e => setPassword(e)} type="password" />
          <Click2 name="Login" callback={() => login()} />
        </Group>
      </div>
    </div>
  );
};

export default Login;
