import React, { useState, useEffect, useRef } from 'react';

const InteractiveTimeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);


  const timelineEvents = [
    {
      month: 'ISTE',
      year: '2024-25',
      description: 'ISTE built on its tradition of excellence with a series of impactful events, hands-on workshops, and tech-driven initiatives that inspired learning and innovation. The year’s highlight was Prakalpa’25 — our biggest edition yet — featuring 60+ teams from across India and our first-ever international entry, showcasing groundbreaking ideas and collaborative spirit',
      color: '#167097',
      position: 'left'
    },
    {
      month: 'ISTE',
      year: '2023-24',
      description: 'After the pandemic, ISTE worked even better to get Prakalpa and other events back in action in the offline mode and successfully carried out various events with a good audience, the highlight being Prakalpa\'24 which saw participants from across India. ',
      color: '#167097',
      position: 'right'
    },
    {
      month: 'ISTE',
      year: '2021-22',
      description: 'ISTE continued with online mode of conduction of events as the world grappled with COVID-19. Several webinars were organized for the benefit of students. ',
      color: '#167097',
      position: 'left'
    },
    {
      month: 'ISTE',
      year: '2020-21',
      description: 'In one of the most challenging times; during COVID-19, ISTE successfully conducted many online events which helped lift student\'s spirits. Vision-2020 and Prakalpa were held completely in online mode. It is noteworthy that even if the events were online, there was a good response and participation from the students. ',
      color: '#167097',
      position: 'right'
    },
    {
      month: 'ISTE',
      year: '2019-20',
      description: 'ISTE Council of the year 2019-20 organized 2 fun events in Abhiyantriki: Robo Maze and Virtue and Vice, where participants had the chance of getting prizes worth 10,000. The council also organized three different workshops- an Analytics using R programming , Eagle Workshop and an A.R Workshop. ',
      color: '#167097',
      position: 'left'
    },
    {
      month: 'ISTE',
      year: '2018-19',
      description: 'Prakalpa 2019 was held in the 3rd week of March, which included paper presentations covering themes like Modern Agriculture, Cyber Security, Defense and Energy Optimization. Workshops on Component and Calculator, and GRE were held in the month of August. An event called ‘Escape The Labyrinth’ was organized in Abhiyantriki 2018, in which participants had to control a bot using a smartphone/remote inside a labyrinth. ',
      color: '#167097',
      position: 'right'
    },
    {
      month: 'ISTE',
      year: '2017-18',
      description: 'ISTE organized the game CTRL+SHIFT+ESC, a 4-staged game of speed and logical reasoning in Abhiyantriki 2017. Prakalpa 2018, organized in the month of March, witnessed paper presentations that covered topics like A.I and Machine Learning, IOT, Virtual and Augmented Reality. It also included a project exhibition. Workshops on Component Testing Identification and Arduino were conducted',
      color: '#167097',
       position: 'left'
    }
    ,
    {
      month: 'ISTE',
      year: '2016-17',
      description: 'ISTE conducted an amazing event ‘ROBOSPRINT’, a technical event that included the most exciting features of all the fields of engineering offered by KJSSE, in Abhiyantriki 2016. A total of 20 teams had participated in the event. This was the highest number of participants amongst all the technical events, despite being the longest event. Prakalpa 2017 included conference, technical quiz, working model exhibition, and paper presentation on the theme- ‘Artificial Intelligence-Innovation Towards Future\’. ',
      color: '#167097',
      position: 'right'
    },
    {
      month: 'ISTE',
      year: '2015-16',
      description: 'There was a 2-level game in Abhiyantriki 2015, which was based on problem solving from the fields of Mechanical, Electronics, coding and General Aptitude. Prakalpa 2016 included Conference on Digital Media; working model exhibition/competition on the same; an open theatre play competition on Digital India Educated India. Hackathon on the topics IoT to enhance learning; Product in the field of mechatronics; Data Security, was organized on 5th March 2016. A GATE seminar was also organized by the council to bring awarness about the exam on 3rd September, 2015',
      color: '#167097',
       position: 'left'
    },
    {
      month: 'ISTE',
      year: '2014-15',
      description: 'Prakalpa 2015 was conducted in the first week of March, on the theme ‘Security Systems’. Abhiyantriki 2014 had various events like Hydro-shoot, a 3-leveled Bot Assembly event, and an Alien Teleport game using bots. I-day celbration also was conducted on 16 Aug 2014 ',
      color: '#167097',
      position: 'right'
    },
    {
      month: 'ISTE',
      year: '2013-14',
      description: 'Prakalpa 2014 included paper presentation on the themes like Food Security; Geo Informatics and Energy Efficient Appliances. It also had theme based project competition and an Open Theatre Play. Abhiyantriki 2013 events included Quiz-O-Nova ( Quiz in Science-Fiction, Astronomy, Current Research and Technology for Sci-Fienthusiasts), Hydro shoot as apart of a fun game, and another event \'Lost In Space\'. Zennith 2014, held in April, had mainly fun events such as Hydro Shoot, \'Pin the Dartboard\', \'UC Golf\', \'Know Your World\' and \'Country Special\'. I-day celbration also was conducted on 16 Aug 2013 ',
      color: '#167097',
      position: 'left'
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
      const progress = Math.max(0, Math.min(100, (scrolled / totalScrollable) * 100));
      
      setScrollProgress(progress);
      
      // Check which cards are in view
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPathD = () => {
    let path = '';
    const cardHeight = 350; // pixels between cards
    
    timelineEvents.forEach((event, index) => {
      const y = index * cardHeight + 200; // Center of card
      const x = event.position === 'left' ? 45 : 55; // Edge of card
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        const prevEvent = timelineEvents[index - 1];
        const prevX = prevEvent.position === 'left' ? 45 : 55;
        const prevY = (index - 1) * cardHeight + 200;
        
        // Create L-shaped connection from card edge to card edge
        path += ` L ${prevX} ${prevY + cardHeight / 2} L ${x} ${prevY + cardHeight / 2} L ${x} ${y}`;
      }
    });
    
    return path;
  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-[#167097] via-[#0c1a34] to-[#010919]">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative">
  <div className="absolute inset-0">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(73, 198, 229, 0.15) 0%, transparent 70%)`,
          width: Math.random() * 20 + 10 + 'vw',   // ~150–300px → 10–20vw
          height: Math.random() * 20 + 10 + 'vh',  // ~150–300px → 10–20vh
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
  <h1 className="text-8xl md:text-9xl font-bold mb-6 tracking-tight 
                 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 
                 bg-clip-text text-transparent whitespace-nowrap overflow-hidden 
                 border-r-4 border-cyan-300 animate-typingNoCursor">
    Our Story
  </h1>

  {/* Second line */}
  <p className="text-3xl md:text-4xl text-cyan-300 font-bold mb-4 
                whitespace-nowrap overflow-hidden border-r-4 border-cyan-300 
                animate-typingNoCursor delay-[3s]">
    The journey of ISTE's Legacy
  </p>
</div>





</div>


      {/* Timeline Section */}
      <div ref={timelineRef} className="relative px-4 py-32">
        <div className="max-w-6xl mx-auto relative" style={{ minHeight: `${timelineEvents.length * 350 + 200}px` }}>
          {/* SVG Path */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            style={{ zIndex: 1 }}
            preserveAspectRatio="none"
            viewBox={`0 0 100 ${timelineEvents.length * 350 + 200}`}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8BD7D2" />
                <stop offset="100%" stopColor="#8BD7D2" />
              </linearGradient>
            </defs>
            
            {/* Background path - dimmed */}
            <path
              d={getPathD()}
              fill="none"
              stroke="#8BD7D2"
              strokeWidth="1"
              opacity="0.3"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Animated progress path */}
            <path
              d={getPathD()}
              fill="none"
              stroke="#8BD7D2"
              strokeWidth="4"
              strokeLinecap="square"
              strokeLinejoin="miter"
             strokeDasharray="500"
strokeDashoffset={3000 - (scrollProgress * 5)}
              style={{ 
                transition: 'stroke-dashoffset 0.1s linear',
                filter: 'drop-shadow(0 0 12px rgba(139, 215, 210, 0.6))'
              }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Timeline Cards */}
          {timelineEvents.map((event, index) => {
            const isLeft = event.position === 'left';
            const isActive = index <= activeIndex;
            
            return (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`absolute transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  top: `${index * 350 + 50}px`,
                  left: isLeft ? '0' : '50%',
                  right: 'auto',
                  width: '45%',
                  transitionDelay: `${index * 50}ms`,
                  zIndex: hoveredIndex === index ? 20 : 10
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className={`relative p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                    hoveredIndex === index ? 'scale-110' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: hoveredIndex === index 
                      ? `${event.color}30` 
                      : event.color === '#FFFBFA' 
                        ? 'rgba(0, 189, 157, 0.12)' 
                        : `${event.color}18`,
                    boxShadow: hoveredIndex === index 
                      ? `0 30px 80px ${event.color}50, 0 0 60px ${event.color}40`
                      : `0 20px 60px ${event.color}30`,
                    transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                    border: `1px solid ${event.color}50`
                  }}
                >
                  {/* Prominent Border Frame with Animation */}
                  <div 
                    className="absolute top-0 left-0 transition-all duration-500"
                    style={{ 
                      backgroundColor: hoveredIndex === index ? event.color : event.color === '#FFFBFA' ? '#8BD7D2' : event.color,
                      width: hoveredIndex === index ? '160px' : '128px',
                      height: '2px',
                      boxShadow: hoveredIndex === index ? `0 0 20px ${event.color}` : 'none',
                      opacity: hoveredIndex === index ? 1 : 0.8
                    }}
                  ></div>
                  <div 
                    className="absolute top-0 left-0 transition-all duration-500"
                    style={{ 
                      backgroundColor: hoveredIndex === index ? event.color : event.color === '#FFFBFA' ? '#8BD7D2' : event.color,
                      width: '2px',
                      height: hoveredIndex === index ? '160px' : '128px',
                      boxShadow: hoveredIndex === index ? `0 0 20px ${event.color}` : 'none',
                      opacity: hoveredIndex === index ? 1 : 0.8
                    }}
                  ></div>
                  <div 
                    className="absolute bottom-0 right-0 transition-all duration-500"
                    style={{ 
                      backgroundColor: hoveredIndex === index ? event.color : event.color === '#FFFBFA' ? '#8BD7D2' : event.color,
                      width: hoveredIndex === index ? '160px' : '128px',
                      height: '2px',
                      boxShadow: hoveredIndex === index ? `0 0 20px ${event.color}` : 'none',
                      opacity: hoveredIndex === index ? 1 : 0.8
                    }}
                  ></div>
                  <div 
                    className="absolute bottom-0 right-0 transition-all duration-500"
                    style={{ 
                      backgroundColor: hoveredIndex === index ? event.color : event.color === '#FFFBFA' ? '#8BD7D2' : event.color,
                      width: '2px',
                      height: hoveredIndex === index ? '160px' : '128px',
                      boxShadow: hoveredIndex === index ? `0 0 20px ${event.color}` : 'none',
                      opacity: hoveredIndex === index ? 1 : 0.8
                    }}
                  ></div>

                  {/* Animated Corner Dots */}
                  <div 
                    className="absolute top-0 left-0 rounded-full transition-all duration-500"
                    style={{
                      width: hoveredIndex === index ? '12px' : '6px',
                      height: hoveredIndex === index ? '12px' : '6px',
                      backgroundColor: event.color,
                      transform: hoveredIndex === index ? 'translate(-3px, -3px)' : 'translate(0, 0)',
                      boxShadow: hoveredIndex === index ? `0 0 20px ${event.color}` : 'none'
                    }}
                  ></div>
                  <div 
                    className="absolute bottom-0 right-0 rounded-full transition-all duration-500"
                    style={{
                      width: hoveredIndex === index ? '12px' : '6px',
                      height: hoveredIndex === index ? '12px' : '6px',
                      backgroundColor: event.color,
                      transform: hoveredIndex === index ? 'translate(3px, 3px)' : 'translate(0, 0)',
                      boxShadow: hoveredIndex === index ? `0 0 20px ${event.color}` : 'none'
                    }}
                  ></div>

                  {/* Month Label with Pulse Animation */}
                  <div 
                    className={`text-8xl font-bold mb-2 tracking-widest transition-all duration-500 ${
                      hoveredIndex === index ? 'scale-110' : ''
                    }`}
                    style={{ 
                      color: event.color === '#FFFBFA' ? '#FFFBFA' : event.color,
                      textShadow: hoveredIndex === index 
                        ? `0 0 40px ${event.color}, 0 4px 20px ${event.color}60` 
                        : `0 4px 20px ${event.color}40`,
                      letterSpacing: '0.2em'
                    }}
                  >
                    {event.month}
                  </div>

                  {/* Year with Animation */}
                  <div 
                    className={`text-sm font-semibold mb-6 tracking-widest transition-all duration-300`}
                    style={{ 
                      color: hoveredIndex === index ? '#FFFFFF' : event.color
                    }}
                  >
                    {event.year}
                  </div>

                  {/* Title with Slide Animation */}
                  <h3 
                    className={`text-xl font-bold mb-3 transition-all duration-300 ${
                      hoveredIndex === index ? 'opacity-100 translate-x-2' : 'opacity-90 translate-x-0'
                    }`}
                    style={{ 
                      color: event.color === '#FFFBFA' ? '#FFFFFF' : '#FFFFFF'
                    }}
                  >
                    {event.title}
                  </h3>

                  {/* Description with Fade */}
                  <p 
                    className={`text-base leading-relaxed transition-all duration-300`}
                    style={{
                      color: hoveredIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'
                    }}
                  >
                    {event.description}
                  </p>

                  {/* Interactive Indicator */}
                  <div 
                    className={`mt-6 flex items-center gap-2 transition-all duration-300 ${
                      hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    <div 
                      className="w-8 h-0.5 rounded-full"
                      style={{ backgroundColor: event.color }}
                    ></div>
                    
                  </div>

                  {/* Connection Line to Path - Remove this */}

                  {/* Animated Glow Effect */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 blur-3xl -z-10 ${
                      hoveredIndex === index ? 'opacity-30' : 'opacity-0'
                    }`}
                    style={{ backgroundColor: event.color }}
                  ></div>

                  {/* Ripple Effect on Hover */}
                  {hoveredIndex === index && (
                    <div 
                      className="absolute inset-0 animate-ping opacity-20"
                      style={{ 
                        backgroundColor: event.color,
                        animationDuration: '1.5s'
                      }}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default InteractiveTimeline;