"use client";

import { useReducedMotion } from "framer-motion";

const hearts = [
  { left: "12%", delay: "0s", duration: "14s", size: 14, drift: "-12px" },
  { left: "28%", delay: "3.2s", duration: "16s", size: 10, drift: "10px" },
  { left: "48%", delay: "1.4s", duration: "15s", size: 12, drift: "-8px" },
  { left: "66%", delay: "5.5s", duration: "17s", size: 9, drift: "14px" },
  { left: "82%", delay: "2.1s", duration: "13.5s", size: 11, drift: "-6px" },
  { left: "38%", delay: "7.8s", duration: "18s", size: 8, drift: "8px" },
];

export function FloatingHearts() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {hearts.map((heart, i) => (
        <span
          key={i}
          className="float-heart"
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            ["--heart-drift" as string]: heart.drift,
          }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
            <path d="M12 21s-6.7-4.35-9.33-7.4C.8 11.4.5 8.2 2.4 6.3c1.7-1.7 4.4-1.7 6.1 0L12 9.8l3.5-3.5c1.7-1.7 4.4-1.7 6.1 0 1.9 1.9 1.6 5.1-.27 7.3C18.7 16.65 12 21 12 21z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
