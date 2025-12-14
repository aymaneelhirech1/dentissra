import React from "react";

export default function DoctorNotifications({ notifications, onMarkRead }: any) {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-semibold mb-3">Notifications importantes</h3>
      {notifications && notifications.length > 0 ? (
        <ul className="space-y-2 max-h-60 overflow-auto">
          {notifications.map((n: any) => (
            <li key={n._id} className="p-2 border rounded flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-800">{n.message}</p>
                <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <button
                  onClick={() => onMarkRead && onMarkRead(n._id)}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:opacity-90"
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
