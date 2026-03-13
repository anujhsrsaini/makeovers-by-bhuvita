"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, MessageCircle, Phone, Mail, Star, ChevronLeft, ChevronRight, ChevronDown, Calendar, Palette, Heart, Shield, Clock, Sparkles } from 'lucide-react';

const MakeoversByBhuvita = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const touchStartX = useRef(null);
  const touchStartXTestimonial = useRef(null);

    // Helper function for image paths
    const getImagePath = (path) => {
      const basePath = process.env.NODE_ENV === 'production' ? '/makeovers-by-bhuvita' : '';
      return basePath + path;
    };

  const portfolioImages = [
    { id: 1, url: getImagePath('/portfolio/1.jpeg'), category: 'Traditional', description: 'Traditional Bridal Look' },
    { id: 2, url: getImagePath('/portfolio/2.jpeg'), category: 'Contemporary', description: 'Modern Bride Makeup' },
    { id: 3, url: getImagePath('/portfolio/3.jpeg'), category: 'Reception', description: 'Reception Glam' },
    { id: 4, url: getImagePath('/portfolio/4.jpeg'), category: 'Mehendi', description: 'Traditional Bridal Look' },
    { id: 5, url: getImagePath('/portfolio/5.jpeg'), category: 'Sangeet', description: 'Punjabi Bridal Look' },
    { id: 6, url: getImagePath('/portfolio/6.jpeg'), category: 'Traditional', description: 'Traditional Bridal Look' },
    { id: 7, url: getImagePath('/portfolio/7.jpeg'), category: 'Engagement', description: 'Modern Engagement Look' },
    { id: 8, url: getImagePath('/portfolio/8.jpeg'), category: 'Traditional', description: 'South Indian Bridal' },
    { id: 9, url: getImagePath('/portfolio/9.jpeg'), category: 'Traditional', description: 'Classic Bridal Glam' },
    { id: 10, url: getImagePath('/portfolio/10.jpeg'), category: 'Sangeet', description: 'Sangeet Night Look' },
    { id: 11, url: getImagePath('/portfolio/11.jpeg'), category: 'Contemporary', description: 'Contemporary Bridal' },
    { id: 12, url: getImagePath('/portfolio/12.jpeg'), category: 'Reception', description: 'Reception Ready' },
    { id: 13, url: getImagePath('/portfolio/13.jpeg'), category: 'Mehendi', description: 'Mehendi Ceremony Look' },
    { id: 14, url: getImagePath('/portfolio/14.jpeg'), category: 'Traditional', description: 'Traditional Elegance' },
    { id: 15, url: getImagePath('/portfolio/15.jpeg'), category: 'Party', description: 'Party Glam' },
    { id: 16, url: getImagePath('/portfolio/16.jpeg'), category: 'Engagement', description: 'Engagement Look' },
    { id: 17, url: getImagePath('/portfolio/17.jpeg'), category: 'Traditional', description: 'Bridal Radiance' },
    { id: 18, url: getImagePath('/portfolio/18.jpeg'), category: 'Contemporary', description: 'Modern Glam Bride' },
    { id: 19, url: getImagePath('/portfolio/19.jpeg'), category: 'Sangeet', description: 'Sangeet Ready' },
    { id: 20, url: getImagePath('/portfolio/20.jpeg'), category: 'Reception', description: 'Cocktail Night' },
    { id: 21, url: getImagePath('/portfolio/21.jpeg'), category: 'Traditional', description: 'Timeless Bridal' },
    { id: 22, url: getImagePath('/portfolio/22.jpeg'), category: 'Mehendi', description: 'Haldi Glow' },
    { id: 23, url: getImagePath('/portfolio/23.jpeg'), category: 'Party', description: 'Festive Glam' },
    { id: 24, url: getImagePath('/portfolio/24.jpeg'), category: 'Traditional', description: 'Royal Bridal Look' },
    { id: 25, url: getImagePath('/portfolio/25.jpeg'), category: 'Contemporary', description: 'Dewy Bride' },
    { id: 26, url: getImagePath('/portfolio/26.jpeg'), category: 'Engagement', description: 'Ring Ceremony Glam' },
    { id: 27, url: getImagePath('/portfolio/27.jpeg'), category: 'Traditional', description: 'Heritage Bride' },
    { id: 28, url: getImagePath('/portfolio/28.jpeg'), category: 'Sangeet', description: 'Dance Night Look' },
    { id: 29, url: getImagePath('/portfolio/29.jpeg'), category: 'Reception', description: 'Evening Elegance' },
    { id: 30, url: getImagePath('/portfolio/30.jpeg'), category: 'Traditional', description: 'Golden Hour Bride' },
    { id: 31, url: getImagePath('/portfolio/31.jpeg'), category: 'Party', description: 'Glamour Look' },
    { id: 32, url: getImagePath('/portfolio/32.jpeg'), category: 'Contemporary', description: 'Soft Glam Bride' },
    { id: 33, url: getImagePath('/portfolio/33.jpeg'), category: 'Mehendi', description: 'Floral Mehendi Look' },
    { id: 34, url: getImagePath('/portfolio/34.jpeg'), category: 'Traditional', description: 'Regal Bridal' },
    { id: 35, url: getImagePath('/portfolio/35.jpeg'), category: 'Sangeet', description: 'Vibrant Night Look' },
    { id: 36, url: getImagePath('/portfolio/36.jpeg'), category: 'Traditional', description: 'Classic Bridal Beauty' },
    { id: 37, url: getImagePath('/portfolio/37.jpeg'), category: 'Reception', description: 'Starlit Reception' },
    { id: 38, url: getImagePath('/portfolio/38.jpeg'), category: 'Contemporary', description: 'Minimalist Bride' },
    { id: 39, url: getImagePath('/portfolio/39.jpeg'), category: 'Traditional', description: 'Grand Bridal Look' },
  ];

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
    { icon: Sparkles, label: "MAC & Bobbi Brown Products" },
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

  const maxDesktopIndex = portfolioImages.length - 3;

  const nextImage = () => {
    setCurrentImage((prev) => Math.min(prev + 1, portfolioImages.length - 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => Math.max(prev - 1, 0));
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
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
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
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-[#F5E6D3] to-[#FAF7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Making Your <span className="text-[#8B6F47]">Dream Day</span> Beautiful
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Professional bridal makeup artist in Chandigarh, Mohali &amp; Panchkula — creating stunning, personalized looks for your special day
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="https://wa.me/917888808231?text=Hi%20Bhuvita,%20I'm%20interested%20in%20your%20makeup%20services"  
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#8B6F47] text-white px-8 py-3 rounded-full hover:bg-[#6B5637] transition transform hover:scale-105">
                  Book Consultation
                </a>
                <a href="#portfolio" className="border-2 border-[#8B6F47] text-[#8B6F47] px-8 py-3 rounded-full hover:bg-[#8B6F47] hover:text-white transition transform hover:scale-105">
                  View Portfolio
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 md:h-[600px] bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-2xl overflow-hidden shadow-2xl">
                <img src={getImagePath('/hero-image.jpeg')} alt="Bridal Makeup" className="w-full h-full object-cover object-center" />
              </div>
              <div className="absolute bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 fill-current text-red-500" />
                  <span className="font-semibold">200+ Happy Brides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-[#5C4033] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl sm:text-4xl font-bold text-[#D4A574]">{stat.number}</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">My Portfolio</h2>
            <p className="text-lg text-gray-600">Capturing beauty, one bride at a time</p>
          </div>

          {/* Desktop Gallery - 3 images */}
          <div className="hidden md:block mb-12">
            <div className="relative">
              <div className="grid grid-cols-3 gap-6">
                {[0, 1, 2].map((offset) => {
                  const imageIndex = Math.min(currentImage + offset, portfolioImages.length - 1);
                  return (
                    <div key={`${currentImage}-${offset}`} className="relative group animate-fadeIn">
                      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-xl">
                        <img
                          src={portfolioImages[imageIndex].url}
                          alt={portfolioImages[imageIndex].description}
                          loading={imageIndex < 3 ? "eager" : "lazy"}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-lg font-semibold">{portfolioImages[imageIndex].description}</p>
                          <p className="text-white/80 text-sm">{portfolioImages[imageIndex].category}</p>
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
            <div className="relative" onTouchStart={handlePortfolioTouchStart} onTouchEnd={handlePortfolioTouchEnd}>
              <div key={currentImage} className="relative h-[400px] sm:h-[500px] overflow-hidden rounded-2xl shadow-xl animate-fadeIn">
                <img
                  src={portfolioImages[currentImage].url}
                  alt={portfolioImages[currentImage].description}
                  loading={currentImage === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-xl font-semibold">{portfolioImages[currentImage].description}</p>
                  <p className="text-white/80">{portfolioImages[currentImage].category}</p>
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
              {currentImage < portfolioImages.length - 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          {/* Image Counter */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <span className="text-sm text-gray-500">
              {currentImage + 1} / {portfolioImages.length}
            </span>
          </div>
        </div>
      </section>

      {/* How It Works - Process Timeline */}
      <section className="py-20 bg-[#FAF7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">From consultation to your perfect bridal look</p>
          </div>

          {/* Desktop: Horizontal timeline */}
          <div className="hidden md:flex items-start justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-[12%] right-[12%] h-[2px] bg-[#D4A574]" />
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center w-1/4 relative z-10">
                <div className="w-20 h-20 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-4 shadow-md">
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Services & Pricing</h2>
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
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col h-full">
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
                    className="block text-center w-full mt-6 bg-[#F5E6D3] text-[#8B6F47] py-2 rounded-full hover:bg-[#8B6F47] hover:text-white transition"
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
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border-2 border-[#D4A574] flex flex-col h-full">
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
                    className="block text-center w-full mt-6 bg-[#F5E6D3] text-[#8B6F47] py-2 rounded-full hover:bg-[#8B6F47] hover:text-white transition"
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Happy Brides</h2>
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
                    <div className="bg-[#FAF7F5] rounded-2xl p-8 shadow-xl mx-auto max-w-2xl">
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg mb-6 italic text-center">&ldquo;{testimonial.text}&rdquo;</p>
                      <div className="text-center">
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know before booking</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
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
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
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
      <footer className="bg-[#5C4033] text-white py-8 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-script mb-4">Makeovers by Bhuvita</h3>
            <p className="text-[#D4A574]">&copy; 2025 All rights reserved | Crafted with love</p>
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
    </div>
  );
};

export default MakeoversByBhuvita;