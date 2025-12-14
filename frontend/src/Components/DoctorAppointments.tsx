import React from "react";

export default function DoctorAppointments({ appointments }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Rendez-vous du jour</h3>
      {appointments && appointments.length > 0 ? (
        <ul className="space-y-2">
          {appointments.map((a: any) => (
            <li key={a._id} className="flex items-center justify-between p-2 border rounded" style={{ background: 'var(--card-bg)' }}>
              <div>
                <p className="font-medium">{a.patient?.nom ? `${a.patient?.prenom} ${a.patient?.nom}` : a.patientName || "Patient"}</p>
                <p className="text-sm text-gray-500">{a.motif}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold" style={{ color: 'var(--accent-800)' }}>{a.heure}</p>
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
