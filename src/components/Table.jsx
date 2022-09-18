import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ json }) => {
 const columns = [
  { label: "Match", accessor: "info.match" },
  { label: "Auto Taxi", accessor: "auto.taxi" },
  { label: "Auto Lower", accessor: "auto.low" },
  { label: "Auto Upper", accessor: "auto.upper" },
  { label: "Auto Missed", accessor: "auto.missed" },
  { label: "Teleop Lower", accessor: "teleop.low" },
  { label: "Teleop Upper", accessor: "teleop.upper" },
  { label: "Teleop Missed", accessor: "teleop.missed" },
  { label: "Climb Level", accessor: "climb.level" },
  { label: "Climb Time", accessor: "climb.time" },
  { label: "Scouter", accessor: "meta.username" },
 ];

 return (
  <>
   <table className="table">
    <TableHead columns={columns} />
    <TableBody columns={columns} tableData={json} />
   </table>
  </>
 );
};

export default Table;