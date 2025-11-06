import { Search, Facebook, Instagram, Twitter } from 'lucide-react';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              Esto es Junín
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Busca por Rubro, Nombre o palabra clave"
                className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <a href="#categorias" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors">
              Categorías
            </a>
            <a href="#nosotros" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors">
              Nosotros
            </a>
            <a href="#registro" className="text-pink-600 hover:text-pink-700 text-sm font-bold transition-colors">
              Ingresa tus datos GRATIS!
            </a>
            <a href="#farmacias" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors">
              Farmacias de turno
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors">
              Contacto
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-3 ml-6">
            <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Busca por Rubro, Nombre o palabra clave"
              className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
