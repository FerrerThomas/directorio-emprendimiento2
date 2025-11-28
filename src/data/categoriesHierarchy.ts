export type CategoryNode = {
  id: string;
  nombre: string;
  icon: string;
  children?: CategoryNode[];
};

export const colorCycle = ['text-violet-600', 'text-fuchsia-600'];

export const categoriesHierarchy: CategoryNode[] = [
  {
    id: '2dc4fb8f-d768-4cb5-8263-631f06dc6650', // Fabricas
    nombre: 'Fábricas',
    icon: 'factory',
    children: [
      {
        id: 'fe48964c-6276-49e6-8806-987e3cffd707', // Autos, Camiones y Motos
        nombre: 'Autos, Camiones y Motos',
        icon: 'truck',
        children: [
          { id: '892d2505-0b97-4741-b1a9-cf8c7a1ec372', nombre: 'Concesionarias', icon: 'store' },
          {
            id: '6b225eea-ba93-4985-af56-28ff43a38cf3', // Repuestos
            nombre: 'Repuestos',
            icon: 'wrench',
            children: [
              { id: 'cde16ef3-9058-4645-8aa8-002102088af3', nombre: 'Baterías', icon: 'sparkles' },
              { id: '733963fa-a412-4312-8a06-fd6423d4b672', nombre: 'Neumáticos', icon: 'sparkles' },
              { id: '66c323b1-fdba-45aa-b6f1-a498906cd57a', nombre: 'Lubricantes', icon: 'sparkles' },
            ],
          },
          { id: '98178d79-8df6-4156-bf81-526df53fd759', nombre: 'Talleres', icon: 'wrench' },
        ],
      },
      {
        id: 'b3b9b69f-094e-4943-bfcc-f0f8eabf9853', // Textil
        nombre: 'Textil',
        icon: 'briefcase',
        children: [], // No children in CSV
      },
    ],
  },
  {
    id: '99126f78-7b9f-45fa-b2c8-c0e8bb4d8d1c', // Comercios
    nombre: 'Comercios',
    icon: 'store',
    children: [
      { id: '700a8965-8e20-48fa-a8a9-ab1a3035a4a7', nombre: 'Supermercados', icon: 'store' },
      { id: '97900a9d-98a2-49c6-8958-b9d7b3d69ce5', nombre: 'Kioscos', icon: 'store' },
      { id: '30286cfe-6bac-4140-9aaf-2a52b3b7b96a', nombre: 'Ferreterías', icon: 'wrench' },
      { id: 'a4e7ebf7-cef8-43bf-9bb7-6d9241a16100', nombre: 'Tecnología', icon: 'plug-2' },
    ],
  },
  {
    id: '79c1315a-7821-436c-a5ff-fb727fd62565', // Servicios
    nombre: 'Servicios',
    icon: 'briefcase',
    children: [
      {
        id: '9c476ae0-70d2-4eb5-aa5b-350186ea0c38', // Salud
        nombre: 'Salud',
        icon: 'stethoscope',
        children: [
          { id: '33179ba2-446d-44ed-af48-98ec35ea3702', nombre: 'Clínicas', icon: 'sparkles' },
          { id: '672cc2e7-9163-4d12-b9d6-857e9ef25036', nombre: 'Laboratorios', icon: 'sparkles' },
        ],
      },
      {
        id: '3a4a6a68-d7e2-41ef-a1e3-b0f67c586da4', // Educacion (Moved here or root? CSV says root. But TS had it in Servicios? No, TS had it in Servicios. CSV says parent is null. I will follow CSV but put it in root list below.)
        nombre: 'Educación', // Wait, in TS it was under Servicios. In CSV parent is null. I will put it as root to match CSV.
        icon: 'graduation-cap',
        children: [
          { id: '4b5e37e4-ec4e-4842-99aa-1af5eb89a865', nombre: 'Escuelas', icon: 'sparkles' },
          { id: '8bced28e-4258-4e21-b54e-d04c05b55118', nombre: 'Institutos', icon: 'sparkles' },
        ],
      },
      { id: '5c94461f-2734-4085-81c2-36d7b3c46f85', nombre: 'Seguridad', icon: 'shield-alert' },
    ],
  },
  {
    id: '7b8b4bf7-7c99-4ad4-9259-1ccfa842a1f6', // Profesionales
    nombre: 'Profesionales',
    icon: 'briefcase',
    children: [
      { id: 'c6510179-e025-4877-b50f-db40d1e41262', nombre: 'Abogados', icon: 'sparkles' },
      { id: '2836fedd-e19e-471e-8a12-c207c5212ac3', nombre: 'Contadores', icon: 'sparkles' },
      { id: '629206b0-33d4-44a0-9678-c2b9fa8c85f4', nombre: 'Arquitectos', icon: 'sparkles' },
      { id: 'd0bdd06c-5e44-490b-b1de-4b924d0ab53f', nombre: 'Ingenieros', icon: 'sparkles' },
    ],
  },
  {
    id: 'e469d6c3-a5bc-49d6-942b-66dba0b5e2f4', // Medicos
    nombre: 'Médicos',
    icon: 'stethoscope',
    children: [
      { id: '7a5f4c0c-52e9-4a38-978f-840e51f72e27', nombre: 'Clínicos', icon: 'sparkles' },
      { id: 'c1fed6db-d1a8-4d3b-996a-55e5e4f3a0a9', nombre: 'Pediatras', icon: 'sparkles' },
      { id: '49db0aeb-c1cb-4330-8178-11b010a59975', nombre: 'Odontólogos', icon: 'sparkles' },
      { id: '4a364b8d-9709-4a14-a477-20c79420b39a', nombre: 'Traumatólogos', icon: 'sparkles' },
    ],
  },
];
