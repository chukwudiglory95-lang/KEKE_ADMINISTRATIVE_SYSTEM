import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/dashboard.css";

function Layout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-right">
        <Navbar />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;