"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { cldBg, cldLayer, cldPhoto, LAYERS } from "@/lib/cloudinary";
import { kepadaLine, event } from "@/lib/content";

const wash = [
  LAYERS.flowerTl,
  LAYERS.flowerTc,
  LAYERS.flowerTr,
  LAYERS.goldTr,
  LAYERS.goldBl,
  LAYERS.flowerBc,
  LAYERS.flowerBb,
  LAYERS.flowerBr,
];

export function Cover({
  onOpen,
  onStartMusic,
  to,
}: {
  onOpen: () => void;
  onStartMusic: () => void;
  to?: string;
}) {
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  function open() {
    if (leaving) return;
    onStartMusic();
    setLeaving(true);
    window.setTimeout(onOpen, reduce ? 0 : 340);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 isolate overflow-hidden bg-[#efe4d6]"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        reduce
          ? { opacity: 0 }
          : { y: "-100%", opacity: 0.35 }
      }
      transition={{ duration: reduce ? 0.35 : 1.05, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 scale-[1.22]">
        <img
          src={cldBg(LAYERS.bg)}
          alt=""
          className="h-full w-full object-cover"
        />
        {wash.map((id) => (
          <img
            key={id}
            src={cldLayer(id)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-85"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[#3a2a28]/18" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,252,247,0.28)_0%,rgba(58,42,40,0.16)_100%)]" />
      <FloatingHearts />

      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5"
        >
          <img
            src={cldPhoto(LAYERS.bride1, "f_auto,q_auto,c_fill,g_faces,w_520,h_680")}
            alt={`${event.coupleShort.bride} & ${event.coupleShort.groom}`}
            className="h-[8.25rem] w-[6.1rem] rounded-[50%] object-cover"
            style={{
              boxShadow:
                "0 0 0 3px rgba(184,148,74,0.9), 0 0 0 7px rgba(247,241,232,0.7), 0 18px 40px rgba(80,50,40,0.28)",
            }}
          />
        </motion.div>

        <p className="font-display text-[10px] tracking-[0.42em] text-[var(--gold)]">
          {event.title}
        </p>

        <motion.h1
          className="type-hero font-script mt-4 text-[3.35rem] leading-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.7 }}
        >
          {event.coupleShort.bride}
        </motion.h1>
        <motion.p
          className="font-script my-0.5 text-3xl text-[var(--gold)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          &amp;
        </motion.p>
        <motion.h1
          className="type-hero font-script text-[3.35rem] leading-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {event.coupleShort.groom}
        </motion.h1>

        <p className="font-display mt-4 text-[11px] tracking-[0.28em] text-[var(--ink)]/75">
          {event.date.displayMs}
        </p>
        <p className="mt-2 font-display text-[10px] tracking-[0.2em] text-[var(--gold)]">
          #{event.tagline}
        </p>

        {to ? (
          <p className="font-script mt-3 text-[1.65rem] leading-tight text-[var(--burgundy)]">
            {kepadaLine(to)}
          </p>
        ) : null}

        <motion.button
          type="button"
          onClick={open}
          aria-label="Buka kad"
          className="wax-seal mt-8"
          initial={{ scale: 0.86, opacity: 0 }}
          animate={
            leaving
              ? { scale: 0.35, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: leaving ? 0.32 : 0.7, ease: "easeOut" }}
        >
          <span className="wax-seal-ring" />
          <span className="font-display text-[11px] tracking-[0.28em] text-[var(--gold-soft)]">
            BUKA
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
