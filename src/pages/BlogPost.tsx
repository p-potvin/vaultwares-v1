import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../store/blogData';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black text-white">
        <h1 className="mb-4 font-mono text-4xl font-bold text-emerald-500">404</h1>
        <p className="mb-8 text-zinc-400">ARTICLE NOT FOUND</p>
        <Link to="/blog" className="font-mono text-sm font-bold text-emerald-400 hover:text-emerald-300">
          [ RETURN TO INTEL ]
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white"
    >
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/blog" className="mb-8 inline-flex items-center gap-2 font-mono text-sm font-medium text-zinc-400 hover:text-emerald-400">
          <ArrowLeft className="h-4 w-4" /> BACK TO INTEL
        </Link>

        <article className="rounded-2xl border border-white/10 bg-zinc-900/30 p-8 md:p-12">
          <header className="mb-10 border-b border-white/10 pb-8">
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Tag className="h-3 w-3" />
                {post.category}
              </span>
              <div className="flex items-center gap-1 font-mono text-xs text-zinc-500">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-zinc-500">
                <User className="h-3 w-3" />
                {post.author}
              </div>
            </div>
            
            <h1 className="mb-6 font-sans text-3xl font-bold leading-tight text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed border-l-2 border-emerald-500 pl-4 italic">
              {post.excerpt}
            </p>
          </header>

          <div className="prose prose-invert prose-emerald max-w-none font-sans text-zinc-300 leading-relaxed">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </div>
    </motion.div>
  );
}
