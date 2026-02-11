import { useState, useEffect } from "react";
import api from "../../services/api";
import { Plus, Edit, Trash2, User as UserIcon } from "lucide-react";

const GestionUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role_id: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const [usersRes, rolesRes] = await Promise.all([
      api.get("/users"),
      api.get("/roles")
    ]);
    setUsers(usersRes.data);
    setRoles(rolesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, formData);
      } else {
        await api.post("/users", formData);
      }
      setShowModal(false);
      setFormData({ name: "", email: "", password: "", role_id: "" });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      await api.delete(`/users/${id}`);
      fetchData();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestion des Utilisateurs</h2>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={18} /> Nouvel Utilisateur
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 flex items-center gap-2">
                  <UserIcon size={18} className="text-slate-400" />
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs uppercase font-bold">
                    {user.role?.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => {
                    setFormData({ name: user.name, email: user.email, password: "", role_id: user.role_id });
                    setEditingId(user.id);
                    setShowModal(true);
                  }} className="text-blue-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">{editingId ? "Modifier" : "Ajouter"} un Utilisateur</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nom" required className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email" required className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input type="password" placeholder={editingId ? "Mot de passe (laisser vide pour garder l'actuel)" : "Mot de passe"} required={!editingId} className="w-full border p-2 rounded" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              <select required className="w-full border p-2 rounded" value={formData.role_id} onChange={e => setFormData({...formData, role_id: e.target.value})}>
                <option value="">Sélectionner un rôle</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.name.toUpperCase()}</option>
                ))}
              </select>
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

export default GestionUsers;
