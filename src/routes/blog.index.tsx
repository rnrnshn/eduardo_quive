import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { fetchArticlesWithPagination } from '@/lib/wp/fetchers'
import BlogListSkeleton from '@/features/articles/components/BlogListSkeleton'

export const Route = createFileRoute('/blog/')({
  loaderDeps: ({ search }) => ({
    page: search?.page ?? 1,
  }),
  loader: async ({ search }) => {
    const page = search?.page ?? 1
    return await fetchArticlesWithPagination({ page, per_page: 12 })
  },
  component: BlogPage,
  pendingComponent: BlogListSkeleton,
  validateSearch: (search: Record<string, unknown> | undefined) => ({
    page: typeof search?.page === 'number'
      ? search.page
      : typeof search?.page === 'string' && Number.isFinite(Number.parseInt(search.page, 10))
        ? Number.parseInt(search.page, 10)
        : 1,
  }),
})

function BlogPage() {
  const { articles, totalPages } = Route.useLoaderData()
  const { page } = Route.useSearch()

  const currentPage = page ?? 1

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
            Blog
          </h1>
          
          <p className="font-sans text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
            Ensaios, reflexões e crónicas sobre a literatura, a arte e os dias que correm.
          </p>
        </div>
      </section>

      <section className="py-16 px-6" data-theme="light">
        <div className="max-w-6xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-sans text-xl text-gray-500">Nenhum artigo encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {articles.map((post) => (
                <article key={post.id} className="group">
                  <Link 
                    to="/blog/$postId"
                    params={{ postId: post.slug }}
                    preload="intent"
                    className="block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-rich-black">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                        />
                      ) : (
                        <div className="w-full h-full bg-rich-black" aria-hidden="true" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-amber-600 font-sans text-xs uppercase tracking-[0.2em] font-bold">
                          {post.category}
                        </span>
                        <span className="w-8 h-px bg-gray-300"></span>
                        <span className="text-gray-400 font-sans text-xs uppercase tracking-widest">
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h2 className="font-display text-2xl md:text-3xl leading-[1.1] tracking-tight text-rich-black group-hover:text-amber-700 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="font-sans text-sm text-gray-500 uppercase tracking-widest">
                        {post.date}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-20 flex justify-center items-center gap-4" aria-label="Navegação de artigos">
              <Link
                to="/blog"
                search={{ page: currentPage - 1 }}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-rich-black hover:text-white hover:border-rich-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-rich-black disabled:hover:border-gray-300 transition-colors"
                aria-label="Página anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>

              <div className="font-sans text-sm text-gray-600">
                <span className="font-semibold text-rich-black">{currentPage}</span>
                <span className="mx-2">de</span>
                {totalPages}
              </div>

              <Link
                to="/blog"
                search={{ page: currentPage + 1 }}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-rich-black hover:text-white hover:border-rich-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-rich-black disabled:hover:border-gray-300 transition-colors"
                aria-label="Próxima página"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </nav>
          )}
        </div>
      </section>
    </main>
  )
}
