-- =====================================================================
-- Avisos de datos sospechosos para el panel de administradores.
-- No bloquea a nadie: solo señala casos para que el equipo los revise.
-- Devuelve nombres y municipio; nunca el celular ni el documento completos.
-- =====================================================================

create or replace function public.admin_alertas()
returns json language plpgsql stable security definer set search_path = ''
as $$
declare r json;
begin
  perform public.exigir_admin();
  with activos as (
    select n.id, n.invitado_por, n.creado_en, p.nombre, p.municipio, p.telefono, p.documento
    from public.nodos n join public.personas p on p.nodo_id = n.id
  ),
  -- 1. Alguien sumó 5 o más invitados en 10 minutos (posible registro masivo o inventado).
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
  -- 2. Celulares seguidos (3001234567 y 3001234568): suelen ser números inventados.
  cel as (
    select nombre, municipio, telefono, lag(nombre) over w ant_nombre, lag(telefono) over w ant_tel
    from activos window w as (order by telefono::bigint)
  ),
  -- 3. Documentos seguidos o casi iguales.
  doc as (
    select nombre, municipio, documento, lag(nombre) over w ant_nombre, lag(documento) over w ant_doc
    from activos window w as (order by documento::bigint)
  ),
  -- 4. Muchos registros en una misma hora en toda la red (20 o más).
  horas as (
    select date_trunc('hour', creado_en at time zone 'America/Bogota') hora, count(*) n
    from activos group by 1 having count(*) >= 20
  ),
  avisos as (
    select 'rafaga' tipo,
           format('%s sumó %s invitados en menos de 10 minutos', coalesce(p.nombre, 'Una cuenta eliminada'), f.n) detalle,
           f.n::int peso
    from rafagas f left join activos p on p.id = f.invitado_por
    union all
    select 'celulares',
           format('%s y %s tienen celulares seguidos (terminan en %s y %s)', ant_nombre, nombre, right(ant_tel, 2), right(telefono, 2)),
           3
    from cel where ant_tel is not null and telefono::bigint - ant_tel::bigint between 1 and 2
    union all
    select 'documentos',
           format('%s y %s tienen documentos seguidos (terminan en %s y %s)', ant_nombre, nombre, right(ant_doc, 2), right(documento, 2)),
           3
    from doc where ant_doc is not null and documento::bigint - ant_doc::bigint between 1 and 2
    union all
    select 'hora',
           format('%s registros entre las %s y las %s del %s', n, to_char(hora, 'HH24:00'), to_char(hora + interval '1 hour', 'HH24:00'), to_char(hora, 'DD/MM/YYYY')),
           n::int
    from horas
  )
  select coalesce(json_agg(json_build_object('tipo', tipo, 'detalle', detalle) order by peso desc), '[]'::json)
  into r from (select * from avisos order by peso desc limit 30) x;
  return r;
end;
$$;
revoke all on function public.admin_alertas() from public, anon;
grant execute on function public.admin_alertas() to authenticated, service_role;
