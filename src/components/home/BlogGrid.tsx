import { useState, useCallback, useEffect } from 'react'
import { Link, useLoaderData } from '@tanstack/react-router'
import useEmblaCarousel from 'embla-carousel-react'
import type { HomeLoaderData } from '@/lib/wp/types'

export default function BlogGrid() {
  const { articles } = useLoaderData({ from: '/' }) as HomeLoaderData
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  const posts = articles || []

  return (
    <section id="blog" className="w-full bg-rich-black text-off-white py-24 px-6 min-h-screen flex flex-col justify-center" data-theme="dark">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-[10vw] md:text-[6vw] leading-none tracking-tighter mb-4 uppercase text-left">
              BLOG
            </h2>
            <p className="font-sans text-gray-400 text-lg md:text-xl leading-relaxed">
              Ensaios, reflexões e crónicas sobre a literatura, a arte e os dias que correm.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-end gap-8">
             {/* Navigation Controls */}
             <div className="flex gap-4">
              <button 
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link 
              to="/blog"
              preload="intent"
              className="group flex items-center gap-2 font-sans text-lg uppercase tracking-widest text-off-white hover:text-gray-300 transition-colors pb-2 md:pb-4"
            >
              <span>Ver todos</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

         {/* Carousel */}
        <div className="overflow-hidden p-1 -m-1" ref={emblaRef}>
          <div className="flex -ml-6">
            {posts.map((post) => (
              <div className="flex-[0_0_100%] md:flex-[0_0_40%] pl-6 min-w-0" key={post.id}>
                 <Link 
                   to="/blog/$postId"
                   params={{ postId: post.slug }}
                   preload="intent"
                   className="group block relative h-[600px] w-full overflow-hidden rounded-none"
                 >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-rich-black">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-rich-black" aria-hidden="true" />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-amber-500 font-sans text-xs uppercase tracking-[0.2em] font-bold">
                          {post.category}
                        </span>
                        <span className="w-8 h-px bg-gray-500"></span>
                        <span className="text-gray-400 font-sans text-xs uppercase tracking-widest">
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-tight mb-4 text-white group-hover:text-gray-100 transition-colors">
                        {post.title}
                      </h3>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-sm font-sans uppercase tracking-widest text-amber-500 flex items-center gap-2 mt-4">
                        Ler Artigo
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
