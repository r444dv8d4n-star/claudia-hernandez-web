-- =====================================================================
-- Funciones para que la red crezca (noviembre 2026):
--   * Tipo de documento (cédula, cédula de extranjería, PPT, pasaporte).
--   * Permiso aparte y opcional para recibir mensajes por WhatsApp.
--   * «Quién me invitó» en Mi red (solo el primer nombre).
--   * Crecimiento por mes en el panel.
--   * Buscador del panel con datos ocultos; el dato completo se ve a pedido y queda en la auditoría.
-- =====================================================================

-- ---------- Tipo de documento ----------
alter table public.personas add column tipo_documento text not null default 'CC'
  check (tipo_documento in ('CC', 'CE', 'PPT', 'PA'));
alter table public.personas drop constraint personas_documento_check;
alter table public.personas drop constraint personas_documento_key;
alter table public.personas add constraint personas_documento_check check (
  (tipo_documento = 'CC' and documento ~ '^[0-9]{5,10}$') or
  (tipo_documento in ('CE', 'PPT') and documento ~ '^[0-9]{4,12}$') or
  (tipo_documento = 'PA' and documento ~ '^[A-Z0-9]{5,12}$')
);
alter table public.personas add constraint personas_documento_key unique (tipo_documento, documento);

-- ---------- Permiso para mensajes ----------
alter table public.personas add column acepta_mensajes boolean not null default false;
alter table public.personas add column acepta_mensajes_en timestamptz;
comment on column public.personas.acepta_mensajes is 'Aceptó, aparte y de forma opcional, recibir noticias de Claudia por WhatsApp.';

-- ---------- Registro (versión 2: con tipo de documento y permiso de mensajes) ----------
-- La versión anterior se deja mientras se publica el sitio nuevo; se puede borrar después.
create or replace function public.registrar_persona_v2(
  p_user_id uuid,
  p_nombre text,
  p_tipo_documento text,
  p_documento text,
  p_telefono text,
  p_correo text,
  p_direccion text,
  p_municipio text,
  p_barrio text,
  p_fecha_nacimiento date,
  p_codigo_invitacion text,
  p_politica_version text,
  p_acepta_mensajes boolean
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
    select id into v_padre from public.nodos where codigo = upper(trim(p_codigo_invitacion)) and eliminado_en is null;
    if v_padre is null then
      raise exception 'CODIGO_NO_EXISTE';
    end if;
  end if;

  v_codigo := public.nuevo_codigo();
  insert into public.nodos (user_id, invitado_por, codigo)
  values (p_user_id, v_padre, v_codigo)
  returning id into v_nodo;

  insert into public.personas (nodo_id, nombre, tipo_documento, documento, telefono, correo, direccion, municipio, barrio,
                               fecha_nacimiento, politica_version, acepta_mensajes, acepta_mensajes_en)
  values (v_nodo, trim(p_nombre), p_tipo_documento, upper(p_documento), p_telefono, lower(trim(p_correo)), trim(p_direccion),
          trim(p_municipio), nullif(trim(p_barrio), ''), p_fecha_nacimiento, p_politica_version,
          coalesce(p_acepta_mensajes, false), case when p_acepta_mensajes then now() end);

  return v_codigo;
end;
$$;
revoke all on function public.registrar_persona_v2(uuid, text, text, text, text, text, text, text, text, date, text, text, boolean)
  from public, anon, authenticated;
grant execute on function public.registrar_persona_v2(uuid, text, text, text, text, text, text, text, text, date, text, text, boolean)
  to service_role;

-- ---------- Mi red: quién me invitó ----------
create or replace function public.mi_resumen()
returns json
language sql stable security definer set search_path = ''
as $$
  with recursive yo as (
    select id, codigo, invitado_por from public.nodos where user_id = (select auth.uid())
  ),
  rama as (
    select n.id, n.eliminado_en, 1 as nivel from public.nodos n join yo on n.invitado_por = yo.id
    union all
    select n.id, n.eliminado_en, r.nivel + 1 from public.nodos n join rama r on n.invitado_por = r.id
    where r.nivel < 50
  )
  select json_build_object(
    'codigo',   (select codigo from yo),
    'directos', (select count(*) from rama where nivel = 1 and eliminado_en is null),
    'segundo',  (select count(*) from rama where nivel = 2 and eliminado_en is null),
    'rama',     (select count(*) from rama where eliminado_en is null),
    -- Solo el primer nombre de quien la invitó (nunca sus datos de contacto).
    'invito',   (select split_part(p.nombre, ' ', 1) from yo join public.personas p on p.nodo_id = yo.invitado_por),
    'invitada', (select invitado_por is not null from yo)
  )
  where exists (select 1 from yo);
$$;

-- ---------- Panel: crecimiento por mes y permiso de mensajes ----------
create or replace function public.admin_resumen()
returns json language plpgsql stable security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  with activos as (
    select n.id, n.invitado_por, n.creado_en, p.nombre, p.municipio, p.barrio, p.acepta_mensajes
    from public.nodos n join public.personas p on p.nodo_id = n.id
  ),
  hoy as (select (now() at time zone 'America/Bogota')::date d),
  dias as (
    select generate_series((select d from hoy) - 29, (select d from hoy), interval '1 day')::date dia
  ),
  meses as (
    select generate_series(date_trunc('month', (select d from hoy)) - interval '11 months', date_trunc('month', (select d from hoy)), interval '1 month')::date mes
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
    'mensajes',   (select count(*) from activos where acepta_mensajes),
    'por_dia',    (select json_agg(json_build_object('dia', dia, 'n',
                     (select count(*) from activos a where (a.creado_en at time zone 'America/Bogota')::date = dias.dia)) order by dia) from dias),
    'por_mes',    (select json_agg(json_build_object('mes', mes,
                     'n', (select count(*) from activos a where date_trunc('month', a.creado_en at time zone 'America/Bogota')::date = meses.mes),
                     'total', (select count(*) from activos a where (a.creado_en at time zone 'America/Bogota')::date < (meses.mes + interval '1 month')::date)
                   ) order by mes) from meses),
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

-- ---------- Buscador con datos ocultos ----------
-- Celular 310•••4567, documento ••••5678, correo ca•••@gmail.com. Se puede buscar por el dato completo.
create or replace function public.ocultar_celular(t text) returns text language sql immutable set search_path = ''
as $$ select case when t is null then null else left(t, 3) || '•••' || right(t, 4) end $$;
create or replace function public.ocultar_documento(t text) returns text language sql immutable set search_path = ''
as $$ select case when t is null then null else '••••' || right(t, 4) end $$;
create or replace function public.ocultar_correo(t text) returns text language sql immutable set search_path = ''
as $$ select case when t is null then null else left(split_part(t, '@', 1), 2) || '•••@' || split_part(t, '@', 2) end $$;
revoke all on function public.ocultar_celular(text), public.ocultar_documento(text), public.ocultar_correo(text) from public, anon;

create or replace function public.admin_buscar(p_texto text)
returns json language plpgsql stable security definer set search_path = ''
as $$
declare q text; r json;
begin
  perform public.exigir_admin();
  q := '%' || replace(replace(replace(trim(coalesce(p_texto, '')), '\', '\\'), '%', '\%'), '_', '\_') || '%';
  if length(trim(coalesce(p_texto, ''))) < 2 then return '[]'::json; end if;
  select coalesce(json_agg(x order by x.registrado desc), '[]'::json) into r from (
    select p.nombre, p.tipo_documento, public.ocultar_documento(p.documento) documento,
           public.ocultar_celular(p.telefono) telefono, public.ocultar_correo(p.correo) correo,
           p.municipio, p.barrio, n.codigo, n.creado_en registrado, p.acepta_mensajes,
           (select pp.nombre from public.personas pp where pp.nodo_id = n.invitado_por) invitado_por,
           (select count(*) from public.nodos h where h.invitado_por = n.id and h.eliminado_en is null) directos
    from public.personas p join public.nodos n on n.id = p.nodo_id
    where p.nombre ilike q or p.documento ilike q or p.telefono like q or p.correo ilike q or n.codigo ilike q
    order by n.creado_en desc
    limit 50
  ) x;
  return r;
end;
$$;

-- Ver los datos completos de una persona: queda en la auditoría quién los vio y cuándo.
create or replace function public.admin_ver_persona(p_codigo text)
returns json language plpgsql volatile security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  select json_build_object('nombre', p.nombre, 'tipo_documento', p.tipo_documento, 'documento', p.documento,
                           'telefono', p.telefono, 'correo', p.correo, 'direccion', p.direccion)
  into r
  from public.personas p join public.nodos n on n.id = p.nodo_id
  where n.codigo = upper(trim(p_codigo));
  if r is null then return null; end if;
  insert into public.auditoria (admin_id, accion, detalle) values ((select auth.uid()), 'ver_datos', upper(trim(p_codigo)));
  return r;
end;
$$;
revoke all on function public.admin_ver_persona(text) from public, anon;
grant execute on function public.admin_ver_persona(text) to authenticated, service_role;

-- ---------- Descarga: con tipo de documento y permiso de mensajes ----------
create or replace function public.admin_exportar()
returns json language plpgsql volatile security definer set search_path = ''
as $$
declare r json; cuantos int;
begin
  perform public.exigir_admin();
  select coalesce(json_agg(x order by x.registrado), '[]'::json), count(*) into r, cuantos from (
    select p.nombre, p.tipo_documento, p.documento, p.telefono, p.correo, p.direccion, p.municipio, p.barrio, p.fecha_nacimiento,
           n.codigo, (select codigo from public.nodos pa where pa.id = n.invitado_por) codigo_invitador,
           n.creado_en registrado, p.politica_version, p.autorizado_en,
           case when p.acepta_mensajes then 'Sí' else 'No' end acepta_mensajes, p.acepta_mensajes_en
    from public.personas p join public.nodos n on n.id = p.nodo_id
  ) x;
  insert into public.auditoria (admin_id, accion, detalle) values ((select auth.uid()), 'descargar_csv', cuantos || ' personas');
  return r;
end;
$$;

-- ---------- Avisos: documentos seguidos solo entre documentos numéricos del mismo tipo ----------
create or replace function public.admin_alertas()
returns json language plpgsql stable security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  with activos as (
    select n.id, n.invitado_por, n.creado_en, p.nombre, p.municipio, p.telefono, p.documento, p.tipo_documento
    from public.nodos n join public.personas p on p.nodo_id = n.id
  ),
  rafagas as (
    select a.invitado_por, max(c.n) n
    from activos a
    cross join lateral (
      select count(*) n from activos b
      where b.invitado_por = a.invitado_por and b.creado_en between a.creado_en and a.creado_en + interval '10 minutes'
    ) c
    where a.invitado_por is not null
    group by a.invitado_por
    having max(c.n) >= 5
  ),
  cel as (
    select nombre, telefono, lag(nombre) over w ant_nombre, lag(telefono) over w ant_tel
    from activos window w as (order by telefono::bigint)
  ),
  doc as (
    select nombre, documento, lag(nombre) over w ant_nombre, lag(documento) over w ant_doc
    from activos where documento ~ '^[0-9]{1,15}$'
    window w as (partition by tipo_documento order by documento::bigint)
  ),
  horas as (
    select date_trunc('hour', creado_en at time zone 'America/Bogota') hora, count(*) n
    from activos group by 1 having count(*) >= 20
  ),
  avisos as (
    select format('%s sumó %s invitados en menos de 10 minutos', coalesce(p.nombre, 'Una cuenta eliminada'), f.n) detalle, f.n::int peso
    from rafagas f left join activos p on p.id = f.invitado_por
    union all
    select format('%s y %s tienen celulares seguidos (terminan en %s y %s)', ant_nombre, nombre, right(ant_tel, 2), right(telefono, 2)), 3
    from cel where ant_tel is not null and telefono::bigint - ant_tel::bigint between 1 and 2
    union all
    select format('%s y %s tienen documentos seguidos (terminan en %s y %s)', ant_nombre, nombre, right(ant_doc, 2), right(documento, 2)), 3
    from doc where ant_doc is not null and documento::bigint - ant_doc::bigint between 1 and 2
    union all
    select format('%s registros entre las %s y las %s del %s', n, to_char(hora, 'HH24:00'), to_char(hora + interval '1 hour', 'HH24:00'), to_char(hora, 'DD/MM/YYYY')), n::int
    from horas
  )
  select coalesce(json_agg(json_build_object('detalle', detalle) order by peso desc), '[]'::json)
  into r from (select * from avisos order by peso desc limit 30) x;
  return r;
end;
$$;
