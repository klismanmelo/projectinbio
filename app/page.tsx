import Image from "next/image";
import Hero from "./components/landing-page/hero";
import Header from "./components/landing-page/header";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto border">
      <Header />
      <Hero />
     {/*
     
     <VideExplaing />
     <Pricing />
     <FAQ />*/ }
    </div>
  );
}