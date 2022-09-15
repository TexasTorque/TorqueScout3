import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { default as Null } from "./Null";

const ButtonFull = ({ name, callback, variant }) => {
  return (
    <div className="click">
      <div className="row mt-4 mr-0 mb-0">
        <div className="ml-3 mt-0" style={{ width: "18rem" }}>
          <Button
            className="w-100"
            variant={variant ?? "primary"}
            size="md"
            onClick={() => callback()}
          >
            {name || <Null />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonFull;
