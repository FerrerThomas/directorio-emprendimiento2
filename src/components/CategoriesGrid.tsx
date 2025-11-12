import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import * as lucideIcons from 'lucide-react';
import { colorCycle } from '../data/categoriesHierarchy';
import { supabase } from '../lib/supabase';
import { businessesBySubcategory } from '../data/businessSamples';
import BusinessDetail from './BusinessDetail';
import { motion, AnimatePresence } from 'framer-motion';

interface Breadcrumb {
  id: string;
  nombre: string;
}

const iconMap: Record<string, any> = {
  'hammer': lucideIcons.Hammer,
  'key-round': lucideIcons.KeyRound,
  'pickaxe': lucideIcons.Pickaxe,
  'plug-2': lucideIcons.Plug2,
  'wind': lucideIcons.Wind,
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

type CategoriesGridProps = {
  initialCategoryId?: string;
  hideHeader?: boolean;
};

function CategoriesGrid({ initialCategoryId, hideHeader }: CategoriesGridProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[]>([]);
  const navigate = useNavigate();
  const [selectedBusiness, setSelectedBusiness] = useState<any | null>(null);
  const [rootCategories, setRootCategories] = useState<any[]>([]);
  const [childrenLv1, setChildrenLv1] = useState<any[]>([]);
  const [childrenLv2, setChildrenLv2] = useState<any[]>([]);
  const [businessItems, setBusinessItems] = useState<any[]>([]);

  // Cargar categorías raíz y preseleccionar si llega id
  useEffect(() => {
    fetchRoot();
    if (initialCategoryId) {
      (async () => { await preloadPath(initialCategoryId); })();
    }
  }, [initialCategoryId]);
  async function fetchRoot() {
    const { data } = await supabase
      .from('categorias')
      .select('id,nombre,icon')
      .is('parent_id', null)
      .eq('is_active', true)
      .order('position', { ascending: true })
      .order('nombre', { ascending: true });
    setRootCategories(data || []);
  }

  async function fetchChildren(parentId: string) {
    const { data } = await supabase
      .from('categorias')
      .select('id,nombre,icon')
      .eq('parent_id', parentId)
      .eq('is_active', true)
      .order('position', { ascending: true })
      .order('nombre', { ascending: true });
    return data || [];
  }

  async function preloadPath(catId: string) {
    const { data: cat } = await supabase
      .from('categorias')
      .select('id,nombre')
      .eq('id', catId)
      .maybeSingle();
    if (!cat) return;
    setExpandedCategories(new Set([cat.id]));
    setBreadcrumb([{ id: cat.id, nombre: cat.nombre }]);
    const ch = await fetchChildren(cat.id);
    setChildrenLv1(ch);
    setChildrenLv2([]);
  }

  // Carga emprendimientos para una subcategoría (leaf) específica
  async function loadBusinessesFor(subcatId: string) {
    try {
      const { data: links } = await supabase
        .from('emprendimiento_categorias')
        .select('emprendimiento_id')
        .eq('categoria_id', subcatId);
      const ids = (links || []).map((l: any) => l.emprendimiento_id);
      if (ids.length > 0) {
        const { data: emps } = await supabase
          .from('emprendimientos')
          .select('id,nombre,direccion,telefono,portada_url,descripcion_corta,descripcion_larga,redes')
          .in('id', ids)
          .eq('published', true)
          .order('nombre', { ascending: true });
        if (emps && emps.length > 0) {
          setBusinessItems(emps);
          return;
        }
      }
      const { businessesBySubcategory } = await import('../data/businessSamples');
      setBusinessItems(businessesBySubcategory[subcatId] || []);
    } catch (e) {
      setBusinessItems([]);
    }
  }

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (category: any) => { navigate(`/categorias/${category.id}`); };

  const handleSubcategoryClick = async (subcategory: any, parentCategory: Breadcrumb) => {
    toggleExpanded(subcategory.id);
    setBreadcrumb([parentCategory, { id: subcategory.id, nombre: subcategory.nombre }]);
    const ch = await fetchChildren(subcategory.id);
    setChildrenLv2(ch);
    await loadBusinessesFor(subcategory.id);
  };

  const handleResetBreadcrumb = () => {
    setBreadcrumb([]);
    setExpandedCategories(new Set());
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      handleResetBreadcrumb();
    } else {
      setBreadcrumb(breadcrumb.slice(0, index + 1));
    }
  };

  const getIcon = (iconName?: string) => {
    if (!iconName) return lucideIcons.Sparkles;
    return iconMap[iconName] || lucideIcons.Sparkles;
  };

  const renderCategoryCard = (category: any, isSubcategory: boolean = false) => {
    const Icon = getIcon(category.icon);
    const isExpanded = expandedCategories.has(category.id);
    const hasChildren = !!(category.children && category.children.length > 0);
    const color = colorCycle[isSubcategory ? 1 : 0];

    return (
      <div
        key={category.id}
        onClick={() => {
          if (isSubcategory && breadcrumb.length > 0) {
            handleSubcategoryClick(category, breadcrumb[0]);
          } else {
            handleCategoryClick(category);
          }
        }}
        className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-violet-300 transition-all duration-300 ${
          hasChildren ? 'cursor-pointer group' : 'opacity-75'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`${color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
              <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
              {category.nombre}
            </h3>
          </div>
          {hasChildren && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-violet-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-violet-600 transition-colors" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMainCategoryChip = (category: any) => {
    const Icon = getIcon(category.icon);
    const selected = breadcrumb[0]?.id === category.id;
    return (
      <button
        key={category.id}
        onClick={() => handleCategoryClick(category)}
        className={`shrink-0 w-28 sm:w-32 aspect-square bg-white rounded-xl border transition-all ${
          selected ? 'border-violet-400 shadow-md' : 'border-gray-200 hover:border-violet-300 hover:shadow-sm'
        }`}
      >
        <div className="h-full w-full flex flex-col items-center justify-center text-center p-3">
          <div className={`${colorCycle[0]} mb-2`}>
            <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.6} />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
            {category.nombre}
          </p>
        </div>
      </button>
    );
  };

  // Subcategorías: nombre en MAYÚSCULAS, ancho uniforme y flecha al final
  const renderSubcategoryItem = (subcategory: any, parent: Breadcrumb) => {
    const hasChildren = !!(subcategory.children && subcategory.children.length > 0);
    return (
      <button
        key={subcategory.id}
        onClick={() => handleSubcategoryClick(subcategory, parent)}
        className="group w-full h-14 sm:h-16 px-1 sm:px-2 flex items-center justify-between text-left"
      >
        <span className="uppercase font-semibold text-gray-800 text-base sm:text-lg truncate">
          {subcategory.nombre}
        </span>
        <ChevronRight className={`w-5 h-5 text-violet-600 transition-transform group-hover:translate-x-0.5`}/>
      </button>
    );
  };

  const renderExpandedSubcategories = () => {
    if (breadcrumb.length === 0) return null;

    const parent = { id: breadcrumb[0].id, nombre: breadcrumb[0].nombre };
    return childrenLv1.map((subcategory) => renderSubcategoryItem(subcategory, parent));
  };

  const renderSubcategoriesOfSubcategory = () => {
    if (breadcrumb.length !== 2) return null;

    const parent = { id: breadcrumb[1].id, nombre: breadcrumb[1].nombre };
    return childrenLv2.map((subSubcategory) => renderSubcategoryItem(subSubcategory, parent));
  };

  const renderBusinessesOfCurrentSubcategory = () => {
    if (breadcrumb.length !== 2) return null;
    const subcatId = breadcrumb[1].id;
    const items = businessItems;
    if (items.length === 0) return null;

    return (
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-8 lg:gap-8">
          {[0,1,2].map((col) => (
            <div key={col} className="">
              {items
                .filter((_, idx) => idx % 3 === col)
                .map((b, idx2, arr) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBusiness(b)}
                    className={`w-full py-3 md:py-4 flex items-start gap-3 sm:gap-4 text-left group ${idx2 < arr.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="pt-0.5 text-violet-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="uppercase font-extrabold text-gray-900 text-base sm:text-lg truncate">
                        {b.nombre}
                      </p>
                      {b.direccion && (
                        <p className="text-xs sm:text-sm text-gray-600 truncate">📍
                          {b.direccion} <span className="text-violet-600 font-semibold">+ Info</span>
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-violet-600 transition-colors" />
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
    <section className={`px-4 sm:px-6 lg:px-8 bg-gray-50 ${hideHeader ? 'mt-16 md:mt-20 min-h-[20vh] py-8' : 'pt-4 sm:pt-5 md:pt-2 pb-8'}`}>
      <div className="max-w-7xl mx-auto">
        {!hideHeader && (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              ¿Qué estás buscando hoy?
            </h2>
          </>
        )}

        {/* Main categories: Home (no scroll on mobile) vs /categorias (scroll) */}
        {hideHeader ? (
          // In categories page: keep horizontal scroll in all breakpoints
          <div className="overflow-x-auto -mx-4 px-4 pb-4">
            <div className="flex gap-3 sm:gap-4">
              {rootCategories.map((cat) => renderMainCategoryChip(cat))}
            </div>
          </div>
        ) : (
          // In home: mobile grid of 3 per row; keep scroll on md+
          <>
            <div className="md:hidden">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {rootCategories.map((cat) => renderMainCategoryChip(cat))}
              </div>
            </div>
            <div className="hidden md:block overflow-x-auto -mx-4 px-4 pb-4">
              <div className="flex justify-center gap-3 sm:gap-4">
                {rootCategories.map((cat) => renderMainCategoryChip(cat))}
              </div>
            </div>
          </>
        )}

        {/* Breadcrumb and subcategories grid below */}
        <div className={`mt-6 ${hideHeader ? 'min-h-[35vh]' : ''}`}>
          {breadcrumb.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base mb-6">
              <button
                onClick={() => handleBreadcrumbClick(-1)}
                className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
              >
                Categorías
              </button>
              {breadcrumb.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span className="text-violet-400">&gt;</span>
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className="text-gray-700 hover:text-violet-600 font-semibold transition-colors truncate"
                  >
                    {item.nombre}
                  </button>
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={breadcrumb.map(b=>b.id).join("-")}
              initial={{opacity:0, y:8}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-8}}
              transition={{duration:0.2}}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            >
              {breadcrumb.length === 1 && renderExpandedSubcategories()}
              {breadcrumb.length === 2 && renderSubcategoriesOfSubcategory()}
            </motion.div>
          </AnimatePresence>

          {/* Emprendimientos dentro de la subcategoría seleccionada */}
          {breadcrumb.length === 2 && renderBusinessesOfCurrentSubcategory()}
        </div>
      </div>
    </section>
    {selectedBusiness && (
      <BusinessDetail business={selectedBusiness} onBack={() => setSelectedBusiness(null)} />
    )}
    </>
  );
}

export default CategoriesGrid;
