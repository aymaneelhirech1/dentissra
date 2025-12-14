import React, { useEffect, useState } from "react";
import DoctorHeader from "../Components/DoctorHeader";
import DoctorStats from "../Components/DoctorStats";
import DoctorAppointments from "../Components/DoctorAppointments";
import DoctorPatients from "../Components/DoctorPatients";

export default function DoctorDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");
      const res = await fetch("http://localhost:5000/api/doctor/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Fetch error");
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-6 page-with-watermark page-watermark">
      <DoctorHeader doctor={data?.doctor} onLogout={handleLogout} />

      <DoctorStats stats={{...data.stats, appointmentsToday: data.appointmentsToday?.length}} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DoctorAppointments appointments={data.appointmentsToday} />
        </div>
        <div>
          <DoctorPatients patients={data.recentPatients} />
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3">Notifications importantes</h3>
            <p className="text-sm text-gray-500">Aucune notification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
