import React, { useState, useEffect } from 'react';

const isteLogo = '/ISTE logo for website.png';

const PrakalpaTemplate: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, delay: number }>>([]);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    academicYear: '',
    branch: '',
    category: ''
  });

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    const handleScroll = () => {
      const sections = ['home', 'themes', 'competitions', 'sponsors', 'contactus'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', registerData);
    alert('Registration successful! We will contact you soon.');
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      academicYear: '',
      branch: '',
      category: ''
    });
    setIsRegisterOpen(false);
  };

  const openRegisterPanel = (category: string) => {
    setRegisterData({ ...registerData, category });
    setIsRegisterOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Registration Slide-in Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-gradient-to-b from-gray-900 to-black border-l border-cyan-400/30 z-50 transform transition-transform duration-300 ease-in-out ${isRegisterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="h-full overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Register Now
            </h2>
            <button
              onClick={() => setIsRegisterOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {registerData.category && (
              <div className="mb-4 p-3 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
                <p className="text-sm text-cyan-400 font-medium">
                  Registering for: {registerData.category}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input
                type="text"
                required
                value={registerData.firstName}
                onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition-all"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                required
                value={registerData.lastName}
                onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition-all"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                required
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition-all"
                placeholder="+91 1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Academic Year</label>
              <select
                required
                value={registerData.academicYear}
                onChange={(e) => setRegisterData({ ...registerData, academicYear: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition-all"
              >
                <option value="">Select Year</option>
                <option value="first">First Year</option>
                <option value="second">Second Year</option>
                <option value="third">Third Year</option>
                <option value="fourth">Fourth Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Branch/Stream</label>
              <select
                required
                value={registerData.branch}
                onChange={(e) => setRegisterData({ ...registerData, branch: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition-all"
              >
                <option value="">Select Branch</option>
                <option value="cs">Computer Science</option>
                <option value="it">Information Technology</option>
                <option value="electronics">Electronics</option>
                <option value="mechanical">Mechanical</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-semibold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>

      {/* Overlay when registration panel is open */}
      {isRegisterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsRegisterOpen(false)}
        />
      )}

      {/* Animated Tech Background */}
      <div className="fixed inset-0 z-0">
        {/* Grid Lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />

        {/* Animated Scanning Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-scan"
            style={{ top: '20%', animationDuration: '4s' }} />
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70 animate-scan-reverse"
            style={{ top: '60%', animationDuration: '6s' }} />
        </div>

        {/* Floating Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
            }}
          />
        ))}

        {/* Animated Circuit Nodes */}
        <svg className="absolute inset-0 w-full h-full opacity-60">
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <circle
                cx={`${(i + 1) * 12}%`}
                cy="25%"
                r="4"
                fill="#ec4899"
                className="animate-pulse-node"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <circle
                cx={`${(i + 1) * 12}%`}
                cy="75%"
                r="4"
                fill="#06b6d4"
                className="animate-pulse-node"
                style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
              />
              {/* Connecting lines with animation */}
              <line
                x1={`${(i + 1) * 12}%`}
                y1="25%"
                x2={`${(i + 2) * 12}%`}
                y2="75%"
                stroke="#3b82f6"
                strokeWidth="2"
                opacity="0.3"
                className="animate-pulse-line"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            </g>
          ))}

          {/* Data Flow Packets */}
          {Array.from({ length: 5 }).map((_, i) => (
            <circle
              key={`packet-${i}`}
              r="3"
              fill="#10b981"
              className="animate-data-flow"
              style={{
                animationDelay: `${i * 1.5}s`,
                filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.9))'
              }}
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={`M ${20 + i * 15} 100 Q ${50 + i * 20} 300, ${80 + i * 10} 500 T ${100 + i * 15} 900`}
              />
            </circle>
          ))}
        </svg>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes scan-reverse {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-100vh); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-100px) translateX(50px); opacity: 1; }
        }
        @keyframes pulse-node {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; filter: drop-shadow(0 0 12px currentColor); }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; stroke-width: 3; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes data-flow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-scan {
          animation: scan linear infinite;
        }
        .animate-scan-reverse {
          animation: scan-reverse linear infinite;
        }
        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
        .animate-pulse-node {
          animation: pulse-node 2s ease-in-out infinite;
        }
        .animate-pulse-line {
          animation: pulse-line 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-data-flow {
          animation: data-flow 2s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
      `}} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* ISTE Logo Placeholder */}
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400/50 hover:border-cyan-400 transition-all bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center text-xs font-bold">
                ISTE
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                PRAKALPA
              </div>
            </div>
            <div className="flex gap-8">
              {['Home', 'Themes', 'Competitions', 'Sponsors', 'Contact us'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                  className={`text-sm font-medium transition-all duration-300 hover:text-cyan-400 relative ${activeSection === item.toLowerCase().replace(' ', '')
                      ? 'text-cyan-400'
                      : 'text-gray-300'
                    }`}
                >
                  {item}
                  {activeSection === item.toLowerCase().replace(' ', '') && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center z-10 max-w-5xl">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
            PRAKALPA
          </h1>
          <p className="text-2xl mb-4 text-gray-300 font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
            NATIONAL LEVEL PAPER PRESENTATION AND
          </p>
          <p className="text-2xl mb-8 text-gray-300 font-light animate-fade-in" style={{ animationDelay: '0.4s' }}>
            WORKING MODEL PROJECT COMPETITION
          </p>
          <h2 className="text-5xl font-bold mb-6 text-white animate-fade-in" style={{ animationDelay: '0.6s' }}>
            TECH<span className="text-cyan-400">XPO</span>
          </h2>
          <p className="text-xl mb-12 text-gray-400 italic animate-fade-in" style={{ animationDelay: '0.8s' }}>
            From Blueprint to Breakthrough
          </p>
          <div className="flex gap-6 justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <button
              onClick={() => openRegisterPanel('')}
              className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50"
            >
              REGISTER NOW
            </button>
            <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50">
              INFORMATION BROCHURE
            </button>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="themes" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full z-10">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Themes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI & Machine Learning', icon: '🤖' },
              { title: 'IoT & Embedded Systems', icon: '📡' },
              { title: 'Sustainable Technology', icon: '🌱' },
              { title: 'Robotics & Automation', icon: '⚙️' },
              { title: 'Blockchain & Web3', icon: '🔗' },
              { title: 'Healthcare Tech', icon: '🏥' }
            ].map((theme, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-cyan-400/30 rounded-xl hover:border-cyan-400 transition-all transform hover:scale-105 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{theme.icon}</div>
                <h3 className="text-xl font-semibold text-cyan-400">{theme.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section id="competitions" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full z-10">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Competitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Software Project */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-2 border-cyan-400/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-400/30 transition-all transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-6 text-cyan-400 text-center">Software Project</h3>

                {/* Image Placeholder */}
                <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20 h-48 flex items-center justify-center border border-cyan-400/30">
                  <div className="text-center">
                    <div className="text-6xl mb-2">💻</div>
                    <p className="text-cyan-400 font-semibold">SOFTWARE</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-white text-center font-semibold text-lg">
                    Registration Fees: Rs.1000/-
                  </p>
                  <p className="text-gray-300 text-center">
                    A maximum of 4 students are allowed in a team.
                  </p>
                  <p className="text-gray-300 text-center">
                    Same group with multiple entries in either project categories is not permitted.
                  </p>
                </div>

                <button
                  onClick={() => openRegisterPanel('Software Project')}
                  className="w-full py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-all transform hover:scale-105 text-lg"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>

            {/* Hardware Project */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-2 border-cyan-400/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-400/30 transition-all transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-6 text-cyan-400 text-center">Hardware Project</h3>

                {/* Image Placeholder */}
                <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20 h-48 flex items-center justify-center border border-cyan-400/30">
                  <div className="text-center">
                    <div className="text-6xl mb-2">⚙️</div>
                    <p className="text-cyan-400 font-semibold">HARDWARE</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-white text-center font-semibold text-lg">
                    Registration Fees: Rs.1000/-
                  </p>
                  <p className="text-gray-300 text-center">
                    A maximum of 4 students are allowed in a group.
                  </p>
                  <p className="text-gray-300 text-center">
                    Same group with multiple entries in either project categories is not permitted.
                  </p>
                </div>

                <button
                  onClick={() => openRegisterPanel('Hardware Project')}
                  className="w-full py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-all transform hover:scale-105 text-lg"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>

            {/* Paper Presentation */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-2 border-cyan-400/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-400/30 transition-all transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-6 text-cyan-400 text-center">Paper Presentation</h3>

                {/* Image Placeholder */}
                <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-500/20 h-48 flex items-center justify-center border border-cyan-400/30">
                  <div className="text-center">
                    <div className="text-6xl mb-2">📄</div>
                    <p className="text-cyan-400 font-semibold">PRESENTATION</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-white text-center font-semibold text-lg">
                    Registration Fees: Rs.1000/-
                  </p>
                  <p className="text-gray-300 text-center">
                    A maximum of 4 students are allowed in a group.
                  </p>
                  <p className="text-gray-300 text-center">
                    Same group with multiple entries in either project categories is not permitted.
                  </p>
                </div>

                <button
                  onClick={() => openRegisterPanel('Paper Presentation')}
                  className="w-full py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-all transform hover:scale-105 text-lg"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contactus" className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full z-10">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-cyan-400/30 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Event Coordinators</h3>
                <div className="space-y-3 text-gray-300">
                  <p>📧 Email: </p>
                  <p>📱 Phone: </p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-400/30 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-pink-400/20 transition-all">
                <h3 className="text-xl font-semibold mb-4 text-pink-400">Venue</h3>
                <p className="text-gray-300">
                  K J Somaiya School of Engineering<br />
                  Mumbai, Maharashtra
                </p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-cyan-400/30 rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/20 transition-all">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Quick Inquiry</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData
                    ({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition-all"
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none text-white resize-none transition-all"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-semibold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative border-t border-cyan-400/20 py-8 px-6 z-10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© PRAKALPA - K J Somaiya College of Engineering. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default PrakalpaTemplate;