import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import './BlueprintPage.css';

// Sample blueprints data
const sampleBlueprints = [
  {
    id: crypto.randomUUID(),
    name: "Employment Contract",
    fields: [
      { id: crypto.randomUUID(), label: "Employee Name", type: "Text", x: 50, y: 50 },
      { id: crypto.randomUUID(), label: "Position", type: "Text", x: 400, y: 50 },
      { id: crypto.randomUUID(), label: "Start Date", type: "Date", x: 50, y: 120 },
      { id: crypto.randomUUID(), label: "Salary", type: "Text", x: 400, y: 120 },
      { id: crypto.randomUUID(), label: "Employee Signature", type: "Signature", x: 50, y: 190 },
      { id: crypto.randomUUID(), label: "Manager Signature", type: "Signature", x: 400, y: 190 },
    ]
  },
  {
    id: crypto.randomUUID(),
    name: "Service Agreement",
    fields: [
      { id: crypto.randomUUID(), label: "Client Name", type: "Text", x: 50, y: 50 },
      { id: crypto.randomUUID(), label: "Service Description", type: "Text", x: 50, y: 120 },
      { id: crypto.randomUUID(), label: "Contract Value", type: "Text", x: 400, y: 50 },
      { id: crypto.randomUUID(), label: "Start Date", type: "Date", x: 400, y: 120 },
      { id: crypto.randomUUID(), label: "Terms Accepted", type: "Checkbox", x: 50, y: 190 },
      { id: crypto.randomUUID(), label: "Client Signature", type: "Signature", x: 400, y: 190 },
    ]
  },
  {
    id: crypto.randomUUID(),
    name: "NDA Agreement",
    fields: [
      { id: crypto.randomUUID(), label: "Party A", type: "Text", x: 50, y: 50 },
      { id: crypto.randomUUID(), label: "Party B", type: "Text", x: 400, y: 50 },
      { id: crypto.randomUUID(), label: "Effective Date", type: "Date", x: 50, y: 120 },
      { id: crypto.randomUUID(), label: "Confidential Information", type: "Text", x: 50, y: 190 },
      { id: crypto.randomUUID(), label: "Party A Signature", type: "Signature", x: 50, y: 260 },
      { id: crypto.randomUUID(), label: "Party B Signature", type: "Signature", x: 400, y: 260 },
    ]
  }
];

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

  function loadSampleData() {
    // Clear existing blueprints first, then add sample data
    setBlueprints([...sampleBlueprints]);
    alert("Sample blueprints loaded! You can now create contracts from these templates.");
  }

  function clearAllData() {
    if (confirm("Are you sure you want to clear all blueprints and contracts? This action cannot be undone.")) {
      setBlueprints([]);
      // Also clear contracts from localStorage
      localStorage.removeItem('contracts');
      localStorage.removeItem('activeContractId');
      alert("All data cleared!");
    }
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
          <div className="create-blueprint-section">
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
          <div className="sample-data-section">
            <button onClick={loadSampleData} className="secondary-btn">Load Sample Data</button>
            <button onClick={clearAllData} className="clear-btn">Clear All Data</button>
          </div>
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