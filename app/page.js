"use client"
import React, { useState } from 'react';
import { Menu, X, Instagram, MessageCircle, Phone, Mail, Star, ChevronLeft, ChevronRight, Calendar, Palette, Heart } from 'lucide-react';

const MakeoversByBhuvita = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // Helper function for image paths
    const getImagePath = (path) => {
      const basePath = process.env.NODE_ENV === 'production' ? '/makeovers-by-bhuvita' : '';
      return basePath + path;
    };

  // Portfolio images - replace with actual images
  const portfolioImages = [
    { id: 1, url: getImagePath('/portfolio/1.jpeg'), category: 'Traditional', description: 'Traditional Bridal Look' },
    { id: 2, url: getImagePath('/portfolio/2.jpeg'), category: 'Contemporary', description: 'Modern Bride Makeup' },
    { id: 3, url: getImagePath('/portfolio/3.jpeg'), category: 'Reception', description: 'Reception Glam' },
    { id: 4, url: getImagePath('/portfolio/4.jpeg'), category: 'Mehendi', description: 'Traditional Bridal Look' },
    { id: 5, url: getImagePath('/portfolio/5.jpeg'), category: 'Sangeet', description: 'Punjabi Bridal Look' },
    { id: 6, url: getImagePath('/portfolio/6.jpeg'), category: 'Traditional', description: 'Traditional Bridal Look' },
    { id: 7, url: getImagePath('/portfolio/7.jpeg'), category: 'Engagement', description: 'Modern Engagement Look' },
    { id: 8, url: getImagePath('/portfolio/8.jpeg'), category: 'Traditional', description: 'South Indian Bridal' },
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
      name: "Kavya Reddy",
      event: "Wedding - November 2023",
      text: "Bhuvita is an artist! She enhanced my natural features and made me feel like the most beautiful bride.",
      rating: 5
    },
    {
      id: 5,
      name: "Kavya Reddy",
      event: "Wedding - November 2023",
      text: "Bhuvita is an artist! She enhanced my natural features and made me feel like the most beautiful bride.",
      rating: 5
    },
    {
      id: 6,
      name: "Kavya Reddy",
      event: "Wedding - November 2023",
      text: "Bhuvita is an artist! She enhanced my natural features and made me feel like the most beautiful bride.",
      rating: 5
    }
  ];

  const services = {
    onVenue: [
      {
        title: "Bridal Makeup",
        price: "₹25,000 onwards",
        features: ["HD/Airbrush Makeup", "Hair Styling", "Draping", "Touch-up Kit"]
      },
      {
        title: "Pre-Wedding Functions",
        price: "₹15,000 per function",
        features: ["Mehendi/Sangeet/Haldi", "Makeup & Hair", "Outfit Draping"]
      },
      {
        title: "Party Makeup",
        price: "₹8,000 onwards",
        features: ["Cocktail/Reception", "Professional Makeup", "Hairstyling"]
      },
      {
        title: "Bridal Package",
        price: "₹60,000",
        features: ["Complete Wedding", "All Functions Covered", "Family Makeup Available", "Premium Products"]
      }
    ],
    outstation: [
      {
        title: "Destination Wedding",
        price: "₹80,000 onwards",
        features: ["Travel & Stay Extra", "Multiple Day Coverage", "Complete Bridal Services", "Team Available"]
      },
      {
        title: "Outstation Bridal",
        price: "₹35,000 onwards",
        features: ["Single Day Service", "Travel Charges Apply", "Full Bridal Look", "Touch-up Kit Included"]
      },
      {
        title: "Multi-City Package",
        price: "Custom Quote",
        features: ["Multiple Venues", "Flexible Schedule", "Dedicated Team", "Premium Service"]
      },
      {
        title: "International Booking",
        price: "On Request",
        features: ["Overseas Weddings", "Visa & Travel Extra", "Extended Stay Options", "Luxury Service"]
      }
    ]
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % portfolioImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-script text-[#8B6F47]">Makeovers by Bhuvita</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#8B6F47] transition">Home</a>
              <a href="#portfolio" className="text-gray-700 hover:text-[#8B6F47] transition">Portfolio</a>
              <a href="#services" className="text-gray-700 hover:text-[#8B6F47] transition">Services</a>
              <a href="#testimonials" className="text-gray-700 hover:text-[#8B6F47] transition">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-[#8B6F47] transition">Contact</a>
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
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Home</a>
              <a href="#portfolio" className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Portfolio</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Services</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Testimonials</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-[#8B6F47]">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-[#F5E6D3] to-[#FAF7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Making Your <span className="text-[#8B6F47]">Dream Day</span> Beautiful
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Professional bridal makeup artist specializing in creating stunning, personalized looks for your special day
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
                <img src={getImagePath('/hero-image.jpeg')} alt="Bridal Makeup" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 fill-current text-red-500" />
                  <span className="font-semibold">200+ Happy Brides</span>
                </div>
              </div>
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
                  const imageIndex = (currentImage + offset) % portfolioImages.length;
                  return (
                    <div key={offset} className="relative group">
                      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-xl">
                        <img 
                          src={portfolioImages[imageIndex].url} 
                          alt={portfolioImages[imageIndex].description}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
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
              <button 
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-[#FAF7F5] transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg p-3 rounded-full hover:bg-[#FAF7F5] transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Gallery - Single image */}
          <div className="md:hidden mb-12">
            <div className="relative">
              <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={portfolioImages[currentImage].url} 
                  alt={portfolioImages[currentImage].description}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-xl font-semibold">{portfolioImages[currentImage].description}</p>
                  <p className="text-white/80">{portfolioImages[currentImage].category}</p>
                </div>
              </div>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2">
            {portfolioImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImage === index 
                    ? 'bg-[#8B6F47] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Services & Pricing</h2>
            <p className="text-lg text-gray-600">Tailored packages for your perfect day</p>
          </div>

          {/* On Venue Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-[#8B6F47]">On Studio(Chandigarh) Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.onVenue.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                  <div className="text-center mb-6">
                    <Palette className="h-12 w-12 text-[#8B6F47] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-2xl font-bold text-[#8B6F47]">{service.price}</p>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 text-[#D4A574] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-6 bg-[#F5E6D3] text-[#8B6F47] py-2 rounded-full hover:bg-[#8B6F47] hover:text-white transition">
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Outstation Services */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-[#8B6F47]">Outstation Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.outstation.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border-2 border-[#D4A574]">
                  <div className="text-center mb-6">
                    <Calendar className="h-12 w-12 text-[#8B6F47] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-2xl font-bold text-[#8B6F47]">{service.price}</p>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 text-[#D4A574] mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-6 bg-[#F5E6D3] text-[#8B6F47] py-2 rounded-full hover:bg-[#8B6F47] hover:text-white transition">
                    Inquire Now
                  </button>
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
          <div className="relative max-w-4xl mx-auto">
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
                      <p className="text-gray-700 text-lg mb-6 italic text-center">"{testimonial.text}"</p>
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#F5E6D3] to-[#FAF7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">Let's make your special day unforgettable</p>
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

      {/* Footer */}
      <footer className="bg-[#5C4033] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-script mb-4">Makeovers by Bhuvita</h3>
            <p className="text-[#D4A574]">© 2025 All rights reserved | Crafted with love</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MakeoversByBhuvita;