"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Spark = { id: number; x: number; y: number; hue: "blue" | "purple" };

let sparkId = 0;

export function useCursorSparkles() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const lastSpawn = useRef(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const now = performance.now();
    if (now - lastSpawn.current < 60) return;
    lastSpawn.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const id = ++sparkId;
    const spark: Spark = {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      hue: Math.random() > 0.5 ? "blue" : "purple",
    };
    setSparks((s) => [...s.slice(-18), spark]);
  }, []);

  const elements = (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0.9, scale: 0, x: s.x, y: s.y }}
            animate={{ opacity: 0, scale: 1, y: s.y - 40 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            onAnimationComplete={() =>
              setSparks((cur) => cur.filter((c) => c.id !== s.id))
            }
            className={`absolute h-1.5 w-1.5 rounded-full ${
              s.hue === "blue" ? "bg-grind-blue-bright" : "bg-grind-purple"
            }`}
            style={{ left: 0, top: 0, boxShadow: "0 0 8px 2px currentColor" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return { onMouseMove, elements };
}
