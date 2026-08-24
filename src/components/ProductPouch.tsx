import Image from "next/image";

export function ProductPouch({
  className = "",
}: {
  className?: string;
  flavor?: string;
}) {
  return (
    <div
      className={`relative aspect-[684/1028] overflow-hidden rounded-[2rem] ring-1 ring-white/10 ${className}`}
    >
      <Image
        src="/images/grindly-pouch-front.jpg"
        alt="Grindly Creatine Gummies — Blue Raspberry pouch"
        fill
        sizes="(max-width: 640px) 90vw, 400px"
        className="object-cover"
        priority
      />
    </div>
  );
}
