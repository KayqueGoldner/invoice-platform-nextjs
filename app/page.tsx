import { Hero } from "@/app/components/hero";
import { Navbar } from "@/app/components/navbar";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
    </main>
  );
}
