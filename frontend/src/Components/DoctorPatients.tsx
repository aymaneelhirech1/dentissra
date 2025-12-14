import React from "react";

export default function DoctorPatients({ patients }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Patients récents</h3>
      {patients && patients.length > 0 ? (
        <ul className="space-y-2">
          {patients.map((p: any) => (
            <li key={p._id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <p className="font-medium">{p.prenom} {p.nom}</p>
                <p className="text-sm text-gray-500">{p.telephone}</p>
              </div>
              <div className="text-right text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucun patient trouvé.</p>
      )}
    </div>
  );
}
