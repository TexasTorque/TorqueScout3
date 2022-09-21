import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getAverages } from "../firebase";
import Group from "../components/Group";
import Table, { makeColumn } from "../components/Table";
import ButtonFull from "../components/ButtonFull";

const Averages = () => {
  const navigate = useNavigate();

{/*}
  useEffect(() => {
    getAverages().then(() => setTable());
  }, [team]); */}

  return (
    <div className="home">
    </div>
  );
};

export default Averages;
