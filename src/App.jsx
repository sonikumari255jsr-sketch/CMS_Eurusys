import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlueprintPage from "./BlueprintPage";
import LabelPage from "./LabelPage";
import DashboardPage from "./DashboardPage";

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

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBlueprints = localStorage.getItem('blueprints');
    const savedContracts = localStorage.getItem('contracts');
    const savedActiveContractId = localStorage.getItem('activeContractId');

    if (savedBlueprints) {
      setBlueprints(JSON.parse(savedBlueprints));
    }
    if (savedContracts) {
      setContracts(JSON.parse(savedContracts));
    }
    if (savedActiveContractId) {
      setActiveContractId(savedActiveContractId);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('blueprints', JSON.stringify(blueprints));
  }, [blueprints]);

  useEffect(() => {
    localStorage.setItem('contracts', JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    if (activeContractId) {
      localStorage.setItem('activeContractId', activeContractId);
    } else {
      localStorage.removeItem('activeContractId');
    }
  }, [activeContractId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BlueprintPage
              blueprints={blueprints}
              setBlueprints={setBlueprints}
            />
          }
        />
        <Route
          path="/add-label/:blueprintId"
          element={
            <LabelPage
              blueprints={blueprints}
              setBlueprints={setBlueprints}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              blueprints={blueprints}
              contracts={contracts}
              setContracts={setContracts}
              activeContractId={activeContractId}
              setActiveContractId={setActiveContractId}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
