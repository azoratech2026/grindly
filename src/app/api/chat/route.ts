import { NextRequest } from "next/server";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

const SYSTEM_PROMPT = `You are the Grindly assistant — a helpful, friendly AI embedded on the Grindly website (mygrindly.vercel.app).

About Grindly:
- Product: Grindly Creatine Gummies, Blue Raspberry flavor, naturally flavored
- 5g creatine monohydrate per serving (2 gummies), 30 servings per pouch, net weight 210g (7.4oz)
- Sugar-free, gluten-free, lab-tested
- Benefits: performance, strength, recovery
- How to use: take 2 gummies daily, anytime, no mixing or water needed
- Pricing: $34.99 one-time, or Subscribe & Save for 15% off ($29.74), ships monthly, cancel anytime
- Free shipping over $50
- Ingredients: creatine monohydrate, isomalto-oligosaccharide, water, pectin, citric acid, natural flavor, sodium citrate, vegetable oil (coconut), carnauba wax, sucralose, FD&C Blue 1
- Tagline: "Chew the Grind" — Grindly isn't just a supplement, it's a daily reminder to show up, put in the work, and keep grinding
- The site currently runs a demo checkout (no real payment is processed yet)

You can also answer general knowledge questions on any topic — the user wants a genuinely helpful assistant, not just a narrow product bot. Be concise, warm, and conversational. Keep answers reasonably short unless the user asks for depth.

Your replies are shown as plain text in a chat bubble, not rendered markdown — never use **, #, bullet markers, or any other markdown syntax. Write in plain prose, using line breaks and dashes only where natural in normal writing.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Chat is not configured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const incoming: unknown = body?.messages;

  if (!Array.isArray(incoming)) {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages: ChatMessage[] = incoming
    .filter(
      (m): m is ChatMessage =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "No message provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const groqRes = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      temperature: 0.6,
    }),
  });

  if (!groqRes.ok || !groqRes.body) {
    const text = await groqRes.text().catch(() => "");
    return new Response(
      JSON.stringify({ error: "The chat service is unavailable right now.", detail: text }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = groqRes.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(payload);
              const delta: string | undefined = json?.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // ignore malformed chunk
            }
          }
        }
      } catch {
        // stream ended/aborted
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
