"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { ProductPouch } from "./ProductPouch";

const ORBIT_CHIPS = [
  { label: "PERFORMANCE", angle: -90 },
  { label: "STRENGTH", angle: 30 },
  { label: "RECOVERY", angle: 150 },
] as const;

const BEATS = [
  { eyebrow: "SCROLL TO EXPLORE", label: "ONE PRODUCT.", sub: "No compromises." },
  { eyebrow: "SCROLL TO EXPLORE", label: "5G CREATINE.", sub: "Every single serving." },
  { eyebrow: "SCROLL TO EXPLORE", label: "BUILT TO GRIND.", sub: "Daily, without excuses." },
] as const;

function useActiveBeat(progress: MotionValue<number>) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const idx = v < 0.34 ? 0 : v < 0.68 ? 1 : 2;
    setActive((prev) => (prev === idx ? prev : idx));
  });
  return active;
}

// Only one beat is ever mounted at a time, so there is no way for two
// headlines to overlap — no shared absolute-positioned stack of opacity
// values to get out of sync, just a single element swapped via key.
function BeatStack({ progress }: { progress: MotionValue<number> }) {
  const active = useActiveBeat(progress);
  const beat = BEATS[active];
  return (
    <div className="relative h-40 sm:h-48">
      <AnimatePresence mode="sync">
        <motion.div
          key={active}
          initial={active === 0 ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
            {beat.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-5xl leading-[0.95] text-white sm:text-6xl">
            {beat.label}
          </h2>
          <p className="mt-3 text-lg text-white/55">{beat.sub}</p>
        </motion.div>
      </AnimatePresence>
    </div>
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

  // Simulate the flip with a 2D squash + opacity crossfade instead of true
  // 3D transforms (perspective/preserve-3d/backface-visibility). That
  // combination is known to render blank in Safari when a blurred sibling
  // sits inside the same 3D-transformed parent, which matched exactly the
  // section every "black screen" report pointed at.
  const cardCos = useTransform(rotateY, (deg) => Math.cos((deg * Math.PI) / 180));
  const cardScaleX = useTransform(cardCos, (c) => Math.max(0.08, Math.abs(c)));
  // Smooth crossfade over a narrow band around the edge-on point (cos ~ 0)
  // instead of an instant swap, so the two faces blend instead of popping.
  const frontOpacity = useTransform(cardCos, [-0.06, 0.06], [0, 1]);
  const backOpacity = useTransform(frontOpacity, (v) => 1 - v);

  return (
    <section ref={trackRef} className="relative" style={{ height: "300vh" }}>
      <div className="h-viewport sticky top-0 flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[75vh] w-[75vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(79,178,255,0.22) 0%, rgba(120,100,255,0.16) 30%, rgba(155,59,255,0.1) 55%, rgba(155,59,255,0.03) 78%, rgba(155,59,255,0) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-2">
          {/* rotating headline beats */}
          <BeatStack progress={scrollYProgress} />

          {/* pinned rotating product */}
          <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center sm:h-[520px]">
            {/* continuous orbit ring */}
            <motion.div style={{ rotate: orbitRotate }} className="absolute inset-0">
              {ORBIT_CHIPS.map((chip) => (
                <div
                  key={chip.label}
                  className="absolute left-1/2 top-1/2 origin-center"
                  style={{
                    transform: `rotate(${chip.angle}deg) translate(clamp(6.5rem, 34vw, 15.5rem)) rotate(${-chip.angle}deg)`,
                  }}
                >
                  <motion.span
                    style={{ rotate: counterRotate }}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-grind-black-soft px-3 py-1.5 text-[0.65rem] font-heading font-bold tracking-wide text-white/70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-grind-blue-bright to-grind-purple" />
                    {chip.label}
                  </motion.span>
                </div>
              ))}
            </motion.div>

            <div className="relative w-64 sm:w-80">
              <div
                className="absolute inset-0 scale-110 rounded-[3rem] blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(79,178,255,0.4) 0%, rgba(120,100,255,0.32) 35%, rgba(155,59,255,0.18) 60%, rgba(155,59,255,0.05) 82%, rgba(155,59,255,0) 100%)",
                }}
              />
              <motion.div
                style={{ rotateX, scale, scaleX: cardScaleX }}
                className="relative"
              >
                <motion.div style={{ opacity: frontOpacity }} className="absolute inset-0">
                  <ProductPouch
                    face="front"
                    className="h-full w-full drop-shadow-[0_35px_60px_rgba(120,60,255,0.35)]"
                  />
                </motion.div>
                <motion.div style={{ opacity: backOpacity }} className="absolute inset-0">
                  <ProductPouch
                    face="back"
                    className="h-full w-full drop-shadow-[0_35px_60px_rgba(120,60,255,0.35)]"
                  />
                </motion.div>
                {/* spacer to preserve layout size since faces are absolutely positioned */}
                <div className="aspect-[684/1028] w-64 sm:w-80" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
