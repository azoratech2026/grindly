import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProductSpin } from "@/components/ProductSpin";
import { Marquee } from "@/components/Marquee";
import { Why } from "@/components/Why";
import { Ingredients } from "@/components/Ingredients";
import { HowToUse } from "@/components/HowToUse";
import { BuyBox } from "@/components/BuyBox";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <ProductSpin />
        <Marquee />
        <Why />
        <Ingredients />
        <HowToUse />
        <BuyBox />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
