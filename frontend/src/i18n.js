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
      "profile": "Mon Profil",
      "settings": "Paramètres",
      "users": "Utilisateurs",
      "roles": "Rôles",
      "tasks": "Tâches",
      "moderation": "Modération",
      "welcome_at": "Innovez avec",
      "home_description": "Nous créons des solutions logicielles sur mesure, du développement web à la cybersécurité. Donnez vie à vos projets numériques.",
      "discover_services": "Découvrir nos services",
      "request_devis": "Demander un devis",
      "our_services": "Nos Services",
      "price_label": "Prix",
      "currency": "XOF",
      "status": "Statut",
      "nature": "Nature",
      "private": "Privé",
      "public": "Public",
      "ongoing": "En cours",
      "development": "Développement",
      "production": "Production",
      "actions": "Actions",
      "save": "Enregistrer",
      "cancel": "Annuler",
      "delete_confirm": "Êtes-vous sûr ?",
      "name_fr": "Nom (FR)",
      "name_en": "Nom (EN)",
      "desc_fr": "Description (FR)",
      "desc_en": "Description (EN)",
      "title_fr": "Titre (FR)",
      "title_en": "Titre (EN)",
      "content_fr": "Contenu (FR)",
      "content_en": "Contenu (EN)",
      "chef_projet": "Chef de Projet",
      "visibility": "Visibilité",
      "todo": "À faire",
      "in_progress": "En cours",
      "done": "Terminé"
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
      "profile": "Profile",
      "settings": "Settings",
      "users": "Users",
      "roles": "Roles",
      "tasks": "Tasks",
      "moderation": "Moderation",
      "welcome_at": "Innovate with",
      "home_description": "We create tailor-made software solutions, from web development to cybersecurity. Bring your digital projects to life.",
      "discover_services": "Discover our services",
      "request_devis": "Request a quote",
      "our_services": "Our Services",
      "price_label": "Price",
      "currency": "XOF",
      "status": "Status",
      "nature": "Nature",
      "private": "Private",
      "public": "Public",
      "ongoing": "Ongoing",
      "development": "Development",
      "production": "Production",
      "actions": "Actions",
      "save": "Save",
      "cancel": "Cancel",
      "delete_confirm": "Are you sure ?",
      "name_fr": "Name (FR)",
      "name_en": "Name (EN)",
      "desc_fr": "Description (FR)",
      "desc_en": "Description (EN)",
      "title_fr": "Title (FR)",
      "title_en": "Title (EN)",
      "content_fr": "Content (FR)",
      "content_en": "Content (EN)",
      "chef_projet": "Project Manager",
      "visibility": "Visibility",
      "todo": "To do",
      "in_progress": "In progress",
      "done": "Done"
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
