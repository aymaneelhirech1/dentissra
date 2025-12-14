// src/pages/admin/Dashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../contexts/SettingsContext";
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaFileInvoiceDollar, 
  FaPrescriptionBottle, 
  FaBoxes, 
  FaTruck, 
  FaChartLine, 
  FaArrowUp, 
  FaArrowDown,
  FaUserMd,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlus,
  FaBars,
  FaTimes,
  FaUser,
  FaCloudSun,
  FaHome,
  FaFileAlt,
  FaCog,
  FaMoon,
  FaSun,
  FaShare
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import logoImg from "../../images/logo.avif";

type StatCardProps = {
  title: string;
  count: number;
  icon: React.ReactNode;
  gradient: string;
  trend?: number;
  bgIcon: string;
};

const StatCard = ({ title, count, icon, gradient, trend, bgIcon }: StatCardProps) => (
  <div className={`relative overflow-hidden rounded-2xl ${gradient} p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${bgIcon} rounded-xl shadow-lg`}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
            trend >= 0 ? 'bg-green-500/30' : 'bg-red-500/30'
          }`}>
            {trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-4xl font-bold mb-2">{count}</h3>
      <p className="text-sm font-medium opacity-90">{title}</p>
    </div>
    <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl">
      {icon}
    </div>
  </div>
);

type QuickActionCardProps = {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  link: string;
  description: string;
};

const QuickActionCard = ({ title, icon, gradient, link, description }: QuickActionCardProps) => (
  <a
    href={link}
    className={`group relative overflow-hidden ${gradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1`}
  >
    <div className="relative z-10">
      <div className="mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
    <div className="absolute -right-6 -bottom-6 opacity-10 text-8xl group-hover:rotate-12 transition-transform duration-300">
      <FaPlus />
    </div>
  </a>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    invoices: 0,
    prescriptions: 0,
    inventory: 0,
    suppliers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("Admin");
  const [weather, setWeather] = useState({ temp: 22, condition: "Ensoleillé" });
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize and apply dark mode immediately
    const saved = localStorage.getItem("darkMode");
    const isDark = saved ? JSON.parse(saved) : false;
    // Apply immediately to prevent flash
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return isDark;
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [
        patientsRes,
        appointmentsRes,
        invoicesRes,
        prescriptionsRes,
        inventoryRes,
        suppliersRes,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/patient", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/appointment", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/factures", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/ordonnances", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/inventory", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/supplier", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Handle different response structures - data might be in .data or .data.data
      const getCount = (response: any) => {
        const data = response.data;
        if (Array.isArray(data)) {
          return data.length;
        } else if (data?.data && Array.isArray(data.data)) {
          return data.data.length;
        } else if (typeof data?.count === 'number') {
          return data.count;
        }
        console.warn("Unexpected data structure:", data);
        return 0;
      };

      const newStats = {
        patients: getCount(patientsRes),
        appointments: getCount(appointmentsRes),
        invoices: getCount(invoicesRes),
        prescriptions: getCount(prescriptionsRes),
        inventory: getCount(inventoryRes),
        suppliers: getCount(suppliersRes),
      };

      console.log("Dashboard stats updated:", newStats);
      setStats(newStats);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        setUserName(user.fullName || user.name || "Admin");
      } catch (e) {
        console.error("Error parsing user info:", e);
      }
    }

    // Initial fetch
    fetchData();

    // Auto-refresh every 5 seconds for instant updates
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    console.log("Dark mode useEffect triggered. Dark mode is:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
      console.log("Added 'dark' class. Classes:", document.documentElement.className);
    } else {
      document.documentElement.classList.remove('dark');
      console.log("Removed 'dark' class. Classes:", document.documentElement.className);
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    console.log("Toggling dark mode from:", darkMode, "to:", !darkMode);
    setDarkMode(!darkMode);
  };

  const menuItems = [
    { icon: <MdDashboard className="text-lg" />, title: "Tableau de bord", link: "/dashboard", color: "text-blue-500" },
    { icon: <FaUsers className="text-lg" />, title: "Patients", link: "/patients", color: "text-green-500" },
    { icon: <FaUserMd className="text-lg" />, title: "Personnel", link: "/personnel/create", color: "text-cyan-500" },
    { icon: <FaCalendarAlt className="text-lg" />, title: "Rendez-vous", link: "/appointments", color: "text-purple-500" },
    { icon: <FaPrescriptionBottle className="text-lg" />, title: "Ordonnances", link: "/ordonnances", color: "text-pink-500" },
    { icon: <FaFileAlt className="text-lg" />, title: "Dossiers Médicaux", link: "/medical-files", color: "text-teal-500" },
    { icon: <FaTruck className="text-lg" />, title: "Fournisseurs", link: "/suppliers", color: "text-indigo-500" },
    { icon: <FaFileInvoiceDollar className="text-lg" />, title: "Factures", link: "/factures", color: "text-yellow-500" },
    { icon: <FaBoxes className="text-lg" />, title: "Stock", link: "/inventory", color: "text-red-500" },
    { icon: <FaShare className="text-lg" />, title: "SMM", link: "/smm", color: "text-blue-400" },
    { icon: <FaCog className="text-lg" />, title: "Paramètres", link: "/settings", color: "text-gray-500" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900" dir="ltr">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white transition-all duration-300 flex flex-col shadow-2xl`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  {settings.logo ? (
                    <img src={settings.logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <FaUserMd className="text-xl" />
                    </div>
                  )}
                </div>
                <span className="font-bold text-lg">{settings.name || "Dental Clinic"}</span>
              </div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.link)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                window.location.pathname === item.link
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className={item.color}>{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium group-hover:text-white">{item.title}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={() => navigate("/settings")}
              className="w-full flex items-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <FaCog className="text-lg" />
              <span className="text-sm font-medium">Paramètres</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={settings.logo || logoImg} alt="Cabinet Logo" className="w-14 h-14 rounded-xl shadow-lg object-cover border-2 border-blue-400 bg-white" />
            <div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{settings.name || "Cabinet Dentaire"}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{settings.address || "Adresse non définie"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{settings.phone || "Téléphone non défini"}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:shadow-md transition-all"
              title={darkMode ? "Mode clair" : "Mode sombre"}
            >
              {darkMode ? (
                <FaSun className="text-xl text-yellow-500" />
              ) : (
                <FaMoon className="text-xl text-indigo-600" />
              )}
            </button>

            {/* Weather */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-700">
              <FaCloudSun className="text-2xl text-yellow-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-300">Météo</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{weather.temp}°C - {weather.condition}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="relative">
              <button
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 px-4 py-2 rounded-lg border border-indigo-200 dark:border-indigo-700 hover:shadow-md transition-all"
              >
                {settings.adminPhoto ? (
                  <img src={settings.adminPhoto} alt="Admin" className="w-10 h-10 rounded-full object-cover shadow-lg" />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaUser className="text-white" />
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Connecté</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{settings.adminName || userName}</p>
                </div>
              </button>

              {/* Logout Dropdown */}
              {showLogoutMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                    className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaUser className="text-sm" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <p className="text-xl text-gray-600">Chargement...</p>
              </div>
            </div>
          ) : (
            <>
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard 
                title="Patients" 
                count={stats.patients} 
                icon={<FaUsers className="text-2xl" />}
                gradient="bg-gradient-to-br from-blue-500 to-blue-700"
                bgIcon="bg-white/20"
                trend={12}
              />
              <StatCard 
                title="Rendez-vous" 
                count={stats.appointments} 
                icon={<FaCalendarAlt className="text-2xl" />}
                gradient="bg-gradient-to-br from-emerald-500 to-teal-700"
                bgIcon="bg-white/20"
                trend={8}
              />
              <StatCard 
                title="Factures" 
                count={stats.invoices} 
                icon={<FaFileInvoiceDollar className="text-2xl" />}
                gradient="bg-gradient-to-br from-amber-500 to-orange-600"
                bgIcon="bg-white/20"
                trend={-3}
              />
              <StatCard 
                title="Ordonnances" 
                count={stats.prescriptions} 
                icon={<FaPrescriptionBottle className="text-2xl" />}
                gradient="bg-gradient-to-br from-purple-500 to-pink-600"
                bgIcon="bg-white/20"
                trend={15}
              />
              <StatCard 
                title="Stock" 
                count={stats.inventory} 
                icon={<FaBoxes className="text-2xl" />}
                gradient="bg-gradient-to-br from-rose-500 to-red-600"
                bgIcon="bg-white/20"
                trend={5}
              />
              <StatCard 
                title="Fournisseurs" 
                count={stats.suppliers} 
                icon={<FaTruck className="text-2xl" />}
                gradient="bg-gradient-to-br from-indigo-500 to-purple-700"
                bgIcon="bg-white/20"
                trend={2}
              />
            </div>

            {/* Quick Actions Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FaChartLine className="text-2xl text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Actions Rapides
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <QuickActionCard
                  title="Nouveau Patient"
                  description="Ajouter un patient"
                  icon={<FaUsers />}
                  gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
                  link="/patients/create"
                />
                <QuickActionCard
                  title="Rendez-vous"
                  description="Planifier un RDV"
                  icon={<FaCalendarAlt />}
                  gradient="bg-gradient-to-br from-emerald-500 to-green-600"
                  link="/appointments/create"
                />
                <QuickActionCard
                  title="Nouvelle Facture"
                  description="Créer une facture"
                  icon={<FaFileInvoiceDollar />}
                  gradient="bg-gradient-to-br from-amber-500 to-yellow-600"
                  link="/factures/create"
                />
                <QuickActionCard
                  title="Stock"
                  description="Gérer l'inventaire"
                  icon={<FaBoxes />}
                  gradient="bg-gradient-to-br from-purple-500 to-violet-600"
                  link="/inventory/create"
                />
              </div>
            </div>

            {/* Activity & Alerts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Activity */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <FaClock className="text-xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Activité du Jour</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FaUserMd className="text-xl text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Consultations</p>
                        <p className="text-sm text-gray-600">Patients vus aujourd'hui</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{stats.appointments}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        <FaCheckCircle className="text-xl text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Traitements terminés</p>
                        <p className="text-sm text-gray-600">Complétés avec succès</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">{stats.prescriptions}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-100 rounded-lg">
                        <FaFileInvoiceDollar className="text-xl text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Revenus</p>
                        <p className="text-sm text-gray-600">Factures émises</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-amber-600">{stats.invoices}</span>
                  </div>
                </div>
              </div>

              {/* Alerts & Notifications */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg">
                    <FaExclamationTriangle className="text-xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Alertes</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-3">
                      <FaBoxes className="text-2xl text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-800 mb-1">Stock Faible</p>
                        <p className="text-sm text-gray-600">3 articles nécessitent une réapprovisionnement</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-3">
                      <FaCalendarAlt className="text-2xl text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-800 mb-1">Rendez-vous</p>
                        <p className="text-sm text-gray-600">{stats.appointments} RDV planifiés cette semaine</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-3">
                      <FaPrescriptionBottle className="text-2xl text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-gray-800 mb-1">Ordonnances</p>
                        <p className="text-sm text-gray-600">{stats.prescriptions} prescriptions actives</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        </main>
      </div>
    </div>
  );
}
