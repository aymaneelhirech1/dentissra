import React, { useMemo, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function DoctorPatients({ patients }: any) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!patients) return [];
    const term = q.trim().toLowerCase();
    if (!term) return patients;
    return patients.filter((p: any) => {
      const full = `${p.prenom || ''} ${p.nom || ''}`.toLowerCase();
      return full.includes(term) || (p.telephone || '').includes(term);
    });
  }, [patients, q]);

  return (
    <div className="p-4 card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold accent-text">Patients récents</h3>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Recherche rapide" className="input w-48" />
      </div>
      {filtered && filtered.length > 0 ? (
        <ul className="space-y-3">
          {filtered.map((p: any) => (
            <li key={p._id} className="flex items-center justify-between p-3 rounded-md border card-plain">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-500">
                  <FaUser />
                </div>
                <div>
                  <p className="font-medium">{p.prenom} {p.nom}</p>
                  <p className="text-sm accent-muted">{p.telephone || '—'}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-sm text-gray-500">{p.lastVisit ? new Date(p.lastVisit).toLocaleDateString() : (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '')}</div>
                <a href={`/patients/${p._id}`} className="text-sm px-3 py-1 rounded-md bg-indigo-600 text-white">Dossier médical</a>
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
