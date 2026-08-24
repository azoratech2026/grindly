import Image from "next/image";

const SRC = {
  front: "/images/grindly-pouch-front.jpg",
  back: "/images/grindly-pouch-back.jpg",
} as const;

export function ProductPouch({
  className = "",
  face = "front",
}: {
  className?: string;
  flavor?: string;
  face?: "front" | "back";
}) {
  return (
    <div
      className={`relative aspect-[684/1028] overflow-hidden rounded-[2rem] ring-1 ring-white/10 ${className}`}
    >
      <Image
        src={SRC[face]}
        alt={`Grindly Creatine Gummies — Blue Raspberry pouch (${face})`}
        fill
        sizes="(max-width: 640px) 90vw, 400px"
        className="object-cover"
        priority
      />
    </div>
  );
}
