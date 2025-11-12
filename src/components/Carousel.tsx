import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Slide {
  id: string;
  nombre: string;
  portada_url: string;
}

function Carousel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlightedBusinesses();
  }, []);

  const fetchHighlightedBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('emprendimientos')
        .select('id, nombre, portada_url')
        .eq('destacado', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching highlighted businesses:', error);
        setSlides([]);
      } else {
        setSlides(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setSlides([]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="relative mt-16 md:mt-20 h-56 md:h-[600px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando emprendimientos destacados...</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative mt-16 md:mt-20 h-56 md:h-[600px] bg-gradient-to-r from-violet-500 to-fuchsia-400 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">No hay emprendimientos destacados por el momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-16 md:mt-20 h-56 md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.portada_url}
            alt={slide.nombre}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all z-10"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all z-10"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      
    </div>
  );
}

export default Carousel;
