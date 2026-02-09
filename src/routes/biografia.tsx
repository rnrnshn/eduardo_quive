import { createFileRoute } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { fetchBiography } from '@/lib/wp/fetchers'
import { buildSeo, SITE_DESCRIPTION, SITE_NAME, stripHtml, truncate, toAbsoluteUrl } from '@/lib/seo'

export const Route = createFileRoute('/biografia')({
  loader: async () => {
    return await fetchBiography()
  },
  head: ({ loaderData, location }) => {
    const pathname = location?.pathname || '/biografia'
    const summarySource = loaderData?.careerSection || loaderData?.publicationsSection || ''
    const description = summarySource
      ? truncate(stripHtml(summarySource), 160)
      : SITE_DESCRIPTION

    const seo = buildSeo({
      title: 'Biografia',
      description,
      url: pathname,
      type: 'profile',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: SITE_NAME,
        description,
        url: toAbsoluteUrl(pathname),
      },
    })

    return {
      meta: seo.meta,
    }
  },
  component: BiografiaPage,
})

function BiografiaPage() {
  const biography = Route.useLoaderData()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, 200])
  const y2 = useTransform(scrollY, [1200, 3000], [0, 250])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="bg-off-white min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden flex items-end px-6 md:px-24 pb-12 md:pb-24" data-theme="dark">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img 
            src="/quive-1.jpg" 
            alt="Eduardo Quive" 
            className="w-full h-full object-cover object-top grayscale brightness-75 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[15vw] md:text-[8.5vw] leading-none tracking-tighter text-white uppercase mb-4"
          >
            BIOGRAFIA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-amber-500 font-sans text-lg md:text-2xl tracking-wide font-medium max-w-2xl"
          >
            Escritor, jornalista, curador e produtor cultural moçambicano.
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 md:px-24 border-b border-gray-100" data-theme="light">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-display tracking-tighter mb-12 leading-none uppercase">
            Eduardo Quive
          </h2>
          <div className="prose prose-xl md:prose-2xl prose-rich-black max-w-none text-gray-800 leading-relaxed font-sans font-medium">
            <p>
              Eduardo Quive nasceu a 8 de Junho de 1991, na cidade da Matola, província de Maputo, em Moçambique, onde reside. É escritor e jornalista, actuando também nas áreas de curadoria e produção de eventos literários.
            </p>
          </div>
        </div>
      </section>

      {/* Journalism Section */}
      <section className="py-32 px-6 md:px-24 bg-paper" data-theme="light">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <h3 className="font-display text-xs uppercase tracking-[0.3em] font-bold text-amber-600 mb-6">01 — Carreira</h3>
            <h2 className="text-4xl md:text-6xl font-display tracking-tighter leading-none uppercase">
              Jornalismo <br className="hidden md:block"/> & Comunicação
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8 text-lg md:text-xl text-gray-700 leading-relaxed font-sans"
               dangerouslySetInnerHTML={{ __html: biography?.careerSection || '' }}
          />
        </div>
      </section>

      {/* Immersive Photo Break */}
      <section className="relative h-[70vh] md:h-[100vh] w-full overflow-hidden" data-theme="dark">
         <motion.div style={{ y: y2 }} className="absolute inset-0 z-0">
            <img 
               src="/quive-2.jpg" 
               alt="At the Library" 
               className="w-full h-full object-cover object-top grayscale"
            />
            <div className="absolute inset-0 bg-rich-black/10" />
         </motion.div>
         <div className="absolute inset-x-0 bottom-12 flex items-center justify-center z-10">
            <div className="h-px w-24 md:w-64 bg-white/20" />
            <div className="mx-8 font-display text-white text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold opacity-40">
               MAPUTO LUX
            </div>
            <div className="h-px w-24 md:w-64 bg-white/20" />
         </div>
      </section>

      {/* Literature Section */}
      <section className="py-32 px-6 md:px-24 bg-rich-black text-off-white" data-theme="dark">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4">
            <h3 className="font-display text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-6">02 — Obras</h3>
            <h2 className="text-4xl md:text-6xl font-display tracking-tighter leading-none uppercase">
              Literatura
            </h2>
          </div>
           <div className="lg:col-span-8 flex flex-col gap-12">
             <div className="space-y-12 text-lg md:text-xl text-gray-400 leading-relaxed font-sans">
               <div className="space-y-4">
                  <h4 className="text-off-white font-bold uppercase tracking-widest text-xs">Publicações</h4>
                  <div dangerouslySetInnerHTML={{ __html: biography?.publicationsSection || '' }} />
               </div>

               <div className="space-y-4 pt-12 border-t border-white/10">
                  <h4 className="text-off-white font-bold uppercase tracking-widest text-xs">Residências & Programas</h4>
                  <div dangerouslySetInnerHTML={{ __html: biography?.residenciesSection || '' }} />
               </div>
              
              <div className="space-y-4 pt-12 border-t border-white/10">
                 <h4 className="text-off-white font-bold uppercase tracking-widest text-xs">Atuação Expandida</h4>
                 <p>
                   Foi curador e produtor do Festival Literário Resiliência (2019-2021), Feira do Livro da Livraria Minerva (2015-2019), Anonimus – Manifesto Literário e do programa Novas Narrativas para Moçambique.
                 </p>
                 <p>
                    Orienta oficinas de escrita e leitura em colaboração com várias instituições e organizações.
                 </p>
                 <p className="text-amber-500">
                    Seu trabalho inclui colaboração com artistas de diferentes disciplinas, entre a dança contemporânea e artes plásticas, escrevendo textos para catálogos e performance.
                 </p>
                 <p className="text-gray-500 text-sm italic">
                    Mantém publicações de leitura de autores moçambicanos nas redes sociais Facebook e Instagram como parte da divulgação da literatura nacional.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-32 px-6 md:px-24 bg-white" data-theme="light">
          <div className="max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                <h2 className="text-4xl md:text-7xl font-display tracking-tighter leading-none uppercase">
                   Diálogos <br /> & Multimédia
                </h2>
                <div className="text-gray-400 md:text-right max-w-sm uppercase tracking-widest text-xs font-bold leading-relaxed">
                   Entrevistas e registos audiovisuais das residências e intervenções literárias.
                </div>
             </div>
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                 {biography?.videos?.slice(0, 2).map((video, index) => (
                   <div key={index} className="aspect-video bg-gray-100 relative overflow-hidden shadow-2xl">
                     <iframe
                       className="w-full h-full"
                       src={`https://www.youtube.com/embed/${video.youtube_id}`}
                       title={video.title}
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                     />
                   </div>
                 )) || (
                   <>
                     <div className="aspect-video bg-gray-100 relative overflow-hidden shadow-2xl">
                       <iframe
                         className="w-full h-full"
                         src="https://www.youtube.com/embed/KoAv9QNt6wA"
                         title="Eduardo Quive Video 1"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                       />
                     </div>
                     <div className="aspect-video bg-gray-100 relative overflow-hidden shadow-2xl">
                       <iframe
                         className="w-full h-full"
                         src="https://www.youtube.com/embed/Q-kjskRJVDI"
                         title="Eduardo Quive Video 2"
                         frameBorder="0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                       />
                     </div>
                   </>
                 )}
              </div>
          </div>
      </section>
    </main>
  )
}
