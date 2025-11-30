import { Search, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link to="/" aria-label="Ir al inicio">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Guia Local
              </h1>
            </Link>
          </div>

          {/* Búsqueda en móvil al lado del logo */}
          <div className="flex md:hidden flex-1 ml-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Busca por Rubro, Nombre o palabra clave"
                className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Busca por Rubro, Nombre o palabra clave"
                className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/categorias" className="text-gray-700 hover:text-violet-600 text-sm font-medium transition-colors">
              Categorías
            </Link>
            <Link to="/#contacto" className="text-gray-700 hover:text-violet-600 text-sm font-medium transition-colors">
              Nosotros
            </Link>
            {/*<a href="#registro" className="text-violet-600 hover:text-violet-700 text-sm font-bold transition-colors">
              Ingresa tus datos GRATIS!
            </a>*/}
            <a href="#farmacias" className="text-gray-700 hover:text-violet-600 text-sm font-medium transition-colors">
              Farmacias de turno
            </a>
            <Link to="/#contacto" className="text-gray-700 hover:text-violet-600 text-sm font-medium transition-colors">
              Contacto
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3 ml-6">
            <a href="#" className="text-violet-600 hover:text-violet-700 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-violet-600 hover:text-violet-700 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-violet-600 hover:text-violet-700 transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Se elimina la fila adicional en móvil para que la navbar sea más fina */}
      </div>
    </nav>
  );
}

export default Navbar;
