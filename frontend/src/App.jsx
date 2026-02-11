import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Blog from './pages/Blog';
import Devis from './pages/Devis';
import Home from './pages/Home';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import Projets from './pages/Projets';
import Services from './pages/Services';
import Dashboard from './pages/Backoffice/Dashboard';
import GestionBlog from './pages/Backoffice/GestionBlog';
import GestionDevis from './pages/Backoffice/GestionDevis';
import GestionMarketplace from './pages/Backoffice/GestionMarketplace';
import GestionProjets from './pages/Backoffice/GestionProjets';
import GestionServices from './pages/Backoffice/GestionServices';
import { useAuth } from './store/useAuth';
import { api } from './services/api';

function Backoffice({ navigate }) {
  const [stats, setStats] = useState({});
  const [tab, setTab] = useState('dashboard');
  const { user } = useAuth();

  useEffect(() => {
    api.get('/stats').then(setStats).catch(() => setStats({}));
  }, []);

  const tabs = [
    ['dashboard', 'Dashboard', Dashboard],
    ['services', 'Services', GestionServices],
    ['devis', 'Devis', GestionDevis],
    ['blog', 'Blog', GestionBlog],
    ['projets', 'Projets', GestionProjets],
    ['marketplace', 'Marketplace', GestionMarketplace],
  ];

  const Active = tabs.find((t) => t[0] === tab)?.[2] || Dashboard;

  return (
    <div>
      <h1>Backoffice ({user?.role?.name || 'Role'})</h1>
      <div className="tabbar">
        {tabs.map(([key, label]) => <button key={key} onClick={() => setTab(key)}>{label}</button>)}
        <button onClick={() => navigate('/')}>Retour site</button>
      </div>
      {tab === 'dashboard' ? <Active stats={stats} /> : <Active />}
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const { isAuthenticated, loading } = useAuth();

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  };

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (loading) return <p>Loading...</p>;

  const pages = {
    '/': <Home />,
    '/services': <Services />,
    '/devis': <Devis />,
    '/blog': <Blog />,
    '/projets': <Projets />,
    '/marketplace': <Marketplace />,
    '/login': <Login navigate={navigate} />,
  };

  const content = path.startsWith('/backoffice')
    ? (isAuthenticated ? <Backoffice navigate={navigate} /> : <Login navigate={navigate} />)
    : (pages[path] || <Home />);

  return (
    <div className="layout">
      <Navbar navigate={navigate} />
      <main>{content}</main>
      <Footer />
    </div>
  );
}
