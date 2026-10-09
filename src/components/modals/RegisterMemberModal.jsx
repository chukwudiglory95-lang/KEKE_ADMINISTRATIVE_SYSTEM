import { useState } from "react";
import Modal from "./Modal";
import Avatar from "../common/Avatar";

const BLANK_FORM = {
  fullName: "",
  photoDataUrl: null,
  dob: "",
  gender: "",
  phone: "",
  altPhone: "",
  address: "",
  nationality: "Nigerian",
  stateOfOrigin: "",
  lga: "",
  nin: "",
  licenseNo: "",
  licenseExpiry: "",
  nextOfKinName: "",
  nextOfKinPhone: "",
  emergencyContact: "",
  bloodGroup: "",
  union: "",
  route: "",
  feeStatus: "Paid",
};

export default function RegisterMemberModal({ member, onClose, onSave }) {
  const isEdit = !!member;

  const [form, setForm] = useState(() =>
    isEdit
      ? {
          ...BLANK_FORM,
          fullName: member.name || "",
          phone: member.phone || "",
          union: member.union || "",
          route: member.route || "",
          feeStatus: member.fee || "Paid",
          photoDataUrl: member.photoDataUrl || null,
          // Fields below aren't shown in the table, so they only
          // carry over if you passed the full original record back in.
          dob: member.dob || "",
          gender: member.gender || "",
          altPhone: member.altPhone || "",
          address: member.address || "",
          nationality: member.nationality || "Nigerian",
          stateOfOrigin: member.stateOfOrigin || "",
          lga: member.lga || "",
          nin: member.nin || "",
          licenseNo: member.licenseNo || "",
          licenseExpiry: member.licenseExpiry || "",
          nextOfKinName: member.nextOfKinName || "",
          nextOfKinPhone: member.nextOfKinPhone || "",
          emergencyContact: member.emergencyContact || "",
          bloodGroup: member.bloodGroup || "",
        }
      : BLANK_FORM
  );
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Data URL (not a blob URL) so it survives being stored in state
    // and doesn't get revoked when this modal unmounts.
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, photoDataUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.phone || !form.union || !form.route) {
      setError("Full name, phone number, union, and route are required.");
      return;
    }

    if (isEdit) {
      // TODO: replace with a real API call, e.g. await api.put(`/members/${member.id}`, form)
      onSave({
        ...member, // keeps id, membershipNo, kekeNo, status untouched
        name: form.fullName,
        phone: form.phone,
        union: form.union,
        route: form.route,
        fee: form.feeStatus,
        photoDataUrl: form.photoDataUrl,
        ...form, // carries the extra detail fields (dob, address, etc.) too
      });
    } else {
      // TODO: replace with a real API call, e.g. await api.post("/members", form)
      onSave({
        name: form.fullName,
        membershipNo: `KERA-${Math.floor(1000 + Math.random() * 9000)}`,
        phone: form.phone,
        union: form.union,
        route: form.route,
        kekeNo: "—",
        status: "Pending",
        fee: form.feeStatus,
        photoDataUrl: form.photoDataUrl,
      });
    }
    onClose();
  };

  return (
    <Modal
      title={isEdit ? `Edit ${member.name}` : "Register Member"}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" form="register-member-form" className="btn-primary">
            {isEdit ? "Save Changes" : "Register Member"}
          </button>
        </>
      }
    >
      <form id="register-member-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}

        <p className="form-section-title">Personal Information</p>
        <div className="form-grid">
          <div className="form-field span-2">
            <label>Passport Photograph</label>
            <div className="form-file-row">
              {form.photoDataUrl ? (
                <img className="form-file-preview" src={form.photoDataUrl} alt="Passport preview" />
              ) : (
                <Avatar name={form.fullName || "New Member"} size={56} className="form-file-preview" />
              )}
              <input type="file" accept="image/*" onChange={handlePhoto} />
            </div>
          </div>

          <div className="form-field">
            <label>Full Name</label>
            <input type="text" value={form.fullName} onChange={set("fullName")} placeholder="e.g. Adeola Adebayo" />
          </div>
          <div className="form-field">
            <label>Date of Birth</label>
            <input type="date" value={form.dob} onChange={set("dob")} />
          </div>
          <div className="form-field">
            <label>Gender</label>
            <select value={form.gender} onChange={set("gender")}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="form-field">
            <label>Blood Group <span className="optional">(optional)</span></label>
            <select value={form.bloodGroup} onChange={set("bloodGroup")}>
              <option value="">Select</option>
              <option>O+</option><option>O-</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
            </select>
          </div>
        </div>

        <p className="form-section-title">Contact & Address</p>
        <div className="form-grid">
          <div className="form-field">
            <label>Phone Number</label>
            <input type="text" value={form.phone} onChange={set("phone")} placeholder="0803 000 0000" />
          </div>
          <div className="form-field">
            <label>Alternate Phone Number</label>
            <input type="text" value={form.altPhone} onChange={set("altPhone")} />
          </div>
          <div className="form-field span-2">
            <label>Residential Address</label>
            <input type="text" value={form.address} onChange={set("address")} />
          </div>
          <div className="form-field">
            <label>Nationality</label>
            <input type="text" value={form.nationality} onChange={set("nationality")} />
          </div>
          <div className="form-field">
            <label>State of Origin</label>
            <input type="text" value={form.stateOfOrigin} onChange={set("stateOfOrigin")} />
          </div>
          <div className="form-field">
            <label>Local Government</label>
            <input type="text" value={form.lga} onChange={set("lga")} />
          </div>
          <div className="form-field">
            <label>NIN <span className="optional">(optional)</span></label>
            <input type="text" value={form.nin} onChange={set("nin")} />
          </div>
        </div>

        <p className="form-section-title">License & Next of Kin</p>
        <div className="form-grid">
          <div className="form-field">
            <label>Driver's License Number</label>
            <input type="text" value={form.licenseNo} onChange={set("licenseNo")} />
          </div>
          <div className="form-field">
            <label>License Expiry Date</label>
            <input type="date" value={form.licenseExpiry} onChange={set("licenseExpiry")} />
          </div>
          <div className="form-field">
            <label>Next of Kin Name</label>
            <input type="text" value={form.nextOfKinName} onChange={set("nextOfKinName")} />
          </div>
          <div className="form-field">
            <label>Next of Kin Phone</label>
            <input type="text" value={form.nextOfKinPhone} onChange={set("nextOfKinPhone")} />
          </div>
          <div className="form-field span-2">
            <label>Emergency Contact</label>
            <input type="text" value={form.emergencyContact} onChange={set("emergencyContact")} />
          </div>
        </div>

        <p className="form-section-title">Union Assignment</p>
        <div className="form-grid">
          <div className="form-field">
            <label>Assigned Union</label>
            <select value={form.union} onChange={set("union")}>
              <option value="">Select union</option>
              <option>Wuse Union</option>
              <option>Nyanya Union</option>
              <option>Kubwa Union</option>
              <option>Lugbe Union</option>
              <option>Gwarinpa Union</option>
            </select>
          </div>
          <div className="form-field">
            <label>Assigned Route</label>
            <input type="text" value={form.route} onChange={set("route")} placeholder="e.g. Wuse - Garki" />
          </div>
          <div className="form-field">
            <label>Registration Fee (₦1,000)</label>
            <select value={form.feeStatus} onChange={set("feeStatus")}>
              <option>Paid</option>
              <option>Owing</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}