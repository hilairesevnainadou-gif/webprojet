import { useState, useEffect } from "react";
import api from "../../services/api";
import { Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";

const GestionTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projets, setProjets] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projet_id: "",
    assigned_to: "",
    status: "todo",
    priority: "medium",
    due_date: ""
  });

  const fetchData = async () => {
    const [tasksRes, projetsRes, usersRes] = await Promise.all([
      api.get("/tasks"),
      api.get("/projets"),
      api.get("/users")
    ]);
    setTasks(tasksRes.data);
    setProjets(projetsRes.data);
    setUsers(usersRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", formData);
    setShowModal(false);
    setFormData({ title: "", description: "", projet_id: "", assigned_to: "", status: "todo", priority: "medium", due_date: "" });
    fetchData();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Suivi des Tâches</h2>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={18} /> Nouvelle Tâche
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {['todo', 'in_progress', 'done'].map(status => (
          <div key={status} className="bg-slate-100 p-4 rounded-lg">
            <h3 className="font-bold text-slate-700 uppercase mb-4 text-sm flex items-center gap-2">
              {status === 'todo' && <Clock size={16} />}
              {status === 'in_progress' && <AlertCircle size={16} className="text-blue-500" />}
              {status === 'done' && <CheckCircle size={16} className="text-green-500" />}
              {status.replace('_', ' ')}
            </h3>
            <div className="space-y-4">
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                  <h4 className="font-bold">{task.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{task.project?.title}</p>
                  <p className="text-sm text-slate-600 mt-2">{task.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                      {task.assignee?.name || 'Non assigné'}
                    </span>
                    <select
                      className="text-xs border rounded p-1"
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                    >
                      <option value="todo">À faire</option>
                      <option value="in_progress">En cours</option>
                      <option value="done">Terminé</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Créer une Tâche</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Titre" required className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <textarea placeholder="Description" className="w-full border p-2 rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              <select required className="w-full border p-2 rounded" value={formData.projet_id} onChange={e => setFormData({...formData, projet_id: e.target.value})}>
                <option value="">Sélectionner un Projet</option>
                {projets.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <select className="w-full border p-2 rounded" value={formData.assigned_to} onChange={e => setFormData({...formData, assigned_to: e.target.value})}>
                <option value="">Assigner à (Utilisateur)</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionTasks;
