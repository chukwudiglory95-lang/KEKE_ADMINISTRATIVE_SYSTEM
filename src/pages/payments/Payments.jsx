import { useState } from "react";
import { FaMoneyCheckAlt, FaPen } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import RecordPaymentModal from "../../components/modals/RecordPaymentModal";
import { PAYMENT_STATUS_BADGE } from "../../constants";

const INITIAL_PAYMENTS = [
  { id: "PAY-1042", member: "Okafor Chinedu", amount: "₦25,000", type: "Monthly Dues", date: "Sep 9, 2025", rawDate: "2025-09-09", method: "Cash", receipt: "RCT-0234", status: "Completed" },
  { id: "PAY-1041", member: "Emeka Johnson", amount: "₦1,000", type: "Registration Fee", date: "Sep 8, 2025", rawDate: "2025-09-08", method: "Transfer", receipt: "RCT-0233", status: "Completed" },
  { id: "PAY-1040", member: "Musa Abdullahi", amount: "₦20,000", type: "Permit Payment", date: "Sep 7, 2025", rawDate: "2025-09-07", method: "Cash", receipt: "RCT-0232", status: "Pending" },
  { id: "PAY-1039", member: "Ibrahim Yusuf", amount: "₦30,000", type: "Special Levy", date: "Sep 6, 2025", rawDate: "2025-09-06", method: "POS", receipt: "RCT-0231", status: "Completed" },
  { id: "PAY-1038", member: "Adeola Adebayo", amount: "₦5,000", type: "Fine Payment", date: "Sep 4, 2025", rawDate: "2025-09-04", method: "Cash", receipt: "RCT-0230", status: "Failed" },
];

const KNOWN_MEMBERS = INITIAL_PAYMENTS.map((p) => ({ name: p.member, membershipNo: p.id }));

export default function Payments() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [showRecord, setShowRecord] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const columns = [
    { key: "id", label: "Payment ID" },
    { key: "member", label: "Member" },
    { key: "amount", label: "Amount" },
    { key: "type", label: "Type" },
    { key: "date", label: "Date" },
    { key: "method", label: "Method", sortable: false },
    { key: "receipt", label: "Receipt No", sortable: false },
    {
      key: "status",
      label: "Status",
      render: (p) => <span className={`badge ${PAYMENT_STATUS_BADGE[p.status]}`}>{p.status}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: (p) => (
        <button className="btn-outline" onClick={() => setEditingPayment(p)} title="Edit Payment">
          <FaPen />
        </button>
      ),
    },
  ];

  const handleUpdate = (updatedPayment) => {
    setPayments((prev) => prev.map((p) => (p.id === updatedPayment.id ? { ...p, ...updatedPayment } : p)));
  };

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Track registration fees, dues, levies, and fines"
      />

      <DataTable
        columns={columns}
        data={payments}
        searchKeys={["member", "receipt", "id"]}
        searchPlaceholder="Search by member, receipt no, or payment ID..."
        pageSize={5}
        actions={
          <button className="btn-primary" onClick={() => setShowRecord(true)}>
            <FaMoneyCheckAlt /> Record Payment
          </button>
        }
      />

      {showRecord && (
        <RecordPaymentModal
          members={KNOWN_MEMBERS}
          onClose={() => setShowRecord(false)}
          onSave={(newPayment) => setPayments((prev) => [newPayment, ...prev])}
        />
      )}

      {editingPayment && (
        <RecordPaymentModal
          payment={editingPayment}
          members={KNOWN_MEMBERS}
          onClose={() => setEditingPayment(null)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}