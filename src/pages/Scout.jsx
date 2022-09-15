import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Card from "react-bootstrap/Card";

import { default as Loader } from "../components/Loader";
import { default as Numeric } from "../components/Numeric";
import { default as Group } from "../components/Group";
import { default as Toggle } from "../components/Toggle";
import { default as Field } from "../components/Field";
import { default as Exclusive } from "../components/Exclusive";
import { default as Click } from "../components/Click";
import { default as Click2 } from "../components/Click2";

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
        [field]: value,
      });
    };
  };

  const [checked, setChecked] = useState(false);

  const submit = () => {
    let local = report;
    for (const [key, value] of Object.entries(map))
      if (!(key in report)) local[key] = value;
    setReport(local);

    for (const [key, value] of Object.entries(report))
      if (value == null) {
        alert("The field " + key + " cannot be empty.");
        return;
      }

    if (!checked) {
      alert("Plase double check you're input fields.");
      setChecked(true);
      return;
    }

    if (!window.confirm("Are you sure you want to submit?")) return;

    local = report;
    local["meta.username"] = name;
    local["meta.timestamp"] = new Date().getTime();
    setReport(local);

    // db.collection("match-" + report['info.match']).add(report);
    console.log(report);
  };

  const username = user ? user.email.split("@")[0] : "null";

  return (
    <div className="scout">
      <div className="container mt-4">
        <Group name="Scouting">
          <Field name="Scouter" callback={_ => _} readonly={username} />
          <Click2 name="Logout" callback={() => logout()} />
          <Click2 name="Submit" callback={() => submit()} />
        </Group>
        <Group name="Info">
          <Field name="Match" callback={hook("info.match", null)} />
          <Field name="Team" callback={hook("info.team", null)} />
          <Toggle
            name="Alliance"
            on="primary"
            callback={hook("info.alliance", false)}
          />
        </Group>
        <Group name="Auto">
          <Toggle name="Taxi" callback={hook("auto.taxi", false)} />
          <Numeric name="Lower" min={0} callback={hook("auto.low")} />
          <Numeric name="Upper" min={0} callback={hook("auto.upper")} />
          <Numeric name="Missed" min={0} callback={hook("auto.missed")} />
        </Group>
        <Group name="Teleop">
          <Numeric name="Lower" min={0} callback={hook("teleop.low")} />
          <Numeric name="Upper" min={0} callback={hook("teleop.upper")} />
          <Numeric name="Missed" min={0} callback={hook("teleop.missed")} />
        </Group>
        <Group name="Climb">
          <Numeric
            name="Time"
            increment={5}
            min={0}
            callback={hook("climb.time")}
          />
          <Exclusive
            elements={["None", "Low", "Mid", "High", "Traverse"]}
            callback={hook("climb.level", "None")}
          />
        </Group>
      </div>
    </div>
  );
};

export default Scout;
