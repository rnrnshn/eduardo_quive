import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Link } from '@tanstack/react-router'

export default function LiteratureReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const content = 'Autor de «A cor da tua sombra» (romance), «Mutiladas» (contos), «Para onde foram os vivos» (poesia); assina a co-organização edição quatro antologias de ficção, incluindo «Construir amanhã com barro de dentro - vozes do pós-independência», «As pauladas do amor» e ainda o livro de entrevistas «O Abismo aos Pés - 25 escritores respondem sobre a iminência do fim do mundo em 2020». A sua obra «Mutiladas» foi indicada para leitura no ensino secundário nos países de língua portuguesa pelo Instituto Internacional de Língua Portuguesa (IILP).'
  const words = content.split(' ')

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
            to="/biografia"
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
