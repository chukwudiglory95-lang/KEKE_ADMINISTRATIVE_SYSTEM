import { useState } from "react";
import { FaBullhorn } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import NewNoticeModal from "../../components/modals/NewNoticeModal";

const TAG_BADGE = {
  "Meeting Notice": "badge-blue",
  "Strike Notice": "badge-red",
  "Route Change": "badge-yellow",
  "Permit Deadline": "badge-yellow",
  "Public Holiday": "badge-gray",
  "Safety Information": "badge-green",
};

const INITIAL_NOTICES = [
  { tag: "Meeting Notice", title: "Union Meeting Notice", detail: "All members are to attend the union meeting scheduled for September 15th at the Union Hall, Wuse.", date: "Sep 8, 2025" },
  { tag: "Route Change", title: "New Keke Registration Open", detail: "Registration for new kekes is now ongoing at the KERA office. Bring valid ID and vehicle documents.", date: "Sep 5, 2025" },
  { tag: "Permit Deadline", title: "Payment Reminder", detail: "Kindly pay your monthly dues before the 15th to avoid late penalties.", date: "Sep 3, 2025" },
  { tag: "Safety Information", title: "Safety Training", detail: "Mandatory safety training for all drivers holds this Saturday at 9:00 AM.", date: "Aug 28, 2025" },
];

export default function Notices() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [showNew, setShowNew] = useState(false);

  return (
    <>
      <PageHeader
        title="Notices"
        subtitle="Publish announcements, notices, and safety information"
      />

      <div className="card">
        <div className="module-toolbar">
          <div />
          <button className="btn-primary" onClick={() => setShowNew(true)}>
            <FaBullhorn /> New Notice
          </button>
        </div>

        <ul className="notice-feed">
          {notices.map((n, i) => (
            <li key={i} className="notice-feed-item">
              <div className="feed-top">
                <span className={`badge ${TAG_BADGE[n.tag]}`}>{n.tag}</span>
                <span className="notice-date">{n.date}</span>
              </div>
              <h4>{n.title}</h4>
              <p>{n.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      {showNew && (
        <NewNoticeModal
          onClose={() => setShowNew(false)}
          onSave={(notice) => setNotices((prev) => [notice, ...prev])}
        />
      )}
    </>
  );
}