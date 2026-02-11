import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Code } from "lucide-react";

const Services = () => {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/services")
      .then(res => setServices(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{t('our_services')}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Des solutions innovantes et personnalisées pour transformer vos idées en réalité numérique.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? services.map(service => (
                <div key={service.id} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 flex flex-col">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
                        <Code size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        {i18n.language === 'en' && service.name_en ? service.name_en : service.name}
                    </h2>
                    <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                        {i18n.language === 'en' && service.description_en ? service.description_en : service.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                        <span className="text-2xl font-black text-blue-600">{new Intl.NumberFormat().format(service.price)} <span className="text-sm font-bold uppercase">{t('currency')}</span></span>
                        <Link to="/devis" className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-600 transition shadow-lg">
                            {t('request_devis')}
                        </Link>
                    </div>
                </div>
            )) : (
                <p className="col-span-full text-center text-slate-500 italic">Aucun service disponible pour le moment.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Services;
