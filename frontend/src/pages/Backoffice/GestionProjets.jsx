import { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Trash2, Edit } from "lucide-react";
import { useTranslation } from "react-i18next";

const GestionProjets = () => {
  const { t, i18n } = useTranslation();
  const [projets, setProjets] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "", title_en: "",
    description: "", description_en: "",
    link: "", image: "",
    chef_projet_id: "",
    status: "ongoing",
    nature: "private",
    is_visible_publicly: false
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
    try {
      if (editingId) {
        await api.put(`/projets/${editingId}`, formData);
      } else {
        await api.post("/projets", formData);
      }
      setShowModal(false);
      resetForm();
      fetchProjets();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "", title_en: "",
      description: "", description_en: "",
      link: "", image: "",
      chef_projet_id: "",
      status: "ongoing",
      nature: "private",
      is_visible_publicly: false
    });
    setEditingId(null);
  };

  const handleEdit = (p) => {
    setFormData({
      title: p.title || "",
      title_en: p.title_en || "",
      description: p.description || "",
      description_en: p.description_en || "",
      link: p.link || "",
      image: p.image || "",
      chef_projet_id: p.chef_projet_id || "",
      status: p.status || "ongoing",
      nature: p.nature || "private",
      is_visible_publicly: !!p.is_visible_publicly
    });
    setEditingId(p.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('delete_confirm'))) {
      await api.delete(`/projets/${id}`);
      fetchProjets();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t('projets')}</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded">
          <Plus size={18} /> <span>{t('actions')}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('title_fr')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('chef_projet')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('nature')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('visibility')}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projets.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4">{i18n.language === 'en' && p.title_en ? p.title_en : p.title}</td>
                <td className="px-6 py-4">{p.chef_projet?.name || 'N/A'}</td>
                <td className="px-6 py-4 capitalize">{t(p.status)}</td>
                <td className="px-6 py-4 capitalize">{t(p.nature)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${p.is_visible_publicly ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {p.is_visible_publicly ? t('public') : t('private')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{editingId ? t('save') : t('actions')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder={t('title_fr')} required className="border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <input type="text" placeholder={t('title_en')} className="border p-2 rounded" value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <textarea placeholder={t('desc_fr')} required className="border p-2 rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <textarea placeholder={t('desc_en')} className="border p-2 rounded" value={formData.description_en} onChange={e => setFormData({...formData, description_en: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select required className="border p-2 rounded" value={formData.chef_projet_id} onChange={e => setFormData({...formData, chef_projet_id: e.target.value})}>
                  <option value="">{t('chef_projet')}</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
                <select required className="border p-2 rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="ongoing">{t('ongoing')}</option>
                  <option value="development">{t('development')}</option>
                  <option value="production">{t('production')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select required className="border p-2 rounded" value={formData.nature} onChange={e => setFormData({...formData, nature: e.target.value})}>
                  <option value="private">{t('private')}</option>
                  <option value="public">{t('public')}</option>
                </select>
                <div className="flex items-center gap-2">
                   <input
                    type="checkbox"
                    id="is_visible"
                    disabled={formData.nature === 'private'}
                    checked={formData.is_visible_publicly}
                    onChange={e => setFormData({...formData, is_visible_publicly: e.target.checked})}
                  />
                   <label htmlFor="is_visible" className={formData.nature === 'private' ? 'text-slate-400' : ''}>
                     {t('visibility')} ({t('public')})
                   </label>
                </div>
              </div>

              <input type="url" placeholder="Lien (URL)" className="w-full border p-2 rounded" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
              <input type="text" placeholder="URL Image" className="w-full border p-2 rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />

              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={() => {setShowModal(false); resetForm();}} className="px-4 py-2 border rounded">{t('cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{t('save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionProjets;
