import { useState, useEffect } from "react";
import api from "../../services/api";
import { Plus, Edit, Trash2, ShieldCheck } from "lucide-react";

const GestionRolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPermModal, setShowPermModal] = useState(false);
  const [roleForm, setRoleForm] = useState({ name: "", permissions: [] });
  const [permForm, setPermForm] = useState({ name: "", label: "" });
  const [editingRoleId, setEditingRoleId] = useState(null);

  const fetchData = async () => {
    const [rolesRes, permsRes] = await Promise.all([
      api.get("/roles"),
      api.get("/permissions")
    ]);
    setRoles(rolesRes.data);
    setPermissions(permsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (editingRoleId) {
      await api.put(`/roles/${editingRoleId}`, roleForm);
    } else {
      await api.post("/roles", roleForm);
    }
    setShowRoleModal(false);
    setRoleForm({ name: "", permissions: [] });
    setEditingRoleId(null);
    fetchData();
  };

  const handlePermSubmit = async (e) => {
    e.preventDefault();
    await api.post("/permissions", permForm);
    setShowPermModal(false);
    setPermForm({ name: "", label: "" });
    fetchData();
  };

  const togglePermission = (id) => {
    const current = [...roleForm.permissions];
    if (current.includes(id)) {
      setRoleForm({ ...roleForm, permissions: current.filter(pId => pId !== id) });
    } else {
      setRoleForm({ ...roleForm, permissions: [...current, id] });
    }
  };

  const deleteRole = async (id) => {
    if (window.confirm("Supprimer ce rôle ?")) {
      await api.delete(`/roles/${id}`);
      fetchData();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Rôles et Permissions</h2>
        <div className="space-x-2">
          <button onClick={() => setShowPermModal(true)} className="bg-slate-600 text-white px-4 py-2 rounded">
            Nouvelle Permission
          </button>
          <button onClick={() => setShowRoleModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
            Nouveau Rôle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map(role => (
          <div key={role.id} className="bg-white p-6 rounded-lg shadow border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold uppercase text-blue-600">{role.name}</h3>
              <div className="flex space-x-2">
                <button onClick={() => {
                  setRoleForm({ name: role.name, permissions: role.permissions.map(p => p.id) });
                  setEditingRoleId(role.id);
                  setShowRoleModal(true);
                }} className="text-slate-400 hover:text-blue-600">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteRole(role.id)} className="text-slate-400 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase">Permissions :</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map(p => (
                  <span key={p.id} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                    {p.label || p.name}
                  </span>
                ))}
                {role.permissions.length === 0 && <span className="text-xs text-slate-400">Aucune permission</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{editingRoleId ? "Modifier" : "Ajouter"} un Rôle</h3>
            <form onSubmit={handleRoleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nom du rôle (ex: admin, editeur)"
                required
                className="w-full border p-2 rounded"
                value={roleForm.name}
                onChange={e => setRoleForm({...roleForm, name: e.target.value})}
              />
              <div className="space-y-2">
                <p className="font-semibold text-sm">Permissions :</p>
                <div className="grid grid-cols-2 gap-2">
                  {permissions.map(p => (
                    <label key={p.id} className="flex items-center space-x-2 text-sm p-2 border rounded hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roleForm.permissions.includes(p.id)}
                        onChange={() => togglePermission(p.id)}
                      />
                      <span>{p.label || p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button type="button" onClick={() => setShowRoleModal(false)} className="px-4 py-2 border rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      {showPermModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Ajouter une Permission</h3>
            <form onSubmit={handlePermSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nom technique (ex: manage_services)"
                required
                className="w-full border p-2 rounded"
                value={permForm.name}
                onChange={e => setPermForm({...permForm, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Libellé (ex: Gérer les services)"
                required
                className="w-full border p-2 rounded"
                value={permForm.label}
                onChange={e => setPermForm({...permForm, label: e.target.value})}
              />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowPermModal(false)} className="px-4 py-2 border rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-slate-600 text-white rounded">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionRolesPermissions;
