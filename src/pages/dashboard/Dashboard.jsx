import {
  FaUsers,
  FaTaxi,
  FaUserCircle,
  FaMoneyBillWave,
  FaArrowUp,
  FaMoneyCheckAlt,
  FaBullhorn,
  FaClock,
  FaUserPlus,
  FaChartBar,
  FaEnvelope,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import Avatar from "../../components/common/Avatar";

// Point this at whichever file you want in the hero — e.g. your
// background-cleaned "slazzer-edit-image.png", or plain "keke.jpg".
import heroPhoto from "../../assets/images/keke-row-cutout.png";

const STATS = [
  { label: "Members", value: "2,150", change: "+12%", icon: FaUsers, accent: "#3b82f6", spark: [4, 6, 5, 8, 7, 9, 8, 11, 10, 13] },
  { label: "Registered Kekes", value: "1,075", change: "+8%", icon: FaTaxi, accent: "#f5a623", spark: [6, 5, 7, 6, 9, 8, 10, 9, 11, 12] },
  { label: "Drivers", value: "1,860", change: "+15%", icon: FaUserCircle, accent: "#22c55e", spark: [3, 5, 4, 7, 6, 9, 8, 10, 12, 14] },
  { label: "Revenue", value: "₦2,450,000", change: "+18%", icon: FaMoneyBillWave, accent: "#7c3aed", spark: [5, 6, 8, 7, 10, 9, 12, 11, 14, 16] },
];

const REVENUE_DATA = [
  { month: "Jan", value: 320000 }, { month: "Feb", value: 480000 },
  { month: "Mar", value: 470000 }, { month: "Apr", value: 560000 },
  { month: "May", value: 600000 }, { month: "Jun", value: 780000 },
  { month: "Jul", value: 950000 }, { month: "Aug", value: 1150000 },
  { month: "Sep", value: 1850000 },
];

const KEKE_STATUS = [
  { name: "Active", value: 820, color: "#22c55e" },
  { name: "In Service", value: 180, color: "#3b82f6" },
  { name: "Under Repair", value: 45, color: "#f5a623" },
  { name: "Inactive", value: 30, color: "#ef4444" },
];
const TOTAL_KEKES = KEKE_STATUS.reduce((sum, s) => sum + s.value, 0);

const RECENT_PAYMENTS = [
  { name: "Okafor Chinedu", amount: "₦25,000", date: "Sep 9, 2025", status: "Completed" },
  { name: "Emeka Johnson", amount: "₦15,000", date: "Sep 8, 2025", status: "Completed" },
  { name: "Musa Abdullahi", amount: "₦20,000", date: "Sep 7, 2025", status: "Completed" },
  { name: "Ibrahim Yusuf", amount: "₦30,000", date: "Sep 6, 2025", status: "Completed" },
];

const RECENT_NOTICES = [
  { icon: FaBullhorn, color: "#3b82f6", title: "Union Meeting Notice", detail: "All members are to attend the union meeting...", date: "Sep 8, 2025" },
  { icon: FaTaxi, color: "#22c55e", title: "New Keke Registration Open", detail: "Registration for new kekes is now ongoing...", date: "Sep 5, 2025" },
  { icon: FaMoneyCheckAlt, color: "#f5a623", title: "Payment Reminder", detail: "Kindly pay your monthly dues before the 15th...", date: "Sep 3, 2025" },
  { icon: FaUserCircle, color: "#ef4444", title: "Safety Training", detail: "Mandatory safety training for all drivers...", date: "Aug 28, 2025" },
];

const RECENT_ACTIVITIES = [
  { color: "#3b82f6", text: "New member registered - Adeola Adebayo", time: "2 hours ago" },
  { color: "#f5a623", text: "Payment received - ₦25,000 from Chinedu Okafor", time: "4 hours ago" },
  { color: "#22c55e", text: "Keke updated - Keke No. 0234", time: "6 hours ago" },
];

function StatCard({ stat }) {
  const Icon = stat.icon;
  const sparkData = stat.spark.map((v, i) => ({ i, v }));
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-icon" style={{ background: `${stat.accent}1f`, color: stat.accent }}>
          <Icon />
        </span>
        <span className="stat-label">{stat.label}</span>
      </div>
      <div className="stat-card-bottom">
        <div>
          <h2>{stat.value}</h2>
          <p className="stat-change">
            <FaArrowUp /> {stat.change}
            <span className="stat-change-muted"> vs last month</span>
          </p>
        </div>
        <div className="stat-spark">
          <ResponsiveContainer width={90} height={44}>
            <LineChart data={sparkData}>
              <Line type="monotone" dataKey="v" stroke={stat.accent} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function currency(n) {
  if (n >= 1000000) return `₦${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
  if (n >= 1000) return `₦${Math.round(n / 1000)}K`;
  return `₦${n}`;
}

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welcome back, Administrator" emoji="👋" />

      <section className="hero-banner">
        <div className="hero-text">
          <span className="hero-eyebrow">Keke Administration System</span>
          <h2>Manage Your Keke Union Professionally</h2>
          <p>Register riders, monitor payments, manage unions, generate reports and oversee every activity from one dashboard.</p>
          <button className="hero-btn">Explore Dashboard →</button>
        </div>
        <div className="hero-image">
          <img src={heroPhoto} alt="Row of registered kekes" className="hero-photo-art" />
        </div>
      </section>

      <section className="stats-grid">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section className="charts-grid">
        <div className="card revenue-card">
          <div className="card-header">
            <h3><FaChartBar className="card-header-icon" /> Revenue Overview</h3>
            <select className="range-select" defaultValue="9">
              <option value="9">Last 9 months</option>
              <option value="6">Last 6 months</option>
              <option value="3">Last 3 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eef0f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9aa0b4" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9aa0b4" }} tickFormatter={currency} width={48} />
              <Tooltip formatter={(v) => currency(v)} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revenueFill)" dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card status-card">
          <div className="card-header">
            <h3><FaTaxi className="card-header-icon" /> Keke Status</h3>
          </div>
          <div className="status-body">
            <div className="donut-wrap">
              <ResponsiveContainer width={170} height={170}>
                <PieChart>
                  <Pie data={KEKE_STATUS} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2} stroke="none">
                    {KEKE_STATUS.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <strong>{TOTAL_KEKES.toLocaleString()}</strong>
                <span>Total Kekes</span>
              </div>
            </div>
            <ul className="status-legend">
              {KEKE_STATUS.map((s) => (
                <li key={s.name}>
                  <span><i style={{ background: s.color }} />{s.name}</span>
                  <b>{s.value} ({Math.round((s.value / TOTAL_KEKES) * 100)}%)</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="lists-grid">
        <div className="card">
          <div className="card-header">
            <h3><FaMoneyCheckAlt className="card-header-icon" /> Recent Payments</h3>
            <Link to="/payments" className="view-all">View all →</Link>
          </div>
          <table className="payments-table">
            <thead>
              <tr><th>Name</th><th>Amount</th><th>Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {RECENT_PAYMENTS.map((p) => (
                <tr key={p.name}>
                  <td>
                    <div className="avatar-cell">
                      <Avatar name={p.name} size={28} />
                      <div className="avatar-name">{p.name}</div>
                    </div>
                  </td>
                  <td>{p.amount}</td>
                  <td>{p.date}</td>
                  <td><span className="status-pill">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h3><FaBullhorn className="card-header-icon" /> Recent Notices</h3>
            <Link to="/notices" className="view-all">View all →</Link>
          </div>
          <ul className="notice-list">
            {RECENT_NOTICES.map((n) => {
              const Icon = n.icon;
              return (
                <li key={n.title}>
                  <span className="notice-icon" style={{ background: `${n.color}1f`, color: n.color }}>
                    <Icon />
                  </span>
                  <div className="notice-text">
                    <h4>{n.title}</h4>
                    <p>{n.detail}</p>
                  </div>
                  <span className="notice-date">{n.date}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card">
          <div className="card-header">
            <h3><FaClock className="card-header-icon" /> Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            <Link to="/members" className="quick-action" style={{ "--qa-color": "#3b82f6" }}><FaUserPlus /> Register Member</Link>
            <Link to="/kekes" className="quick-action" style={{ "--qa-color": "#f5a623" }}><FaTaxi /> Register Keke</Link>
            <Link to="/payments" className="quick-action" style={{ "--qa-color": "#22c55e" }}><FaMoneyBillWave /> Record Payment</Link>
            <Link to="/reports" className="quick-action" style={{ "--qa-color": "#7c3aed" }}><FaChartBar /> Generate Report</Link>
            <Link to="/messages" className="quick-action span-2" style={{ "--qa-color": "#0891b2" }}><FaEnvelope /> Message Admins</Link>
          </div>

          <div className="card-header activities-header">
            <h3><FaClock className="card-header-icon" /> Recent Activities</h3>
            <Link to="/activity-log" className="view-all">View all →</Link>
          </div>
          <ul className="activity-list">
            {RECENT_ACTIVITIES.map((a) => (
              <li key={a.text}>
                <i style={{ background: a.color }} />
                <span>{a.text}</span>
                <small>{a.time}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}