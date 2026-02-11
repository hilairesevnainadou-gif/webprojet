import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('our_services')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? services.map(service => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-xl font-semibold mb-2">
              {i18n.language === 'en' && service.name_en ? service.name_en : service.name}
            </h2>
            <p className="text-slate-600 mb-4">
              {i18n.language === 'en' && service.description_en ? service.description_en : service.description}
            </p>
            {service.price && <p className="text-blue-600 font-bold mb-4">{service.price} {t('currency')}</p>}
            <Link to="/devis" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {t('request_devis')}
            </Link>
          </div>
        )) : (
            <p>Aucun service disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Services;
