import { useState } from "react";
import { FaUserPlus, FaIdCard, FaPen } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import IDCardModal from "../../components/modals/IDCardModal";
import RegisterMemberModal from "../../components/modals/RegisterMemberModal";
import Avatar from "../../components/common/Avatar";
import { MEMBER_STATUS_BADGE, FEE_STATUS_BADGE } from "../../constants";

const INITIAL_MEMBERS = [
  { id: "KERA-0234", name: "Adeola Adebayo", membershipNo: "KERA-0234", phone: "0803 555 1122", union: "Wuse Union", route: "Wuse - Garki", kekeNo: "KK-0234", status: "Active", fee: "Paid" },
  { id: "KERA-0189", name: "Chinedu Okafor", membershipNo: "KERA-0189", phone: "0705 221 8890", union: "Nyanya Union", route: "Nyanya - CBD", kekeNo: "KK-0189", status: "Active", fee: "Paid" },
  { id: "KERA-0301", name: "Musa Abdullahi", membershipNo: "KERA-0301", phone: "0812 903 4471", union: "Kubwa Union", route: "Kubwa - Zuba", kekeNo: "KK-0301", status: "Pending", fee: "Owing" },
  { id: "KERA-0098", name: "Ibrahim Yusuf", membershipNo: "KERA-0098", phone: "0906 774 2201", union: "Lugbe Union", route: "Lugbe - Apo", kekeNo: "KK-0098", status: "Active", fee: "Paid" },
  { id: "KERA-0410", name: "Emeka Johnson", membershipNo: "KERA-0410", phone: "0701 336 9982", union: "Gwarinpa Union", route: "Gwarinpa - Life Camp", kekeNo: "KK-0410", status: "Suspended", fee: "Owing" },
];

export default function Members() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [idCardMember, setIdCardMember] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const columns = [
    {
      key: "name",
      label: "Member",
      render: (m) => (
        <div className="avatar-cell">
          {m.photoDataUrl ? (
            <img src={m.photoDataUrl} alt={m.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <Avatar name={m.name} size={32} />
          )}
          <div className="avatar-name">{m.name}</div>
        </div>
      ),
    },
    { key: "membershipNo", label: "Membership No" },
    { key: "phone", label: "Phone", sortable: false },
    { key: "union", label: "Union" },
    { key: "route", label: "Route", sortable: false },
    { key: "kekeNo", label: "Keke No" },
    {
      key: "status",
      label: "Status",
      render: (m) => <span className={`badge ${MEMBER_STATUS_BADGE[m.status]}`}>{m.status}</span>,
    },
    {
      key: "fee",
      label: "Fee",
      render: (m) => <span className={`badge ${FEE_STATUS_BADGE[m.fee]}`}>{m.fee}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: (m) => (
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn-outline" onClick={() => setEditingMember(m)} title="Edit Member">
            <FaPen />
          </button>
          <button className="btn-outline" onClick={() => setIdCardMember(m)} title="Generate ID Card">
            <FaIdCard /> ID Card
          </button>
        </div>
      ),
    },
  ];

  const handleUpdate = (updatedMember) => {
    setMembers((prev) => prev.map((m) => (m.id === updatedMember.id ? { ...m, ...updatedMember } : m)));
  };

  return (
    <>
      <PageHeader
        title="Members"
        subtitle="Manage all registered riders and their profiles"
      />

      <DataTable
        columns={columns}
        data={members}
        searchKeys={["name", "membershipNo", "phone"]}
        searchPlaceholder="Search by name, membership no, or phone..."
        pageSize={5}
        actions={
          <button className="btn-primary" onClick={() => setShowRegister(true)}>
            <FaUserPlus /> Register Member
          </button>
        }
      />

      {showRegister && (
        <RegisterMemberModal
          onClose={() => setShowRegister(false)}
          onSave={(newMember) =>
            setMembers((prev) => [{ id: newMember.membershipNo, ...newMember }, ...prev])
          }
        />
      )}

      {editingMember && (
        <RegisterMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleUpdate}
        />
      )}

      {idCardMember && (
        <IDCardModal
          member={idCardMember}
          onClose={() => setIdCardMember(null)}
        />
      )}
    </>
  );
}