import { useState } from "react";
import {
  FaPaperPlane,
  FaComment,
  FaSms,
  FaEnvelope,
  FaInbox,
} from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import Avatar from "../../components/common/Avatar";
import ComposeMessageModal from "../../components/modals/ComposeMessageModal";
import "./messages.css";

// In a real build these come from your admin accounts table / API.
const ADMINS = [
  { id: "adm-1", name: "Grace Obi", role: "Admin", phone: "0803 555 1122", email: "grace@kera-abuja.org" },
  { id: "adm-2", name: "Tunde Bello", role: "Admin", phone: "0705 221 8890", email: "tunde@kera-abuja.org" },
  { id: "adm-3", name: "Hauwa Sani", role: "Admin", phone: "0812 903 4471", email: "hauwa@kera-abuja.org" },
  { id: "adm-4", name: "Peter Eze", role: "Admin", phone: "0906 774 2201", email: "peter@kera-abuja.org" },
];

const INITIAL_SENT = [
  {
    id: "MSG-1042",
    channel: "in-app",
    to: ["Grace Obi", "Tunde Bello"],
    subject: "Monthly dues collection update",
    body: "Please ensure all September dues are recorded before the 30th. Reconciliation starts October 1st.",
    sentAt: "2 hours ago",
    status: "Delivered",
  },
  {
    id: "MSG-1041",
    channel: "sms",
    to: ["Hauwa Sani"],
    subject: "(No subject)",
    body: "Reminder: submit the Kubwa route permit list today.",
    sentAt: "Yesterday",
    status: "Delivered",
  },
  {
    id: "MSG-1040",
    channel: "email",
    to: ["Grace Obi", "Tunde Bello", "Hauwa Sani", "Peter Eze"],
    subject: "Executive meeting — September 15",
    body: "All admins are required to attend the executive review meeting at the Union Hall, Wuse. Agenda attached.",
    sentAt: "3 days ago",
    status: "Delivered",
  },
];

const INITIAL_INBOX = [
  {
    id: "MSG-0981",
    from: "Grace Obi",
    channel: "in-app",
    subject: "Re: Monthly dues collection update",
    body: "Noted. Wuse Union is fully reconciled as of this morning.",
    sentAt: "1 hour ago",
    unread: true,
  },
  {
    id: "MSG-0980",
    from: "Peter Eze",
    channel: "in-app",
    subject: "Permit backlog at Lugbe",
    body: "We have 14 pending permit renewals. Requesting approval to extend the deadline by one week.",
    sentAt: "5 hours ago",
    unread: true,
  },
  {
    id: "MSG-0979",
    from: "Tunde Bello",
    channel: "in-app",
    subject: "Keke No. 0234 update",
    body: "Vehicle has passed inspection and is back in service.",
    sentAt: "Yesterday",
    unread: false,
  },
];

const CHANNEL_META = {
  "in-app": { icon: FaComment, label: "In-App", className: "badge-blue" },
  sms: { icon: FaSms, label: "SMS", className: "badge-yellow" },
  email: { icon: FaEnvelope, label: "Email", className: "badge-green" },
};

export default function Messages() {
  const [tab, setTab] = useState("inbox");
  const [sent, setSent] = useState(INITIAL_SENT);
  const [inbox, setInbox] = useState(INITIAL_INBOX);
  const [showCompose, setShowCompose] = useState(false);
  const [openId, setOpenId] = useState(null);

  const unreadCount = inbox.filter((m) => m.unread).length;

  const openMessage = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    setInbox((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));
  };

  const messages = tab === "inbox" ? inbox : sent;

  return (
    <>
      <PageHeader
        title="Messages"
        subtitle="Send updates and directives to your administrators"
      />

      <div className="card">
        <div className="module-toolbar">
          <div className="message-tabs">
            <button
              className={`message-tab${tab === "inbox" ? " active" : ""}`}
              onClick={() => setTab("inbox")}
            >
              <FaInbox /> Inbox
              {unreadCount > 0 && <span className="tab-count">{unreadCount}</span>}
            </button>
            <button
              className={`message-tab${tab === "sent" ? " active" : ""}`}
              onClick={() => setTab("sent")}
            >
              <FaPaperPlane /> Sent
            </button>
          </div>

          <button className="btn-primary" onClick={() => setShowCompose(true)}>
            <FaPaperPlane /> New Message
          </button>
        </div>

        {messages.length === 0 ? (
          <p className="message-empty">
            {tab === "inbox" ? "No messages in your inbox." : "You haven't sent any messages yet."}
          </p>
        ) : (
          <ul className="message-list">
            {messages.map((m) => {
              const meta = CHANNEL_META[m.channel];
              const ChannelIcon = meta.icon;
              const isOpen = openId === m.id;
              const counterparty = tab === "inbox" ? m.from : m.to.join(", ");

              return (
                <li
                  key={m.id}
                  className={`message-item${m.unread ? " unread" : ""}${isOpen ? " open" : ""}`}
                  onClick={() => openMessage(m.id)}
                >
                  <Avatar name={tab === "inbox" ? m.from : m.to[0]} size={36} />

                  <div className="message-main">
                    <div className="message-top">
                      <strong>{counterparty}</strong>
                      <span className={`badge ${meta.className}`}>
                        <ChannelIcon style={{ marginRight: 4, fontSize: 9 }} />
                        {meta.label}
                      </span>
                      {tab === "sent" && (
                        <span className="badge badge-gray">{m.status}</span>
                      )}
                      <small className="message-time">{m.sentAt}</small>
                    </div>

                    <p className="message-subject">{m.subject}</p>
                    <p className={`message-body${isOpen ? " expanded" : ""}`}>{m.body}</p>
                  </div>

                  {m.unread && <span className="message-unread-dot" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {showCompose && (
        <ComposeMessageModal
          admins={ADMINS}
          onClose={() => setShowCompose(false)}
          onSend={(msg) => {
            setSent((prev) => [msg, ...prev]);
            setTab("sent");
          }}
        />
      )}
    </>
  );
}