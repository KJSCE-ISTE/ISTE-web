import './Header.css';
import { useState } from 'react';
import isteLogo from '/logo.png';
import collegeLogo from '/college-logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  return (
    <header className="cloud-header">
      <div className="header-content">
        <div className="right-logos">
          <a href="/">
            <img src={isteLogo} alt="ISTE Logo" className="logo1" />
          </a>
          <img src={collegeLogo} alt="College Logo" className="logo2" />
        </div>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-links ${menuOpen ? 'mobile-active' : ''}`}>
          <a href="/"><span>Home</span></a>
          <a href="https://istekjsce.com/New-Website/our-story.html"><span>Our Story</span></a>
          <a href="https://istekjsce.com/New-Website/team.html"><span>Team</span></a>

          {/* Events dropdown as button */}
          <div className="dropdown">
            <button
              className={`events-btn ${eventsOpen ? 'open' : ''}`}
              onClick={() => setEventsOpen(!eventsOpen)}
            >
              <span>Events</span><span className="arrow">{eventsOpen ? '▲' : '▼'}</span>
            </button>
            <div className={`dropdown-content ${eventsOpen ? 'active' : ''}`}>
              <a href="https://istekjsce.com/New-Website/abhiyantriki.html">Abhiyantriki</a>
              <a href="https://istekjsce.com/New-Website/prakalap.html">Prakalpa</a>
              <a href="https://istekjsce.com/New-Website/workshop.html">Workshops</a>
              <a href="https://istekjsce.com/New-Website/seminar.html">Seminars/Webinars</a>
              <a href="https://istekjsce.com/New-Website/iday.html">I-Day</a>
            </div>
          </div>

          <a href="https://istekjsce.com/New-Website/gallery.html"><span>Gallery</span></a>
          <a href="#contact"><span>Contact Us</span></a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
