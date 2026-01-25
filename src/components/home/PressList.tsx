const pressItems = [
  {
    id: 1,
    publication: "O País",
    date: "12 Março 2025",
    title: "Eduardo Quive e a reinvenção da narrativa moçambicana contemporânea",
    excerpt: "Uma conversa profunda sobre as raízes culturais e o futuro da literatura nos países lusófonos.",
    url: "#"
  },
  {
    id: 2,
    publication: "Jornal Notícias",
    date: "28 Fevereiro 2025",
    title: "'A Cor da Tua Sombra': Uma obra-prima de sensibilidade",
    excerpt: "O novo romance de Quive surpreende pela leveza com que trata temas densos da sociedade actual.",
    url: "#"
  },
  {
    id: 3,
    publication: "Rádio Moçambique",
    date: "15 Janeiro 2025",
    title: "Entrevista: O papel do escritor na preservação da memória colectiva",
    excerpt: "Eduardo Quive discute como a ficção pode servir de documento histórico emocional.",
    url: "#"
  },
  {
    id: 4,
    publication: "Revista Literatas",
    date: "05 Dezembro 2024",
    title: "As vozes que ecoam: Perfil de Eduardo Quive",
    excerpt: "Análise da trajectória do autor, desde os primeiros contos até ao reconhecimento internacional.",
    url: "#"
  }
]

export default function PressList() {
  return (
    <section className="w-full bg-off-white text-rich-black py-24 px-6 flex flex-col justify-center" data-theme="light">
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
