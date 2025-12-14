import React from "react";
import { FaUser } from "react-icons/fa";

export default function DoctorPatients({ patients }: any) {
  return (
    <div className="p-4 rounded shadow" style={{ background: 'var(--card-bg)' }}>
      <h3 className="font-semibold mb-3 accent-text">Patients récents</h3>
      {patients && patients.length > 0 ? (
        <ul className="space-y-3">
          {patients.map((p: any) => (
            <li key={p._id} className="flex items-center justify-between p-3 rounded-md border" style={{ background: '#ffffffcc' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-500">
                  <FaUser />
                </div>
                <div>
                  <p className="font-medium">{p.prenom} {p.nom}</p>
                  <p className="text-sm accent-muted">{p.telephone || '—'}</p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ''}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucun patient trouvé.</p>
      )}
    </div>
  );
}
