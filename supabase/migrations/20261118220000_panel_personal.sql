-- =====================================================================
-- Panel personal (/mi-red): lo que cada persona puede ver de su red.
-- Solo devuelve NOMBRES de su red directa y de un nivel más abajo,
-- y conteos. Nunca documento, dirección, teléfono ni correo de otros.
-- =====================================================================

-- Resumen: su código, cuántos invitó directamente, cuántos invitaron ellos
-- y cuántas personas hay en toda su rama (todos los niveles).
create or replace function public.mi_resumen()
returns json
language sql stable security definer set search_path = ''
as $$
  with recursive yo as (
    select id, codigo from public.nodos where user_id = (select auth.uid())
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
    'rama',     (select count(*) from rama where eliminado_en is null)
  )
  where exists (select 1 from yo);
$$;
revoke all on function public.mi_resumen() from public, anon;
grant execute on function public.mi_resumen() to authenticated, service_role;

-- Lista: sus invitados directos y, dentro de cada uno, los invitados de ese invitado.
-- Si alguien eliminó su cuenta, aparece sin nombre (su lugar queda vacío).
create or replace function public.mi_red()
returns json
language sql stable security definer set search_path = ''
as $$
  with yo as (select id from public.nodos where user_id = (select auth.uid()))
  select coalesce(json_agg(json_build_object(
    'nombre', p1.nombre,
    'desde',  n1.creado_en::date,
    'invitados', (
      select coalesce(json_agg(json_build_object('nombre', p2.nombre, 'desde', n2.creado_en::date) order by n2.creado_en), '[]'::json)
      from public.nodos n2 left join public.personas p2 on p2.nodo_id = n2.id
      where n2.invitado_por = n1.id
    )
  ) order by n1.creado_en), '[]'::json)
  from public.nodos n1
  join yo on n1.invitado_por = yo.id
  left join public.personas p1 on p1.nodo_id = n1.id;
$$;
revoke all on function public.mi_red() from public, anon;
grant execute on function public.mi_red() to authenticated, service_role;

-- Eliminar cuenta: borra sus datos personales y deja su lugar vacío en la red.
-- Sus invitados siguen colgando de ese lugar. Lo llama el servidor tras verificar la sesión.
create or replace function public.vaciar_nodo(p_user_id uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  delete from public.personas where nodo_id in (select id from public.nodos where user_id = p_user_id);
  update public.nodos set user_id = null, eliminado_en = now() where user_id = p_user_id;
  delete from public.administradores where user_id = p_user_id;
end;
$$;
revoke all on function public.vaciar_nodo(uuid) from public, anon, authenticated;
grant execute on function public.vaciar_nodo(uuid) to service_role;

-- El código de una cuenta eliminada ya no sirve para invitar.
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
    select id into v_padre from public.nodos where codigo = upper(trim(p_codigo_invitacion)) and eliminado_en is null;
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
