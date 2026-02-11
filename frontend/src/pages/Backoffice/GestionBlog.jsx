import { useEffect, useState } from "react";
import api from "../../services/api";
import { Plus, Trash2, Edit } from "lucide-react";

const GestionBlog = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", status: "draft", image: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchPosts = () => api.get("/blog").then(res => setPosts(res.data));

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/blog/${editingId}`, formData);
    } else {
      await api.post("/blog", formData);
    }
    setShowModal(false);
    setFormData({ title: "", content: "", status: "draft", image: "" });
    setEditingId(null);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditingId(post.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cet article ?")) {
      await api.delete(`/blog/${id}`);
      fetchPosts();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestion du Blog</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded">
          <Plus size={18} /> <span>Nouvel Article</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4">{p.title}</td>
                <td className="px-6 py-4">{p.author?.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${p.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {p.status}
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
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-bold mb-4">{editingId ? "Modifier" : "Ajouter"} un Article</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Titre" required className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <textarea placeholder="Contenu" required rows={8} className="w-full border p-2 rounded" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
              <div className="flex space-x-4">
                <select className="flex-1 border p-2 rounded" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
                <input type="text" placeholder="URL Image" className="flex-1 border p-2 rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
              </div>
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

export default GestionBlog;
