import React from "react";

import { useNavigate } from "react-router-dom";

import { default as Loader } from "../components/Loader";
import { default as Numeric } from "../components/Numeric";
import { default as Group } from "../components/Group";
import { default as Toggle } from "../components/Toggle";
import { default as TextField } from "../components/TextField";
import { default as MutuallyExclusive } from "../components/MutuallyExclusive";
import { default as ButtonHalf } from "../components/ButtonHalf";
import { default as ButtonFull } from "../components/ButtonFull";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Torque Scout 3">
          <ButtonFull name="Scout" callback={() => navigate('/scout')} />
          <ButtonFull name="Analysis" callback={() => navigate('/analysis')} />
          <ButtonFull name="About" callback={() => navigate('/about')} />
          <ButtonFull name="Feedback" callback={() => window.location = 'https://forms.gle/xFdfs48ZrCWbjxhdA'} />
        </Group>
      </div>
    </div>
  );
};

export default Home;
