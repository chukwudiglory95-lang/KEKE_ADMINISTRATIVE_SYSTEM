import { useState } from "react";
import Modal from "./Modal";

export default function ScheduleMeetingModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !date || !time || !location.trim()) {
      setError("All fields are required.");
      return;
    }

    const d = new Date(date);
    // TODO: await api.post("/meetings", {...})
    onSave({
      day: String(d.getDate()).padStart(2, "0"),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      title,
      detail: `${time} • ${location}`,
    });
    onClose();
  };

  return (
    <Modal
      title="Schedule Meeting"
      onClose={onClose}
      size="md"
      footer={
        <>
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" form="schedule-meeting-form" className="btn-primary">Schedule Meeting</button>
        </>
      }
    >
      <form id="schedule-meeting-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-field" style={{ marginBottom: 14 }}>
          <label>Meeting Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. General Union Meeting" />
        </div>

        <div className="form-grid" style={{ marginBottom: 14 }}>
          <div className="form-field">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Union Hall, Wuse" />
        </div>
      </form>
    </Modal>
  );
}