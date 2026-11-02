import { useState } from "react";
import { FaHistory, FaUndo } from "react-icons/fa";
import "../../styles/delete.css";

/**
 * Collapsible list of removed records, each with the reason it was
 * removed and a Restore button.
 *
 * entries: [{ id, record, reason, notes, removedAt }]
 */
export default function RemovalLog({ entries, onRestore, nameOf, title = "Removal Log" }) {
  const [open, setOpen] = useState(false);

  if (entries.length === 0) return null;

  return (
    <div className="card removal-log">
      <button
        type="button"
        className="removal-log-toggle"
        onClick={() => setOpen((v) => !v)}
      >
        <FaHistory /> {title} <span className="count">{entries.length}</span>
        <span className="toggle-hint">{open ? "Hide" : "Show"}</span>
      </button>

      {open && (
        <ul className="removal-list">
          {entries.map((entry) => (
            <li key={entry.id} className="removal-item">
              <div className="removal-info">
                <strong>{nameOf(entry.record)}</strong>
                <small>
                  <span className="badge badge-red">{entry.reason}</span> ·{" "}
                  {entry.removedAt}
                  {entry.notes ? ` · ${entry.notes}` : ""}
                </small>
              </div>
              <button type="button" className="btn-outline" onClick={() => onRestore(entry)}>
                <FaUndo /> Restore
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}