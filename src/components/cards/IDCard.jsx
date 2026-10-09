import { QRCodeSVG } from "qrcode.react";
import Avatar from "../common/Avatar";
import "../../styles/idcard.css";

// Encodes a verification URL a scanner opens to confirm the rider's
// membership. Swap the domain for your real verification endpoint.
function buildQrValue(member) {
  return `https://kera-abuja.org/verify/${encodeURIComponent(member.membershipNo)}`;
}

export default function IDCard({ member }) {
  return (
    <div className="id-card">
      <div className="id-card-header">
        <span className="id-card-logo">KERA</span>
        <span className="id-card-tag">Keke Rider ID</span>
      </div>

      <div className="id-card-body">
        <Avatar name={member.name} size={64} className="id-card-photo" />

        <div className="id-card-details">
          <h3>{member.name}</h3>
          <dl>
            <dt>Membership No</dt>
            <dd>{member.membershipNo}</dd>

            <dt>Keke No</dt>
            <dd>{member.kekeNo}</dd>

            <dt>Union</dt>
            <dd>{member.union}</dd>

            <dt>Route</dt>
            <dd>{member.route}</dd>
          </dl>
        </div>

        <div className="id-card-qr">
          <QRCodeSVG value={buildQrValue(member)} size={72} level="M" />
        </div>
      </div>

      <div className="id-card-footer">
        <span>Issued: {new Date().toLocaleDateString()}</span>
        <span className="id-card-status">{member.status}</span>
      </div>
    </div>
  );
}