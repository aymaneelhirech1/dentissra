import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import fallbackLogo from "../../assits/Logo.png";

interface SettingsContextType {
  settings: {
    name: string;
    targetLine: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    country: string;
    if: string;
    ice: string;
    cnss: string;
    logo: string;
    adminName: string;
    adminEmail: string;
    adminRole: string;
    adminPhoto: string;
    features?: string[];
  };
  refreshSettings: () => Promise<void>;
  loading: boolean;
}

const defaultSettings = {
  name: "Desntissra",
  targetLine: "Votre santé dentaire, notre priorité",
  email: "",
  phone: "",
  website: "",
  address: "",
  country: "Maroc",
  if: "",
  ice: "",
  cnss: "",
  logo: "",
  adminName: "",
  adminEmail: "",
  adminRole: "Admin",
  adminPhoto: "",
  features: [],
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  refreshSettings: async () => {},
  loading: true,
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refreshSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/settings/cabinet", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        setSettings(res.data);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // set default document title and favicon
    if (typeof document !== "undefined") {
      document.title = "Desntissra";
      const existing = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      if (existing) existing.href = "/logo.svg";
    }

    // load settings from API and then update title/favicon when available
    refreshSettings();
  }, []);

  // update title and favicon when settings change
  useEffect(() => {
    if (!settings) return;
    if (typeof document === "undefined") return;

    document.title = settings.name || "Desntissra";

    try {
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      if (favicon) {
        favicon.href = settings.logo || fallbackLogo || "/logo.svg";
      }
    } catch (err) {
      // ignore DOM errors in SSR contexts
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}
