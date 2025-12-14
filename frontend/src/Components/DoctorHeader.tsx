import React from "react";

export default function DoctorHeader({ doctor, onLogout }: any) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-md shadow">
      <div className="flex items-center gap-4">
        <img
          src={doctor?.avatar || "/logo192.png"}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold">{doctor?.fullname}</h2>
          <p className="text-sm text-gray-500">{doctor?.specialization || "Dentiste"}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-md hover:opacity-90"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
