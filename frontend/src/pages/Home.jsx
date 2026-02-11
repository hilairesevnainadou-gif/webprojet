import { Link } from "react-router-dom";
import { ArrowRight, Code, Globe, Shield } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { settings } = useAuth();
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Innovez avec {settings.site_name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nous créons des solutions logicielles sur mesure, du développement web à la cybersécurité. Donnez vie à vos projets numériques.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/services" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Découvrir nos services
              </Link>
              <Link to="/devis" className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                Demander un devis <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Expertise</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tout ce dont vous avez besoin pour réussir en ligne
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Code size={20} />
                  </div>
                  Développement Web
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Solutions full-stack modernes utilisant React et Laravel.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Globe size={20} />
                  </div>
                  Marketplace Solutions
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Des produits prêts à l'emploi pour booster votre productivité.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Shield size={20} />
                  </div>
                  Sécurité & Qualité
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Nous garantissons la robustesse et la sécurité de vos applications.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
