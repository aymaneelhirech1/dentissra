import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaPrescriptionBottle,
  FaBoxes,
  FaTruck,
  FaFileAlt,
  FaCog,
  FaShareAlt,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaImage,
  FaVideo,
  FaPaperPlane,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function SMM() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    content: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: ""
  });
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMedia(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
    if (media) console.log("Selected media:", media);
    alert("Post data ready! (Preview only, no Webhook)");
  };

  const menuItems = [
    { title: "Tableau de bord", icon: <MdDashboard className="text-lg" />, link: "/dashboard", color: "text-blue-500" },
    { title: "Patients", icon: <FaUsers className="text-lg" />, link: "/patients", color: "text-green-500" },
    { title: "Rendez-vous", icon: <FaCalendarAlt className="text-lg" />, link: "/appointments", color: "text-purple-500" },
    { title: "Factures", icon: <FaFileInvoiceDollar className="text-lg" />, link: "/factures", color: "text-yellow-500" },
    { title: "Ordonnances", icon: <FaPrescriptionBottle className="text-lg" />, link: "/ordonnances", color: "text-pink-500" },
    { title: "Stock", icon: <FaBoxes className="text-lg" />, link: "/inventory", color: "text-red-500" },
    { title: "Fournisseurs", icon: <FaTruck className="text-lg" />, link: "/suppliers", color: "text-indigo-500" },
    { title: "Dossiers Médicaux", icon: <FaFileAlt className="text-lg" />, link: "/medical-files", color: "text-teal-500" },
    { title: "SMM", icon: <FaShareAlt className="text-lg" />, link: "/smm", color: "text-rose-500" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="ltr">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <FaShareAlt className="text-2xl" />
            </div>
            <span className="font-bold text-xl">Dental Clinic</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.link)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                window.location.pathname === item.link
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className={item.color}>{item.icon}</span>
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => navigate("/settings")}
            className="w-full flex items-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all shadow-lg"
          >
            <FaCog className="text-lg" />
            <span className="text-sm font-medium">Paramètres</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md px-8 py-6 border-b-4 border-gradient-to-r from-blue-500 to-purple-600">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-xl">
              <FaShareAlt className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                📱 Créer un Post SMM
              </h1>
              <p className="text-sm text-gray-500 mt-1">Gérez et publiez votre contenu sur les réseaux sociaux</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Content Section */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaPaperPlane className="text-blue-600 text-xl" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">📝 Contenu du Post</h2>
                </div>
                <textarea
                  name="content"
                  placeholder="Écrivez votre message ici..."
                  value={form.content}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Social Media Links */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-purple-500">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🌐 Réseaux Sociaux
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Facebook */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <FaFacebook className="text-blue-600 text-2xl" />
                    </div>
                    <input
                      type="text"
                      name="facebook"
                      placeholder="Facebook URL / Page"
                      value={form.facebook}
                      onChange={handleChange}
                      className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <FaInstagram className="text-pink-600 text-2xl" />
                    </div>
                    <input
                      type="text"
                      name="instagram"
                      placeholder="Instagram Handle"
                      value={form.instagram}
                      onChange={handleChange}
                      className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500 transition-all"
                    />
                  </div>

                  {/* TikTok */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <FaTiktok className="text-gray-800 text-2xl" />
                    </div>
                    <input
                      type="text"
                      name="tiktok"
                      placeholder="TikTok Handle"
                      value={form.tiktok}
                      onChange={handleChange}
                      className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 focus:border-gray-800 transition-all"
                    />
                  </div>

                  {/* YouTube */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <FaYoutube className="text-red-600 text-2xl" />
                    </div>
                    <input
                      type="text"
                      name="youtube"
                      placeholder="YouTube Channel / Shorts"
                      value={form.youtube}
                      onChange={handleChange}
                      className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Media Upload */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaImage className="text-green-600 text-xl" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">📸 Image ou Vidéo</h2>
                </div>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMedia}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-green-500 file:to-emerald-600 file:text-white hover:file:from-green-600 hover:file:to-emerald-700 file:transition-all file:shadow-lg cursor-pointer"
                />

                {preview && (
                  <div className="mt-6 flex justify-center">
                    <div className="relative group">
                      {media?.type.startsWith("image") ? (
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="max-h-80 rounded-2xl shadow-2xl border-4 border-white group-hover:scale-105 transition-transform" 
                        />
                      ) : (
                        <video 
                          src={preview} 
                          controls 
                          className="max-h-80 rounded-2xl shadow-2xl border-4 border-white" 
                        />
                      )}
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {media?.type.startsWith("image") ? <FaImage className="inline mr-1" /> : <FaVideo className="inline mr-1" />}
                        Preview
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaPaperPlane className="text-xl" />
                Prévisualiser / Enregistrer
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
