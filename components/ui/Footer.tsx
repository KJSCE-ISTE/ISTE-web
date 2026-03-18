"use client";
import React from "react";
import { Mail, Phone, MapPin, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-zinc-950 text-white overflow-hidden mt-8 border-t border-white/10">

      {/* Abstract Background Glows */}
      <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-50%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Section (Span 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                {/* Ensure your image path is correct */}
                <img src="/iste-logo.png" alt="ISTE LOGO" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">ISTE KJSSE</h3>
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Student Chapter</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Empowering engineering students through technical excellence, innovation, and leadership at K. J. Somaiya School of Engineering.
            </p>
          </div>

          {/* Navigation (Span 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#home" className="hover:text-blue-400 transition-colors flex items-center gap-2">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors flex items-center gap-2">About Us</a></li>
              <li><a href="#events" className="hover:text-blue-400 transition-colors flex items-center gap-2">Events</a></li>
              <li><a href="#gallery" className="hover:text-blue-400 transition-colors flex items-center gap-2">Gallery</a></li>
              <li><a href="#team" className="hover:text-blue-400 transition-colors flex items-center gap-2">The Team</a></li>
            </ul>
          </div>

          {/* Contact Info (Span 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>K. J. Somaiya School of Engineering,<br />Vidyavihar, Mumbai</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="hover:text-white transition-colors">Tanish Shetty: +91 77000 48974</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="hover:text-white transition-colors">Aditi Kanagala: +91 98204 93896</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="hover:text-white transition-colors">Manav Parekh: +91 99876 46965</span>
              </li>
            </ul>
          </div>

          {/* Socials (Span 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Connect</h4>
            <div className="flex gap-3">
              <SocialLink href="https://www.facebook.com/counciliste/" label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/istekjsse/?hl=en" label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </SocialLink>
              <SocialLink href="mailto:iste.engg@somaiya.edu" label="Email">
                <Mail className="w-5 h-5" />
              </SocialLink>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=iste.engg@somaiya.edu" className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
                <span>Send us a message</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} ISTE KJSSE. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-zinc-500 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-blue-500 fill-blue-500 mx-0.5" />
            <span>by</span>
            <a href="#home" className="text-blue-400 hover:text-blue-300 transition-colors font-medium ml-1">ISTE Council</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
    >
      {children}
    </a>
  );
}
