import { Code, Cpu, Lightbulb, Users, Rocket, Globe } from "lucide-react";
import { OrbitingCircles } from "./OrbitingCircles";

export default function AboutSection() {
  return (
    <section id="about" className=" relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20 pointer-events-none">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-16 bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
          Who We Are
        </h2>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Single Paragraph */}
          <div>
            <h3 className="text-xl md:text-2xl leading-relaxed text-neutral-700">The <span className="font-bold text-black">Indian Society for Technical Education (ISTE)</span> is the leading National Professional non-profit making Society for the Technical Education System in our country with the motto of <span className="font-bold text-black">Career Development of Teachers and Personality Development of Students</span> and overall development of our Technical Education System. The <span className="font-bold text-black">ISTE KJSSE Students' Chapter (MH 60)</span> was established in the year <span className="font-bold text-black">2000 - 2001</span>. One of the major object of ISTE is to assist and to contribute the production and development of <span className="font-bold text-black">top quality professional engineers and technicians</span> needed by the industries and other organizations.
            </h3>
          </div>

          {/* Right: Visual Component */}
          <div className="flex justify-center items-center">
            <div className="relative h-[500px] w-full overflow-hidden flex justify-center items-center">
              <OrbitingCircles radius={120}>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 text-white shadow-lg hover:shadow-2xl transition-shadow">
                  <Code size={32} />
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-4 text-white shadow-lg hover:shadow-2xl transition-shadow">
                  <Cpu size={32} />
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-4 text-white shadow-lg hover:shadow-2xl transition-shadow">
                  <Lightbulb size={32} />
                </div>
              </OrbitingCircles>
              <OrbitingCircles radius={200} reverse>
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full p-4 text-white shadow-lg hover:shadow-2xl transition-shadow">
                  <Users size={32} />
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full p-4 text-white shadow-lg hover:shadow-2xl transition-shadow">
                  <Rocket size={32} />
                </div>
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-full p-4 text-white shadow-lg hover:shadow-2xl transition-shadow">
                  <Globe size={32} />
                </div>
              </OrbitingCircles>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}