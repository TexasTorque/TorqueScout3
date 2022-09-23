import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getAverages } from "../firebase";
import Group from "../components/Group";
import Table, { makeColumn } from "../components/Table";
import ButtonFull from "../components/ButtonFull";

const Averages = () => {
  const navigate = useNavigate();
  
  const [averages, setAverages] = useState(null);

  useEffect(() => {
    getAverages().then((data) => setAverages(processAverages(data)));
  }, []);

  console.log(averages);

  const processAverages = (data) => {
    return data.map(row => {
      return {
        ...row,
      }
    })
  }

  const columns = [
    makeColumn("Team", "teamName"),
    makeColumn("Score", "totalScore"),
    makeColumn("Auto Lower", "totalAutoLow"),
    makeColumn("Auto Upper", "totalAutoUpper"),
    makeColumn("Auto Missed", "totalAutoMissed"),
    makeColumn("Auto Accuracy", "totalAutoAccuracy"),
    makeColumn("Teleop Lower", "totalTeleopLow"),
    makeColumn("Teleop Upper", "totalTeleopUpper"),
    makeColumn("Teleop Missed", "totalTeleopMissed"),
    makeColumn("Teleop Accuracy", "totalTeleopAccuracy"),
    makeColumn("Climb Score", "totalClimbScore"),
    makeColumn("Climb Time", "totalClimbTime"),
  ];
  

  return ( 
    <div className="home">
      <div className="mt-4" style={{width: "100rem"}}>
        <Group name={"Team Averages"} style={{width: "100%"}}>
          <ButtonFull name="Back to Analysis" callback={() => navigate("/analysis")} />
          <br></br>
          <div className="table-container">
            <Table json={averages} columns={columns} defaultSortField="totalMatches"/>
          </div>
        </Group>
      </div>
    </div>
  );
};

export default Averages;

