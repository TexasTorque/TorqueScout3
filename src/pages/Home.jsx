import React from "react";

import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import Numeric from "../components/Numeric";
import Group from "../components/Group";
import Toggle from "../components/Toggle";
import TextField from "../components/TextField";
import MutuallyExclusive from "../components/MutuallyExclusive";
import ButtonHalf from "../components/ButtonHalf";
import ButtonFull from "../components/ButtonFull";

import {logout} from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Torque Scout 3">
          <ButtonFull name="Scout" callback={() => navigate("/scout")} />
          <ButtonFull name="Analysis" callback={() => navigate("/analysis")} />
          {/* <ButtonFull name="Login" callback={() => navigate("/login/index")} /> */}
          {/* <ButtonFull name="Logout" callback={() => logout()} /> */}
          <ButtonFull name="Admin" callback={() => navigate("/admin")} />
          <ButtonFull name="About" callback={() => navigate("/about")} />
          <ButtonFull
            name="Feedback"
            callback={() =>
              (window.location = "https://forms.gle/xFdfs48ZrCWbjxhdA")
            }
          />
        </Group>
      </div>
    </div>
  );
};

export default Home;
