-- Supabase crea `rls_auto_enable()` (activa RLS en tablas nuevas) y la deja llamable desde la API.
-- Se usa solo como disparador interno, así que nadie de afuera debe poder ejecutarla.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
