import { Link } from "react-router-dom";
import dentist from "../images/dentist.webp";
import logo from "../../assits/Logo.png";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data?.error) {
        setErrorMessage(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setEmail("");
        setPassword("");
        toast.success(`Bienvenue ${data.user.fullname}`);
        
        // Redirect based on role
        if (data.user.role === "Receptionist") {
          window.location.href = "/secretary-dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Une erreur s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (role: 'admin' | 'secretary') => {
    setLoading(true);
    setErrorMessage("");
    
    const credentials = {
      admin: { email: 'admin@admin.com', password: 'admin1234567890' },
      secretary: { email: 'secretary@dental.com', password: 'secretary123' }
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials[role]),
      });
      const data = await res.json();
      if (data?.error) {
        setErrorMessage(data.error);
        toast.error(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(`Connexion rapide - ${data.user.fullname}`);
        
        // Redirect based on role
        if (data.user.role === "Receptionist") {
          window.location.href = "/secretary-dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timout = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timout);
    }
  }, [errorMessage]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100" dir="ltr">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={dentist}
            alt="Dental Clinic"
            className="object-cover h-full w-full"
          />
        </div>
        {/* Text at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 z-10">
          <h1 className="text-5xl font-bold mb-2 text-white">DentiSsra</h1>
          <p className="text-lg text-white/90">Gestion moderne de cabinet dentaire</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src={logo} alt="DentiSsra" className="w-48 h-auto mx-auto mb-2" />
            <p className="text-gray-600 mt-2">Gestion de cabinet dentaire</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            {/* Logo before Connexion */}
            <div className="text-center mb-6">
              <img src={logo} alt="DentiSsra" className="w-40 h-auto mx-auto" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Connexion
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Bienvenue ! Connectez-vous à votre compte
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>

              {/* Quick Login Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-3">Connexion rapide (Dev)</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => quickLogin('admin')}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm rounded-lg hover:from-purple-600 hover:to-purple-700 transition font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    👨‍💼 Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => quickLogin('secretary')}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm rounded-lg hover:from-teal-600 hover:to-teal-700 transition font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    👩‍💼 Secrétaire
                  </button>
                </div>
              </div>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">
              Pas de compte ?{" "}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-8">
            © 2025 DentiSsra. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
