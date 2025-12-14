import React from "react";

export default function DoctorStats({ stats }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Patients suivis</p>
        <p className="text-2xl font-bold">{stats?.patientsCount ?? 0}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Feuilles de soins</p>
        <p className="text-2xl font-bold">{stats?.careSheetsCount ?? 0}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Rendez-vous aujourd'hui</p>
        <p className="text-2xl font-bold">{stats?.appointmentsToday ?? 0}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Autres</p>
        <p className="text-2xl font-bold">—</p>
      </div>
    </div>
  );
}
