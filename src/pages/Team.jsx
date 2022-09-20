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

      const autoLower = row["auto.low"] ?? 0;
      const autoUpper = row["auto.upper"] ?? 0;
      const autoMissed = row["auto.missed"] ?? 0;

      const teleopLower = row["teleop.low"] ?? 0;
      const teleopUpper = row["teleop.upper"] ?? 0;
      const teleopMissed = row["teleop.missed"] ?? 0;

      const autoScore = (autoLower) * 2 + (autoUpper) * 4;
      const autoAccuracy = (autoLower + autoUpper) > 0 ? Number(((autoLower + autoUpper) / (autoLower + autoUpper + autoMissed))).toFixed(2) : 0;
      const teleopScore = (teleopLower) * 1 + (teleopUpper) * 2;
      const teleopAccuracy = (teleopLower + teleopUpper) > 0 ? Number(((teleopLower + teleopUpper) / (teleopLower + teleopUpper + teleopMissed)).toFixed(2)) : 0;
      const climbScore =  climbLevels[row["climb.level"] ?? "None"];
      const totalScore = autoScore + teleopScore + climbScore;
     
      return {
        ...row,
        "auto.taxi": row["auto.taxi"] ? "Yes" : "No",
        "auto.score": autoScore,
        "auto.accuracy": autoAccuracy,
        "teleop.accuracy": teleopAccuracy,
        "teleop.defense": row["teleop.defense"] ? "Yes" : "No",
        "teleop.broken": row["teleop.broken"] ? "Yes" : "No",
        "teleop.score": teleopScore,
        "climb.score": climbLevels[row["climb.level"] ?? "None"],
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
    makeColumn("Auto Accuracy", "auto.accuracy"),

    makeColumn("Teleop Lower", "teleop.low"),
    makeColumn("Teleop Upper", "teleop.upper"),
    makeColumn("Teleop Missed", "teleop.missed"),
    makeColumn("Teleop Score", "teleop.score"),
    makeColumn("Teleop Accuracy", "teleop.accuracy"),
    
    makeColumn("Climb Level", "climb.level", false),
    makeColumn("Climb Time", "climb.time"),
    makeColumn("Climb Score", "climb.score"),

    makeColumn("Defense", "teleop.defense", false),
    makeColumn("Broken", "teleop.broken", false),

    makeColumn("Scouter", "meta.username", false),
  ];

  return (
    <div className="home">
      <div className="mt-4" style={{width: "100rem"}}>
        <Group name={"Data for Team " + team} style={{width: "100%"}}>
          <ButtonFull name="Back to Analysis" callback={() => navigate("/analysis")} />
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
