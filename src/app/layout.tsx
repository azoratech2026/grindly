import type { Metadata } from "next";
import { Rajdhani, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const heading = Rajdhani({
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRINDLY | Creatine Gummies — Chew The Grind",
  description:
    "5g creatine monohydrate per serving. Sugar-free, gluten-free, lab-tested gummies built for performance, strength, and recovery. Fuel your grind.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grind-black text-white font-body">
        {children}
      </body>
    </html>
  );
}
