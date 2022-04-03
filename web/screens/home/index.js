import React, { useState, useEffect } from "react";
import Grid from "../../components/Grid";
import NewFrom from "../../components/NewForm";
import "./styles.css";

export default function Home() {
  const [initialed, setInitialed] = useState(false); // Allow fetch data for the first time only
  const [isLoading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]); // Will be filled by log rows from server
  const [showNewForm, setShowNewForm] = useState(false); // Hide/Show new form box

  const serverCall = async (action) => {
    // this method wrap action in try catch block and also manipulate isLoading state
    try {
      setLoading(true);
      await action();
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      alert((ex && ex.message) || "Server Error");
    }
  };

  const getData = async () => {
    // Read logs from server and set to state
    serverCall(async () => {
      const result = await fetch("/api/getLogs");
      let serverLogs = await result.json();
      setLogs(serverLogs);
    });
  };

  const saveData = async ({ start, end, description }) => {
    // Validate and save data to server
    if (!start || !end) {
      return alert("Invalid date");
    }

    if (Date.parse(start) > Date.parse(end)) {
      return alert("End most be greater than start");
    }

    serverCall(async () => {
      const result = await fetch("/api/setLog", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start, end, description }),
      });

      const newLog = await result.json();
      let newLogs = [...logs, newLog];
      // After save, append newly added log, resort logs by its starts and then, set state
      setLogs(
        newLogs.sort((a, b) => Date.parse(b.start) - Date.parse(a.start))
      );
      setShowNewForm(false);
    });
  };

  const renderNewForm = () => {
    if (showNewForm) {
      return (
        <NewFrom
          onSave={saveData}
          onClose={() => {
            setShowNewForm(false);
          }}
        />
      );
    }

    return (
      <button className="addButton" onClick={() => setShowNewForm(true)}>
        Add New Log
      </button>
    );
  };

  useEffect(() => {
    if (!initialed) {
      getData();
      setInitialed(true);
    }
  });

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  return (
    <>
      {renderNewForm()}
      <Grid logs={logs} />
    </>
  );
}
