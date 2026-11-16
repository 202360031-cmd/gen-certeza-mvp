const dateTime = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const dateOnly = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatDateTime = (iso: string) => dateTime.format(new Date(iso));

/** Acepta "YYYY-MM-DD" sin desfase de zona horaria. */
export const formatDate = (iso: string) =>
  dateOnly.format(new Date(iso.length === 10 ? `${iso}T12:00:00` : iso));
