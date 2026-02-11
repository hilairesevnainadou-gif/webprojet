import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Marketplace() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get('/marketplace').then(setItems).catch(() => setItems([])); }, []);
  return <section><h1>Marketplace</h1>{items.map((i) => <article key={i.id} className="card"><h3>{i.name}</h3><p>{i.description}</p><strong>{i.price} €</strong></article>)}</section>;
}
