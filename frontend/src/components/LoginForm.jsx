import { useState } from 'react';
import { useAuth } from '../store/useAuth';

export default function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@novatech.local');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      onSuccess(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>Connexion</h3>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      {error && <p className="error">{error}</p>}
      <button type="submit">Se connecter</button>
    </form>
  );
}
