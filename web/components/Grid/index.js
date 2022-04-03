import React from "react";
import moment from "moment";
import "./styles.css";

// Formate dates
const formatter = (date) => moment(date).format("MM-DD-YYYY HH:mm");

const renderRows = (logs) => {
  if (logs && logs.length) {
    return logs.map((log, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{formatter(log.start)}</td>
          <td>{formatter(log.end)}</td>
          <td>{log.description}</td>
        </tr>
      );
    });
  }

  return (
    <tr>
      <td colSpan={4}>There is no log to display!!!</td>
    </tr>
  );
};

const Grid = ({ logs }) => {
  return (
    <table className="grid">
      <thead>
        <tr>
          <th>Row</th>
          <th>Start</th>
          <th>End</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>{renderRows(logs)}</tbody>
    </table>
  );
};

export default React.memo(Grid);
