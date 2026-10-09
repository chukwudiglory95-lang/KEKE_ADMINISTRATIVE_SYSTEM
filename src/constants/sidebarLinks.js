import {
  FaTachometerAlt,
  FaUsers,
  FaCarSide,
  FaMoneyBillWave,
  FaClipboardList,
  FaBullhorn,
  FaExclamationTriangle,
  FaCog,
} from "react-icons/fa";

export const sidebarLinks = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icon: FaTachometerAlt,
  },
  {
    id: 2,
    title: "Members",
    path: "/members",
    icon: FaUsers,
  },
  {
    id: 3,
    title: "Keke",
    path: "/keke",
    icon: FaCarSide,
  },
  {
    id: 4,
    title: "Payments",
    path: "/payments",
    icon: FaMoneyBillWave,
  },
  {
    id: 5,
    title: "Reports",
    path: "/reports",
    icon: FaClipboardList,
  },
  {
    id: 6,
    title: "Announcements",
    path: "/announcements",
    icon: FaBullhorn,
  },
  {
    id: 7,
    title: "Emergency",
    path: "/emergency",
    icon: FaExclamationTriangle,
  },
  {
    id: 8,
    title: "Settings",
    path: "/settings",
    icon: FaCog,
  },
];