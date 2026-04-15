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
        } else if (data.user.role === "Dentist") {
          window.location.href = "/doctor-dashboard";
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

  const quickLogin = async (role: 'admin' | 'secretary' | 'doctor') => {
    setLoading(true);
    setErrorMessage("");
    
    const credentials = {
      admin: { email: 'admin@admin.com', password: 'admin1234567890' },
      secretary: { email: 'secretary@dental.com', password: 'secretary123' }
      ,
      doctor: { email: 'doctor@dental.com', password: 'doctor123' }
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
        } else if (data.user.role === "Dentist") {
          window.location.href = "/doctor-dashboard";
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
    <div className="h-screen flex overflow-hidden bg-white" dir="ltr">
      {/* Left side - Image (Full Height, No Scroll) */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative">
        <img
          src={dentist}
          alt="Dental Clinic"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 z-10 text-white">
          <h1 className="text-5xl font-bold tracking-tight">DentiSsra</h1>
          <p className="text-xl opacity-90">Modern Dental Practice Management</p>
        </div>
      </div>

      {/* Right side - Login Form (Compact) */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8 bg-gray-50">
        <div className="w-full max-w-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
            {/* Minimalist Logo */}
            <div className="text-center mb-6">
              <img src={logo} alt="DentiSsra" className="w-32 h-auto mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900 mt-4 tracking-tight">Welcome Back</h2>
              <p className="text-sm text-gray-500 mt-1">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-xs animate-shake">
                  {errorMessage}
                </div>
              )}
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
                  placeholder="name@clinic.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center text-gray-500 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline font-medium">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-lg hover:shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>

              {/* Quick Login - Compact Section */}
              <div className="relative my-6 px-10">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400 font-medium tracking-widest">Demo</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['Admin', 'Secretary', 'Doctor'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => quickLogin(role.toLowerCase() as any)}
                    className="py-2 px-1 text-[10px] font-bold uppercase tracking-tight bg-gray-50 border border-gray-100 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all text-gray-600"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </form>
          </div>
          <p className="text-center text-gray-400 text-[10px] mt-6 uppercase tracking-widest">
            &copy; 2026 DentiSsra Management System
          </p>
        </div>
      </div>
    </div>
  );
}
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
                  <button
                    type="button"
                    onClick={async () => {
                      // prefill fields so user can see them
                      setEmail('doctor@dental.com');
                      setPassword('doctor123');
                      // small delay to allow inputs to update visually, then perform quick login
                      await new Promise((r) => setTimeout(r, 150));
                      quickLogin('doctor');
                    }}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm rounded-lg hover:from-rose-600 hover:to-rose-700 transition font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🩺 Docteur
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
