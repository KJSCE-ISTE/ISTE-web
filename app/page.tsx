import { HexagonBackground } from "@/components/ui/hexagon-background";
import { FloatingHeader } from "@/components/ui/floating-header";

export default function Home() {
  return (
    <HexagonBackground>
      <FloatingHeader />
      
      {/* Home Section */}
      <section id="home" className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent leading-[1.2]">
            ISTE KJSSE
          </h1>
          <p className="text-2xl md:text-3xl text-neutral-700">
            Serving Technology Better
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
            About Us
          </h2>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-lg p-12 text-center">
            <p className="text-xl text-neutral-600">
              About us information will be displayed here
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
            Events
          </h2>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-lg p-12 text-center">
            <p className="text-xl text-neutral-600">
              Upcoming events will be displayed here
            </p>
          </div>
        </div>
      </section>

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

      {/* Team Section */}
      <section id="team" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
            Team
          </h2>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-lg p-12 text-center">
            <p className="text-xl text-neutral-600">
              Team members will be displayed here
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/50 shadow-lg p-12 text-center">
            <p className="text-xl text-neutral-600">
              Contact information will be displayed here
            </p>
          </div>
        </div>
      </section>
    </HexagonBackground>
  );
}
