import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../Components/Sidebar";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaUserMd, 
  FaClock, 
  FaStethoscope, 
  FaPrescription, 
  FaNotesMedical, 
  FaRedoAlt,
  FaSave,
  FaEdit,
  FaTrash,
  FaCalendarPlus,
  FaCalendarCheck
} from "react-icons/fa";

interface Patient {
  _id: string;
  name: string;
  phone: string;
}

interface Dentist {
  _id: string;
  fullname: string;
  role: string;
}

interface Appointment {
  _id: string;
  patient: { name: string; phone: string };
  dentist: { name: string };
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  frequency: string;
}

export default function AppointmentCreate() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user || user.role !== "Admin") {
      toast.error("غير مصرح لك بدخول هذه الصفحة");
      window.location.href = "/";
      return;
    }
  }, []);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    patient: "",
    dentist: "",
    date: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    frequency: "مرة واحدة",
  });

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/patient", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data?.error || data.message) {
        toast(data.error || data.message);
      } else {
        setPatients(data);
      }
    } catch {
      toast.error("Erreur lors du chargement des patients");
    }
  };

  const fetchDentists = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/users?role=Dentist",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data?.error || data.message) {
        toast(data.error || data.message);
      } else {
        setDentists(data);
      }
    } catch {
      toast.error("Erreur lors du chargement des dentistes");
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/appointment", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) return toast(data.message);
      setAppointments(data);
    } catch {
      toast.error("Erreur lors du chargement des rendez-vous");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!user || user.role !== "Admin") {
      toast.error("غير مصرح لك بدخول هذه الصفحة");
      window.location.href = "/";
      return;
    }

    fetchPatients();
    fetchDentists();
    fetchAppointments();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      let url = "http://localhost:5000/api/appointment";
      let method = "POST";

      if (editingId) {
        url = `http://localhost:5000/api/appointment/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) toast.error(data.message);
      else toast.success(editingId ? "Rendez-vous modifié" : "Rendez-vous créé");

      setForm({
        patient: "",
        dentist: "",
        date: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        frequency: "Une fois",
      });

      setEditingId(null);
      fetchAppointments();
    } catch {
      toast.error("Erreur de connexion au serveur");
    }

    setLoading(false);
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/appointment/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return toast.error("Échec de la suppression");

      toast.success("Supprimé avec succès");
      fetchAppointments();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const editAppointment = (a: Appointment) => {
    setEditingId(a._id);

    setForm({
      patient: (a as any).patient._id,
      dentist: (a as any).dentist._id,
      date: a.date.slice(0, 16),
      diagnosis: a.diagnosis,
      treatment: a.treatment,
      notes: a.notes,
      frequency: a.frequency,
    });
  };

  return (
    <div dir="ltr" className="flex h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-md px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <FaCalendarAlt className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Créer Rendez-vous</h1>
              <p className="text-sm text-gray-500">Gestion des rendez-vous</p>
            </div>
          </div>
        </header>

        {/* Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Gold Animated Title */}
            <div className="mb-8 text-center">
              <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
                {editingId ? "✨ Modifier Rendez-vous ✨" : "📅 Nouveau Rendez-vous 📅"}
              </h1>
              <p className="text-gray-600 text-lg">
                {editingId ? "Mettez à jour les informations du rendez-vous" : "Planifiez un nouveau rendez-vous médical"}
              </p>
            </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl mb-10 overflow-hidden"
      >
        {/* Section 1: Informations Patient & Dentiste */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
          <div className="flex items-center gap-3 text-white">
            <FaUser className="text-3xl" />
            <h2 className="text-2xl font-bold">Patient & Praticien</h2>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaUser className="text-blue-500" />
              Patient <span className="text-red-500">*</span>
            </label>
            <select
              name="patient"
              value={form.patient}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Sélectionner le patient</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  👤 {p.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">💡 Choisissez le patient pour ce rendez-vous</p>
          </div>

          {/* Dentiste */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaUserMd className="text-indigo-500" />
              Dentiste <span className="text-red-500">*</span>
            </label>
            <select
              name="dentist"
              value={form.dentist}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all"
              required
            >
              <option value="">Sélectionner le dentiste</option>
              {dentists.map((d) => (
                <option key={d._id} value={d._id}>
                  👨‍⚕️ {d.fullname}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">💡 Sélectionnez le praticien assigné</p>
          </div>
        </div>

        {/* Section 2: Date & Heure */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <div className="flex items-center gap-3 text-white">
            <FaClock className="text-3xl" />
            <h2 className="text-2xl font-bold">Date & Heure</h2>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div className="group md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaClock className="text-purple-500" />
              Date et Heure <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">💡 Sélectionnez la date et l'heure du rendez-vous</p>
          </div>

          {/* Fréquence */}
          <div className="group md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaRedoAlt className="text-pink-500" />
              Fréquence
            </label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition-all"
            >
              <option>🔂 Une fois</option>
              <option>📅 Quotidien</option>
              <option>📆 Hebdomadaire</option>
              <option>🗓️ Mensuel</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">💡 Fréquence de répétition du rendez-vous</p>
          </div>
        </div>

        {/* Section 3: Détails Médicaux */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
          <div className="flex items-center gap-3 text-white">
            <FaStethoscope className="text-3xl" />
            <h2 className="text-2xl font-bold">Détails Médicaux</h2>
          </div>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Diagnostic */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaStethoscope className="text-teal-500" />
              Diagnostic <span className="text-red-500">*</span>
            </label>
            <input
              name="diagnosis"
              placeholder="Diagnostic médical"
              value={form.diagnosis}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:ring-4 focus:ring-teal-300 focus:border-teal-500 transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">💡 Ex: Carie, Détartrage, Contrôle</p>
          </div>

          {/* Traitement */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaPrescription className="text-cyan-500" />
              Traitement <span className="text-red-500">*</span>
            </label>
            <input
              name="treatment"
              placeholder="Traitement prévu"
              value={form.treatment}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-cyan-200 rounded-lg focus:ring-4 focus:ring-cyan-300 focus:border-cyan-500 transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">💡 Ex: Extraction, Plombage, Blanchiment</p>
          </div>
        </div>

        {/* Section 4: Notes */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
          <div className="flex items-center gap-3 text-white">
            <FaNotesMedical className="text-3xl" />
            <h2 className="text-2xl font-bold">Notes Complémentaires</h2>
          </div>
        </div>
        <div className="p-8">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaNotesMedical className="text-orange-500" />
              Notes
            </label>
            <textarea
              name="notes"
              placeholder="Notes ou observations (optionnel)"
              value={form.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all h-24 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">💡 Informations complémentaires sur le rendez-vous</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Enregistrement en cours...
              </>
            ) : editingId ? (
              <>
                <FaEdit className="text-2xl" />
                Modifier le Rendez-vous
              </>
            ) : (
              <>
                <FaSave className="text-2xl" />
                Créer le Rendez-vous
              </>
            )}
          </button>
        </div>
      </form>

      {/* TABLE */}
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
        <FaCalendarCheck className="text-blue-600" />
        Liste des Rendez-vous
      </h2>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <FaCalendarPlus className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Aucun rendez-vous pour le moment</p>
          <p className="text-gray-400 text-sm mt-2">Créez votre premier rendez-vous en utilisant le formulaire ci-dessus</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-2xl">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left font-bold">Patient</th>
                <th className="p-4 text-left font-bold">Dentiste</th>
                <th className="p-4 text-left font-bold">Date & Heure</th>
                <th className="p-4 text-left font-bold">Diagnostic</th>
                <th className="p-4 text-left font-bold">Traitement</th>
                <th className="p-4 text-left font-bold">Fréquence</th>
                <th className="p-4 text-left font-bold">Note</th>
                <th className="p-4 text-left font-bold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a, index) => (
                <tr key={a._id} className={`border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}>
                  <td className="p-4 font-semibold text-gray-800">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-blue-500" />
                      {a.patient.name}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaUserMd className="text-indigo-500" />
                      {a.dentist.name}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-purple-500" />
                      {new Date(a.date).toLocaleString("fr-FR")}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaStethoscope className="text-teal-500" />
                      {a.diagnosis}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaPrescription className="text-cyan-500" />
                      {a.treatment}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full text-sm font-semibold">
                      {a.frequency}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{a.notes || '-'}</td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => editAppointment(a)}
                      className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105 flex items-center gap-2 shadow-md font-semibold"
                    >
                      <FaEdit />
                      Modifier
                    </button>

                    <button
                      onClick={() => deleteAppointment(a._id)}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center gap-2 shadow-md font-semibold"
                    >
                      <FaTrash />
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
          </div>
        </main>
      </div>
    </div>
  );
}
