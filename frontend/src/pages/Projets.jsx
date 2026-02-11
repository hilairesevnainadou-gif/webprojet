import { useEffect, useState } from "react";
import api from "../services/api";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const Projets = () => {
  const { i18n, t } = useTranslation();
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
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{t('projets')}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Découvrez nos réalisations les plus marquantes et les technologies utilisées pour propulser nos clients.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projets.length > 0 ? projets.map(projet => (
                <div key={projet.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group">
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={projet.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"}
                            alt={projet.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-blue-600 shadow-sm">
                                {t(projet.status)}
                            </span>
                        </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {i18n.language === 'en' && projet.title_en ? projet.title_en : projet.title}
                        </h2>
                        <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                            {i18n.language === 'en' && projet.description_en ? projet.description_en : projet.description}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                                    {projet.chef_projet?.name?.charAt(0) || 'P'}
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-slate-900">{projet.chef_projet?.name || 'Inconnu'}</p>
                                    <p className="text-slate-500 capitalize">{t('chef_projet')}</p>
                                </div>
                            </div>
                            {projet.link && (
                                <a href={projet.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition shadow-lg">
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )) : (
                <p className="col-span-full text-center text-slate-500 italic">Aucun projet public disponible pour le moment.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Projets;
