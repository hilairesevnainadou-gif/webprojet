import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/activate", {
        token,
        password,
        password_confirmation: passwordConfirmation
      });
      setMessage("Compte activé avec succès ! Vous pouvez maintenant vous connecter.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("Le lien d'activation est invalide ou a expiré.");
    }
  };

  if (!token) return <div className="p-10 text-center text-red-600 font-bold">Jeton d'invitation manquant.</div>;

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Activer votre compte
        </h2>
        <p className="text-center text-sm text-slate-500">Définissez votre mot de passe pour finaliser l'inscription.</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {message && <div className="text-green-600 text-sm bg-green-50 p-2 rounded">{message}</div>}
          {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-900">Nouveau mot de passe</label>
            <input
              type="password"
              required
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Confirmer le mot de passe</label>
            <input
              type="password"
              required
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Activer mon compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivateAccount;
