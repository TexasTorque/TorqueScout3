import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { default as Loader } from "../components/Loader";
import { default as Numeric } from "../components/Numeric";
import { default as Group } from "../components/Group";
import { default as Toggle } from "../components/Toggle";
import { default as TextField } from "../components/TextField";
import { default as MutuallyExclusive } from "../components/MutuallyExclusive";
import { default as ButtonHalf } from "../components/ButtonHalf";
import { default as ButtonFull } from "../components/ButtonFull";

const Analysis = () => {
  const navigate = useNavigate();

  const [team, setTeam] = useState(0);

  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Analysis">
          <ButtonFull name="View Averages" callback={() => navigate('/avgs')} />
          <TextField name="Team" callback={v => setTeam(v)} type="number" inputMode="decimal"/>
          <ButtonFull name="View By Team" callback={() => navigate('/team/' + team)} />
        </Group>
      </div>
    </div>
  );
};

export default Analysis;
