import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaCog,
  FaUser,
  FaSearch,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import NotificationDropdown from "../notifications/NotificationDropdown";
import Avatar from "../common/Avatar";

import "../../styles/navbar.css";

export default function Navbar({ onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <button
          className="hamburger-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>

        <div className="navbar-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search members, payments, kekes..."
          />
        </div>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <NotificationDropdown />

        <Link to="/settings" className="icon-btn" aria-label="Settings">
          <FaCog />
        </Link>

        <div className="profile-wrap">
          <button className="profile" onClick={() => setMenuOpen((v) => !v)}>
            <Avatar name={user?.email || "Super Admin"} size={32} />
            <div>
              <h4>{user?.email || "Super Admin"}</h4>
              <small>KERA</small>
            </div>
            <FaChevronDown className="profile-caret" />
          </button>

          {menuOpen && (
            <div className="profile-menu">
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="profile-menu-link">
                <FaUser /> View Profile
              </Link>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}