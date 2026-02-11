import { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Trash2, Edit } from "lucide-react";

const GestionProjets = () => {
  const [projets, setProjets] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "", title_en: "",
    description: "", description_en: "",
    link: "", image: "",
    chef_projet_id: "", is_public: false
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProjets = () => api.get("/projets").then(res => setProjets(res.data));
  const fetchUsers = () => api.get("/users").then(res => setUsers(res.data));

  useEffect(() => {
    fetchProjets();
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/projets/${editingId}`, formData);
    } else {
      await api.post("/projets", formData);
    }
    setShowModal(false);
    setFormData({
      title: "", title_en: "",
      description: "", description_en: "",
      link: "", image: "",
      chef_projet_id: "", is_public: false
    });
    setEditingId(null);
    fetchProjets();
  };

  const handleEdit = (p) => {
    setFormData(p);
    setEditingId(p.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce projet ?")) {
      await api.delete(`/projets/${id}`);
      fetchProjets();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestion des Projets</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded">
          <Plus size={18} /> <span>Nouveau Projet</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dév</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chef Projet</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visibilité</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projets.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4">{p.title}</td>
                <td className="px-6 py-4">{p.developer?.name}</td>
                <td className="px-6 py-4">{p.chef_projet?.name || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${p.is_public ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {p.is_public ? 'Public' : 'Privé'}
                  </span>
                </td>
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
            <h3 className="text-lg font-bold mb-4">{editingId ? "Modifier" : "Ajouter"} un Projet</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Titre (FR)" required className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <input type="text" placeholder="Titre (EN)" className="w-full border p-2 rounded" value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} />
              <textarea placeholder="Description (FR)" required className="w-full border p-2 rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              <textarea placeholder="Description (EN)" className="w-full border p-2 rounded" value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} />
              <select required className="w-full border p-2 rounded" value={formData.chef_projet_id} onChange={e => setFormData({...formData, chef_projet_id: e.target.value})}>
                <option value="">Sélectionner un Chef de Projet</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
              <div className="flex items-center gap-2">
                 <input type="checkbox" id="is_public" checked={formData.is_public} onChange={e => setFormData({...formData, is_public: e.target.checked})} />
                 <label htmlFor="is_public">Rendre le projet public (visible sur le site)</label>
              </div>
              <input type="url" placeholder="Lien (URL)" className="w-full border p-2 rounded" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
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

export default GestionProjets;
