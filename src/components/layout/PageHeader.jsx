export default function PageHeader({ title, subtitle, emoji = "" }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {subtitle && (
        <p>
          {subtitle}
          {emoji && <span className="page-header-emoji"> {emoji}</span>}
        </p>
      )}
    </div>
  );
}