import Link from "next/link";
import { HelixIcon } from "@/components/ui/Icons";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 ${inverted ? "text-white" : "text-ink"}`}
      aria-label="GenCerteza, inicio"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-md ${inverted ? "bg-white/10" : "bg-navy text-white"}`}
      >
        <HelixIcon className="h-4.5 w-4.5" />
      </span>
      <span className="font-serif text-lg font-semibold tracking-tight">
        GenCerteza
      </span>
    </Link>
  );
}
