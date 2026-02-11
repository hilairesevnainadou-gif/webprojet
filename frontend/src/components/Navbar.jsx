import { useAuth } from '../store/useAuth';

const links = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/devis', 'Devis'],
  ['/blog', 'Blog'],
  ['/projets', 'Projets'],
  ['/marketplace', 'Marketplace'],
];

export default function Navbar({ navigate }) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="nav">
      <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>NovaTech</h2>
      <nav>
        {links.map(([href, label]) => (
          <button key={href} onClick={() => navigate(href)}>{label}</button>
        ))}
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate('/backoffice')}>Backoffice</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>Login</button>
        )}
      </nav>
    </header>
  );
}
