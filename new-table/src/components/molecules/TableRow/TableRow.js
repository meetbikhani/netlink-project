import React from 'react';
import TableCell from '../../atoms/TableCell/TableCell';
import './TableRow.css';

const TableRow = ({ data, isHeader }) => {
  return (
    <tr className="table-row">
      {Object.values(data).map((cell, index) => (
        <TableCell key={index} isHeader={isHeader}>
          {cell}
        </TableCell>
      ))}
    </tr>
  );
};

export default TableRow; 