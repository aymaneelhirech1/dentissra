import React from "react";
import RequireFeature from "../../Components/RequireFeature";
import { useSettings } from "../../contexts/SettingsContext";

export default function WhatsAppAutomation() {
  const { settings } = useSettings();

  return (
    <RequireFeature feature="WHATSAPP_AUTOMATION">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">WhatsApp Automation</h2>
        <p className="text-sm text-gray-600 mb-6">Gérez vos notifications et automatisations WhatsApp depuis ici.</p>

        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm">Statut de la connexion:</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <div>Connecté</div>
          </div>

          <div className="mt-6">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">Configurer l'automatisation</button>
          </div>
        </div>
      </div>
    </RequireFeature>
  );
}
