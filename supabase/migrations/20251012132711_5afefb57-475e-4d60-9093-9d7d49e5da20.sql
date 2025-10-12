-- Add display_order column to products table
ALTER TABLE public.products 
ADD COLUMN display_order INTEGER NOT NULL DEFAULT 0;

-- Update existing products with sequential order
UPDATE public.products 
SET display_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) - 1 as row_num 
  FROM public.products
) AS subquery 
WHERE products.id = subquery.id;