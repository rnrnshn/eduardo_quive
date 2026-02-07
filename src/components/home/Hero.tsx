export default function Hero() {
  return (
    <section className="relative w-full h-screen font-display overflow-hidden" data-theme="light">
      {/* Background Layer */}
      <div className="absolute inset-0 flex flex-col md:flex-row w-full h-full z-0">
        {/* Image Side (Bottom on mobile: order-2, Left on desktop: md:order-1) */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 bg-rich-black relative order-2 md:order-1">
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero_image.jpg" 
              alt="Portrait" 
              className="w-full h-full object-cover opacity-80 grayscale mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>

        {/* Text Side (Top on mobile: order-1, Right on desktop: md:order-2) */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 bg-off-white order-1 md:order-2"></div>
      </div>

      {/* Main Typography Layer - "EDUARDO QUIVE" */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none mix-blend-difference pb-[4vh] md:pb-[2vh]">
         <h1 className="text-[12vw] md:text-[12.5vw] leading-[0.8] font-bold tracking-tighter text-off-white text-center whitespace-nowrap">
            EDUARDO QUIVE
         </h1>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col md:flex-row w-full h-full pointer-events-none">
        {/* Content Side (Top on mobile: order-1, Right on desktop: md:order-2) */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 relative p-6 pt-32 md:pt-32 flex flex-col justify-start md:justify-between pointer-events-auto order-1 md:order-2">
           {/* Subtitle */}
           <div className="md:absolute md:top-[23vw] md:right-6 mb-6">
              <h2 className="text-[12vw] md:text-[5vw] leading-[0.8] font-bold tracking-tighter text-rich-black text-left md:text-right">
                Jornalista <br /> & escritor 
              </h2>
           </div>

           {/* Bio / Intro */}
           <div className="md:absolute md:top-[32vw] md:right-6 lg:max-w-lg text-left md:text-right space-y-4">
              <div className="flex justify-start md:justify-end gap-4">
                 <div className="text-sm md:text-lg font-sans tracking-normal text-gray-500 leading-relaxed max-w-[300px] md:max-w-none">
                    <p>
                      Baseado em Maputo. Produz reportagens multimédia e é autor de livros de poesia, contos e ensaios sobre a lusofonia.
                    </p>
                 </div>
              </div>
           </div>

           {/* Center Icon - Hidden on mobile for cleaner look or repositioned */}
           <div className="hidden md:block absolute top-1/2 left-12 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-45 text-rich-black">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           </div>
        </div>

        {/* Empty side (Bottom on mobile: order-2, Left on desktop: md:order-1) */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 relative order-2 md:order-1"></div>
      </div>
    </section>
  )
}
