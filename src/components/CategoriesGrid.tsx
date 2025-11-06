import { useState, useEffect } from 'react';
import * as lucideIcons from 'lucide-react';
import BusinessIndexModal from './BusinessIndexModal';
import { supabase } from '../lib/supabase';

interface Category {
  id: string;
  nombre: string;
  descripcion: string | null;
  icon: string | null;
}

const iconMap: Record<string, any> = {
  'hammer': lucideIcons.Hammer,
  'key-round': lucideIcons.KeyRound,
  'pickaxe': lucideIcons.Pickaxe,
  'plug-2': lucideIcons.Plug2,
  'spray-can': lucideIcons.Wind,
  'shield-alert': lucideIcons.ShieldAlert,
  'truck': lucideIcons.Truck,
  'drill': lucideIcons.Drill,
  'chart-no-axes-combined': lucideIcons.BarChart3,
  'sparkles': lucideIcons.Sparkles,
  'building2': lucideIcons.Building2,
  'store': lucideIcons.Store,
  'graduation-cap': lucideIcons.GraduationCap,
  'factory': lucideIcons.Factory,
  'heart': lucideIcons.Heart,
  'wrench': lucideIcons.Wrench,
  'briefcase': lucideIcons.Briefcase,
  'stethoscope': lucideIcons.Stethoscope,
  'phone': lucideIcons.Phone,
};

const colorCycle = ['text-pink-600', 'text-orange-600'];

function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setSelectedCategoryId('');
    setSelectedCategoryName('');
  };

  const getIconComponent = (iconName: string | null, index: number) => {
    if (!iconName) {
      return lucideIcons.Sparkles;
    }
    return iconMap[iconName] || lucideIcons.Sparkles;
  };

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-500">Cargando categorías...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            ¿Qué estás buscando hoy?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Explorá todas las categorías y encontrá lo que necesitás
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-6">
            {categories.map((category, index) => {
              const Icon = getIconComponent(category.icon, index);
              const color = colorCycle[index % colorCycle.length];
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id, category.nombre)}
                  className="bg-white rounded-xl p-6  shadow-sm border border-gray-200 hover:shadow-lg hover:border-pink-300 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`${color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-12 h-12" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                      {category.nombre}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedCategory && (
        <BusinessIndexModal
          isOpen={!!selectedCategory}
          categoryId={selectedCategoryId}
          categoryName={selectedCategoryName}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default CategoriesGrid;
