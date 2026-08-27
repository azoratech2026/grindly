"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How much creatine is in each serving?",
    a: "Each serving (2 gummies) delivers 5g of creatine monohydrate — the clinically studied daily dose used in most performance research.",
  },
  {
    q: "When should I take Grindly?",
    a: "Anytime. Creatine works through daily saturation, not timing — so pick a time you'll actually stick to, pre or post workout, or with breakfast.",
  },
  {
    q: "Is it sugar-free and gluten-free?",
    a: "Yes — Grindly gummies are sugar-free, gluten-free, and third-party lab-tested for purity.",
  },
  {
    q: "How long until I see results?",
    a: "Most people notice improved strength and recovery within 2–4 weeks of consistent daily use as creatine stores saturate.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yep. Subscriptions can be paused, changed, or cancelled anytime from your account — no fees, no phone calls.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white sm:text-5xl">
            Questions? <span className="text-gradient">Answered.</span>
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-white/10 bg-grind-panel"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-heading font-semibold text-white">
                    {item.q}
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-grind-blue-bright transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/55">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
