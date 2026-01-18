import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import './LabelPage.css';

const FIELD_TYPES = ["Text", "Date", "Signature", "Checkbox"];

export default function LabelPage({ blueprints, setBlueprints }) {
  const { blueprintId } = useParams();
  const blueprint = blueprints.find((b) => b.id === blueprintId);

  const [newField, setNewField] = useState({ label: "", type: "Text", x: 50, y: 50 });

  if (!blueprint) return <div>Blueprint not found</div>;

  function addField() {
    if (!newField.label.trim()) return alert("Enter field label");

    const field = {
      id: crypto.randomUUID(),
      label: newField.label,
      type: newField.type,
      x: newField.x,
      y: newField.y,
    };

    setBlueprints((prev) =>
      prev.map((bp) =>
        bp.id === blueprintId
          ? { ...bp, fields: [...bp.fields, field] }
          : bp
      )
    );

    setNewField({ label: "", type: "Text", x: 50, y: 50 });
    alert("Field added!");
  }

  return (
    <div className="label-page">
      <Header />
      <div className="page-content">
        <h1>Add Labels to {blueprint.name}</h1>

        <div className="panel">
          <div className="input-group">
            <label>Field Label:</label>
            <input
              type="text"
              placeholder="Enter field label"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              className="input"
            />
          </div>
          <div className="input-group">
            <label>Field Type:</label>
            <select
              value={newField.type}
              onChange={(e) => setNewField({ ...newField, type: e.target.value })}
              className="input"
            >
              {FIELD_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>X Position:</label>
            <input
              type="number"
              placeholder="0"
              value={newField.x}
              onChange={(e) => setNewField({ ...newField, x: parseInt(e.target.value) || 0 })}
              className="input"
            />
          </div>
          <div className="input-group">
            <label>Y Position:</label>
            <input
              type="number"
              placeholder="0"
              value={newField.y}
              onChange={(e) => setNewField({ ...newField, y: parseInt(e.target.value) || 0 })}
              className="input"
            />
          </div>
          <button onClick={addField} className="primary-btn">Add Field</button>
        </div>

        <h2>Existing Fields</h2>
        <ul>
          {blueprint.fields.map((field) => (
            <li key={field.id}>
              {field.label} ({field.type}) - Position: {field.x}, {field.y}
            </li>
          ))}
        </ul>

        <div className="nav-links">
          <Link to="/" className="link">Back to Blueprints</Link>
          <Link to="/dashboard" className="link">Go to Contracts Dashboard</Link>
        </div>
      </div>
    </div>
  );
}