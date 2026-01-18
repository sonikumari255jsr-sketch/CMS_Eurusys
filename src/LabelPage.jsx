import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import './LabelPage.css';

const FIELD_TYPES = ["Text", "Date", "Checkbox", "Signature"];

export default function LabelPage({ blueprints, setBlueprints }) {
  const { blueprintId } = useParams();
  const blueprint = blueprints.find((b) => b.id === blueprintId);

  const [newField, setNewField] = useState({ label: "", type: "Text" });

  if (!blueprint) return <div>Blueprint not found</div>;

  function addField() {
    if (!newField.label.trim()) return alert("Enter field label");

    const field = {
      id: crypto.randomUUID(),
      label: newField.label,
      type: newField.type,
    };

    setBlueprints((prev) =>
      prev.map((bp) =>
        bp.id === blueprintId
          ? { ...bp, fields: [...bp.fields, field] }
          : bp
      )
    );

    setNewField({ label: "", type: "Text" });
    alert("Field added!");
  }

  return (
    <div className="label-page">
      <h1>Add Labels to {blueprint.name}</h1>

      <div className="panel">
        <input
          type="text"
          placeholder="Field Label"
          value={newField.label}
          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          className="input"
        />
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
        <button onClick={addField} className="primary-btn">Add Field</button>
      </div>

      <h2>Existing Fields</h2>
      <ul>
        {blueprint.fields.map((field) => (
          <li key={field.id}>
            {field.label} ({field.type})
          </li>
        ))}
      </ul>

      <div className="nav-links">
        <Link to="/" className="link">Back to Blueprints</Link>
        <Link to="/dashboard" className="link">Go to Contracts Dashboard</Link>
      </div>
    </div>
  );
}