"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Instagram, MessageCircle, Phone, Star, ChevronLeft, ChevronRight, ChevronDown, Calendar, Palette, Heart, Clock, Sparkles, ArrowUp, MapPin, Car, Building2, Plane, CheckCircle2, Info } from 'lucide-react';
import portfolioData from '../public/portfolio/portfolio.json';
import { faqs } from './faq-data';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTopButton from './components/BackToTopButton';

// ---------------------------------------------------------------------------
// Module-scope constants & helpers (created once, not per render)
// ---------------------------------------------------------------------------

// Helper function for image paths — basePath single-sourced from next.config.mjs
const getImagePath = (path) => (process.env.NEXT_PUBLIC_BASE_PATH || '') + path;

const WHATSAPP_NUMBER = '917888808231';
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const WA_GENERAL = waLink("Hi Bhuvita! I'm looking for bridal makeup on [date] at [venue/city]. Could you share availability and details?");
const INSTAGRAM_URL = 'https://www.instagram.com/makeoversbybhuvita';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Makeovers+by+Bhuvita+Sector+37A+Chandigarh';

const portfolioSections = [
  {
    id: 'bridal',
    category: 'Bridal Looks',
    title: 'Bridal Looks',
    tagline: 'Signature Wedding Day Elegance',
    description: 'Subtle, skin-like bridal makeup enhancing natural features with royal lehengas, jewelry setting & bridal dupattas.',
    priceBadge: 'From ₹22,000',
    priceTargetId: 'services',
  },
  {
    id: 'haldi-mehendi',
    category: 'Haldi & Mehendi',
    title: 'Haldi & Mehendi',
    tagline: 'Colourful Eye Makeup & Floral Styling',
    description: 'Playful vibrant eye artistry, dewy radiant glow, and bespoke floral hairdos designed for daytime festivities.',
    priceBadge: 'From ₹9,000',
    priceTargetId: 'services',
  },
  {
    id: 'engagement-reception',
    category: 'Engagement & Reception',
    title: 'Engagement & Reception',
    tagline: 'Gowns & Contemporary Evening Glam',
    description: 'Sculpted elegance and contemporary tones curated for western silhouettes, cocktail gowns, and ring ceremonies.',
    priceBadge: 'From ₹15,000',
    priceTargetId: 'services',
  },
  {
    id: 'party-makeup',
    category: 'Party Makeup',
    title: 'Party Makeup',
    tagline: 'Cocktails, Sangeet & Bridesmaids',
    description: 'Camera-ready HD finish, glamorous eyes, and chic hair styling for bridesmaids, family members, and party guests.',
    priceBadge: 'From ₹4,000',
    priceTargetId: 'services',
  },
];

// webp variants per image-pipeline contract: {id}-800.webp / {id}-1200.webp / {id}-thumb.webp
const fileBase = (file) => file.replace(/\.[^.]+$/, '');
const portfolioImages = portfolioData.map((img) => ({
  ...img,
  url: getImagePath(`/portfolio/${img.file}`),
  srcSet: `${getImagePath(`/portfolio/${fileBase(img.file)}-800.webp`)} 800w, ${getImagePath(`/portfolio/${fileBase(img.file)}-1200.webp`)} 1200w`,
  alt: `${img.description} — bridal makeup by Makeovers by Bhuvita, Chandigarh`,
}));

const portfolioById = Object.fromEntries(portfolioData.map((p) => [p.id, p]));
const IG_TEASER_IDS = [5, 11, 17, 24, 30, 36];

const services = {
  tiers: {
    venue: {
      id: 'venue',
      name: 'On-Venue (Tricity)',
      label: 'On-Venue (Tricity)',
      subtext: 'Chandigarh, Mohali, Panchkula, Zirakpur & Kharar',
      coverageNote: 'Doorstep luxury service at your home, hotel suite, or wedding banquet venue with professional vanity setup.',
      items: [
        {
          id: 'bridal',
          title: 'Bridal Makeup',
          carouselId: 'carousel-bridal',
          badge: 'Most Requested',
          isDual: true,
          options: [
            { name: 'Signature Bridal', price: '₹25,000', note: 'Skin-like HD radiant finish' },
            { name: 'Luxury Waterproof', price: '₹30,000', note: 'Tear-proof, 16h+ ultra-long wear' },
          ],
          features: [
            'Full Makeup Application & Bridal Hair Styling',
            'Zero-power lenses & premium lashes included',
            'Jewellery setting & dupatta draping included',
            'Signature HD or Luxury Waterproof base',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book On-Venue Bridal Makeup (₹25,000 / ₹30,000) in Tricity. My wedding date: [date], venue: [venue/city].",
        },
        {
          id: 'haldi-mehendi',
          title: 'Haldi & Mehendi',
          carouselId: 'carousel-haldi-mehendi',
          badge: 'Vibrant Eyes & Florals',
          isDual: false,
          price: '₹12,000',
          priceUnit: 'per function',
          features: [
            'Colourful Eye Makeup & bespoke floral styling',
            'Fresh, dewy & sweat-resistant skin base',
            'Zero-power lenses & premium lashes included',
            'Festive outfit & dupatta draping included',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book On-Venue Haldi & Mehendi makeup (₹12,000). My date: [date], venue: [venue/city].",
        },
        {
          id: 'engagement-reception',
          title: 'Engagement & Reception',
          carouselId: 'carousel-engagement-reception',
          badge: 'Gowns & Evening Glam',
          subtitleNote: 'Also covers Roka, Sangeet & Cocktail',
          isDual: false,
          price: '₹18,000',
          priceUnit: 'per function',
          features: [
            'Sculpted glam for western gowns & ring ceremonies',
            'Hollywood glamour waves & modern updos',
            'Zero-power lenses & premium lashes included',
            'Gown / lehenga draping & jewellery setting',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book On-Venue Engagement / Reception Makeup (₹18,000). My date: [date], venue: [venue/city].",
        },
        {
          id: 'party-makeup',
          title: 'Party Makeup',
          carouselId: 'carousel-party-makeup',
          badge: 'Bridesmaids & Family',
          isDual: false,
          price: '₹6,000',
          priceUnit: 'per person (min. 2)',
          features: [
            'Flawless HD skin-like camera finish',
            'Full hairstyle of choice included',
            'Zero-power lenses & lashes included',
            'Outfit draping & jewellery setting included',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book On-Venue HD Party Makeup (₹6,000/person, min 2). My date: [date], venue: [venue/city], persons: [count].",
        },
      ],
    },
    studio: {
      id: 'studio',
      name: 'At Studio (Sector 37A)',
      label: 'At Studio (Sector 37A)',
      subtext: 'Sector 37A, Chandigarh — Dedicated Private Makeup Suite',
      coverageNote: 'Relax in Bhuvita’s private Sector 37A studio with professional vanity ring lights & dedicated bridal mirror setup.',
      items: [
        {
          id: 'bridal',
          title: 'Bridal Makeup',
          carouselId: 'carousel-bridal',
          badge: 'Studio Signature',
          isDual: true,
          options: [
            { name: 'Signature Bridal', price: '₹22,000', note: 'Skin-like HD finish' },
            { name: 'Luxury Waterproof', price: '₹27,000', note: 'Tear-proof waterproof formula' },
          ],
          features: [
            'Full Makeup Application & Bridal Hair Styling',
            'Zero-power lenses & premium lashes included',
            'Jewellery setting & dupatta draping included',
            'Private studio suite with vanity lighting',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book Studio Bridal Makeup (₹22,000 / ₹27,000) at Sector 37A Chandigarh. My wedding date: [date].",
        },
        {
          id: 'haldi-mehendi',
          title: 'Haldi & Mehendi',
          carouselId: 'carousel-haldi-mehendi',
          badge: 'Vibrant Artistry',
          isDual: false,
          price: '₹9,000',
          priceUnit: 'per function',
          features: [
            'Colourful Eye Makeup & bespoke floral styling',
            'Dewy, fresh & radiant skin base',
            'Zero-power lenses & premium lashes included',
            'Outfit & dupatta draping included',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book Studio Haldi & Mehendi makeup (₹9,000) at Sector 37A Chandigarh. My date: [date].",
        },
        {
          id: 'engagement-reception',
          title: 'Engagement & Reception',
          carouselId: 'carousel-engagement-reception',
          badge: 'Evening Glam',
          subtitleNote: 'Also covers Roka, Sangeet & Cocktail',
          isDual: false,
          price: '₹15,000',
          priceUnit: 'per function',
          features: [
            'Sculpted glam for gowns & evening silhouettes',
            'Modern hairstyles / Hollywood curls',
            'Zero-power lenses & premium lashes included',
            'Gown / outfit draping & jewellery setting',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book Studio Engagement / Reception Makeup (₹15,000) at Sector 37A Chandigarh. My date: [date].",
        },
        {
          id: 'party-makeup',
          title: 'Party Makeup',
          carouselId: 'carousel-party-makeup',
          badge: 'Basic & HD Available',
          isDual: true,
          options: [
            { name: 'Basic Party Makeup', price: '₹4,000', note: 'Straightening or curls' },
            { name: 'HD Party Makeup', price: '₹5,000', note: 'Full hairstyle & HD finish' },
          ],
          features: [
            'Camera-ready HD skin finish',
            'Hairstyle (curls/straight or advanced styling)',
            'Zero-power lenses & lashes included',
            'Outfit draping & jewellery setting included',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book Studio Party Makeup (Basic ₹4,000 / HD ₹5,000) at Sector 37A Chandigarh. My date: [date].",
        },
      ],
    },
    outstation: {
      id: 'outstation',
      name: 'Outstation',
      label: 'Outstation (Outside Tricity)',
      subtext: 'Punjab, Haryana, Himachal, Delhi-NCR & Destination Weddings',
      coverageNote: 'On-venue destination artistry outside Chandigarh Tricity. Travel and accommodation charged at actuals.',
      items: [
        {
          id: 'bridal',
          title: 'Bridal Makeup',
          carouselId: 'carousel-bridal',
          badge: 'Destination Bridal',
          isDual: true,
          options: [
            { name: 'Signature Bridal', price: '₹35,000', note: 'Skin-like HD finish' },
            { name: 'Luxury Waterproof', price: '₹40,000', note: 'Tear-proof waterproof formula' },
          ],
          features: [
            'Full Makeup Application & Bridal Hair Styling',
            'Zero-power lenses & premium lashes included',
            'Jewellery setting & dupatta draping included',
            'Dedicated single-event focus on your big day',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book Outstation Bridal Makeup (₹35,000 / ₹40,000). My wedding date: [date], destination city/venue: [city/venue].",
        },
        {
          id: 'haldi-mehendi',
          title: 'Haldi & Mehendi',
          carouselId: 'carousel-haldi-mehendi',
          badge: 'Festive Destination',
          isDual: false,
          price: '₹15,000',
          priceUnit: 'per function',
          features: [
            'Colourful Eye Makeup & bespoke floral styling',
            'Dewy long-lasting camera-ready base',
            'Zero-power lenses & premium lashes included',
            'Outfit & dupatta draping included',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book Outstation Haldi & Mehendi makeup (₹15,000). My date: [date], destination: [city/venue].",
        },
        {
          id: 'engagement-reception',
          title: 'Engagement & Reception',
          carouselId: 'carousel-engagement-reception',
          badge: 'Gowns & Cocktails',
          subtitleNote: 'Also covers Roka, Sangeet & Cocktail',
          isDual: false,
          price: '₹22,000',
          priceUnit: 'per function',
          features: [
            'Sculpted glam for gowns & evening silhouettes',
            'Hollywood waves & modern hairstyles',
            'Zero-power lenses & premium lashes included',
            'Gown / lehenga draping & jewellery setting',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book Outstation Engagement / Reception Makeup (₹22,000). My date: [date], destination: [city/venue].",
        },
        {
          id: 'party-makeup',
          title: 'Party Makeup',
          carouselId: 'carousel-party-makeup',
          badge: 'HD Party',
          isDual: false,
          price: '₹7,000',
          priceUnit: 'per person',
          features: [
            'Camera-ready HD party finish',
            'Complete modern hairstyling',
            'Zero-power lenses & lashes included',
            'Outfit draping & jewellery setting included',
          ],
          whatsapptext: "Hi Bhuvita! I'd like to book Outstation HD Party Makeup (₹7,000/person). My date: [date], destination: [city/venue], persons: [count].",
        },
      ],
    },
  },
  inclusions: [
    { title: 'Full Makeup Application', desc: 'Customized luxury base for your skin tone & type' },
    { title: 'Hairstyling Included', desc: 'Bridal buns, Hollywood waves, braids or curls' },
    { title: 'Zero-Power Lens', desc: 'Enhance your eye look comfortably with lenses' },
    { title: 'Premium Eyelashes', desc: 'Featherweight, natural-to-glam flutter lashes' },
    { title: 'Jewellery Setting', desc: 'Secure matha patti, passaa, earrings & necklace pinning' },
    { title: 'Dupatta Draping', desc: 'Single or double dupatta pleating & locking' },
  ],
  exclusions: [
    'Hair Extensions (client provides or available at actuals)',
    'Hair Accessories & Embellishments',
    'Fresh Flowers (Gajras / Floral accents)',
  ],
  addOns: [
    { title: 'Saree Draping', price: '₹500', desc: 'Precision pleating, pallu setting & pinning for guests & family' },
  ],
};

// Verified stats only (MASTER_PLAN §2 / §6.0)
const stats = [
  { target: 200, suffix: '+', label: 'Happy Brides' },
  { target: 5, suffix: '+', label: 'Years Experience' },
  { target: 5000, suffix: '+', label: 'Instagram Community' },
  { target: 750, suffix: '+', label: 'Bridal Looks Shared' },
];
const STAT_TARGETS = stats.map((s) => s.target);

const trustBadges = [
  { icon: Star, label: "UV Ghai Certified MUA" },
  { icon: Sparkles, label: "Specialised in Subtle, Skin-Like Makeup" },
  { icon: Palette, label: "MAC, Bobbi Brown, Charlotte Tilbury, Huda Beauty & NARS Products" },
  { icon: Heart, label: "Hygiene First" },
  { icon: Clock, label: "Always On Time" },
];

const processSteps = [
  { icon: MessageCircle, title: "Consultation", desc: "Share your date, functions, outfits and inspiration on WhatsApp" },
  { icon: Palette, title: "Trial Session", optional: true, desc: "Optional paid trial to finalise your exact look before the big day" },
  { icon: Calendar, title: "Wedding Day", desc: "Relax while we create your dream bridal look on-site" },
  { icon: Heart, title: "Your Perfect Look", desc: "Walk down the aisle feeling confident and absolutely stunning" },
];

// FAQ content lives in app/faq-data.js so the visible FAQ and the FAQPage
// JSON-LD in layout.js can never drift apart.

// ---------------------------------------------------------------------------
// Small components
// ---------------------------------------------------------------------------

// Custom hook for scroll-triggered animations
function useInView(ref) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isInView;
}

// SVG Wave Divider component
const WaveDivider = ({ to = '#ffffff', flip = false }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ marginTop: '-1px', marginBottom: '-1px' }} aria-hidden="true">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]" fill={to}>
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6.01,68.85-16.01,106.8-23.03,43.16-7.98,88.26-10.99,134-7.13,41.58,3.51,83.64,12.32,123.8,25.03V0Z" opacity=".25" />
      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
    </svg>
  </div>
);

// ---------------------------------------------------------------------------
// Luxury 3D Spotlight Infinite Carousel for Each Occasion
// ---------------------------------------------------------------------------

function InfiniteSpotlightCarousel({ section, images, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);
  const total = images.length;

  // When total === 2, create a 4-item circular loop so left, center, right always exist
  const displayItems = total === 2 ? [...images, ...images] : images;
  const displayTotal = displayItems.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % displayTotal);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + displayTotal) % displayTotal);

  // Keyboard navigation when stage is focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current > 40) {
      prev();
    } else if (touchDeltaX.current < -40) {
      next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  // Helper to compute circular relative offset (-displayTotal/2 to +displayTotal/2)
  const getOffset = (index) => {
    let diff = (index - currentIndex) % displayTotal;
    if (diff > displayTotal / 2) diff -= displayTotal;
    if (diff < -displayTotal / 2) diff += displayTotal;
    return diff;
  };

  return (
    <div
      id={`carousel-${section.id}`}
      className="scroll-mt-24 pt-4 pb-12 border-b border-[#D4A574]/20 last:border-b-0"
    >
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8B6F47]">
              {section.tagline}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900">
            {section.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-2xl">
            {section.description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`#${section.priceTargetId || 'services'}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white border border-[#D4A574]/60 text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all shadow-sm group hover-glow"
          >
            <span>Pricing: {section.priceBadge}</span>
            <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </a>

          {/* Quick arrow controls in header */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={prev}
              aria-label={`Previous ${section.title} look`}
              className="w-9 h-9 rounded-full bg-white border border-[#D4A574]/40 shadow-sm flex items-center justify-center text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all hover:scale-105 active-press cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={`Next ${section.title} look`}
              className="w-9 h-9 rounded-full bg-white border border-[#D4A574]/40 shadow-sm flex items-center justify-center text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all hover:scale-105 active-press cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Spotlight Stage */}
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label={`${section.title} 3D spotlight carousel`}
        className="relative w-full max-w-5xl mx-auto h-[440px] sm:h-[500px] md:h-[560px] flex items-center justify-center overflow-hidden my-4 select-none focus:outline-none focus:ring-2 focus:ring-[#8B6F47]/40 rounded-3xl"
      >
        {/* Stage ambient spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none bg-radial from-[#D4A574]/15 via-transparent to-transparent blur-3xl opacity-70"
          aria-hidden="true"
        />

        {/* Floating Left Nav Arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous look"
          className="absolute left-2 sm:left-4 md:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#8B6F47] text-[#8B6F47] hover:text-white backdrop-blur-md shadow-xl border border-[#D4A574]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active-press cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Floating Right Nav Arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Next look"
          className="absolute right-2 sm:right-4 md:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-[#8B6F47] text-[#8B6F47] hover:text-white backdrop-blur-md shadow-xl border border-[#D4A574]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 active-press cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Render Cards with exact 3D positioning */}
        {displayItems.map((img, index) => {
          const offset = getOffset(index);
          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isVisible = isCenter || isLeft || isRight;

          let cardStyle = {};
          if (isCenter) {
            cardStyle = {
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 1,
              zIndex: 30,
              cursor: 'pointer',
            };
          } else if (isLeft) {
            cardStyle = {
              transform: 'translate(calc(-50% - 76%), -50%) scale(0.85)',
              opacity: 0.6,
              zIndex: 20,
              cursor: 'pointer',
            };
          } else if (isRight) {
            cardStyle = {
              transform: 'translate(calc(-50% + 76%), -50%) scale(0.85)',
              opacity: 0.6,
              zIndex: 20,
              cursor: 'pointer',
            };
          } else if (offset === -2) {
            cardStyle = {
              transform: 'translate(calc(-50% - 130%), -50%) scale(0.7)',
              opacity: 0,
              zIndex: 10,
              pointerEvents: 'none',
            };
          } else if (offset === 2) {
            cardStyle = {
              transform: 'translate(calc(-50% + 130%), -50%) scale(0.7)',
              opacity: 0,
              zIndex: 10,
              pointerEvents: 'none',
            };
          } else {
            cardStyle = {
              transform: offset < 0 ? 'translate(calc(-50% - 160%), -50%) scale(0.6)' : 'translate(calc(-50% + 160%), -50%) scale(0.6)',
              opacity: 0,
              zIndex: 0,
              pointerEvents: 'none',
            };
          }

          return (
            <div
              key={`${img.id}-${index}`}
              onClick={() => {
                if (isCenter) {
                  onImageClick(images, index % total);
                } else if (isLeft) {
                  prev();
                } else if (isRight) {
                  next();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (isCenter) onImageClick(images, index % total);
                  else if (isLeft) prev();
                  else if (isRight) next();
                }
              }}
              tabIndex={isCenter ? 0 : -1}
              role="button"
              aria-label={
                isCenter
                  ? `Active look: ${img.description}. Press Enter to view full screen.`
                  : `Look ${(index % total) + 1}: ${img.description}. Click to bring into focus.`
              }
              aria-hidden={!isVisible}
              style={cardStyle}
              className={`absolute top-1/2 left-1/2 w-[240px] sm:w-[300px] md:w-[350px] aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 ease-out group ${
                isCenter
                  ? 'shadow-2xl shadow-[#8B6F47]/30 ring-2 ring-[#D4A574]/60'
                  : 'shadow-lg hover:opacity-90'
              }`}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={img.srcSet}
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 310px, 360px"
                />
                <img
                  src={img.url}
                  alt={img.alt}
                  width={img.width || 800}
                  height={img.height || 1067}
                  loading={isVisible ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                    isCenter ? 'group-hover:scale-105' : ''
                  }`}
                />
              </picture>

              {/* Center Look Badges & Overlay */}
              {isCenter && (
                <>
                  {/* Expand Full Screen Pill */}
                  <div className="absolute top-3.5 right-3.5 bg-black/45 hover:bg-black/65 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-white/20 transition-all">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" aria-hidden="true" />
                    <span>View Full</span>
                  </div>

                  {/* Counter Pill */}
                  <div className="absolute top-3.5 left-3.5 bg-black/45 backdrop-blur-md text-white/90 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md border border-white/10">
                    {(currentIndex % total) + 1} / {total}
                  </div>

                  {/* Bottom glassmorphic description */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-12 pb-5 px-5 text-white">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#D4A574] block mb-0.5">
                      {img.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-playfair font-semibold leading-snug drop-shadow-sm">
                      {img.description}
                    </h4>
                    <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                      <span>Tap to view in full resolution</span>
                      <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </>
              )}

              {/* Side cards dimming mask */}
              {!isCenter && (
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Track & Pagination Indicator */}
      <div className="flex flex-col items-center justify-center mt-3">
        <div className="text-xs font-medium text-[#8B6F47] tracking-wider mb-2">
          Look <span className="font-bold text-gray-900">{(currentIndex % total) + 1}</span> of <span className="text-gray-600">{total}</span>
        </div>

        {/* Interactive Dash Track */}
        <div
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F5] border border-[#D4A574]/30 shadow-xs max-w-full overflow-x-auto no-scrollbar"
          role="tablist"
          aria-label={`${section.title} look selector`}
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              role="tab"
              aria-selected={i === (currentIndex % total)}
              aria-label={`Go to look ${i + 1}: ${img.description}`}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === (currentIndex % total)
                  ? 'w-7 sm:w-9 bg-[#8B6F47] shadow-sm'
                  : 'w-2 sm:w-2.5 bg-[#D4A574]/35 hover:bg-[#8B6F47]/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const MakeoversByBhuvita = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [lightboxState, setLightboxState] = useState(null); // { list: Image[], index: number }
  const [scrolled, setScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(STAT_TARGETS);
  const [statsAnimDone, setStatsAnimDone] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [pricingLocation, setPricingLocation] = useState('venue');
  // Scroll-reveal only kicks in once JS is running (and motion is OK) — the
  // static HTML is always fully visible.
  const [revealReady, setRevealReady] = useState(false);

  const lightboxRef = useRef(null);
  const lightboxCloseRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const lightboxTouchX = useRef(null);

  // Section refs for scroll animations
  const statsRef = useRef(null);
  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const processRef = useRef(null);
  const servicesRef = useRef(null);
  const realBridesRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  // Track in-view state
  const statsInView = useInView(statsRef);
  const aboutInView = useInView(aboutRef);
  const portfolioInView = useInView(portfolioRef);
  const processInView = useInView(processRef);
  const servicesInView = useInView(servicesRef);
  const realBridesInView = useInView(realBridesRef);
  const faqInView = useInView(faqRef);
  const contactInView = useInView(contactRef);

  // Enable scroll-reveal animations only with JS + motion allowed
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const raf = requestAnimationFrame(() => setRevealReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Content is visible by default; hide-then-reveal only after revealReady
  const reveal = (inView) => (revealReady && !inView ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0');

  // Nav shadow on scroll (boolean — only flips at the threshold)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated stats counter (real values are in the static HTML; the count-up
  // only runs when the bar scrolls into view and motion is allowed)
  useEffect(() => {
    if (!statsInView || statsAnimDone) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStatsAnimDone(true);
      return;
    }
    const duration = 1500;
    const startTime = performance.now();
    let raf;
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setAnimatedStats(STAT_TARGETS.map((t) => Math.round(eased * t)));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setStatsAnimDone(true);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [statsInView, statsAnimDone]);

  const lightboxOpen = lightboxState !== null;
  const currentLightboxImage = lightboxState ? lightboxState.list[lightboxState.index] : null;

  const handleOpenLightbox = (categoryList, index) => {
    setLightboxState({ list: categoryList, index });
  };

  // Lightbox modal behaviour: focus trap, scroll lock, keyboard nav, focus restore
  useEffect(() => {
    if (!lightboxOpen) return;
    lastFocusedRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    lightboxCloseRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxState(null);
      if (e.key === 'ArrowLeft') {
        setLightboxState((prev) => (prev ? { ...prev, index: (prev.index - 1 + prev.list.length) % prev.list.length } : prev));
      }
      if (e.key === 'ArrowRight') {
        setLightboxState((prev) => (prev ? { ...prev, index: (prev.index + 1) % prev.list.length } : prev));
      }
      if (e.key === 'Tab') {
        const focusables = lightboxRef.current?.querySelectorAll('button:not([disabled])');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!lightboxRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
          return;
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      lastFocusedRef.current?.focus?.();
    };
  }, [lightboxOpen]);

  // If the focused Prev/Next button unmounted after navigating to an index boundary, keep focus inside modal
  useEffect(() => {
    if (!lightboxOpen) return;
    if (!lightboxRef.current?.contains(document.activeElement)) {
      lightboxCloseRef.current?.focus();
    }
  }, [lightboxState, lightboxOpen]);

  // Touch swipe navigation inside the lightbox
  const handleLightboxTouchStart = (e) => { lightboxTouchX.current = e.touches[0].clientX; };
  const handleLightboxTouchEnd = (e) => {
    if (lightboxTouchX.current === null) return;
    const delta = lightboxTouchX.current - e.changedTouches[0].clientX;
    if (delta > 50) {
      setLightboxState((prev) => (prev ? { ...prev, index: (prev.index + 1) % prev.list.length } : prev));
    } else if (delta < -50) {
      setLightboxState((prev) => (prev ? { ...prev, index: (prev.index - 1 + prev.list.length) % prev.list.length } : prev));
    }
    lightboxTouchX.current = null;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Skip link for keyboard users */}
      {/* Hero LCP preload — lives here (not layout) so the 404 page doesn't
          download a hero it never renders; sizes matches the hero <picture>. */}
      <link
        rel="preload"
        as="image"
        imageSrcSet={`${getImagePath('/top-hero-828.webp')} 828w, ${getImagePath('/top-hero-1200.webp')} 1200w, ${getImagePath('/top-hero-1600.webp')} 1600w`}
        imageSizes="(max-width: 767px) 92vw, 45vw"
        fetchPriority="high"
      />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:bg-white focus:text-[#8B6F47] focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg">
        Skip to content
      </a>

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Unified Sticky Header / Navbar with embedded scroll progress bar */}
      <Navbar showScrollProgress={true} />

      <main id="main">
      {/* Hero Section */}
      <section id="home" className="min-h-[calc(100vh-6.5rem)] flex items-center bg-gradient-to-br from-[#F5E6D3] to-[#FAF7F5] relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-[#D4A574]/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-[#8B6F47]/8 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-semibold text-gray-800 mb-6 leading-tight">
                Bridal Makeup Artist in Chandigarh for Your{' '}
                <span className="font-script font-normal text-gradient-gold lowercase tracking-normal text-4xl sm:text-6xl md:text-7xl inline-block ml-1">
                  Dream Day
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-sans">
                UV Ghai&ndash;certified bridal makeup artist in Chandigarh, Mohali &amp; Panchkula &mdash; specialising in <span className="font-semibold text-[#8B6F47]">subtle, skin-like makeup</span> that enhances your natural beauty for your special day
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href={WA_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#1DA851] transition transform hover:scale-105 shadow-md active-press">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
                <a href="#portfolio" className="border-2 border-[#8B6F47] text-[#8B6F47] px-8 py-3 rounded-full hover:bg-[#8B6F47] hover:text-white transition transform hover:scale-105 active-press">
                  View Portfolio
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">Replies within a few hours on WhatsApp</p>
            </div>
            <div className="relative">
              <div className="w-full h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[#D4A574]/30">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${getImagePath('/top-hero-828.webp')} 828w, ${getImagePath('/top-hero-1200.webp')} 1200w, ${getImagePath('/top-hero-1600.webp')} 1600w`}
                    sizes="(max-width: 767px) 92vw, 45vw"
                  />
                  <img
                    src={getImagePath('/top-hero.jpeg')}
                    alt="Bride with subtle, skin-like bridal makeup by Makeovers by Bhuvita, Chandigarh"
                    width={1200}
                    height={1600}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </picture>
              </div>
              {/* Shimmer border accent */}
              <div className="absolute -inset-1 rounded-2xl animate-shimmer opacity-30 -z-10" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 fill-current text-red-500" aria-hidden="true" />
                  <span className="font-semibold">200+ Happy Brides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider: Hero → Social Proof */}
      <WaveDivider to="#5C4033" />

      {/* Social Proof Bar */}
      <section ref={statsRef} className="bg-[#5C4033] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-700 ${reveal(statsInView)}`}>
            {stats.map((stat, index) => (
              <div key={stat.label} className={statsAnimDone ? 'animate-count-bounce' : ''}>
                <p className="text-3xl sm:text-4xl font-bold text-[#D4A574]">
                  {animatedStats[index].toLocaleString('en-US')}{stat.suffix}
                </p>
                <p className="text-white/80 text-sm sm:text-base mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-white/80">
                  <badge.icon className="h-4 w-4 text-[#D4A574]" aria-hidden="true" />
                  <span className="text-xs sm:text-sm">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div ref={aboutRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className={`relative transition-all duration-700 ${revealReady && !aboutInView ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}>
              <div className="w-full h-[400px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[#D4A574]/30">
                <picture>
                  <source type="image/webp" srcSet={`${getImagePath('/about-800.webp')} 800w`} sizes="(max-width: 767px) 92vw, 45vw" />
                  <img
                    src={getImagePath('/about-bhuvita.jpeg')}
                    alt="Bhuvita - UV Ghai certified bridal makeup artist in Chandigarh, draping a bride"
                    width={800}
                    height={1315}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </picture>
              </div>
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white px-5 py-4 rounded-xl shadow-lg">
                <p className="text-2xl font-bold text-[#8B6F47]">5,000+</p>
                <p className="text-sm text-gray-600">Instagram Community</p>
              </div>
            </div>

            {/* Text */}
            <div className={`transition-all duration-700 delay-200 ${revealReady && !aboutInView ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">Meet Your Artist</p>
              <h2 className="text-4xl font-playfair font-bold mb-6 text-gradient-gold">Meet Bhuvita</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                A <span className="font-semibold text-[#8B6F47]">UV Ghai&ndash;certified</span> makeup artist based in Chandigarh, Bhuvita specialises in <span className="font-semibold text-[#8B6F47]">subtle, skin-like makeup</span> that enhances your natural features rather than masking them.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Working from her studio in <span className="font-semibold">Sector 37A, Chandigarh</span> and available on-venue across Chandigarh, Mohali &amp; Panchkula, she creates soft, elegant looks for brides who want to look effortlessly like the best version of themselves &mdash; on their wedding day and every celebration around it.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 bg-[#FAF7F5] text-[#6B5637] px-4 py-2 rounded-full text-sm"><Star className="h-4 w-4 text-[#8B6F47]" aria-hidden="true" /> UV Ghai Certified</span>
                <span className="inline-flex items-center gap-2 bg-[#FAF7F5] text-[#6B5637] px-4 py-2 rounded-full text-sm"><Sparkles className="h-4 w-4 text-[#8B6F47]" aria-hidden="true" /> Subtle Makeup Specialist</span>
                <span className="inline-flex items-center gap-2 bg-[#FAF7F5] text-[#6B5637] px-4 py-2 rounded-full text-sm"><Palette className="h-4 w-4 text-[#8B6F47]" aria-hidden="true" /> Studio &amp; On-Venue</span>
              </div>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#1DA851] transition transform hover:scale-105 shadow-md active-press"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section: 4 Segregated Carousels */}
      <section id="portfolio" className="py-20 bg-[#FAF7F5]">
        <div ref={portfolioRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${reveal(portfolioInView)}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">01 / Portfolio</p>
            <h2 className="text-4xl font-playfair font-bold text-gradient-gold">Curated Looks by Occasion</h2>
          </div>

          {/* 4 Dedicated Infinite 3D Spotlight Carousels */}
          <div className="space-y-12 sm:space-y-16">
            {portfolioSections.map((sec) => {
              const secImages = portfolioImages.filter((img) => img.category === sec.category);
              return (
                <InfiniteSpotlightCarousel
                  key={sec.id}
                  section={sec}
                  images={secImages}
                  onImageClick={handleOpenLightbox}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Process Timeline */}
      <section className="py-20 bg-[#FAF7F5]">
        <div ref={processRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${reveal(processInView)}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">02 / Process</p>
            <h2 className="text-4xl font-playfair font-bold mb-4 text-gradient-gold">How It Works</h2>
            <p className="text-lg text-gray-600">From consultation to your perfect bridal look</p>
          </div>

          {/* Desktop: Horizontal timeline */}
          <div className="hidden md:flex items-start justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[12%] right-[12%] h-[2px] bg-[#D4A574]" aria-hidden="true" />
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center text-center w-1/4 relative z-10 transition-all duration-700 ${reveal(processInView)}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="w-20 h-20 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-4 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
                  <step.icon className="h-8 w-8 text-[#8B6F47]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center gap-1.5 flex-wrap">
                  <span>{step.title}</span>
                  {step.optional && (
                    <span className="text-xs font-medium text-[#8B6F47] bg-[#8B6F47]/10 px-2 py-0.5 rounded-full">
                      (Optional)
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="md:hidden space-y-8 relative pl-12">
            <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-[#D4A574]" aria-hidden="true" />
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center shadow-md z-10">
                  <step.icon className="h-5 w-5 text-[#8B6F47]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2 flex-wrap">
                  <span>{step.title}</span>
                  {step.optional && (
                    <span className="text-xs font-medium text-[#8B6F47] bg-[#8B6F47]/10 px-2 py-0.5 rounded-full">
                      (Optional)
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave Divider: Process → Services */}
      <WaveDivider to="#F5E6D3" />

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#F5E6D3] relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute top-40 -right-40 w-96 h-96 rounded-full bg-[#D4A574]/10 blur-3xl pointer-events-none" aria-hidden="true" />

        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${reveal(servicesInView)}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">03 / Services</p>
            <h2 className="text-4xl font-playfair font-bold mb-4 text-gradient-gold">Bridal &amp; Party Makeup Prices in Chandigarh</h2>
            <p className="text-lg text-gray-600">Tailored bridal, party &amp; engagement makeup packages in Chandigarh Tricity</p>
          </div>

          {/* Service Comparison Helper */}
          <div className="text-center mb-8">
            <a
              href={waLink('Hi Bhuvita! Can you help me choose the right package? My function(s): [functions], date: [date], venue: [venue/city].')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5637] transition text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Not sure which package? Let us help you choose
            </a>
          </div>

          {/* Interactive Location Switcher */}
          <div className={`mb-12 flex flex-col items-center justify-center ${reveal(servicesInView)}`}>
            <div
              className="inline-flex p-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D4A574]/40 shadow-md"
              role="tablist"
              aria-label="Service Location Selector"
            >
              <button
                type="button"
                role="tab"
                aria-selected={pricingLocation === 'venue'}
                onClick={() => setPricingLocation('venue')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  pricingLocation === 'venue'
                    ? 'bg-[#8B6F47] text-white shadow-md'
                    : 'text-gray-700 hover:text-[#8B6F47] hover:bg-[#8B6F47]/10'
                }`}
              >
                <Car className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>On-Venue (Tricity)</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={pricingLocation === 'studio'}
                onClick={() => setPricingLocation('studio')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  pricingLocation === 'studio'
                    ? 'bg-[#8B6F47] text-white shadow-md'
                    : 'text-gray-700 hover:text-[#8B6F47] hover:bg-[#8B6F47]/10'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>At Studio (Sector 37A)</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={pricingLocation === 'outstation'}
                onClick={() => setPricingLocation('outstation')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  pricingLocation === 'outstation'
                    ? 'bg-[#8B6F47] text-white shadow-md'
                    : 'text-gray-700 hover:text-[#8B6F47] hover:bg-[#8B6F47]/10'
                }`}
              >
                <Plane className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Outstation</span>
              </button>
            </div>

            {/* Subtext description for selected location */}
            <div className="mt-3.5 text-center text-xs sm:text-sm text-gray-600 max-w-xl px-4">
              {services.tiers[pricingLocation].coverageNote}
            </div>
          </div>

          {/* 4 Occasion Packages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {services.tiers[pricingLocation].items.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full relative border border-[#D4A574]/30 ${reveal(servicesInView)}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {service.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B6F47] text-white text-xs font-bold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                    {service.badge}
                  </div>
                )}
                <div className="text-center mb-1 mt-1">
                  <Palette className="h-9 w-9 text-[#8B6F47] mx-auto mb-2.5" aria-hidden="true" />
                  <div className="h-14 flex flex-col items-center justify-center text-center">
                    <h4 className="text-xl font-semibold text-gray-900 leading-tight">{service.title}</h4>
                    {service.subtitleNote ? (
                      <p className="text-[11px] text-[#8B6F47] font-medium mt-0.5 leading-tight">
                        {service.subtitleNote}
                      </p>
                    ) : (
                      <p className="text-[11px] opacity-0 pointer-events-none mt-0.5 leading-tight select-none" aria-hidden="true">
                        &nbsp;
                      </p>
                    )}
                  </div>

                  {/* Price display: dual options or single rate - UNIFORM 98px BOX */}
                  {service.isDual ? (
                    <div className="bg-[#FAF7F5] rounded-xl p-3 my-3 border border-[#D4A574]/25 h-[98px] flex flex-col justify-center space-y-1.5 text-left">
                      {service.options.map((opt, optIdx) => (
                        <React.Fragment key={opt.name}>
                          {optIdx > 0 && <div className="h-px bg-[#D4A574]/20" />}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-semibold text-gray-900 leading-tight">{opt.name}</p>
                              <p className="text-[10px] text-gray-500 leading-tight">{opt.note}</p>
                            </div>
                            <span className="text-base sm:text-lg font-bold text-[#8B6F47] shrink-0 ml-2">{opt.price}</span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#FAF7F5] rounded-xl p-3 my-3 border border-[#D4A574]/25 h-[98px] flex flex-col items-center justify-center text-center">
                      <p className="text-2xl sm:text-3xl font-bold text-[#8B6F47] leading-tight">{service.price}</p>
                      {service.priceUnit && (
                        <p className="text-xs text-gray-500 mt-1 font-medium leading-tight">{service.priceUnit}</p>
                      )}
                    </div>
                  )}

                  <div className="h-6 flex items-center justify-center">
                    {service.carouselId && (
                      <a
                        href={`#${service.carouselId}`}
                        className="inline-flex items-center gap-1 text-xs text-[#8B6F47] hover:text-[#5C4033] font-medium transition hover:underline"
                      >
                        <span>View Portfolio Looks</span>
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#D4A574]/20 pt-4 mt-3 flex-grow flex flex-col justify-between">
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <Star className="h-4 w-4 text-[#8B6F47] mr-2 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waLink(service.whatsapptext)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full mt-6 bg-[#8B6F47] text-white py-2.5 rounded-full hover:bg-[#6B5637] transition hover-glow active-press font-medium text-sm shadow-xs"
                  >
                    Chat to Book
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Official Inclusions, Exclusions & Saree Draping Box */}
          <div className={`mb-16 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#D4A574]/35 ${reveal(servicesInView)}`}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 bg-[#8B6F47]/10 text-[#8B6F47] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Transparent Inclusions &amp; Policies
                </div>
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900">
                  Everything You Need for a Flawless Transformation
                </h3>
                <p className="text-gray-600 text-sm mt-1">Zero hidden surcharges — premium lenses, lashes &amp; styling are always included</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* 1. What's Included */}
                <div className="bg-[#FAF7F5] rounded-2xl p-5 border border-[#D4A574]/25">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8B6F47]" />
                    <span>Included in All Looks</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {services.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#8B6F47] font-bold shrink-0">✓</span>
                        <span>{inc.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Client Provided / Exclusions */}
                <div className="bg-[#FAF7F5] rounded-2xl p-5 border border-[#D4A574]/25">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>Client Provided / Optional</span>
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">
                    For personal hygiene and customized aesthetics:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {services.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold shrink-0">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-gray-500 mt-4 italic">
                    *We gladly style and securely pin all hair extensions, flowers and jewellery you bring!
                  </p>
                </div>

                {/* 3. Saree Draping Add-on */}
                <div className="bg-[#FAF7F5] rounded-2xl p-5 border border-[#D4A574]/25 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                        <Palette className="w-4 h-4 text-[#8B6F47]" />
                        <span>Saree Draping Add-on</span>
                      </h4>
                      <span className="bg-[#8B6F47] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                        ₹500 / saree
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mt-2">
                      Standalone saree pleating, pallu setting and precision pinning for wedding guests, mothers &amp; bridesmaids.
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      Fast, secure drape that stays picture-perfect all evening without slipping.
                    </p>
                  </div>
                  <a
                    href={waLink("Hi Bhuvita! I'd like to book Saree Draping (₹500) for [count] sarees on [date].")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-white hover:bg-gray-50 text-[#8B6F47] border border-[#8B6F47] text-xs font-semibold py-2 rounded-full transition shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    Book Saree Draping
                  </a>
                </div>
              </div>
            </div>
          </div>



          {/* Additional Info & Footnotes */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-gray-600 text-xs sm:text-sm italic">
              * 30% advance deposit required to officially lock auspicious dates on Bhuvita&apos;s calendar
            </p>
            <p className="text-gray-600 text-xs sm:text-sm italic">
              * Travel and accommodation charges apply for outstation bookings outside Chandigarh Tricity
            </p>
            <div className="pt-2">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-[#8B6F47] hover:text-[#5C4033] font-semibold text-sm sm:text-base transition underline underline-offset-4"
              >
                <span>View Complete Pricing &amp; Packages Breakdown</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider: Services → Real Brides */}
      <WaveDivider to="#ffffff" />

      {/* Real Brides Section (honest social proof — no invented reviews) */}
      <section id="real-brides" className="py-20 bg-white relative overflow-hidden">
        <div ref={realBridesRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${reveal(realBridesInView)}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">04 / Real Brides</p>
            <h2 className="text-4xl font-playfair font-bold mb-4 text-gradient-gold">Real Brides, Real Looks</h2>
            <p className="text-lg text-gray-600">Every look on this page is a real bride &mdash; no stock photos, no staged shoots</p>
          </div>

          <div className={`bg-[#FAF7F5] rounded-2xl p-8 sm:p-10 shadow-xl text-center transition-all duration-700 delay-200 ${reveal(realBridesInView)}`}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#D4A574] flex items-center justify-center mx-auto mb-6 shadow-md">
              <Instagram className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Bhuvita shares her work with a community of <span className="font-semibold text-[#8B6F47]">5,000+ followers</span> on Instagram &mdash; <span className="font-semibold text-[#8B6F47]">750+ bridal looks</span> and counting.
            </p>
            <p className="text-gray-600 mb-8">
              See real client feedback in the comments, tagged photos and stories on Instagram &mdash; straight from the brides themselves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#8B6F47] text-white px-8 py-3 rounded-full hover:bg-[#6B5637] transition transform hover:scale-105 hover-glow active-press"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
                See Real Bride Feedback on Instagram
              </a>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#1DA851] transition transform hover:scale-105 shadow-md active-press"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#FAF7F5]">
        <div ref={faqRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${reveal(faqInView)}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">05 / FAQ</p>
            <h2 className="text-4xl font-playfair font-bold mb-4 text-gradient-gold">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know before booking</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-500 ${revealReady && !faqInView ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: `${index * 80 + 200}ms` }}>
                <h3>
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    aria-expanded={activeFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-gray-800 pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-[#8B6F47] flex-shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  inert={activeFaq !== index}
                  className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href={waLink('Hi Bhuvita! I have a question about your services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5637] transition"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Have more questions? Chat with us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#F5E6D3] to-[#FAF7F5]">
        <div ref={contactRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${reveal(contactInView)}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">06 / Contact</p>
            <h2 className="text-4xl font-playfair font-bold mb-4 text-gradient-gold">Book Your Bridal Makeup Consultation</h2>
            <p className="text-lg text-gray-600">Bridal makeup in Chandigarh, Mohali &amp; Panchkula &mdash; studio or on venue</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left mb-4">
                  <a
                    href={WA_GENERAL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#8B6F47] transition"
                  >
                    <MessageCircle className="h-5 w-5 text-[#8B6F47] flex-shrink-0" aria-hidden="true" />
                    <span>WhatsApp: +91 78888 08231</span>
                  </a>
                  <a
                    href="tel:+917888808231"
                    className="flex items-center justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#8B6F47] transition"
                  >
                    <Phone className="h-5 w-5 text-[#8B6F47] flex-shrink-0" aria-hidden="true" />
                    <span>Call: +91 78888 08231</span>
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#8B6F47] transition"
                  >
                    <Instagram className="h-5 w-5 text-[#8B6F47] flex-shrink-0" aria-hidden="true" />
                    <span>@makeoversbybhuvita</span>
                  </a>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-3 text-gray-700 hover:text-[#8B6F47] transition"
                  >
                    <MapPin className="h-5 w-5 text-[#8B6F47] flex-shrink-0" aria-hidden="true" />
                    <span>Studio: Sector 37A, Chandigarh</span>
                  </a>
              </div>

              <p className="text-sm text-gray-500 text-center mb-8">WhatsApp is fastest &mdash; replies within a few hours.</p>

              {/* Google Map — click-to-load facade (saves ~1MB+ of third-party JS/tiles) */}
              {showMap ? (
                <div className="rounded-xl overflow-hidden h-64 w-full">
                  <iframe
                    title="Makeovers by Bhuvita - Sector 37A, Chandigarh"
                    src="https://maps.google.com/maps?q=Sector%2037A%2C%20Chandigarh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="rounded-xl h-64 w-full bg-[#F5E6D3] flex flex-col items-center justify-center gap-3 text-center px-4">
                  <MapPin className="h-8 w-8 text-[#8B6F47]" aria-hidden="true" />
                  <p className="text-gray-700 font-medium">Sector 37A, Chandigarh</p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { e.preventDefault(); setShowMap(true); }}
                    className="bg-[#8B6F47] text-white px-6 py-2.5 rounded-full hover:bg-[#6B5637] transition active-press"
                  >
                    Load map
                  </a>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8B6F47] underline hover:text-[#6B5637] transition"
                  >
                    Open in Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Teaser */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-2">Follow Our Latest Bridal Looks</h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5637] transition"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
              @makeoversbybhuvita
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {IG_TEASER_IDS.map((imgNum) => (
              <a
                key={imgNum}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group aspect-square overflow-hidden rounded-lg"
              >
                <picture>
                  <source type="image/webp" srcSet={getImagePath(`/portfolio/${imgNum}-thumb.webp`)} />
                  <img
                    src={getImagePath(`/portfolio/${imgNum}.jpeg`)}
                    alt={`${portfolioById[imgNum]?.description ?? 'Bridal makeup look'} — Makeovers by Bhuvita on Instagram`}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center" aria-hidden="true">
                  <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#5C4033] text-white pt-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center sm:text-left">
              <p className="text-2xl font-script mb-3 text-[#D4A574]">Makeovers by Bhuvita</p>
              <p className="text-white/70 text-sm leading-relaxed">Studio at Sector 37A, Chandigarh &mdash; subtle, skin-like bridal and party makeup, on venue across Chandigarh, Mohali, Panchkula, Zirakpur and Kharar.</p>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-[#D4A574] mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="text-white/70 hover:text-white transition inline-block">Home</a></li>
                <li><a href="#about" className="text-white/70 hover:text-white transition inline-block">About</a></li>
                <li><a href="#portfolio" className="text-white/70 hover:text-white transition inline-block">Portfolio</a></li>
                <li><a href="#services" className="text-white/70 hover:text-white transition inline-block">Services</a></li>
                <li><a href="#real-brides" className="text-white/70 hover:text-white transition inline-block">Real Brides</a></li>
                <li><a href="#contact" className="text-white/70 hover:text-white transition inline-block">Contact</a></li>
              </ul>
            </div>

            {/* Locations & Services */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-[#D4A574] mb-3 text-sm uppercase tracking-wider">Locations &amp; Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/bridal-makeup-chandigarh" className="text-white/70 hover:text-white transition inline-block">
                    Bridal Makeup Chandigarh
                  </Link>
                </li>
                <li>
                  <Link href="/makeup-artist-in-mohali" className="text-white/70 hover:text-white transition inline-block">
                    Makeup Artist in Mohali
                  </Link>
                </li>
                <li>
                  <Link href="/makeup-artist-in-panchkula" className="text-white/70 hover:text-white transition inline-block">
                    Makeup Artist in Panchkula
                  </Link>
                </li>
                <li>
                  <Link href="/party-makeup-chandigarh" className="text-white/70 hover:text-white transition inline-block">
                    Party Makeup Chandigarh
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-white/70 hover:text-white transition inline-block">
                    Pricing &amp; Packages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="text-center sm:text-left lg:text-right">
              <h4 className="font-semibold text-[#D4A574] mb-3 text-sm uppercase tracking-wider">Connect</h4>
              <div className="flex justify-center lg:justify-end gap-4 mb-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A574]/30 flex items-center justify-center transition">
                  <Instagram className="h-5 w-5 text-white/80" aria-hidden="true" />
                </a>
                <a href={waLink("Hi Bhuvita! I'm looking for bridal makeup on [date] at [venue/city]. Could you share availability and details?")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A574]/30 flex items-center justify-center transition">
                  <MessageCircle className="h-5 w-5 text-white/80" aria-hidden="true" />
                </a>
                <a href="tel:+917888808231" aria-label="Call +91 78888 08231" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A574]/30 flex items-center justify-center transition">
                  <Phone className="h-5 w-5 text-white/80" aria-hidden="true" />
                </a>
              </div>
              <p className="text-white/70 text-sm">+91 78888 08231</p>
            </div>
          </div>

          {/* Divider & Copyright */}
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-white/70 text-sm" suppressHydrationWarning>&copy; {new Date().getFullYear()} Makeovers by Bhuvita. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp CTA */}
      {/* Mobile: full-width bar at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#25D366] shadow-lg">
        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 text-white font-semibold"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
      {/* Desktop: floating button */}
      <a
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden md:flex fixed bottom-8 right-8 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full items-center justify-center shadow-lg hover:bg-[#1DA851] transition-colors group animate-pulse-slow"
      >
        <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Portfolio Lightbox Modal */}
      {lightboxOpen && currentLightboxImage && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image viewer"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxState(null)}
          onTouchStart={handleLightboxTouchStart}
          onTouchEnd={handleLightboxTouchEnd}
        >
          {/* Close button */}
          <button
            ref={lightboxCloseRef}
            onClick={() => setLightboxState(null)}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2 hover:bg-white/10 rounded-full transition"
          >
            <X className="h-8 w-8" aria-hidden="true" />
          </button>

          {/* Prev button */}
          {lightboxState.list.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxState((prev) => (prev ? { ...prev, index: (prev.index - 1 + prev.list.length) % prev.list.length } : prev));
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition z-10 hover:scale-110 active-press cursor-pointer"
            >
              <ChevronLeft className="h-8 w-8" aria-hidden="true" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85dvh] relative" onClick={(e) => e.stopPropagation()}>
            <picture>
              <source
                type="image/webp"
                srcSet={currentLightboxImage.srcSet}
                sizes="100vw"
              />
              <img
                src={currentLightboxImage.url}
                alt={currentLightboxImage.alt}
                width={currentLightboxImage.width || 800}
                height={currentLightboxImage.height || 1067}
                decoding="async"
                className="max-w-full max-h-[85dvh] w-auto h-auto object-contain rounded-xl shadow-2xl"
              />
            </picture>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 rounded-b-xl text-center">
              <span className="text-xs uppercase tracking-wider text-[#D4A574] font-medium block mb-1">
                {currentLightboxImage.category}
              </span>
              <p className="text-white text-base sm:text-lg font-semibold">{currentLightboxImage.description}</p>
              <p className="text-white/70 text-xs sm:text-sm mt-0.5" aria-live="polite">
                {lightboxState.index + 1} / {lightboxState.list.length}
              </p>
            </div>
          </div>

          {/* Next button */}
          {lightboxState.list.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxState((prev) => (prev ? { ...prev, index: (prev.index + 1) % prev.list.length } : prev));
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full transition z-10 hover:scale-110 active-press cursor-pointer"
            >
              <ChevronRight className="h-8 w-8" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

export default MakeoversByBhuvita;
