-- Add hierarchical categories and N:M relation with emprendimientos
-- Safe to run multiple times where IF NOT EXISTS is supported. Some statements may assume clean state.

-- 1) categorias: hierarchy + ordering + active + slug
ALTER TABLE public.categorias ADD COLUMN IF NOT EXISTS parent_id uuid NULL REFERENCES public.categorias(id) ON DELETE CASCADE;
ALTER TABLE public.categorias ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.categorias ADD COLUMN IF NOT EXISTS position int NOT NULL DEFAULT 0;
ALTER TABLE public.categorias ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- backfill slug from nombre if null
UPDATE public.categorias
SET slug = lower(regexp_replace(nombre, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- ensure not null (only after backfill)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'categorias' AND column_name = 'slug' AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE public.categorias ALTER COLUMN slug SET NOT NULL;
  END IF;
END $$;

-- indexes
CREATE INDEX IF NOT EXISTS categorias_parent_id_idx ON public.categorias(parent_id);
CREATE UNIQUE INDEX IF NOT EXISTS categorias_parent_nombre_unique ON public.categorias(parent_id, nombre);
CREATE UNIQUE INDEX IF NOT EXISTS categorias_slug_unique ON public.categorias(slug);

-- 2) emprendimiento_categorias pivot (N:M)
CREATE TABLE IF NOT EXISTS public.emprendimiento_categorias (
  emprendimiento_id uuid NOT NULL REFERENCES public.emprendimientos(id) ON DELETE CASCADE,
  categoria_id uuid NOT NULL REFERENCES public.categorias(id) ON DELETE CASCADE,
  PRIMARY KEY (emprendimiento_id, categoria_id)
);
CREATE INDEX IF NOT EXISTS ec_categoria_idx ON public.emprendimiento_categorias(categoria_id);
CREATE INDEX IF NOT EXISTS ec_emprendimiento_idx ON public.emprendimiento_categorias(emprendimiento_id);

-- migrate existing 1:N to N:M
INSERT INTO public.emprendimiento_categorias (emprendimiento_id, categoria_id)
SELECT id, categoria_id FROM public.emprendimientos WHERE categoria_id IS NOT NULL
ON CONFLICT DO NOTHING;

-- 3) emprendimientos additional columns + indexes
ALTER TABLE public.emprendimientos ADD COLUMN IF NOT EXISTS published boolean NOT NULL DEFAULT true;
ALTER TABLE public.emprendimientos ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- ensure palabras_clave is text[] (some scaffolds may have created as generic array)
ALTER TABLE public.emprendimientos
  ALTER COLUMN palabras_clave TYPE text[]
  USING CASE WHEN palabras_clave IS NULL THEN '{}'::text[] ELSE palabras_clave::text[] END;

CREATE INDEX IF NOT EXISTS emprendimientos_published_idx ON public.emprendimientos(published);
CREATE INDEX IF NOT EXISTS emprendimientos_destacado_idx ON public.emprendimientos(destacado);
CREATE INDEX IF NOT EXISTS emprendimientos_created_idx ON public.emprendimientos(created_at);

-- 4) trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_emprendimientos_set_updated_at ON public.emprendimientos;
CREATE TRIGGER trg_emprendimientos_set_updated_at
BEFORE UPDATE ON public.emprendimientos
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

