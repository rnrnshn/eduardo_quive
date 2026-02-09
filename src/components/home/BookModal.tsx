import { motion, AnimatePresence } from 'framer-motion'

interface Book {
  id: number
  title: string
  fullTitle?: string
  image: string
  year: string
  author?: string
  genre?: string
  publisher?: string
  description: string
  availability?: string
  buyingInfo?: string[]
}

interface BookModalProps {
  book: Book | null
  isOpen: boolean
  onClose: () => void
}

export default function BookModal({ book, isOpen, onClose }: BookModalProps) {
  if (!book) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-rich-black/90 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div className="bg-off-white text-rich-black w-full max-w-6xl h-fit max-h-[90vh] overflow-y-auto pointer-events-auto relative shadow-2xl flex flex-col md:flex-row">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-20 p-2 text-rich-black hover:text-amber-600 transition-colors"
                aria-label="Fecar"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Column: Image */}
              <div className="w-full md:w-2/5 h-full bg-gray-100 flex items-center justify-center p-8 md:p-12">
                <div className="w-full aspect-[2/3] relative">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col">
                <div className="space-y-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-sans uppercase tracking-[0.2em] text-gray-500 mb-4">
                      {book.genre && <span>{book.genre}</span>}
                      {book.genre && book.year && <span className="w-1 h-1 bg-gray-300 rounded-full"></span>}
                      {book.year && <span>{book.year}</span>}
                    </div>
                    
                    <h2 className="font-display text-xl md:text-4xl leading-[1.1] tracking-tight mb-2">
                      {book.fullTitle || book.title}
                    </h2>
                    
                    {book.author && (
                      <p className="font-sans text-xl text-gray-600 italic">
                        de {book.author}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 text-lg leading-relaxed font-sans text-gray-700">
                    {book.description.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {book.publisher && (
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Editora</h4>
                          <p className="font-sans text-gray-600">{book.publisher}</p>
                        </div>
                      )}
                      
                      {book.availability && (
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Disponibilidade</h4>
                          <div className="font-sans text-gray-600 space-y-1">
                            <p>{book.availability}</p>
                            {book.buyingInfo && book.buyingInfo.map((info, i) => (
                              <p key={i} className="text-sm border-l-2 border-gray-200 pl-3 mt-2 italic">{info}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
