import React from "react";
import { FaFileMedical } from "react-icons/fa";

export default function DoctorCareSheets({ careSheets }: any) {
  return (
    <div className="p-4 rounded shadow mt-4" style={{ background: 'var(--card-bg)' }}>
      <h3 className="font-semibold mb-3 accent-text">Feuilles de soins récentes</h3>
      {careSheets && careSheets.length > 0 ? (
        <ul className="space-y-3">
          {careSheets.map((f: any) => (
            <li key={f._id} className="p-3 rounded-md border flex items-start gap-4" style={{ background: '#ffffffcc' }}>
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-600">
                <FaFileMedical />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{f.patientId?.prenom} {f.patientId?.nom}</p>
                  <p className="text-sm text-gray-500">{f.createdAt ? new Date(f.createdAt).toLocaleDateString() : ''}</p>
                </div>
                <p className="text-sm accent-muted mt-2">{f.diagnostic ? f.diagnostic.substring(0, 160) : "Aucun résumé"}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <span>Montant: <strong className="accent-text">{f.facturation?.montantTotal ?? '—'} MAD</strong></span>
                  <a href={`/feuilles/view/${f._id}`} className="text-sm text-indigo-600 hover:underline">Voir</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucune feuille de soin récente.</p>
      )}
    </div>
  );
}
