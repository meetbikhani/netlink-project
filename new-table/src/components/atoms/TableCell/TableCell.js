import React from 'react';
import './TableCell.css';

const TableCell = ({ children, isHeader }) => {
  return isHeader ? (
    <th className="table-cell header">{children}</th>
  ) : (
    <td className="table-cell">{children}</td>
  );
};

export default TableCell; 