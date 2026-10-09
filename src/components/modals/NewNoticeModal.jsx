import { useState } from "react";
import Modal from "./Modal";

const TAGS = [
  "Meeting Notice",
  "Strike Notice",
  "Route Change",
  "Permit Deadline",
  "Public Holiday",
  "Safety Information",
];

export default function NewNoticeModal({ onClose, onSave }) {
  const [tag, setTag] = useState(TAGS[0]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !detail.trim()) {
      setError("Title and details are required.");
      return;
    }

    // TODO: await api.post("/notices", {...})
    onSave({
      tag,
      title,
      detail,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });
    onClose();
  };

  return (
    <Modal
      title="New Notice"
      onClose={onClose}
      size="md"
      footer={
        <>
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" form="new-notice-form" className="btn-primary">Publish Notice</button>
        </>
      }
    >
      <form id="new-notice-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-field" style={{ marginBottom: 14 }}>
          <label>Category</label>
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            {TAGS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="form-field" style={{ marginBottom: 14 }}>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Union Meeting Notice" />
        </div>

        <div className="form-field">
          <label>Details</label>
          <textarea rows={4} value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Full notice text..." />
        </div>
      </form>
    </Modal>
  );
}