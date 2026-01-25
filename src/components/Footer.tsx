import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer className="w-full bg-rich-black text-off-white pt-24 px-6 overflow-hidden border-t border-gray-900" data-theme="dark">
      <div className="w-full max-w-[1800px] mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 lg:mb-32">
          
          {/* CTA Column */}
          <div className="flex flex-col items-start gap-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white max-w-xl">
              Pronto para transformar ideias em narrativa?
            </h2>
            
            <div className="flex flex-wrap gap-4 w-full">
              <a 
                href="mailto:contacto@eduardoquive.com" 
                className="bg-off-white text-rich-black px-8 py-4 font-sans font-medium text-lg hover:bg-gray-200 transition-colors min-w-[200px] text-center"
              >
                Contactar
              </a>
              <a 
                href="#" 
                className="border border-gray-600 text-off-white px-8 py-4 font-sans font-medium text-lg hover:border-off-white hover:bg-off-white/5 transition-all min-w-[160px] text-center"
              >
                WhatsApp
              </a>
            </div>
            
            <p className="text-gray-500 text-sm max-w-md mt-4 font-sans">
              Ao entrar em contacto, os seus dados serão tratados com confidencialidade e apenas para fins profissionais.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8 lg:pl-12">
            
            {/* Navigation */}
            <div className="flex flex-col gap-6">
              <h3 className="font-sans text-xs text-gray-500 uppercase tracking-[0.2em]">Navegação</h3>
              <nav className="flex flex-col gap-3 font-sans text-gray-300">
                <Link to="/" className="hover:text-off-white transition-colors text-lg">Início</Link>
                <Link to="/" className="hover:text-off-white transition-colors text-lg">Sobre</Link>
                <Link to="/" className="hover:text-off-white transition-colors text-lg">Livros</Link>
                <Link to="/" className="hover:text-off-white transition-colors text-lg">Blog</Link>
                <Link to="/" className="hover:text-off-white transition-colors text-lg">Eventos</Link>
              </nav>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-6">
              <h3 className="font-sans text-xs text-gray-500 uppercase tracking-[0.2em]">Social</h3>
              <nav className="flex flex-col gap-3 font-sans text-gray-300">
                <a href="#" className="hover:text-off-white transition-colors text-lg">LinkedIn</a>
                <a href="#" className="hover:text-off-white transition-colors text-lg">Instagram</a>
                <a href="#" className="hover:text-off-white transition-colors text-lg">Facebook</a>
                <a href="#" className="hover:text-off-white transition-colors text-lg">Twitter</a>
              </nav>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-6">
              <h3 className="font-sans text-xs text-gray-500 uppercase tracking-[0.2em]">Localização</h3>
              <address className="flex flex-col gap-1 font-sans text-gray-300 not-italic text-lg">
                <span>Maputo,</span>
                <span>Moçambique</span>
              </address>
              <div className="mt-4">
                <h3 className="font-sans text-xs text-gray-500 uppercase tracking-[0.2em] mb-2">Email</h3>
                <a href="mailto:info@eduardoquive.com" className="text-gray-300 hover:text-off-white transition-colors text-lg">
                  info@eduardoquive.com
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-gray-800 bg-black/20">
        <div className="w-full max-w-[1800px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-600 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Eduardo Quive. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-400 transition-colors">Termos & Privacidade</a>
            <span>Website by Antigravity</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
