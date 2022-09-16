import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";

import { default as ButtonFull } from "../components/ButtonFull";
import { default as Group } from "../components/Group";
import { default as Loader } from "../components/Loader";
import { default as TextField } from "../components/TextField";

const Login = () => {
  const [id, setID] = useState("");
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
    const email = id + '@scout.texastorque.org';
    logInWithEmailAndPassword(email, password);
    navigate('/scout');
  }

  return (
    <div className="login">
      <div className="container mt-4">
        <Group name="Login">
          <ButtonFull name="Back to home" callback={() => navigate('/')} />
          <TextField name="Username" callback={e => setID(e)} />
          <TextField name="Password" callback={e => setPassword(e)} type="password" />
          <ButtonFull name="Login" callback={() => login()} />
        </Group>
      </div>
    </div>
  );
};

export default Login;
