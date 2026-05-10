DROP POLICY IF EXISTS "Anyone can insert customers" ON public.customers;
DROP POLICY IF EXISTS "Anyone can upsert by email" ON public.customers;
CREATE POLICY "Public can insert customers" ON public.customers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can update customers" ON public.customers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);