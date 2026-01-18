import { Link } from "react-router-dom";
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-text">
              <span className="logo-main">Eurosys</span>
              <span className="logo-sub">Dubai</span>
            </div>
          </div>
          <div className="logo-tagline">
            Contract Management Platform
          </div>
        </div>
        <nav className="main-nav">
          <Link to="/" className="nav-item">Blueprints</Link>
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}