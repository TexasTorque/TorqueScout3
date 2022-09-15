import React from "react";

import { useNavigate } from "react-router-dom";

import { default as Loader } from "../components/Loader";
import { default as Numeric } from "../components/Numeric";
import { default as Group } from "../components/Group";
import { default as Toggle } from "../components/Toggle";
import { default as TextField } from "../components/TextField";
import { default as MutuallyExclusive } from "../components/MutuallyExclusive";
import { default as ButtonHalf } from "../components/ButtonHalf";
import { default as ButtonFull } from "../components/ButtonFull";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Page Not Found">
          <ButtonFull name="Back to home" callback={() => navigate('/')} />
        </Group>
      </div>
    </div>
  );
};

export default NotFound;
