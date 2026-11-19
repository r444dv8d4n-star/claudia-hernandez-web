-- =====================================================================
-- Medición respetuosa de la privacidad: solo cuenta acciones (clics y pasos).
-- No guarda IP, ni navegador, ni cookies, ni quién es la persona.
-- =====================================================================
create table public.eventos (
  id         bigint generated always as identity primary key,
  tipo       text not null check (tipo ~ '^[a-z0-9_]{3,40}$'),
  ruta       text check (ruta is null or char_length(ruta) <= 80),
  creado_en  timestamptz not null default now()
);
create index eventos_tipo_fecha_idx on public.eventos (tipo, creado_en);
alter table public.eventos enable row level security;
revoke all on public.eventos from anon, authenticated;
grant all on public.eventos to service_role;

-- Embudo de los últimos 30 días para el panel de administradores.
create or replace function public.admin_embudo()
returns json language plpgsql stable security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  select coalesce(json_object_agg(tipo, n), '{}'::json) into r
  from (select tipo, count(*) n from public.eventos where creado_en > now() - interval '30 days' group by tipo) x;
  return r;
end;
$$;
revoke all on function public.admin_embudo() from public, anon;
grant execute on function public.admin_embudo() to authenticated, service_role;
