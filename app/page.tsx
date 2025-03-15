import Hero from "./components/landing-page/hero";
import Header from "./components/landing-page/header";
import VideoExplanation from "./components/landing-page/vide-explanation";
import Pricing from "./components/landing-page/pricing";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto border">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
     {/*
     
     
     <FAQ />*/ }
    </div>
  );
}