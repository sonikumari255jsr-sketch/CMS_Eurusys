import { useState } from "react";
import { Link } from "react-router-dom";
import './DashboardPage.css';

const CONTRACT_STATUS = {
  CREATED: "CREATED",
  APPROVED: "APPROVED",
  SENT: "SENT",
  SIGNED: "SIGNED",
  LOCKED: "LOCKED",
  REVOKED: "REVOKED",
};

const STATUS_ORDER = [
  "CREATED",
  "APPROVED",
  "SENT",
  "SIGNED",
  "LOCKED",
  "REVOKED",
];

const STATUS_FLOW = {
  CREATED: ["APPROVED", "REVOKED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED", "REVOKED"],
  SIGNED: ["LOCKED"],
  LOCKED: [],
  REVOKED: [],
};

function renderInput(field, contract, onChange) {
  const locked = contract.status !== CONTRACT_STATUS.CREATED;

  const common = {
    disabled: locked,
    className: locked ? "input disabled" : "input",
  };

  switch (field.type) {
    case "Text":
    case "Signature":
      return (
        <input
          {...common}
          value={contract.fieldValues[field.id] || ""}
          onChange={(e) =>
            onChange(contract.id, field.id, e.target.value)
          }
        />
      );
    case "Date":
      return (
        <input
          {...common}
          type="date"
          value={contract.fieldValues[field.id] || ""}
          onChange={(e) =>
            onChange(contract.id, field.id, e.target.value)
          }
        />
      );
    case "Checkbox":
      return (
        <input
          type="checkbox"
          disabled={locked}
          checked={contract.fieldValues[field.id] || false}
          onChange={(e) =>
            onChange(contract.id, field.id, e.target.checked)
          }
        />
      );
    default:
      return null;
  }
}

export default function DashboardPage({
  blueprints,
  contracts,
  setContracts,
  activeContractId,
  setActiveContractId,
}) {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState("");
  const [newContractName, setNewContractName] = useState("");

  function createContract() {
    if (!selectedBlueprintId) return alert("Select blueprint");
    if (!newContractName.trim()) return alert("Enter contract name");

    const blueprint = blueprints.find((b) => b.id === selectedBlueprintId);

    const newContract = {
      id: crypto.randomUUID(),
      name: newContractName,
      blueprintId: blueprint.id,
      blueprintName: blueprint.name,
      status: CONTRACT_STATUS.CREATED,
      createdAt: new Date().toLocaleString(),
      fieldValues: blueprint.fields.reduce((acc, f) => {
        acc[f.id] = f.type === "Checkbox" ? false : "";
        return acc;
      }, {}),
    };

    setContracts((p) => [newContract, ...p]);
    setNewContractName("");
    alert(`✅ Contract created: ${newContract.name}`);
  }

  function updateStatus(contractId, newStatus) {
    setContracts((prev) =>
      prev.map((c) =>
        c.id !== contractId
          ? c
          : STATUS_FLOW[c.status].includes(newStatus)
          ? { ...c, status: newStatus }
          : c
      )
    );
  }

  function deleteContract(contractId) {
    if (!window.confirm("Delete this contract?")) return;
    setContracts((p) => p.filter((c) => c.id !== contractId));
    if (activeContractId === contractId) setActiveContractId(null);
  }

  function updateFieldValue(contractId, fieldId, value) {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? { ...c, fieldValues: { ...c.fieldValues, [fieldId]: value } }
          : c
      )
    );
  }

  const activeContract = contracts.find((c) => c.id === activeContractId);
  const activeBlueprint = blueprints.find(
    (b) => b.id === activeContract?.blueprintId
  );

  return (
    <div className="dashboard-page">
      <h1 className="main-title">Contracts Dashboard</h1>

      <Link to="/" className="link">Create Blueprint</Link>

      {/* ---------- CONTRACT DASHBOARD ---------- */}
      <section>
        <div className="dashboard-header">
          <h2 className="section-title">Contracts</h2>
          <span className="count-badge">
            {contracts.length} Contracts
          </span>
        </div>

        <div className="panel">
          <select
            value={selectedBlueprintId}
            onChange={(e) => setSelectedBlueprintId(e.target.value)}
            className="input"
          >
            <option value="">Select blueprint</option>
            {blueprints.map((bp) => (
              <option key={bp.id} value={bp.id}>
                {bp.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Contract name"
            value={newContractName}
            onChange={(e) => setNewContractName(e.target.value)}
            className="input"
          />

          <button onClick={createContract} className="primary-btn">
            + Create Contract
          </button>
        </div>

        <div className="dashboard-card">
          {contracts.length === 0 && (
            <div className="empty-state">
              📄 No contracts yet. Create your first contract.
            </div>
          )}

          {contracts.map((c) => (
            <div key={c.id} className="contract-row">
              <div className="contract-info">
                <div className="contract-name">{c.name}</div>
                <div className="contract-sub">
                  {c.blueprintName}
                </div>
              </div>

              <div>
                <span className={`status-pill status-${c.status.toLowerCase()}`}>
                  {c.status}
                </span>
              </div>

              <div className="contract-actions">
                <button
                  className="open-btn"
                  onClick={() => setActiveContractId(c.id)}
                >
                  Open
                </button>

                {STATUS_FLOW[c.status].map((s) => (
                  <button
                    key={s}
                    className="action-btn"
                    onClick={() => updateStatus(c.id, s)}
                  >
                    {s}
                  </button>
                ))}

                <button
                  className="delete-btn"
                  onClick={() => deleteContract(c.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CONTRACT EDITOR ---------- */}
      {activeContract && activeBlueprint && (
        <section>
          <h2 className="section-title">Contract Details</h2>

          <div className="editor-card">
            <div className="editor-header">
              <div>
                <h3>Contract Name: {activeContract.name}</h3>
                <h5>Status: {activeContract.status}
                </h5>
              </div>
              
            </div>

            <div className="status-row">
              {STATUS_ORDER.map((s, i) => {
                const current = STATUS_ORDER.indexOf(
                  activeContract.status
                );
                return (
                  <div
                    key={s}
                    className={`status-box ${i <= current ? 'active' : ''}`}
                  >
                    {i <= current ? "✔ " : ""}
                    {s}
                  </div>
                );
              })}
            </div>

            <table className="table">
              
              <tbody>
                {activeBlueprint.fields.map((f) => (
                  <tr key={f.id}>
                    <td>{f.label}</td>
                    <td>
                      {renderInput(
                        f,
                        activeContract,
                        updateFieldValue
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}