"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatRsvpDate,
  listenAttendance,
  type Attendance,
} from "@/lib/rsvp";
import { event, telLink, waLink } from "@/lib/content";
import { WishList } from "@/components/WishWall";

export function GuestBook() {
  const [rows, setRows] = useState<Attendance[] | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"yes" | "no" | "all">("all");

  useEffect(() => {
    try {
      return listenAttendance(setRows);
    } catch {
      setError("Tidak dapat memuatkan senarai.");
      return undefined;
    }
  }, []);

  const stats = useMemo(() => {
    const list = rows ?? [];
    const yes = list.filter((r) => r.attending);
    const no = list.filter((r) => !r.attending);
    const pax = yes.reduce((sum, r) => sum + (r.pax || 0), 0);
    return {
      total: list.length,
      yes,
      no,
      pax,
      yesCount: yes.length,
      noCount: no.length,
    };
  }, [rows]);

  const shown =
    tab === "all" ? (rows ?? []) : tab === "yes" ? stats.yes : stats.no;

  return (
    <main className="mx-auto min-h-screen max-w-lg px-5 pb-20 pt-12">
      <p className="text-center font-display text-[10px] tracking-[0.4em] text-[var(--gold)]">
        KEHADIRAN &amp; UCAPAN
      </p>
      <h1 className="type-hero font-script mt-4 text-center text-5xl">
        {event.coupleShort.bride} &amp; {event.coupleShort.groom}
      </h1>

      <section className="mt-12">
        <p className="section-title text-center">Ringkasan RSVP</p>
        <div className="section-ornament" />

        <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          <Stat label="Jumlah RSVP" value={stats.total} />
          <Stat label="Hadir" value={stats.yesCount} />
          <Stat label="Tidak hadir" value={stats.noCount} />
          <Stat label="Jumlah pax" value={stats.pax} />
        </div>
      </section>

      <section className="mt-14">
        <p className="section-title text-center">Butiran RSVP</p>
        <div className="section-ornament" />

        <div className="grid grid-cols-3 gap-2">
          {(
            [
              ["all", "SEMUA"],
              ["yes", "HADIR"],
              ["no", "TIDAK"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`border py-2 font-display text-[10px] tracking-[0.16em] ${
                tab === key
                  ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                  : "border-[var(--gold)]/30 text-[var(--ink)]/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error ? <p className="mt-6 text-center text-[var(--burgundy)]">{error}</p> : null}
        {rows === null && !error ? (
          <p className="mt-10 text-center text-[var(--ink)]/40">Memuatkan…</p>
        ) : shown.length === 0 ? (
          <p className="mt-10 text-center text-[var(--ink)]/40">Tiada rekod lagi.</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {shown.map((row) => (
              <li key={row.id}>
                <RsvpDetailCard row={row} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-16">
        <p className="section-title text-center">Ucapan</p>
        <div className="section-ornament" />
        <div className="surface rounded-2xl px-6 py-10">
          <WishList />
        </div>
      </section>
    </main>
  );
}

function toWaPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("60")) return digits;
  if (digits.startsWith("0")) return `60${digits.slice(1)}`;
  return `60${digits}`;
}

function RsvpDetailCard({ row }: { row: Attendance }) {
  const when = formatRsvpDate(row.createdAt);
  const phone = row.phone?.trim();
  const intl = phone ? toWaPhone(phone) : "";

  return (
    <article className="surface rounded-2xl px-5 py-5 text-left">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base tracking-[0.04em] text-[var(--ink)]">
            {row.name}
          </p>
          {when ? (
            <p className="mt-1 text-xs text-[var(--ink)]/45">{when}</p>
          ) : null}
        </div>
        <span
          className={`shrink-0 border px-2 py-1 font-display text-[9px] tracking-[0.16em] ${
            row.attending
              ? "border-[var(--gold)] text-[var(--gold)]"
              : "border-[var(--ink)]/25 text-[var(--ink)]/55"
          }`}
        >
          {row.attending ? "HADIR" : "TIDAK HADIR"}
        </span>
      </div>

      <dl className="mt-4 space-y-2.5 text-sm">
        <DetailRow label="Jumlah pax">
          {row.attending ? `${row.pax} orang` : "—"}
        </DetailRow>
        <DetailRow label="Telefon">
          {phone ? (
            <span className="inline-flex flex-wrap items-center gap-3">
              <span>{phone}</span>
              <a
                href={waLink(intl)}
                className="underline decoration-[var(--gold)]/50"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a href={telLink(intl)} className="underline decoration-[var(--gold)]/50">
                Call
              </a>
            </span>
          ) : (
            <span className="text-[var(--ink)]/40">Tiada (rekod lama)</span>
          )}
        </DetailRow>
        <DetailRow label="Nota">
          {row.notes?.trim() ? (
            row.notes
          ) : (
            <span className="text-[var(--ink)]/40">Tiada</span>
          )}
        </DetailRow>
      </dl>
    </article>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-2 border-t border-[var(--gold)]/12 pt-2.5 first:border-0 first:pt-0">
      <dt className="font-display text-[9px] tracking-[0.18em] text-[var(--gold)]">
        {label.toUpperCase()}
      </dt>
      <dd className="text-[var(--ink)]/85">{children}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface py-4">
      <p className="font-display text-2xl text-[var(--gold)]">{value}</p>
      <p className="mt-1 font-display text-[8px] tracking-[0.14em] text-[var(--ink)]/50">
        {label.toUpperCase()}
      </p>
    </div>
  );
}
