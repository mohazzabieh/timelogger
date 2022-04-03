import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "./style.css";

export default function NewFrom({ onSave, onClose }) {
  const [start, startChange] = useState();
  const [end, endChange] = useState();
  const [description, setDescription] = useState();

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <table className="newForm">
      <tbody>
        <tr>
          <td>Start:</td>
          <td>
            <DateTimePicker onChange={startChange} value={start} />
          </td>
        </tr>
        <tr>
          <td>End:</td>
          <td>
            <DateTimePicker onChange={endChange} value={end} />
          </td>
        </tr>
        <tr>
          <td>Description:</td>
          <td>
            <textarea onChange={handleDescChange} value={description} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button
              className="button"
              onClick={() => onSave({ start, end, description })}
            >
              Save
            </button>
            <button className="button" onClick={() => onClose()}>
              Cancel
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
