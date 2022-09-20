import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getMatchesPerTeam } from "../firebase";
import Group from "../components/Group";
import Table, { makeColumn } from "../components/Table";
import ButtonFull from "../components/ButtonFull";

const Averages = () => {
  const navigate = useNavigate();

  const { team } = useParams();

  const [teamData, setTeamData] = useState(null);
{/*}
  useEffect(() => {
    getMatchesPerTeam(team).then((data) => setTeamData(processData(data)));
  }, [team]); */}

  return (
    <div className="home">
    </div>
  );
};

export default Averages;
