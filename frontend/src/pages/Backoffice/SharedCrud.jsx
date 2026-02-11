import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function CrudView({ title, endpoint, fields }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(Object.fromEntries(fields.map((f) => [f, ''])));

  const load = () => api.get(endpoint).then(setItems).catch(() => setItems([]));
  useEffect(load, [endpoint]);

  const submit = async (e) => {
    e.preventDefault();
    await api.post(endpoint, form);
    setForm(Object.fromEntries(fields.map((f) => [f, ''])));
    load();
  };

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
    load();
  };

  return (
    <section>
      <h1>{title}</h1>
      <form onSubmit={submit} className="card">
        {fields.map((field) => <input key={field} placeholder={field} value={form[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} />)}
        <button>Créer</button>
      </form>
      {items.map((item) => <article key={item.id} className="card"><pre>{JSON.stringify(item, null, 2)}</pre><button onClick={() => remove(item.id)}>Supprimer</button></article>)}
    </section>
  );
}
