"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const NAV = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#custodia", label: "Cadena de custodia" },
  { href: "/#confidencialidad", label: "Confidencialidad" },
  { href: "/seguimiento", label: "Consultar folio" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="text-sm text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/solicitud">Solicitar cita</ButtonLink>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-line-strong lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Principal móvil"
          className="border-t border-line bg-paper lg:hidden"
        >
          <Container className="flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b border-line py-3.5 text-ink-soft last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <span onClick={close} className="mt-3 mb-2">
              <ButtonLink href="/solicitud" className="w-full">
                Solicitar cita
              </ButtonLink>
            </span>
          </Container>
        </nav>
      )}
    </header>
  );
}
