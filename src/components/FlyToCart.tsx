"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Flight = {
  id: number;
  from: { x: number; y: number; width: number; height: number };
  to: { x: number; y: number };
};

let flightId = 0;

export function useFlyToCart(onLand: () => void) {
  const [flights, setFlights] = useState<Flight[]>([]);

  const fly = useCallback((sourceEl: HTMLElement | null) => {
    const target = document.querySelector<HTMLElement>("[data-cart-icon]");
    if (!sourceEl || !target) {
      onLand();
      return;
    }
    const from = sourceEl.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const id = ++flightId;
    setFlights((f) => [
      ...f,
      {
        id,
        from: { x: from.left, y: from.top, width: from.width, height: from.height },
        to: { x: to.left + to.width / 2, y: to.top + to.height / 2 },
      },
    ]);
  }, [onLand]);

  const elements = (
    <AnimatePresence>
      {flights.map((flight) => (
        <motion.div
          key={flight.id}
          initial={{
            position: "fixed",
            left: flight.from.x,
            top: flight.from.y,
            width: flight.from.width,
            height: flight.from.height,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            left: flight.to.x - 18,
            top: flight.to.y - 18,
            width: 36,
            height: 36,
            opacity: 0.2,
            rotate: 20,
          }}
          transition={{ duration: 0.75, ease: [0.32, 0.72, 0.35, 1] }}
          onAnimationComplete={() => {
            setFlights((f) => f.filter((x) => x.id !== flight.id));
            onLand();
          }}
          className="pointer-events-none z-[100] overflow-hidden rounded-2xl ring-2 ring-white/30"
        >
          <Image
            src="/images/grindly-pouch-front.jpg"
            alt=""
            fill
            sizes="200px"
            className="object-cover"
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );

  return { fly, elements };
}
