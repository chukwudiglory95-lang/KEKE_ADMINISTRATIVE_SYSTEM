import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import LogComplaintModal from "../../components/modals/LogComplaintModal";
import { COMPLAINT_STATUS_BADGE } from "../../constants";

const INITIAL_COMPLAINTS = [
  { id: "CMP-0089", member: "Musa Abdullahi", category: "Route Dispute", date: "Sep 8, 2025", status: "Open" },
  { id: "CMP-0088", member: "Ibrahim Yusuf", category: "Fare Dispute", date: "Sep 6, 2025", status: "In Progress" },
  { id: "CMP-0087", member: "Emeka Johnson", category: "Vehicle Damage", date: "Sep 3, 2025", status: "Resolved" },
  { id: "CMP-0086", member: "Adeola Adebayo", category: "Union Conduct", date: "Aug 30, 2025", status: "Resolved" },
  { id: "CMP-0085", member: "Chinedu Okafor", category: "Permit Delay", date: "Aug 27, 2025", status: "Open" },
];

const columns = [
  { key: "id", label: "Complaint No" },
  { key: "member", label: "Member" },
  { key: "category", label: "Category" },
  { key: "date", label: "Date" },
  {
    key: "status",
    label: "Status",
    render: (c) => <span className={`badge ${COMPLAINT_STATUS_BADGE[c.status]}`}>{c.status}</span>,
  },
];

export default function Complaints() {
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [showLog, setShowLog] = useState(false);

  return (
    <>
      <PageHeader
        title="Complaints"
        subtitle="Review, assign, and resolve member complaints"
      />

      <DataTable
        columns={columns}
        data={complaints}
        searchKeys={["member", "category", "id"]}
        searchPlaceholder="Search by member, category, or complaint no..."
        pageSize={5}
        actions={
          <button className="btn-primary" onClick={() => setShowLog(true)}>
            <FaExclamationCircle /> Log Complaint
          </button>
        }
      />

      {showLog && (
        <LogComplaintModal
          onClose={() => setShowLog(false)}
          onSave={(complaint) => setComplaints((prev) => [complaint, ...prev])}
        />
      )}
    </>
  );
}