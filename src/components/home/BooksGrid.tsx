import { useState } from 'react'
import BookModal from './BookModal'
import { useLoaderData } from '@tanstack/react-router'
import type { HomeLoaderData } from '@/lib/wp/types'

export default function BooksGrid() {
  const { books } = useLoaderData({ from: '/' }) as HomeLoaderData
  const [selectedBook, setSelectedBook] = useState(books?.[0] || null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (book: NonNullable<typeof books>[number]) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  return (
    <section id="livros" className="w-full bg-off-white text-rich-black py-24 px-6 min-h-screen flex flex-col justify-center" data-theme="light">
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
              className="group block text-left relative overflow-hidden transition-all duration-500 hover:translate-y-[-8px] cursor-pointer h-full flex flex-col"
            >
              <div className="aspect-[2/3] w-full overflow-hidden group-hover:shadow-2xl transition-shadow duration-500 border border-gray-100 bg-off-white">
                {book.image ? (
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" aria-hidden="true" />
                )}
              </div>
              
              <div className="mt-4 flex flex-col flex-1 min-h-[7rem]">
                <div className="text-xs font-sans uppercase tracking-[0.2em] text-amber-600 mb-1 font-bold">
                  {book.genre} - {book.year}
                </div>
                <h3 className="font-display text-lg leading-tight tracking-tight mb-2 group-hover:text-amber-700 transition-colors uppercase line-clamp-2">
                  {book.title}
                </h3>
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
