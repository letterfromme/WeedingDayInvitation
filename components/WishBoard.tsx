"use client";

import { event } from "@/lib/content";
import { WishWall } from "@/components/WishWall";

export function WishBoard() {
  return (
    <main className="mx-auto min-h-screen max-w-lg px-5 pb-20 pt-12">
      <p className="text-center font-display text-[10px] tracking-[0.4em] text-[var(--gold)]">
        UCAPAN
      </p>
      <h1 className="type-hero font-script mt-4 text-center text-5xl">
        {event.coupleShort.bride} &amp; {event.coupleShort.groom}
      </h1>
      <p className="mt-4 text-center text-sm text-[var(--ink)]/60">
        Tinggalkan ucapan untuk pengantin.
      </p>
      <div className="surface mt-10 rounded-2xl px-6 py-10">
        <WishWall />
      </div>
    </main>
  );
}
