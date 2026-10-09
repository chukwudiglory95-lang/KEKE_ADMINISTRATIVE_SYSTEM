import { useState } from "react";
import { FaCamera, FaSave, FaTimes } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import Avatar from "../../components/common/Avatar";
import { useAuth } from "../../context/AuthContext";
import "./profile.css";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateProfile({ photoDataUrl: reader.result });
    reader.readAsDataURL(file);
  };

  const startEdit = () => {
    setDraft({ name: user?.name || "", phone: user?.phone || "" });
    setEditing(true);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    updateProfile({ name: draft.name, phone: draft.phone });
    setEditing(false);
  };

  if (!user) return null;

  return (
    <>
      <PageHeader title="My Profile" subtitle="Your account details" />

      <div className="profile-header card">
        <div className="profile-photo-wrap">
          {user.photoDataUrl ? (
            <img className="profile-photo" src={user.photoDataUrl} alt={user.name} />
          ) : (
            <Avatar name={user.name || user.email} size={72} className="profile-photo" />
          )}
          <label className="profile-photo-edit">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
          </label>
        </div>

        <div className="profile-header-info">
          {editing ? (
            <form className="profile-edit-form" onSubmit={saveEdit}>
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                placeholder="Full name"
              />
              <input
                type="text"
                value={draft.phone}
                onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))}
                placeholder="Phone number"
              />
              <div className="profile-edit-actions">
                <button type="submit" className="btn-primary">
                  <FaSave /> Save
                </button>
                <button type="button" className="btn-outline" onClick={() => setEditing(false)}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.email} {user.phone && `· ${user.phone}`}</p>
              <div className="profile-badges">
                <span className="badge badge-blue">{user.role}</span>
                <span className="badge badge-green">Active</span>
              </div>
            </>
          )}
        </div>

        {!editing && (
          <button className="btn-outline" onClick={startEdit}>
            Edit Profile
          </button>
        )}
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h4 className="profile-section-title">Account Details</h4>
        <dl className="profile-detail-list">
          <dt>Email</dt><dd>{user.email}</dd>
          <dt>Role</dt><dd>{user.role}</dd>
          <dt>Phone</dt><dd>{user.phone || "Not set"}</dd>
        </dl>
      </div>
    </>
  );
}