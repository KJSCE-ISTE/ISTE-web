"use client";
import React, { useState } from "react";
import { Send, Mail, User, Phone, MessageSquare } from "lucide-react";

export default function Footer(){
    return(
        <>
{/* Footer */}
  <footer className="relative z-20 w-full bg-white border-t border-gray-200 mt-8">

<div className="w-full px-4 sm:px-8 pt-24 pb-32">



          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left - Logo and Navigation */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <img src="/iste-logo.png" alt="ISTE LOGO"></img>
                </div>
                <h3 className="text-xl font-bold text-gray-900">ISTE KJSSE</h3>
              </div>
              <nav className="flex flex-wrap gap-2 text-sm text-gray-700">
                <a href="#home" className="hover:text-black transition-colors">Home</a>
                <span>|</span>
                <a href="#about" className="hover:text-black transition-colors">About Us</a>
                <span>|</span>
                <a href="#events" className="hover:text-black transition-colors">Events</a>
                <span>|</span>
                <a href="#gallery" className="hover:text-black transition-colors">Gallery</a>
                <span>|</span>
                <a href="#team" className="hover:text-black transition-colors">Team</a>
               
              </nav>
            </div>

            {/* Center - Contact Info */}
            <div className="space-y-6 text-gray-700 text-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>K. J. Somaiya School of Engineering, Vidyavihar</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>Tanish Shetty : +91 77000 48974</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>Aditi Kanagala: +91 98204 93896</span>
              </div>
            </div>

            {/* Right - Follow Us */}
            <div className="lg:text-center">
              <h4 className="text-lg font-bold mb-3 text-gray-900">
                Follow Us
              </h4>
              <div className="flex gap-3 lg:justify-center">
                <a href="https://www.facebook.com/counciliste/" className="w-10 h-10 bg-gray-100 text-gray-800 rounded flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/istekjsse/?hl=en" className="w-10 h-10 bg-gray-100 text-gray-800 rounded flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=iste.engg@somaiya.edu" className="w-10 h-10 bg-gray-100 text-gray-800 rounded flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
    
  <div className="text-center text-sm text-gray-500 pb-6">
    Made with love by  <a href="#home"><span className="font-bold text-blue-900 ">ISTE KJSCE</span></a>
  </div>
      </footer>
      </>
    );
}