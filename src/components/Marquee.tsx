const ITEMS = [
  "CHEW THE GRIND",
  "5G CREATINE MONOHYDRATE",
  "ZERO SUGAR",
  "LAB TESTED",
  "NO MIXING, NO MESS",
  "FUEL YOUR GRIND",
];

export function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-grind-blue/10 via-transparent to-grind-purple/10 py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-heading text-sm font-bold tracking-[0.2em] text-white/50"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-grind-blue-bright to-grind-purple" />
          </span>
        ))}
      </div>
    </div>
  );
}
