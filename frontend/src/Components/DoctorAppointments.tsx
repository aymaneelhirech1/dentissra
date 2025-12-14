import React from "react";

export default function DoctorAppointments({ appointments }: any) {
  return (
    <div className="p-4 card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold mb-3">Rendez-vous du jour</h3>
        <span className="text-sm text-gray-500">{appointments?.length ?? 0} RDV</span>
      </div>

      {appointments && appointments.length > 0 ? (
        <ul className="space-y-2">
          {appointments.map((a: any) => (
            <li key={a._id} className="flex items-center justify-between p-2 border rounded card-plain">
              <div>
                <p className="font-medium">{a.patient?.nom ? `${a.patient?.prenom} ${a.patient?.nom}` : a.patientName || "Patient"}</p>
                <p className="text-sm text-gray-500">{a.motif}</p>
                <p className="text-xs text-gray-400">Type: {a.type || 'Consultation'}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <p className="font-semibold" style={{ color: 'var(--accent-800)' }}>{a.heure || a.time || '—'}</p>
                <a href={`/patients/${a.patient?._id || a.patientId || ''}`} className="py-1 px-3 rounded-md text-sm bg-indigo-600 text-white hover:opacity-90">Ouvrir dossier</a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucun rendez-vous aujourd'hui.</p>
      )}
    </div>
  );
}
