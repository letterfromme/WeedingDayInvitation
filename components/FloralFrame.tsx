"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cldBg, cldLayer, LAYERS } from "@/lib/cloudinary";

const overlays: { id: string; x: number; y: number; delay: number; duration: number }[] = [
  { id: LAYERS.flowerTl, x: -48, y: -36, delay: 0.15, duration: 9.2 },
  { id: LAYERS.flowerTc, x: 0, y: -44, delay: 0.28, duration: 8.4 },
  { id: LAYERS.flowerTr, x: 48, y: -36, delay: 0.22, duration: 10 },
  { id: LAYERS.goldTr, x: 56, y: -24, delay: 0.35, duration: 7.6 },
  { id: LAYERS.goldBl, x: -56, y: 36, delay: 0.4, duration: 8.8 },
  { id: LAYERS.flowerBc, x: 0, y: 48, delay: 0.45, duration: 9.6 },
  { id: LAYERS.flowerBb, x: -12, y: 52, delay: 0.5, duration: 7.2 },
  { id: LAYERS.flowerBr, x: 44, y: 40, delay: 0.55, duration: 8.1 },
];

export function FloralFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 22 });
  const sy = useSpring(my, { stiffness: 140, damping: 22 });
  const rotateY = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-5, 5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [5, -5]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    mx.set((e.clientX - box.left) / box.width - 0.5);
    my.set((e.clientY - box.top) / box.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden gold-frame"
      >
        <motion.img
          src={cldBg(LAYERS.bg)}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/55 via-white/35 to-[#f7f1e8]/70" />

        {overlays.map((layer) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: layer.x, y: layer.y, scale: 1.04 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 1.25, delay: layer.delay, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0"
          >
            <motion.img
              src={cldLayer(layer.id)}
              alt=""
              animate={reduce ? undefined : { y: [-6, 6, -6] }}
              transition={
                reduce
                  ? undefined
                  : {
                      duration: layer.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: layer.delay,
                    }
              }
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
          </motion.div>
        ))}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[44%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(184,148,74,0.42) 0%, transparent 70%)",
          }}
          animate={reduce ? { opacity: 0.4 } : { opacity: [0.35, 0.55, 0.35] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        />

        <div className="absolute inset-[8%] z-10 flex items-center justify-center">
          <div className="surface w-full rounded-xl px-5 py-8 text-center sm:px-7">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
