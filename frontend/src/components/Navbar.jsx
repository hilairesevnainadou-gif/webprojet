import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, hasRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-400">NovaTech</Link>
            <div className="hidden md:block ml-10 flex items-baseline space-x-4">
              <Link to="/services" className="px-3 py-2 rounded-md hover:bg-slate-700">Services</Link>
              <Link to="/devis" className="px-3 py-2 rounded-md hover:bg-slate-700">Devis</Link>
              <Link to="/blog" className="px-3 py-2 rounded-md hover:bg-slate-700">Blog</Link>
              <Link to="/projets" className="px-3 py-2 rounded-md hover:bg-slate-700">Projets</Link>
              <Link to="/marketplace" className="px-3 py-2 rounded-md hover:bg-slate-700">Marketplace</Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {user ? (
                <>
                  {hasRole(['admin', 'dev']) && (
                    <Link to="/backoffice" className="flex items-center space-x-1 px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
                      <LayoutDashboard size={18} />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  <span className="text-slate-300">Bonjour, {user.name}</span>
                  <button onClick={logout} className="flex items-center space-x-1 px-3 py-2 bg-red-600 rounded-md hover:bg-red-700">
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center space-x-1 px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
                  <LogIn size={18} />
                  <span>Connexion</span>
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-slate-700 focus:outline-none">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/services" className="block px-3 py-2 rounded-md hover:bg-slate-700">Services</Link>
          <Link to="/devis" className="block px-3 py-2 rounded-md hover:bg-slate-700">Devis</Link>
          <Link to="/blog" className="block px-3 py-2 rounded-md hover:bg-slate-700">Blog</Link>
          <Link to="/projets" className="block px-3 py-2 rounded-md hover:bg-slate-700">Projets</Link>
          <Link to="/marketplace" className="block px-3 py-2 rounded-md hover:bg-slate-700">Marketplace</Link>
          {user ? (
            <>
              {hasRole(['admin', 'dev']) && (
                <Link to="/backoffice" className="block px-3 py-2 rounded-md bg-blue-600">Dashboard</Link>
              )}
              <button onClick={logout} className="w-full text-left block px-3 py-2 rounded-md bg-red-600">Déconnexion</button>
            </>
          ) : (
            <Link to="/login" className="block px-3 py-2 rounded-md bg-blue-600">Connexion</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
