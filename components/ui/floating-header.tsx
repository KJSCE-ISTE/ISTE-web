'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Team', href: '#team' },
  { name: 'Contact Us', href: '#contact' },
];

export function FloatingHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the actual position of the target element
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      className="fixed z-50"
      initial={false}
      animate={{
        top: 24,
        left: isScrolled ? 24 : '50%',
        x: isScrolled ? 0 : '-50%',
        width: isScrolled ? 'auto' : '95%',
        maxWidth: isScrolled ? 'none' : '1280px',
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.nav
        className={cn(
          'relative rounded-2xl backdrop-blur-md',
          'border border-neutral-200/50',
          'bg-white/80',
          'shadow-lg shadow-neutral-900/5'
        )}
        layout
      >
        <motion.div
          className="flex items-center justify-between"
          animate={{
            paddingLeft: isScrolled ? '20px' : '32px',
            paddingRight: isScrolled ? '20px' : '32px',
            paddingTop: isScrolled ? '12px' : '20px',
            paddingBottom: isScrolled ? '12px' : '20px',
          }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Left side - Logos */}
          <div className="flex items-center pointer-events-auto">
            <div className="flex items-center">
              <motion.div
                className="relative h-12 w-12"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/iste-logo.png"
                  alt="ISTE Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              
              <AnimatePresence>
                {!isScrolled && (
                  <motion.div
                    className="relative h-12 w-12 ml-3"
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: 48, opacity: 1, marginLeft: 12 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src="/kjsse-logo.png"
                      alt="KJSSE Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {!isScrolled && (
                <>
                  <motion.div
                    className="hidden md:block h-10 bg-neutral-300 mx-4"
                    initial={{ width: 0, opacity: 0, marginLeft: 0, marginRight: 0 }}
                    animate={{ width: 1, opacity: 1, marginLeft: 16, marginRight: 16 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0, marginRight: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <motion.div
                    className="hidden md:block"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent whitespace-nowrap">
                      ISTE KJSSE
                    </h2>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Right side - Navigation */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                className="flex items-center gap-2 pointer-events-auto"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'relative px-5 py-3 rounded-lg text-lg font-medium',
                      'text-neutral-700 whitespace-nowrap',
                      'group'
                    )}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(245, 245, 245, 0.8)',
                      color: 'rgb(23, 23, 23)',
                    }}
                  >
                    {item.name}
                    <motion.span
                      className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subtle gradient border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neutral-200/20 via-neutral-300/20 to-neutral-200/20 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: !isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.nav>
    </motion.header>
  );
}