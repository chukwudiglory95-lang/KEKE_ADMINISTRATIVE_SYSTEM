import { useState } from "react";
import Modal from "./Modal";

const REASONS = ["Death", "Sickness", "Travel/Relocation", "Non-payment of dues", "Other"];

/**
 * <SuspendDeleteModal
 *   action="suspend" | "delete"
 *   targetType="Member" | "Keke"
 *   targetName="Adeola Adebayo"
 *   onClose={...}
 *   onConfirm={(reason, notes) => {...}}
 * />
 */
export default function SuspendDeleteModal({ action, targetType, targetName, onClose, onConfirm }) {
  const [reason, setReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState("");

  const isDelete = action === "delete";
  const title = `${isDelete ? "Delete" : "Suspend"} ${targetType}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason, notes);
    onClose();
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      size="sm"
      footer={
        <>
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button
            type="submit"
            form="suspend-delete-form"
            className={isDelete ? "btn-danger" : "btn-primary"}
          >
            {isDelete ? "Delete" : "Suspend"} {targetType}
          </button>
        </>
      }
    >
      <form id="suspend-delete-form" onSubmit={handleSubmit}>
        <p style={{ fontSize: 13, color: "#4b5170", marginTop: 0 }}>
          {isDelete ? (
            <>You're about to permanently delete <strong>{targetName}</strong>'s record. This cannot be undone.</>
          ) : (
            <>You're about to suspend <strong>{targetName}</strong>. Their status will change to "Suspended".</>
          )}
        </p>

        <div className="form-field" style={{ marginBottom: 14 }}>
          <label>Reason</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            {REASONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="form-field">
          <label>Additional Notes <span className="optional">(optional)</span></label>
          <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any extra context..." />
        </div>
      </form>
    </Modal>
  );
}