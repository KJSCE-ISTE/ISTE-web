'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
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

  return (
    <header
      className={cn(
        'fixed z-50 transition-all duration-500 ease-in-out',
        isScrolled
          ? 'top-6 left-6'
          : 'top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl'
      )}
    >
      <nav
        className={cn(
          'relative rounded-2xl backdrop-blur-md transition-all duration-500 ease-in-out',
          'border border-neutral-200/50',
          'bg-white/80',
          'shadow-lg shadow-neutral-900/5'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500 ease-in-out',
            isScrolled ? 'px-5 py-3' : 'px-8 py-5'
          )}
        >
          {/* Left side - Logos */}
          <div className={cn('flex items-center pointer-events-auto', isScrolled ? 'gap-0' : 'gap-4')}>
            <div className={cn('flex items-center', isScrolled ? 'gap-0' : 'gap-3')}>
              <div className="relative h-12 w-12 transition-transform duration-200 hover:scale-105">
                <Image
                  src="/iste-logo.png"
                  alt="ISTE Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div
                className={cn(
                  'relative h-12 transition-all duration-500 ease-in-out hover:scale-105 overflow-hidden',
                  isScrolled ? 'w-0 opacity-0' : 'w-12 opacity-100'
                )}
              >
                <Image
                  src="/kjsse-logo.png"
                  alt="KJSSE Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div
              className={cn(
                'hidden md:block h-10 bg-neutral-300 transition-all duration-500 ease-in-out overflow-hidden',
                isScrolled ? 'w-0 opacity-0' : 'w-px opacity-100'
              )}
            />
            <div
              className={cn(
                'hidden md:block transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap',
                isScrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'
              )}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                ISTE KJSSE
              </h2>
            </div>
          </div>

          {/* Right side - Navigation */}
          <div
            className={cn(
              'flex items-center gap-2 pointer-events-auto transition-all duration-500 ease-in-out overflow-hidden',
              isScrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'
            )}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  'relative px-5 py-3 rounded-lg text-lg font-medium transition-all duration-200',
                  'text-neutral-700 whitespace-nowrap',
                  'hover:text-neutral-900',
                  'hover:bg-neutral-100/80',
                  'group'
                )}
              >
                {item.name}
                <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* Subtle gradient border effect */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl bg-gradient-to-r from-neutral-200/20 via-neutral-300/20 to-neutral-200/20 transition-opacity pointer-events-none',
            isScrolled ? 'opacity-0' : 'opacity-0 hover:opacity-100'
          )}
        />
      </nav>
    </header>
  );
}