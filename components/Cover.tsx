"use client";

import { motion } from "framer-motion";
import { event } from "@/lib/content";

export function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#120d10]/95 px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-sm text-center"
      >
        <p className="font-display text-[11px] tracking-[0.42em] text-[var(--gold)]">
          WALIMATULURUS
        </p>
        <h1 className="font-script mt-6 text-6xl leading-none text-[var(--gold-soft)]">
          {event.coupleShort.bride}
        </h1>
        <p className="font-script my-1 text-3xl text-[var(--rose)]">&amp;</p>
        <h1 className="font-script text-6xl leading-none text-[var(--gold-soft)]">
          {event.coupleShort.groom}
        </h1>
        <p className="font-display mt-6 text-[11px] tracking-[0.28em] text-[var(--cream)]/80">
          {event.date.displayMs}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-10 border border-[var(--gold)]/70 px-10 py-3 font-display text-[11px] tracking-[0.35em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--ink)]"
        >
          BUKA / OPEN
        </button>
      </motion.div>
    </motion.div>
  );
}
