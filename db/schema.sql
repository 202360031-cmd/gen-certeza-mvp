-- GenCerteza: esquema de base de datos (PostgreSQL / Supabase).
-- Idempotente: puede ejecutarse varias veces (npm run db:migrate).

create table if not exists solicitudes (
  folio              text primary key check (folio ~ '^GC-[0-9]{5}$'),
  servicio           text not null check (servicio in ('paternidad', 'identidad')),
  modalidad          text not null check (modalidad in ('domicilio', 'clinica')),
  -- Datos personales (nombre, correo, teléfono, domicilio, notas) cifrados
  -- en la aplicación con AES-256-GCM. La base de datos nunca los ve en claro.
  contacto_cifrado   text not null,
  etapa              smallint not null default 0 check (etapa between 0 and 4),
  fechas_etapas      jsonb not null default '[]'::jsonb,
  entrega_estimada   date,
  creada_en          timestamptz not null default now()
);

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
