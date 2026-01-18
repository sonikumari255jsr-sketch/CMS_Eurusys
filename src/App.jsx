import { useState } from "react";

/* ================== CONSTANTS ================== */
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

const FIELD_TYPES = ["Text", "Date", "Checkbox", "Signature"];

/* ================== APP ================== */
export default function App() {
  const [blueprints, setBlueprints] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [activeContractId, setActiveContractId] = useState(null);

  const [newBlueprintName, setNewBlueprintName] = useState("");
  const [selectedBlueprintId, setSelectedBlueprintId] = useState("");
  const [newContractName, setNewContractName] = useState("");

  /* ---------- Blueprint ---------- */
  function createBlueprint() {
    if (!newBlueprintName.trim()) return alert("Enter blueprint name");

    setBlueprints((p) => [
      { id: crypto.randomUUID(), name: newBlueprintName, fields: [] },
      ...p,
    ]);

    setNewBlueprintName("");
  }

  function addField(blueprintId, field) {
    setBlueprints((prev) =>
      prev.map((bp) =>
        bp.id === blueprintId
          ? { ...bp, fields: [...bp.fields, field] }
          : bp
      )
    );
  }

  /* ---------- Contract ---------- */
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
    <div style={styles.app}>
      <h1 style={styles.mainTitle}>Contract  Management Portal</h1>

      {/* ---------- BLUEPRINTS ---------- */}
      <section>
        <h2 style={styles.sectionTitle}>Blueprint Builder</h2>

        <div style={styles.panel}>
          <input
            placeholder="Blueprint name"
            value={newBlueprintName}
            onChange={(e) => setNewBlueprintName(e.target.value)}
            style={styles.input}
          />
          <button onClick={createBlueprint} style={styles.primaryBtn}>
            Create Blueprint
          </button>
        </div>

        <div style={styles.grid}>
          {blueprints.map((bp) => (
            <BlueprintCard
              key={bp.id}
              blueprint={bp}
              onAddField={addField}
            />
          ))}
        </div>
      </section>

      {/* ---------- CONTRACT DASHBOARD ---------- */}
      <section>
        <div style={styles.dashboardHeader}>
          <h2 style={styles.sectionTitle}>Contracts Dashboard</h2>
          <span style={styles.countBadge}>
            {contracts.length} Contracts
          </span>
        </div>

        <div style={styles.panel}>
          <select
            value={selectedBlueprintId}
            onChange={(e) => setSelectedBlueprintId(e.target.value)}
            style={styles.input}
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
            style={styles.input}
          />

          <button onClick={createContract} style={styles.primaryBtn}>
            + Create Contract
          </button>
        </div>

        <div style={styles.dashboardCard}>
          {contracts.length === 0 && (
            <div style={styles.emptyState}>
              📄 No contracts yet. Create your first contract.
            </div>
          )}

          {contracts.map((c) => (
            <div key={c.id} style={styles.contractRow}>
              <div style={{ flex: 2 }}>
                <div style={styles.contractName}>{c.name}</div>
                <div style={styles.contractSub}>
                  {c.blueprintName}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <span style={styles.statusPill(c.status)}>
                  {c.status}
                </span>
              </div>

              <div style={styles.contractActions}>
                <button
                  style={styles.openBtn}
                  onClick={() => setActiveContractId(c.id)}
                >
                  Open
                </button>

                {STATUS_FLOW[c.status].map((s) => (
                  <button
                    key={s}
                    style={styles.actionBtn}
                    onClick={() => updateStatus(c.id, s)}
                  >
                    {s}
                  </button>
                ))}

                <button
                  style={styles.deleteBtn}
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
          <h2 style={styles.sectionTitle}>Contract Details</h2>

          <div style={styles.editorCard}>
            <div style={styles.editorHeader}>
              <div>
                <h3>Contract Name: {activeContract.name}</h3>
                <h5>Status: {activeContract.status}
                </h5>
              </div>
              
            </div>

            <div style={styles.statusRow}>
              {STATUS_ORDER.map((s, i) => {
                const current = STATUS_ORDER.indexOf(
                  activeContract.status
                );
                return (
                  <div
                    key={s}
                    style={{
                      ...styles.statusBox,
                      background: i <= current ? "#c7a27c" : "#eee",
                      color: i <= current ? "#fff" : "#777",
                    }}
                  >
                    {i <= current ? "✔ " : ""}
                    {s}
                  </div>
                );
              })}
            </div>

            <table style={styles.table}>
              
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

/* ================== BLUEPRINT CARD ================== */
function BlueprintCard({ blueprint, onAddField }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState(FIELD_TYPES[0]);

  function add() {
    if (!label.trim()) return alert("Enter field label");

    onAddField(blueprint.id, {
      id: crypto.randomUUID(),
      label,
      type,
    });

    setLabel("");
  }

  return (
    <div style={styles.card}>
      <h3>{blueprint.name}</h3>

      <div style={styles.inline}>
        <input
          placeholder="Field label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={styles.input}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
        >
          {FIELD_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <button onClick={add} style={styles.smallBtn}>
          Add
        </button>
      </div>

      {blueprint.fields.map((f) => (
        <div key={f.id} style={styles.fieldRow}>
          • {f.label} ({f.type})
        </div>
      ))}
    </div>
  );
}

/* ================== FIELD RENDER ================== */
function renderInput(field, contract, onChange) {
  const locked = contract.status !== CONTRACT_STATUS.CREATED;

  const common = {
    disabled: locked,
    style: {
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #ddd",
      background: locked ? "#f3f3f3" : "#fff",
    },
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

/* ================== STYLES ================== */
const styles = {
  app: {
    fontFamily: "Inter, system-ui, sans-serif",
    background: "#f6f4f1",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: "30px 40px",
    boxSizing: "border-box",
  },

  mainTitle: {
    fontSize: 34,
    marginBottom: 30,
    fontWeight: 700,
  },

  sectionTitle: {
    marginTop: 40,
    marginBottom: 16,
    fontSize: 22,
    fontWeight: 600,
  },

  panel: {
    background: "#fff",
    padding: 18,
    borderRadius: 16,
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 20,
    width: "100%",
    boxSizing: "border-box",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 18,
    width: "100%",
  },

  card: {
    background: "#fff",
    padding: 18,
    borderRadius: 18,
    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
    width: "100%",
    boxSizing: "border-box",
  },

  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  countBadge: {
    background: "#efe7da",
    padding: "6px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
  },

  dashboardCard: {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 16px 36px rgba(0,0,0,0.08)",
    overflow: "hidden",
    width: "100%",
  },

  contractRow: {
    display: "flex",
    alignItems: "center",
    padding: "16px 22px",
    borderBottom: "1px solid #f0f0f0",
    gap: 14,
    width: "100%",
    boxSizing: "border-box",
  },

  contractName: {
    fontWeight: 600,
    fontSize: 16,
  },

  contractSub: {
    fontSize: 13,
    opacity: 0.6,
  },

  contractActions: {
    flex: 3,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  statusPill: (s) => ({
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    background:
      s === "LOCKED"
        ? "#dcfce7"
        : s === "REVOKED"
        ? "#fee2e2"
        : s === "SIGNED"
        ? "#e0f2fe"
        : "#f1e7dc",
  }),

  openBtn: {
    background: "#c7a27c",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 12,
    cursor: "pointer",
  },

  actionBtn: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "7px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#fff",
    border: "1px solid #f3c1c1",
    color: "#c0392b",
    padding: "7px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },

  emptyState: {
    padding: 50,
    textAlign: "center",
    opacity: 0.55,
    fontSize: 15,
  },

  editorCard: {
    background: "#fff",
    padding: 28,
    borderRadius: 24,
    boxShadow: "0 20px 44px rgba(0,0,0,0.12)",
    width: "100%",
    boxSizing: "border-box",
  },

  editorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  bigStatus: {
    background: "#c7a27c",
    color: "#fff",
    padding: "7px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
  },

  statusRow: {
    display: "flex",
    gap: 10,
    margin: "18px 0",
    flexWrap: "wrap",
  },

  statusBox: {
    padding: "8px 14px",
    borderRadius: 20,
    fontSize: 12,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    minWidth: 160,
  },

  inline: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },

  smallBtn: {
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  fieldRow: {
    fontSize: 13,
    opacity: 0.8,
    marginTop: 4,
  },
};
