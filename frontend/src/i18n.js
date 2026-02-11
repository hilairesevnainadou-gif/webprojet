import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      "home": "Accueil",
      "services": "Services",
      "devis": "Devis",
      "blog": "Blog",
      "projets": "Projets",
      "marketplace": "Marketplace",
      "login": "Connexion",
      "logout": "Déconnexion",
      "dashboard": "Tableau de bord",
      "welcome": "Bienvenue sur NovaTech",
      "request_devis": "Demander un devis",
      "our_services": "Nos Services",
      "price_label": "Prix",
      "currency": "XOF"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "services": "Services",
      "devis": "Quote",
      "blog": "Blog",
      "projets": "Projects",
      "marketplace": "Marketplace",
      "login": "Login",
      "logout": "Logout",
      "dashboard": "Dashboard",
      "welcome": "Welcome to NovaTech",
      "request_devis": "Request a quote",
      "our_services": "Our Services",
      "price_label": "Price",
      "currency": "USD"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
