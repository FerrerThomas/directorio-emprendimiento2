function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src="/logo.png" alt="Guia Local" className="h-8 w-auto object-contain mb-3" />
            <p className="text-sm text-gray-400">
              Descubre emprendimientos y servicios locales organizados por categorías.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Secciones</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#categorias" className="hover:text-white transition-colors">Categorías</a></li>
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Ayuda</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#faq" className="hover:text-white transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#terminos" className="hover:text-white transition-colors">Términos y condiciones</a></li>
              <li><a href="#privacidad" className="hover:text-white transition-colors">Política de privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info@guialocal.com" className="hover:text-white transition-colors">info@guialocal.com</a></li>
              <li><a href="https://wa.me/5490000000000" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Guia Local. Todos los derechos reservados.</p>
          <p>Web realizada por Tomas Ferrer</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

