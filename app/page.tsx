import { HexagonBackground } from "@/components/ui/HexagonBackground";
import { FloatingHeader } from "@/components/ui/FloatingHeader";
import { OrbitingCircles } from "@/components/ui/OrbitingCircles";
import { File, Search, Settings, Code, Cpu, Users, Lightbulb, Rocket, Globe } from "lucide-react";
import AboutSection from "@/components/ui/AboutSection";
import Landing from "@/components/ui/LandingPage";
import EventsSection from "@/components/ui/EventsSection";
import TeamSection from "@/components/ui/TeamSection";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";
import Gallery from "@/components/ui/GalleryComponent";

export default function Home() {
  return (
    <HexagonBackground>
      <FloatingHeader />
      <Landing />
      <AboutSection />
      <EventsSection />
      <Gallery />
      <TeamSection />
      <Footer />
    </HexagonBackground>
  );
}