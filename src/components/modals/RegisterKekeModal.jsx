import { useState } from "react";
import Modal from "./Modal";

const BLANK_FORM = {
  plateNo: "", chassisNo: "", engineNo: "", brand: "", color: "",
  vehiclePhotoDataUrl: null,
  ownerName: "", driverOne: "", driverTwo: "",
  union: "", route: "",
  permitStatus: "Valid", insuranceStatus: "Insured", vehicleStatus: "Active", roadWorthiness: "Valid",
  remarks: "",
};

export default function RegisterKekeModal({ keke, onClose, onSave }) {
  const isEdit = !!keke;

  const [form, setForm] = useState(() =>
    isEdit
      ? {
          ...BLANK_FORM,
          plateNo: keke.plate || "",
          ownerName: keke.owner || "",
          union: keke.union || "",
          route: keke.route || "",
          permitStatus: keke.permit || "Valid",
          vehicleStatus: keke.status || "Active",
          vehiclePhotoDataUrl: keke.photoDataUrl || null,
          chassisNo: keke.chassisNo || "",
          engineNo: keke.engineNo || "",
          brand: keke.brand || "",
          color: keke.color || "",
          driverOne: keke.driverOne || "",
          driverTwo: keke.driverTwo || "",
          insuranceStatus: keke.insuranceStatus || "Insured",
          roadWorthiness: keke.roadWorthiness || "Valid",
          remarks: keke.remarks || "",
        }
      : BLANK_FORM
  );
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, vehiclePhotoDataUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.plateNo || !form.ownerName || !form.union || !form.route) {
      setError("Plate number, owner name, union, and route are required.");
      return;
    }

    if (isEdit) {
      // TODO: replace with a real API call, e.g. await api.put(`/kekes/${keke.kekeNo}`, form)
      onSave({
        ...keke, // keeps kekeNo untouched
        plate: form.plateNo,
        owner: form.ownerName,
        union: form.union,
        route: form.route,
        permit: form.permitStatus,
        status: form.vehicleStatus,
        photoDataUrl: form.vehiclePhotoDataUrl,
        ...form,
      });
    } else {
      // TODO: replace with a real API call, e.g. await api.post("/kekes", form)
      onSave({
        kekeNo: `KK-${Math.floor(1000 + Math.random() * 9000)}`,
        plate: form.plateNo,
        owner: form.ownerName,
        union: form.union,
        route: form.route,
        permit: form.permitStatus,
        status: form.vehicleStatus,
        photoDataUrl: form.vehiclePhotoDataUrl,
      });
    }
    onClose();
  };

  return (
    <Modal
      title={isEdit ? `Edit Keke ${keke.kekeNo}` : "Register Keke"}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" form="register-keke-form" className="btn-primary">
            {isEdit ? "Save Changes" : "Register Keke"}
          </button>
        </>
      }
    >
      <form id="register-keke-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <p className="form-section-title">Vehicle Details</p>
        <div className="form-grid">
          <div className="form-field span-2">
            <label>Vehicle Image</label>
            <div className="form-file-row">
              {form.vehiclePhotoDataUrl ? (
                <img className="form-file-preview" src={form.vehiclePhotoDataUrl} alt="Vehicle preview" />
              ) : (
                <div className="form-file-preview vehicle-placeholder">🚗</div>
              )}
              <input type="file" accept="image/*" onChange={handleImage} />
            </div>
          </div>

          <div className="form-field">
            <label>Plate Number</label>
            <input type="text" value={form.plateNo} onChange={set("plateNo")} placeholder="e.g. ABJ-234-KM" />
          </div>
          <div className="form-field">
            <label>Chassis Number</label>
            <input type="text" value={form.chassisNo} onChange={set("chassisNo")} />
          </div>
          <div className="form-field">
            <label>Engine Number</label>
            <input type="text" value={form.engineNo} onChange={set("engineNo")} />
          </div>
          <div className="form-field">
            <label>Vehicle Brand</label>
            <input type="text" value={form.brand} onChange={set("brand")} placeholder="e.g. Bajaj RE" />
          </div>
          <div className="form-field">
            <label>Vehicle Color</label>
            <input type="text" value={form.color} onChange={set("color")} />
          </div>
        </div>

        <p className="form-section-title">Ownership & Drivers</p>
        <div className="form-grid">
          <div className="form-field">
            <label>Owner Name</label>
            <input type="text" value={form.ownerName} onChange={set("ownerName")} />
          </div>
          <div className="form-field">
            <label>First Driver</label>
            <input type="text" value={form.driverOne} onChange={set("driverOne")} />
          </div>
          <div className="form-field span-2">
            <label>Second Driver <span className="optional">(optional)</span></label>
            <input type="text" value={form.driverTwo} onChange={set("driverTwo")} />
          </div>
        </div>

        <p className="form-section-title">Assignment & Status</p>
        <div className="form-grid">
          <div className="form-field">
            <label>Union</label>
            <select value={form.union} onChange={set("union")}>
              <option value="">Select union</option>
              <option>Wuse Union</option><option>Nyanya Union</option>
              <option>Kubwa Union</option><option>Lugbe Union</option><option>Gwarinpa Union</option>
            </select>
          </div>
          <div className="form-field">
            <label>Route</label>
            <input type="text" value={form.route} onChange={set("route")} placeholder="e.g. Wuse - Garki" />
          </div>
          <div className="form-field">
            <label>Permit Status</label>
            <select value={form.permitStatus} onChange={set("permitStatus")}>
              <option>Valid</option><option>Expiring</option><option>Expired</option>
            </select>
          </div>
          <div className="form-field">
            <label>Insurance Status</label>
            <select value={form.insuranceStatus} onChange={set("insuranceStatus")}>
              <option>Insured</option><option>Not Insured</option>
            </select>
          </div>
          <div className="form-field">
            <label>Vehicle Status</label>
            <select value={form.vehicleStatus} onChange={set("vehicleStatus")}>
              <option>Active</option><option>In Service</option><option>Under Repair</option><option>Inactive</option>
            </select>
          </div>
          <div className="form-field">
            <label>Road Worthiness</label>
            <select value={form.roadWorthiness} onChange={set("roadWorthiness")}>
              <option>Valid</option><option>Expired</option>
            </select>
          </div>
          <div className="form-field span-2">
            <label>Remarks <span className="optional">(optional)</span></label>
            <textarea rows={2} value={form.remarks} onChange={set("remarks")} />
          </div>
        </div>
      </form>
    </Modal>
  );
}