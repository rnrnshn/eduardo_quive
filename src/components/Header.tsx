import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import ContactModal from './ContactModal'

export default function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('light')

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
      setIsMenuOpen(false) // Close menu on scroll down
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40px 0px -90% 0px',
      threshold: [0, 0.1]
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-theme') as 'light' | 'dark'
          if (theme) setHeaderTheme(theme)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    const targets = document.querySelectorAll('section, footer')
    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  const isDark = headerTheme === 'dark'
  const textColorClass = isDark ? 'text-off-white' : 'text-rich-black'
  const hoverColorClass = isDark ? 'hover:text-amber-500' : 'hover:text-gray-500'

  const navItems = ['Biografia', 'Blog', 'Livros', 'Curadoria', 'Eventos', 'Imprensa']

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full p-6 flex justify-between md:justify-end items-center z-50 transition-colors duration-300 ${textColorClass}`}
      >
        {/* Mobile Logo/Indicator (Optional but good for balanced feel when menu is on right) */}
        <div className="md:hidden font-display font-bold tracking-tighter text-xl">
          EQ
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-lg tracking-tight uppercase font-bold">
          {navItems.map((item) => (
            <Link 
              key={item} 
              to="/" 
              className={`font-bold text-lg tracking-tight transition-colors uppercase ${textColorClass} ${hoverColorClass}`}
            >
              {item}
            </Link>
          ))}
          <button 
            onClick={() => setIsContactOpen(true)}
            className={`font-bold text-lg tracking-tight transition-colors uppercase cursor-pointer ${textColorClass} ${hoverColorClass}`}
          >
            Fale Comigo
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 p-2"
          aria-label="Toggle menu"
        >
          <div className="w-8 h-4 flex flex-col justify-between items-end">
            <span className={`h-0.5 transition-all duration-300 ${isMenuOpen ? 'w-8 rotate-45 translate-y-[7px]' : 'w-8'} ${isDark ? 'bg-off-white' : 'bg-rich-black'}`}></span>
            <span className={`h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-6'} ${isDark ? 'bg-off-white' : 'bg-rich-black'}`}></span>
            <span className={`h-0.5 transition-all duration-300 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[7px]' : 'w-4'} ${isDark ? 'bg-off-white' : 'bg-rich-black'}`}></span>
          </div>
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-rich-black z-[45] md:hidden flex flex-col p-8 pt-32"
      >
        <nav className="flex flex-col gap-8">
          {navItems.map((item) => (
            <Link 
              key={item} 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="text-off-white font-display text-5xl font-bold tracking-tighter uppercase leading-none"
            >
              {item}
            </Link>
          ))}
          <button 
            onClick={() => {
              setIsContactOpen(true)
              setIsMenuOpen(false)
            }}
            className="text-amber-500 font-display text-5xl font-bold tracking-tighter uppercase text-left leading-none"
          >
            Fale Comigo
          </button>
        </nav>

        <div className="mt-auto border-t border-gray-800 pt-8 flex flex-col gap-4 text-gray-500 font-sans uppercase tracking-widest text-xs">
          <p>Eduardo Quive &copy; {new Date().getFullYear()}</p>
          <div className="flex gap-4">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </motion.div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}

