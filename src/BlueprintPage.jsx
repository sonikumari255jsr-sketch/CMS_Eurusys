import { useState } from "react";
import { Link } from "react-router-dom";
import './BlueprintPage.css';

export default function BlueprintPage({ blueprints, setBlueprints }) {
  const [newBlueprintName, setNewBlueprintName] = useState("");

  function createBlueprint() {
    if (!newBlueprintName.trim()) return alert("Enter blueprint name");

    setBlueprints((p) => [
      { id: crypto.randomUUID(), name: newBlueprintName, fields: [] },
      ...p,
    ]);

    setNewBlueprintName("");
    alert("Blueprint created!");
  }

  return (
    <div className="blueprint-page">
      <h1>Create Blueprint</h1>
      <div className="panel">
        <input
          type="text"
          placeholder="Blueprint Name"
          value={newBlueprintName}
          onChange={(e) => setNewBlueprintName(e.target.value)}
          className="input"
        />
        <button onClick={createBlueprint} className="primary-btn">Create Blueprint</button>
      </div>

      <h2>Existing Blueprints</h2>
      <ul>
        {blueprints.map((bp) => (
          <li key={bp.id}>
            <span>{bp.name}</span> - <Link to={`/add-label/${bp.id}`} className="link">Add Labels</Link>
          </li>
        ))}
      </ul>

      <Link to="/dashboard" className="link">Go to Contracts Dashboard</Link>
    </div>
  );
}