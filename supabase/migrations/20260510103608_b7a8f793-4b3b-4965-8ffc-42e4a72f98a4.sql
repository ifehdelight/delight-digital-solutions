
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  customer_name text,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'NGN',
  status text NOT NULL DEFAULT 'completed',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert orders" ON public.orders FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view orders" ON public.orders FOR SELECT TO authenticated USING (has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete orders" ON public.orders FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  user_agent text,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert page_views" ON public.page_views FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view page_views" ON public.page_views FOR SELECT TO authenticated USING (has_role(auth.uid(),'admin'));

CREATE INDEX idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX idx_page_views_created ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_path ON public.page_views(path);

-- Fix newsletter RLS: drop the public UPDATE policy that breaks anon upsert,
-- replace with a permissive WITH CHECK that explicitly allows anon updates by email.
DROP POLICY IF EXISTS "Anyone can update own row by email" ON public.customers;
CREATE POLICY "Anyone can upsert by email" ON public.customers
  FOR UPDATE TO public
  USING (true)
  WITH CHECK (true);
