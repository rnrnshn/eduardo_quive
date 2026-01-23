import { useEffect } from 'react'
import Lenis from 'lenis'

export default function Hero() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <section className="relative w-full h-screen font-display overflow-hidden">
      {/* Background Layer (Split 50/50) */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <div className="w-1/2 h-full bg-rich-black relative">
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero_image.jpg" 
              alt="Portrait" 
              className="w-full h-full object-cover opacity-80 grayscale mix-blend-luminosity"
            />
            {/* Gradient Overlay for text readability at bottom if needed, but blend mode handles contrast */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
        <div className="w-1/2 h-full bg-off-white"></div>
      </div>

      {/* Main Typography Layer - Centered & Blended */}
      {/* This layer sits on top of the background but below the interactive elements if any */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none mix-blend-difference pb-[2vh]">
         <h1 className="text-[12.5vw] leading-[0.8] font-bold tracking-tighter text-off-white text-center whitespace-nowrap">
            EDUARDO QUIVE
         </h1>
      </div>

      {/* Content Layer - Interactive Elements (Menu, Bio, etc.) */}
      <div className="absolute inset-0 z-20 flex w-full h-full pointer-events-none">
        {/* Left Side Content */}
        <div className="w-1/2 h-full relative pointer-events-auto">
           {/* Left side empty now as menu moved */}
        </div>

        {/* Right Side Content */}
        <div className="w-1/2 h-full relative p-6 pt-32 flex flex-col justify-between pointer-events-auto">
           {/* Subtitle */}
           <div className="absolute top-[23vw] right-6">
              <h2 className="text-[5vw] leading-[0.8] font-bold tracking-tighter text-rich-black text-right">
                Jornalista <br /> & escritor 
              </h2>
           </div>

           {/* Bio / Intro */}
           <div className="absolute top-[32vw] right-6 max-w-lg text-right space-y-4">
              <div className="flex justify-end gap-4">
                 <div className="text-lg font-sans tracking-normal text-gray-500 leading-relaxed">
                    <p>
                      Baseado em Maputo. O meu trabalho inclui a produção de reportagens multimédia. Sou autor de dois livros de poesia, um livro de contos, e co-autor e co-organizador de mais de cinco colectâneas de contos.
                    </p>
                 </div>
              </div>
           </div>

           {/* Center Icon */}
           <div className="absolute top-1/2 left-12 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-45 text-rich-black">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           </div>
        </div>
      </div>
    </section>
  )
}
