import { useState } from 'react';
import { api } from '../services/api';

export default function Devis() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('');
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    await api.post('/quotes', form);
    setStatus('Demande envoyée.');
    setForm({ name: '', email: '', company: '', message: '' });
  };
  return <section><h1>Demande de devis</h1><form onSubmit={submit} className="card">{['name','email','company'].map((k)=><input key={k} name={k} value={form[k]} onChange={onChange} placeholder={k} />)}<textarea name="message" value={form.message} onChange={onChange} placeholder="message" /><button>Envoyer</button>{status && <p>{status}</p>}</form></section>;
}
