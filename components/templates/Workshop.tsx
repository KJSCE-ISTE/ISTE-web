'use client';

import { useState, useEffect } from 'react';

interface Speaker {
  name: string;
  image: string;
  bio: string;
  socialLink: string;
}

interface WorkshopProps {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  venue?: string;
  registerLink?: string;
  workshopDetails?: string;
  prizes?: string[];
  speakers?: Speaker[];
  sponsors?: { name: string; logo: string; link: string }[];
}

export default function Workshop({
  title = "Click.Drag.Create",
  date = "January 25•2025",
  time = "4:30 PM Onwards",
  venue = "B113",
  registerLink = "#register",

  speakers = [
    {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Senior Frontend Developer at Tech Corp with 8+ years of experience in React and TypeScript. Open source contributor and tech speaker.",
      socialLink: "https://linkedin.com"
    },
    {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Full Stack Engineer and UI/UX enthusiast. Creator of popular design systems and passionate about building accessible web applications.",
      socialLink: "https://twitter.com"
    },
    {
      name: "Emily Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Lead Developer and instructor with expertise in modern JavaScript frameworks. Regular contributor to tech blogs and conference speaker.",
      socialLink: "https://github.com"
    }
  ],
  sponsors = [
    {
      name: "Google",
      logo: "/googleimage.png", // if image is in public/image.png
      link: "https://example.com"
    },
    {
      name: "DevTools Inc",
      logo: "https://via.placeholder.com/200x80/1e40af/ffffff?text=DevTools",
      link: "https://example.com"
    },
    {
      name: "Cloud Solutions",
      logo: "https://via.placeholder.com/200x80/1e3a8a/ffffff?text=CloudSolutions",
      link: "https://example.com"
    },
    {
      name: "StartupHub",
      logo: "https://via.placeholder.com/200x80/1e40af/ffffff?text=StartupHub",
      link: "https://example.com"
    }
  ]
}: WorkshopProps) {
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [currentSponsor, setCurrentSponsor] = useState(0);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [areCardsVisible, setAreCardsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeaker((prev) => (prev + 1) % speakers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [speakers.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsor((prev) => (prev + 1) % sponsors.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [sponsors.length]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200) {
        setIsDetailsVisible(true);
      } else {
        setIsDetailsVisible(false);
      }
      if (currentScrollY > 800) {
        setAreCardsVisible(true);
      } else {
        setAreCardsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#e8e8e8] text-black relative overflow-hidden">
      {/* Registration Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-full md:w-[700px] bg-black transform transition-transform duration-500 ease-in-out ${isRegistrationOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="h-full overflow-y-auto p-10 md:p-12">
          {/* Close Button */}
          <button
            onClick={() => setIsRegistrationOpen(false)}
            className="absolute top-8 right-8 text-white hover:text-[#c8ff00] transition-colors"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Registration Form */}
          <div className="mt-0">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              Workshop Registration
            </h2>
            <p className="text-gray-400 text-xl mb-10">Join us for Click.Drag.Create</p>

            <form className="space-y-8">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-3 text-lg">First Name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-5 py-4 text-lg bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#c8ff00] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white font-bold mb-3 text-lg">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-5 py-4 text-lg bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#c8ff00] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white font-bold mb-3 text-lg">Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@somaiya.edu"
                  className="w-full px-5 py-4 text-lg bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#c8ff00] focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white font-bold mb-3 text-lg">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-5 py-4 text-lg bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#c8ff00] focus:outline-none transition-colors"
                />
              </div>

              {/* Academic Year & Branch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-3 text-lg">Academic Year</label>
                  <select className="w-full px-5 py-4 text-lg bg-transparent border-2 border-gray-700 rounded-xl text-white focus:border-[#c8ff00] focus:outline-none transition-colors">
                    <option value="" className="bg-black">Select Year</option>
                    <option value="1" className="bg-black">First Year</option>
                    <option value="2" className="bg-black">Second Year</option>
                    <option value="3" className="bg-black">Third Year</option>
                    <option value="4" className="bg-black">Fourth Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-bold mb-3 text-lg">Branch/Stream</label>
                  <select className="w-full px-5 py-4 text-lg bg-transparent border-2 border-gray-700 rounded-xl text-white focus:border-[#c8ff00] focus:outline-none transition-colors">
                    <option value="" className="bg-black">Select Branch</option>
                    <option value="cse" className="bg-black">Computer Science</option>
                    <option value="it" className="bg-black">Information Technology</option>
                    <option value="ece" className="bg-black">Electronics</option>
                    <option value="mech" className="bg-black">Mechanical</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-5 bg-white text-black font-bold text-xl rounded-xl hover:bg-[#c8ff00] transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
              >
                Register Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isRegistrationOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsRegistrationOpen(false)}
        />
      )}

      {/* Section 1: Header */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pb-12">
        {/* Grid background pattern - Only in Section 1 */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="container mx-auto px-6 py-1 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Title */}
            <h1 className="mb-8 leading-none">
              <div className="text-[#0066ff] font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter mb-4" style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textShadow: '4px 4px 0px rgba(0,0,0,0.1)'
              }}>
                {title.split(' ').slice(0).join(' ')}
              </div>
            </h1>

            {/* Description with highlight */}
            <div className="text-2xl md:text-3xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              <p className="inline">A hands-on </p>
              <span className="inline-block bg-[#d4ff00] px-3 py-1 font-semibold text-black transform -rotate-2 shadow-lg">
                Figma Workshop
              </span>
              <p className="inline"> to introduce students to UI/UX design through real-world applications.</p>
            </div>

            {/* Register Button - Updated */}
            <button
              onClick={() => setIsRegistrationOpen(true)}
              className="group inline-flex items-center gap-3 px-4 py-2.5 bg-black text-white text-2xl font-bold rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-106 cursor-pointer"
            >
              <span>Register Now</span>
              <div className="w-12 h-12 bg-[#d4ff00] rounded-full flex items-center justify-center transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-black transition-transform duration-300 rotate-45 group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </button>

            {/* Date, Time, Venue Badges - Now Below Button */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="inline-block px-8 py-3 bg-white rounded-full shadow-lg border-2 border-gray-200">
                <span className="text-black-700 font-medium text-base md:text-lg tracking-wide">
                  {date}
                </span>
              </div>
              <div className="inline-block px-8 py-3 bg-white rounded-full shadow-lg border-2 border-gray-200">
                <span className="text-black-700 font-medium text-base md:text-lg tracking-wide">
                  {time}
                </span>
              </div>
              <div className="inline-block px-8 py-3 bg-white rounded-full shadow-lg border-2 border-gray-200">
                <span className="text-black-700 font-medium text-base md:text-lg tracking-wide">
                  {venue}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Content - Split Layout */}
      <section className="relative z-10 container mx-auto px-6 py-12 md:py-10 bg-[#e8e8e8]">

        {/* Workshop Details - Full Width */}
        <div className={`mb-16 transition-all duration-700 ${isDetailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black leading-none text-gray-900 mb-6 transition-all duration-700 delay-100 ${isDetailsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
            MORE THAN A <span className="text-[#0066ff] italic">workshop</span>
          </h2>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-gray-900 transition-all duration-700 delay-200 ${isDetailsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
            Click.Drag.Create is a{' '}
            <span className="font-black">digital renaissance</span>. We are crafting a sanctuary where the boundaries between{' '}
            <span className="inline-block bg-[#c8ff00] px-2 py-1 transform -rotate-1">code</span>
            {' '},<span className="text-[#0066ff] italic">art</span>, and{' '}
            <span className="font-black">innovation</span> dissolve. For 36 hours, we invite the{' '}
            <span className="font-black">dreamers</span> and the{' '}
            <span className="font-black">disruptors</span> to step into a realm where every line of code{' '}
            <span className="inline-block bg-black text-[#c8ff00] px-3 py-1 italic font-bold">paints a future</span>. This is where your keyboard becomes your brush, and the screen your canvas.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side: Prizes & Sponsors */}
          <div className={`space-y-8 transition-all duration-700 delay-100 ${areCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            {/* Prizes */}
            <div className="group relative bg-[#c8ff00] rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="mb-2">
                <span className="inline-block px-4 py-1 bg-black text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Prizes
                </span>
              </div>
              {/* For prize money and top 3 winners */}
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-2">
                ₹1Lakh
              </h2>
              <p className="text-gray-700 italic text-lg mb-8">Total Prize Pool</p>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-black text-gray-900">50k</div>
                  <div className="text-sm font-bold text-gray-700 uppercase">Champion</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">30k</div>
                  <div className="text-sm font-bold text-gray-700 uppercase">Runner Up</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">20k</div>
                  <div className="text-sm font-bold text-gray-700 uppercase">2nd Runner</div>
                </div>
              </div>

              {/* For goodies and swags*/}
              {/* <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-2">
                Win official Figma Swags!!
              </h2> */}
            </div>

            {/* Sponsors Carousel */}
            <div className="relative bg-black rounded-3xl p-10 shadow-xl">
              <div className="mb-2">
                <span className="inline-block px-4 py-1 bg-[#c8ff00] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                  Supported By
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
                Our Sponsors
              </h2>

              <div className="relative h-[200px] overflow-hidden rounded-2xl mb-8">
                {sponsors.map((sponsor, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ${idx === currentSponsor
                      ? 'opacity-100 translate-x-0'
                      : idx < currentSponsor
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <a
                        href={sponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/sponsor"
                      >
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-w-full max-h-40 w-auto h-auto object-contain group-hover/sponsor:scale-110 transition-all duration-300 border-2 border-[#c8ff00] rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-black"
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2">
                {sponsors.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSponsor(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentSponsor
                      ? 'bg-[#c8ff00] w-8'
                      : 'bg-gray-600 w-2 hover:bg-gray-500'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Speakers Carousel */}
          <div className={`relative bg-[#0066ff] rounded-3xl p-10 shadow-xl transition-all duration-700 delay-300 ${areCardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
            <div className="mb-2">
              <span className="inline-block px-4 py-1 bg-white text-[#0066ff] text-xs font-bold rounded-full uppercase tracking-wider">
                Guided by
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Experts
            </h2>

            <div className="relative min-h-[500px] overflow-hidden rounded-2xl">
              {speakers.map((speaker, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ${idx === currentSpeaker
                    ? 'opacity-100 translate-x-0'
                    : idx < currentSpeaker
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                    }`}
                >
                  <div className="flex flex-col items-center h-full justify-center">
                    <div className="relative w-56 h-56 mb-8">
                      <div className="w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <h3 className="text-3xl font-black mb-3 text-white">
                      {speaker.name}
                    </h3>

                    <p className="text-white/80 text-center mb-8 leading-relaxed px-6 text-base">
                      {speaker.bio}
                    </p>

                    <a
                      href={speaker.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 bg-white text-[#0066ff] font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm uppercase tracking-wider"
                    >
                      Connect
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {speakers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSpeaker(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentSpeaker
                    ? 'bg-white w-8'
                    : 'bg-white/30 w-2 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
