import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getMatchesPerTeam } from "../firebase";
import { default as Group } from "../components/Group";
import Table from "../components/Table";

const Team = () => {
  const navigate = useNavigate();

  const { team } = useParams();

  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    getMatchesPerTeam(team).then(data => setTeamData(data));
  }, [team]);

  return (
    <div className="home">
      <div className="container mt-4">
        <Group name={"Matches for " + team}>
          <div className="table_container">
            <Table json={teamData}/>
            <button className="btn btn-primary" onClick={() => navigate("/")}> Back </button>
          </div>
        </Group>
      </div>
    </div>
  );
};

export default Team;
