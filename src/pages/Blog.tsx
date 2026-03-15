import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../store/blogData';
import { BookOpen, Calendar, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="mb-4 font-mono text-4xl font-bold tracking-tighter text-white">
            {t('blog.title')}
          </h1>
          <p className="max-w-2xl text-zinc-400">
            {t('blog.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/30 p-6 transition-all hover:border-emerald-500/50 hover:bg-zinc-900/80"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {t(`posts.${post.id}.category`, { defaultValue: post.category })}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs text-zinc-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <h2 className="mb-3 font-sans text-xl font-bold leading-tight text-white group-hover:text-emerald-400 transition-colors">
                  {t(`posts.${post.id}.title`, { defaultValue: post.title })}
                </h2>
                <p className="mb-6 text-sm text-zinc-400 line-clamp-3">
                  {t(`posts.${post.id}.excerpt`, { defaultValue: post.excerpt })}
                </p>
              </div>
              <div className="flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-xs text-zinc-500">
                <User className="h-3 w-3" />
                {post.author}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
