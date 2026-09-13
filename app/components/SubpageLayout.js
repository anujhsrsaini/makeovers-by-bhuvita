'use client';

import React from 'react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import BackToTopButton from './BackToTopButton';

export default function SubpageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-gray-800">
      {/* Skip link for a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-[#8B6F47] focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Unified Sticky Header / Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        {children}
      </main>

      {/* Unified Luxury Footer */}
      <Footer />

      {/* Floating Action Controls */}
      <FloatingWhatsApp />
      <BackToTopButton />
    </div>
  );
}
