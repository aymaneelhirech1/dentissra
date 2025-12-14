import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaPrescriptionBottle,
  FaBoxes,
  FaTruck,
  FaCog,
  FaBars,
  FaFileAlt,
  FaShare,
  FaTimes,
  FaFileInvoiceDollar,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { toast } from "react-toastify";

export default function Sidebar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      
      // If permissions are undefined, set default permissions (all true for backward compatibility)
      if (!parsedUser.permissions && parsedUser.role === "Receptionist") {
        parsedUser.permissions = {
          patients: true,
          appointments: true,
          invoices: true,
          medicalFiles: true,
          prescriptions: true,
          inventory: true,
          suppliers: true,
          statistics: true,
        };
      }
      
      setUser(parsedUser);
      console.log("🔐 User permissions loaded:", parsedUser.permissions);
      console.log("👤 User role:", parsedUser.role);
    }
  }, []);

  const allMenuItems = [
    { 
      icon: <MdDashboard />, 
      title: "Tableau de bord", 
      link: user?.role === "Receptionist" ? "/secretary-dashboard" : "/dashboard", 
      color: "text-blue-500", 
      permission: "statistics" 
    },
    { icon: <FaUsers />, title: "Patients", link: "/patients", color: "text-green-500", permission: "patients" },
    { icon: <FaUserMd />, title: "Personnel", link: "/personnel/create", color: "text-cyan-500", permission: "admin" },
    { icon: <FaCalendarAlt />, title: "Rendez-vous", link: "/appointments", color: "text-purple-500", permission: "appointments" },
    { icon: <FaPrescriptionBottle />, title: "Ordonnances", link: "/ordonnances", color: "text-pink-500", permission: "prescriptions" },
    { icon: <FaFileAlt />, title: "Dossiers Médicaux", link: "/medical-files", color: "text-teal-500", permission: "medicalFiles" },
    { icon: <FaTruck />, title: "Fournisseurs", link: "/supplier", color: "text-indigo-500", permission: "suppliers" },
    { icon: <FaFileInvoiceDollar />, title: "Factures", link: "/factures", color: "text-yellow-500", permission: "invoices" },
    { icon: <FaBoxes />, title: "Stock", link: "/inventory", color: "text-red-500", permission: "inventory" },
    { icon: <FaShare />, title: "SMM", link: "/smm", color: "text-blue-400", permission: "admin" },
  ];

  // Filter menu items based on user permissions
  const menuItems = allMenuItems.filter(item => {
    // Admin always sees everything
    if (user?.role === "Admin") return true;
    
    // Always show these items
    if (item.permission === "always") return true;
    
    // Admin-only items
    if (item.permission === "admin") return false;
    
    // Check user permissions
    if (user?.permissions && item.permission) {
      const hasPermission = user.permissions[item.permission] !== false;
      console.log(`📋 ${item.title}: ${hasPermission ? '✅' : '❌'} (${item.permission})`);
      return hasPermission;
    }
    
    return true;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col shadow-2xl`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="p-2 bg-pink-600 rounded-lg">
                <FaUserMd className="text-xl" />
              </div>
              <span className="font-bold text-lg">DentiSsra</span>
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
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 group"
          >
            <span className={item.color}>{item.icon}</span>
            {sidebarOpen && <span className="text-sm font-medium group-hover:text-white">{item.title}</span>}
          </button>
        ))}
      </nav>

      {sidebarOpen && (
        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={() => navigate("/theme-settings")}
            className="w-full flex items-center gap-2 p-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-md"
          >
            <FaCog className="text-lg" />
            <span className="text-sm font-medium">Thème</span>
          </button>
          {user?.role === "Admin" && (
            <button
              onClick={() => navigate("/settings")}
              className="w-full flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <FaCog className="text-lg" />
              <span className="text-sm font-medium">Paramètres</span>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg transition-colors shadow-lg"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      )}
    </aside>
  );
}
