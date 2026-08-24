"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ProductPouch } from "./ProductPouch";

const ORBIT_CHIPS = [
  { label: "PERFORMANCE", angle: -90 },
  { label: "STRENGTH", angle: 30 },
  { label: "RECOVERY", angle: 150 },
] as const;

function Beat({
  progress,
  range,
  eyebrow,
  label,
  sub,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  eyebrow: string;
  label: string;
  sub: string;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [24, 0, 0, -24]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-5xl leading-[0.95] text-white sm:text-6xl">
        {label}
      </h2>
      <p className="mt-3 text-lg text-white/55">{sub}</p>
    </motion.div>
  );
}

export function ProductSpin() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const rotateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 360]),
    { stiffness: 90, damping: 24, mass: 0.6 }
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [6, -4, 6]),
    { stiffness: 90, damping: 24 }
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.82, 1.05, 1.05, 0.9]
  );
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const counterRotate = useTransform(orbitRotate, (v) => -v);

  return (
    <section ref={trackRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[75vh] w-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-grind-blue/15 to-grind-purple/15 blur-[130px]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-2">
          {/* rotating headline beats */}
          <div className="relative h-40 sm:h-48">
            <Beat
              progress={scrollYProgress}
              range={[0, 0.06, 0.28, 0.34]}
              eyebrow="SCROLL TO EXPLORE"
              label="ONE PRODUCT."
              sub="No compromises."
            />
            <Beat
              progress={scrollYProgress}
              range={[0.34, 0.4, 0.62, 0.68]}
              eyebrow="SCROLL TO EXPLORE"
              label="5G CREATINE."
              sub="Every single serving."
            />
            <Beat
              progress={scrollYProgress}
              range={[0.68, 0.74, 0.96, 1]}
              eyebrow="SCROLL TO EXPLORE"
              label="BUILT TO GRIND."
              sub="Daily, without excuses."
            />
          </div>

          {/* pinned rotating product */}
          <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center [perspective:1400px] sm:h-[520px]">
            {/* continuous orbit ring */}
            <motion.div style={{ rotate: orbitRotate }} className="absolute inset-0">
              {ORBIT_CHIPS.map((chip) => (
                <div
                  key={chip.label}
                  className="absolute left-1/2 top-1/2 origin-center"
                  style={{
                    transform: `rotate(${chip.angle}deg) translate(15.5rem) rotate(${-chip.angle}deg)`,
                  }}
                >
                  <motion.span
                    style={{ rotate: counterRotate }}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-grind-black-soft/80 px-3 py-1.5 text-[0.65rem] font-heading font-bold tracking-wide text-white/70 backdrop-blur"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-grind-blue-bright to-grind-purple" />
                    {chip.label}
                  </motion.span>
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{ rotateY, rotateX, scale }}
              className="relative w-64 sm:w-80 [transform-style:preserve-3d]"
            >
              <div className="absolute inset-0 scale-110 rounded-[3rem] bg-gradient-to-br from-grind-blue/30 to-grind-purple/30 blur-3xl" />
              <div
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden" }}
              >
                <ProductPouch
                  face="front"
                  className="h-full w-full drop-shadow-[0_35px_60px_rgba(120,60,255,0.35)]"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <ProductPouch
                  face="back"
                  className="h-full w-full drop-shadow-[0_35px_60px_rgba(120,60,255,0.35)]"
                />
              </div>
              {/* spacer to preserve layout size since faces are absolutely positioned */}
              <div className="aspect-[684/1028] w-64 sm:w-80" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
