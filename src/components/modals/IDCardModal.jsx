import { FaTimes, FaPrint } from "react-icons/fa";
import IDCard from "../cards/IDCard";
import "../../styles/idcard.css";

export default function IDCardModal({ member, onClose }) {
  if (!member) return null;

  const handlePrint = () => window.print();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Member ID Card</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>

        <div className="id-card-print">
          <IDCard member={member} />
        </div>

        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary" onClick={handlePrint}>
            <FaPrint /> Print ID Card
          </button>
        </div>
      </div>
    </div>
  );
}