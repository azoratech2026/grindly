"use client";

import { motion } from "framer-motion";

export function VideoSpin() {
  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-grind-purple/15 to-grind-blue/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
            EVERY ANGLE
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">
            See the full <span className="text-gradient">360.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mt-12 aspect-video max-w-2xl overflow-hidden rounded-[2rem] ring-1 ring-white/10"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-grind-blue/30 to-grind-purple/30 blur-2xl" />
          <video
            src="/videos/product-spin.mp4"
            poster="/videos/product-spin-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
