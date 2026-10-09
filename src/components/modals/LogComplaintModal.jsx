import { useState } from "react";
import Modal from "./Modal";

const CATEGORIES = [
  "Route Dispute",
  "Fare Dispute",
  "Vehicle Damage",
  "Union Conduct",
  "Permit Delay",
  "Other",
];

export default function LogComplaintModal({ onClose, onSave }) {
  const [member, setMember] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!member.trim()) {
      setError("Member name is required.");
      return;
    }

    // TODO: await api.post("/complaints", {...})
    onSave({
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      member,
      category,
      description,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Open",
    });
    onClose();
  };

  return (
    <Modal
      title="Log Complaint"
      onClose={onClose}
      size="md"
      footer={
        <>
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" form="log-complaint-form" className="btn-primary">Log Complaint</button>
        </>
      }
    >
      <form id="log-complaint-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-grid" style={{ marginBottom: 14 }}>
          <div className="form-field">
            <label>Member</label>
            <input type="text" value={member} onChange={(e) => setMember(e.target.value)} placeholder="e.g. Musa Abdullahi" />
          </div>
          <div className="form-field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label>Description</label>
          <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the complaint..." />
        </div>
      </form>
    </Modal>
  );
}