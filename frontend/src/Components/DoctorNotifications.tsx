import React from "react";

export default function DoctorNotifications({ notifications, onMarkRead }: any) {
  return (
    <div className="p-4 mt-4 card">
      <h3 className="font-semibold mb-3 accent-text">Notifications importantes</h3>
      {notifications && notifications.length > 0 ? (
        <ul className="space-y-2 max-h-60 overflow-auto">
          {notifications.map((n: any) => (
            <li key={n._id} className="p-2 rounded-md border flex items-center justify-between" style={{ background: '#ffffffcc' }}>
              <div>
                <p className="text-sm text-gray-800">{n.message}</p>
                <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <button
                  onClick={() => onMarkRead && onMarkRead(n._id)}
                  className="text-sm px-3 py-1 rounded-md accent-btn"
                >
                  Marquer lu
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Aucune notification.</p>
      )}
    </div>
  );
}
