import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">Eventdesk</span>
        <nav className="tabs">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "tab active" : "tab")}>
            Dashboard
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
            Add Event
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
