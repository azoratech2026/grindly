"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-24">
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 left-1/2 h-80 w-[80vw] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(79,178,255,0.22) 0%, rgba(155,59,255,0.16) 45%, rgba(155,59,255,0) 75%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="font-display text-4xl leading-none text-white sm:text-5xl">
          Get notified <span className="text-gradient">when we launch.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          Join the waitlist for early access, launch-day pricing, and first
          word when Grindly hits the shelves.
        </p>

        {status === "done" ? (
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full border border-grind-blue-bright/40 bg-grind-blue/10 px-6 py-3.5 text-sm font-heading font-semibold text-white">
            <CheckCircle2 className="h-4 w-4 text-grind-blue-bright" />
            You&apos;re on the list — see you at launch.
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-white/15 bg-black/40 px-5 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-grind-blue-bright"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grind-blue to-grind-purple px-6 py-3.5 font-heading text-sm font-bold text-white transition hover:scale-105 disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Notify Me <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-xs text-red-400">
            Something went wrong — try again.
          </p>
        )}
      </div>

      <div className="relative mx-auto mt-20 max-w-7xl px-5 pb-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <Logo markClassName="h-8 w-8" wordClassName="text-lg" />
          <p className="max-w-sm text-center text-xs text-white/40 sm:text-left">
            Grindly isn&apos;t just a supplement. It&apos;s a daily reminder to
            show up, put in the work, and keep grinding.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-[0.7rem] text-white/30">
          &copy; {new Date().getFullYear()} Grindly. All rights reserved. This
          statement has not been evaluated by the FDA. This product is not
          intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
