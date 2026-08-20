"use client";

import { motion, useReducedMotion } from "framer-motion";
import { event } from "@/lib/content";

export function Cover({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, #fde8ee 0%, #f7f1e8 55%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-sm text-center"
      >
        <p className="font-display text-[11px] tracking-[0.42em] text-[var(--gold)]">
          WALIMATULURUS
        </p>
        <h1 className="type-hero font-script mt-6 text-6xl leading-none">
          {event.coupleShort.bride}
        </h1>
        <p className="font-script my-1 text-3xl text-[var(--gold)]">&amp;</p>
        <h1 className="type-hero font-script text-6xl leading-none">
          {event.coupleShort.groom}
        </h1>
        <p className="font-display mt-6 text-[11px] tracking-[0.28em] text-[var(--ink)]/70">
          {event.date.displayMs}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="nav-btn mt-10 px-10 py-3"
          style={
            reduce
              ? undefined
              : { boxShadow: "0 0 28px rgba(184,148,74,0.22)" }
          }
        >
          BUKA / OPEN
        </button>
      </motion.div>
    </motion.div>
  );
}
