import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Devis = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    service_id: "",
    message: ""
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/services").then(res => setServices(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/devis", formData);
      setSent(true);
      setFormData({ ...formData, message: "" });
    } catch (err) {
      setError("Une erreur est survenue.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Demander un Devis</h1>

      {sent ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Votre demande a été envoyée avec succès ! Nous vous recontacterons bientôt.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Service concerné</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.service_id}
              onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
            >
              <option value="">Sélectionnez un service (optionnel)</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message / Détails du projet</label>
            <textarea
              required
              rows={5}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-bold transition">
            Envoyer ma demande
          </button>
        </form>
      )}
    </div>
  );
};

export default Devis;
