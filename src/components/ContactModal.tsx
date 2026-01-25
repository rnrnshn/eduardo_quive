import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    // For now just close the modal
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
            className="fixed inset-0 bg-rich-black/80 backdrop-blur-sm z-[60] cursor-pointer"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-off-white text-rich-black w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl pointer-events-auto flex flex-col md:flex-row">
              
              {/* Left Side: Contact Info & Socials */}
              <div className="w-full md:w-1/3 bg-rich-black text-off-white p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-4xl mb-8">Vamos Conversar</h3>
                  <p className="font-sans text-gray-400 mb-12 leading-relaxed">
                    Estou sempre aberto a novas ideias, colaborações literárias ou simplesmente para trocar impressões sobre livros e escrita.
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-amber-500 mb-2">Email</h4>
                      <a href="mailto:info@eduardoquive.com" className="hover:text-amber-400 transition-colors">
                        info@eduardoquive.com
                      </a>
                    </div>
                    
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-amber-500 mb-2">Localização</h4>
                      <p>Maputo, Moçambique</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 md:mt-0">
                  <h4 className="text-xs uppercase tracking-widest text-amber-500 mb-4">Redes Sociais</h4>
                  <div className="flex flex-col gap-3 font-medium">
                    <a href="#" className="hover:text-amber-400 transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-amber-400 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-amber-400 transition-colors">Facebook</a>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="w-full md:w-2/3 p-8 md:p-12 relative bg-white">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h3 className="font-display text-3xl mb-8 text-rich-black">Envie uma mensagem</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm uppercase tracking-wider font-bold text-gray-500">Nome</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-amber-500 transition-colors text-rich-black"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm uppercase tracking-wider font-bold text-gray-500">Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-amber-500 transition-colors text-rich-black"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm uppercase tracking-wider font-bold text-gray-500">Mensagem</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:border-amber-500 transition-colors text-rich-black resize-none"
                      placeholder="Sobre o que gostaria de conversar?"
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="bg-rich-black text-off-white px-8 py-4 font-sans font-bold text-lg hover:bg-amber-600 transition-colors w-full md:w-auto"
                    >
                      Enviar Mensagem
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
