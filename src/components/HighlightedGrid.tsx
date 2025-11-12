import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import BusinessDetail from './BusinessDetail';

type Highlight = {
  id: string;
  nombre: string;
  portada_url: string | null;
};

function HighlightedGrid() {
  const [items, setItems] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('emprendimientos')
          .select('id, nombre, portada_url')
          .eq('destacado', true)
          .order('created_at', { ascending: false })
          .limit(3);
        if (error) throw error;
        setItems(data || []);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openBusiness = async (id: string) => {
    try {
      const { data } = await supabase
        .from('emprendimientos')
        .select('id,nombre,descripcion_corta,descripcion_larga,direccion,telefono,redes,portada_url')
        .eq('id', id)
        .maybeSingle();
      if (data) setSelected(data);
    } catch (_) {
      // ignore
    }
  };

  if (loading && items.length === 0) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl bg-gray-100 animate-pulse h-40 md:h-48" />)
          )}
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => openBusiness(item.id)}
            className="rounded-xl overflow-hidden border border-gray-200 bg-white text-left focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow hover:shadow-md"
          >
            <div className="aspect-video w-full bg-gray-100">
              <img
                src={item.portada_url || ''}
                alt={item.nombre}
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <BusinessDetail business={selected} onBack={() => setSelected(null)} />
      )}
    </section>
  );
}

export default HighlightedGrid;
