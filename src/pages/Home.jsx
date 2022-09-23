import React from "react";

import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Torque Scout">
          <ButtonFull name="Scout" callback={() => navigate("/scout")} />
          <ButtonFull name="Analysis" callback={() => navigate("/analysis")} />
          {/* <ButtonFull name="Login" callback={() => navigate("/login/index")} /> */}
          {/* <ButtonFull name="Logout" callback={() => logout()} /> */}
          {/*<ButtonFull name="Admin" callback={() => navigate("/admin")} />*/}
          <ButtonFull name="About" callback={() => navigate("/about")} />
          {/*<ButtonFull
            name="Feedback"
            callback={() =>
              (window.location = "https://forms.gle/xFdfs48ZrCWbjxhdA")
            }
          />*/}
        </Group>
      </div>
    </div>
  );
};

export default Home;
