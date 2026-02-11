import { useEffect, useState } from "react";
import api from "../services/api";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/blog")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-20 text-center">
            <h1 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter italic">Journal de bord</h1>
            <div className="h-2 w-24 bg-blue-600 mx-auto"></div>
        </div>

        <div className="space-y-24">
        {posts.length > 0 ? posts.map(post => (
          <article key={post.id} className="group grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 overflow-hidden rounded-3xl aspect-square">
                <img
                    src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
            </div>
            <div className="md:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-blue-600">Actualités</span>
                <span className="text-xs text-slate-400 font-bold">{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                {i18n.language === 'en' && post.title_en ? post.title_en : post.title}
              </h2>
              <p className="text-lg text-slate-600 line-clamp-4 leading-relaxed mb-8">
                {i18n.language === 'en' && post.content_en ? post.content_en : post.content}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400">
                    {post.author?.name.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-slate-900">{post.author?.name}</p>
                    <p className="text-xs text-slate-500">Expert NovaTech</p>
                </div>
              </div>
            </div>
          </article>
        )) : (
            <p>Aucun article publié pour le moment.</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
