export type CategoryNode = {
  id: string;
  nombre: string;
  icon: string;
  children?: CategoryNode[];
};

export const colorCycle = ['text-pink-600', 'text-orange-600'];

export const categoriesHierarchy: CategoryNode[] = [
  {
    id: 'fabricas',
    nombre: 'Fábricas',
    icon: 'factory',
    children: [
      {
        id: 'autos-camiones-motos',
        nombre: 'Autos, Camiones y Motos',
        icon: 'truck',
        children: [
          { id: 'concesionarias', nombre: 'Concesionarias', icon: 'store' },
          {
            id: 'repuestos',
            nombre: 'Repuestos',
            icon: 'wrench',
            children: [
              { id: 'baterias', nombre: 'Baterías', icon: 'sparkles' },
              { id: 'neumaticos', nombre: 'Neumáticos', icon: 'sparkles' },
              { id: 'lubricantes', nombre: 'Lubricantes', icon: 'sparkles' },
            ],
          },
          { id: 'talleres', nombre: 'Talleres', icon: 'wrench' },
        ],
      },
      {
        id: 'textil',
        nombre: 'Textil',
        icon: 'briefcase',
        children: [
          { id: 'indumentaria', nombre: 'Indumentaria', icon: 'store' },
          { id: 'calzado', nombre: 'Calzado', icon: 'store' },
          { id: 'marroquineria', nombre: 'Marroquinería', icon: 'store' },
        ],
      },
    ],
  },
  {
    id: 'comercios',
    nombre: 'Comercios',
    icon: 'store',
    children: [
      { id: 'supermercados', nombre: 'Supermercados', icon: 'store' },
      { id: 'kioscos', nombre: 'Kioscos', icon: 'store' },
      { id: 'ferreterias', nombre: 'Ferreterías', icon: 'wrench' },
      { id: 'tecnologia', nombre: 'Tecnología', icon: 'plug-2' },
    ],
  },
  {
    id: 'servicios',
    nombre: 'Servicios',
    icon: 'briefcase',
    children: [
      {
        id: 'salud',
        nombre: 'Salud',
        icon: 'stethoscope',
        children: [
          { id: 'clinicas', nombre: 'Clínicas', icon: 'sparkles' },
          { id: 'laboratorios', nombre: 'Laboratorios', icon: 'sparkles' },
        ],
      },
      {
        id: 'educacion',
        nombre: 'Educación',
        icon: 'graduation-cap',
        children: [
          { id: 'escuelas', nombre: 'Escuelas', icon: 'sparkles' },
          { id: 'institutos', nombre: 'Institutos', icon: 'sparkles' },
        ],
      },
      { id: 'seguridad', nombre: 'Seguridad', icon: 'shield-alert' },
    ],
  },
  {
    id: 'profesionales',
    nombre: 'Profesionales',
    icon: 'briefcase',
    children: [
      { id: 'abogados', nombre: 'Abogados', icon: 'sparkles' },
      { id: 'contadores', nombre: 'Contadores', icon: 'sparkles' },
      { id: 'arquitectos', nombre: 'Arquitectos', icon: 'sparkles' },
      { id: 'ingenieros', nombre: 'Ingenieros', icon: 'sparkles' },
    ],
  },
  {
    id: 'medicos',
    nombre: 'Médicos',
    icon: 'stethoscope',
    children: [
      { id: 'clinicos', nombre: 'Clínicos', icon: 'sparkles' },
      { id: 'pediatras', nombre: 'Pediatras', icon: 'sparkles' },
      { id: 'odontologos', nombre: 'Odontólogos', icon: 'sparkles' },
      { id: 'traumatologos', nombre: 'Traumatólogos', icon: 'sparkles' },
    ],
  },
];
