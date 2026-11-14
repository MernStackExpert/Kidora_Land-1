import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Features from "@/components/Features";
import Package from "@/components/Package";
import Checkout from "@/components/Checkout";

export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-slate-50 pt-28">
      <Navbar />
      <Hero />
      <PainPoints />
      <Features />
      <Package />
      <Checkout />
    </main>
  );
}
