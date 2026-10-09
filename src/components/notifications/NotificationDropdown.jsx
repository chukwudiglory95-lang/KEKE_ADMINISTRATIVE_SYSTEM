import { useState } from "react";
import {
  FaBell,
  FaUserPlus,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaBullhorn,
  FaPhoneAlt,
} from "react-icons/fa";
import "./notificationDropdown.css";

// Matches the spec's Notification System triggers: new member registered,
// payment received, permit expires, complaint submitted, announcement
// posted, emergency alert issued.
const INITIAL_NOTIFICATIONS = [
  { id: 1, icon: FaUserPlus, color: "#3b82f6", text: "New member registered - Adeola Adebayo", time: "2 hours ago", read: false },
  { id: 2, icon: FaMoneyBillWave, color: "#f5a623", text: "Payment received - ₦25,000 from Chinedu Okafor", time: "4 hours ago", read: false },
  { id: 3, icon: FaExclamationCircle, color: "#dc2626", text: "Permit expiring soon - Keke No. 0301", time: "6 hours ago", read: false },
  { id: 4, icon: FaBullhorn, color: "#7c3aed", text: "New announcement posted: Union Meeting Notice", time: "Yesterday", read: true },
  { id: 5, icon: FaPhoneAlt, color: "#16a34a", text: "Emergency alert issued for Kubwa route", time: "2 days ago", read: true },
];

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="notif-wrap">
      <button
        className="icon-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
      >
        <FaBell />
        {unreadCount > 0 && <span className="notification-dot" />}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-header">
            <h4>Notifications</h4>
            {unreadCount > 0 && (
              <button className="notif-mark-read" onClick={markAllRead}>
                Mark all as read
              </button>
            )}
          </div>

          <ul className="notif-list">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <li key={n.id} className={n.read ? "" : "unread"}>
                  <span
                    className="notif-icon"
                    style={{ background: `${n.color}1f`, color: n.color }}
                  >
                    <Icon />
                  </span>
                  <div className="notif-text">
                    <p>{n.text}</p>
                    <small>{n.time}</small>
                  </div>
                  {!n.read && <span className="notif-unread-dot" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}