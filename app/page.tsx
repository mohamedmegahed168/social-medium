import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Discover from "@/components/Discover";
import HowItWorks from "@/components/HowItWorks";
import GettingStarted from "@/components/GettingStarted";
import CallToAction from "@/components/HeroCta";
import HeroFooter from "@/components/HeroFooter";
import AboutPage from "@/components/OurStory";
export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Discover />
      <HowItWorks />
      <GettingStarted />
      <CallToAction />
      <AboutPage />
      <HeroFooter />
    </div>
  );
}
