import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Projets() {
  const [projects, setProjects] = useState([]);
  useEffect(() => { api.get('/projects').then(setProjects).catch(() => setProjects([])); }, []);
  return <section><h1>Projets Développeurs</h1>{projects.map((p) => <article key={p.id} className="card"><h3>{p.title}</h3><p>{p.summary}</p></article>)}</section>;
}
