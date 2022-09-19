import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import Numeric from "../components/Numeric";
import Group from "../components/Group";
import Toggle from "../components/Toggle";
import TextField from "../components/TextField";
import MutuallyExclusive from "../components/MutuallyExclusive";
import ButtonHalf from "../components/ButtonHalf";
import ButtonFull from "../components/ButtonFull";

const Analysis = () => {
  const navigate = useNavigate();

  const [team, setTeam] = useState(0);

  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Analysis">
          <ButtonFull name="Back to home" callback={() => navigate("/")} />
          <ButtonFull name="View averages" callback={() => navigate("/avgs")} />
          <TextField
            name="Team"
            callback={(v) => setTeam(v)}
            type="number"
            inputMode="decimal"
          />
          <ButtonFull
            name="View by team"
            callback={() => navigate("/team/" + team)}
          />
        </Group>
      </div>
    </div>
  );
};

export default Analysis;
