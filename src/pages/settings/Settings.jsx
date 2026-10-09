import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import PageHeader from "../../components/layout/PageHeader";
import ManageAdminsModal from "../../components/modals/ManageAdminsModal";
import { useSiteSettings } from "../../context/SiteSettingsContext";

export default function Settings() {
  const { settings, updateSettings } = useSiteSettings();
  const [showAdmins, setShowAdmins] = useState(false);
  const fileInputRef = useRef(null);

  // Draft theme state: colors only actually apply once "Apply Theme"
  // is clicked, so you can experiment without every keystroke
  // repainting the whole app.
  const [draftTheme, setDraftTheme] = useState({
    primaryColor: settings.primaryColor,
    secondaryColor: settings.secondaryColor,
    backgroundColor: settings.backgroundColor,
  });
  const [applied, setApplied] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: in a real build, upload the file to your backend/storage
    // and save the returned URL instead of a base64 data URL.
    const reader = new FileReader();
    reader.onload = () => {
      updateSettings({ logoDataUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleApplyTheme = () => {
    updateSettings(draftTheme);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  const handleResetTheme = () => {
    const defaults = { primaryColor: "#0B1F4D", secondaryColor: "#F4B400", backgroundColor: "#F5F7FA" };
    setDraftTheme(defaults);
    updateSettings(defaults);
  };

  const colorField = (label, key) => (
    <div className="form-row">
      <label>{label}</label>
      <div className="color-row">
        <input
          type="color"
          className="color-swatch color-swatch-input"
          value={draftTheme[key]}
          onChange={(e) => setDraftTheme((p) => ({ ...p, [key]: e.target.value.toUpperCase() }))}
        />
        <input
          type="text"
          value={draftTheme[key]}
          onChange={(e) => setDraftTheme((p) => ({ ...p, [key]: e.target.value }))}
        />
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage site settings, branding, and user permissions"
      />

      <div className="settings-grid">
        <div className="card settings-section">
          <h4>Branding</h4>
          <p className="hint">Logo, website name, and motto shown across the site.</p>

          <div className="logo-upload">
            {settings.logoDataUrl ? (
              <img
                src={settings.logoDataUrl}
                alt="Current logo"
                className="logo-preview"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <div className="logo-preview">KERA</div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleLogoChange}
            />
            <button className="btn-outline" onClick={() => fileInputRef.current?.click()}>
              Change Logo
            </button>
          </div>

          <div className="form-row">
            <label>Website Name</label>
            <input
              type="text"
              value={settings.websiteName}
              onChange={(e) => updateSettings({ websiteName: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label>Association Motto</label>
            <input
              type="text"
              value={settings.motto}
              onChange={(e) => updateSettings({ motto: e.target.value })}
            />
          </div>
        </div>

        <div className="card settings-section">
          <h4>Contact Information</h4>
          <p className="hint">Shown in the footer and contact section.</p>

          <div className="form-row">
            <label>Contact Email</label>
            <input type="email" defaultValue="info@kera-abuja.org" />
          </div>

          <div className="form-row">
            <label>Phone Number</label>
            <input type="text" defaultValue="0803 000 1111" />
          </div>

          <div className="form-row">
            <label>Address</label>
            <textarea rows={3} defaultValue="Union Hall, Wuse, Abuja, FCT" />
          </div>
        </div>

        <div className="card settings-section">
          <h4>Theme Colors</h4>
          <p className="hint">Applied live across the sidebar, navbar, and highlights.</p>

          {colorField("Primary — Navy Blue", "primaryColor")}
          {colorField("Secondary — Gold", "secondaryColor")}
          {colorField("Background", "backgroundColor")}

          <div className="theme-actions">
            <button className="btn-outline" onClick={handleResetTheme}>
              Reset to Default
            </button>
            <button className="btn-gold" onClick={handleApplyTheme}>
              {applied ? <><FaCheck /> Applied</> : "Apply Theme"}
            </button>
          </div>
        </div>

        <div className="card settings-section">
          <h4>Administrator Accounts</h4>
          <p className="hint">Manage who has Super Admin or Admin access.</p>
          <button className="btn-primary" onClick={() => setShowAdmins(true)}>
            Manage Admin Accounts
          </button>
        </div>
      </div>

      {showAdmins && <ManageAdminsModal onClose={() => setShowAdmins(false)} />}
    </>
  );
}