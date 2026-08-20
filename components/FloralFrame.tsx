"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Petals } from "@/components/Petals";
import { cldBg, cldLayer, LAYERS } from "@/lib/cloudinary";

const overlays: { id: string; x: number; y: number; delay: number; duration: number }[] = [
  { id: LAYERS.flowerTl, x: -36, y: -28, delay: 0.12, duration: 9.2 },
  { id: LAYERS.flowerTc, x: 0, y: -32, delay: 0.2, duration: 8.4 },
  { id: LAYERS.flowerTr, x: 36, y: -28, delay: 0.16, duration: 10 },
  { id: LAYERS.goldTr, x: 40, y: -18, delay: 0.28, duration: 7.6 },
  { id: LAYERS.goldBl, x: -40, y: 28, delay: 0.32, duration: 8.8 },
  { id: LAYERS.flowerBc, x: 0, y: 36, delay: 0.36, duration: 9.6 },
  { id: LAYERS.flowerBb, x: -10, y: 38, delay: 0.4, duration: 7.2 },
  { id: LAYERS.flowerBr, x: 32, y: 30, delay: 0.44, duration: 8.1 },
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
  const rotateY = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-4, 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [4, -4]);

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
        className="relative mx-auto w-full max-w-md overflow-hidden gold-frame"
      >
        <div className="relative aspect-[3/4] w-full">
          <motion.img
            src={cldBg(LAYERS.bg)}
            alt=""
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,252,247,0.55)_0%,rgba(255,252,247,0.12)_58%,transparent_78%)]" />

          {overlays.map((layer) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: layer.x, y: layer.y }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.2, delay: layer.delay, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0 z-[1]"
            >
              <motion.img
                src={cldLayer(layer.id)}
                alt=""
                animate={reduce ? undefined : { y: [-5, 5, -5] }}
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
                className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-80"
              />
            </motion.div>
          ))}

          <motion.div
            className="pointer-events-none absolute left-1/2 top-[46%] z-[2] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(184,148,74,0.22) 0%, transparent 72%)",
            }}
            animate={reduce ? { opacity: 0.35 } : { opacity: [0.28, 0.45, 0.28] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <Petals />

          <div className="absolute inset-x-[14%] inset-y-[16%] z-[3] flex items-center justify-center text-center">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
