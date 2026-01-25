import { useState } from 'react'
import BookModal from './BookModal'

const books = [
  {
    id: 1,
    title: "Construir",
    image: "/Capas de Livros/Construir_book (2).png",
    year: "2024",
    genre: "Literatura",
    description: "Obra recente que explora a arquitectura da alma humana e a construção de novas narrativas no Moçambique contemporâneo.",
    availability: "Disponível nas principais livrarias."
  },
  {
    id: 2,
    title: "Mutiladas",
    image: "/Capas de Livros/Mutiladas-02.png",
    year: "2023",
    genre: "Contos",
    author: "Eduardo Quive",
    publisher: "Catalogus",
    description: "Um livro de contos escritos em vários cenários e ambientes, voltados ao existencialismo, à degradação, à violência e aos pequenos gestos de amor. O autor leva-nos a estórias de mulheres, às periferias e ao exercício de memórias, numa escrita breve, intensa e provocadora.\n\nEm Mutiladas, a vida é líquida e dilui-se sem que os protagonistas se deem conta. O destino das personagens reflete uma sociedade de tragédias diárias, onde a violência e a indiferença se transformaram num manifesto de desumanidade.",
    availability: "Disponível nas livrarias em Maputo.",
    buyingInfo: [
      "Livraria Mabuku (Maputo | Matola)",
      "Livraria Sequoia (Sommershield)",
      "Livraria Ethale Publishing",
      "info@catalogus.co.mz"
    ]
  },
  {
    id: 3,
    title: "O Abismo aos Pés",
    image: "/Capas de Livros/O Abismo aos pés.png",
    year: "2020",
    fullTitle: "O Abismo aos Pés – 25 escritores respondem sobre a iminência do fim do mundo em 2020",
    genre: "Entrevista / Ensaio",
    author: "Eduardo Quive & Elton Pila",
    publisher: "Literatas",
    description: "Perguntas feitas repetem-se ao longo das páginas do livro, como se, na incerteza dos dias, precisássemos de as repetir incansavelmente na busca de respostas que nos pudessem acender a tocha. Algumas respostas são um abrir da cortina do quarto escuro em que nos encontramos, outras encerram o feixe de luz que nos entrava pela fechadura.\n\nAs respostas dizem-nos muito sobre como os autores refletiam sobre o momento pandémico, as suas angústias, medos e incertezas em relação ao mundo novo que se abria.",
    availability: "Edição física esgotada.",
    buyingInfo: ["Disponível em formato digital na Amazon."]
  },
  {
    id: 4,
    title: "Para Onde Foram os Vivos",
    image: "/Capas de Livros/Para onde foram os vivos.png",
    year: "2021",
    genre: "Prosa Poética",
    author: "Eduardo Quive",
    publisher: "Alcance Editores",
    description: "Eduardo Quive explora as cidades físicas e imaginárias através da prosa poética. Um livro que partilha registos discursivos, líricos e confessionais, criando cenários de ambiente cinematográfico.\n\nÉ o retrato do mundo em decadência, cidades em ruínas com o silêncio ensurdecedor das almas que ainda habitam o lugar com esperança no amor. Dividido em 'Cidades' (24 fragmentos) e 'Corpos' (19 textos), onde a cidade e o corpo se confundem.",
    availability: "À venda em todas as livrarias em Moçambique."
  },
  {
    id: 5,
    title: "Paulina Chiziane",
    image: "/Capas de Livros/Paulina Chiziane.png",
    year: "2020",
    genre: "Ensaio / Biografia",
    description: "Uma imersão na vida e obra da primeira mulher moçambicana a publicar um romance, Paulina Chiziane. O livro traça um perfil literário e humano de uma das vozes mais potentes da lusofonia.",
    availability: "Disponível para encomenda."
  },
  {
    id: 6,
    title: "Prognóstico",
    image: "/Capas de Livros/prognostico_livro_web.jpg",
    year: "2019",
    genre: "Poesia",
    description: "Lançado em 2019, 'Prognóstico' reúne visões e antecipações poéticas do autor sobre o estado da nação e das emoções, num período de transição e incertezas.",
    availability: "Livrarias seleccionadas."
  }
]

export default function BooksGrid() {
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (book: typeof books[0]) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  return (
    <section className="w-full bg-off-white text-rich-black py-24 px-6 min-h-screen flex flex-col justify-center" data-theme="light">
      <div className="w-full max-w-[1800px] mx-auto">
        <h2 className="font-display text-[10vw] md:text-[6vw] leading-none tracking-tighter mb-4 uppercase text-left">
          LIVROS
        </h2>
        <p className="font-sans text-gray-500 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          Obras que exploram as nuances da identidade, memória e a condição humana.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <button 
              key={book.id} 
              onClick={() => openModal(book)}
              className="group block text-left relative overflow-hidden transition-all duration-500 hover:translate-y-[-8px] cursor-pointer"
            >
              <div className="aspect-[2/3] w-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500 border border-gray-100">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="mt-4">
                <div className="text-xs font-sans uppercase tracking-[0.2em] text-amber-600 mb-1 font-bold">
                  {book.genre}
                </div>
                <h3 className="font-display text-lg leading-tight tracking-tight mb-1 group-hover:text-amber-700 transition-colors uppercase">
                  {book.title}
                </h3>
                
                <div className="text-sm font-sans text-gray-400 tracking-wide font-medium">
                  {book.year}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BookModal 
        book={selectedBook} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}

