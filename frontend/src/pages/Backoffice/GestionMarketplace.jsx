import { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Trash2, Edit } from "lucide-react";

const GestionMarketplace = () => {
  const [produits, setProduits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", name_en: "", description: "", description_en: "", price: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchProduits = () => api.get("/marketplace").then(res => setProduits(res.data));

  useEffect(() => {
    fetchProduits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/marketplace/${editingId}`, formData);
    } else {
      await api.post("/marketplace", formData);
    }
    setShowModal(false);
    setFormData({ name: "", name_en: "", description: "", description_en: "", price: "", image: "" });
    setEditingId(null);
    fetchProduits();
  };

  const handleEdit = (p) => {
    setFormData(p);
    setEditingId(p.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      await api.delete(`/marketplace/${id}`);
      fetchProduits();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestion Marketplace</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded">
          <Plus size={18} /> <span>Nouveau Produit</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {produits.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4">{p.price} €</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">{editingId ? "Modifier" : "Ajouter"} un Produit</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nom (FR)" required className="border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="text" placeholder="Nom (EN)" className="border p-2 rounded" value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} />
              </div>
              <textarea placeholder="Description (FR)" required className="w-full border p-2 rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              <textarea placeholder="Description (EN)" className="w-full border p-2 rounded" value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} />
              <input type="number" placeholder="Prix (XOF)" required className="w-full border p-2 rounded" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <input type="text" placeholder="URL Image" className="w-full border p-2 rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionMarketplace;
