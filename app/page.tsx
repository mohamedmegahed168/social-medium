import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Discover from "@/components/Discover";
import HowItWorks from "@/components/HowItWorks";
export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Discover />
      <HowItWorks />
    </div>
  );
}
