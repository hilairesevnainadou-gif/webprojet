import LoginForm from '../components/LoginForm';

export default function Login({ navigate }) {
  return <section><LoginForm onSuccess={() => navigate('/backoffice')} /></section>;
}
