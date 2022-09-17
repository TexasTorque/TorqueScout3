import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { default as Null } from "./Null";

const Stopwatch = ({ name, callback }) => {
  let [elapsed, setElapsed] = useState(0);
  let [paused, setPaused] = useState(true);
  let [interval, setIntervalVariable] = useState(null);

  const update = () => {
    if (paused) {
        if(interval != null){
            clearInterval(interval);
        }
        setIntervalVariable(setInterval(() => {
          setElapsed((elapsed) => elapsed + 0.1);
        }, 100));
    } else {
        clearInterval(interval);
    }
    setPaused(!paused);
    callback(elapsed);
  };

  const reset = () => {
    setElapsed(0);
    setPaused(true);
  };

return (
    <div className="numeric">
      <div className="row mt-4 mr-1">
        <Col className="ml-0 mt-2">
          <h4 className="name-field">{name || <Null />}</h4>
        </Col>
        <Col className="ml-0 mt-1">
          <Button variant="success" size="md" onClick={() => update()}>
            {paused ? "START" : "STOP"}
          </Button>
        </Col>
        <Col className="ml-0 mt-2">
          <h4 className="mono-field">{Math.floor(elapsed)}</h4>
        </Col>
        <Col className="ml-0 mt-1">
          <Button variant="danger" size="md" onClick={() => reset()}>
            {"RESET"}
          </Button>
        </Col>
      </div>
    </div>
  );
};

export default Stopwatch;
