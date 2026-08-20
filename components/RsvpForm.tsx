"use client";

import { FormEvent, useState } from "react";
import { submitRsvp } from "@/lib/rsvp";

export function RsvpForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [pax, setPax] = useState(1);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      setError("Sila masukkan nama.");
      return;
    }
    if (!attending) {
      setError("Sila pilih kehadiran.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      setError("Sila masukkan nombor telefon yang sah.");
      return;
    }
    setError("");
    setStatus("saving");
    try {
      await submitRsvp({
        name,
        phone: digits,
        attending: attending === "yes",
        pax: attending === "yes" ? Math.min(20, Math.max(1, Math.trunc(pax))) : 0,
        notes,
      });
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Tidak dapat hantar. Cuba lagi sebentar.");
    }
  }

  if (status === "done") {
    return (
      <div className="px-2 py-6 text-center">
        <p className="font-display text-[11px] tracking-[0.3em] text-[var(--gold)]">
          TERIMA KASIH
        </p>
        <p className="mt-3 text-lg text-[var(--ink)]">
          RSVP anda telah direkodkan.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Nama">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={79}
          className="field"
          placeholder="Nama penuh"
        />
      </Field>
      <Field label="Nombor telefon">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
          required
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="tel"
          maxLength={15}
          className="field"
          placeholder="01xxxxxxxx"
        />
      </Field>
      <Field label="Kehadiran">
        <div className="grid grid-cols-2 gap-2">
          <Choice
            active={attending === "yes"}
            onClick={() => setAttending("yes")}
          >
            Hadir
          </Choice>
          <Choice active={attending === "no"} onClick={() => setAttending("no")}>
            Tidak hadir
          </Choice>
        </div>
      </Field>
      {attending === "yes" ? (
        <Field label="Jumlah kehadiran">
          <input
            type="number"
            min={1}
            max={20}
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            className="field"
          />
        </Field>
      ) : null}
      <Field label="Nota (pilihan)">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={400}
          rows={3}
          className="field resize-none"
          placeholder="Alergi, ucapan, dll."
        />
      </Field>
      {error ? <p className="text-sm text-[var(--rose)]">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full border border-[var(--gold)] bg-[var(--gold)]/10 py-3 font-display text-[11px] tracking-[0.32em] text-[var(--gold)] disabled:opacity-60"
      >
        {status === "saving" ? "MENGHANTAR…" : "HANTAR RSVP"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-display mb-2 block text-[10px] tracking-[0.24em] text-[var(--gold)]/80">
        {label}
      </span>
      {children}
    </label>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border py-2 font-display text-[10px] tracking-[0.2em] ${
        active
          ? "border-[var(--gold)] bg-[var(--gold)]/12 text-[var(--gold)]"
          : "border-[var(--gold)]/30 text-[var(--ink)]/70"
      }`}
    >
      {children}
    </button>
  );
}
