import TableBody from "./TableBody";
import TableHead from "./TableHead";
import React,  { useState }  from "react";

const Table = ({ json }) => {

 const [tableData, setTableData] = useState(json);   

 const columns = [
  { label: "Match", accessor: "info.match"},
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

 const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
     const sorted = [...Object.entries({tableData})].sort((a, b) => {
      if (a[sortField] === null) return 1;
      if (b[sortField] === null) return -1;
      if (a[sortField] === null && b[sortField] === null) return 0;
      return (
       a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
        numeric: true,
       }) * (sortOrder === "asc" ? 1 : -1)
      );
     });
     setTableData(sorted);
    }
  };

 return (
  <>
   <table className="table">
    <TableHead columns={columns} handleSorting={handleSorting}/>
    <TableBody columns={columns} tableData={json} />
   </table>
  </>
 );
};

export default Table;