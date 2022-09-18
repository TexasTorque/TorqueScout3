import React, { useEffect, useState } from "react";

const TableBody = ({ tableData, columns }) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
      const timeout = setTimeout(() => {
        setShow(true)
      }, 1000)
  
      return () => clearTimeout(timeout)
  
    }, [show])
  
    if (!show) return null
  
    return (
     <tbody>
      {tableData.map((data) => {
       return (
        <tr key={data['meta.timestamp']}>
         {columns.map(({ accessor }) => {
          const tData = (data[accessor] != null) ? data[accessor] : "——";
          return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
   };
   
   export default TableBody;