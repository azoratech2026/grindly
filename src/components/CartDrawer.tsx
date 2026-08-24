"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, CheckCircle2, Loader2 } from "lucide-react";
import { useCart, unitPriceFor, formatCents } from "@/store/cart";
import { ProductPouch } from "./ProductPouch";

export function CartDrawer() {
  const { isOpen, close, quantity, plan, flavor, setQuantity } = useCart();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const unit = unitPriceFor(plan);
  const total = unit * quantity;

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          flavor,
          quantity,
          plan,
          totalCents: total,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-white/10 bg-grind-black-soft"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <span className="flex items-center gap-2 font-heading font-bold text-white">
                <ShoppingBag className="h-4 w-4 text-grind-blue-bright" />
                Your Grind
              </span>
              <button
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {status === "done" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-grind-blue-bright" />
                <h3 className="font-heading text-xl font-bold text-white">
                  This is a demo checkout
                </h3>
                <p className="text-sm text-white/50">
                  We saved your interest — real payments aren&apos;t live yet, but
                  we&apos;ll email <span className="text-white">{email}</span> the
                  moment Grindly officially launches.
                </p>
                <button
                  onClick={close}
                  className="mt-4 rounded-full border border-white/20 px-6 py-2.5 text-sm font-heading font-semibold text-white/80 hover:border-white/40"
                >
                  Keep Browsing
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-4 border-b border-white/10 px-6 py-6">
                  <ProductPouch className="w-24 shrink-0" />
                  <div className="flex-1">
                    <p className="font-heading font-bold text-white">
                      Grindly Creatine Gummies
                    </p>
                    <p className="text-xs text-white/45">Blue Raspberry</p>
                    <p className="mt-1 text-xs text-white/45">
                      {plan === "subscribe" ? "Subscribe & Save" : "One-Time"}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-white/15 px-2 py-1">
                        <button
                          onClick={() => setQuantity(quantity - 1)}
                          className="h-6 w-6 rounded-full text-white/70 hover:bg-white/10"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-6 w-6 rounded-full text-white/70 hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-heading font-bold text-white">
                        {formatCents(unit * quantity)}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={submitOrder} className="flex flex-1 flex-col px-6 py-6">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>{formatCents(total)}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm text-white/60">
                    <span>Shipping</span>
                    <span>{total >= 5000 ? "Free" : formatCents(599)}</span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-white/10 pt-3 font-heading text-base font-bold text-white">
                    <span>Total</span>
                    <span>
                      {formatCents(total + (total >= 5000 ? 0 : 599))}
                    </span>
                  </div>

                  <label className="mt-6 block text-xs font-heading font-semibold tracking-wide text-white/60">
                    EMAIL FOR ORDER CONFIRMATION
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-grind-blue-bright"
                  />
                  {status === "error" && (
                    <p className="mt-2 text-xs text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grind-blue to-grind-purple py-3.5 font-heading font-bold text-white transition hover:scale-[1.02] disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      `Checkout — ${formatCents(total + (total >= 5000 ? 0 : 599))}`
                    )}
                  </button>
                  <p className="mt-3 text-center text-[0.65rem] text-white/35">
                    Demo checkout — no payment is processed.
                  </p>
                </form>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
