import React from "react";
import { Bell } from "lucide-react";

export default function DoctorHeader({ doctor, onLogout, notificationsCount = 0 }: any) {
  return (
    <div className="flex items-center justify-between p-4 card">
      <div className="flex items-center gap-4">
        <img
          src={doctor?.avatar || "/logo192.png"}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold accent-text">{doctor?.fullname}</h2>
          <p className="text-sm accent-muted">{doctor?.specialization || "Dentiste"}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded hover:bg-white/10">
          <Bell className="text-gray-700" />
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{notificationsCount}</span>
          )}
        </button>

        <button
          onClick={onLogout}
          className="py-2 px-4 rounded-md hover:opacity-90 accent-btn"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
