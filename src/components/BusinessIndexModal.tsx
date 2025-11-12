import { useState, useEffect } from 'react';
import { X, MapPin, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import BusinessDetail from './BusinessDetail';

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
  isOpen: boolean;
  categoryId: string;
  categoryName: string;
  onClose: () => void;
}

function BusinessIndexModal({ isOpen, categoryId, categoryName, onClose }: Props) {
  const [businesses, setBusinesses] = useState<Emprendimiento[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Emprendimiento | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchBusinesses();
      setSearchTerm('');
      setSelectedBusiness(null);
    }
  }, [isOpen, categoryId]);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('emprendimientos')
        .select('*')
        .eq('categoria_id', categoryId)
        .order('nombre', { ascending: true });

      if (error) {
        console.error('Error fetching businesses:', error);
        setBusinesses([]);
      } else {
        setBusinesses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (business.direccion?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  if (!isOpen) return null;

  if (selectedBusiness) {
    return (
      <BusinessDetail
        business={selectedBusiness}
        onBack={() => setSelectedBusiness(null)}
      />
    );
  }

  return (
    <div className="fixed inset-x-0 top-16 md:top-20 bottom-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-6">
          <h2 className="text-2xl font-bold">{categoryName}</h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="Buscar por nombre o dirección..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">Cargando emprendimientos...</p>
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">
                {businesses.length === 0
                  ? 'No hay emprendimientos registrados en esta categoría'
                  : 'No se encontraron resultados'}
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredBusinesses.map((business) => (
                <div
                  key={business.id}
                  onClick={() => setSelectedBusiness(business)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b"
                >
                  <div className="flex items-start gap-4">
                    {business.portada_url && (
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={business.portada_url}
                          alt={business.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 hover:text-violet-600 transition-colors">
                        {business.nombre}
                      </h3>
                      {business.direccion && (
                        <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 text-violet-600" />
                          <p>{business.direccion}</p>
                        </div>
                      )}
                      {business.telefono && (
                        <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
                          <Phone className="w-4 h-4 text-violet-600" />
                          <p>{business.telefono}</p>
                        </div>
                      )}
                    </div>
                    <div className="ml-4 text-violet-600 font-medium text-sm flex-shrink-0">Ver más →</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessIndexModal;
