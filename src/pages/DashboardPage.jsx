import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
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
    placeholder: field.label,
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
  const [statusFilter, setStatusFilter] = useState("all");

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

  const getFilteredContracts = () => {
    switch (statusFilter) {
      case 'active':
        return contracts.filter(c => ['CREATED', 'APPROVED'].includes(c.status));
      case 'pending':
        return contracts.filter(c => c.status === 'SENT');
      case 'signed':
        return contracts.filter(c => ['SIGNED', 'LOCKED'].includes(c.status));
      default:
        return contracts;
    }
  };

  const filteredContracts = getFilteredContracts();

  return (
    <div className="dashboard-page">
      <Header />
      <div className="page-content">
        <h1 className="main-title">Contracts Dashboard</h1>

      <Link to="/" className="link">Create Blueprint</Link>

      {/* ---------- CONTRACT DASHBOARD ---------- */}
      <section>
        <div className="dashboard-header">
          <h2 className="section-title">Contracts</h2>
          <span className="count-badge">
            {filteredContracts.length} Contracts
          </span>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${statusFilter === 'signed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('signed')}
          >
            Signed
          </button>
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
          {filteredContracts.length === 0 ? (
            <div className="empty-state">
              📄 No contracts found for the selected filter.
            </div>
          ) : (
            <table className="contracts-table">
              <thead>
                <tr>
                  <th>Contract Name</th>
                  <th>Blueprint Name</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.blueprintName}</td>
                    <td>
                      <span className={`status-pill status-${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>{c.createdAt}</td>
                    <td className="actions-cell">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

            <div className="contract-canvas">
              {activeBlueprint.fields.map((f, index) => {
                // Calculate position with better spacing to avoid overlaps
                const defaultX = 50 + (index % 2) * 400; // Alternate left/right
                const defaultY = 50 + Math.floor(index / 2) * 80; // Stack vertically
                const x = f.x !== undefined ? f.x : defaultX;
                const y = f.y !== undefined ? f.y : defaultY;
                
                return (
                  <div
                    key={f.id}
                    className="field-container"
                    style={{ left: x, top: y }}
                  >
                    <label className="field-label">{f.label}:</label>
                    {renderInput(f, activeContract, updateFieldValue)}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      </div>
    </div>
  );
}