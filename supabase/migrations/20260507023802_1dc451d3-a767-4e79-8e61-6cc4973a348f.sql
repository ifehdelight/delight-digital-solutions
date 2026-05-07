
-- Customers (buyers + newsletter subscribers)
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'newsletter', -- 'checkout' | 'newsletter'
  notes TEXT,
  last_purchase_product TEXT,
  last_purchase_amount NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (email)
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert customers"
  ON public.customers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update own row by email"
  ON public.customers FOR UPDATE
  USING (true);

CREATE POLICY "Admins can view customers"
  ON public.customers FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete customers"
  ON public.customers FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Newsletter campaigns log
CREATE TABLE public.newsletter_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  recipient_count INTEGER NOT NULL DEFAULT 0,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID
);

ALTER TABLE public.newsletter_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage campaigns select"
  ON public.newsletter_campaigns FOR SELECT
  TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage campaigns insert"
  ON public.newsletter_campaigns FOR INSERT
  TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage campaigns delete"
  ON public.newsletter_campaigns FOR DELETE
  TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Realtime for products
ALTER TABLE public.products REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
