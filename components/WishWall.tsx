"use client";

import { FormEvent, useEffect, useState } from "react";
import { listenWishes, submitWish, type Wish } from "@/lib/rsvp";

export function WishForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2 || message.trim().length < 2) {
      setError("Sila isi nama dan ucapan.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      await submitWish(name, message);
      setName("");
      setMessage("");
      setDone(true);
    } catch {
      setError("Tidak dapat hantar ucapan.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="py-4 text-center">
        <p className="font-display text-[11px] tracking-[0.3em] text-[var(--gold)]">
          TERIMA KASIH
        </p>
        <p className="mt-3 text-[var(--ink)]">Ucapan anda telah direkodkan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={79}
        className="field"
        placeholder="Nama"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={400}
        rows={3}
        className="field resize-none"
        placeholder="Ucapan anda…"
      />
      {error ? <p className="text-sm text-[var(--rose)]">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="w-full border border-[var(--gold)]/70 py-3 font-display text-[11px] tracking-[0.28em] text-[var(--gold)]"
      >
        {busy ? "MENGHANTAR…" : "HANTAR UCAPAN"}
      </button>
    </form>
  );
}

export function WishList() {
  const [rows, setRows] = useState<Wish[] | null>(null);

  useEffect(() => {
    try {
      return listenWishes(setRows);
    } catch {
      return undefined;
    }
  }, []);

  if (rows === null) {
    return <p className="text-center text-[var(--ink)]/40">Memuatkan…</p>;
  }

  if (rows.length === 0) {
    return <p className="py-6 text-center text-[var(--ink)]/40">Tiada ucapan lagi.</p>;
  }

  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li
          key={row.id}
          className="border-t border-[var(--gold)]/15 pt-4 first:border-0 first:pt-0"
        >
          <p className="font-display text-[11px] tracking-[0.18em] text-[var(--gold)]">
            {row.name}
          </p>
          <p className="mt-1 text-[var(--ink)]">{row.message}</p>
        </li>
      ))}
    </ul>
  );
}
