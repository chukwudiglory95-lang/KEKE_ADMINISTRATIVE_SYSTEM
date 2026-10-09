import { useState } from "react";
import { FaComment, FaSms, FaEnvelope } from "react-icons/fa";
import Modal from "./Modal";

const CHANNELS = [
  { id: "in-app", label: "In-App", icon: FaComment, ready: true },
  { id: "sms", label: "SMS", icon: FaSms, ready: false },
  { id: "email", label: "Email", icon: FaEnvelope, ready: false },
];

export default function ComposeMessageModal({ admins = [], onClose, onSend }) {
  const [channel, setChannel] = useState("in-app");
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const toggleRecipient = (id) => {
    setRecipients((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setRecipients(recipients.length === admins.length ? [] : admins.map((a) => a.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (recipients.length === 0) {
      setError("Select at least one recipient.");
      return;
    }
    if (!body.trim()) {
      setError("Message body cannot be empty.");
      return;
    }

    const names = admins
      .filter((a) => recipients.includes(a.id))
      .map((a) => a.name);

    // TODO: wire to a real backend, e.g.
    //   in-app → await api.post("/messages", {...})
    //   sms    → your SMS gateway (Termii, Twilio, etc.)
    //   email  → your transactional email provider
    onSend({
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      channel,
      to: names,
      subject: subject || "(No subject)",
      body,
      sentAt: "Just now",
      status: channel === "in-app" ? "Delivered" : "Queued",
    });
    onClose();
  };

  const activeChannel = CHANNELS.find((c) => c.id === channel);

  return (
    <Modal
      title="New Message"
      onClose={onClose}
      size="md"
      footer={
        <>
          <button type="button" className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="compose-message-form" className="btn-primary">
            Send Message
          </button>
        </>
      }
    >
      <form id="compose-message-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-field" style={{ marginBottom: 16 }}>
          <label>Send via</label>
          <div className="channel-picker">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  type="button"
                  key={c.id}
                  className={`channel-option${channel === c.id ? " selected" : ""}`}
                  onClick={() => setChannel(c.id)}
                >
                  <Icon />
                  {c.label}
                </button>
              );
            })}
          </div>
          {!activeChannel.ready && (
            <small className="channel-note">
              {activeChannel.label} delivery needs a backend gateway — messages
              will be queued until one is connected.
            </small>
          )}
        </div>

        <div className="form-field" style={{ marginBottom: 16 }}>
          <div className="recipients-header">
            <label>Recipients</label>
            <button type="button" className="select-all-btn" onClick={selectAll}>
              {recipients.length === admins.length ? "Clear all" : "Select all"}
            </button>
          </div>
          <div className="recipient-list">
            {admins.map((a) => (
              <label key={a.id} className="recipient-option">
                <input
                  type="checkbox"
                  checked={recipients.includes(a.id)}
                  onChange={() => toggleRecipient(a.id)}
                />
                <span>
                  {a.name}
                  <small>
                    {channel === "sms" ? a.phone : channel === "email" ? a.email : a.role}
                  </small>
                </span>
              </label>
            ))}
          </div>
        </div>

        {channel !== "sms" && (
          <div className="form-field" style={{ marginBottom: 16 }}>
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Monthly dues collection update"
            />
          </div>
        )}

        <div className="form-field">
          <label>
            Message
            {channel === "sms" && (
              <span className="optional"> · {body.length}/160 characters</span>
            )}
          </label>
          <textarea
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={channel === "sms" ? 160 : undefined}
            placeholder="Type your message..."
          />
        </div>
      </form>
    </Modal>
  );
}