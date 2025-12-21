"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronDown, Plus, ChevronLeft } from 'lucide-react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('adventure');
  const [showForm, setShowForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMemory, setCurrentMemory] = useState(0);

  const activities = {
    adventure: {
      description: 'Visit cutting-edge industrial facilities and technology centers. Explore state-of-the-art manufacturing plants, R&D centers, and innovation hubs where the future is being built today.',
      items: [
        {
          title: 'FERRARI SIMULATOR',
          image: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/manual/Misc/2021manual/2021AustrianManualadds/20132-scuderia-ferrari-new-f1-simulator.webp',
          link: 'EXPLORE'
        },
        {
          title: 'MERCEDES-BENZ USA',
          image: 'https://static2.gensler.com/uploads/image/68501/MBUSA%20-%2001_1542292216.jpg',
          link: 'DISCOVER'
        },
        {
          title: 'APPLE HEADQUARTERS',
          image: 'https://static01.nyt.com/images/2019/05/31/us/31applehq-01alt/31applehq-01alt-superJumbo.jpg',
          link: 'BOOK NOW'
        },
        {
          title: 'MICROSOFT HEADQUARTERS',
          image: 'https://npr.brightspotcdn.com/legacy/sites/kplu/files/202103/AP21081598245861.jpg',
          link: 'EXPLORE'
        }
      ]
    },
    wellness: {
      description: 'Rejuvenate your mind, body, and soul with our comprehensive wellness programs.',
      items: [
        {
          title: 'SPA & MASSAGE',
          image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
          link: 'RELAX'
        },
        {
          title: 'YOGA & MEDITATION',
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
          link: 'JOIN US'
        },
        {
          title: 'THERMAL BATHS',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
          link: 'IMMERSE'
        },
        {
          title: 'FITNESS CENTER',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
          link: 'TRAIN'
        }
      ]
    },
    dining: {
      description: 'Indulge in exquisite culinary experiences crafted by world-renowned chefs.',
      items: [
        {
          title: 'FINE DINING',
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
          link: 'RESERVE'
        },
        {
          title: 'ALPINE CUISINE',
          image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
          link: 'SAVOR'
        },
        {
          title: 'WINE CELLAR',
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
          link: 'TASTE'
        },
        {
          title: 'CHEF\'S TABLE',
          image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
          link: 'EXPERIENCE'
        }
      ]
    },
    transport: {
      description: 'Travel in comfort and style with our premium transportation services.',
      items: [
        {
          title: 'PRIVATE TRANSFERS',
          image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
          link: 'ARRANGE'
        },
        {
          title: 'HELICOPTER SERVICE',
          image: 'https://images.unsplash.com/photo-1517842901100-8bc8ca1c8e80?w=800&q=80',
          link: 'FLY'
        },
        {
          title: 'LIMOUSINE SERVICE',
          image: 'https://images.unsplash.com/photo-1549927681-0b673b8243a6?w=800&q=80',
          link: 'RIDE'
        },
        {
          title: 'AIRPORT PICKUP',
          image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80',
          link: 'SCHEDULE'
        }
      ]
    }
  };

  const memories = [
    { id: 1, image: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/manual/Misc/2021manual/2021AustrianManualadds/20132-scuderia-ferrari-new-f1-simulator.webp', caption: 'Ferrari Simulator', rotate: -5 },
    { id: 2, image: 'https://static2.gensler.com/uploads/image/68501/MBUSA%20-%2001_1542292216.jpg', caption: 'Mercedes-Benz USA', rotate: 3 },
    { id: 3, image: 'https://static01.nyt.com/images/2019/05/31/us/31applehq-01alt/31applehq-01alt-superJumbo.jpg', caption: 'Apple Headquarters', rotate: -3 },
    { id: 4, image: 'https://npr.brightspotcdn.com/legacy/sites/kplu/files/202103/AP21081598245861.jpg', caption: 'Microsoft Campus', rotate: 4 }
  ];

  // Auto-rotate memories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMemory((prev) => (prev + 1) % memories.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'adventure', label: 'ADVENTURE' },
    { id: 'wellness', label: 'WELLNESS' },
    { id: 'dining', label: 'DINING' },
    { id: 'transport', label: 'ARRIVAL & TRANSPORT' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div id="home" className="relative h-screen overflow-hidden bg-[#46B5D1]">
        {/* Navigation */}
        <nav className="relative z-50 px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center gap-2 md:gap-3 cursor-pointer"
            >
              <img src="/iste-logo.png" alt="ISTE Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              <h1 className="text-2xl md:text-4xl font-bold text-white">ISTE KJSCE</h1>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/20 rounded-lg transition"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>

            {/* Center Navigation Pills - Desktop Only */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white/40 backdrop-blur-md rounded-full px-2 py-2 shadow-lg">
              <motion.a 
                href="#home" 
                className="px-6 py-2 rounded-full text-white text-sm font-medium relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-[#151965] rounded-full scale-0 group-hover:scale-100 transition-transform duration-400 ease-out origin-center"></span>
                <span className="relative z-10 group-hover:text-[#46B5D1] transition-colors duration-300">Home</span>
              </motion.a>
              
              <motion.a 
                href="#gallery" 
                className="px-6 py-2 rounded-full text-white text-sm font-medium relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-[#151965] rounded-full scale-0 group-hover:scale-100 transition-transform duration-400 ease-out origin-center"></span>
                <span className="relative z-10 group-hover:text-[#46B5D1] transition-colors duration-300">Destination</span>
              </motion.a>
              
              <motion.a 
                href="#memories" 
                className="px-6 py-2 rounded-full text-white text-sm font-medium relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-[#151965] rounded-full scale-0 group-hover:scale-100 transition-transform duration-400 ease-out origin-center"></span>
                <span className="relative z-10 group-hover:text-[#46B5D1] transition-colors duration-300">Memories</span>
              </motion.a>
              
              <motion.a 
                href="#timeline" 
                className="px-6 py-2 rounded-full text-white text-sm font-medium relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-[#151965] rounded-full scale-0 group-hover:scale-100 transition-transform duration-400 ease-out origin-center"></span>
                <span className="relative z-10 group-hover:text-[#46B5D1] transition-colors duration-300">Timeline</span>
              </motion.a>
              
              <motion.a 
                href="#sponsors" 
                className="px-6 py-2 rounded-full text-white text-sm font-medium relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-[#151965] rounded-full scale-0 group-hover:scale-100 transition-transform duration-400 ease-out origin-center"></span>
                <span className="relative z-10 group-hover:text-[#46B5D1] transition-colors duration-300">Sponsors</span>
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className="px-6 py-2 rounded-full text-white text-sm font-medium relative overflow-hidden group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-[#151965] rounded-full scale-0 group-hover:scale-100 transition-transform duration-400 ease-out origin-center"></span>
                <span className="relative z-10 group-hover:text-[#46B5D1] transition-colors duration-300">Contact</span>
              </motion.a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-150px)] md:h-[calc(100vh-200px)] px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center mb-4 md:mb-6 text-white"
          >
            Make Your <span className="text-[#151965] italic font-serif">Industrial Visit</span>
            <br className="hidden sm:block" />
            Unforgettable!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-white/90 mb-6 md:mb-8 text-center max-w-lg"
          >
            Get your dream trip planned with expert-guided destinations,
            <br />
            booking, transport & more — all in one
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 25px 50px rgba(0, 106, 103, 0.8)",
              backgroundColor: "#32407B",
              color: "white",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.92, rotate: [0, -2, 2, 0] }}
            onClick={() => setShowForm(true)}
            className="relative flex items-center gap-2 bg-[#151965] text-white px-6 py-3 md:px-10 md:py-5 rounded-full text-base md:text-lg font-bold shadow-2xl overflow-hidden group border-2 border-[#46B5D1]"
          >
            <motion.span
              className="absolute inset-0 bg-[#32407B] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
            <motion.span 
              className="relative z-10 flex items-center gap-2"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            >
              Register Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              >
                <ChevronRight size={22} />
              </motion.span>
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Activities Section */}
      <section id="activities" className="relative py-12 md:py-20 px-4 md:px-8 bg-[#151965]">
        <div className="max-w-7xl mx-auto">
          {/* Activities Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <p className="text-xs tracking-[0.2em] md:tracking-[0.3em] text-[#46B5D1] mb-3 md:mb-4 font-semibold">ACTIVITIES</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              We Have Everything<br />You Need.
            </h2>
            <p className="text-white/90 text-lg max-w-lg mx-auto">
              Discover our curated selection of experiences tailored to make your visit memorable
            </p>
          </motion.div>

          {/* Activity Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-12 text-center max-w-3xl mx-auto"
            >
              <p className="text-white/90 text-lg leading-relaxed">
                {activities[activeTab].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Photo Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl mx-auto"
            >
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-3xl">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {activities[activeTab].items.map((activity, index) => (
                    <div key={index} className="min-w-full">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative h-[500px] overflow-hidden"
                      >
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-12 text-left">
                          <motion.h3 
                            className="text-white text-3xl font-bold tracking-wider mb-4"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {activity.title}
                          </motion.h3>
                          <motion.button 
                            className="flex items-center gap-2 text-white text-sm tracking-wider bg-[#151965] hover:bg-[#32407B] px-6 py-3 rounded-full transition-all"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ gap: "0.75rem", scale: 1.05 }}
                          >
                            {activity.link}
                            <ChevronRight size={18} />
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? activities[activeTab].items.length - 1 : prev - 1))}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                >
                  <ChevronLeft size={20} className="text-[#151965] md:w-6 md:h-6" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === activities[activeTab].items.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                >
                  <ChevronRight size={20} className="text-[#151965] md:w-6 md:h-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
                  {activities[activeTab].items.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentSlide === index ? 'bg-[#46B5D1] w-8' : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Gallery Section with Dashboard Layout */}
      <section id="gallery" className="py-12 md:py-20 px-4 md:px-8 bg-[#32407B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Discover Amazing <span className="text-[#46B5D1]">Destinations</span>
            </h2>
            <p className="text-white/90 text-lg text-center">
              Experience the world through our curated collection of breathtaking locations
            </p>
          </motion.div>

          {/* Dashboard Grid Layout */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column - Large Image Cards */}
            <div className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg cursor-pointer h-64 md:h-96 border-2 md:border-4 border-[#151965]"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                  alt="Tesla Gigafactory"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  whileHover={{ opacity: 0.9 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                  <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Tesla Gigafactory</h3>
                  <p className="text-xs md:text-sm opacity-90">State-of-the-art electric vehicle manufacturing</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg cursor-pointer h-64 md:h-96 border-2 md:border-4 border-[#151965]"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
                  alt="Google Campus"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  whileHover={{ opacity: 0.9 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                  <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Google Campus</h3>
                  <p className="text-xs md:text-sm opacity-90">Innovation hub and tech excellence</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Grid of Smaller Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg cursor-pointer h-40 sm:h-48 md:h-60 border-2 md:border-4 border-[#151965]"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&q=80"
                  alt="SpaceX Facility"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  whileHover={{ opacity: 0.9 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white">
                  <h4 className="text-sm md:text-lg font-bold mb-0.5 md:mb-1">SpaceX</h4>
                  <p className="text-[10px] md:text-xs opacity-90">Rocket facility</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg cursor-pointer h-40 sm:h-48 md:h-60 border-2 md:border-4 border-[#151965]"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80"
                  alt="Amazon HQ"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  whileHover={{ opacity: 0.9 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white">
                  <h4 className="text-sm md:text-lg font-bold mb-0.5 md:mb-1">Amazon HQ</h4>
                  <p className="text-[10px] md:text-xs opacity-90">Spheres campus</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg cursor-pointer h-40 sm:h-48 md:h-60 border-2 md:border-4 border-[#151965]"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80"
                  alt="Meta HQ"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  whileHover={{ opacity: 0.9 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white">
                  <h4 className="text-sm md:text-lg font-bold mb-0.5 md:mb-1">Meta HQ</h4>
                  <p className="text-[10px] md:text-xs opacity-90">Facebook campus</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg cursor-pointer h-40 sm:h-48 md:h-60 border-2 md:border-4 border-[#151965]"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=400&q=80"
                  alt="Intel Campus"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  whileHover={{ opacity: 0.9 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="text-lg font-bold mb-1">Intel Campus</h4>
                  <p className="text-xs opacity-90">Chip manufacturing</p>
                </div>
              </motion.div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Memories Section */}
      <section id="memories" className="relative py-12 md:py-20 px-4 md:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
              Captured <span className="text-[#151965]">Memories</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Moments that last forever
            </p>
          </motion.div>

          {/* Photo Cards Stack */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
            {memories.map((memory, index) => {
              const isActive = index === currentMemory;
              const isPrev = index === (currentMemory - 1 + memories.length) % memories.length;
              const isNext = index === (currentMemory + 1) % memories.length;
              
              let zIndex = 0;
              let scale = 0.85;
              let opacity = 0;
              let x = 0;
              let y = 0;
              let rotate = memory.rotate;

              if (isActive) {
                zIndex = 30;
                scale = 1;
                opacity = 1;
                x = 0;
                y = 0;
              } else if (isPrev) {
                zIndex = 20;
                scale = 0.9;
                opacity = 0.5;
                x = -100;
                y = 30;
                rotate = memory.rotate - 3;
              } else if (isNext) {
                zIndex = 20;
                scale = 0.9;
                opacity = 0.5;
                x = 100;
                y = 30;
                rotate = memory.rotate + 3;
              } else {
                zIndex = 10;
                scale = 0.8;
                opacity = 0;
                x = index < currentMemory ? -200 : 200;
                y = 50;
              }

              return (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, scale: 0.8, y: 100 }}
                  animate={{
                    opacity,
                    scale,
                    x,
                    y,
                    rotate,
                    zIndex
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                    delay: index * 0.1
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentMemory(index)}
                  className="absolute w-[85%] sm:w-[90%] md:w-full max-w-xs sm:max-w-sm md:max-w-lg cursor-pointer px-2"
                >
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-2 sm:p-3 md:p-4 hover:shadow-[0_25px_50px_-12px_rgba(69,40,41,0.5)] transition-shadow">
                    <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                      <img
                        src={memory.image}
                        alt={memory.caption}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                      />
                    </div>
                    <div className="mt-2 sm:mt-3 md:mt-4 text-center">
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800">{memory.caption}</h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            {memories.map((memory, index) => (
              <button
                key={memory.id}
                onClick={() => setCurrentMemory(index)}
                className={`h-2 md:h-3 rounded-full transition-all ${
                  currentMemory === index ? 'bg-[#151965] w-8 md:w-12' : 'bg-gray-300 w-2 md:w-3 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="relative py-12 md:py-20 px-4 md:px-8 bg-[#32407B] overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
              Your <span className="text-[#46B5D1]">Journey</span> Timeline
            </h2>
            <p className="text-white text-base md:text-lg">
              Follow the pathway of your unforgettable experience
            </p>
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Meandering Dotted Line - Desktop Only */}
            <svg className="hidden md:block absolute left-1/2 top-0 h-full -translate-x-1/2" width="300" height="100%" preserveAspectRatio="none">
              {/* Segment 1 */}
              <motion.path
                d="M 150 0 Q 80 120, 150 240"
                fill="none"
                stroke="#46B5D1"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              {/* Segment 2 */}
              <motion.path
                d="M 150 240 Q 220 360, 150 480"
                fill="none"
                stroke="#46B5D1"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              />
              {/* Segment 3 */}
              <motion.path
                d="M 150 480 Q 80 600, 150 720"
                fill="none"
                stroke="#46B5D1"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
              />
              {/* Segment 4 */}
              <motion.path
                d="M 150 720 Q 220 840, 150 960"
                fill="none"
                stroke="#46B5D1"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
              />
              {/* Segment 5 */}
              <motion.path
                d="M 150 960 Q 80 1080, 150 1200"
                fill="none"
                stroke="#46B5D1"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
              />
            </svg>

            {/* Straight Line - Mobile Only */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-[#46B5D1]"></div>

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-24 relative">
              {[
                { day: 'Day 1', title: 'Arrival', desc: 'Welcome & Check-in', icon: '✈️', side: 'left' },
                { day: 'Day 2', title: 'Factory Tour', desc: 'Industrial Visit', icon: '🏭', side: 'right' },
                { day: 'Day 3', title: 'Adventure', desc: 'Activities & Exploration', icon: '🏔️', side: 'left' },
                { day: 'Day 4', title: 'Leisure', desc: 'Relaxation Day', icon: '🌴', side: 'right' },
                { day: 'Day 5', title: 'Departure', desc: 'Farewell & Return', icon: '🏠', side: 'left' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Mobile: Linear Layout with dot */}
                  <div className="md:hidden flex items-start gap-4">
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0 w-16 flex justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#46B5D1] border-4 border-[#32407B] relative z-10"></div>
                    </div>
                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20 cursor-pointer"
                    >
                      <p className="text-[#46B5D1] font-bold text-xs mb-1">{item.day}</p>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-[#F7F7F7] text-sm">{item.desc}</p>
                    </motion.div>
                  </div>

                  {/* Desktop: Meandering Layout */}
                  <div className={`hidden md:flex items-center gap-8 ${item.side === 'right' ? 'flex-row-reverse' : ''}`}>
                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 cursor-pointer"
                    >
                      <p className="text-[#46B5D1] font-bold text-sm mb-2">{item.day}</p>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-[#F7F7F7] text-sm">{item.desc}</p>
                    </motion.div>

                    {/* Spacer for other side */}
                    <div className="flex-1"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="relative py-12 md:py-20 px-4 md:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#151965] mb-3 md:mb-4">
              Our <span className="text-[#46B5D1]">Sponsors</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Trusted partners supporting industrial excellence
            </p>
          </motion.div>

          {/* Horizontal Scrolling Logos */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div className="animate-scroll-horizontal flex gap-8 py-8">
              {/* First set of logos */}
              <div className="flex gap-8 shrink-0">
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1]">Ferrari</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1]">Lamborghini</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1] transition-colors duration-300">Porsche</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1]">McLaren</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1]">Bugatti</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1] transition-colors duration-300">Aston Martin</span>
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex gap-8 shrink-0">
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1] transition-colors duration-300">Ferrari</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1] transition-colors duration-300">Lamborghini</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1] transition-colors duration-300">Porsche</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1] transition-colors duration-300">McLaren</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1] transition-colors duration-300">Bugatti</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 md:p-8 w-48 md:w-64 h-24 md:h-32 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-300 shrink-0 group">
                  <span className="text-xl md:text-3xl font-bold text-[#151965] group-hover:text-[#46B5D1] transition-colors duration-300">Aston Martin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#151965] text-white py-10 md:py-16 px-4 md:px-8 border-t-4 border-[#46B5D1]">
        <div className="max-w-7xl mx-auto">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/iste_logo.png" alt="ISTE Logo" className="w-10 h-10 object-contain" />
                <div className="text-3xl font-bold text-[#46B5D1]">ISTE KJSCE</div>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Empowering students through technical excellence and industrial exposure. Join us for unforgettable learning experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#46B5D1]">Quick Links</h3>
              <div className="flex flex-col gap-3 text-sm">
                <a href="#home" className="text-[#F7F7F7] hover:text-[#46B5D1] transition-colors duration-300">Home</a>
                <a href="#gallery" className="text-[#F7F7F7] hover:text-[#46B5D1] transition-colors duration-300">Destinations</a>
                <a href="#memories" className="text-[#F7F7F7] hover:text-[#46B5D1] transition-colors duration-300">Memories</a>
                <a href="#timeline" className="text-[#F7F7F7] hover:text-[#46B5D1] transition-colors duration-300">Timeline</a>
                <a href="#sponsors" className="text-[#F7F7F7] hover:text-[#46B5D1] transition-colors duration-300">Sponsors</a>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#46B5D1]">Contact Us</h3>
              <div className="flex flex-col gap-3 text-sm text-white">
                <p className="flex items-center gap-2">
                  <span className="text-[#46B5D1]">📧</span> istekjsce@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#46B5D1]">📞</span> +91 1234567890
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#46B5D1]">📍</span> K.J. Somaiya College, Mumbai
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#32407B] pt-6 text-center">
            <p className="text-white text-sm">
              Made with love by <span className="text-[#46B5D1] font-semibold">ISTE KJSCE</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Registration Form Modal for Industrial Visit */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center p-4 z-[60]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#32407B] rounded-2xl md:rounded-3xl shadow-2xl">
                <div className="sticky top-0 bg-[#151965] text-white p-4 md:p-8 rounded-t-2xl md:rounded-t-3xl z-10">
                <div className="flex justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Industrial Visit Registration</h2>
                    <p className="text-white/90 text-sm md:text-base">Join us for an unforgettable learning experience</p>
                  </div>
                  <motion.button
                    onClick={() => setShowForm(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white hover:bg-white/20 p-2 rounded-full transition flex-shrink-0"
                  >
                    <X size={20} className="md:w-6 md:h-6" />
                  </motion.button>
                </div>
              </div>
              
              <form className="p-4 md:p-8 space-y-4 md:space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Registration submitted!'); setShowForm(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-white mb-2">Full Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition bg-[#151965] text-white placeholder-gray-400"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-sm font-semibold text-white mb-2">Email Address *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition bg-[#151965] text-white placeholder-gray-400"
                      required
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-white mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition bg-[#151965] text-white placeholder-gray-400"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-sm font-semibold text-white mb-2">Institution/College *</label>
                    <input
                      type="text"
                      placeholder="Your College Name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition bg-[#151965] text-white placeholder-gray-400"
                      required
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-white mb-2">Course/Department *</label>
                    <input
                      type="text"
                      placeholder="e.g., Computer Science"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition bg-[#151965] text-white placeholder-gray-400"
                      required
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-sm font-semibold text-white mb-2">Year of Study *</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition bg-[#151965] text-white" required>
                      <option value="">Select Year</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Graduate</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">Preferred Industry Type *</label>
                  <select className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition bg-[#151965] text-white" required>
                    <option value="">Select Industry</option>
                    <option>Technology & IT</option>
                    <option>Manufacturing</option>
                    <option>Automotive</option>
                    <option>Pharmaceuticals</option>
                    <option>Energy & Power</option>
                    <option>Food Processing</option>
                    <option>Research & Development</option>
                    <option>Other</option>
                  </select>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">Number of Participants</label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition bg-[#151965] text-white placeholder-gray-400"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">Additional Comments</label>
                  <textarea
                    placeholder="Tell us about your expectations or special requirements..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#46B5D1] focus:border-[#46B5D1] focus:outline-none transition resize-none bg-[#151965] text-white placeholder-gray-400"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4"
                >
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 md:px-6 md:py-4 rounded-xl border-2 border-[#46B5D1] text-white font-semibold hover:bg-[#151965] transition"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0, 106, 103, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 md:px-6 md:py-4 rounded-xl bg-[#46B5D1] text-white font-semibold shadow-lg transition"
                  >
                    Submit Registration
                  </motion.button>
                </motion.div>
              </form>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[70] md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#151965] shadow-2xl z-[80] p-8 md:hidden"
            >
              <div className="flex items-center gap-3 mb-10">
                <img src="/iste_logo.png" alt="ISTE Logo" className="w-10 h-10 object-contain" />
                <h2 className="text-xl font-bold text-white">ISTE KJSCE</h2>
              </div>
              <nav className="space-y-4">
                <a href="#home" onClick={() => setMenuOpen(false)} className="block text-lg text-white hover:text-[#46B5D1] transition py-2 border-b border-white/10">
                  Home
                </a>
                <a href="#activities" onClick={() => setMenuOpen(false)} className="block text-lg text-white hover:text-[#46B5D1] transition py-2 border-b border-white/10">
                  Activities
                </a>
                <a href="#gallery" onClick={() => setMenuOpen(false)} className="block text-lg text-white hover:text-[#46B5D1] transition py-2 border-b border-white/10">
                  Destinations
                </a>
                <a href="#memories" onClick={() => setMenuOpen(false)} className="block text-lg text-white hover:text-[#46B5D1] transition py-2 border-b border-white/10">
                  Memories
                </a>
                <a href="#timeline" onClick={() => setMenuOpen(false)} className="block text-lg text-white hover:text-[#46B5D1] transition py-2 border-b border-white/10">
                  Timeline
                </a>
                <a href="#sponsors" onClick={() => setMenuOpen(false)} className="block text-lg text-white hover:text-[#46B5D1] transition py-2 border-b border-white/10">
                  Sponsors
                </a>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-lg text-white hover:text-[#46B5D1] transition py-2 border-b border-white/10">
                  Contact
                </a>
              </nav>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setMenuOpen(false); setShowForm(true); }}
                className="mt-8 w-full bg-[#46B5D1] text-white py-3 rounded-full font-semibold hover:bg-[#32407B] transition"
              >
                Register Now
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
