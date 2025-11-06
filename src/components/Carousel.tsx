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
      <div className="relative mt-20 h-[500px] md:h-[600px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando emprendimientos destacados...</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative mt-20 h-[500px] md:h-[600px] bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">No hay emprendimientos destacados por el momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-20 h-[500px] md:h-[600px] overflow-hidden">
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
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white max-w-3xl px-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {slide.nombre}
              </h2>
              <p className="text-lg md:text-xl">Descubre este emprendimiento destacado</p>
            </div>
          </div>
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

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
