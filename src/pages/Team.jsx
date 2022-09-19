import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getMatchesPerTeam } from "../firebase";
import Group from "../components/Group";
import Table, { makeColumn } from "../components/Table";
import ButtonFull from "../components/ButtonFull";

export const climbLevels = {
  "None": 0, "Low": 4, "Mid": 6, "High": 10, "Traverse": 15
};

const Team = () => {
  const navigate = useNavigate();

  const { team } = useParams();

  const [teamData, setTeamData] = useState(null);

  const processData = (data) => {
    return data.map(row => {

      const autoScore = (row["auto.low"] ?? 0) * 2 + (row["auto.upper"] ?? 0) * 4;
      const teleopScore = (row["teleop.low"] ?? 0) * 1 + (row["teleop.upper"] ?? 0) * 2;
      const climbScore =  climbLevels[row["climb.level"] ?? "None"];
      const totalScore = autoScore + teleopScore + climbScore;
     
      return {
        ...row,
        "auto.taxi": row["auto.taxi"] ? "Yes" : "No",
        "auto.score": autoScore,
        "teleop.score": teleopScore,
        // "climb.score": climbLevels[row["climb.level"] ?? "None"],
        // "total.score": row["auto.score"] + row["teleop.score"] + row["climb.score"],
        "total.score": totalScore,
      };
    });
  }


  useEffect(() => {
    getMatchesPerTeam(team).then((data) => setTeamData(processData(data)));
  }, [team]);

  const columns = [
    makeColumn("Match", "info.match"),
    makeColumn("Total Score", "total.score"),

    makeColumn("Auto Taxi", "auto.taxi", false),
    makeColumn("Auto Lower", "auto.low"),
    makeColumn("Auto Upper", "auto.upper"),
    makeColumn("Auto Missed", "auto.missed"),
    makeColumn("Auto Score", "auto.score"),

    makeColumn("Teleop Lower", "teleop.low"),
    makeColumn("Teleop Upper", "teleop.upper"),
    makeColumn("Teleop Missed", "teleop.missed"),
    makeColumn("Teleop Score", "teleop.score"),

    makeColumn("Climb Level", "climb.level", false),
    makeColumn("Climb Time", "climb.time"),

    makeColumn("Scouter", "meta.username", false),
  ];

  return (
    <div className="home">
      <div className="mt-4" style={{width: "100rem"}}>
        <Group name={"Data for Team " + team} style={{width: "100%"}}>
          <ButtonFull name="Back to analysis" callback={() => navigate("/analysis")} />
          <br></br>
          <div className="table-container">
            <Table json={teamData} columns={columns} defaultSortField="total.score"/>
          </div>
        </Group>
      </div>
    </div>
  );
};

export default Team;
