import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { default as Null } from "./Null";

const Field = ({ name, callback, placeholder, readonly }) => {
  return (
    <div className="numeric">
      <div className="row mt-4 mr-3">
        <h4 className="name-field ml-3 mt-2" style={{ width: "8rem" }}>
          {name || <Null />}
        </h4>
        <div className="ml-0 mt-1" style={{ width: "10rem" }}>
          <Form.Control
            disabled={readonly != null}
            onChange={(e) => e}
            className="w-100"
            type="text"
            placeholder={placeholder ?? (readonly ?? "")}
          />
        </div>
      </div>
    </div>
  );
};

export default Field;
