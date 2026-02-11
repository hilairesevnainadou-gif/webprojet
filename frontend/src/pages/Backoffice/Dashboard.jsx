import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import GestionServices from "./GestionServices";
import GestionDevis from "./GestionDevis";
import GestionBlog from "./GestionBlog";
import GestionProjets from "./GestionProjets";
import GestionMarketplace from "./GestionMarketplace";
import GestionSettings from "./GestionSettings";
import GestionRolesPermissions from "./GestionRolesPermissions";
import GestionUsers from "./GestionUsers";
import { LayoutDashboard, Settings, FileText, Briefcase, ShoppingBag, MessageSquare, Shield, Globe, Users } from "lucide-react";

const Dashboard = () => {
  const { hasRole } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: "", label: "Aperçu", icon: LayoutDashboard, roles: ["admin", "dev"] },
    { path: "services", label: "Services", icon: Settings, roles: ["admin"] },
    { path: "devis", label: "Devis", icon: FileText, roles: ["admin"] },
    { path: "blog", label: "Blog", icon: MessageSquare, roles: ["admin", "dev"] },
    { path: "projets", label: "Projets", icon: Briefcase, roles: ["admin", "dev"] },
    { path: "marketplace", label: "Marketplace", icon: ShoppingBag, roles: ["admin"] },
    { path: "users", label: "Utilisateurs", icon: Users, roles: ["admin"] },
    { path: "roles", label: "Rôles", icon: Shield, roles: ["admin"] },
    { path: "settings", label: "Paramètres", icon: Globe, roles: ["admin"] },
  ];

  const filteredMenu = menuItems.filter(item => hasRole(item.roles));

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white p-4">
        <h2 className="text-lg font-bold mb-6 px-2 text-slate-400">Administration</h2>
        <nav className="space-y-1">
          {filteredMenu.map(item => (
            <Link
              key={item.path}
              to={item.path === "" ? "/backoffice" : `/backoffice/${item.path}`}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition ${
                (item.path === "" && location.pathname === "/backoffice") ||
                (item.path !== "" && location.pathname.includes(item.path))
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-700 text-slate-300"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-slate-50">
        <Routes>
          <Route path="/" element={
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">Bienvenue sur le Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                  <h3 className="text-slate-500 text-sm font-medium uppercase">Total Services</h3>
                  <p className="text-3xl font-bold mt-1">Actif</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
                  <h3 className="text-slate-500 text-sm font-medium uppercase">Demandes Devis</h3>
                  <p className="text-3xl font-bold mt-1">Nouveau</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-600">
                  <h3 className="text-slate-500 text-sm font-medium uppercase">Articles Blog</h3>
                  <p className="text-3xl font-bold mt-1">Publiés</p>
                </div>
              </div>
            </div>
          } />
          <Route path="services" element={<GestionServices />} />
          <Route path="devis" element={<GestionDevis />} />
          <Route path="blog" element={<GestionBlog />} />
          <Route path="projets" element={<GestionProjets />} />
          <Route path="marketplace" element={<GestionMarketplace />} />
          <Route path="users" element={<GestionUsers />} />
          <Route path="roles" element={<GestionRolesPermissions />} />
          <Route path="settings" element={<GestionSettings />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
