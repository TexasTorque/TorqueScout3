import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Home = () => {
  return (
    <div className="home">
      <div className="container mt-4">
        <div className="row ml-2">
          <h1>Torque Scout 3</h1>
        </div>
        <div className="row ml-2">
          <p>Texas Torque's Scouting Application</p>
        </div>
        <div className="row">
          <div className="ml-4">
            <Button variant="primary" size="lg" href="/scout" varient="warning">
              Scout
            </Button>
          </div>
          <div className="ml-4">
            <Button variant="primary" size="lg" href="#" varient="warning">
              Analysis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
