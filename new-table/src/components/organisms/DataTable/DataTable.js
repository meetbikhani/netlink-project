import React from 'react';
import TableRow from '../../molecules/TableRow/TableRow';
import './DataTable.css';

const DataTable = ({ data, headers }) => {
  if (!data || data.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <TableRow data={headers} isHeader={true} />
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} data={row} isHeader={false} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 