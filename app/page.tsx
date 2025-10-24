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
export default function Home() {
  return (
    <HexagonBackground>
      <FloatingHeader />
      
      <Landing />
      <AboutSection />
      <EventsSection />
      {/* Gallery Section */}
      <section id="gallery" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
            Gallery
          </h2>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-lg p-12 text-center">
            <p className="text-xl text-neutral-600">
              Photo gallery will be displayed here
            </p>
          </div>
        </div>
      </section>
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