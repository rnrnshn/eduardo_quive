export default function Hero() {
  return (
    <section className="relative w-full h-dvh font-display overflow-hidden" data-theme="light">
      {/* Background Layer */}
      <div className="absolute inset-0 flex flex-col md:flex-row w-full h-full z-0">
        {/* Image Side (Bottom on mobile: order-2, Left on desktop: md:order-1) */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 bg-rich-black relative order-2 md:order-1">
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero_image.webp" 
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
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none mix-blend-difference pb-[4vh] md:pb-0">
         <h1 className="text-[12vw] md:text-[12.5vw] leading-[0.8] font-bold tracking-tighter text-off-white text-center whitespace-nowrap">
            EDUARDO QUIVE
         </h1>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col md:flex-row w-full h-full pointer-events-none">
        {/* Content Side (Top on mobile: order-1, Right on desktop: md:order-2) */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 relative p-6 pt-32 md:pt-32 md:pb-[clamp(11rem,20vh,15rem)] flex flex-col justify-start pointer-events-auto order-1 md:order-2">
           {/* Subtitle */}
           <div className="mb-6 md:mb-5 md:mt-[clamp(4rem,11vh,8rem)] md:ml-auto">
              <h2 className="text-[12vw] md:text-[clamp(3.25rem,4.6vw,4.75rem)] leading-[0.8] font-bold tracking-tighter text-rich-black text-left md:text-right">
                Jornalista <br /> & escritor 
              </h2>
           </div>

           {/* Bio / Intro */}
           <div className="md:ml-auto lg:max-w-lg text-left md:text-right space-y-4">
              <div className="flex justify-start md:justify-end gap-4">
                 <div className="text-sm md:text-[clamp(1rem,1.5vw,1.35rem)] font-sans tracking-normal text-gray-500 leading-relaxed max-w-[300px] md:max-w-[34rem]">
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
