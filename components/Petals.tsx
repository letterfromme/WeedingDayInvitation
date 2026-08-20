"use client";

import { useReducedMotion } from "framer-motion";

const petals = [
  { left: "8%", delay: "0s", duration: "16s", size: "10px" },
  { left: "22%", delay: "2.4s", duration: "14s", size: "8px" },
  { left: "38%", delay: "5.1s", duration: "18s", size: "12px" },
  { left: "51%", delay: "1.2s", duration: "15s", size: "9px" },
  { left: "64%", delay: "7.3s", duration: "17s", size: "11px" },
  { left: "73%", delay: "3.8s", duration: "13s", size: "8px" },
  { left: "86%", delay: "6s", duration: "16.5s", size: "10px" },
  { left: "17%", delay: "9.2s", duration: "12.5s", size: "7px" },
];

export function Petals() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      {petals.map((petal, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size,
          }}
        />
      ))}
    </div>
  );
}
