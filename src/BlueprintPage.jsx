import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
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
      <Header />
      <div className="page-content">
      <div className="page-header">
        <h1>Blueprint Management</h1>
        <p>Create and manage contract templates with customizable fields</p>
      </div>

      <div className="create-section">
        <h2>Create New Blueprint</h2>
        <div className="panel">
          <div className="input-group">
            <label>Blueprint Name:</label>
            <input
              type="text"
              placeholder="Enter blueprint name"
              value={newBlueprintName}
              onChange={(e) => setNewBlueprintName(e.target.value)}
              className="input"
            />
          </div>
          <button onClick={createBlueprint} className="primary-btn">Create Blueprint</button>
        </div>
      </div>

      <div className="existing-section">
        <h2>Existing Blueprints ({blueprints.length})</h2>
        {blueprints.length === 0 ? (
          <div className="empty-state">
            <p>No blueprints created yet. Create your first blueprint above!</p>
          </div>
        ) : (
          <div className="blueprints-grid">
            {blueprints.map((bp) => (
              <div key={bp.id} className="blueprint-card">
                <div className="blueprint-info">
                  <h3>{bp.name}</h3>
                  <p>{bp.fields.length} field{bp.fields.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="blueprint-actions">
                  <Link to={`/add-label/${bp.id}`} className="action-btn primary">Add Fields</Link>
                  <Link to="/dashboard" className="action-btn secondary">Use in Contract</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="navigation">
        <Link to="/dashboard" className="nav-link">View Contracts Dashboard</Link>
      </div>
    </div>
    </div>
  );
}