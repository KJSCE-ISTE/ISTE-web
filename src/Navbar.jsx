import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">ISTE</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/our-story" className="nav-link">Our Story</Link></li>
          <li><Link to="/team" className="nav-link">Team</Link></li>
          
          {/* Dropdown */}
          <li 
            className="dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="nav-link dropdown-toggle">
              Events
              <ChevronDown className="chevron" />
            </button>
            
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/events/abhiyantriki" className="dropdown-item">Abhiyantriki</Link>
              <Link to="/events/prakalpa" className="dropdown-item">Prakalpa</Link>
              <Link to="/events/iday" className="dropdown-item">I-Day</Link>
              <Link to="/events/webinars" className="dropdown-item">Webinars/Seminars</Link>
              <Link to="/events/workshops" className="dropdown-item">Workshops</Link>
            </div>
          </li>

          <li><Link to="/gallery" className="nav-link">Gallery</Link></li>
          <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/our-story" onClick={closeMenu}>Our Story</Link>
        <Link to="/team" onClick={closeMenu}>Team</Link>
        
        <div className="mobile-dropdown">
          <button 
            className="mobile-dropdown-toggle"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Events
            <ChevronDown className={`chevron ${isDropdownOpen ? 'rotate' : ''}`} />
          </button>
          
          <div className={`mobile-dropdown-items ${isDropdownOpen ? 'show' : ''}`}>
            <Link to="/events/abhiyantriki" className="dropdown-item">Abhiyantriki</Link>
            <Link to="/events/prakalpa" className="dropdown-item">Prakalpa</Link>
            <Link to="/events/iday" className="dropdown-item">I-Day</Link>
            <Link to="/events/webinars" className="dropdown-item">Webinars/Seminars</Link>
            <Link to="/events/workshops" className="dropdown-item">Workshops</Link>
            

          </div>
        </div>

        <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
        <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
      </div>
    </nav>
  );
}