import Image from "next/image";
import Hero from "./components/landing-page/hero";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto border">
      <Hero />
     {/*<Header />
     
     <VideExplaing />
     <Pricing />
     <FAQ />*/ }
    </div>
  );
}