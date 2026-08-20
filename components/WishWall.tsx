"use client";

import { FormEvent, useEffect, useState } from "react";
import { listenWishes, submitWish, type Wish } from "@/lib/rsvp";

export function WishWall() {
  const [rows, setRows] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      return listenWishes(setRows);
    } catch {
      return undefined;
    }
  }, []);

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
    } catch {
      setError("Tidak dapat hantar ucapan.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
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
      <ul className="space-y-4">
        {rows.map((row) => (
          <li
            key={row.id}
            className="border-t border-[var(--gold)]/15 pt-4 first:border-0 first:pt-0"
          >
            <p className="font-display text-[11px] tracking-[0.18em] text-[var(--gold)]">
              {row.name}
            </p>
            <p className="mt-1 text-[var(--cream)]/85">{row.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
