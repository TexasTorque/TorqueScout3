import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Card from 'react-bootstrap/Card';

import { default as Loader } from "../components/Loader";
import { default as Numeric } from "../components/Numeric";
import { default as Group } from "../components/Group";
import { default as Toggle } from "../components/Toggle";
import { default as Field } from "../components/Field";
import { default as Exclusive } from "../components/Exclusive";
import { default as Click } from "../components/Click";

const Scout = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return <Loader />;
    if (!user) return navigate("/login");
  }, [user, loading]);

    const [report, setReport] = useState({});
    const map = {};

    const hook = (field, def = 0) => {
        map[field] = def;
        return (value) => {
            setReport({
                ...report,
                [field]: value
            });
        }
    }

    const submit = () => {
        let local = report;
        for (const [key, value] of Object.entries(map))
            if (!(key in report))
                local[key] = value;
        setReport(local);

        for (const [key, value] of Object.entries(report)) 
            if (value == null) {
                alert("Field " + key + " cannot be empty");
                return;
            }

        console.log(report);
    }

  return (
    <div className="scout">
      <div className="container mt-4">
        <div className="row ml-2">
          <h1>Torque Scout 3</h1>
        </div>
        <Group name="Info"> 
            <Field name="Match" callback={hook('info.match', null)}/>
            <Field name="Team" callback={hook('info.team', null)}/>
            <Toggle name="Alliance" on="primary" callback={hook('info.alliance', false)}/>
        </Group>
        <Group name="Auto"> 
            <Toggle name="Taxi" callback={hook('auto.taxi', false)}/>
            <Numeric name="Lower" min={0} callback={hook('auto.low')} />
            <Numeric name="Upper" min={0} callback={hook('auto.upper')} />
            <Numeric name="Missed" min={0} callback={hook('auto.missed')} />
        </Group>
        <Group name="Teleop"> 
            <Numeric name="Lower" min={0} callback={hook('teleop.low')} />
            <Numeric name="Upper" min={0} callback={hook('teleop.upper')} />
            <Numeric name="Missed" min={0} callback={hook('teleop.missed')} />
           
        </Group>
        <Group name="Climb"> 
            <Numeric name="Time" increment={5} min={0} callback={hook('climb.time')}/>
            <Exclusive elements={["None", "Low", "Mid", "High", "Traverse"]} callback={hook('climb.level', 'None')}/>
        </Group>
        <Group name="Submit">
            <Click name="Submit" callback={() => submit()}/>
        </Group>
        
      </div>

    <br></br>
    <br></br>
    <br></br>
      <span>
        <code>
        {JSON.stringify(report)}
        </code>  
        </span>
    </div>
  );
}

export default Scout;
