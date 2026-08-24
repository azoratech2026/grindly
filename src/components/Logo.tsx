import Image from "next/image";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src="/images/grindly-mark.png"
        alt="Grindly"
        fill
        className="object-contain"
        priority
      />
    </span>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading font-bold italic tracking-tight ${className}`}>
      GRINDLY
    </span>
  );
}

export function Logo({
  className = "",
  markClassName = "h-9 w-9",
  wordClassName = "text-2xl",
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoMark className={markClassName} />
      <LogoWordmark className={wordClassName} />
    </div>
  );
}
