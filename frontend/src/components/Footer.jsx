import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { settings } = useAuth();
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>© 2026 {settings.site_name}. Tous droits réservés.</p>
        <p className="mt-2 text-sm">Solutions numériques innovantes pour votre entreprise.</p>
      </div>
    </footer>
  );
};

export default Footer;
