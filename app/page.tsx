import { HexagonBackground } from "@/components/ui/hexagon-background";
import { FloatingHeader } from "@/components/ui/floating-header";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { File, Search, Settings, Code, Cpu, Users, Lightbulb, Rocket, Globe } from "lucide-react";
import AboutSection from "@/components/ui/AboutSection";
import Landing from "@/components/ui/landing";
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

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex flex-col items-center  px-4 py-20">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
        <ContactSection/>
        </div>
       
      </section>
       <Footer/>
    </HexagonBackground>
  );
}