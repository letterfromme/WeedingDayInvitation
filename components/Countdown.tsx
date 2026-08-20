"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/content";

const target = new Date(`${event.date.iso}T04:00:00.000Z`).getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - (now ?? target));
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const items = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Minit", value: minutes },
    { label: "Saat", value: seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item) => (
        <div key={item.label} className="px-1 py-2 text-center">
          <p className="font-display text-[2.15rem] leading-none text-[var(--burgundy)]">
            {now === null ? "—" : pad(item.value)}
          </p>
          <p className="mt-2 font-display text-[8px] tracking-[0.22em] text-[var(--ink)]/45">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
