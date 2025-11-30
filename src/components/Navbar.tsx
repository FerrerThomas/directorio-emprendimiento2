import { useState } from 'react';
import { Search, Facebook, Instagram, MessageCircle, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link to="/" aria-label="Ir al inicio">
              <img src="/logo.png" alt="Guia Local" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
          </div>

          {/* Búsqueda en móvil al lado del logo */}
          <div className="flex md:hidden flex-1 ml-4 mr-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-violet-600 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
      </div>

      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/categorias"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-gray-50"
            >
              Categorías
            </Link>
            <Link
              to="/#contacto"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-gray-50"
            >
              Nosotros
            </Link>
            <a
              href="#farmacias"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-gray-50"
            >
              Farmacias de turno
            </a>
            <Link
              to="/#contacto"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-gray-50"
            >
              Contacto
            </Link>

            <div className="flex items-center space-x-4 px-3 py-3 mt-2 border-t border-gray-100">
              <a href="#" className="text-violet-600 hover:text-violet-700 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-violet-600 hover:text-violet-700 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-violet-600 hover:text-violet-700 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
