import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout, submitReport, getUserFromID } from "../firebase";

import Loader from "../components/Loader";
import Numeric from "../components/Numeric";
import Group from "../components/Group";
import Toggle from "../components/Toggle";
import TextField from "../components/TextField";
import MutuallyExclusive from "../components/MutuallyExclusive";
import ButtonFull from "../components/ButtonFull";
import Stopwatch from "../components/Stopwatch";

const Scout = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return <Loader />;
    if (!user) return navigate("/login/scout");
    getUserFromID(user.email.split("@")[0]).then(user => {
      if (user == null) {
        alert("User was can not be found (was probably deleted).");
        logout();
        return navigate("login/scout");
      }
      setName(user["first"])
    });
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
      alert("Plase double check your input fields.");
      setChecked(true);
      return;
    }

    if (!window.confirm("Are you sure you want to submit?")) return;

    local = report;
    local["meta.username"] = name;
    local["meta.timestamp"] = new Date().getTime();
    setReport(local);

    submitReport(report);

    navigate("/login/scout");
  };

  const confirmExit = (callback) => {
    return () => {
      if (window.confirm("Are you sure you want to leave?")) callback();
    };
  };

  return (
    <div className="scout">
      <div className="container mt-4">
        <Group name="Scouting">
          <TextField name="Scouter" callback={(_) => _} readonly={name ?? ""} />
          <ButtonFull name="Exit" callback={confirmExit(() => navigate("/"))} />
          <ButtonFull name="Logout" callback={confirmExit(() => logout())} />
          <ButtonFull name="Submit" callback={() => submit()} />
        </Group>
        <Group name="Info">
          <TextField
            name="Match"
            callback={hook("info.match", null)}
            type="number"
            inputMode="decimal"
          />
          <TextField
            name="Team"
            callback={hook("info.team", null)}
            type="number"
            inputMode="decimal"
          />
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
          <Toggle name="Defense" callback={hook("teleop.defense", false)} />
          <Toggle name="Broken" callback={hook("teleop.broken", false)} />
        </Group>
        <Group name="Climb">
          <Stopwatch name="Climb" callback={hook("climb.time")} />
          <MutuallyExclusive
            elements={["None", "Low", "Mid", "High", "Traverse"]}
            callback={hook("climb.level", "None")}
          />
        </Group>
      </div>
    </div>
  );
};

export default Scout;
