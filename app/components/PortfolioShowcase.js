"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, MessageCircle } from 'lucide-react';
import portfolioData from '../../public/portfolio/portfolio.json';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const getImagePath = (path) => `${basePath}${path}`;
const WHATSAPP_NUMBER = '917888808231';
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const portfolioMap = Object.fromEntries(portfolioData.map((item) => [item.id, item]));

export default function PortfolioShowcase({
  imageIds = [],
  title = "Curated Portfolio Showcase",
  subtitle = "Real brides and occasion looks crafted with precision and subtle artistry.",
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);

  // Selected images based on provided imageIds
  const items = imageIds
    .map((id) => portfolioMap[id])
    .filter(Boolean)
    .map((img) => ({
      ...img,
      url: getImagePath(`/portfolio/${img.file}`),
      fileBase: img.file.replace(/\.[^.]+$/, ''),
      webp800: getImagePath(`/portfolio/${img.file.replace(/\.[^.]+$/, '')}-800.webp`),
      webp1200: getImagePath(`/portfolio/${img.file.replace(/\.[^.]+$/, '')}-1200.webp`),
    }));

  const isOpen = lightboxIndex !== null && items[lightboxIndex] !== undefined;
  const currentItem = isOpen ? items[lightboxIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, items.length]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      // Swipe left -> next
      setLightboxIndex((prev) => (prev + 1) % items.length);
    } else if (diff < -50) {
      // Swipe right -> prev
      setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="text-center max-w-3xl mx-auto mb-10">
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-3">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-gray-600 text-base sm:text-lg">{subtitle}</p>}
        </div>
      )}

      {/* Grid of Portfolio Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${item.webp800} 800w, ${item.webp1200} 1200w`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <img
                  src={item.url}
                  alt={`${item.description} by Makeovers by Bhuvita`}
                  width={item.width || 800}
                  height={item.height || 1067}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </picture>

              {/* View pill overlay */}
              <div className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" aria-hidden="true" />
                <span>View Full</span>
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
                <span className="text-[11px] uppercase tracking-wider text-[#D4A574] font-semibold block mb-0.5">
                  {item.category}
                </span>
                <p className="font-playfair text-lg font-semibold leading-tight drop-shadow-xs">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image viewer"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close image preview"
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Prev button */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
              }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/75 transition-all z-20"
            >
              <ChevronLeft className="h-7 w-7" aria-hidden="true" />
            </button>
          )}

          {/* Active Image and Caption */}
          <div
            className="max-w-4xl max-h-[85vh] relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl max-h-[72vh] flex items-center justify-center">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${currentItem.webp800} 800w, ${currentItem.webp1200} 1200w`}
                  sizes="100vw"
                />
                <img
                  src={currentItem.url}
                  alt={`${currentItem.description} — Makeovers by Bhuvita`}
                  width={currentItem.width || 800}
                  height={currentItem.height || 1067}
                  className="max-h-[72vh] w-auto object-contain rounded-xl"
                />
              </picture>
            </div>

            {/* Bottom Caption bar with direct WhatsApp inquiry */}
            <div className="mt-3 w-full bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 border border-white/15">
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase tracking-widest text-[#D4A574] font-semibold block">
                  {currentItem.category} &bull; Look {lightboxIndex + 1} of {items.length}
                </span>
                <h3 className="text-base sm:text-lg font-playfair font-semibold">
                  {currentItem.description}
                </h3>
              </div>

              <a
                href={waLink(
                  `Hi Bhuvita! I loved this look: "${currentItem.description}" (Look #${currentItem.id}) from your portfolio. Could you share details for my wedding/event date?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#1DA851] transition-transform active:scale-95 shadow-md shrink-0"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Inquire About This Look</span>
              </a>
            </div>
          </div>

          {/* Next button */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % items.length);
              }}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-black/75 transition-all z-20"
            >
              <ChevronRight className="h-7 w-7" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
