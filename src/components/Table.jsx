import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

export const makeColumn = (label, accessor, sortable = true) => {
  return { label: label, accessor: accessor, sortable: sortable };
};

const Table = ({ json, columns, defaultSortField }) => {
  const [sortField, setSortField] = useState(defaultSortField);
  const [data, setData] = useState(json);

  useEffect(() => setData(json), [json, data]);

  const handleSort = (field) => {
    setSortField(field);

    if (field == null) return;

    const sorted = data.sort((a, b) => {
      if (a[field] < b[field]) return 1;
      if (a[field] > b[field]) return -1;
      return 0;
      // return a[field].localeCompare(b[field]);
    });

    setData(sorted);
  };

  return (
    <>
      <table className="table mt-4">
        <thead>
          <tr>
            {columns.map(({ label, accessor, sortable }) => (
              // <th key={accessor}>
              <th>
                { sortable ? (
                  <Button
                    variant="link"
                    className=""
                    onClick={() => handleSort(accessor)}
                  >
                    {label}
                  </Button>
                ) : label }
              </th>
            ))}
          </tr>
        </thead>
        { data == null ? <Null /> : (
          <tbody>
            {data.map(row => (
              <tr>
                {columns.map(({ accessor }) => {
                  const cell = row[accessor];
                  return <td>{cell == null ? "N/A" : cell}</td>;
                })}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
};

export default Table;
