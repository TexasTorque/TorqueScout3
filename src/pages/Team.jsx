import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getMatchesPerTeam } from "../firebase";
import { default as Group } from "../components/Group";
import Table, { makeColumn } from "../components/Table";

const Team = () => {
  const navigate = useNavigate();

  const { team } = useParams();

  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    getMatchesPerTeam(team).then((data) => setTeamData(data));
  }, [team]);

  const columns = [
    makeColumn("Match", "info.match"),
    makeColumn("Auto Taxi", "auto.taxi", false),
    makeColumn("Auto Lower", "auto.low"),
    makeColumn("Auto Upper", "auto.upper"),
    makeColumn("Auto Missed", "auto.missed"),
    makeColumn("Teleop Lower", "teleop.low"),
    makeColumn("Teleop Upper", "teleop.upper"),
    makeColumn("Teleop Missed", "teleop.missed"),
    makeColumn("Climb Level", "climb.level", false),
    makeColumn("Climb Time", "climb.time"),
    makeColumn("Scouter", "meta.username", false),
  ];

  return (
    <div className="home">
      <div className="mt-4">
        <Group name={"Matches for " + team}>
          <div className="table-container">
            <Table json={teamData} columns={columns} />
          </div>
        </Group>
      </div>
    </div>
  );
};

export default Team;
