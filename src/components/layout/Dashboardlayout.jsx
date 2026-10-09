import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ContentWrapper from "./ContentWrapper";
import Footer from "./Footer";
import "../../styles/dashboard.css";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`dashboard${sidebarOpen ? "" : " sidebar-collapsed"}`}>
      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Navbar */}
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Page Content — the active route renders inside ContentWrapper's <Outlet /> */}
        <main className="dashboard-content">
          <ContentWrapper />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;