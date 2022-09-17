import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getMatchesPerTeam } from "../firebase";

import { default as Loader } from "../components/Loader";
import { default as Numeric } from "../components/Numeric";
import { default as Group } from "../components/Group";
import { default as Toggle } from "../components/Toggle";
import { default as TextField } from "../components/TextField";
import { default as MutuallyExclusive } from "../components/MutuallyExclusive";
import { default as ButtonHalf } from "../components/ButtonHalf";
import { default as ButtonFull } from "../components/ButtonFull";

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
        <table>
          <thead>
            <tr>
              <th>Match</th>
              <th>Auto Taxi</th>
              <th>Auto Lower</th>
              <th>Auto Upper</th>
              <th>Auto Missed</th>
              <th>Teleop Lower</th>
              <th>Teleop Upper</th>
              <th>Teleop Missed</th>
            </tr>
          </thead>
          <tbody>{/*
            {teamData.map((obj) =>(
              <tr>
                <td>{obj.match}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}*/}
            <tr>
            <td>HI</td>
            </tr>
          </tbody>
      </table>
        </Group>
      </div>
    </div>
  );
};

export default Team;
