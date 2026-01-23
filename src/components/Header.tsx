import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full p-6 flex justify-end items-center z-50 text-rich-black">
      <nav className="flex gap-6 text-lg tracking-tight uppercase font-bold">
        {['Biografia', 'Blog', 'Livros', 'Curadoria', 'Eventos', 'Imprensa', 'Fale Comigo'].map((item) => (
          <Link 
            key={item} 
            to="/" 
            className="text-rich-black font-bold text-lg tracking-tight hover:text-gray-500 transition-colors uppercase"
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  )
}
