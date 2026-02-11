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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog & Actualités</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? posts.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {i18n.language === 'en' && post.title_en ? post.title_en : post.title}
              </h2>
              <div className="text-sm text-slate-500 mb-4">
                Par {post.author?.name} le {new Date(post.created_at).toLocaleDateString()}
              </div>
              <p className="text-slate-600 line-clamp-3 mb-4">
                {i18n.language === 'en' && post.content_en ? post.content_en : post.content}
              </p>
              <button className="text-blue-600 font-semibold hover:underline">Lire la suite</button>
            </div>
          </article>
        )) : (
            <p>Aucun article publié pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
