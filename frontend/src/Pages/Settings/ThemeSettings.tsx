import { useState, useEffect } from "react";
import { Palette, Type, TextCursorInput, Save } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";

export default function ThemeSettings() {
  const [settings, setSettings] = useState({
    primaryColor: "#ec4899", // Pink
    secondaryColor: "#a855f7", // Purple
    accentColor: "#3b82f6", // Blue
    fontFamily: "Inter",
    titleSize: "2xl",
    bodySize: "base",
  });

  useEffect(() => {
    // Load saved theme settings
    const savedSettings = localStorage.getItem("themeSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // NOTE: theme is applied when the user clicks "Enregistrer les Paramètres"
  // Changes while editing are kept in local state until saved.

  const handleSave = () => {
    localStorage.setItem("themeSettings", JSON.stringify(settings));
    toast.success("Paramètres de thème enregistrés avec succès!");

    // Apply theme to document when the user explicitly saves
    try {
      document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
      document.documentElement.style.setProperty('--accent-color', settings.accentColor);
      document.documentElement.style.fontFamily = settings.fontFamily;
    } catch (err) {
      console.error('Failed to apply theme on save', err);
    }
  };

  const handleReset = () => {
    const defaultSettings = {
      primaryColor: "#ec4899",
      secondaryColor: "#a855f7",
      accentColor: "#3b82f6",
      fontFamily: "Inter",
      titleSize: "2xl",
      bodySize: "base",
    };
    setSettings(defaultSettings);
    localStorage.setItem("themeSettings", JSON.stringify(defaultSettings));
    // Apply defaults immediately so user sees the reset effect
    try {
      document.documentElement.style.setProperty('--primary-color', defaultSettings.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', defaultSettings.secondaryColor);
      document.documentElement.style.setProperty('--accent-color', defaultSettings.accentColor);
      document.documentElement.style.fontFamily = defaultSettings.fontFamily;
    } catch (err) {
      console.error('Failed to apply default theme', err);
    }
    toast.info("Paramètres réinitialisés aux valeurs par défaut");
  };

  const colorPresets = [
    { name: "Rose & Violet", primary: "#ec4899", secondary: "#a855f7" },
    { name: "Bleu & Cyan", primary: "#3b82f6", secondary: "#06b6d4" },
    { name: "Vert & Émeraude", primary: "#10b981", secondary: "#059669" },
    { name: "Orange & Rouge", primary: "#f97316", secondary: "#ef4444" },
    { name: "Indigo & Violet", primary: "#6366f1", secondary: "#8b5cf6" },
  ];

  const fontOptions = [
    { value: "Inter", label: "Inter (Moderne)" },
    { value: "Roboto", label: "Roboto (Classique)" },
    { value: "Poppins", label: "Poppins (Élégant)" },
    { value: "Montserrat", label: "Montserrat (Professionnel)" },
    { value: "Open Sans", label: "Open Sans (Lisible)" },
  ];

  const sizeOptions = [
    { value: "sm", label: "Petit", sample: "text-sm" },
    { value: "base", label: "Normal", sample: "text-base" },
    { value: "lg", label: "Grand", sample: "text-lg" },
    { value: "xl", label: "Très Grand", sample: "text-xl" },
    { value: "2xl", label: "Extra Grand", sample: "text-2xl" },
    { value: "3xl", label: "Énorme", sample: "text-3xl" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50" dir="ltr">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-lg px-8 py-6 border-b-4 border-purple-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg">
              <Palette className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Paramètres de Thème
              </h1>
              <p className="text-sm text-gray-600 mt-1">Personnalisez les couleurs, polices et tailles</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Color Settings */}
            <Card className="rounded-2xl shadow-xl border-l-8 border-purple-500">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Palette className="text-purple-600" />
                  Couleurs du Thème
                </h2>

                {/* Color Presets */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Préréglages</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() =>
                          setSettings({
                            ...settings,
                            primaryColor: preset.primary,
                            secondaryColor: preset.secondary,
                          })
                        }
                        className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all"
                      >
                        <div className="flex gap-2 mb-2">
                          <div
                            className="w-8 h-8 rounded-full shadow-md"
                            style={{ backgroundColor: preset.primary }}
                          ></div>
                          <div
                            className="w-8 h-8 rounded-full shadow-md"
                            style={{ backgroundColor: preset.secondary }}
                          ></div>
                        </div>
                        <p className="text-xs font-medium text-gray-600">{preset.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Couleur Primaire
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) =>
                          setSettings({ ...settings, primaryColor: e.target.value })
                        }
                        className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={settings.primaryColor}
                          onChange={(e) =>
                            setSettings({ ...settings, primaryColor: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Couleur Secondaire
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) =>
                          setSettings({ ...settings, secondaryColor: e.target.value })
                        }
                        className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={settings.secondaryColor}
                          onChange={(e) =>
                            setSettings({ ...settings, secondaryColor: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Couleur d'Accent
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) =>
                          setSettings({ ...settings, accentColor: e.target.value })
                        }
                        className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={settings.accentColor}
                          onChange={(e) =>
                            setSettings({ ...settings, accentColor: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Font Settings */}
            <Card className="rounded-2xl shadow-xl border-l-8 border-pink-500">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Type className="text-pink-600" />
                  Police de Caractères
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fontOptions.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => setSettings({ ...settings, fontFamily: font.value })}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        settings.fontFamily === font.value
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                    >
                      <p className="font-semibold text-gray-800" style={{ fontFamily: font.value }}>
                        {font.label}
                      </p>
                      <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: font.value }}>
                        Aperçu du texte avec cette police
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Size Settings */}
            <Card className="rounded-2xl shadow-xl border-l-8 border-indigo-500">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <TextCursorInput className="text-indigo-600" />
                  Tailles de Texte
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Taille des Titres</h3>
                    <div className="space-y-3">
                      {sizeOptions.map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setSettings({ ...settings, titleSize: size.value })}
                          className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                            settings.titleSize === size.value
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <p className={`font-bold ${size.sample}`}>{size.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Taille du Corps</h3>
                    <div className="space-y-3">
                      {sizeOptions.slice(0, 4).map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setSettings({ ...settings, bodySize: size.value })}
                          className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                            settings.bodySize === size.value
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <p className={size.sample}>{size.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <Button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
              >
                Réinitialiser
              </Button>
              <Button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Enregistrer les Paramètres
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
