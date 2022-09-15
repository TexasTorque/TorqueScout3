import React, { useEffect, useState } from "react";


import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { default as Null } from './Null';

const Toggle = ({name, callback, init, on, off, id}) => {
    const [value, setValue] = useState(init ?? false);

    const update = () => {
        const n = !value;
        setValue(n);
        callback(n);
    }

    return (
        <div className="toggle">
          <div className="row mt-4 mr-3">
            <h4 className="name-field ml-3 mt-2" style={{width: '8rem'}}>{name || <Null/>}</h4>
            <div className="ml-0 mt-1" style={{width: '10rem'}}>
                <Button className="w-100" variant={value ? (on ?? "success") : (off ?? "danger")} 
                        size="md" onClick={() => update()}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
            </div>
          </div>
        </div>
    );
}

export default Toggle;