import React from "react";

import { useNavigate } from "react-router-dom";
import { default as Group } from "../components/Group";
import { default as ButtonFull } from "../components/ButtonFull";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="About">
          <p className="mt-4" style={{ width: "18rem" }}>
            Torque Scout 3 is proprietary software built by the software team at{" "}
            <a href="https://texastorque.org">Texas Torque</a>.
          </p>
          <p className="mt-2" style={{ width: "18rem" }}>
            Torque Scout 3 was initially written by{" "}
            <a href="https://justusl.com">Justus Languell</a> in 1 day.
          </p>
          <h5>Authors</h5>
          <p className="mt-2" style={{ width: "18rem" }}>
            <ul>
              <li>
                <a href="https://github.com/Juicestus">Justus Languell</a>
              </li>
              <li>
                <a href="https://github.com/Suhas44">Suhas Guddeti</a>
              </li>
              <li>
                <a href="https://github.com/realSaddy">Jack Pittenger</a>
              </li>
            </ul>
          </p>
          {/* <ButtonFull name="View the code" callback={() => window.location = 'https://github.com/texastorque/TorqueScout3'} /> */}
          <ButtonFull
            name="Feedback"
            callback={() =>
              (window.location = "https://forms.gle/xFdfs48ZrCWbjxhdA")
            }
          />
          <ButtonFull name="Back to home" callback={() => navigate("/")} />
        </Group>
      </div>
    </div>
  );
};

export default About;
