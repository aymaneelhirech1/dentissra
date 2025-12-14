import React from "react";

export default function DoctorCareSheets({ careSheets }: any) {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-semibold mb-3">Feuilles de soins récentes</h3>
      {careSheets && careSheets.length > 0 ? (
        <ul className="space-y-2">
          {careSheets.map((f: any) => (
            <li key={f._id} className="p-3 border rounded flex items-start gap-4">
              <div className="flex-1">
                <p className="font-medium">Patient: {f.patientId?.prenom} {f.patientId?.nom}</p>
                <p className="text-sm text-gray-600">Date: {new Date(f.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700 mt-2">{f.diagnostic ? f.diagnostic.substring(0, 160) : "Aucun résumé"}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p className="mb-1">Montant: {f.facturation?.montantTotal ?? "—"} MAD</p>
                <a href={`/feuilles/view/${f._id}`} className="text-blue-600 hover:underline">Voir</a>
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
