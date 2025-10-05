import React, { useState } from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function DeepSeaFooter() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [bubbles, setBubbles] = useState([]);

  const createBubble = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setBubbles(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 1000);
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: '#60A5FA',url:'https://www.facebook.com/counciliste/?ref=br_rs' },
    { icon: Instagram, name: 'Instagram', color: '#F472B6',url:'https://www.instagram.com/istekjsse/?hl=en' },
    { icon: Mail, name: 'Email', color: '#22D3EE',url:'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=iste.engg@somaiya.edu' }
  ];

  return (
    <footer className="relative text-gray-300 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a1929, #020817)' }}>
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-1 h-1 bg-cyan-300 rounded-full top-1/4 left-1/4 animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-300 rounded-full top-1/3 right-1/3 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute w-1 h-1 bg-cyan-400 rounded-full bottom-1/3 left-1/2 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-2/3 right-1/4 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
      </div>

    
      

      {/* Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute w-3 h-3 bg-cyan-400 rounded-full opacity-60 pointer-events-none"
          style={{
            left: bubble.x,
            top: bubble.y,
            animation: 'rise 1s ease-out forwards'
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
         {/* Left Section - Logo Only */}
<div className="space-y-6">
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
      <img 
        src="https://istekjsce.com/New-Website/Images/logo.png" 
        alt="Logo" 
        className="w-full h-full rounded-full"
      />
    </div>
    <h3 className="text-2xl font-bold text-white">ISTE KJSSE</h3>
  </div>
</div>


          {/* Middle Section - Contact Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-start space-x-3">
              <MapPin size={20} className="text-cyan-400 mt-1 flex-shrink-0" />
              <span className="text-sm">K. J. Somaiya School of Engineering, VidyaVihar</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-cyan-400 flex-shrink-0" />
              <span className="text-sm">Tanish Shetty : +91 77000 48974</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-cyan-400 flex-shrink-0" />
              <span className="text-sm">Aditi Kanagala: +91 98204 93896</span>
            </div>
             <div className="flex items-center space-x-3">
              <Phone size={20} className="text-cyan-400 flex-shrink-0" />
              <span className="text-sm">Manav Parekh : +91 99876 46965</span>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div className="flex flex-col items-center space-y-4 text-center md:items-center">
            <h4 className="text-xl font-bold text-white">Follow Us</h4>
            <div className="flex justify-center space-x-4">
             {socialLinks.map(({ icon: Icon, name, color, url }) => (
  <a
    key={name}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={() => setHoveredIcon(name)}
    onMouseLeave={() => setHoveredIcon(null)}
    onClick={createBubble}
    className="relative p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 overflow-hidden"
    style={{
      background: 'rgba(15, 23, 42, 0.8)',
      border: '2px solid rgba(59, 130, 246, 0.3)',
      boxShadow: hoveredIcon === name ? `0 0 25px ${color}, 0 0 50px ${color}40` : '0 4px 6px rgba(0, 0, 0, 0.3)'
    }}
  >
    {/* Water fill effect with gradient */}
    <div 
      className="absolute inset-0 rounded-full transition-all ease-out"
      style={{
        background: `linear-gradient(to top, ${color} 0%, ${color}dd 50%, ${color}bb 100%)`,
        transform: hoveredIcon === name ? 'translateY(0%)' : 'translateY(100%)',
        transitionDuration: '800ms'
      }}
    />

    {hoveredIcon === name && (
      <>
        <div 
          className="absolute inset-x-0 rounded-full"
          style={{
            bottom: '45%',
            height: '30px',
            background: 'rgba(255, 255, 255, 0.15)',
            animation: 'wave 1.2s ease-in-out infinite',
            borderRadius: '50%'
          }}
        />
        <div 
          className="absolute inset-x-0 rounded-full"
          style={{
            bottom: '50%',
            height: '25px',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'wave 1.5s ease-in-out infinite',
            animationDelay: '0.3s',
            borderRadius: '50%'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: '30%',
            bottom: '20%',
            animation: 'bubbleRise 2s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-50"
          style={{
            left: '60%',
            bottom: '15%',
            animation: 'bubbleRise 2.5s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        />
      </>
    )}

    <Icon 
      size={22} 
      className="relative z-10 transition-all duration-300"
      style={{
        color: hoveredIcon === name ? 'white' : '#9CA3AF',
        filter: hoveredIcon === name ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
      }}
    />
    {hoveredIcon === name && (
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 px-3 py-1 rounded whitespace-nowrap z-20 border border-cyan-500">
        {name}
      </span>
    )}
  </a>
))}

            </div>
          </div>
        </div>

        {/* Bottom Section - Designer Credit */}
        <div className="relative pt-6 border-t border-gray-800">
          <div className="text-center text-sm">
            Designed by <span className="text-blue-500 font-semibold hover:text-cyan-400 transition-colors duration-300">ISTE KJSSE</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          25% {
            transform: translateY(-4px) scaleX(1.05);
          }
          50% {
            transform: translateY(-2px) scaleX(0.95);
          }
          75% {
            transform: translateY(-5px) scaleX(1.02);
          }
        }
        
        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-30px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-15px) rotate(var(--rotation, 0deg));
          }
        }
      `}</style>
    </footer>
  );
}