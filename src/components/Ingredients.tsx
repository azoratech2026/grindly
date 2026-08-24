"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PawPrint, Package, Droplets, Target } from "lucide-react";

const HIGHLIGHTS = [
  { icon: PawPrint, title: "Delicious Gummy", body: "A real gummy you'll crave, not choke down." },
  { icon: Package, title: "5g Creatine", body: "The clinically-backed daily dose, per serving." },
  { icon: Droplets, title: "No Mixing, No Mess", body: "Skip the shaker. Chew two, anywhere." },
  { icon: Target, title: "Built For Results", body: "Consistent daily creatine, the way you'll stick with." },
];

export function Ingredients() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="ingredients" ref={sectionRef} className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: blobY }}
          className="absolute right-0 top-1/2 h-[50vh] w-[50vh] -translate-y-1/2 rounded-full bg-grind-blue/15 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        {/* facts panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
            INSIDE THE GUMMY
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">
            Supplement facts,
            <br />
            <span className="text-gradient">no fine-print games.</span>
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-white/10 bg-grind-panel p-5"
              >
                <h.icon className="h-5 w-5 text-grind-blue-bright" />
                <p className="mt-3 font-heading text-sm font-bold text-white">
                  {h.title}
                </p>
                <p className="mt-1 text-xs text-white/50">{h.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/15 bg-black/40 p-6">
            <p className="font-heading text-sm font-bold tracking-wide text-white">
              SUPPLEMENT FACTS
            </p>
            <div className="mt-2 flex justify-between border-b border-white/15 pb-2 text-xs text-white/50">
              <span>Serving Size: 2 Gummies (7g)</span>
              <span>30 Servings</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-white/80">Creatine Monohydrate</span>
              <span className="font-heading font-bold text-grind-blue-bright">5g</span>
            </div>
            <p className="mt-4 text-[0.65rem] leading-relaxed text-white/35">
              Other ingredients: Isomalto-oligosaccharide, Water, Pectin, Citric
              Acid, Natural Flavor, Sodium Citrate, Vegetable Oil (Coconut),
              Carnauba Wax, Sucralose, FD&amp;C Blue 1.
            </p>
          </div>
        </motion.div>

        {/* gummy photo visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-grind-blue/25 to-grind-purple/25 blur-3xl" />
          <div className="relative grid h-full place-items-center">
            <div className="relative h-[62%] w-[62%] -rotate-6 animate-float overflow-hidden rounded-[2rem] ring-2 ring-white/15 drop-shadow-2xl">
              <Image
                src="/images/gummy-chip-1.jpg"
                alt="Grindly blue raspberry gummies"
                fill
                sizes="(max-width: 640px) 60vw, 300px"
                className="object-cover"
              />
            </div>
            <div
              className="absolute bottom-[8%] right-[6%] h-[42%] w-[42%] rotate-6 animate-float overflow-hidden rounded-[1.75rem] ring-2 ring-white/15 drop-shadow-2xl"
              style={{ animationDelay: "0.9s" }}
            >
              <Image
                src="/images/gummy-chip-2.jpg"
                alt="Grindly gummies close up"
                fill
                sizes="(max-width: 640px) 40vw, 200px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
