import { CheckIcon } from "@/components/ui/Icons";
import { formatDateTime } from "@/lib/format";
import { TRACKING_STAGES } from "@/lib/tracking";
import type { StageState, TrackingRecord } from "@/lib/types";

const STATE_LABEL: Record<StageState, string> = {
  done: "Completado",
  current: "Etapa actual",
  pending: "Pendiente",
};

export function StatusTimeline({ record }: { record: TrackingRecord }) {
  const lastIndex = TRACKING_STAGES.length - 1;
  const finished = record.currentStage === lastIndex;

  return (
    <ol>
      {TRACKING_STAGES.map((stage, index) => {
        const state: StageState =
          index < record.currentStage || (finished && index === lastIndex)
            ? "done"
            : index === record.currentStage
              ? "current"
              : "pending";
        const date = record.stageDates[index];

        return (
          <li key={stage.id} className="relative flex gap-4 pb-8 last:pb-0">
            {index < lastIndex && (
              <span
                aria-hidden="true"
                className={`absolute top-8 bottom-0 left-[15px] w-px ${index < record.currentStage ? "bg-clinic" : "bg-line-strong"}`}
              />
            )}
            <span
              className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                state === "done"
                  ? "border-clinic bg-clinic text-white"
                  : state === "current"
                    ? "border-navy bg-surface"
                    : "border-line-strong bg-surface"
              }`}
            >
              {state === "done" && <CheckIcon className="h-4 w-4" />}
              {state === "current" && (
                <span className="h-2.5 w-2.5 rounded-full bg-navy" />
              )}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p
                  className={`font-medium ${state === "pending" ? "text-ink-muted" : "text-ink"}`}
                >
                  {stage.title}
                </p>
                {date && (
                  <time dateTime={date} className="text-sm text-ink-muted">
                    {formatDateTime(date)}
                  </time>
                )}
              </div>
              <p className="sr-only">{STATE_LABEL[state]}</p>
              {state !== "pending" && (
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {stage.description}
                </p>
              )}
              {state === "current" && (
                <span className="mt-2 inline-block rounded bg-navy-tint px-2 py-0.5 text-xs font-medium text-navy">
                  Etapa actual
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
