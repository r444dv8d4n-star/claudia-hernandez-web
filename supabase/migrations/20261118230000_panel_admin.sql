-- =====================================================================
-- Panel de administradores (/admin)
-- Todas las funciones verifican que quien llama sea administrador; si no, fallan.
-- Cada descarga y cada cambio de administradores queda en `auditoria`
-- (prueba de quién accedió a los datos, Ley 1581).
-- =====================================================================

create table public.auditoria (
  id         bigint generated always as identity primary key,
  admin_id   uuid references auth.users (id) on delete set null,
  accion     text not null,
  detalle    text,
  creado_en  timestamptz not null default now()
);
alter table public.auditoria enable row level security;
revoke all on public.auditoria from anon, authenticated;
grant all on public.auditoria to service_role;

create or replace function public.exigir_admin()
returns void language plpgsql stable security definer set search_path = ''
as $$
begin
  if not exists (select 1 from public.administradores where user_id = (select auth.uid())) then
    raise exception 'NO_AUTORIZADO';
  end if;
end;
$$;
revoke all on function public.exigir_admin() from public, anon, authenticated;

-- Totales, crecimiento por día (30 días), municipios, barrios y ranking.
create or replace function public.admin_resumen()
returns json language plpgsql stable security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  with activos as (
    select n.id, n.invitado_por, n.creado_en, p.nombre, p.municipio, p.barrio
    from public.nodos n join public.personas p on p.nodo_id = n.id
  ),
  hoy as (select (now() at time zone 'America/Bogota')::date d),
  dias as (
    select generate_series((select d from hoy) - 29, (select d from hoy), interval '1 day')::date dia
  ),
  directos as (
    select invitado_por id, count(*) n from activos where invitado_por is not null group by invitado_por
  )
  select json_build_object(
    'total',      (select count(*) from activos),
    'eliminados', (select count(*) from public.nodos where eliminado_en is not null),
    'hoy',        (select count(*) from activos where (creado_en at time zone 'America/Bogota')::date = (select d from hoy)),
    'semana',     (select count(*) from activos where (creado_en at time zone 'America/Bogota')::date > (select d from hoy) - 7),
    'invitados',  (select count(*) from activos where invitado_por is not null),
    'por_dia',    (select json_agg(json_build_object('dia', dia, 'n',
                     (select count(*) from activos a where (a.creado_en at time zone 'America/Bogota')::date = dias.dia)) order by dia) from dias),
    'municipios', (select coalesce(json_agg(json_build_object('municipio', municipio, 'n', n) order by n desc), '[]'::json)
                     from (select municipio, count(*) n from activos group by municipio) m),
    'barrios',    (select coalesce(json_agg(json_build_object('municipio', municipio, 'barrio', barrio, 'n', n) order by n desc), '[]'::json)
                     from (select municipio, coalesce(barrio, 'Sin barrio') barrio, count(*) n from activos group by 1, 2 order by 3 desc limit 40) b),
    'ranking',    (select coalesce(json_agg(json_build_object('nombre', a.nombre, 'municipio', a.municipio, 'directos', d.n) order by d.n desc, a.creado_en), '[]'::json)
                     from directos d join activos a on a.id = d.id
                     where d.id in (select id from directos order by n desc limit 15))
  ) into r;
  return r;
end;
$$;

-- Buscar personas por nombre, documento, celular o correo (máximo 50 resultados).
create or replace function public.admin_buscar(p_texto text)
returns json language plpgsql stable security definer set search_path = ''
as $$
declare q text; r json;
begin
  perform public.exigir_admin();
  q := '%' || replace(replace(replace(trim(coalesce(p_texto, '')), '\', '\\'), '%', '\%'), '_', '\_') || '%';
  if length(trim(coalesce(p_texto, ''))) < 2 then return '[]'::json; end if;
  select coalesce(json_agg(x order by x.registrado desc), '[]'::json) into r from (
    select p.nombre, p.documento, p.telefono, p.correo, p.municipio, p.barrio, n.codigo,
           n.creado_en registrado,
           (select pp.nombre from public.personas pp where pp.nodo_id = n.invitado_por) invitado_por,
           (select count(*) from public.nodos h where h.invitado_por = n.id and h.eliminado_en is null) directos
    from public.personas p join public.nodos n on n.id = p.nodo_id
    where p.nombre ilike q or p.documento like q or p.telefono like q or p.correo ilike q or n.codigo ilike q
    order by n.creado_en desc
    limit 50
  ) x;
  return r;
end;
$$;

-- Toda la red para dibujar el árbol (solo nombre, municipio y fechas).
create or replace function public.admin_arbol()
returns json language plpgsql stable security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  select coalesce(json_agg(json_build_object('id', n.id, 'padre', n.invitado_por, 'nombre', p.nombre,
                                             'municipio', p.municipio, 'desde', n.creado_en::date) order by n.creado_en), '[]'::json)
  into r
  from public.nodos n left join public.personas p on p.nodo_id = n.id;
  return r;
end;
$$;

-- Listado completo para descargar (CSV). Deja constancia en la auditoría.
create or replace function public.admin_exportar()
returns json language plpgsql volatile security definer set search_path = ''
as $$
declare r json; cuantos int;
begin
  perform public.exigir_admin();
  select coalesce(json_agg(x order by x.registrado), '[]'::json), count(*) into r, cuantos from (
    select p.nombre, p.documento, p.telefono, p.correo, p.direccion, p.municipio, p.barrio, p.fecha_nacimiento,
           n.codigo, (select codigo from public.nodos pa where pa.id = n.invitado_por) codigo_invitador,
           n.creado_en registrado, p.politica_version, p.autorizado_en
    from public.personas p join public.nodos n on n.id = p.nodo_id
  ) x;
  insert into public.auditoria (admin_id, accion, detalle) values ((select auth.uid()), 'descargar_csv', cuantos || ' personas');
  return r;
end;
$$;

-- Administradores: ver, agregar (solo personas ya registradas) y quitar.
create or replace function public.admin_lista_admins()
returns json language plpgsql stable security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  select coalesce(json_agg(json_build_object('correo', u.email, 'nombre', p.nombre, 'desde', a.creado_en::date,
                                             'soy_yo', a.user_id = (select auth.uid())) order by a.creado_en), '[]'::json)
  into r
  from public.administradores a join auth.users u on u.id = a.user_id
  left join public.nodos n on n.user_id = a.user_id left join public.personas p on p.nodo_id = n.id;
  return r;
end;
$$;

create or replace function public.admin_agregar(p_correo text)
returns text language plpgsql volatile security definer set search_path = ''
as $$
declare v uuid;
begin
  perform public.exigir_admin();
  select id into v from auth.users where email = lower(trim(p_correo));
  if v is null then return 'NO_REGISTRADO'; end if;
  if exists (select 1 from public.administradores where user_id = v) then return 'YA_ES_ADMIN'; end if;
  insert into public.administradores (user_id) values (v);
  insert into public.auditoria (admin_id, accion, detalle) values ((select auth.uid()), 'agregar_admin', lower(trim(p_correo)));
  return 'OK';
end;
$$;

create or replace function public.admin_quitar(p_correo text)
returns text language plpgsql volatile security definer set search_path = ''
as $$
declare v uuid;
begin
  perform public.exigir_admin();
  select id into v from auth.users where email = lower(trim(p_correo));
  if v is null or not exists (select 1 from public.administradores where user_id = v) then return 'NO_ES_ADMIN'; end if;
  if v = (select auth.uid()) then return 'NO_A_SI_MISMO'; end if;
  delete from public.administradores where user_id = v;
  insert into public.auditoria (admin_id, accion, detalle) values ((select auth.uid()), 'quitar_admin', lower(trim(p_correo)));
  return 'OK';
end;
$$;

-- Últimos movimientos de la auditoría.
create or replace function public.admin_auditoria()
returns json language plpgsql stable security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  select coalesce(json_agg(x), '[]'::json) into r from (
    select a.accion, a.detalle, a.creado_en, u.email admin
    from public.auditoria a left join auth.users u on u.id = a.admin_id
    order by a.creado_en desc limit 20
  ) x;
  return r;
end;
$$;

do $$
declare f text;
begin
  foreach f in array array['admin_resumen()', 'admin_buscar(text)', 'admin_arbol()', 'admin_exportar()',
                           'admin_lista_admins()', 'admin_agregar(text)', 'admin_quitar(text)', 'admin_auditoria()']
  loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated, service_role', f);
  end loop;
end;
$$;
