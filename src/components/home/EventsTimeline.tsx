import { useLoaderData } from '@tanstack/react-router'
import type { HomeLoaderData } from '@/lib/wp/types'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export default function EventsTimeline() {
  const { events } = useLoaderData({ from: '/' }) as HomeLoaderData
  const sortedEvents = events || []

  return (
    <section id="eventos" className="w-full bg-rich-black text-off-white py-24 px-6 min-h-screen flex flex-col justify-center" data-theme="dark">
      <div className="w-full max-w-[1800px] mx-auto">
        <h2 className="font-display text-[10vw] md:text-[6vw] leading-none tracking-tighter mb-4 uppercase text-left">
          EVENTOS
        </h2>
        <p className="font-sans text-gray-400 text-lg md:text-xl max-w-2xl mb-20 leading-relaxed">
          Presença em festivais, feiras do livro e conversas sobre o universo literário moçambicano e lusófono.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Timeline */}
          <div className="lg:col-span-7 relative">
            {/* Timeline line - aligned to left on mobile/desktop in this layout */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-600" />
            
            <div className="space-y-16 pl-8">
              {sortedEvents.map((event) => {
                const isUpcoming = event.type === 'upcoming'
                
                return (
                  <div 
                    key={event.id}
                    className="relative flex flex-col items-start"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute -left-8 transform -translate-x-[6.5px] w-3 h-3 border-2 z-10 top-2 ${
                      isUpcoming 
                        ? 'bg-amber-500 border-amber-400' 
                        : 'bg-gray-700 border-gray-600'
                    }`} />
                    
                    {/* Content */}
                    <div className={`w-full transition-all duration-300 hover:translate-x-2 ${
                      isUpcoming 
                        ? 'bg-amber-900/20 border-l-2 border-amber-500 p-8 pt-6' 
                        : 'bg-gray-900/30 border-l border-gray-800 p-8 pt-6 opacity-75 hover:opacity-100'
                    }`}>
                      {isUpcoming && (
                        <span className="inline-block px-3 py-1 text-[10px] font-sans uppercase tracking-[0.2em] bg-amber-500 text-rich-black mb-4 font-bold">
                          Próximo
                        </span>
                      )}
                      
                      <div className={`text-xs font-sans uppercase tracking-[0.2em] mb-3 ${isUpcoming ? 'text-amber-400' : 'text-gray-500'}`}>
                        {formatDate(event.date)}
                      </div>
                      
                      <h3 className={`font-display text-2xl md:text-4xl leading-tight tracking-tight mb-4 ${
                        isUpcoming ? 'text-off-white' : 'text-gray-300'
                      }`}>
                        {event.title}
                      </h3>
                      
                      <div className={`flex items-center gap-2 text-sm font-sans mb-4 ${
                        isUpcoming ? 'text-amber-300/80' : 'text-gray-500'
                      }`}>
                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="tracking-wide uppercase text-xs">{event.location}</span>
                      </div>
                      
                      <p className={`font-sans text-base leading-relaxed ${isUpcoming ? 'text-gray-300' : 'text-gray-500'}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Featured Image */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="relative group overflow-hidden">
               {/* Decorative frame elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-amber-500/30"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-amber-500/30"></div>
              
              <img 
                src="/events-images.webp" 
                alt="Eduardo Quive em eventos literários" 
                className="w-full aspect-[4/5] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/60 to-transparent opacity-60"></div>
              
              <p className="absolute bottom-6 left-6 right-6 text-xs font-sans uppercase tracking-[0.2em] text-amber-500/80 font-medium">
                Registos de participação e diálogos literários
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
