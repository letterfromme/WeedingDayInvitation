"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listenAttendance, type Attendance } from "@/lib/rsvp";
import { event } from "@/lib/content";

export function AttendanceBoard() {
  const [rows, setRows] = useState<Attendance[] | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"yes" | "no">("yes");

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
    return { yes, no, pax, total: list.length };
  }, [rows]);

  const shown = tab === "yes" ? stats.yes : stats.no;

  return (
    <main className="mx-auto min-h-screen max-w-lg px-5 pb-20 pt-12">
      <p className="text-center font-display text-[10px] tracking-[0.4em] text-[var(--gold)]">
        KEHADIRAN
      </p>
      <h1 className="type-hero font-script mt-4 text-center text-5xl">
        {event.coupleShort.bride} &amp; {event.coupleShort.groom}
      </h1>
      <Link
        href="/"
        className="mt-4 block text-center font-display text-[10px] tracking-[0.24em] text-[var(--ink)]/50"
      >
        ← Kembali ke kad
      </Link>

      <div className="mt-10 grid grid-cols-3 gap-3 text-center">
        <Stat label="Hadir" value={stats.yes.length} />
        <Stat label="Tidak hadir" value={stats.no.length} />
        <Stat label="Jumlah pax" value={stats.pax} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setTab("yes")}
          className={`border py-2 font-display text-[10px] tracking-[0.2em] ${
            tab === "yes"
              ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
              : "border-[var(--gold)]/30 text-[var(--ink)]/50"
          }`}
        >
          HADIR
        </button>
        <button
          type="button"
          onClick={() => setTab("no")}
          className={`border py-2 font-display text-[10px] tracking-[0.2em] ${
            tab === "no"
              ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
              : "border-[var(--gold)]/30 text-[var(--ink)]/50"
          }`}
        >
          TIDAK HADIR
        </button>
      </div>

      {error ? <p className="mt-6 text-center text-[var(--burgundy)]">{error}</p> : null}
      {rows === null && !error ? (
        <p className="mt-10 text-center text-[var(--ink)]/40">Memuatkan…</p>
      ) : (
        <ul className="surface mt-8 rounded-2xl px-5 py-2">
          {shown.length === 0 ? (
            <li className="py-8 text-center text-[var(--ink)]/40">Tiada rekod lagi.</li>
          ) : (
            shown.map((row) => (
              <li
                key={row.id}
                className="flex items-baseline justify-between border-b border-[var(--gold)]/15 py-3 last:border-0"
              >
                <span>{row.name}</span>
                {row.attending ? (
                  <span className="font-display text-[10px] tracking-[0.18em] text-[var(--gold)]">
                    {row.pax} pax
                  </span>
                ) : null}
              </li>
            ))
          )}
        </ul>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface py-4">
      <p className="font-display text-2xl text-[var(--gold)]">{value}</p>
      <p className="mt-1 font-display text-[8px] tracking-[0.16em] text-[var(--ink)]/50">
        {label.toUpperCase()}
      </p>
    </div>
  );
}
