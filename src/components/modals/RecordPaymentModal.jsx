import { useState } from "react";
import Modal from "./Modal";
import { PAYMENT_TYPES } from "../../constants";

const BLANK_FORM = {
  member: "",
  amount: "",
  type: PAYMENT_TYPES[0],
  date: new Date().toISOString().slice(0, 10),
  method: "Cash",
  status: "Completed",
};

export default function RecordPaymentModal({ payment, members = [], onClose, onSave }) {
  const isEdit = !!payment;

  const [form, setForm] = useState(() =>
    isEdit
      ? {
          member: payment.member || "",
          amount: payment.amount ? String(payment.amount).replace(/[₦,]/g, "") : "",
          type: payment.type || PAYMENT_TYPES[0],
          date: payment.rawDate || new Date().toISOString().slice(0, 10),
          method: payment.method || "Cash",
          status: payment.status || "Completed",
        }
      : BLANK_FORM
  );
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.member || !form.amount) {
      setError("Member and amount are required.");
      return;
    }

    const formattedDate = new Date(form.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (isEdit) {
      // TODO: replace with a real API call, e.g. await api.put(`/payments/${payment.id}`, form)
      onSave({
        ...payment, // keeps id and receipt untouched
        member: form.member,
        amount: `₦${Number(form.amount).toLocaleString()}`,
        type: form.type,
        date: formattedDate,
        rawDate: form.date,
        method: form.method,
        status: form.status,
      });
    } else {
      // TODO: replace with a real API call, e.g. await api.post("/payments", form)
      onSave({
        id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
        member: form.member,
        amount: `₦${Number(form.amount).toLocaleString()}`,
        type: form.type,
        date: formattedDate,
        rawDate: form.date,
        method: form.method,
        receipt: `RCT-${Math.floor(1000 + Math.random() * 9000)}`,
        status: form.status,
      });
    }
    onClose();
  };

  return (
    <Modal
      title={isEdit ? `Edit Payment ${payment.id}` : "Record Payment"}
      onClose={onClose}
      size="md"
      footer={
        <>
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" form="record-payment-form" className="btn-primary">
            {isEdit ? "Save Changes" : "Record Payment"}
          </button>
        </>
      }
    >
      <form id="record-payment-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <div className="form-grid">
          <div className="form-field span-2">
            <label>Member</label>
            <input
              type="text"
              list="member-options"
              value={form.member}
              onChange={set("member")}
              placeholder="Start typing a member's name..."
            />
            <datalist id="member-options">
              {members.map((m) => (
                <option key={m.membershipNo} value={m.name} />
              ))}
            </datalist>
          </div>

          <div className="form-field">
            <label>Amount (₦)</label>
            <input type="number" min="0" value={form.amount} onChange={set("amount")} placeholder="25000" />
          </div>

          <div className="form-field">
            <label>Payment Type</label>
            <select value={form.type} onChange={set("type")}>
              {PAYMENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label>Payment Date</label>
            <input type="date" value={form.date} onChange={set("date")} />
          </div>

          <div className="form-field">
            <label>Payment Method</label>
            <select value={form.method} onChange={set("method")}>
              <option>Cash</option>
              <option>Transfer</option>
              <option>POS</option>
            </select>
          </div>

          <div className="form-field span-2">
            <label>Status</label>
            <select value={form.status} onChange={set("status")}>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        {!isEdit && (
          <p style={{ fontSize: 11.5, color: "#9aa0b4", marginTop: 14 }}>
            Receipt number is generated automatically once saved.
          </p>
        )}
      </form>
    </Modal>
  );
}