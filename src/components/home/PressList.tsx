import { useLoaderData } from '@tanstack/react-router'
import type { HomeLoaderData } from '@/lib/wp/types'

export default function PressList() {
  const { press } = useLoaderData({ from: '/' }) as HomeLoaderData
  const pressItems = press || []
  return (
    <section id="imprensa" className="w-full bg-off-white text-rich-black py-24 px-6 flex flex-col justify-center" data-theme="light">
      <div className="w-full max-w-[1800px] mx-auto">
        <h2 className="font-display text-[10vw] md:text-[6vw] leading-none tracking-tighter mb-16 uppercase text-left border-b border-gray-200 pb-8">
          IMPRENSA
        </h2>
        
        <div className="grid grid-cols-1 gap-0">
          {pressItems.map((item) => (
            <a 
              key={item.id} 
              href={item.url}
              className="group block border-b border-gray-200 py-12 transition-colors hover:bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Meta Info */}
                <div className="md:col-span-3 flex flex-col gap-2">
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-500 group-hover:text-amber-600 transition-colors">
                    {item.publication}
                  </span>
                  <span className="font-sans text-sm text-gray-400">
                    {item.date}
                  </span>
                </div>

                {/* Main Content */}
                <div className="md:col-span-8">
                  <h3 className="font-display text-3xl md:text-4xl leading-tight mb-4 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-gray-500 text-lg leading-relaxed max-w-3xl">
                    {item.excerpt}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="md:col-span-1 flex justify-end pt-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
