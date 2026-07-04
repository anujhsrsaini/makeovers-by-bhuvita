"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, MessageCircle, Phone, Star, ChevronLeft, ChevronRight, ChevronDown, Calendar, Palette, Heart, Clock, Sparkles, ArrowUp, MapPin } from 'lucide-react';
import portfolioData from '../public/portfolio/portfolio.json';
import { faqs } from './faq-data';

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

const portfolioCategories = ['All', 'Bridal Look', 'Engagement/Reception', 'HD/Party Makeups', 'Unique Hairdos'];

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
  tricity: [
    {
      title: "Bridal Makeup",
      price: "₹25,000 onwards",
      features: ["Subtle, Skin-Like Base (HD/Airbrush available)", "Hair Styling", "Draping", "Touch-up Kit"],
      whatsapptext: "Hi Bhuvita! I'd like to book Bridal Makeup (₹25,000 onwards). My date: [date], venue: [venue/city]."
    },
    {
      title: "Pre-Wedding Functions",
      price: "₹15,000 per function",
      features: ["Mehendi/Sangeet/Haldi", "Makeup & Hair", "Outfit Draping"],
      whatsapptext: "Hi Bhuvita! I'd like makeup for my pre-wedding functions (₹15,000 per function). My dates: [dates], venue: [venue/city]."
    },
    {
      title: "Party Makeup",
      price: "₹8,000 onwards",
      features: ["Cocktail/Reception", "Professional Makeup", "Hairstyling"],
      whatsapptext: "Hi Bhuvita! I'd like to book Party Makeup (₹8,000 onwards). My date: [date], venue: [venue/city]."
    },
    {
      title: "Bridal Package",
      price: "₹60,000",
      features: ["Complete Wedding", "All Functions Covered", "Family Makeup Available", "Premium Products"],
      whatsapptext: "Hi Bhuvita! I'd like the complete Bridal Package (₹60,000). My wedding date: [date], venue: [venue/city]."
    }
  ],
  outstation: [
    {
      title: "Destination Wedding",
      price: "₹80,000 onwards",
      features: ["Travel & Stay Extra", "Multiple Day Coverage", "Complete Bridal Services"],
      whatsapptext: "Hi Bhuvita! I'm planning a destination wedding on [date] at [venue/city]. Could you share availability and details (₹80,000 onwards)?"
    },
    {
      title: "Outstation Bridal",
      price: "₹35,000 onwards",
      features: ["Single Day Service", "Travel Charges Apply", "Full Bridal Look", "Touch-up Kit Included"],
      whatsapptext: "Hi Bhuvita! I'd like outstation bridal makeup (₹35,000 onwards). My date: [date], city/venue: [venue/city]."
    },
    {
      title: "Multi-City Package",
      price: "Custom Quote",
      features: ["Multiple Venues", "Flexible Schedule", "Premium Service"],
      whatsapptext: "Hi Bhuvita! I need makeup across multiple cities. My dates: [dates], cities: [cities]. Could you share a custom quote?"
    }
  ]
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
  { icon: Palette, title: "Trial Session", desc: "Optional paid trial to finalise your exact look before the big day" },
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

// Scroll progress bar — rAF + ref, no React re-renders on scroll
function ScrollProgressBar() {
  const barRef = useRef(null);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[60] pointer-events-none" aria-hidden="true">
      <div ref={barRef} className="h-full bg-gradient-to-r from-[#8B6F47] to-[#D4A574]" style={{ width: '0%' }} />
    </div>
  );
}

// Back-to-top button — isolated so scroll state doesn't re-render the page tree
function BackToTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`hidden md:flex fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full bg-[#8B6F47] text-white items-center justify-center shadow-lg hover:bg-[#6B5637] transition-all duration-300 hover-glow ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const MakeoversByBhuvita = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portfolioCategory, setPortfolioCategory] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(STAT_TARGETS);
  const [statsAnimDone, setStatsAnimDone] = useState(false);
  const [showMap, setShowMap] = useState(false);
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

  const filteredImages = portfolioCategory === 'All'
    ? portfolioImages
    : portfolioImages.filter((img) => img.category === portfolioCategory);

  const handleCategoryChange = (category) => {
    setPortfolioCategory(category);
    setLightboxImage(null);
  };

  const lightboxOpen = lightboxImage !== null;

  // Lightbox modal behaviour: focus trap, scroll lock, keyboard nav, focus restore
  useEffect(() => {
    if (!lightboxOpen) return;
    lastFocusedRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    lightboxCloseRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
      if (e.key === 'ArrowLeft') setLightboxImage((i) => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === 'ArrowRight') setLightboxImage((i) => (i !== null && i < filteredImages.length - 1 ? i + 1 : i));
      if (e.key === 'Tab') {
        const focusables = lightboxRef.current?.querySelectorAll('button:not([disabled])');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        // Focus can land on <body> when a Prev/Next button unmounts at an
        // index boundary — pull it back inside the modal instead of letting
        // Tab escape behind the overlay.
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
  }, [lightboxOpen, filteredImages.length]);

  // If the focused Prev/Next button unmounted after navigating to an index
  // boundary, keep focus inside the modal.
  useEffect(() => {
    if (!lightboxOpen) return;
    if (!lightboxRef.current?.contains(document.activeElement)) {
      lightboxCloseRef.current?.focus();
    }
  }, [lightboxImage, lightboxOpen]);

  // Touch swipe navigation inside the lightbox
  const handleLightboxTouchStart = (e) => { lightboxTouchX.current = e.touches[0].clientX; };
  const handleLightboxTouchEnd = (e) => {
    if (lightboxTouchX.current === null) return;
    const delta = lightboxTouchX.current - e.changedTouches[0].clientX;
    if (delta > 50) setLightboxImage((i) => (i !== null && i < filteredImages.length - 1 ? i + 1 : i));
    else if (delta < -50) setLightboxImage((i) => (i !== null && i > 0 ? i - 1 : i));
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
        imageSrcSet={`${getImagePath('/hero-828.webp')} 828w, ${getImagePath('/hero-1200.webp')} 1200w, ${getImagePath('/hero-1600.webp')} 1600w`}
        imageSizes="(max-width: 767px) 92vw, 45vw"
        fetchPriority="high"
      />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:bg-white focus:text-[#8B6F47] focus:px-4 focus:py-2 focus:rounded-full focus:shadow-lg">
        Skip to content
      </a>

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Announcement Bar — scrolls away; nav below is sticky */}
      <div className="bg-[#5C4033] text-white text-center text-xs sm:text-sm px-4 pt-[calc(0.625rem+3px)] pb-2.5">
        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 hover:text-[#D4A574] transition"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#D4A574] flex-shrink-0" aria-hidden="true" />
          <span>Now booking 2026&ndash;27 wedding dates &mdash; <span className="underline underline-offset-2 font-semibold">chat on WhatsApp</span></span>
        </a>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-[3px] w-full bg-white/90 backdrop-blur-md z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-none'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl sm:text-2xl font-script text-[#8B6F47]">Makeovers by Bhuvita</div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Home</a>
              <a href="#about" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">About</a>
              <a href="#portfolio" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Portfolio</a>
              <a href="#services" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Services</a>
              <a href="#real-brides" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Real Brides</a>
              <a href="#contact" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -m-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">About</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Portfolio</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Services</a>
            <a href="#real-brides" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Real Brides</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Contact</a>
          </div>
        </div>
      </nav>

      <main id="main">
      {/* Hero Section */}
      <section id="home" className="min-h-[calc(100vh-6.5rem)] flex items-center bg-gradient-to-br from-[#F5E6D3] to-[#FAF7F5] relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-[#D4A574]/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-[#8B6F47]/8 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Bridal Makeup Artist in Chandigarh for Your <span className="text-gradient-gold">Dream Day</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
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
                    srcSet={`${getImagePath('/hero-828.webp')} 828w, ${getImagePath('/hero-1200.webp')} 1200w, ${getImagePath('/hero-1600.webp')} 1600w`}
                    sizes="(max-width: 767px) 92vw, 45vw"
                  />
                  <img
                    src={getImagePath('/hero-image.jpeg')}
                    alt="Bride with subtle, skin-like bridal makeup by Makeovers by Bhuvita, Chandigarh"
                    width={1200}
                    height={1597}
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
              <h2 className="text-4xl font-bold mb-6 text-gradient-gold">Meet Bhuvita</h2>
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-[#FAF7F5]">
        <div ref={portfolioRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${reveal(portfolioInView)}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">01 / Portfolio</p>
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Bridal Makeup Portfolio</h2>
            <p className="text-lg text-gray-600">Real brides across Chandigarh, Mohali &amp; Panchkula &mdash; one look at a time</p>
          </div>

          {/* Category Filter Tabs */}
          <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 transition-all duration-700 delay-200 ${reveal(portfolioInView)}`}>
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={portfolioCategory === category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  portfolioCategory === category
                    ? 'bg-[#8B6F47] text-white shadow-md'
                    : 'bg-white text-[#6B5637] shadow-sm hover:bg-[#D4A574]/20'
                }`}
              >
                {category}
                <span className="ml-1.5 text-xs opacity-80">
                  ({category === 'All' ? portfolioImages.length : portfolioImages.filter((img) => img.category === category).length})
                </span>
              </button>
            ))}
          </div>

          {/* Single responsive gallery grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredImages.map((img, index) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setLightboxImage(index)}
                  aria-label={`View ${img.description} full size`}
                  className="relative group block w-full text-left overflow-hidden rounded-2xl shadow-lg hover-golden-glow transition-shadow duration-300 animate-fadeIn cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={img.srcSet}
                        sizes="(max-width: 767px) 45vw, 30vw"
                      />
                      <img
                        src={img.url}
                        alt={img.alt}
                        width={img.width || 800}
                        height={img.height || 1067}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </picture>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="text-white text-sm sm:text-lg font-semibold">{img.description}</p>
                    <p className="text-white/80 text-xs sm:text-sm">{img.category}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No images in this category</p>
          )}
        </div>
      </section>

      {/* How It Works - Process Timeline */}
      <section className="py-20 bg-[#FAF7F5]">
        <div ref={processRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${reveal(processInView)}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#8B6F47] mb-3">02 / Process</p>
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">How It Works</h2>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{step.title}</h3>
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
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Bridal &amp; Party Makeup Prices in Chandigarh</h2>
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

          {/* Chandigarh Tricity Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-3 text-[#8B6F47]">Chandigarh Tricity &mdash; Studio (Sector 37A) &amp; On-Venue</h3>
            <p className="text-center text-gray-600 mb-8 text-sm">Prices apply at the Sector 37A studio and on venue across Chandigarh, Mohali &amp; Panchkula.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.tricity.map((service, index) => (
                <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full relative ${reveal(servicesInView)}`} style={{ transitionDelay: `${index * 100 + 200}ms` }}>
                  {index === 0 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B6F47] text-white text-xs font-bold px-3 py-1 rounded-full">Popular</div>}
                  <div className="text-center mb-6">
                    <Palette className="h-12 w-12 text-[#8B6F47] mx-auto mb-4" aria-hidden="true" />
                    <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                    <p className="text-2xl font-bold text-[#8B6F47]">{service.price}</p>
                  </div>
                  <ul className="space-y-2 flex-grow flex flex-col justify-end">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 text-[#8B6F47] mr-2 flex-shrink-0" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(service.whatsapptext)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full mt-6 bg-[#8B6F47] text-white py-2 rounded-full hover:bg-[#6B5637] transition hover-glow active-press"
                  >
                    Chat to Book
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Outstation Services */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-3 text-[#8B6F47]">Outstation Services</h3>
            <p className="text-center text-gray-600 mb-8 text-sm">Outside the Tricity &mdash; travel &amp; stay charged separately.</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {services.outstation.map((service, index) => (
                <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-[#D4A574] flex flex-col h-full ${reveal(servicesInView)}`} style={{ transitionDelay: `${index * 100 + 600}ms` }}>
                  <div className="text-center mb-6">
                    <Calendar className="h-12 w-12 text-[#8B6F47] mx-auto mb-4" aria-hidden="true" />
                    <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                    <p className="text-2xl font-bold text-[#8B6F47]">{service.price}</p>
                  </div>
                  <ul className="space-y-2 flex-grow flex flex-col justify-end">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 text-[#8B6F47] mr-2 flex-shrink-0" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(service.whatsapptext)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full mt-6 bg-[#8B6F47] text-white py-2 rounded-full hover:bg-[#6B5637] transition hover-glow active-press"
                  >
                    Ask About This
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 italic">* Travel and accommodation charges apply for outstation bookings</p>
            <p className="text-gray-600 italic mt-2">* Prices are subject to customization based on requirements</p>
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
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Real Brides, Real Looks</h2>
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
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Frequently Asked Questions</h2>
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
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Book Your Bridal Makeup Consultation</h2>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Follow Our Latest Bridal Looks</h2>
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
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <p className="text-2xl font-script mb-3 text-[#D4A574]">Makeovers by Bhuvita</p>
              <p className="text-white/70 text-sm leading-relaxed">Studio at Sector 37A, Chandigarh &mdash; subtle, skin-like bridal and party makeup, on venue across Chandigarh, Mohali, Panchkula, Zirakpur and Kharar.</p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-semibold text-[#D4A574] mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <a href="#home" className="text-white/70 hover:text-white text-sm transition">Home</a>
                <a href="#portfolio" className="text-white/70 hover:text-white text-sm transition">Portfolio</a>
                <a href="#services" className="text-white/70 hover:text-white text-sm transition">Services</a>
                <a href="#real-brides" className="text-white/70 hover:text-white text-sm transition">Real Brides</a>
                <a href="#contact" className="text-white/70 hover:text-white text-sm transition">Contact</a>
              </div>
            </div>

            {/* Social & Contact */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-[#D4A574] mb-3 text-sm uppercase tracking-wider">Connect</h4>
              <div className="flex justify-center md:justify-end gap-4 mb-3">
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
      {lightboxOpen && filteredImages[lightboxImage] && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image viewer"
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          onTouchStart={handleLightboxTouchStart}
          onTouchEnd={handleLightboxTouchEnd}
        >
          {/* Close button */}
          <button
            ref={lightboxCloseRef}
            onClick={() => setLightboxImage(null)}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2"
          >
            <X className="h-8 w-8" aria-hidden="true" />
          </button>

          {/* Prev button */}
          {lightboxImage > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxImage((i) => Math.max(i - 1, 0)); }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition z-10"
            >
              <ChevronLeft className="h-8 w-8" aria-hidden="true" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85dvh] relative" onClick={(e) => e.stopPropagation()}>
            <picture>
              <source
                type="image/webp"
                srcSet={filteredImages[lightboxImage].srcSet}
                sizes="100vw"
              />
              <img
                src={filteredImages[lightboxImage].url}
                alt={filteredImages[lightboxImage].alt}
                width={filteredImages[lightboxImage].width || 800}
                height={filteredImages[lightboxImage].height || 1067}
                decoding="async"
                className="max-w-full max-h-[85dvh] w-auto h-auto object-contain rounded-xl shadow-2xl"
              />
            </picture>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
              <p className="text-white text-lg font-semibold text-center">{filteredImages[lightboxImage].description}</p>
              <p className="text-white/70 text-sm text-center" aria-live="polite">{lightboxImage + 1} / {filteredImages.length}</p>
            </div>
          </div>

          {/* Next button */}
          {lightboxImage < filteredImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxImage((i) => Math.min(i + 1, filteredImages.length - 1)); }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition z-10"
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
