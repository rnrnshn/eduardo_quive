import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import ContactModal from './ContactModal'

const THEME_ATTR = 'data-theme'

function resolveHeaderTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'light'

  const points = [
    { x: window.innerWidth * 0.5, y: 16 },
    { x: window.innerWidth * 0.5, y: 80 },
    { x: 16, y: 80 },
    { x: window.innerWidth - 16, y: 80 },
  ]

  for (const point of points) {
    const elements = document.elementsFromPoint(point.x, point.y)
    for (const element of elements) {
      if (element.closest('header')) continue
      const themed = element.closest(`[${THEME_ATTR}]`)
      if (!themed || themed.closest('header')) continue
      const theme = themed.getAttribute(THEME_ATTR)
      if (theme === 'dark' || theme === 'light') return theme
    }
  }

  return 'light'
}

export default function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('light')
  const location = useLocation()
  const rafId = useRef<number | null>(null)
  const updateTheme = useCallback(() => {
    const nextTheme = resolveHeaderTheme()
    setHeaderTheme((prev) => (prev === nextTheme ? prev : nextTheme))
  }, [])
  const scheduleThemeUpdate = useCallback(() => {
    if (rafId.current !== null) return
    rafId.current = window.requestAnimationFrame(() => {
      rafId.current = null
      updateTheme()
    })
  }, [updateTheme])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
      setIsMenuOpen(false) // Close menu on scroll down
    } else {
      setHidden(false)
    }
    scheduleThemeUpdate()
  })

  useEffect(() => {
    updateTheme()
    const raf1 = window.requestAnimationFrame(() => {
      updateTheme()
      window.requestAnimationFrame(updateTheme)
    })
    return () => window.cancelAnimationFrame(raf1)
  }, [updateTheme, location.pathname, location.search, location.hash])

  useEffect(() => {
    const handleResize = () => scheduleThemeUpdate()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [scheduleThemeUpdate])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      scheduleThemeUpdate()
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [THEME_ATTR],
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [scheduleThemeUpdate])

  const isDark = headerTheme === 'dark'
  const textColorClass = isDark ? 'text-off-white' : 'text-rich-black'
  const hoverColorClass = isDark ? 'hover:text-amber-500' : 'hover:text-gray-500'
  const logoColorClass = isMenuOpen ? 'text-off-white' : textColorClass

  const navItems = [
    { label: 'Biografia', to: '/biografia' },
    { label: 'Blog', to: '/blog' },
    { label: 'Livros', to: '/', hash: 'livros' },
    { label: 'Eventos', to: '/', hash: 'eventos' },
    { label: 'Imprensa', to: '/', hash: 'imprensa' },
  ]

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full p-6 flex justify-between md:justify-between items-center z-50 transition-colors duration-300 ${isMenuOpen ? 'text-off-white' : ''}`}
      >
        {/* Logo - Still uses mix-blend for the 50/50 split */}
        <Link 
          to="/"
          className={`font-display font-bold tracking-tighter text-2xl transition-colors ${logoColorClass} hover:opacity-70`}
        >
          EQ
        </Link>

        {/* Desktop Navigation - Follows theme detection */}
        <nav className={`hidden md:flex gap-6 text-lg tracking-tight uppercase font-bold ${textColorClass}`}>
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.to}
              hash={item.hash}
              preload="intent"
              className={`font-bold text-lg tracking-tight transition-colors uppercase ${hoverColorClass}`}
            >
              {item.label}
            </Link>
          ))}
          <button 
            onClick={() => setIsContactOpen(true)}
            className={`font-bold text-lg tracking-tight transition-colors uppercase cursor-pointer ${hoverColorClass}`}
          >
            Fale Comigo
          </button>
        </nav>

        {/* Mobile Menu Button - Follows theme detection */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden z-50 p-2 ${isMenuOpen ? 'text-off-white' : textColorClass}`}
          aria-label="Toggle menu"
        >
          <div className="w-8 h-4 flex flex-col justify-between items-end">
            <span className={`h-0.5 transition-all duration-300 bg-current ${isMenuOpen ? 'w-8 rotate-45 translate-y-[7px]' : 'w-8'}`}></span>
            <span className={`h-0.5 transition-all duration-300 bg-current ${isMenuOpen ? 'opacity-0' : 'w-6'}`}></span>
            <span className={`h-0.5 transition-all duration-300 bg-current ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[7px]' : 'w-4'}`}></span>
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
              key={item.label} 
              to={item.to}
              hash={item.hash}
              preload="intent"
              onClick={() => setIsMenuOpen(false)}
              className="text-off-white font-display text-3xl font-bold tracking-tighter uppercase leading-none"
            >
              {item.label}
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
