
import { useState } from "react";
import { FaTaxi, FaPen } from "react-icons/fa";

import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import RemovalLog from "../../components/tables/RemovalLog";
import DeleteButton from "../../components/common/DeleteButton";
import RegisterKekeModal from "../../components/modals/RegisterKekeModal";

import { KEKE_STATUS_BADGE, PERMIT_STATUS_BADGE } from "../../constants";

const INITIAL_KEKES = [
  { kekeNo: "KK-0234", plate: "ABJ-234-KM", owner: "Adeola Adebayo", union: "Wuse Union", route: "Wuse - Garki", permit: "Valid", status: "Active" },
  { kekeNo: "KK-0189", plate: "ABJ-189-KM", owner: "Chinedu Okafor", union: "Nyanya Union", route: "Nyanya - CBD", permit: "Valid", status: "In Service" },
  { kekeNo: "KK-0301", plate: "ABJ-301-KM", owner: "Musa Abdullahi", union: "Kubwa Union", route: "Kubwa - Zuba", permit: "Expiring", status: "Under Repair" },
  { kekeNo: "KK-0098", plate: "ABJ-098-KM", owner: "Ibrahim Yusuf", union: "Lugbe Union", route: "Lugbe - Apo", permit: "Valid", status: "Active" },
  { kekeNo: "KK-0410", plate: "ABJ-410-KM", owner: "Emeka Johnson", union: "Gwarinpa Union", route: "Gwarinpa - Life Camp", permit: "Expired", status: "Inactive" },
];

function VehicleThumb({ photoDataUrl }) {
  if (photoDataUrl) {
    return (
      <img
        src={photoDataUrl}
        alt="Vehicle"
        style={{
          width: 40,
          height: 32,
          borderRadius: 8,
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <div className="vehicle-thumb-icon">
      <FaTaxi />
    </div>
  );
}

export default function Kekes() {
  const [kekes, setKekes] = useState(INITIAL_KEKES);
  const [removed, setRemoved] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [editingKeke, setEditingKeke] = useState(null);

  // Update existing Keke
  const handleUpdate = (updatedKeke) => {
    setKekes((prev) =>
      prev.map((k) =>
        k.kekeNo === updatedKeke.kekeNo
          ? { ...k, ...updatedKeke }
          : k
      )
    );
  };

  // Remove Keke and record it in the Removal Log
  const handleRemove = (keke, { reason, notes }) => {
    setKekes((prev) =>
      prev.filter((k) => k.kekeNo !== keke.kekeNo)
    );

    setRemoved((prev) => [
      {
        id: `${keke.kekeNo}-${Date.now()}`,
        record: keke,
        reason,
        notes,
        removedAt: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  // Restore removed Keke
  const handleRestore = (entry) => {
    setKekes((prev) => [entry.record, ...prev]);

    setRemoved((prev) =>
      prev.filter((e) => e.id !== entry.id)
    );
  };

  const columns = [
    {
      key: "vehicle",
      label: "Vehicle",
      sortable: false,
      render: (k) => (
        <VehicleThumb photoDataUrl={k.photoDataUrl} />
      ),
    },

    { key: "kekeNo", label: "Keke No" },
    { key: "plate", label: "Plate No" },
    { key: "owner", label: "Owner" },
    { key: "union", label: "Union" },
    { key: "route", label: "Route", sortable: false },

    {
      key: "permit",
      label: "Permit",
      render: (k) => (
        <span className={`badge ${PERMIT_STATUS_BADGE[k.permit]}`}>
          {k.permit}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (k) => (
        <span className={`badge ${KEKE_STATUS_BADGE[k.status]}`}>
          {k.status}
        </span>
      ),
    },

    {
      key: "actions",
      label: "",
      sortable: false,
      render: (k) => (
        <div className="row-actions">

          {/* Edit Keke */}
          <button
            className="btn-outline"
            onClick={() => setEditingKeke(k)}
            title="Edit Keke"
          >
            <FaPen />
          </button>

          {/* Delete Keke */}
          <DeleteButton
            itemType="Keke"
            itemName={k.kekeNo}
            askReason
            onConfirm={(info) => handleRemove(k, info)}
          />

        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kekes"
        subtitle="Manage all registered Kekes, permits, and vehicle records"
      />

      <DataTable
        columns={columns}
        data={kekes}
        searchKeys={["kekeNo", "plate", "owner"]}
        searchPlaceholder="Search by Keke no, plate no, or owner..."
        pageSize={5}
        actions={
          <button
            className="btn-primary"
            onClick={() => setShowRegister(true)}
          >
            <FaTaxi /> Register Keke
          </button>
        }
      />

      {/* Removal Log */}
      <RemovalLog
        title="Removed Kekes"
        entries={removed}
        nameOf={(k) => `${k.kekeNo} (${k.plate})`}
        onRestore={handleRestore}
      />

      {/* Register Keke */}
      {showRegister && (
        <RegisterKekeModal
          onClose={() => setShowRegister(false)}
          onSave={(newKeke) =>
            setKekes((prev) => [newKeke, ...prev])
          }
        />
      )}

      {/* Edit Keke */}
      {editingKeke && (
        <RegisterKekeModal
          keke={editingKeke}
          onClose={() => setEditingKeke(null)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
}
