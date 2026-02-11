import { useState, useEffect } from "react";
import api from "../../services/api";

const GestionSettings = () => {
  const [settings, setSettings] = useState({
    site_name: "",
    site_logo: "",
    rccm: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/settings").then(res => {
      setSettings(prev => ({ ...prev, ...res.data }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/settings", { settings });
      setMessage("Paramètres mis à jour avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-xl font-bold mb-6">Paramètres du Site</h2>
      {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom du site</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={settings.site_name}
            onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL du Logo</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={settings.site_logo}
            onChange={(e) => setSettings({ ...settings, site_logo: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">RCCM</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={settings.rccm}
            onChange={(e) => setSettings({ ...settings, rccm: e.target.value })}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default GestionSettings;
