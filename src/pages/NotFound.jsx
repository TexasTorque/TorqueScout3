import React from "react";

import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import Numeric from "../components/Numeric";
import Group from "../components/Group";
import Toggle from "../components/Toggle";
import TextField from "../components/TextField";
import MutuallyExclusive from "../components/MutuallyExclusive";
import ButtonHalf from "../components/ButtonHalf";
import ButtonFull from "../components/ButtonFull";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Page Not Found">
          <ButtonFull name="Back to home" callback={() => navigate("/")} />
        </Group>
      </div>
    </div>
  );
};

export default NotFound;
