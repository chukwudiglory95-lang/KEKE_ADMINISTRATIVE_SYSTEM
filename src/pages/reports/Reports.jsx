import { FaFilePdf, FaFileExcel, FaPrint } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import { exportToPDF, exportToExcel, printReport } from "../../utils/exportUtils";

// Each report has its own column shape + sample rows. In a real build,
// swap MOCK_ROWS for data pulled from your API/shared data layer.
const REPORTS = [
  {
    title: "Members Report",
    detail: "Full list of registered riders and status.",
    columns: [
      { key: "name", label: "Name" },
      { key: "membershipNo", label: "Membership No" },
      { key: "union", label: "Union" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { name: "Adeola Adebayo", membershipNo: "KERA-0234", union: "Wuse Union", status: "Active" },
      { name: "Chinedu Okafor", membershipNo: "KERA-0189", union: "Nyanya Union", status: "Active" },
      { name: "Musa Abdullahi", membershipNo: "KERA-0301", union: "Kubwa Union", status: "Pending" },
      { name: "Emeka Johnson", membershipNo: "KERA-0410", union: "Gwarinpa Union", status: "Suspended" },
    ],
  },
  {
    title: "Payments Report",
    detail: "Dues, levies, fines, and registration fees.",
    columns: [
      { key: "id", label: "Payment ID" },
      { key: "member", label: "Member" },
      { key: "amount", label: "Amount" },
      { key: "type", label: "Type" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { id: "PAY-1042", member: "Okafor Chinedu", amount: "₦25,000", type: "Monthly Dues", status: "Completed" },
      { id: "PAY-1041", member: "Emeka Johnson", amount: "₦1,000", type: "Registration Fee", status: "Completed" },
      { id: "PAY-1040", member: "Musa Abdullahi", amount: "₦20,000", type: "Permit Payment", status: "Pending" },
    ],
  },
  {
    title: "Permits Report",
    detail: "Permit issuance, renewals, and expiries.",
    columns: [
      { key: "kekeNo", label: "Keke No" },
      { key: "owner", label: "Owner" },
      { key: "permit", label: "Permit Status" },
    ],
    rows: [
      { kekeNo: "KK-0234", owner: "Adeola Adebayo", permit: "Valid" },
      { kekeNo: "KK-0301", owner: "Musa Abdullahi", permit: "Expiring" },
      { kekeNo: "KK-0410", owner: "Emeka Johnson", permit: "Expired" },
    ],
  },
  {
    title: "Complaints Report",
    detail: "Logged complaints and resolution status.",
    columns: [
      { key: "id", label: "Complaint No" },
      { key: "member", label: "Member" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { id: "CMP-0089", member: "Musa Abdullahi", category: "Route Dispute", status: "Open" },
      { id: "CMP-0088", member: "Ibrahim Yusuf", category: "Fare Dispute", status: "In Progress" },
      { id: "CMP-0087", member: "Emeka Johnson", category: "Vehicle Damage", status: "Resolved" },
    ],
  },
  {
    title: "Revenue Report",
    detail: "Daily, weekly, and monthly revenue totals.",
    columns: [
      { key: "period", label: "Period" },
      { key: "revenue", label: "Revenue" },
    ],
    rows: [
      { period: "Jul 2025", revenue: "₦950,000" },
      { period: "Aug 2025", revenue: "₦1,150,000" },
      { period: "Sep 2025", revenue: "₦1,850,000" },
    ],
  },
  {
    title: "Registrations Report",
    detail: "New member and Keke registrations.",
    columns: [
      { key: "date", label: "Date" },
      { key: "type", label: "Type" },
      { key: "name", label: "Name" },
    ],
    rows: [
      { date: "Sep 9, 2025", type: "Member", name: "Adeola Adebayo" },
      { date: "Sep 7, 2025", type: "Keke", name: "KK-0512" },
    ],
  },
  {
    title: "Active Kekes Report",
    detail: "All currently active registered vehicles.",
    columns: [
      { key: "kekeNo", label: "Keke No" },
      { key: "plate", label: "Plate No" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      { kekeNo: "KK-0234", plate: "ABJ-234-KM", owner: "Adeola Adebayo" },
      { kekeNo: "KK-0098", plate: "ABJ-098-KM", owner: "Ibrahim Yusuf" },
    ],
  },
  {
    title: "Suspended Riders Report",
    detail: "Riders currently under suspension.",
    columns: [
      { key: "name", label: "Name" },
      { key: "membershipNo", label: "Membership No" },
      { key: "reason", label: "Reason" },
    ],
    rows: [
      { name: "Emeka Johnson", membershipNo: "KERA-0410", reason: "Outstanding dues" },
    ],
  },
];

export default function Reports() {
  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Generate and export membership, payment, and activity reports"
      />

      <div className="report-grid">
        {REPORTS.map((r) => (
          <div key={r.title} className="card report-card">
            <h4>{r.title}</h4>
            <p>{r.detail}</p>
            <div className="report-actions">
              <button onClick={() => exportToPDF(r.title, r.columns, r.rows)}>
                <FaFilePdf /> PDF
              </button>
              <button onClick={() => exportToExcel(r.title, r.columns, r.rows)}>
                <FaFileExcel /> Excel
              </button>
              <button onClick={() => printReport(r.title, r.columns, r.rows)}>
                <FaPrint /> Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}




