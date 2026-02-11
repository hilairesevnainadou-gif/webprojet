import { Link } from "react-router-dom";
import { ArrowRight, Code, Globe, Shield } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { settings } = useAuth();
  const { t, i18n } = useTranslation();
  const [featuredProjets, setFeaturedProjets] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);

  useEffect(() => {
    api.get("/projets").then(res => setFeaturedProjets(res.data.slice(0, 3)));
    api.get("/services").then(res => setFeaturedServices(res.data.slice(0, 3)));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-32 sm:py-48 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
              {t('welcome_at')} <span className="text-blue-500">{settings.site_name}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-8 text-slate-300 mb-10">
              {settings.portfolio_intro || t('home_description')}
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Link to="/services" className="rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-blue-500 transition-all hover:scale-105">
                {t('discover_services')}
              </Link>
              <Link to="/projets" className="text-lg font-bold leading-6 text-white flex items-center hover:text-blue-400 transition">
                {t('projets')} <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
        </div>
      </div>

      {/* Services Portfolio Section */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-blue-600 uppercase tracking-widest">{t('services')}</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {t('our_services')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map(service => (
              <div key={service.id} className="group p-8 bg-slate-50 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all">
                <div className="mb-6 inline-flex p-4 bg-blue-600 text-white rounded-2xl group-hover:scale-110 transition">
                   <Code size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{i18n.language === 'en' && service.name_en ? service.name_en : service.name}</h3>
                <p className="text-slate-600 mb-6">
                    {i18n.language === 'en' && service.description_en ? service.description_en : service.description}
                </p>
                <p className="text-blue-600 font-bold">{new Intl.NumberFormat().format(service.price)} {t('currency')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Portfolio Section */}
      <div className="py-24 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-blue-400 uppercase tracking-widest">{t('projets')}</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                        Dernières réalisations
                    </p>
                </div>
                <Link to="/projets" className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-blue-400 hover:text-white transition">
                    Voir tout le portfolio
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {featuredProjets.map(projet => (
                <div key={projet.id} className="group relative overflow-hidden rounded-3xl aspect-[4/5]">
                    <img
                        src={projet.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"}
                        alt={projet.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 p-8">
                        <h3 className="text-2xl font-bold mb-2">{i18n.language === 'en' && projet.title_en ? projet.title_en : projet.title}</h3>
                        <p className="text-slate-300 line-clamp-2 mb-4">
                            {i18n.language === 'en' && projet.description_en ? projet.description_en : projet.description}
                        </p>
                        <span className="inline-block bg-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase">{t(projet.status)}</span>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-blue-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Prêt à démarrer votre projet ?</h2>
            <Link to="/devis" className="inline-block bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-black hover:bg-slate-100 transition shadow-2xl">
                {t('request_devis')}
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
