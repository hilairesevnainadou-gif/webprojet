import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { api.get('/blogs').then(setPosts).catch(() => setPosts([])); }, []);
  return <section><h1>Blog</h1>{posts.map((p) => <article key={p.id} className="card"><h3>{p.title}</h3><p>{p.content.slice(0, 180)}...</p></article>)}</section>;
}
