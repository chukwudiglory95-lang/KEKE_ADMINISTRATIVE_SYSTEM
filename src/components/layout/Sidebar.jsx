import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";
import Avatar from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";
import {
  FaHome,
  FaUsers,
  FaTaxi,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaCalendarAlt,
  FaChartLine,
  FaBullhorn,
  FaEnvelope,
  FaPhoneAlt,
  FaCog,
} from "react-icons/fa";

import "../../styles/sidebar.css";

const MENU_ITEMS = [
  { to: "/", label: "Dashboard", icon: FaHome, end: true },
  { to: "/members", label: "Members", icon: FaUsers },
  { to: "/kekes", label: "Kekes", icon: FaTaxi },
  { to: "/payments", label: "Payments", icon: FaMoneyBillWave },
  { to: "/complaints", label: "Complaints", icon: FaExclamationCircle },
  { to: "/meetings", label: "Meetings", icon: FaCalendarAlt },
  { to: "/reports", label: "Reports", icon: FaChartLine },
  { to: "/notices", label: "Notices", icon: FaBullhorn },
  { to: "/messages", label: "Messages", icon: FaEnvelope },
  { to: "/emergency", label: "Emergency", icon: FaPhoneAlt },
  { to: "/settings", label: "Settings", icon: FaCog },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div>
        <div className="logo-area">
          <Logo size={92} />
          <p className="sidebar-motto">"Unity, Discipline, Progress"</p>
          <p className="sidebar-slogan">Moving Abuja, Together.</p>
        </div>

        <nav className="menu">
          {MENU_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `menu-item${isActive ? " active" : ""}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="admin-box">
        <Avatar name={user?.email || "Super Admin"} size={40} />
        <div>
          <h3>Super Admin</h3>
          <p>KERA</p>
          <span className="online">Online</span>
        </div>
      </div>
    </aside>
  );
}