import keraLogo from "../../assets/logos/kera-logo.png";
import { useSiteSettings } from "../../context/SiteSettingsContext";
import "../../styles/logo.css";

/**
 * KERA brand mark. Uses the bundled artwork by default, but if a
 * Super Admin has uploaded a custom logo via Settings → Change Logo,
 * that override (stored in SiteSettingsContext) is used instead —
 * so changing it there updates the Sidebar, ID card, and Login page
 * everywhere at once.
 *
 * <Logo />           → default size (48px wide, auto height)
 * <Logo size={80} /> → bigger, e.g. for the auth pages
 */
export default function Logo({ size = 48, className = "" }) {
  const { settings } = useSiteSettings();
  const src = settings.logoDataUrl || keraLogo;

  return (
    <img
      src={src}
      alt={`${settings.websiteName} logo`}
      className={`kera-logo ${className}`}
      style={{ width: size, height: "auto" }}
    />
  );
}