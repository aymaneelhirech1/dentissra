import React from "react";
import { useSettings } from "../contexts/SettingsContext";
import { FaLock } from "react-icons/fa";

export default function RequireFeature({
  feature,
  children,
}: {
  feature: string;
  children: React.ReactNode;
}) {
  const { settings } = useSettings();
  const enabled = settings?.features?.includes(feature);

  if (enabled) return <>{children}</>;

  return (
    <div className="p-6 bg-white rounded shadow text-center">
      <div className="flex items-center justify-center text-4xl text-gray-400 mb-4">
        <FaLock />
      </div>
      <h3 className="text-lg font-semibold">Fonctionnalité Premium</h3>
      <p className="text-sm text-gray-500 mt-2">Cette fonctionnalité ({feature}) n'est pas activée pour votre clinique.</p>
      <div className="mt-4">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Contacter le support / Upgrader</button>
      </div>
    </div>
  );
}
