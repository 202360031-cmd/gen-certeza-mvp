-- GenCerteza: esquema de base de datos (PostgreSQL / Supabase).
-- Idempotente: puede ejecutarse varias veces (npm run db:migrate).

create table if not exists solicitudes (
  folio              text primary key check (folio ~ '^GC-[0-9]{5}$'),
  servicio           text not null,
  variante           text not null default 'unica',
  modalidad          text not null check (modalidad in ('domicilio', 'clinica')),
  -- Datos personales (nombre, correo, teléfono, domicilio, notas) cifrados
  -- en la aplicación con AES-256-GCM. La base de datos nunca los ve en claro.
  contacto_cifrado   text not null,
  etapa              smallint not null default 0 check (etapa between 0 and 4),
  fechas_etapas      jsonb not null default '[]'::jsonb,
  entrega_estimada   date,
  creada_en          timestamptz not null default now()
);

-- Cambios posteriores a la primera versión (seguros de repetir).
alter table solicitudes
  add column if not exists variante text not null default 'unica';
alter table solicitudes drop constraint if exists solicitudes_servicio_check;
alter table solicitudes add constraint solicitudes_servicio_check
  check (servicio in ('prenatal', 'paternidad', 'adulto', 'identidad'));

-- Constancia del consentimiento: qué versión del aviso de privacidad aceptó
-- la persona y cuándo.
alter table solicitudes add column if not exists aviso_version text;
alter table solicitudes add column if not exists consentimiento_en timestamptz;

-- Códigos de un solo uso para consultar un folio (segundo factor).
create table if not exists codigos_acceso (
  id          bigint generated always as identity primary key,
  folio       text not null references solicitudes (folio) on delete cascade,
  codigo_hash text not null,
  expira_en   timestamptz not null,
  intentos    smallint not null default 0,
  usado       boolean not null default false,
  creado_en   timestamptz not null default now()
);
create index if not exists codigos_acceso_folio_idx
  on codigos_acceso (folio, creado_en desc);

-- Contadores para limitar intentos (ventana fija por clave).
create table if not exists limites (
  clave   text primary key,
  cuenta  integer not null,
  inicio  timestamptz not null default now()
);

-- En Supabase, estas tablas quedarían expuestas por la API pública (PostgREST).
-- Con RLS activado y sin políticas, solo el servidor (conexión directa) accede.
alter table solicitudes    enable row level security;
alter table codigos_acceso enable row level security;
alter table limites        enable row level security;

-- Usuario exclusivo de la app (opcional, recomendado). Créelo una vez, a mano,
-- con su propia contraseña, y úselo en DATABASE_USER / DATABASE_PASSWORD:
--
--   create role gencerteza_app login password '...';
--   grant usage on schema public to gencerteza_app;
--   grant select, insert, update, delete
--     on solicitudes, codigos_acceso, limites to gencerteza_app;
--   create policy app_acceso on solicitudes    for all to gencerteza_app using (true) with check (true);
--   create policy app_acceso on codigos_acceso for all to gencerteza_app using (true) with check (true);
--   create policy app_acceso on limites        for all to gencerteza_app using (true) with check (true);
