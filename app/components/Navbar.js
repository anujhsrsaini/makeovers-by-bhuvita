'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';

const WHATSAPP_NUMBER = '917888808231';
const WA_NAV = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Bhuvita! I'm interested in booking makeup services. Could you share availability and details?"
)}`;

export default function Navbar({ showScrollProgress = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressBarRef = useRef(null);

  const pathname = usePathname() || '';
  const isHome = pathname === '/' || pathname.endsWith('/makeovers-by-bhuvita') || pathname.endsWith('/makeovers-by-bhuvita/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (showScrollProgress && progressBarRef.current) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollProgress]);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    if (isMenuOpen || servicesDropdownOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMenuOpen, servicesDropdownOpen]);

  const getAnchorHref = (anchor) => (isHome ? `#${anchor}` : `/#${anchor}`);
  const isRouteActive = (route) => pathname === route;

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-md py-2.5' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex flex-col group cursor-pointer"
            aria-label="Makeovers by Bhuvita - Return to homepage"
          >
            <span className="text-2xl sm:text-3xl font-script text-[#8B6F47] group-hover:text-[#725a38] transition-colors leading-tight">
              Makeovers by Bhuvita
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-500 font-sans -mt-1">
              Luxury Bridal Artistry &bull; Chandigarh
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isHome
                  ? 'bg-[#8B6F47]/10 text-[#8B6F47] font-semibold'
                  : 'text-gray-700 hover:text-[#8B6F47] hover:bg-gray-100/60'
              }`}
            >
              Home
            </Link>

            {/* Services & Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  pathname.includes('makeup')
                    ? 'bg-[#8B6F47]/10 text-[#8B6F47] font-semibold'
                    : 'text-gray-700 hover:text-[#8B6F47] hover:bg-gray-100/60'
                }`}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#8B6F47]' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1 w-64 z-50 animate-fadeIn">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#D4A574]/30 py-2 overflow-hidden">
                    <Link
                      href={getAnchorHref('services')}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="block px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-[#8B6F47]/10 hover:text-[#8B6F47] transition"
                    >
                      <span className="font-semibold text-gray-900 block">All Services &amp; Packages</span>
                      <span className="text-[11px] text-gray-500">Overview of bridal &amp; party rates</span>
                    </Link>
                    <div className="my-1 border-t border-gray-100" />
                    <Link
                      href="/bridal-makeup-chandigarh"
                      onClick={() => setServicesDropdownOpen(false)}
                      className={`block px-4 py-2 text-xs sm:text-sm transition ${
                        isRouteActive('/bridal-makeup-chandigarh')
                          ? 'bg-[#8B6F47]/15 text-[#8B6F47] font-semibold'
                          : 'text-gray-700 hover:bg-[#8B6F47]/10 hover:text-[#8B6F47]'
                      }`}
                    >
                      Bridal Makeup Chandigarh
                    </Link>
                    <Link
                      href="/makeup-artist-in-mohali"
                      onClick={() => setServicesDropdownOpen(false)}
                      className={`block px-4 py-2 text-xs sm:text-sm transition ${
                        isRouteActive('/makeup-artist-in-mohali')
                          ? 'bg-[#8B6F47]/15 text-[#8B6F47] font-semibold'
                          : 'text-gray-700 hover:bg-[#8B6F47]/10 hover:text-[#8B6F47]'
                      }`}
                    >
                      Makeup Artist in Mohali
                    </Link>
                    <Link
                      href="/makeup-artist-in-panchkula"
                      onClick={() => setServicesDropdownOpen(false)}
                      className={`block px-4 py-2 text-xs sm:text-sm transition ${
                        isRouteActive('/makeup-artist-in-panchkula')
                          ? 'bg-[#8B6F47]/15 text-[#8B6F47] font-semibold'
                          : 'text-gray-700 hover:bg-[#8B6F47]/10 hover:text-[#8B6F47]'
                      }`}
                    >
                      Makeup Artist in Panchkula
                    </Link>
                    <Link
                      href="/party-makeup-chandigarh"
                      onClick={() => setServicesDropdownOpen(false)}
                      className={`block px-4 py-2 text-xs sm:text-sm transition ${
                        isRouteActive('/party-makeup-chandigarh')
                          ? 'bg-[#8B6F47]/15 text-[#8B6F47] font-semibold'
                          : 'text-gray-700 hover:bg-[#8B6F47]/10 hover:text-[#8B6F47]'
                      }`}
                    >
                      Party Makeup Chandigarh
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href={getAnchorHref('portfolio')}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:text-[#8B6F47] hover:bg-gray-100/60 transition-all"
            >
              Portfolio
            </Link>

            <Link
              href="/pricing"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isRouteActive('/pricing')
                  ? 'bg-[#8B6F47]/10 text-[#8B6F47] font-semibold'
                  : 'text-gray-700 hover:text-[#8B6F47] hover:bg-gray-100/60'
              }`}
            >
              Pricing
            </Link>

            <Link
              href={getAnchorHref('real-brides')}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:text-[#8B6F47] hover:bg-gray-100/60 transition-all"
            >
              Real Brides
            </Link>

            <Link
              href={getAnchorHref('contact')}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 hover:text-[#8B6F47] hover:bg-gray-100/60 transition-all"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop WhatsApp CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={WA_NAV}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#1DA851] transition shadow-xs hover:shadow active:scale-95"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Book on WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-700 hover:text-[#8B6F47] focus:outline-none focus:ring-2 focus:ring-[#8B6F47] rounded-lg"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="unified-mobile-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Drawer */}
      <div
        id="unified-mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 ${
          isMenuOpen ? 'max-h-[32rem] opacity-100 py-3 shadow-lg' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-4 space-y-1">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium transition ${
              isHome ? 'bg-[#8B6F47]/10 text-[#8B6F47] font-semibold' : 'text-gray-700 hover:text-[#8B6F47] hover:bg-gray-50'
            }`}
          >
            Home
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-[#8B6F47] hover:bg-gray-50 transition"
            >
              <span>Services &amp; Locations</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-[#8B6F47]' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-50/70 rounded-lg my-1">
                <Link
                  href={getAnchorHref('services')}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm font-medium text-gray-800 hover:text-[#8B6F47]"
                >
                  All Services &amp; Packages
                </Link>
                <Link
                  href="/bridal-makeup-chandigarh"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm text-gray-600 hover:text-[#8B6F47]"
                >
                  Bridal Makeup Chandigarh
                </Link>
                <Link
                  href="/makeup-artist-in-mohali"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm text-gray-600 hover:text-[#8B6F47]"
                >
                  Makeup Artist in Mohali
                </Link>
                <Link
                  href="/makeup-artist-in-panchkula"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm text-gray-600 hover:text-[#8B6F47]"
                >
                  Makeup Artist in Panchkula
                </Link>
                <Link
                  href="/party-makeup-chandigarh"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm text-gray-600 hover:text-[#8B6F47]"
                >
                  Party Makeup Chandigarh
                </Link>
              </div>
            )}
          </div>

          <Link
            href={getAnchorHref('portfolio')}
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-[#8B6F47] hover:bg-gray-50 transition"
          >
            Portfolio
          </Link>

          <Link
            href="/pricing"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium transition ${
              isRouteActive('/pricing') ? 'bg-[#8B6F47]/10 text-[#8B6F47] font-semibold' : 'text-gray-700 hover:text-[#8B6F47] hover:bg-gray-50'
            }`}
          >
            Pricing &amp; Packages
          </Link>

          <Link
            href={getAnchorHref('real-brides')}
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-[#8B6F47] hover:bg-gray-50 transition"
          >
            Real Brides
          </Link>

          <Link
            href={getAnchorHref('contact')}
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-[#8B6F47] hover:bg-gray-50 transition"
          >
            Contact
          </Link>

          {/* Mobile WhatsApp CTA Button */}
          <div className="pt-3 border-t border-gray-100">
            <a
              href={WA_NAV}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white text-sm font-semibold py-2.5 rounded-full hover:bg-[#1DA851] transition shadow-xs"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Scroll Progress Bar along header bottom */}
      {showScrollProgress && (
        <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D4A574]/20 overflow-hidden" aria-hidden="true">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#8B6F47] to-[#D4A574] transition-all duration-75 ease-out"
            style={{ width: '0%' }}
          />
        </div>
      )}
    </header>
  );
}
