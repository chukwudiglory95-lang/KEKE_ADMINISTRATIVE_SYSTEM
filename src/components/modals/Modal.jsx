import { FaTimes } from "react-icons/fa";
import "../../styles/modal.css";

export default function Modal({ title, children, footer, onClose, size = "md" }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-panel modal-${size}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-actions">{footer}</div>}
      </div>
    </div>
  );
}