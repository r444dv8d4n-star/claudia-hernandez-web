-- Límite de intentos para iniciar sesión y recuperar contraseña (contra ataques de adivinar claves).
-- Solo la usa el servidor del sitio; nadie de afuera la puede leer ni escribir.
create table public.intentos (
  id         bigint generated always as identity primary key,
  tipo       text not null check (tipo in ('login', 'recuperar')),
  clave      text not null,          -- huella (hash) del celular o correo, nunca el dato en claro
  ip         text,
  creado_en  timestamptz not null default now()
);
create index intentos_clave_idx on public.intentos (tipo, clave, creado_en);
create index intentos_ip_idx on public.intentos (tipo, ip, creado_en);

alter table public.intentos enable row level security;
revoke all on public.intentos from anon, authenticated;
grant all on public.intentos to service_role;

-- Borra intentos de más de un día cuando se registran nuevos (para no acumular).
create or replace function public.limpiar_intentos()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  delete from public.intentos where creado_en < now() - interval '1 day';
  return null;
end;
$$;
revoke all on function public.limpiar_intentos() from public, anon, authenticated;
create trigger intentos_limpiar after insert on public.intentos
  for each statement execute function public.limpiar_intentos();
