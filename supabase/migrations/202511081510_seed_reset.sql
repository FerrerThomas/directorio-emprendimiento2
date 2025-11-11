-- Reset and seed hierarchical categories + example businesses
-- Run with a privileged role (migrations) so RLS does not block inserts.

BEGIN;

-- 0) Clean tables (order matters). Use CASCADE for FK safety and restart identities
TRUNCATE TABLE
  public.emprendimiento_categorias,
  public.emprendimientos,
  public.categorias
RESTART IDENTITY CASCADE;

-- 1) Root categories (6)
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
VALUES
  ('Fábricas','fabricas','factory',1,NULL,true),
  ('Comercios','comercios','store',2,NULL,true),
  ('Servicios','servicios','briefcase',3,NULL,true),
  ('Profesionales','profesionales','briefcase',4,NULL,true),
  ('Médicos','medicos','stethoscope',5,NULL,true),
  ('Educación','educacion','graduation-cap',6,NULL,true);

-- 2) Subcategories (level 1 and deeper)
-- Fábricas -> Autos, Camiones y Motos; Textil
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Autos, Camiones y Motos','autos-camiones-motos','truck',1,id,true FROM public.categorias WHERE slug='fabricas';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Textil','textil','briefcase',2,id,true FROM public.categorias WHERE slug='fabricas';

-- Autos, Camiones y Motos -> Concesionarias; Repuestos; Talleres
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Concesionarias','concesionarias','store',1,id,true FROM public.categorias WHERE slug='autos-camiones-motos';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Repuestos','repuestos','wrench',2,id,true FROM public.categorias WHERE slug='autos-camiones-motos';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Talleres','talleres','wrench',3,id,true FROM public.categorias WHERE slug='autos-camiones-motos';

-- Repuestos -> Baterías; Neumáticos; Lubricantes
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Baterías','baterias','sparkles',1,id,true FROM public.categorias WHERE slug='repuestos';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Neumáticos','neumaticos','sparkles',2,id,true FROM public.categorias WHERE slug='repuestos';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Lubricantes','lubricantes','sparkles',3,id,true FROM public.categorias WHERE slug='repuestos';

-- Comercios -> Supermercados; Kioscos; Ferreterías; Tecnología
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Supermercados','supermercados','store',1,id,true FROM public.categorias WHERE slug='comercios';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Kioscos','kioscos','store',2,id,true FROM public.categorias WHERE slug='comercios';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Ferreterías','ferreterias','wrench',3,id,true FROM public.categorias WHERE slug='comercios';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Tecnología','tecnologia','plug-2',4,id,true FROM public.categorias WHERE slug='comercios';

-- Servicios -> Salud; Seguridad
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Salud','salud','stethoscope',1,id,true FROM public.categorias WHERE slug='servicios';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Seguridad','seguridad','shield-alert',2,id,true FROM public.categorias WHERE slug='servicios';

-- Salud -> Clínicas; Laboratorios
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Clínicas','clinicas','sparkles',1,id,true FROM public.categorias WHERE slug='salud';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Laboratorios','laboratorios','sparkles',2,id,true FROM public.categorias WHERE slug='salud';

-- Profesionales -> Abogados; Contadores; Arquitectos; Ingenieros
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Abogados','abogados','sparkles',1,id,true FROM public.categorias WHERE slug='profesionales';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Contadores','contadores','sparkles',2,id,true FROM public.categorias WHERE slug='profesionales';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Arquitectos','arquitectos','sparkles',3,id,true FROM public.categorias WHERE slug='profesionales';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Ingenieros','ingenieros','sparkles',4,id,true FROM public.categorias WHERE slug='profesionales';

-- Médicos -> Clínicos; Pediatras; Odontólogos; Traumatólogos
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Clínicos','clinicos','sparkles',1,id,true FROM public.categorias WHERE slug='medicos';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Pediatras','pediatras','sparkles',2,id,true FROM public.categorias WHERE slug='medicos';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Odontólogos','odontologos','sparkles',3,id,true FROM public.categorias WHERE slug='medicos';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Traumatólogos','traumatologos','sparkles',4,id,true FROM public.categorias WHERE slug='medicos';

-- Educación -> Escuelas; Institutos
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Escuelas','escuelas','sparkles',1,id,true FROM public.categorias WHERE slug='educacion';
INSERT INTO public.categorias (nombre, slug, icon, position, parent_id, is_active)
SELECT 'Institutos','institutos','sparkles',2,id,true FROM public.categorias WHERE slug='educacion';

-- 3) Example businesses
INSERT INTO public.emprendimientos (nombre, descripcion_corta, direccion, telefono, portada_url, published, destacado)
VALUES
  ('Ruta 7 Motors','Concesionaria oficial','Av. San Martín 1234','+54 236 400-0001','https://images.pexels.com/photos/3806275/pexels-photo-3806275.jpeg?auto=compress&cs=tinysrgb&w=1200', true, true),
  ('Junín Automotores','0km y usados','Belgrano 455','+54 236 400-0002','https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200', true, false),
  ('House of Cars','Seminuevos seleccionados','Roque Sáenz Peña 890','+54 236 400-0003','https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200', true, false),
  ('Clínica Central Junín','Guardia 24hs','Italia 85','+54 236 400-0100','https://images.pexels.com/photos/442152/pexels-photo-442152.jpeg?auto=compress&cs=tinysrgb&w=1200', true, true),
  ('Sanatorio del Oeste','Atención integral','Bartolomé Mitre 640','+54 236 400-0101','https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=1200', true, false),
  ('Repuestos El Cruce','Repuestos y accesorios','Rivadavia 1022','+54 236 400-0004','https://images.pexels.com/photos/3807273/pexels-photo-3807273.jpeg?auto=compress&cs=tinysrgb&w=1200', true, false);

-- 4) Link businesses to subcategories via slugs
WITH s AS (
  SELECT slug, id FROM public.categorias
  WHERE slug IN ('concesionarias','clinicas','repuestos')
), e AS (
  SELECT nombre, id FROM public.emprendimientos
)
INSERT INTO public.emprendimiento_categorias (emprendimiento_id, categoria_id)
SELECT e.id, s.id
FROM e
JOIN s ON (
  (e.nombre IN ('Ruta 7 Motors','Junín Automotores','House of Cars') AND s.slug='concesionarias') OR
  (e.nombre IN ('Clínica Central Junín','Sanatorio del Oeste') AND s.slug='clinicas') OR
  (e.nombre IN ('Repuestos El Cruce') AND s.slug='repuestos')
)
ON CONFLICT DO NOTHING;

COMMIT;
