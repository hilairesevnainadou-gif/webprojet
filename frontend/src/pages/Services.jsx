import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Services() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get('/services').then(setItems).catch(() => setItems([])); }, []);
  return <section><h1>Services</h1>{items.map((s) => <article key={s.id} className="card"><h3>{s.name}</h3><p>{s.description}</p><strong>{s.price} €</strong></article>)}</section>;
}
