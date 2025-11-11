-- RLS policies for public read access on categories, businesses and pivot
-- Allows anon/authenticated to SELECT filtered rows

BEGIN;

-- Ensure RLS is enabled
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emprendimientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emprendimiento_categorias ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS categorias_select_public ON public.categorias;
DROP POLICY IF EXISTS emprendimientos_select_public ON public.emprendimientos;
DROP POLICY IF EXISTS ec_select_public ON public.emprendimiento_categorias;

-- Create SELECT policies
CREATE POLICY categorias_select_public
  ON public.categorias
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY emprendimientos_select_public
  ON public.emprendimientos
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY ec_select_public
  ON public.emprendimiento_categorias
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Optional grants (role must still satisfy RLS)
GRANT SELECT ON public.categorias TO anon, authenticated;
GRANT SELECT ON public.emprendimientos TO anon, authenticated;
GRANT SELECT ON public.emprendimiento_categorias TO anon, authenticated;

COMMIT;

