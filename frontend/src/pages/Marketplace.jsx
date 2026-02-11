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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {produits.length > 0 ? produits.map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden flex flex-col">
            {p.image ? (
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">Image non disponible</div>
            )}
            <div className="p-4 flex-grow flex flex-col">
              <h2 className="text-lg font-bold mb-1">
                {i18n.language === 'en' && p.name_en ? p.name_en : p.name}
              </h2>
              <p className="text-sm text-slate-600 mb-4 flex-grow">
                {i18n.language === 'en' && p.description_en ? p.description_en : p.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-blue-600">{p.price} {t('currency')}</span>
                <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        )) : (
            <p>La marketplace est vide pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
