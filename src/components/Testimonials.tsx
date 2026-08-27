"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Jordan M.",
    role: "Powerlifter",
    quote:
      "Finally a creatine I don't dread taking. No bloat, no chalky taste — just two gummies and done.",
  },
  {
    name: "Aya K.",
    role: "CrossFit Coach",
    quote:
      "Threw my shaker bottle out. Grindly travels in my bag and I actually remember to take it daily.",
  },
  {
    name: "Sam R.",
    role: "Marathon Runner",
    quote:
      "Strength and recovery both noticeably improved after a month. Tastes like actual candy, not chemicals.",
  },
  {
    name: "Priya D.",
    role: "Bodybuilding",
    quote:
      "5g dosed exactly right, sugar-free, and it doesn't upset my stomach like powders used to.",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
            THE GRIND SQUAD
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">
            Real people. <span className="text-gradient">Real reps.</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-grind-blue-bright text-grind-blue-bright" />
            ))}
            <span className="ml-2 text-sm text-white/50">4.9 average rating</span>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-white/10 bg-grind-panel p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-grind-blue-bright text-grind-blue-bright" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-grind-blue to-grind-purple font-heading text-xs font-bold text-white">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-heading font-bold text-white">
                    {r.name}
                  </p>
                  <p className="text-xs text-white/40">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
