-- Create site_settings table for general site configuration
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lookbook_seasons table
CREATE TABLE public.lookbook_seasons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  season_name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lookbook_images table
CREATE TABLE public.lookbook_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  season_id UUID NOT NULL REFERENCES public.lookbook_seasons(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  photographer_credit TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create info_pages table for managing informational pages
CREATE TABLE public.info_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lookbook_seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lookbook_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.info_pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_settings
CREATE POLICY "Everyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins and managers can insert site settings"
ON public.site_settings
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins and managers can update site settings"
ON public.site_settings
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins can delete site settings"
ON public.site_settings
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for lookbook_seasons
CREATE POLICY "Everyone can view lookbook seasons"
ON public.lookbook_seasons
FOR SELECT
USING (true);

CREATE POLICY "Admins and managers can insert lookbook seasons"
ON public.lookbook_seasons
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins and managers can update lookbook seasons"
ON public.lookbook_seasons
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins can delete lookbook seasons"
ON public.lookbook_seasons
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for lookbook_images
CREATE POLICY "Everyone can view lookbook images"
ON public.lookbook_images
FOR SELECT
USING (true);

CREATE POLICY "Admins and managers can insert lookbook images"
ON public.lookbook_images
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins and managers can update lookbook images"
ON public.lookbook_images
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins can delete lookbook images"
ON public.lookbook_images
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for info_pages
CREATE POLICY "Everyone can view info pages"
ON public.info_pages
FOR SELECT
USING (true);

CREATE POLICY "Admins and managers can insert info pages"
ON public.info_pages
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins and managers can update info pages"
ON public.info_pages
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role));

CREATE POLICY "Admins can delete info pages"
ON public.info_pages
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lookbook_seasons_updated_at
BEFORE UPDATE ON public.lookbook_seasons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_info_pages_updated_at
BEFORE UPDATE ON public.info_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for site-images bucket
CREATE POLICY "Anyone can view site images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Admins and managers can upload site images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'site-images' 
  AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role))
);

CREATE POLICY "Admins and managers can update site images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'site-images' 
  AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'manager'::app_role))
);

CREATE POLICY "Admins can delete site images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'site-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);