import { useEffect, useState } from "react";
import api from "../../services/api";
import { Check, X, Trash2 } from "lucide-react";

const GestionDevis = () => {
  const [devis, setDevis] = useState([]);

  const fetchDevis = () => api.get("/devis").then(res => setDevis(res.data));

  useEffect(() => {
    fetchDevis();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/devis/${id}`, { status });
    fetchDevis();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce devis ?")) {
      await api.delete(`/devis/${id}`);
      fetchDevis();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Gestion des Devis</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {devis.map(d => (
              <tr key={d.id}>
                <td className="px-6 py-4">
                  <div className="font-medium">{d.name}</div>
                  <div className="text-sm text-gray-500">{d.email}</div>
                </td>
                <td className="px-6 py-4">{d.service?.name || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    d.status === 'processed' ? 'bg-green-100 text-green-800' :
                    d.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {d.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => updateStatus(d.id, 'processed')} className="text-green-600" title="Accepter"><Check size={18} /></button>
                  <button onClick={() => updateStatus(d.id, 'rejected')} className="text-orange-600" title="Rejeter"><X size={18} /></button>
                  <button onClick={() => handleDelete(d.id)} className="text-red-600" title="Supprimer"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionDevis;
