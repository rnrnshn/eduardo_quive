import { useState } from 'react'
import BookModal from './BookModal'
import { useRouteContext } from '@tanstack/react-router'

export default function BooksGrid() {
  const { books } = useRouteContext({ from: '/' })
  const [selectedBook, setSelectedBook] = useState(books?.[0] || null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (book: NonNullable<typeof books>[number]) => {
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
          {books?.map((book) => (
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

