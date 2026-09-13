import React from 'react';
import Link from 'next/link';
import SubpageLayout from './components/SubpageLayout';

export default function NotFound() {
  return (
    <SubpageLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          <p className="font-script text-3xl text-[#8B6F47] mb-4">
            Makeovers by Bhuvita
          </p>
          <p className="text-7xl font-bold text-[#D4A574] mb-4" aria-hidden="true">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-[#5C4033] mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Explore our bridal portfolio or return home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#8B6F47] hover:bg-[#725a38] text-white font-semibold transition-all shadow-sm active:scale-95 text-sm"
            >
              Back to Home
            </Link>
            <a
              href="https://wa.me/917888808231?text=Hi%20Bhuvita!%20I%27m%20looking%20for%20bridal/party%20makeup."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold transition-all shadow-sm active:scale-95 text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
}
