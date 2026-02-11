import { useState, useEffect } from "react";
import api from "../../services/api";
import { Check, X, FileText, Briefcase, Settings, ShoppingBag } from "lucide-react";

const Moderation = () => {
  const [data, setData] = useState({
    services: [],
    blog: [],
    projets: [],
    marketplace: []
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const [s, b, p, m] = await Promise.all([
      api.get("/services"),
      api.get("/blog"),
      api.get("/projets"),
      api.get("/marketplace")
    ]);
    setData({
      services: s.data.filter(x => !x.is_validated),
      blog: b.data.filter(x => !x.is_validated),
      projets: p.data.filter(x => !x.is_validated),
      marketplace: m.data.filter(x => !x.is_validated)
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validate = async (type, id) => {
    await api.post(`/${type}/${id}/validate`);
    fetchData();
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Modération des Contenus</h2>

      <div className="space-y-8">
        {/* Section Services */}
        {data.services.length > 0 && (
          <section>
            <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-700">
              <Settings size={18} /> Services ({data.services.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.services.map(item => (
                <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                  <button onClick={() => validate('services', item.id)} className="text-green-600 border border-green-600 p-1 rounded hover:bg-green-50">
                    <Check size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section Blog */}
        {data.blog.length > 0 && (
          <section>
            <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-700">
              <FileText size={18} /> Articles Blog ({data.blog.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.blog.map(item => (
                <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-xs text-slate-500">Par {item.author?.name}</p>
                  </div>
                  <button onClick={() => validate('blog', item.id)} className="text-green-600 border border-green-600 p-1 rounded hover:bg-green-50">
                    <Check size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section Projets */}
        {data.projets.length > 0 && (
          <section>
            <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-700">
              <Briefcase size={18} /> Projets ({data.projets.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.projets.map(item => (
                <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-xs text-slate-500">Dév {item.developer?.name}</p>
                  </div>
                  <button onClick={() => validate('projets', item.id)} className="text-green-600 border border-green-600 p-1 rounded hover:bg-green-50">
                    <Check size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {Object.values(data).every(arr => arr.length === 0) && (
          <p className="text-slate-500 italic">Aucun contenu en attente de modération.</p>
        )}
      </div>
    </div>
  );
};

export default Moderation;
