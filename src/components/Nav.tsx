"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/store/cart";

const LINKS = [
  { label: "Why Grindly", href: "#why" },
  { label: "Inside The Gummy", href: "#ingredients" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const open = useCart((s) => s.open);
  const addedPulse = useCart((s) => s.addedPulse);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-grind-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top">
          <Logo markClassName="h-8 w-8" wordClassName="text-lg" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-heading font-semibold tracking-wide text-white/70 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#buy"
            className="hidden rounded-full bg-gradient-to-r from-grind-blue to-grind-purple px-5 py-2 text-sm font-heading font-bold text-white shadow-lg shadow-grind-purple/20 transition hover:scale-105 sm:block"
          >
            Shop Now
          </a>
          <motion.button
            data-cart-icon
            onClick={open}
            aria-label="Open cart"
            animate={addedPulse ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
          </motion.button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-col gap-1 border-t border-white/10 bg-grind-black/95 px-5 py-4 md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-heading font-semibold text-white/80 hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#buy"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-gradient-to-r from-grind-blue to-grind-purple px-5 py-3 text-center text-sm font-heading font-bold text-white"
          >
            Shop Now
          </a>
        </motion.nav>
      )}
    </motion.header>
  );
}
