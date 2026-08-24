import { create } from "zustand";

export const UNIT_PRICE_CENTS = 3499;
export const SUBSCRIBE_DISCOUNT = 0.15;

export type Flavor = "blue-raspberry";

type CartState = {
  isOpen: boolean;
  quantity: number;
  plan: "one-time" | "subscribe";
  flavor: Flavor;
  open: () => void;
  close: () => void;
  setQuantity: (q: number) => void;
  setPlan: (p: "one-time" | "subscribe") => void;
  addedPulse: boolean;
  pulseAdded: () => void;
};

export const useCart = create<CartState>((set) => ({
  isOpen: false,
  quantity: 1,
  plan: "subscribe",
  flavor: "blue-raspberry",
  addedPulse: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setQuantity: (q) => set({ quantity: Math.min(10, Math.max(1, q)) }),
  setPlan: (p) => set({ plan: p }),
  pulseAdded: () =>
    set((s) => {
      if (s.addedPulse) return s;
      setTimeout(() => useCart.setState({ addedPulse: false }), 1200);
      return { addedPulse: true };
    }),
}));

export function unitPriceFor(plan: "one-time" | "subscribe") {
  return plan === "subscribe"
    ? Math.round(UNIT_PRICE_CENTS * (1 - SUBSCRIBE_DISCOUNT))
    : UNIT_PRICE_CENTS;
}

export function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
