import { useId, useState } from "react";
import { createPortal } from "react-dom";
import { FaTrash } from "react-icons/fa";
import Modal from "../modals/Modal";
import "../../styles/delete.css";

export const DELETE_REASONS = [
  "Death",
  "Sickness",
  "Travel / Relocation",
  "Non-payment of dues",
  "Other",
];

/**
 * A trash button that opens its own confirmation dialog.
 *
 * Simple delete:
 *   <DeleteButton itemType="Payment" itemName="PAY-1042"
 *                 onConfirm={() => removePayment(id)} />
 *
 * Delete with a reason (members and Kekes):
 *   <DeleteButton itemType="Member" itemName={m.name} askReason
 *                 onConfirm={({ reason, notes }) => removeMember(m, reason, notes)} />
 *
 * The dialog is rendered with a portal on document.body. That matters:
 * list items in this project play an entrance animation that leaves a
 * transform on them, and a transformed parent would otherwise trap the
 * dialog inside a tiny box instead of covering the screen.
 */
export default function DeleteButton({
  itemType = "record",
  itemName = "",
  askReason = false,
  onConfirm,
}) {
  const formId = `delete-form-${useId()}`;
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(DELETE_REASONS[0]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const close = () => {
    setOpen(false);
    setReason(DELETE_REASONS[0]);
    setNotes("");
    setError("");
  };

  const submit = (e) => {
    e.preventDefault();

    if (askReason && reason === "Other" && !notes.trim()) {
      setError("Please describe the reason.");
      return;
    }

    onConfirm?.({
      reason: askReason ? reason : null,
      notes: askReason ? notes.trim() : "",
    });
    close();
  };

  return (
    <>
      <button
        type="button"
        className="btn-danger-outline"
        title={`Delete ${itemType}`}
        aria-label={`Delete ${itemType} ${itemName}`}
        onClick={(e) => {
          e.stopPropagation(); // don't trigger a clickable row/card behind it
          setOpen(true);
        }}
      >
        <FaTrash />
      </button>

      {open &&
        createPortal(
          // Events inside a portal still bubble to React parents, so stop
          // them here too (e.g. a message card that expands when clicked).
          <div onClick={(e) => e.stopPropagation()}>
            <Modal
              title={`Delete ${itemType}`}
              size="sm"
              onClose={close}
              footer={
                <>
                  <button type="button" className="btn-outline" onClick={close}>
                    Cancel
                  </button>
                  <button type="submit" form={formId} className="btn-danger">
                    <FaTrash /> Delete
                  </button>
                </>
              }
            >
              <form id={formId} onSubmit={submit}>
                <p className="delete-message">
                  {askReason ? (
                    <>
                      This removes <strong>{itemName}</strong> from the list. The
                      reason is saved in the Removal Log, where the record can be
                      restored if this was a mistake.
                    </>
                  ) : (
                    <>
                      You are about to delete <strong>{itemName}</strong>. This
                      cannot be undone.
                    </>
                  )}
                </p>

                {askReason && (
                  <>
                    <div className="form-field" style={{ marginBottom: 14 }}>
                      <label>Reason</label>
                      <select value={reason} onChange={(e) => setReason(e.target.value)}>
                        {DELETE_REASONS.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label>
                        Additional notes
                        {reason !== "Other" && <span className="optional"> (optional)</span>}
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any extra detail..."
                      />
                    </div>
                  </>
                )}

                {error && (
                  <div className="form-error" style={{ marginTop: 12 }}>
                    {error}
                  </div>
                )}
              </form>
            </Modal>
          </div>,
          document.body
        )}
    </>
  );
}