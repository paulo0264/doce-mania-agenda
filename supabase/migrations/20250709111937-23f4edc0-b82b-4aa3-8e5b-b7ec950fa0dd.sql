
-- Enable RLS and create auth schema setup
-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email text,
  full_name text,
  role text DEFAULT 'user',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create gallery_items table
CREATE TABLE public.gallery_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  text text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  date date DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-images', 'gallery-images', true);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles (admin only)
CREATE POLICY "Only authenticated users can view profiles" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- RLS Policies for gallery_items (public read, admin write)
CREATE POLICY "Anyone can view gallery items" 
  ON public.gallery_items FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert gallery items" 
  ON public.gallery_items FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update gallery items" 
  ON public.gallery_items FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete gallery items" 
  ON public.gallery_items FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for testimonials (public read, admin write)
CREATE POLICY "Anyone can view testimonials" 
  ON public.testimonials FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert testimonials" 
  ON public.testimonials FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update testimonials" 
  ON public.testimonials FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete testimonials" 
  ON public.testimonials FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- Storage policies for gallery images
CREATE POLICY "Anyone can view gallery images" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update gallery images" 
  ON storage.objects FOR UPDATE 
  USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete gallery images" 
  ON storage.objects FOR DELETE 
  USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for gallery
INSERT INTO public.gallery_items (title, description, image_url, category) VALUES
('Bolo Unicórnio', 'Bolo temático infantil com decoração de unicórnio', 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=400&fit=crop&crop=center', 'infantil'),
('Bolo de Casamento Clássico', 'Bolo elegante de três andares para casamento', 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop&crop=center', 'casamento'),
('Bolo Super-Herói', 'Bolo temático de super-herói para aniversário', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&crop=center', 'infantil'),
('Bolo Elegante Rosa', 'Bolo sofisticado com decoração rosa', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop&crop=center', 'adulto'),
('Bolo Chá de Bebê', 'Bolo especial para chá de bebê', 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=400&h=400&fit=crop&crop=center', 'casamento'),
('Bolo Princesa', 'Bolo temático de princesa', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop&crop=center', 'infantil'),
('Bolo Aniversário Dourado', 'Bolo elegante com detalhes dourados', 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop&crop=center', 'adulto'),
('Bolo Frozen', 'Bolo temático do filme Frozen', 'https://images.unsplash.com/photo-1517427294546-5aa121d3467e?w=400&h=400&fit=crop&crop=center', 'infantil');

-- Insert sample data for testimonials
INSERT INTO public.testimonials (name, text, rating, date) VALUES
('Maria Silva', 'O bolo da minha filha ficou perfeito! Todos os convidados elogiaram o sabor e a decoração. A Doce Mania superou todas as minhas expectativas!', 5, '2024-01-15'),
('João Santos', 'Atendimento excepcional e bolo delicioso. A equipe foi muito atenciosa e o resultado foi incrível. Super recomendo a Doce Mania!', 5, '2024-01-10'),
('Ana Costa', 'Transformaram exatamente a ideia que eu tinha em mente. Ficou lindo e saboroso! Meu casamento ficou ainda mais especial.', 5, '2024-01-08'),
('Pedro Oliveira', 'Qualidade excepcional! O bolo não só estava lindo como tinha um sabor incrível. Todos perguntaram onde eu havia encomendado.', 5, '2024-01-05'),
('Carmen Rodriguez', 'O chá de bebê da minha irmã ficou perfeito! O bolo estava lindo e delicioso. Muito obrigada por tornarem esse dia tão especial!', 5, '2024-01-02'),
('Roberto Lima', 'Profissionalismo e qualidade em cada detalhe. O bolo de aniversário dos meus 50 anos ficou espetacular. Parabéns à equipe!', 5, '2023-12-28');
