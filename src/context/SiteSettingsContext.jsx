import { createContext, useContext, useEffect, useState } from "react";

const SiteSettingsContext = createContext(null);

const STORAGE_KEY = "kera_site_settings";
const OVERRIDE_STYLE_ID = "kera-theme-override";

const DEFAULTS = {
  logoDataUrl: null, // null = use the bundled kera-logo.png
  websiteName: "KERA",
  motto: "Unity, Discipline, Progress",
  primaryColor: "#0B1F4D",
  secondaryColor: "#F4B400",
  backgroundColor: "#F5F7FA",
};

// Darkens a hex color by `amount` (0-1) — used for the sidebar's
// gradient second stop so it isn't just a flat color.
function darken(hex, amount = 0.15) {
  const c = hex.replace("#", "");
  const num = parseInt(c.length === 3 ? c.split("").map((x) => x + x).join("") : c, 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  r = Math.max(0, Math.round(r * (1 - amount)));
  g = Math.max(0, Math.round(g * (1 - amount)));
  b = Math.max(0, Math.round(b * (1 - amount)));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function applyTheme(settings) {
  const root = document.documentElement;

  // 1) Set the CSS custom properties every stylesheet is meant to read.
  root.style.setProperty("--color-primary", settings.primaryColor);
  root.style.setProperty("--color-primary-dark", darken(settings.primaryColor, 0.15));
  root.style.setProperty("--color-secondary", settings.secondaryColor);
  root.style.setProperty("--color-bg", settings.backgroundColor);

  // 2) BELT AND SUSPENDERS: also inject a hard override <style> tag
  // with !important rules targeting the most visible elements by
  // class name directly. This guarantees a visible change even if
  // some stylesheet somewhere isn't referencing the CSS variables
  // above (e.g. a stray/duplicate CSS file, or one that still has
  // hardcoded hex colors instead of var(...)).
  let styleTag = document.getElementById(OVERRIDE_STYLE_ID);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = OVERRIDE_STYLE_ID;
    document.head.appendChild(styleTag);
  }

  const { primaryColor, secondaryColor, backgroundColor } = settings;
  const primaryDark = darken(primaryColor, 0.15);

  styleTag.textContent = `
    body, .dashboard, .dashboard-right, .dashboard-main {
      background: ${backgroundColor} !important;
    }
    .sidebar {
      background: linear-gradient(180deg, ${primaryColor} 0%, ${primaryDark} 100%) !important;
    }
    .menu-item.active {
      background: ${secondaryColor} !important;
      color: #171a2e !important;
    }
    .hero-banner {
      background: linear-gradient(120deg, ${primaryColor} 0%, ${primaryDark} 100%) !important;
    }
    .hero-btn, .btn-primary, .btn-gold, .auth-submit, .call-btn, .quick-action {
      background: ${secondaryColor} !important;
      color: #171a2e !important;
      border-color: ${secondaryColor} !important;
    }
    .auth-page {
      background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryDark} 100%) !important;
    }
    .btn-outline {
      border-color: ${secondaryColor} !important;
      color: ${secondaryColor} !important;
    }
  `;
}

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
  });

  // Apply on every mount AND whenever settings change — this is what
  // makes the theme change live, without needing a page refresh.
  useEffect(() => {
    applyTheme(settings);
  }, [settings]);

  const updateSettings = (patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error("useSiteSettings must be used inside <SiteSettingsProvider>");
  return ctx;
}