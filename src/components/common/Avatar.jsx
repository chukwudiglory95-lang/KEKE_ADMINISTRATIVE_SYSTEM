import "../../styles/avatar.css";

const PALETTE = ["#3b82f6", "#7c3aed", "#f5a623", "#16a34a", "#dc2626", "#0b1f4d", "#0891b2", "#be185d"];

function colorFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function initialsFor(name) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Avatar({ name = "?", size = 36, className = "" }) {
  return (
    <div
      className={`kera-avatar ${className}`}
      style={{ width: size, height: size, background: colorFor(name), fontSize: size * 0.4 }}
      title={name}
    >
      {initialsFor(name)}
    </div>
  );
}