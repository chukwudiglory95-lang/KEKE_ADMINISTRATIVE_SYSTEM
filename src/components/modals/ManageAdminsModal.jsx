import { useState } from "react";
import { FaUserShield, FaTrash, FaUserPlus, FaBan, FaCheckCircle } from "react-icons/fa";
import Modal from "./Modal";
import Avatar from "../common/Avatar";

const INITIAL_ADMINS = [
  { id: "adm-1", name: "Grace Obi", email: "grace@kera-abuja.org", role: "Admin", status: "Active" },
  { id: "adm-2", name: "Tunde Bello", email: "tunde@kera-abuja.org", role: "Admin", status: "Active" },
  { id: "adm-3", name: "Hauwa Sani", email: "hauwa@kera-abuja.org", role: "Admin", status: "Suspended" },
];

export default function ManageAdminsModal({ onClose }) {
  const [admins, setAdmins] = useState(INITIAL_ADMINS);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });

  const toggleStatus = (id) => {
    // TODO: await api.put(`/admins/${id}`, { status })
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "Active" ? "Suspended" : "Active" } : a
      )
    );
  };

  const removeAdmin = (id) => {
    // TODO: await api.delete(`/admins/${id}`)
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const addAdmin = (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email) return;
    // TODO: await api.post("/admins", newAdmin) — normally this would
    // send an invite email rather than creating an account directly.
    setAdmins((prev) => [
      { id: `adm-${Date.now()}`, name: newAdmin.name, email: newAdmin.email, role: "Admin", status: "Active" },
      ...prev,
    ]);
    setNewAdmin({ name: "", email: "" });
  };

  return (
    <Modal title="Manage Admin Accounts" onClose={onClose} size="lg">
      <div className="admin-list">
        {admins.map((a) => (
          <div key={a.id} className="admin-row">
            <Avatar name={a.name} size={34} />
            <div className="admin-row-info">
              <strong>{a.name}</strong>
              <small>{a.email}</small>
            </div>
            <span className={`badge ${a.status === "Active" ? "badge-green" : "badge-red"}`}>
              {a.status}
            </span>
            <button
              className="btn-outline"
              onClick={() => toggleStatus(a.id)}
              title={a.status === "Active" ? "Suspend" : "Activate"}
            >
              {a.status === "Active" ? <FaBan /> : <FaCheckCircle />}
            </button>
            <button
              className="btn-outline admin-remove"
              onClick={() => removeAdmin(a.id)}
              title="Remove account"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        {admins.length === 0 && (
          <p style={{ textAlign: "center", color: "#9aa0b4", fontSize: 13 }}>No admin accounts yet.</p>
        )}
      </div>

      <p className="form-section-title" style={{ marginTop: 20 }}>
        <FaUserShield style={{ marginRight: 6 }} /> Add New Admin
      </p>
      <form className="form-grid" onSubmit={addAdmin}>
        <div className="form-field">
          <label>Full Name</label>
          <input
            type="text"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. Peter Eze"
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin((p) => ({ ...p, email: e.target.value }))}
            placeholder="peter@kera-abuja.org"
          />
        </div>
        <div className="form-field span-2">
          <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            <FaUserPlus /> Send Invite
          </button>
        </div>
      </form>
    </Modal>
  );
}