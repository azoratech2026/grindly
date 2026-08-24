"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { LogoMark } from "./Logo";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Hey, I'm the Grindly assistant. Ask me about the gummies, ingredients, shipping — or honestly, anything else.",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;

    setError("");
    setInput("");
    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Chat is unavailable right now.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const finalAcc = acc;
        setMessages((cur) => {
          const copy = [...cur];
          copy[copy.length - 1] = { role: "assistant", content: finalAcc };
          return copy;
        });
      }

      if (!acc) {
        setMessages((cur) => {
          const copy = [...cur];
          copy[copy.length - 1] = {
            role: "assistant",
            content: "Sorry, I didn't catch that — try again?",
          };
          return copy;
        });
      }
    } catch {
      setError("Something went wrong. Try again in a moment.");
      setMessages((cur) => cur.slice(0, -1));
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-[90] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-grind-blue to-grind-purple shadow-xl shadow-grind-purple/30"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-24 right-6 z-[90] flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-grind-black-soft shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-5 py-4">
              <LogoMark className="h-7 w-7" />
              <div>
                <p className="font-heading text-sm font-bold text-white">
                  Grindly Assistant
                </p>
                <p className="text-[0.7rem] text-white/40">Ask me anything</p>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-grind-blue to-grind-purple text-white"
                        : "bg-white/[0.06] text-white/85"
                    }`}
                  >
                    {m.content || (
                      <span className="flex items-center gap-1 py-0.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
                        <span
                          className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50"
                          style={{ animationDelay: "0.15s" }}
                        />
                        <span
                          className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {error && <p className="text-center text-xs text-red-400">{error}</p>}
            </div>

            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isStreaming}
                className="flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-grind-blue-bright disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-grind-blue to-grind-purple text-white transition disabled:opacity-40"
              >
                {isStreaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
