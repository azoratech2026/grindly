"use client";

import { motion } from "framer-motion";
import { Minus, Plus, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { ProductPouch } from "./ProductPouch";
import { useCart, unitPriceFor, formatCents, UNIT_PRICE_CENTS } from "@/store/cart";

export function BuyBox() {
  const { quantity, plan, setQuantity, setPlan, open, pulseAdded, addedPulse } =
    useCart();

  const unit = unitPriceFor(plan);
  const total = unit * quantity;
  const showCompare = plan === "subscribe";

  function addToCart() {
    pulseAdded();
    open();
  }

  return (
    <section id="buy" className="relative py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-grind-purple/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 scale-105 rounded-[3rem] bg-gradient-to-br from-grind-blue/25 to-grind-purple/25 blur-3xl" />
          <ProductPouch className="relative w-72 sm:w-80 md:w-96 animate-float" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-grind-panel p-8 sm:p-10"
        >
          <p className="font-heading text-sm font-bold tracking-[0.3em] text-grind-blue-bright">
            GRINDLY CREATINE GUMMIES
          </p>
          <h2 className="mt-2 font-display text-4xl text-white">
            Blue Raspberry
          </h2>
          <p className="mt-1 text-sm text-white/50">
            30 servings &middot; 5g creatine monohydrate per serving &middot; 210g
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl text-white">
              {formatCents(unit)}
            </span>
            {showCompare && (
              <span className="text-sm text-white/40 line-through">
                {formatCents(UNIT_PRICE_CENTS)}
              </span>
            )}
            <span className="text-xs text-white/40">/ pack</span>
          </div>

          {/* plan selector */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => setPlan("subscribe")}
              className={`relative overflow-hidden rounded-2xl border p-4 text-left transition ${
                plan === "subscribe"
                  ? "border-grind-blue-bright bg-gradient-to-br from-grind-blue/15 to-grind-purple/15"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-grind-blue to-grind-purple px-2 py-0.5 text-[0.6rem] font-heading font-bold text-white">
                SAVE 15%
              </span>
              <p className="font-heading font-bold text-white">Subscribe &amp; Save</p>
              <p className="mt-1 text-xs text-white/50">
                Ships monthly. Cancel anytime.
              </p>
            </button>
            <button
              onClick={() => setPlan("one-time")}
              className={`rounded-2xl border p-4 text-left transition ${
                plan === "one-time"
                  ? "border-grind-blue-bright bg-gradient-to-br from-grind-blue/15 to-grind-purple/15"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <p className="font-heading font-bold text-white">One-Time Purchase</p>
              <p className="mt-1 text-xs text-white/50">No commitment.</p>
            </button>
          </div>

          {/* quantity */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm font-heading font-semibold text-white/70">
              Quantity
            </span>
            <div className="flex items-center gap-4 rounded-full border border-white/15 px-2 py-1.5">
              <button
                onClick={() => setQuantity(quantity - 1)}
                className="grid h-7 w-7 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-4 text-center font-heading font-bold text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="grid h-7 w-7 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            className="group relative mt-8 w-full overflow-hidden rounded-full bg-gradient-to-r from-grind-blue to-grind-purple py-4 font-heading text-base font-bold text-white shadow-xl shadow-grind-purple/25 transition hover:scale-[1.02]"
          >
            <motion.span
              key={addedPulse ? "added" : "idle"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              {addedPulse ? "Added to cart ✓" : `Add to Cart — ${formatCents(total)}`}
            </motion.span>
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-0" />
          </button>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/45">
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5" /> Free shipping over $50
            </span>
            <span className="flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Cancel or pause anytime
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Lab-tested purity
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
