"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`w-full py-4 mb-6 shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto flex items-center px-4 relative min-h-[48px]">
        {/* Logo and website name at far left */}
        <Link href="/" className="flex items-center group select-none absolute left-0 top-1/2 -translate-y-1/2" style={{ height: '100%' }} aria-label="cgblogs home">
          <span
            className="text-2xl font-extrabold bg-gradient-to-r from-green-600 via-lime-400 to-green-700 bg-clip-text text-transparent tracking-tight drop-shadow-sm group-hover:from-green-800 group-hover:to-lime-600 transition-colors duration-300"
            style={{ fontFamily: 'inherit', letterSpacing: '-0.03em' }}
          >
            cgblogs
          </span>
        </Link>
        {/* Desktop navigation links */}
        <div className="hidden md:flex gap-8 mx-auto">
          <Link href="/" className="font-semibold text-green-700 hover:underline" prefetch={false}>Home</Link>
          <Link href="/food" className="font-semibold text-green-700 hover:underline" prefetch={false}>Food Blog</Link>
          <Link href="/places" className="font-semibold text-green-700 hover:underline" prefetch={false}>Places Blog</Link>
          <Link href="/reviews" className="font-semibold text-green-700 hover:underline" prefetch={false}>Reviews</Link>
          <Link href="/events" className="font-semibold text-green-700 hover:underline" prefetch={false}>Events</Link>
        </div>
        {/* Mobile menu icon (hamburger/close) */}
        <button
          className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 focus:outline-none rounded-lg hover:bg-green-100 transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(v => !v)}
        >
          {mobileMenuOpen ? (
            /* X icon when menu is open */
            <svg
              className="w-7 h-7 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon when menu is closed */
            <svg
              className="w-7 h-7 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        {/* Mobile menu dropdown */}
        <div 
          className={`md:hidden absolute top-full right-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 z-50 flex flex-col border border-gray-200 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
        >
          <Link href="/" className="px-6 py-3 text-green-700 font-semibold hover:bg-green-50 border-l-4 border-transparent hover:border-green-500 transition-all duration-200" onClick={() => setMobileMenuOpen(false)} prefetch={false}>Home</Link>
          <Link href="/food" className="px-6 py-3 text-green-700 font-semibold hover:bg-green-50 border-l-4 border-transparent hover:border-green-500 transition-all duration-200" onClick={() => setMobileMenuOpen(false)} prefetch={false}>Food Blog</Link>
          <Link href="/places" className="px-6 py-3 text-green-700 font-semibold hover:bg-green-50 border-l-4 border-transparent hover:border-green-500 transition-all duration-200" onClick={() => setMobileMenuOpen(false)} prefetch={false}>Places Blog</Link>
          <Link href="/reviews" className="px-6 py-3 text-green-700 font-semibold hover:bg-green-50 border-l-4 border-transparent hover:border-green-500 transition-all duration-200" onClick={() => setMobileMenuOpen(false)} prefetch={false}>Reviews</Link>
          <Link href="/events" className="px-6 py-3 text-green-700 font-semibold hover:bg-green-50 border-l-4 border-transparent hover:border-green-500 transition-all duration-200" onClick={() => setMobileMenuOpen(false)} prefetch={false}>Events</Link>
        </div>
      </div>
    </nav>
  );
}
