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
  return (
    <header
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out',
        'w-[95%] max-w-7xl'
      )}
    >
      <nav
        className={cn(
          'relative rounded-2xl backdrop-blur-md transition-all duration-300',
          'border border-neutral-200/50',
          'bg-white/80',
          'shadow-lg shadow-neutral-900/5',
        )}
      >
        <div className="flex items-center justify-between px-8 py-5">
          {/* Left side - Logos */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 transition-transform hover:scale-105">
                <Image
                  src="/iste-logo.png"
                  alt="ISTE Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative h-12 w-12 transition-transform hover:scale-105">
                <Image
                  src="/kjsse-logo.png"
                  alt="KJSSE Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="hidden md:block h-10 w-px bg-neutral-300" />
            <div className="hidden md:block">
              <h2 className="text-xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                ISTE KJSSE
              </h2>
            </div>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  'relative px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  'text-neutral-700',
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
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neutral-200/20 via-neutral-300/20 to-neutral-200/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      </nav>
    </header>
  );
}
