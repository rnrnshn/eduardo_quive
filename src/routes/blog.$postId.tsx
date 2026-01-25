import { createFileRoute } from '@tanstack/react-router'
import { blogPosts } from '@/constants/blogData'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/blog/$postId')({
  component: PostPage,
})

function PostPage() {
  const { postId } = Route.useParams()
  const post = blogPosts.find((p) => p.id === Number(postId))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-off-white">
        <h1 className="font-display text-4xl mb-8">Artigo não encontrado</h1>
        <Link to="/" className="text-amber-600 font-bold underline">Voltar ao Início</Link>
      </div>
    )
  }

  return (
    <main className="bg-off-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[75vh] w-full overflow-hidden" data-theme="dark">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-24">
          <div className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 text-amber-500 font-sans text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-6"
            >
              <span>{post.category}</span>
              <span className="w-12 h-px bg-amber-500/50"></span>
              <span>{post.readTime}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tighter text-white uppercase"
            >
              {post.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6" data-theme="light">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-16 border-b border-gray-200 pb-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Autor</span>
              <span className="font-sans text-lg text-rich-black font-medium">{post.author}</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Data</span>
              <span className="font-sans text-lg text-rich-black">{post.date}</span>
            </div>
          </div>

          <article className="prose prose-xl prose-rich-black max-w-none font-sans text-gray-700 leading-relaxed space-y-8 text-left">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-rich-black">
                {paragraph.trim()}
              </p>
            ))}
          </article>

          {/* Back Button */}
          <div className="mt-24 pt-12 border-t border-gray-100 flex justify-center">
            <Link 
              to="/"
              className="group flex items-center gap-4 font-display text-2xl uppercase tracking-tighter hover:text-amber-600 transition-colors"
            >
              <svg className="w-8 h-8 transform rotate-180 group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Voltar à Página Inicial
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
