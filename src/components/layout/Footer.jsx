import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="dashboard-footer">
      <p>© {new Date().getFullYear()} KERA — New Ultimate Keke &amp;Motorcycle Riders Association, Abuja Branch</p>
      <p>All rights reserved.</p>
    </footer>
  );
}