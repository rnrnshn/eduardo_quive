import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { fetchPage } from '@/lib/wp/fetchers'
import type { WPPost } from '@/lib/wp/types'

export const Route = createFileRoute('/curadoria')({
  loader: async () => {
    return await fetchPage('curadoria')
  },
  component: CuradoriaPage,
})

function CuradoriaPage() {
  const page = Route.useLoaderData() as WPPost | null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-off-white">
        <h1 className="font-display text-4xl mb-8">Curadoria</h1>
        <p className="font-sans text-gray-600 mb-8">Conteúdo não encontrado.</p>
        <Link to="/" className="text-amber-600 font-bold underline">Voltar ao Início</Link>
      </div>
    )
  }

  const title = page.title?.rendered
    ? page.title.rendered.replace(/<[^>]*>/g, '')
    : 'Curadoria'

  return (
    <main className="bg-off-white min-h-screen">
      <section className="w-full py-32 px-6" data-theme="light">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/"
            className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-rich-black/60 hover:text-amber-600 transition-colors mb-8"
          >
            <svg className="w-4 h-4 transform rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Voltar à Página Inicial
          </Link>

          <h1 className="font-display text-6xl md:text-8xl lg:text-[10vw] leading-[0.9] tracking-tighter text-rich-black uppercase mb-6">
            {title}
          </h1>
        </div>
      </section>

      <section className="py-16 px-6" data-theme="light">
        <div className="max-w-4xl mx-auto">
          <article
            className="prose prose-xl prose-rich-black max-w-none font-sans text-gray-700 leading-relaxed space-y-8 text-left"
            dangerouslySetInnerHTML={{ __html: page.content?.rendered || '' }}
          />
        </div>
      </section>
    </main>
  )
}
