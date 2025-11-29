export interface BusinessSample {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  portada_url?: string;
  categoria_id: string;
}

// Mock de emprendimientos por subcategoría (ids coinciden con categoriesHierarchy)
export const businessesBySubcategory: Record<string, BusinessSample[]> = {
  // Concesionarias
  '892d2505-0b97-4741-b1a9-cf8c7a1ec372': [
    {
      id: 'b1',
      nombre: 'Ruta 7 Motors',
      direccion: 'Av. San Martín 1234',
      telefono: '+54 236 400-0001',
      portada_url:
        'https://images.pexels.com/photos/3806275/pexels-photo-3806275.jpeg?auto=compress&cs=tinysrgb&w=1200',
      categoria_id: '892d2505-0b97-4741-b1a9-cf8c7a1ec372',
    },
    {
      id: 'b2',
      nombre: 'Junín Automotores',
      direccion: 'Belgrano 455',
      telefono: '+54 236 400-0002',
      portada_url:
        'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200',
      categoria_id: '892d2505-0b97-4741-b1a9-cf8c7a1ec372',
    },
    {
      id: 'b3',
      nombre: 'House of Cars',
      direccion: 'Roque Sáenz Peña 890',
      telefono: '+54 236 400-0003',
      portada_url:
        'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',
      categoria_id: '892d2505-0b97-4741-b1a9-cf8c7a1ec372',
    },
  ],
  // Repuestos
  '6b225eea-ba93-4985-af56-28ff43a38cf3': [
    {
      id: 'b4',
      nombre: 'Repuestos El Cruce',
      direccion: 'Rivadavia 1022',
      telefono: '+54 236 400-0004',
      categoria_id: '6b225eea-ba93-4985-af56-28ff43a38cf3',
    },
    {
      id: 'b5',
      nombre: 'Neumáticos La Posta',
      direccion: 'Cnel. Suárez 223',
      telefono: '+54 236 400-0005',
      categoria_id: '6b225eea-ba93-4985-af56-28ff43a38cf3',
    },
  ],
  // Clinicas
  '33179ba2-446d-44ed-af48-98ec35ea3702': [
    {
      id: 'b6',
      nombre: 'Clínica Central Junín',
      direccion: 'Italia 85',
      telefono: '+54 236 400-0100',
      categoria_id: '33179ba2-446d-44ed-af48-98ec35ea3702',
    },
    {
      id: 'b7',
      nombre: 'Sanatorio del Oeste',
      direccion: 'Bartolomé Mitre 640',
      telefono: '+54 236 400-0101',
      categoria_id: '33179ba2-446d-44ed-af48-98ec35ea3702',
    },
  ],
};
