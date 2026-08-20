"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cld, cldLayer, LAYERS } from "@/lib/cloudinary";

const overlays: { id: string; x: number; y: number; delay: number }[] = [
  { id: LAYERS.flowerTl, x: -48, y: -36, delay: 0.15 },
  { id: LAYERS.flowerTc, x: 0, y: -44, delay: 0.28 },
  { id: LAYERS.flowerTr, x: 48, y: -36, delay: 0.22 },
  { id: LAYERS.goldTr, x: 56, y: -24, delay: 0.35 },
  { id: LAYERS.goldBl, x: -56, y: 36, delay: 0.4 },
  { id: LAYERS.flowerBc, x: 0, y: 48, delay: 0.45 },
  { id: LAYERS.flowerBb, x: -12, y: 52, delay: 0.5 },
  { id: LAYERS.flowerBr, x: 44, y: 40, delay: 0.55 },
];

export function FloralFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
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
    <div className={`[perspective:1200px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm gold-frame"
      >
        <motion.img
          src={cld(LAYERS.bg)}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {overlays.map((layer) => (
          <motion.img
            key={layer.id}
            src={cldLayer(layer.id)}
            alt=""
            initial={{ opacity: 0, x: layer.x, y: layer.y, scale: 1.06 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 1.15, delay: layer.delay, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover mix-blend-screen"
          />
        ))}
        <div className="absolute inset-[7%] z-10 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
