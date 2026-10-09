import {
  FaShieldAlt,
  FaLandmark,
  FaHospital,
  FaTrafficLight,
  FaUserTie,
  FaUserShield,
} from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";

const CONTACTS = [
  { icon: FaShieldAlt, color: "#2563eb", label: "Police", number: "0803 000 1111" },
  { icon: FaLandmark, color: "#7c3aed", label: "AMAC Office", number: "0805 222 3333" },
  { icon: FaTrafficLight, color: "#f5a623", label: "FRSC", number: "0812 444 5555" },
  { icon: FaHospital, color: "#dc2626", label: "Hospital", number: "0701 666 7777" },
  { icon: FaUserTie, color: "#0b1f4d", label: "Union Chairman", number: "0906 888 9999" },
  { icon: FaUserShield, color: "#16a34a", label: "Union Secretary", number: "0913 555 4444" },
];

export default function Emergency() {
  return (
    <>
      <PageHeader
        title="Emergency"
        subtitle="Quick-access emergency contacts for Police, FRSC, and Hospitals"
      />

      <div className="contact-grid">
        {CONTACTS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="card contact-card">
              <span
                className="contact-icon"
                style={{ background: `${c.color}1f`, color: c.color }}
              >
                <Icon />
              </span>
              <div>
                <h4>{c.label}</h4>
                <p>{c.number}</p>
              </div>
              <a className="call-btn" href={`tel:${c.number.replace(/\s/g, "")}`}>
                Call
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}