"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Chew 2 gummies",
    body: "That's it — 5g of creatine monohydrate, zero shaker required.",
  },
  {
    n: "02",
    title: "Anytime, anywhere",
    body: "Pre-workout, post-workout, at your desk. Consistency beats timing.",
  },
  {
    n: "03",
    title: "Keep grinding",
    body: "Stay consistent daily and let saturation do the work over weeks.",
  },
];

export function HowToUse() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
            HOW TO USE
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">
            Three steps. <span className="text-gradient">Zero excuses.</span>
          </h2>
        </motion.div>

        <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center sm:text-left"
            >
              <span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-grind-black-soft font-display text-2xl text-transparent bg-clip-text bg-gradient-to-br from-grind-blue-bright to-grind-purple sm:mx-0">
                {s.n}
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-white/55">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
