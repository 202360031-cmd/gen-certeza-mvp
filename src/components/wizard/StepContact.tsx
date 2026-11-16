import Link from "next/link";
import { ClinicIcon, HomeIcon } from "@/components/ui/Icons";
import { MODALITIES } from "@/lib/services";
import type { ContactData, Modality } from "@/lib/types";
import type { ContactErrors } from "@/lib/validation";
import { Field } from "./Field";
import { OptionCard } from "./OptionCard";

const ICONS: Record<Modality, React.ReactNode> = {
  domicilio: <HomeIcon />,
  clinica: <ClinicIcon />,
};

export function StepContact({
  contact,
  modality,
  errors,
  minDate,
  onContact,
  onModality,
}: {
  contact: ContactData;
  modality: Modality | null;
  errors: ContactErrors;
  minDate: string;
  onContact: <K extends keyof ContactData>(
    key: K,
    value: ContactData[K],
  ) => void;
  onModality: (modality: Modality) => void;
}) {
  return (
    <div className="space-y-10">
      <fieldset>
        <legend className="font-serif text-2xl font-semibold tracking-tight">
          Modalidad de toma de muestra
        </legend>
        <p className="mt-2 text-ink-soft">
          En ambos casos la muestra la toma personal sanitario y se sella bajo
          cadena de custodia.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {Object.values(MODALITIES).map((m) => (
            <OptionCard
              key={m.id}
              name="modalidad"
              value={m.id}
              checked={modality === m.id}
              onChange={(v) => onModality(v as Modality)}
              title={m.name}
              description={m.description}
              icon={ICONS[m.id]}
            />
          ))}
        </div>
        {errors.modality && (
          <p role="alert" className="mt-2 text-sm text-alert">
            {errors.modality}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className="font-serif text-2xl font-semibold tracking-tight">
          Datos de contacto
        </legend>
        <p className="mt-2 text-ink-soft">
          Solo los usaremos para coordinar su cita.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field
              id="fullName"
              label="Nombre completo"
              autoComplete="name"
              value={contact.fullName}
              error={errors.fullName}
              onValue={(v) => onContact("fullName", v)}
            />
          </div>
          <Field
            id="email"
            type="email"
            label="Correo electrónico"
            autoComplete="email"
            inputMode="email"
            value={contact.email}
            error={errors.email}
            onValue={(v) => onContact("email", v)}
          />
          <Field
            id="phone"
            type="tel"
            label="Teléfono"
            autoComplete="tel"
            inputMode="tel"
            hint="10 dígitos. Llamaremos sin mencionar el motivo."
            value={contact.phone}
            error={errors.phone}
            onValue={(v) => onContact("phone", v)}
          />
          <Field
            id="city"
            label="Ciudad"
            autoComplete="address-level2"
            value={contact.city}
            error={errors.city}
            onValue={(v) => onContact("city", v)}
          />
          <Field
            id="preferredDate"
            type="date"
            label="Fecha preferida"
            optional
            min={minDate}
            value={contact.preferredDate}
            error={errors.preferredDate}
            onValue={(v) => onContact("preferredDate", v)}
          />
          {modality === "domicilio" && (
            <div className="sm:col-span-2">
              <Field
                id="address"
                label="Domicilio u hospital para la toma de muestra"
                autoComplete="street-address"
                value={contact.address}
                error={errors.address}
                onValue={(v) => onContact("address", v)}
              />
            </div>
          )}
          <div className="sm:col-span-2">
            <Field
              id="notes"
              label="Indicaciones para el coordinador"
              optional
              multiline
              placeholder="Por ejemplo: horario en que prefiere recibir la llamada."
              value={contact.notes}
              error={errors.notes}
              onValue={(v) => onContact("notes", v)}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4 rounded-md border border-line bg-paper p-4">
          <ConsentCheck
            id="consent"
            checked={contact.consent}
            error={errors.consent}
            onChange={(v) => onContact("consent", v)}
          >
            He leído el{" "}
            <Link
              href="/privacidad"
              target="_blank"
              className="text-navy underline"
            >
              aviso de privacidad
            </Link>{" "}
            y otorgo mi consentimiento expreso para el tratamiento de mis datos
            personales, incluidos los datos sensibles (muestras biológicas e
            información genética), con el único fin de realizar la prueba
            solicitada.
          </ConsentCheck>
          <ConsentCheck
            id="legitimacy"
            checked={contact.legitimacy}
            error={errors.legitimacy}
            onChange={(v) => onContact("legitimacy", v)}
          >
            Declaro que soy mayor de edad y que estoy legitimado para solicitar
            esta prueba. Entiendo que cada participante, o quien ejerza la
            patria potestad de un menor, deberá identificarse y firmar el{" "}
            <Link
              href="/consentimiento"
              target="_blank"
              className="text-navy underline"
            >
              consentimiento informado
            </Link>{" "}
            el día de la toma de muestra, y que no se procesan muestras
            obtenidas sin conocimiento de la persona.
          </ConsentCheck>
        </div>
      </fieldset>
    </div>
  );
}

function ConsentCheck({
  id,
  checked,
  error,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 accent-navy"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-2 pl-8 text-sm text-alert">
          {error}
        </p>
      )}
    </div>
  );
}
