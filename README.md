# GenCerteza (MVP)

Plataforma de pruebas genéticas de filiación e identidad neonatal con cadena de custodia.
Next.js (App Router) · TypeScript · Tailwind CSS 4.

## Puesta en marcha

1. Copie `.env.example` a `.env.local` y complete las variables.
2. Cree las tablas y arranque:

```bash
npm install
npm run db:migrate   # aplica db/schema.sql (puede repetirse sin riesgo)
npm run dev          # http://localhost:3000
```

| Variable              | Para qué sirve                                                     |
| --------------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`        | PostgreSQL. En Supabase: Connect → *Transaction pooler*            |
| `DATA_ENCRYPTION_KEY` | Clave maestra de cifrado: `openssl rand -base64 32`                |
| `RESEND_API_KEY`      | Envío de códigos por correo ([resend.com](https://resend.com))     |
| `EMAIL_FROM`          | Remitente verificado, p. ej. `GenCerteza <no-responder@dominio>`   |
| `ADMIN_API_TOKEN`     | Token del laboratorio: `openssl rand -hex 32`                      |

En Vercel, defina las mismas variables en *Project Settings → Environment
Variables*. En desarrollo, sin `RESEND_API_KEY`, el código de verificación se
imprime en la consola del servidor.

> **Respalde `DATA_ENCRYPTION_KEY` fuera de Vercel.** Si se pierde, los datos
> de contacto guardados no pueden descifrarse.

## Rutas

| Ruta           | Descripción                                             |
| -------------- | ------------------------------------------------------- |
| `/`            | Landing: servicios, cadena de custodia, confidencialidad |
| `/solicitud`   | Wizard de 3 pasos (acepta `?servicio=` y `?variante=`) |
| `/seguimiento` | Consulta de estatus: folio + código por correo           |
| `/privacidad`  | Aviso de privacidad (texto provisional)                 |

## Estructura

```
src/
├─ app/                  # Páginas (landing, solicitud, seguimiento, privacidad)
│  └─ api/               # Rutas de servidor (solicitudes, seguimiento, admin)
├─ components/
│  ├─ layout/            # Header, Footer, Logo
│  ├─ landing/           # Hero, Services, Custody, Confidentiality, Faq, CallToAction
│  ├─ wizard/            # RequestWizard + pasos, StepIndicator, OptionCard, Field
│  ├─ tracking/          # TrackingPanel, StatusTimeline
│  └─ ui/                # Button, Container, Icons
└─ lib/                  # types, services (contenido), folio, tracking, validation
   └─ server/            # crypto, db, access (códigos/sesión), rate-limit, email
db/schema.sql            # Esquema PostgreSQL
scripts/migrate.mjs      # Aplica el esquema
```

Los colores y tipografías se definen como tokens en `src/app/globals.css`.

## Catálogo de servicios y precios

Todo el catálogo vive en `src/lib/services.ts`: servicios, variantes, plazos y
precios. Para fijar un precio, cambie `price: null` por el importe en pesos
(p. ej. `price: 8500`); mientras sea `null` se muestra "Precio por confirmar".
La landing, el formulario y la API leen de ese archivo.

Si agrega un servicio nuevo, añádalo también a la restricción
`solicitudes_servicio_check` de `db/schema.sql` y ejecute `npm run db:migrate`.

## Seguridad

- **Cifrado de datos personales.** Nombre, correo, teléfono, domicilio y notas
  se cifran en el servidor con AES-256-GCM antes de guardarse
  (`lib/server/crypto.ts`). La base de datos solo ve texto cifrado, ligado al
  folio de su fila.
- **Consulta en dos pasos.** El folio no basta: se envía un código de 6 dígitos
  al correo registrado (vence en 10 min, un solo uso, 5 intentos). Al
  verificarlo se abre una sesión de 15 min en cookie firmada `HttpOnly`.
- **Límite de intentos** por folio y por cliente, guardado en PostgreSQL
  (`lib/server/rate-limit.ts`). La IP se guarda como huella, no en claro.
- **Sin enumeración de folios.** La API responde igual exista o no el folio.
- **Supabase.** Las tablas tienen RLS activado sin políticas: la API pública de
  Supabase no puede leerlas; solo el servidor por conexión directa.

## API

| Método y ruta                          | Uso                                          |
| -------------------------------------- | -------------------------------------------- |
| `POST /api/solicitudes`                | Registra una solicitud y devuelve el folio   |
| `POST /api/seguimiento/codigo`         | Envía el código de verificación              |
| `POST /api/seguimiento/verificar`      | Valida el código y abre la sesión            |
| `GET / DELETE /api/seguimiento/sesion` | Estatus de la sesión vigente / cerrarla      |
| `PATCH /api/admin/solicitudes/{folio}` | Laboratorio: actualiza la etapa (0 a 4)      |

Actualizar el estatus de una muestra (provisional, hasta tener panel interno):

```bash
curl -X PATCH https://su-dominio/api/admin/solicitudes/GC-12345 \
  -H "Authorization: Bearer $ADMIN_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"stage": 2, "estimatedDelivery": "2026-12-01"}'
```

## Pendiente

- Textos legales definitivos (aviso de privacidad, consentimientos), revisados
  por un abogado. Plazos, horarios y correo de contacto son provisionales.
- Panel interno del laboratorio con usuarios y bitácora de cadena de custodia.
- Código por SMS como alternativa al correo.
- Borrado programado de códigos vencidos y contadores antiguos.
