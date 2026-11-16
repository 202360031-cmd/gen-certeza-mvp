# GenCerteza (MVP)

Plataforma de pruebas genéticas de filiación e identidad neonatal con cadena de custodia.
Next.js (App Router) · TypeScript · Tailwind CSS 4.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Rutas

| Ruta           | Descripción                                             |
| -------------- | ------------------------------------------------------- |
| `/`            | Landing: servicios, cadena de custodia, confidencialidad |
| `/solicitud`   | Wizard de 3 pasos (acepta `?servicio=paternidad\|identidad`) |
| `/seguimiento` | Consulta de estatus por folio (acepta `?folio=GC-88392`) |
| `/privacidad`  | Aviso de privacidad (texto provisional)                 |

## Estructura

```
src/
├─ app/                  # Rutas (layout, landing, solicitud, seguimiento, privacidad)
├─ components/
│  ├─ layout/            # Header, Footer, Logo
│  ├─ landing/           # Hero, Services, Custody, Confidentiality, Faq, CallToAction
│  ├─ wizard/            # RequestWizard + pasos, StepIndicator, OptionCard, Field
│  ├─ tracking/          # TrackingPanel, StatusTimeline
│  └─ ui/                # Button, Container, Icons
└─ lib/                  # types, services (contenido), folio, tracking, storage, format
```

Los colores y tipografías se definen como tokens en `src/app/globals.css`.

## Qué está simulado

- **Persistencia:** las solicitudes se guardan en `localStorage` (`lib/storage.ts`).
- **Estatus:** folios de demostración fijos en `lib/tracking.ts`
  (`GC-88392`, `GC-10457`, `GC-77120`); una solicitud nueva aparece en la etapa 1.
- **Contenido:** plazos, horarios, correo y textos legales son provisionales.

## Antes de producción

- Backend con base de datos cifrada; nada sensible en el navegador.
- El folio de 5 dígitos es adivinable: exigir un segundo factor (código por
  SMS/correo o fecha de nacimiento) para consultar, y limitar intentos.
- Aviso de privacidad y textos de consentimiento revisados por un abogado.
- Notificaciones al coordinador y al cliente; panel interno del laboratorio.
