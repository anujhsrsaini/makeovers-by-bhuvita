"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Instagram, MessageCircle, Phone, Mail, Star, ChevronLeft, ChevronRight, ChevronDown, Calendar, Palette, Heart, Shield, Clock, Sparkles, ArrowUp } from 'lucide-react';
import portfolioData from '../public/portfolio/portfolio.json';

// Custom hook for scroll-triggered animations
function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });
    observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isInView;
}

// SVG Wave Divider component
const WaveDivider = ({ from = '#FAF7F5', to = '#ffffff', flip = false }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ marginTop: '-1px', marginBottom: '-1px' }}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]" fill={to}>
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6.01,68.85-16.01,106.8-23.03,43.16-7.98,88.26-10.99,134-7.13,41.58,3.51,83.64,12.32,123.8,25.03V0Z" opacity=".25" />
      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
    </svg>
  </div>
);

const MakeoversByBhuvita = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [portfolioCategory, setPortfolioCategory] = useState('All');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [statsAnimDone, setStatsAnimDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const touchStartX = useRef(null);
  const touchStartXTestimonial = useRef(null);

  // Section refs for scroll animations
  const statsRef = useRef(null);
  const portfolioRef = useRef(null);
  const processRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  // Track in-view state
  const statsInView = useInView(statsRef);
  const portfolioInView = useInView(portfolioRef);
  const processInView = useInView(processRef);
  const servicesInView = useInView(servicesRef);
  const testimonialsInView = useInView(testimonialsRef);
  const faqInView = useInView(faqRef);
  const contactInView = useInView(contactRef);

  // Page entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Nav shadow + scroll progress + back-to-top on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated stats counter
  useEffect(() => {
    if (!statsInView || statsAnimDone) return;
    const targets = [200, 3, 50, 4.9];
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setAnimatedStats(targets.map((t, i) => {
        if (i === 3) return Math.round(eased * t * 10) / 10; // 4.9 with decimal
        return Math.round(eased * t);
      }));
      if (progress < 1) requestAnimationFrame(animate);
      else setStatsAnimDone(true);
    };
    requestAnimationFrame(animate);
  }, [statsInView, statsAnimDone]);

    // Helper function for image paths
    const getImagePath = (path) => {
      const basePath = process.env.NODE_ENV === 'production' ? '/makeovers-by-bhuvita' : '';
      return basePath + path;
    };

  const portfolioCategories = ['All', 'Bridal Look', 'Engagement/Reception', 'HD/Party Makeups', 'Unique Hairdos'];

  const portfolioImages = portfolioData.map(img => ({
    ...img,
    url: getImagePath(`/portfolio/${img.file}`),
  }));

  const filteredImages = portfolioCategory === 'All'
    ? portfolioImages
    : portfolioImages.filter(img => img.category === portfolioCategory);

  // Keyboard navigation for lightbox (must be after portfolioImages definition)
  useEffect(() => {
    if (lightboxImage === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
      if (e.key === 'ArrowLeft' && lightboxImage > 0) setLightboxImage(lightboxImage - 1);
      if (e.key === 'ArrowRight' && lightboxImage < filteredImages.length - 1) setLightboxImage(lightboxImage + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxImage]);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      event: "Wedding - December 2023",
      text: "Bhuvita made my wedding day absolutely magical! Her attention to detail and understanding of my vision was perfect.",
      rating: 5
    },
    {
      id: 2,
      name: "Ananya Patel",
      event: "Wedding - January 2024",
      text: "Professional, talented, and so sweet! My makeup lasted all day through tears of joy and dancing. Highly recommend!",
      rating: 5
    },
    {
      id: 3,
      name: "Kavya Reddy",
      event: "Wedding - November 2023",
      text: "Bhuvita is an artist! She enhanced my natural features and made me feel like the most beautiful bride.",
      rating: 5
    },
    {
      id: 4,
      name: "Meera Kapoor",
      event: "Wedding - February 2024",
      text: "From the trial to the wedding day, Bhuvita was absolutely wonderful. She listened to all my ideas and created a look even better than I imagined!",
      rating: 5
    },
    {
      id: 5,
      name: "Simran Kaur",
      event: "Wedding - March 2024",
      text: "I was so nervous about my makeup but Bhuvita put me at ease immediately. My makeup was flawless and lasted through the entire celebration.",
      rating: 5
    },
    {
      id: 6,
      name: "Ritu Agarwal",
      event: "Destination Wedding - January 2024",
      text: "Bhuvita traveled to Udaipur for my destination wedding and handled everything perfectly. Every function had a different look and all were stunning!",
      rating: 5
    }
  ];

  const services = {
    onVenue: [
      {
        title: "Bridal Makeup",
        price: "₹25,000 onwards",
        features: ["HD/Airbrush Makeup", "Hair Styling", "Draping", "Touch-up Kit"],
        whatsapptext: "Hi Bhuvita, I am interested in on-studio bridal makeup"
      },
      {
        title: "Pre-Wedding Functions",
        price: "₹15,000 per function",
        features: ["Mehendi/Sangeet/Haldi", "Makeup & Hair", "Outfit Draping"],
        whatsapptext: "Hi Bhuvita, I am interested in pre-wedding function makeup"
      },
      {
        title: "Party Makeup",
        price: "₹8,000 onwards",
        features: ["Cocktail/Reception", "Professional Makeup", "Hairstyling"],
        whatsapptext: "Hi Bhuvita, I am interested in party makeup"
      },
      {
        title: "Bridal Package",
        price: "₹60,000",
        features: ["Complete Wedding", "All Functions Covered", "Family Makeup Available", "Premium Products"],
        whatsapptext: "Hi Bhuvita, I am interested in the on-studio bridal package"
      }
    ],
    outstation: [
      {
        title: "Destination Wedding",
        price: "₹80,000 onwards",
        features: ["Travel & Stay Extra", "Multiple Day Coverage", "Complete Bridal Services", "Team Available"],
        whatsapptext: "Hi Bhuvita, I am interested in destination wedding makeup services"
      },
      {
        title: "Outstation Bridal",
        price: "₹35,000 onwards",
        features: ["Single Day Service", "Travel Charges Apply", "Full Bridal Look", "Touch-up Kit Included"],
        whatsapptext: "Hi Bhuvita, I am interested in outstation bridal makeup"
      },
      {
        title: "Multi-City Package",
        price: "Custom Quote",
        features: ["Multiple Venues", "Flexible Schedule", "Dedicated Team", "Premium Service"],
        whatsapptext: "Hi Bhuvita, I am interested in the multi-city makeup package"
      },
      {
        title: "International Booking",
        price: "On Request",
        features: ["Overseas Weddings", "Visa & Travel Extra", "Extended Stay Options", "Luxury Service"],
        whatsapptext: "Hi Bhuvita, I am interested in international booking for makeup services"
      }
    ]
  };

  const stats = [
    { number: "200+", label: "Happy Brides" },
    { number: "3+", label: "Years Experience" },
    { number: "50+", label: "Destination Weddings" },
    { number: "4.9\u2605", label: "Average Rating" },
  ];

  const trustBadges = [
    { icon: Sparkles, label: "MAC, Bobbi Brown, Charlotte Tilbury, Huda Beauty & NARS Products" },
    { icon: Shield, label: "Internationally Certified MUA" },
    { icon: Star, label: "UV Ghai Certified" },
    { icon: Heart, label: "Hygiene First" },
    { icon: Clock, label: "On-Time Guarantee" },
  ];

  const processSteps = [
    { icon: MessageCircle, title: "Consultation", desc: "Discuss your vision, outfit, and preferences over a WhatsApp call" },
    { icon: Palette, title: "Trial Session", desc: "Test your complete look before the big day to ensure perfection" },
    { icon: Calendar, title: "Wedding Day", desc: "Relax while we create your dream bridal look on-site" },
    { icon: Heart, title: "Your Perfect Look", desc: "Walk down the aisle feeling confident and absolutely stunning" },
  ];

  const faqs = [
    { q: "How far in advance should I book?", a: "We recommend booking 2-3 months in advance for wedding dates, especially during peak season (October-February). For destination weddings, 4-6 months is ideal." },
    { q: "Do you offer trial sessions? What\u2019s included?", a: "Yes! A trial session includes a full bridal look with makeup and hair styling. This helps us finalize your perfect look before the wedding day. Trial charges are separate from the wedding day package." },
    { q: "What products and brands do you use?", a: "We use premium brands including MAC, Bobbi Brown, Charlotte Tilbury, and Huda Beauty. All products are genuine, skin-safe, and suited to Indian skin tones and weather conditions." },
    { q: "Can you do makeup for my bridesmaids and family?", a: "Absolutely! We offer family and bridesmaid packages. Our team can handle multiple people so everyone looks their best on your special day." },
    { q: "Do you travel for destination weddings?", a: "Yes, we travel across India and internationally. Travel and accommodation charges apply separately. We have experience with weddings in Goa, Udaipur, Jaipur, Dubai, and more." },
    { q: "How long does bridal makeup take?", a: "A complete bridal look typically takes 2-2.5 hours including makeup, hair styling, and draping. We recommend starting 3 hours before the ceremony for a relaxed experience." },
    { q: "What is your cancellation policy?", a: "We understand plans can change. Cancellations made 30+ days before the event receive a full refund minus the booking amount. Please reach out to discuss rescheduling options." },
    { q: "Do you provide a touch-up kit?", a: "Yes! Every bridal package includes a personalized touch-up kit with blotting papers, lipstick, and setting spray to keep you fresh throughout the celebrations." },
  ];

  const maxDesktopIndex = Math.max(filteredImages.length - 3, 0);

  const nextImage = () => {
    setCurrentImage((prev) => Math.min(prev + 1, filteredImages.length - 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => Math.max(prev - 1, 0));
  };

  const handleCategoryChange = (category) => {
    setPortfolioCategory(category);
    setCurrentImage(0);
  };

  // Touch swipe handlers for portfolio carousel
  const handlePortfolioTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handlePortfolioTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) nextImage();
    else if (delta < -50) prevImage();
    touchStartX.current = null;
  };

  // Touch swipe handlers for testimonial carousel
  const handleTestimonialTouchStart = (e) => { touchStartXTestimonial.current = e.touches[0].clientX; };
  const handleTestimonialTouchEnd = (e) => {
    if (touchStartXTestimonial.current === null) return;
    const delta = touchStartXTestimonial.current - e.changedTouches[0].clientX;
    if (delta > 50) setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    else if (delta < -50) setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    touchStartXTestimonial.current = null;
  };

  // Auto-rotate testimonials
  useEffect(() => {
    if (isTestimonialHovered) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestimonialHovered, testimonials.length]);

  return (
    <div className={`min-h-screen bg-[#FAF7F5] transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#8B6F47] to-[#D4A574] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-[3px] w-full bg-white/90 backdrop-blur-md z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-none'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-script text-[#8B6F47]">Makeovers by Bhuvita</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Home</a>
              <a href="#portfolio" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Portfolio</a>
              <a href="#services" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Services</a>
              <a href="#testimonials" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-[#8B6F47] transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#8B6F47] after:transition-all hover:after:w-full">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Home</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Portfolio</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Services</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Testimonials</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-[#F5E6D3] to-[#FAF7F5] relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-[#D4A574]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-[#8B6F47]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Making Your <span className="text-gradient-gold">Dream Day</span> Beautiful
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Professional bridal makeup artist in Chandigarh, Mohali &amp; Panchkula — creating stunning, personalized looks for your special day
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="https://wa.me/917888808231?text=Hi%20Bhuvita,%20I'm%20interested%20in%20your%20makeup%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#8B6F47] text-white px-8 py-3 rounded-full hover:bg-[#6B5637] transition transform hover:scale-105 hover-glow active-press">
                  Book Consultation
                </a>
                <a href="#portfolio" className="border-2 border-[#8B6F47] text-[#8B6F47] px-8 py-3 rounded-full hover:bg-[#8B6F47] hover:text-white transition transform hover:scale-105 active-press">
                  View Portfolio
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[#D4A574]/30">
                <img src={getImagePath('/hero-image.jpeg')} alt="Bridal Makeup" className="w-full h-full object-cover object-center" />
              </div>
              {/* Shimmer border accent */}
              <div className="absolute -inset-1 rounded-2xl animate-shimmer opacity-30 -z-10" />
              <div className="absolute bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 fill-current text-red-500" />
                  <span className="font-semibold">200+ Happy Brides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider: Hero → Social Proof */}
      <WaveDivider from="#FAF7F5" to="#5C4033" />

      {/* Social Proof Bar */}
      <section ref={statsRef} className="bg-[#5C4033] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-700 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <div key={index} className={statsAnimDone ? 'animate-count-bounce' : ''}>
                <p className="text-3xl sm:text-4xl font-bold text-[#D4A574]">
                  {statsInView ? (
                    index === 3 ? `${animatedStats[3]}★` :
                    `${animatedStats[index]}+`
                  ) : '0'}
                </p>
                <p className="text-white/80 text-sm sm:text-base mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-white/70">
                  <badge.icon className="h-4 w-4 text-[#D4A574]" />
                  <span className="text-xs sm:text-sm">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div ref={portfolioRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${portfolioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#D4A574] mb-3">01 / Portfolio</p>
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">My Portfolio</h2>
            <p className="text-lg text-gray-600">Capturing beauty, one bride at a time</p>
          </div>

          {/* Category Filter Tabs */}
          <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 transition-all duration-700 delay-200 ${portfolioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  portfolioCategory === category
                    ? 'bg-[#8B6F47] text-white shadow-md'
                    : 'bg-[#FAF7F5] text-[#8B6F47] hover:bg-[#D4A574]/20'
                }`}
              >
                {category}
                <span className="ml-1.5 text-xs opacity-70">
                  ({category === 'All' ? portfolioImages.length : portfolioImages.filter(img => img.category === category).length})
                </span>
              </button>
            ))}
          </div>

          {/* Desktop Gallery - 3 images */}
          <div className="hidden md:block mb-12">
            <div className="relative">
              <div className="grid grid-cols-3 gap-6">
                {[0, 1, 2].map((offset) => {
                  const imageIndex = Math.min(currentImage + offset, filteredImages.length - 1);
                  if (imageIndex < 0 || imageIndex >= filteredImages.length) return null;
                  return (
                    <div key={`${portfolioCategory}-${currentImage}-${offset}`} className="relative group animate-fadeIn cursor-pointer" onClick={() => setLightboxImage(imageIndex)}>
                      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-xl hover-golden-glow transition-shadow duration-300">
                        <img
                          src={filteredImages[imageIndex].url}
                          alt={filteredImages[imageIndex].description}
                          loading={imageIndex < 3 ? "eager" : "lazy"}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-lg font-semibold">{filteredImages[imageIndex].description}</p>
                          <p className="text-white/80 text-sm">{filteredImages[imageIndex].category}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {currentImage > 0 && (
                <button
                  onClick={prevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-[#FAF7F5] transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              {currentImage < maxDesktopIndex && (
                <button
                  onClick={nextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-[#FAF7F5] transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Gallery - Single image */}
          <div className="md:hidden mb-12">
            {filteredImages.length > 0 ? (
            <div className="relative" onTouchStart={handlePortfolioTouchStart} onTouchEnd={handlePortfolioTouchEnd}>
              <div key={`${portfolioCategory}-${currentImage}`} className="relative h-[400px] sm:h-[500px] overflow-hidden rounded-2xl shadow-xl animate-fadeIn cursor-pointer" onClick={() => setLightboxImage(currentImage)}>
                <img
                  src={filteredImages[currentImage]?.url}
                  alt={filteredImages[currentImage]?.description}
                  loading={currentImage === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-xl font-semibold">{filteredImages[currentImage]?.description}</p>
                  <p className="text-white/80">{filteredImages[currentImage]?.category}</p>
                </div>
              </div>
              {currentImage > 0 && (
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              {currentImage < filteredImages.length - 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>
            ) : (
              <p className="text-center text-gray-500">No images in this category</p>
            )}
          </div>

          {/* Image Counter */}
          {filteredImages.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <span className="text-sm text-gray-500">
              {currentImage + 1} / {filteredImages.length}
            </span>
          </div>
          )}
        </div>
      </section>

      {/* How It Works - Process Timeline */}
      <section className="py-20 bg-[#FAF7F5]">
        <div ref={processRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#D4A574] mb-3">02 / Process</p>
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">How It Works</h2>
            <p className="text-lg text-gray-600">From consultation to your perfect bridal look</p>
          </div>

          {/* Desktop: Horizontal timeline */}
          <div className="hidden md:flex items-start justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[12%] right-[12%] h-[2px] bg-[#D4A574]" />
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center text-center w-1/4 relative z-10 transition-all duration-700 ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="w-20 h-20 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-4 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
                  <step.icon className="h-8 w-8 text-[#8B6F47]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical timeline */}
          <div className="md:hidden space-y-8 relative pl-12">
            <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-[#D4A574]" />
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center shadow-md z-10">
                  <step.icon className="h-5 w-5 text-[#8B6F47]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave Divider: Process → Services */}
      <WaveDivider from="#FAF7F5" to="#F5E6D3" />

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#F5E6D3] relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute top-40 -right-40 w-96 h-96 rounded-full bg-[#D4A574]/10 blur-3xl pointer-events-none" />

        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-12 transition-all duration-700 ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#D4A574] mb-3">03 / Services</p>
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Services & Pricing</h2>
            <p className="text-lg text-gray-600">Tailored bridal, party &amp; engagement makeup packages in Chandigarh Tricity</p>
          </div>

          {/* Service Comparison Helper */}
          <div className="text-center mb-8">
            <a
              href="https://wa.me/917888808231?text=Hi%20Bhuvita,%20can%20you%20help%20me%20choose%20the%20right%20package?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5637] transition text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Not sure which package? Let us help you choose
            </a>
          </div>

          {/* On Venue Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-[#8B6F47]">On Studio(Chandigarh) Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.onVenue.map((service, index) => (
                <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full relative ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100 + 200}ms` }}>
                  {index === 0 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B6F47] text-white text-xs font-bold px-3 py-1 rounded-full">Popular</div>}
                  <div className="text-center mb-6">
                    <Palette className="h-12 w-12 text-[#8B6F47] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-2xl font-bold text-[#8B6F47]">{service.price}</p>
                  </div>
                  <ul className="space-y-2 flex-grow flex flex-col justify-end">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 text-[#D4A574] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/917888808231?text=${encodeURIComponent(service.whatsapptext)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full mt-6 bg-[#F5E6D3] text-[#8B6F47] py-2 rounded-full hover:bg-[#8B6F47] hover:text-white transition hover-glow active-press"
                  >
                    Book Now
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Outstation Services */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-[#8B6F47]">Outstation Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.outstation.map((service, index) => (
                <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-[#D4A574] flex flex-col h-full ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100 + 600}ms` }}>
                  <div className="text-center mb-6">
                    <Calendar className="h-12 w-12 text-[#8B6F47] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-2xl font-bold text-[#8B6F47]">{service.price}</p>
                  </div>
                  <ul className="space-y-2 flex-grow flex flex-col justify-end">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 text-[#D4A574] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/917888808231?text=${encodeURIComponent(service.whatsapptext)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full mt-6 bg-[#F5E6D3] text-[#8B6F47] py-2 rounded-full hover:bg-[#8B6F47] hover:text-white transition hover-glow active-press"
                  >
                    Inquire Now
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

      {/* Wave Divider: Services → Testimonials */}
      <WaveDivider from="#F5E6D3" to="#ffffff" />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
        <div ref={testimonialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${testimonialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#D4A574] mb-3">04 / Testimonials</p>
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Happy Brides</h2>
            <p className="text-lg text-gray-600">What our clients say about us</p>
          </div>

          {/* Testimonial Carousel */}
          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
            onTouchStart={(e) => { setIsTestimonialHovered(true); handleTestimonialTouchStart(e); }}
            onTouchEnd={(e) => { handleTestimonialTouchEnd(e); }}
          >
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-[#FAF7F5] rounded-2xl p-8 shadow-xl mx-auto max-w-2xl relative">
                      {/* Decorative quote mark */}
                      <div className="absolute top-4 left-6 text-[80px] leading-none text-[#D4A574]/20 font-serif pointer-events-none select-none">&ldquo;</div>
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-7 w-7 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg mb-6 italic text-center relative z-10">&ldquo;{testimonial.text}&rdquo;</p>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#D4A574] flex items-center justify-center mb-3 shadow-md">
                          <span className="text-white font-bold text-lg">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <p className="font-semibold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.event}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-[#FAF7F5] transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-[#FAF7F5] transition"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentTestimonial === index 
                      ? 'bg-[#8B6F47] w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#FAF7F5]">
        <div ref={faqRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#D4A574] mb-3">05 / FAQ</p>
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know before booking</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-500 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${index * 80 + 200}ms` }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-800 pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-[#8B6F47] flex-shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://wa.me/917888808231?text=Hi%20Bhuvita,%20I%20have%20a%20question%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5637] transition"
            >
              <MessageCircle className="h-4 w-4" />
              Have more questions? Chat with us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#F5E6D3] to-[#FAF7F5]">
        <div ref={contactRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-[#D4A574] mb-3">06 / Contact</p>
            <h2 className="text-4xl font-bold mb-4 text-gradient-gold">Get In Touch</h2>
            <p className="text-lg text-gray-600">Book your bridal makeup consultation in Chandigarh, Mohali &amp; Panchkula</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">

              <div className="flex flex-col md:flex-row justify-around text-center md:text-left gap-6">
                  <a 
                    href="https://wa.me/917888808231?text=Hi%20Bhuvita,%20I'm%20interested%20in%20your%20bridal%20makeup%20services" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start gap-3 text-gray-700 hover:text-[#8B6F47] transition"
                  >
                    <MessageCircle className="h-5 w-5 text-[#8B6F47]" />
                    <span>+91 78888 08231</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/makeoversbybhuvita" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start gap-3 text-gray-700 hover:text-[#8B6F47] transition"
                  >
                    <Instagram className="h-5 w-5 text-[#8B6F47]" />
                    <span>@makeoversbybhuvita</span>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Teaser */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Follow Our Work</h2>
            <a
              href="https://www.instagram.com/makeoversbybhuvita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5637] transition"
            >
              <Instagram className="h-5 w-5" />
              @makeoversbybhuvita
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[5, 11, 17, 24, 30, 36].map((imgNum) => (
              <a
                key={imgNum}
                href="https://www.instagram.com/makeoversbybhuvita"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={getImagePath(`/portfolio/${imgNum}.jpeg`)}
                  alt="Instagram"
                  className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5C4033] text-white pt-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-script mb-3 text-[#D4A574]">Makeovers by Bhuvita</h3>
              <p className="text-white/60 text-sm leading-relaxed">Professional bridal makeup artist creating stunning looks for your most special moments in Chandigarh, Mohali &amp; Panchkula.</p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-semibold text-[#D4A574] mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <a href="#home" className="text-white/60 hover:text-white text-sm transition">Home</a>
                <a href="#portfolio" className="text-white/60 hover:text-white text-sm transition">Portfolio</a>
                <a href="#services" className="text-white/60 hover:text-white text-sm transition">Services</a>
                <a href="#testimonials" className="text-white/60 hover:text-white text-sm transition">Testimonials</a>
                <a href="#contact" className="text-white/60 hover:text-white text-sm transition">Contact</a>
              </div>
            </div>

            {/* Social & Contact */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-[#D4A574] mb-3 text-sm uppercase tracking-wider">Connect</h4>
              <div className="flex justify-center md:justify-end gap-4 mb-3">
                <a href="https://www.instagram.com/makeoversbybhuvita" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A574]/30 flex items-center justify-center transition">
                  <Instagram className="h-5 w-5 text-white/80" />
                </a>
                <a href="https://wa.me/917888808231" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A574]/30 flex items-center justify-center transition">
                  <MessageCircle className="h-5 w-5 text-white/80" />
                </a>
                <a href="tel:+917888808231" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A574]/30 flex items-center justify-center transition">
                  <Phone className="h-5 w-5 text-white/80" />
                </a>
              </div>
              <p className="text-white/50 text-sm">+91 78888 08231</p>
            </div>
          </div>

          {/* Divider & Copyright */}
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-white/40 text-sm">&copy; 2025 Makeovers by Bhuvita. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp CTA */}
      {/* Mobile: full-width bar at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#25D366] shadow-lg">
        <a
          href="https://wa.me/917888808231?text=Hi%20Bhuvita,%20I'm%20interested%20in%20your%20makeup%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 text-white font-semibold"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
      {/* Desktop: floating button */}
      <a
        href="https://wa.me/917888808231?text=Hi%20Bhuvita,%20I'm%20interested%20in%20your%20makeup%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full items-center justify-center shadow-lg hover:bg-[#20BD5A] transition-colors group animate-pulse-slow"
        title="Chat on WhatsApp"
      >
        <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Portfolio Lightbox Modal */}
      {lightboxImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Prev button */}
          {lightboxImage > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxImage(lightboxImage - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredImages[lightboxImage].url}
              alt={filteredImages[lightboxImage].description}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
              <p className="text-white text-lg font-semibold text-center">{filteredImages[lightboxImage].description}</p>
              <p className="text-white/70 text-sm text-center">{lightboxImage + 1} / {filteredImages.length}</p>
            </div>
          </div>

          {/* Next button */}
          {lightboxImage < filteredImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxImage(lightboxImage + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-3 rounded-full transition z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`hidden md:flex fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full bg-[#8B6F47] text-white items-center justify-center shadow-lg hover:bg-[#6B5637] transition-all duration-300 hover-glow ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        title="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MakeoversByBhuvita;