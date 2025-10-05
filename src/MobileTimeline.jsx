import React, { useState, useEffect, useRef } from 'react';

const MobileTimeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  const timelineEvents = [
    {
      month: 'ISTE',
      year: '2024-25',
      description: 'ISTE built on its tradition of excellence with a series of impactful events, hands-on workshops, and tech-driven initiatives that inspired learning and innovation. The year\'s highlight was Prakalpa\'25 — our biggest edition yet — featuring 60+ teams from across India and our first-ever international entry, showcasing groundbreaking ideas and collaborative spirit',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2023-24',
      description: 'After the pandemic, ISTE worked even better to get Prakalpa and other events back in action in the offline mode and successfully carried out various events with a good audience, the highlight being Prakalpa\'24 which saw participants from across India.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2021-22',
      description: 'ISTE continued with online mode of conduction of events as the world grappled with COVID-19. Several webinars were organized for the benefit of students.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2020-21',
      description: 'In one of the most challenging times; during COVID-19, ISTE successfully conducted many online events which helped lift student\'s spirits. Vision-2020 and Prakalpa were held completely in online mode.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2019-20',
      description: 'ISTE Council of the year 2019-20 organized 2 fun events in Abhiyantriki: Robo Maze and Virtue and Vice, where participants had the chance of getting prizes worth 10,000.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2018-19',
      description: 'Prakalpa 2019 was held in the 3rd week of March, which included paper presentations covering themes like Modern Agriculture, Cyber Security, Defense and Energy Optimization.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2017-18',
      description: 'ISTE organized the game CTRL+SHIFT+ESC, a 4-staged game of speed and logical reasoning in Abhiyantriki 2017. Prakalpa 2018, organized in the month of March, witnessed paper presentations.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2016-17',
      description: 'ISTE conducted an amazing event \'ROBOSPRINT\', a technical event that included the most exciting features of all the fields of engineering offered by KJSSE, in Abhiyantriki 2016.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2015-16',
      description: 'There was a 2-level game in Abhiyantriki 2015, which was based on problem solving from the fields of Mechanical, Electronics, coding and General Aptitude.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2014-15',
      description: 'Prakalpa 2015 was conducted in the first week of March, on the theme \'Security Systems\'. Abhiyantriki 2014 had various events like Hydro-shoot, a 3-leveled Bot Assembly event.',
      color: '#A7C7E7'
    },
    {
      month: 'ISTE',
      year: '2013-14',
      description: 'Prakalpa 2014 included paper presentation on the themes like Food Security; Geo Informatics and Energy Efficient Appliances. It also had theme based project competition.',
      color: '#A7C7E7'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const timelineHeight = timelineRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrolled = windowHeight - timelineTop;
      const totalScrollable = timelineHeight + windowHeight;
      const progress = Math.max(0, Math.min(100, (scrolled / totalScrollable) * 115 ));
      
      setScrollProgress(progress);
      
      // Check which cards are in view
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5c9fbf] via-[#167097] to-[#010919]"
>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(73, 198, 229, 0.15) 0%, transparent 70%)`,
                width: Math.random() * 40 + 20 + 'vw',
                height: Math.random() * 40 + 20 + 'vh',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: Math.random() * 5 + 's'
              }}
            />
          ))}
        </div>

  <div className="relative z-10 text-center px-4">
  {/* First line */}
  <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight 
                 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 
                 bg-clip-text text-transparent whitespace-nowrap overflow-hidden 
                 border-r-4 border-cyan-300 animate-typingNoCursor">
    Our Story
  </h1>

  {/* Second line */}
  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-cyan-300 font-bold mb-4 
                whitespace-nowrap overflow-hidden border-r-4 border-cyan-300 
                animate-typingNoCursor delay-[3s]">
    The journey of ISTE's Legacy
  </p>
</div>

      </div>

      {/* Timeline Section */}
      <div ref={timelineRef} className="relative px-6 py-16">
        <div className="max-w-md mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-cyan-900/30" style={{ zIndex: 1 }}></div>
          
          {/* Animated Progress Line */}
          <div 
            className="absolute left-6 top-0 w-0.5 transition-all duration-300"
            style={{
              height: `${scrollProgress}%`,
              background: `linear-gradient(to bottom, rgba(139, 215, 210, 0.3), rgba(139, 215, 210, 1))`,
              boxShadow: '0 0 20px rgba(139, 215, 210, 0.8)',
              zIndex: 2
            }}
          ></div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => {
            const isActive = index <= activeIndex;
            const progressToThisCard = ((index + 1) / timelineEvents.length) * 120;
            const lineOpacity = Math.min(scrollProgress / progressToThisCard, 1);
            
            return (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className="relative pl-16 pb-12 last:pb-0"
              >
                {/* Dot on the line */}
                <div 
                  className="absolute left-6 top-8 w-3 h-3 rounded-full transition-all duration-500 transform -translate-x-1/2"
                  style={{
                    backgroundColor: event.color,
                    boxShadow: isActive 
                      ? `0 0 20px ${event.color}, 0 0 40px ${event.color}` 
                      : `0 0 10px ${event.color}60`,
                    scale: isActive ? 1.5 : 1,
                    opacity: lineOpacity,
                    zIndex: 3
                  }}
                ></div>

                {/* Card */}
                <div
                  className={`relative transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-8'
                  }`}
                >
                  <div 
                    className="relative p-6 rounded-xl backdrop-blur-sm"
                    style={{
                      backgroundColor: `${event.color}20`,
                      boxShadow: isActive 
                        ? `0 10px 40px ${event.color}40, 0 0 20px ${event.color}30`
                        : `0 5px 20px ${event.color}20`,
                      border: `1px solid ${event.color}40`
                    }}
                  >
                    {/* Corner Decorations */}
                    <div 
                      className="absolute top-0 left-0 transition-all duration-300"
                      style={{ 
                        backgroundColor: event.color,
                        width: isActive ? '40px' : '30px',
                        height: '2px',
                        opacity: lineOpacity
                      }}
                    ></div>
                    <div 
                      className="absolute top-0 left-0 transition-all duration-300"
                      style={{ 
                        backgroundColor: event.color,
                        width: '2px',
                        height: isActive ? '40px' : '30px',
                        opacity: lineOpacity
                      }}
                    ></div>

                    {/* Month Label */}
                    <div 
                      className="text-4xl font-bold mb-1 tracking-wider transition-all duration-300"
                      style={{ 
                        color: event.color,
                        textShadow: isActive 
                          ? `0 0 20px ${event.color}80` 
                          : 'none',
                        opacity: lineOpacity
                      }}
                    >
                      {event.month}
                    </div>

                    {/* Year */}
                    <div 
                      className="text-sm font-semibold mb-4 tracking-wide"
                      style={{ 
                        color: event.color,
                        opacity: 0.8 * lineOpacity
                      }}
                    >
                      {event.year}
                    </div>

                    {/* Description */}
                    <p 
                      className="text-sm leading-relaxed"
                      style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        opacity: lineOpacity
                      }}
                    >
                      {event.description}
                    </p>

                    {/* Glow Effect */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-xl blur-2xl -z-10 transition-opacity duration-500"
                        style={{ 
                          backgroundColor: event.color,
                          opacity: 0.15 * lineOpacity
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Spacer */}
      <div className="h-32"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </div>
  );
};

export default MobileTimeline;