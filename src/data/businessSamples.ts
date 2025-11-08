export type BusinessSample = {
  id: string;
  nombre: string;
  descripcion_corta?: string;
  descripcion_larga?: string | null;
  direccion?: string | null;
  telefono?: string | null;
  email?: string | null;
  redes?: Record<string, string> | null;
  logo_url?: string | null;
  portada_url?: string | null;
  categoria_id?: string; // subcategory id
};

// Mock de emprendimientos por subcategoría (ids coinciden con categoriesHierarchy)
export const businessesBySubcategory: Record<string, BusinessSample[]> = {
  concesionarias: [
    {
      id: 'b1',
      nombre: 'Ruta 7 Motors',
      direccion: 'Av. San Martín 1234',
      telefono: '+54 236 400-0001',
      portada_url:
        'https://images.pexels.com/photos/3806275/pexels-photo-3806275.jpeg?auto=compress&cs=tinysrgb&w=1200',
      categoria_id: 'concesionarias',
    },
    {
      id: 'b2',
      nombre: 'Junín Automotores',
      direccion: 'Belgrano 455',
      telefono: '+54 236 400-0002',
      portada_url:
        'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200',
      categoria_id: 'concesionarias',
    },
    {
      id: 'b3',
      nombre: 'House of Cars',
      direccion: 'Roque Sáenz Peña 890',
      telefono: '+54 236 400-0003',
      portada_url:
        'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',
      categoria_id: 'concesionarias',
    },
  ],
  repuestos: [
    {
      id: 'b4',
      nombre: 'Repuestos El Cruce',
      direccion: 'Rivadavia 1022',
      telefono: '+54 236 400-0004',
      categoria_id: 'repuestos',
    },
    {
      id: 'b5',
      nombre: 'Neumáticos La Posta',
      direccion: 'Cnel. Suárez 223',
      telefono: '+54 236 400-0005',
      categoria_id: 'repuestos',
    },
  ],
  clinicas: [
    {
      id: 'b6',
      nombre: 'Clínica Central Junín',
      direccion: 'Italia 85',
      telefono: '+54 236 400-0100',
      categoria_id: 'clinicas',
    },
    {
      id: 'b7',
      nombre: 'Sanatorio del Oeste',
      direccion: 'Bartolomé Mitre 640',
      telefono: '+54 236 400-0101',
      categoria_id: 'clinicas',
    },
  ],
};

