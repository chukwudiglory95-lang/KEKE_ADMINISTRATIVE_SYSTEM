import {
  FaUserPlus,
  FaMoneyBillWave,
  FaTaxi,
  FaExclamationCircle,
  FaSignInAlt,
  FaTrash,
} from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";

const ACTIVITIES = [
  { icon: FaUserPlus, color: "#3b82f6", text: "New member registered - Adeola Adebayo", admin: "Admin: Grace Obi", time: "2 hours ago" },
  { icon: FaMoneyBillWave, color: "#f5a623", text: "Payment received - ₦25,000 from Chinedu Okafor", admin: "Admin: Grace Obi", time: "4 hours ago" },
  { icon: FaTaxi, color: "#22c55e", text: "Keke updated - Keke No. 0234", admin: "Admin: Tunde Bello", time: "6 hours ago" },
  { icon: FaExclamationCircle, color: "#dc2626", text: "Complaint CMP-0089 logged by Musa Abdullahi", admin: "Admin: Tunde Bello", time: "9 hours ago" },
  { icon: FaSignInAlt, color: "#7c3aed", text: "Super Admin logged in", admin: "Super Admin", time: "Yesterday, 8:02 AM" },
  { icon: FaTrash, color: "#9aa0b4", text: "Rider record deleted - Bello Musa (duplicate entry)", admin: "Admin: Grace Obi", time: "Yesterday, 3:41 PM" },
];

export default function ActivityLog() {
  return (
    <>
      <PageHeader
        title="Activity Log"
        subtitle="Full audit trail of registrations, payments, edits, and logins"
      />

      <div className="card">
        <ul className="activity-list">
          {ACTIVITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <li key={i} style={{ alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: `${a.color}1f`,
                    color: a.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 12,
                  }}
                >
                  <Icon />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {a.text}
                  <small style={{ color: "#b0b5c6" }}>{a.admin}</small>
                </span>
                <small>{a.time}</small>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}