import { useEffect, useState } from "react";
import api from "../services/api";
import { ExternalLink } from "lucide-react";

const Projets = () => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/projets")
      .then(res => setProjets(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Projets Développeurs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projets.length > 0 ? projets.map(projet => (
          <div key={projet.id} className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
             {projet.image && <img src={projet.image} alt={projet.title} className="w-full h-40 object-cover" />}
             <div className="p-6">
               <h2 className="text-xl font-bold mb-2">{projet.title}</h2>
               <p className="text-slate-600 mb-4">{projet.description}</p>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-slate-500">Par {projet.developer?.name}</span>
                 {projet.link && (
                   <a href={projet.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                     Voir le projet <ExternalLink size={14} className="ml-1" />
                   </a>
                 )}
               </div>
             </div>
          </div>
        )) : (
            <p>Aucun projet partagé pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Projets;
