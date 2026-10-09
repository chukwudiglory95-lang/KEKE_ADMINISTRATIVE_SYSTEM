import { createHashRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/Dashboardlayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Members from "../pages/members/Members";
import Kekes from "../pages/keke/Kekes";
import Payments from "../pages/payments/Payments";
import Complaints from "../pages/complaints/Complaints";
import Meetings from "../pages/meetings/Meetings";
import Reports from "../pages/reports/Reports";
import Notices from "../pages/notices/Notices";
import Emergency from "../pages/emergency/Emergency";
import Settings from "../pages/settings/Settings";
import ActivityLog from "../pages/activity/ActivityLog";
import Messages from "../pages/messages/Messages";
import Profile from "../pages/profile/Profile";

const router = createHashRouter([
  // Public auth pages — no sidebar/navbar chrome
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // Everything below requires a session — ProtectedRoute redirects to
  // /login if there isn't one.
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "members", element: <Members /> },
          { path: "kekes", element: <Kekes /> },
          { path: "payments", element: <Payments /> },
          { path: "complaints", element: <Complaints /> },
          { path: "meetings", element: <Meetings /> },
          { path: "reports", element: <Reports /> },
          { path: "notices", element: <Notices /> },
          { path: "emergency", element: <Emergency /> },
          { path: "settings", element: <Settings /> },
          { path: "messages", element: <Messages /> },
          { path: "activity-log", element: <ActivityLog /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

export default router;