-- =====================================================================
-- Red de referidos de Claudia Hernández · estructura base
--
-- Idea general:
--   * `nodos`    = el lugar de cada persona en la red (quién la invitó y su código).
--                  Nunca se borra: si alguien elimina su cuenta, su lugar queda vacío
--                  y sus invitados siguen colgando de él.
--   * `personas` = los datos personales de cada nodo. Se borran por completo cuando
--                  la persona elimina su cuenta.
--   * `administradores` = quién puede ver el panel de administración.
--
-- Seguridad: todas las tablas tienen seguridad por filas (RLS). Ninguna tabla
-- se expone a visitantes anónimos. Cada persona solo puede leer su propia fila;
-- lo que ve de su red sale de funciones que devuelven SOLO nombres.
-- No se guarda por quién vota nadie.
-- =====================================================================

-- ---------- Tablas ----------

create table public.nodos (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid unique references auth.users (id) on delete set null,
  invitado_por  uuid references public.nodos (id) on delete set null,
  codigo        text not null unique check (codigo ~ '^[A-Z2-9]{6}$'),
  creado_en     timestamptz not null default now(),
  eliminado_en  timestamptz
);
comment on table public.nodos is 'Lugar de cada persona en la red. Se conserva aunque la persona elimine su cuenta.';
create index nodos_invitado_por_idx on public.nodos (invitado_por);

create table public.personas (
  nodo_id           uuid primary key references public.nodos (id) on delete cascade,
  nombre            text not null check (char_length(nombre) between 5 and 120),
  documento         text not null unique check (documento ~ '^[0-9]{5,12}$'),
  telefono          text not null unique check (telefono ~ '^3[0-9]{9}$'),
  correo            text not null unique check (correo = lower(correo) and correo like '%_@_%._%'),
  direccion         text not null check (char_length(direccion) between 4 and 160),
  municipio         text not null check (char_length(municipio) between 3 and 60),
  barrio            text check (barrio is null or char_length(barrio) <= 80),
  fecha_nacimiento  date not null,
  politica_version  text not null,
  autorizado_en     timestamptz not null default now(),
  actualizado_en    timestamptz not null default now()
);
comment on table public.personas is 'Datos personales. Solo los ve su dueño y los administradores. Ley 1581 de 2012.';
create index personas_municipio_barrio_idx on public.personas (municipio, barrio);

create table public.administradores (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  creado_en  timestamptz not null default now()
);

-- ---------- Seguridad por filas ----------

alter table public.nodos enable row level security;
alter table public.personas enable row level security;
alter table public.administradores enable row level security;

-- Nadie anónimo toca estas tablas. Las personas con sesión solo leen lo suyo.
revoke all on public.nodos, public.personas, public.administradores from anon, authenticated;
grant select on public.nodos, public.personas, public.administradores to authenticated;
grant all on public.nodos, public.personas, public.administradores to service_role;

create policy "cada quien ve su nodo" on public.nodos
  for select to authenticated using (user_id = (select auth.uid()));

create policy "cada quien ve sus datos" on public.personas
  for select to authenticated
  using (nodo_id in (select id from public.nodos where user_id = (select auth.uid())));

create policy "cada administrador se ve a sí mismo" on public.administradores
  for select to authenticated using (user_id = (select auth.uid()));

-- ---------- Funciones ----------

-- ¿La persona con sesión es administradora?
create or replace function public.es_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.administradores where user_id = (select auth.uid()));
$$;
revoke all on function public.es_admin() from public, anon;
grant execute on function public.es_admin() to authenticated, service_role;

-- Código de invitación de 6 caracteres, sin letras que se confundan (sin O, 0, I, 1, L).
create or replace function public.nuevo_codigo()
returns text
language plpgsql volatile set search_path = ''
as $$
declare
  alfabeto constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  c text;
begin
  loop
    c := '';
    for i in 1..6 loop
      c := c || substr(alfabeto, 1 + floor(random() * length(alfabeto))::int, 1);
    end loop;
    exit when not exists (select 1 from public.nodos where codigo = c);
  end loop;
  return c;
end;
$$;
revoke all on function public.nuevo_codigo() from public, anon, authenticated;
grant execute on function public.nuevo_codigo() to service_role;

-- Crea el nodo y los datos de una persona recién registrada, en un solo paso.
-- Solo la llama el servidor del sitio (llave secreta), nunca el navegador.
create or replace function public.registrar_persona(
  p_user_id uuid,
  p_nombre text,
  p_documento text,
  p_telefono text,
  p_correo text,
  p_direccion text,
  p_municipio text,
  p_barrio text,
  p_fecha_nacimiento date,
  p_codigo_invitacion text,
  p_politica_version text
)
returns text
language plpgsql security definer set search_path = ''
as $$
declare
  v_padre uuid;
  v_nodo uuid;
  v_codigo text;
begin
  if p_fecha_nacimiento > (current_date - interval '18 years')::date then
    raise exception 'MENOR_DE_EDAD';
  end if;
  if p_fecha_nacimiento < (current_date - interval '110 years')::date then
    raise exception 'FECHA_INVALIDA';
  end if;

  if nullif(trim(p_codigo_invitacion), '') is not null then
    select id into v_padre from public.nodos where codigo = upper(trim(p_codigo_invitacion));
    if v_padre is null then
      raise exception 'CODIGO_NO_EXISTE';
    end if;
  end if;

  v_codigo := public.nuevo_codigo();
  insert into public.nodos (user_id, invitado_por, codigo)
  values (p_user_id, v_padre, v_codigo)
  returning id into v_nodo;

  insert into public.personas (nodo_id, nombre, documento, telefono, correo, direccion, municipio, barrio,
                               fecha_nacimiento, politica_version)
  values (v_nodo, trim(p_nombre), p_documento, p_telefono, lower(trim(p_correo)), trim(p_direccion),
          trim(p_municipio), nullif(trim(p_barrio), ''), p_fecha_nacimiento, p_politica_version);

  return v_codigo;
end;
$$;
revoke all on function public.registrar_persona(uuid, text, text, text, text, text, text, text, date, text, text)
  from public, anon, authenticated;
grant execute on function public.registrar_persona(uuid, text, text, text, text, text, text, text, date, text, text)
  to service_role;
