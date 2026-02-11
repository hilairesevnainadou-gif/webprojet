import { useEffect, useState } from "react";
import api from "../services/api";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Marketplace = () => {
  const { t, i18n } = useTranslation();
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/marketplace")
      .then(res => setProduits(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{t('marketplace')}</h1>
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm">Tous les produits</button>
                <button className="px-6 py-2 text-slate-500 font-bold text-sm hover:text-blue-600 transition">Logiciels</button>
                <button className="px-6 py-2 text-slate-500 font-bold text-sm hover:text-blue-600 transition">Design</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produits.length > 0 ? produits.map(p => (
                <div key={p.id} className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col group">
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={p.image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800"}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Premium</span>
                        </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {i18n.language === 'en' && p.name_en ? p.name_en : p.name}
                        </h2>
                        <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed">
                            {i18n.language === 'en' && p.description_en ? p.description_en : p.description}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <span className="text-2xl font-black text-slate-900">{new Intl.NumberFormat().format(p.price)} <span className="text-xs text-slate-400 uppercase">{t('currency')}</span></span>
                            <button className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition shadow-xl group-hover:-translate-y-1">
                                <ShoppingCart size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <p className="col-span-full text-center text-slate-500 italic">La marketplace est vide pour le moment.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
