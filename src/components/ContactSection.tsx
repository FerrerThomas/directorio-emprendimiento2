import { MessageCircle, Phone, Mail } from 'lucide-react';

function ContactSection() {
  return (
    <section id="contacto" className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">Contactanos</h2>
        <p className="text-gray-600 mb-6 text-center">¿Tenés dudas o querés publicar tu emprendimiento? Escribinos.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://wa.me/5490000000000"
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
            className="group flex items-center gap-4 rounded-xl border border-violet-200 p-4 hover:border-violet-400 hover:shadow transition-colors"
          >
            <span className="text-violet-600">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </span>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">WhatsApp</p>
              <p className="font-semibold text-gray-900 group-hover:text-violet-600">+54 9 0000 000000</p>
            </div>
          </a>

          <a
            href="tel:+542360000000"
            aria-label="Llamar por teléfono"
            className="group flex items-center gap-4 rounded-xl border border-violet-200 p-4 hover:border-violet-400 hover:shadow transition-colors"
          >
            <span className="text-violet-600">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8" />
            </span>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Teléfono</p>
              <p className="font-semibold text-gray-900 group-hover:text-violet-600">+54 236 000 0000</p>
            </div>
          </a>

          <a
            href="mailto:info@guialocal.com"
            aria-label="Enviar email"
            className="group flex items-center gap-4 rounded-xl border border-violet-200 p-4 hover:border-violet-400 hover:shadow transition-colors"
          >
            <span className="text-violet-600">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8" />
            </span>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-900 group-hover:text-violet-600">info@guialocal.com</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
