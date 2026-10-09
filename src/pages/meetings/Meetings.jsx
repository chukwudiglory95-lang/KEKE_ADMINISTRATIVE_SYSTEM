import { useState } from "react";
import { FaCalendarPlus } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import ScheduleMeetingModal from "../../components/modals/ScheduleMeetingModal";

const INITIAL_MEETINGS = [
  { day: "15", month: "Sep", title: "General Union Meeting", detail: "10:00 AM • Union Hall, Wuse" },
  { day: "20", month: "Sep", title: "Executive Committee Review", detail: "2:00 PM • KERA Office" },
  { day: "28", month: "Sep", title: "Route Reassignment Meeting", detail: "11:00 AM • Kubwa Branch" },
  { day: "05", month: "Aug", title: "Quarterly General Meeting", detail: "10:00 AM • Union Hall, Wuse" },
];

export default function Meetings() {
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <>
      <PageHeader
        title="Meetings"
        subtitle="Schedule and manage union meetings"
      />

      <div className="card">
        <div className="module-toolbar">
          <div />
          <button className="btn-primary" onClick={() => setShowSchedule(true)}>
            <FaCalendarPlus /> Schedule Meeting
          </button>
        </div>

        <ul className="meeting-list">
          {meetings.map((m, i) => (
            <li key={i} className="meeting-item">
              <div className="meeting-date">
                <strong>{m.day}</strong>
                <span>{m.month}</span>
              </div>
              <div className="meeting-info">
                <h4>{m.title}</h4>
                <p>{m.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showSchedule && (
        <ScheduleMeetingModal
          onClose={() => setShowSchedule(false)}
          onSave={(meeting) => setMeetings((prev) => [meeting, ...prev])}
        />
      )}
    </>
  );
}