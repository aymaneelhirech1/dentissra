import React, { useState } from "react";

export default function DoctorQuickRecord({ patient }: any) {
  const [notes, setNotes] = useState("");
  const [diagnostic, setDiagnostic] = useState("");

  const save = async () => {
    // Placeholder: implement API call to save quick notes
    console.log("Save quick record", { patientId: patient?._id, notes, diagnostic });
    alert("Notes saved (demo)");
  };

  return (
    <div className="p-4 card">
      <h3 className="font-semibold mb-3 accent-text">Dossier médical rapide</h3>
      <div className="mb-3">
        <label className="block text-sm text-gray-600">Notes rapides</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input w-full h-24 mt-1" />
      </div>
      <div className="mb-3">
        <label className="block text-sm text-gray-600">Diagnostic</label>
        <input value={diagnostic} onChange={(e) => setDiagnostic(e.target.value)} className="input w-full mt-1" />
      </div>
      <div className="flex items-center gap-2">
        <button onClick={save} className="py-2 px-4 rounded accent-btn text-white">Enregistrer</button>
        <button className="py-2 px-4 rounded border">Imprimer feuille</button>
      </div>
    </div>
  );
}
