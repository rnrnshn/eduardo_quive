import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Link } from '@tanstack/react-router'

const content = [
  "Publicou o livro de contos Mutiladas (Catalogus, 2024), Para onde foram os vivos (poesia, Alcance Editores, 2022); Lágrimas da Vida Sorrisos da Morte (poesia, Literatas, 2012).",
  "É Co-autor do livro Estórias para além do tempo – Paulina Chiziane entre Moçambique e Brasil (Ensaios, Instituto Guimarães Rosa Maputo, 2023); Co-autor do livro Brasil & África – Laços Poéticos (Poesia, Editora Letras, 2014); co-organizador das colectâneas Contos e crónicas para ler em casa vol. I e vol. II (Literatas, 2020). Em 2020 co-organizou o livro O Abismo aos pés (Literatas), com entrevista a 25 escritores lusófonos sobre a iminência do fim do mundo, em pleno pico da pandemia do novo coronavírus.",
  "Em 2022 esteve em residência literária em Lisboa, após vencer o programa de Residência Literária Maputo-Lisboa, do Camões – Centro Cultural Português em Maputo e da Câmara Municipal de Lisboa."
]

export default function LiteratureReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const words = content.join(' ').split(' ')

  return (
    <section 
      className="relative w-full min-h-[400vh] bg-off-white text-rich-black flex flex-col items-center px-6"
      ref={containerRef}
      data-theme="light"
    >
      <div className="max-w-4xl w-full sticky top-[100px] md:top-[200px] h-fit py-[10vh]">
        <h2 className="font-display text-[10vw] md:text-[5vw] leading-none tracking-tighter mb-8 uppercase text-left">
          BIOGRAFIA
        </h2>
        
        <div className="font-sans text-xl md:text-2xl leading-[1.2] md:leading-relaxed tracking-tight md:tracking-wide text-left flex flex-wrap gap-x-2 gap-y-1 font-bold md:font-normal">
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + (1 / words.length)
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </div>
        
        <div className="mt-12 md:mt-8 flex">
          <Link 
            to="/" 
            className="text-lg md:text-2xl font-bold underline decoration-2 underline-offset-4 hover:text-gray-500 transition-colors"
          >
            Leia Mais
          </Link>
        </div>
      </div>
    </section>
  )
}

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1])
  
  return (
    <span className="relative">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  )
}
