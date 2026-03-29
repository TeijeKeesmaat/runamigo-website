-- Profiles (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'free',
  subscription_id TEXT,
  subscription_price_id TEXT,
  subscription_current_period_end TIMESTAMPTZ,
  generations_today INTEGER DEFAULT 0,
  generations_reset_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Patterns
CREATE TABLE public.patterns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  prompt TEXT,
  source_type TEXT NOT NULL,
  format_key TEXT NOT NULL,
  width_pixels INTEGER NOT NULL,
  height_pixels INTEGER NOT NULL,
  baseplates_h INTEGER NOT NULL,
  baseplates_v INTEGER NOT NULL,
  color_count INTEGER NOT NULL,
  pattern_data JSONB NOT NULL,
  materials_list JSONB NOT NULL,
  preview_url TEXT,
  pattern_pdf_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  is_gallery BOOLEAN DEFAULT FALSE,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage logs
CREATE TABLE public.usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own or public patterns" ON public.patterns
  FOR SELECT USING (auth.uid() = user_id OR is_public = true OR is_gallery = true);
CREATE POLICY "Users can create patterns" ON public.patterns
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own patterns" ON public.patterns
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" ON public.usage_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own logs" ON public.usage_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
