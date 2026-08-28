"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Dumbbell, RotateCw, Box, Leaf, FlaskConical } from "lucide-react";

const PILLARS = [
  {
    icon: Zap,
    title: "Performance",
    body: "Creatine monohydrate fuels ATP production so you can push harder, longer — every set, every sprint.",
  },
  {
    icon: Dumbbell,
    title: "Strength",
    body: "The most researched supplement in sports science, in a dose that actually adds up over time.",
  },
  {
    icon: RotateCw,
    title: "Recovery",
    body: "Support muscle recovery between sessions so you can show up and grind again tomorrow.",
  },
];

const BADGES = [
  { icon: Box, label: "Sugar Free" },
  { icon: Leaf, label: "Gluten Free" },
  { icon: FlaskConical, label: "Lab Tested" },
];

export function Why() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section id="why" ref={sectionRef} className="relative overflow-hidden py-28">
      <motion.div
        style={{
          y: blobY,
          background:
            "radial-gradient(circle, rgba(79,178,255,0.22) 0%, rgba(120,100,255,0.16) 30%, rgba(155,59,255,0.1) 55%, rgba(155,59,255,0.03) 78%, rgba(155,59,255,0) 100%)",
        }}
        className="pointer-events-none absolute left-1/2 top-0 h-[55vh] w-[55vh] -translate-x-1/2 rounded-full blur-2xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
            WHY GRINDLY
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">
            Chewable. Crushable. <span className="text-gradient">Actually enjoyable.</span>
          </h2>
          <p className="mt-4 text-white/60">
            No mixing, no chalky shakers, no water needed. Just 2 gummies a day
            for 5g of creatine monohydrate that gets you results.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-grind-panel p-8 transition hover:border-white/20"
            >
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-xl transition group-hover:scale-125"
                style={{
                  background:
                    "radial-gradient(circle, rgba(79,178,255,0.35) 0%, rgba(120,100,255,0.26) 35%, rgba(155,59,255,0.14) 60%, rgba(155,59,255,0.04) 82%, rgba(155,59,255,0) 100%)",
                }}
              />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-grind-blue to-grind-purple shadow-lg shadow-grind-purple/30">
                <p.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="relative mt-6 font-heading text-xl font-bold text-white">
                {p.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={false}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 sm:gap-10"
        >
          {BADGES.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-2 text-sm font-heading font-semibold tracking-wide text-white/70"
            >
              <b.icon className="h-4 w-4 text-grind-blue-bright" />
              {b.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
