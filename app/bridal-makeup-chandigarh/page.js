import React from 'react';
import Link from 'next/link';
import SubpageLayout from '../components/SubpageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import FaqAccordion from '../components/FaqAccordion';
import PortfolioShowcase from '../components/PortfolioShowcase';
import {
  Sparkles,
  CheckCircle2,
  Heart,
  Crown,
  ShieldCheck,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  Phone,
  ArrowRight,
  Layers,
  Award,
  Gem,
} from 'lucide-react';

const isProd = process.env.NODE_ENV === 'production';
const siteUrl = isProd
  ? 'https://anujhsrsaini.github.io/makeovers-by-bhuvita'
  : 'http://localhost:3000';
const canonicalUrl = `${siteUrl}/bridal-makeup-chandigarh`;

const WHATSAPP_NUMBER = '917888808231';
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const WA_BRIDAL = waLink(
  "Hi Bhuvita! I'm inquiring about Bridal Makeup in Chandigarh. My wedding date is [Date] and venue is [Venue/City]. Please share availability and details."
);

export const metadata = {
  title: 'Bridal Makeup in Chandigarh | Makeovers by Bhuvita',
  description:
    'Looking for subtle, skin-like bridal makeup in Chandigarh? UV Ghai-certified artist Bhuvita crafts timeless, radiant bridal looks with luxury products. View packages & book on WhatsApp.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Bridal Makeup in Chandigarh | Makeovers by Bhuvita',
    description:
      'Subtle, skin-like bridal makeup in Chandigarh by UV Ghai-certified artist Bhuvita. Charlotte Tilbury, MAC, Huda Beauty. 200+ brides. Book on WhatsApp.',
    url: canonicalUrl,
    siteName: 'Makeovers by Bhuvita',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Bridal Makeup in Chandigarh by Makeovers by Bhuvita',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridal Makeup in Chandigarh | Makeovers by Bhuvita',
    description:
      'Subtle, skin-like bridal makeup in Chandigarh. UV Ghai certified, 200+ brides. View packages & book on WhatsApp.',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

const bridalFaqs = [
  {
    question: "What is subtle, skin-like bridal makeup, and how is it different from traditional bridal makeup?",
    answer: "Subtle, skin-like makeup enhances your natural bone structure and radiance rather than concealing your face beneath heavy, cakey layers of foundation. Unlike traditional bridal makeup that can feel mask-like, emphasize texture, or create an artificial white cast under flash photography, Bhuvita's technique focuses on thorough skin prep, color correction, and sheer micro-layering. You get full photo-ready longevity and coverage while your skin still looks, breathes, and feels like real skin."
  },
  {
    question: "How far in advance should I book my bridal makeup in Chandigarh?",
    answer: "Because Bhuvita takes only one or two brides per auspicious wedding date to ensure undivided personal attention and zero rushed timelines, peak autumn/winter wedding dates (October through February) typically book 3 to 6 months in advance. Spring and summer dates fill up 1 to 3 months early. We encourage checking your date on WhatsApp as early as your wedding date and venue are finalized."
  },
  {
    question: "Where does the bridal makeup take place — at your studio or at my wedding venue?",
    answer: "Both options are available! You can either get ready in the calm, private luxury vanity setup at our Sector 37A Chandigarh studio, or Bhuvita can travel on-venue directly to your hotel suite, banquet, or home anywhere across Chandigarh, Mohali, Panchkula, Zirakpur, and Kharar. Outstation bridal bookings across Punjab, Haryana, Himachal, and destination weddings across India are also supported."
  },
  {
    question: "What luxury brands and products are in Bhuvita's bridal kit?",
    answer: "Bhuvita works strictly with 100% authentic, high-end international skincare and cosmetics. Her kit includes Charlotte Tilbury (Magic Cream, Airbrush Flawless Powder, Hollywood Flawless Filter), MAC Cosmetics, Huda Beauty, Bobbi Brown, NARS, Dior, Laura Mercier, and Anastasia Beverly Hills. No drugstore dupes or harsh local formulations are ever used."
  },
  {
    question: "Do bridal packages include hair styling, dupatta draping, and jewelry setting?",
    answer: "Yes, absolutely! Every bridal booking is an all-inclusive bespoke styling experience. It includes full skin prep, HD skin-like makeup, customized bridal hairstyling (textured buns, Hollywood waves, or floral braids), double-dupatta pleating and pinning, heavy lehenga draping, matha patti/maang tikka securing, zero-power lenses, and premium eyelashes."
  }
];

export default function BridalMakeupChandigarhPage() {
  const breadcrumbsList = [
    { label: 'Bridal Makeup in Chandigarh', href: '/bridal-makeup-chandigarh' },
  ];

  // Structured Data JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bridal Makeup in Chandigarh',
        item: canonicalUrl,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: 'Bridal Makeup in Chandigarh',
    serviceType: 'Bridal Makeup',
    description:
      'Subtle, skin-like bridal makeup in Chandigarh by UV Ghai-certified artist Bhuvita. Luxury kit, hair styling, lenses, lashes, veil draping & jewelry setting included.',
    provider: {
      '@type': 'BeautySalon',
      name: 'Makeovers by Bhuvita',
      telephone: '+91-78888-08231',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sector 37A',
        addressLocality: 'Chandigarh',
        addressRegion: 'Chandigarh',
        postalCode: '160036',
        addressCountry: 'IN',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'City', name: 'Panchkula' },
      { '@type': 'City', name: 'Zirakpur' },
      { '@type': 'City', name: 'Kharar' },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Signature Bridal Makeup',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 22000,
          priceCurrency: 'INR',
        },
        description: 'Complete signature wedding day bridal makeup with hair styling, lenses, lashes, draping & jewelry setting.',
      },
      {
        '@type': 'Offer',
        name: 'Luxury Waterproof Bridal Makeup',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 27000,
          priceCurrency: 'INR',
        },
        description: 'Ultra long-wear tear-proof waterproof bridal makeup with hair styling, lenses, lashes, draping & jewelry setting.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: bridalFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <SubpageLayout>
      {/* Schema scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#F5E6D3]/40 via-[#FAF7F5] to-white pt-8 pb-16 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbsList} />

          <div className="max-w-4xl">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 bg-[#8B6F47]/10 text-[#8B6F47] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Chandigarh&apos;s Signature Subtle Bridal Artistry</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight mb-6">
              Subtle &amp; Skin-Like Bridal Makeup in Chandigarh
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
              Enhancing your authentic radiance for your wedding day. Certified by{' '}
              <strong className="text-gray-900 font-semibold">UV Ghai</strong>, Bhuvita crafts timeless,
              breathable bridal looks free of heavy masks or ghostly flashback. Studio in{' '}
              <span className="text-[#8B6F47] font-semibold">Sector 37A</span> and on-venue services
              across Chandigarh, Mohali &amp; Panchkula.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Award className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">UV Ghai</span> Certified Artist
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Heart className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">200+ Brides</span> Handcrafted
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Clock className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">5+ Years</span> Experience
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Gem className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">100% Luxury</span> Makeup Kit
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={WA_BRIDAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>Book Bridal Consultation on WhatsApp</span>
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white font-semibold px-8 py-3.5 rounded-full transition active:scale-95"
              >
                <span>View Packages &amp; Pricing</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Replies within a few hours &bull; Limited wedding bookings per calendar date
            </p>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              The Makeovers by Bhuvita Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Why Discerning Chandigarh Brides Choose Bhuvita
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              We reject the one-shade-fits-all, chalky bridal masks common in standard salons.
              Every bride deserves tailored artistry that honors her natural beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-5">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5">
                Breathable, Skin-Like Base
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Seamless micro-pigmentation and hydrating skin prep ensure your base looks flawless both up close in daylight and under high-definition 4K wedding cinematography.
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5">
                UV Ghai Certified Artistry
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Trained directly under master bridal educator UV Ghai in structural facial contouring, color theory, and long-wearing bridal formulations designed for Indian ceremonies.
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-5">
                <Gem className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5">
                100% International Kit
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Charlotte Tilbury, MAC, Huda Beauty, Bobbi Brown, NARS, and Dior. Zero drugstore substitutes or harsh chemicals that could irritate your skin on your wedding day.
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-5">
                <Crown className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5">
                Total Bridal Draping
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Precision double dupatta pleating, heavy cancan lehenga placement, matha patti pinning, and custom hair ornamentation for seamless elegance from head to toe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bridal Packages Breakdown */}
      <section id="packages" className="py-16 sm:py-24 bg-[#FAF7F5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Transparent Pricing &bull; No Surprises
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Chandigarh Bridal Makeup Packages
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Book your standalone wedding day look or choose the comprehensive all-functions suite for cohesive styling across every ceremony.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Signature Bridal */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#8B6F47] text-white text-xs font-semibold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>

              <div>
                <div className="mb-6">
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                    Classic Wedding Day
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900">
                    Signature Bridal Look
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">₹22,000</span>
                    <span className="text-sm font-medium text-gray-500">Studio / ₹25,000 Venue</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Complete bridal transformation designed for Anand Karaj, morning weddings, or evening pheras.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-3.5 mb-8 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Customized luxury skin preparation suited to your skin type</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>HD skin-like base with seamless micro-contouring</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Bridal hairstyling (textured bun, Hollywood waves, or bridal braid)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Zero-power lenses &amp; premium eyelashes included</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Double dupatta setting &amp; heavy lehenga draping</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Jewellery, matha patti, passaa, and kalira securing</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <a
                  href={waLink("Hi Bhuvita! I'd like to check availability for Signature Bridal Makeup (₹22,000 Studio / ₹25,000 Venue) on [Date] at [Venue].")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#8B6F47] hover:bg-[#725a38] text-white font-semibold py-3.5 px-6 rounded-full transition active:scale-95 shadow-xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Check Availability on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Card 2: Luxury Waterproof Bridal Look */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#8B6F47] shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#8B6F47] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                16h+ Waterproof
              </div>

              <div>
                <div className="mb-6">
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                    Tear-Proof &amp; Long-Wear
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900">
                    Luxury Waterproof Bridal
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">₹27,000</span>
                    <span className="text-sm font-medium text-gray-500">Studio / ₹30,000 Venue</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Ultra-durable, emotion-proof waterproof formulation built for tearful moments and long wedding rituals.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-3.5 mb-8 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Specialized tear-proof, sweat-proof waterproof luxury base</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>HD radiant finish with maximum transfer resistance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Bridal hairstyling (textured bun, Hollywood waves, or bridal braid)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Zero-power lenses &amp; premium eyelashes included</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Double dupatta setting &amp; heavy lehenga draping</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Jewellery, matha patti, passaa, and kalira securing</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <a
                  href={waLink("Hi Bhuvita! I'd like to check availability for Luxury Waterproof Bridal Makeup (₹27,000 Studio / ₹30,000 Venue) on [Date] at [Venue].")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3.5 px-6 rounded-full transition active:scale-95 shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Inquire for Wedding Dates</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Bridal Portfolio Showcase */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioShowcase
            imageIds={[1, 101, 2, 102, 4, 6, 9, 21, 24, 28, 30]}
            title="Curated Chandigarh Bridal Portfolio"
            subtitle="Explore real brides styled by Bhuvita across royal lehengas, pastel palettes, traditional Punjabi reds, and modern fusion ceremonies."
          />
        </div>
      </section>

      {/* What's Included: 4 Luxury Pillars */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F5] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Every Little Detail Taken Care Of
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              What&apos;s Included in Your Bridal Session
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              On your wedding day, you shouldn&apos;t have to stress about a single pin or touch-up. Here is our end-to-end bridal luxury workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-script text-[#8B6F47] mb-3">01</div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                Customized Skin Prep
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Targeted hydration, gentle lymphatic drainage prep, and customized barrier protection to ensure base adhesion for 14+ hours without slipping.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-script text-[#8B6F47] mb-3">02</div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                Bespoke Bridal Hair
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Architectural buns, classic French twists, romantic textured waves, or traditional Punjabi braids adorned with real baby’s breath or custom jewelry.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-script text-[#8B6F47] mb-3">03</div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                Veil &amp; Lehenga Draping
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Expert securing of heavy bridal dupattas so your neck remains comfortable throughout the pheras and your pleats stay crisp in every photo.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-script text-[#8B6F47] mb-3">04</div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                Jewellery &amp; Lens Setting
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Flawless placement and secure pinning of matha patti, passaa, kaliras, and comfortable zero-power eye lens insertion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
              Frequently Asked Questions &bull; Bridal Makeup
            </h2>
          </div>

          <FaqAccordion faqs={bridalFaqs} />
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-[#5C4033] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4A574] block mb-3">
            Secure Your Wedding Date
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
            Ready to Experience Weightless Bridal Radiance?
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Tell Bhuvita your wedding date and venue in Chandigarh Tricity. We will check calendar availability and design your bridal consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WA_BRIDAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-4 rounded-full transition shadow-lg text-base active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chat Directly on WhatsApp</span>
            </a>
            <a
              href="tel:+917888808231"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition text-base"
            >
              <Phone className="h-4 w-4" />
              <span>Call +91 78888 08231</span>
            </a>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
