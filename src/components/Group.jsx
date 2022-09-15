import React, { useEffect, useState } from "react";


import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';


import { default as Null } from './Null';

const Group = ({name, children}) => {
    return (
    <div className="row ml-2">
        <Card>
            <Card.Header><h3>{name || <Null/>}</h3></Card.Header>
            <div className="ml-4 mr-4 mb-4">
                {children} 
            </div>
        </Card>
    </div>
    );


}

export default Group;