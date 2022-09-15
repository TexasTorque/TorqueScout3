import React from "react";

import { useNavigate } from "react-router-dom";

import { default as Loader } from "../components/Loader";
import { default as Numeric } from "../components/Numeric";
import { default as Group } from "../components/Group";
import { default as Toggle } from "../components/Toggle";
import { default as Field } from "../components/Field";
import { default as Exclusive } from "../components/Exclusive";
import { default as Click } from "../components/Click";
import { default as Click2 } from "../components/Click2";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Page Not Found">
          <Click2 name="Back to home" callback={() => navigate('/')} />
        </Group>
      </div>
    </div>
  );
};

export default NotFound;
