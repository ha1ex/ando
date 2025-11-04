-- Add is_new column to products table
ALTER TABLE public.products 
ADD COLUMN is_new boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.products.is_new IS 'Indicates if product should display NEW badge';