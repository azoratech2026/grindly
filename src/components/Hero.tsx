"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { ChevronDown, Sparkles } from "lucide-react";
import { ProductPouch } from "./ProductPouch";
import { Magnetic } from "./Magnetic";
import { useCursorSparkles } from "./CursorSparkles";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { onMouseMove: onSparkleMove, elements: sparkleElements } =
    useCursorSparkles();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 18,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <section
      id="top"
      onMouseMove={onSparkleMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {sparkleElements}
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-grind-purple/20 blur-[120px]" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-grind-blue/25 blur-[100px]" />
        <div className="absolute -right-10 bottom-0 h-96 w-96 rounded-full bg-grind-purple/25 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        {/* copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-heading font-semibold tracking-wide text-white/80"
          >
            <Sparkles className="h-3.5 w-3.5 text-grind-blue-bright" />
            5G CREATINE MONOHYDRATE &middot; ZERO SUGAR
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[4rem] leading-[0.9] tracking-tight text-white sm:text-[5.5rem] lg:text-[6rem]"
          >
            CHEW
            <br />
            <span className="text-gradient">THE GRIND.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-lg text-white/60"
          >
            Grindly isn&apos;t just a supplement — it&apos;s a daily reminder to
            show up, put in the work, and keep grinding. 5g of real creatine
            monohydrate in a gummy you&apos;ll actually crave.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#buy"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-grind-blue to-grind-purple px-8 py-4 font-heading text-base font-bold text-white shadow-xl shadow-grind-purple/25 transition hover:scale-105"
              >
                <span className="relative z-10">Fuel Your Grind — $34.99</span>
                <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
            </Magnetic>
            <a
              href="#why"
              className="rounded-full border border-white/20 px-8 py-4 font-heading text-base font-bold text-white/80 transition hover:border-white/50 hover:text-white"
            >
              See Why It Works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex items-center gap-6 text-xs font-heading font-semibold tracking-wide text-white/50"
          >
            <span>SUGAR FREE</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>GLUTEN FREE</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>LAB TESTED</span>
          </motion.div>
        </div>

        {/* interactive product */}
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center [perspective:1200px] sm:h-[520px]"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 scale-110 rounded-[3rem] bg-gradient-to-br from-grind-blue/30 to-grind-purple/30 blur-3xl" />
            <ProductPouch className="relative w-72 sm:w-80 md:w-[22rem] drop-shadow-[0_35px_60px_rgba(120,60,255,0.35)]" />
          </motion.div>

          {/* floating gummy photo chips around the pouch */}
          <div
            className="absolute -left-8 top-6 h-16 w-16 animate-float overflow-hidden rounded-2xl ring-2 ring-white/20 drop-shadow-xl sm:-left-14 sm:h-24 sm:w-24"
            style={{ ["--rot" as string]: "-10deg", animationDelay: "0.2s" }}
          >
            <Image src="/images/gummy-chip-1.jpg" alt="Blue raspberry gummy" fill sizes="96px" className="object-cover" />
          </div>
          <div
            className="absolute -right-6 top-20 h-14 w-14 animate-float overflow-hidden rounded-2xl ring-2 ring-white/20 drop-shadow-xl sm:-right-10 sm:h-20 sm:w-20"
            style={{ ["--rot" as string]: "8deg", animationDelay: "1.1s" }}
          >
            <Image src="/images/gummy-chip-2.jpg" alt="Grindly gummies" fill sizes="80px" className="object-cover" />
          </div>
          <div
            className="absolute -left-4 bottom-4 h-12 w-12 animate-float overflow-hidden rounded-2xl ring-2 ring-white/20 drop-shadow-xl sm:left-0 sm:h-16 sm:w-16"
            style={{ ["--rot" as string]: "6deg", animationDelay: "0.6s" }}
          >
            <Image src="/images/gummy-chip-2.jpg" alt="Grindly gummies" fill sizes="64px" className="object-cover" />
          </div>
          <div
            className="absolute -right-4 bottom-14 h-16 w-16 animate-float overflow-hidden rounded-2xl ring-2 ring-white/20 drop-shadow-xl sm:right-2 sm:h-24 sm:w-24"
            style={{ ["--rot" as string]: "-6deg", animationDelay: "1.6s" }}
          >
            <Image src="/images/gummy-chip-1.jpg" alt="Blue raspberry gummy" fill sizes="96px" className="object-cover" />
          </div>
        </div>
      </div>

      <motion.a
        href="#why"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex"
      >
        <span className="text-[0.65rem] font-heading tracking-[0.3em]">SCROLL</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
