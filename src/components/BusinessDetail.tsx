import { ArrowLeft, MapPin, Phone, Mail, Globe, Briefcase, Facebook, Instagram, Linkedin } from 'lucide-react';

interface Emprendimiento {
  id: string;
  nombre: string;
  descripcion_corta: string;
  descripcion_larga: string | null;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
  redes: Record<string, string> | null;
  logo_url: string | null;
  portada_url: string | null;
  categoria_id: string;
}

interface Props {
  business: Emprendimiento;
  onBack: () => void;
}

function BusinessDetail({ business, onBack }: Props) {
  const getSocialIcon = (social: string) => {
    switch (social.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const portadaUrl = business.portada_url || 'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64 md:h-72 overflow-hidden">
          <img
            src={portadaUrl}
            alt={business.nombre}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onBack}
            className="absolute top-4 left-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {business.nombre}
          </h1>

          {business.descripcion_corta && (
            <p className="text-lg text-gray-600 mb-6 italic">{business.descripcion_corta}</p>
          )}

          <div className="space-y-4 mb-8">
            {business.direccion && (
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p>{business.direccion}</p>
                </div>
              </div>
            )}

            {business.telefono && (
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-pink-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <a href={`tel:${business.telefono}`} className="hover:text-pink-600 transition-colors">
                    {business.telefono}
                  </a>
                </div>
              </div>
            )}

            {business.email && (
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-pink-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${business.email}`} className="hover:text-pink-600 transition-colors break-all">
                    {business.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          {business.descripcion_larga && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-pink-600" />
                <h2 className="text-xl font-bold text-gray-900">Descripción</h2>
              </div>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                {business.descripcion_larga}
              </p>
            </div>
          )}

          {business.redes && Object.keys(business.redes).length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Síguenos en redes sociales</h3>
              <div className="flex gap-4 flex-wrap">
                {Object.entries(business.redes).map(([social, url]) => (
                  <a
                    key={social}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors"
                  >
                    {getSocialIcon(social)}
                    <span className="capitalize">{social}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-pink-600 to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Volver al índice
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetail;
