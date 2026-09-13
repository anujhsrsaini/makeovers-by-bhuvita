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
  MapPin,
  Clock,
  MessageCircle,
  Phone,
  ArrowRight,
  Award,
  Gem,
  Building,
  Sparkle,
} from 'lucide-react';

const isProd = process.env.NODE_ENV === 'production';
const siteUrl = isProd
  ? 'https://anujhsrsaini.github.io/makeovers-by-bhuvita'
  : 'http://localhost:3000';
const canonicalUrl = `${siteUrl}/makeup-artist-in-panchkula`;

const WHATSAPP_NUMBER = '917888808231';
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const WA_PANCHKULA = waLink(
  "Hi Bhuvita! I'm inquiring about bridal/party makeup in Panchkula for my wedding on [Date] at [Venue/Sector in Panchkula]. Please share details and availability."
);

export const metadata = {
  title: 'Makeup Artist in Panchkula | Subtle Bridal Looks | Makeovers by Bhuvita',
  description:
    'Looking for a luxury bridal and party makeup artist in Panchkula? UV Ghai-certified artist Bhuvita provides on-venue service across Sector 20, Sector 11, MDC & Pinjore banquets.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Makeup Artist in Panchkula | Subtle Bridal Looks | Makeovers by Bhuvita',
    description:
      'Subtle, skin-like bridal makeup in Panchkula by UV Ghai-certified artist Bhuvita. On-venue luxury services across Sector 20, Sector 11, MDC & Pinjore resorts.',
    url: canonicalUrl,
    siteName: 'Makeovers by Bhuvita',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Makeup Artist in Panchkula - Makeovers by Bhuvita',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makeup Artist in Panchkula | Subtle Bridal Looks | Makeovers by Bhuvita',
    description:
      'Subtle, skin-like bridal makeup in Panchkula. On-venue services across Sector 20, MDC, Pinjore. Book on WhatsApp.',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

const panchkulaFaqs = [
  {
    question: "Do you travel to wedding banquets and resorts in Panchkula, MDC, and Pinjore?",
    answer: "Yes, absolutely. Bhuvita frequently travels on-venue to luxury wedding venues across Panchkula, Mansa Devi Complex (MDC), and the Pinjore-Kalka belt. Key venues served include Holiday Inn Chandigarh Panchkula, Welcomhotel Bella Vista, Golden Tulip Panchkula, The Lalit (Chandigarh-Panchkula border), and surrounding open-lawn resorts. We bring full professional lighting and vanity setups directly to your bridal suite."
  },
  {
    question: "How early do you arrive at the venue for morning wedding pheras in Panchkula?",
    answer: "For early morning Anand Karaj or morning pheras, Bhuvita arrives at your Panchkula venue 3 to 3.5 hours prior to your scheduled photography or departure time. We plan the schedule backwards from the bride's final photo call to ensure zero rush, perfectly pinned dupattas, and time for calm bridal portraits."
  },
  {
    question: "Can I book a trial session before confirming my Panchkula wedding date?",
    answer: "Yes! Paid bridal consultation and preview sessions are held at our dedicated studio in Sector 37A, Chandigarh (approx. 15–20 minutes from Panchkula via Madhya Marg or Dakshin Marg). During the trial, Bhuvita analyzes your skin undertone, discusses your bridal lehenga colors, and tests product textures to design your bespoke wedding day look."
  },
  {
    question: "What style of makeup do you specialize in for Panchkula brides?",
    answer: "Bhuvita specializes in subtle, skin-like bridal makeup that looks ethereal and radiant rather than heavily plastered or artificial. Modern Panchkula brides love that their skin breathes, looks natural in daytime sunlight, and photographs flawlessly under 4K lenses without flashback."
  },
  {
    question: "What is included in your Panchkula bridal makeup service?",
    answer: "Every Panchkula bridal booking is fully comprehensive: personalized luxury skin prep, HD skin-like makeup with micro-contouring, customized bridal hair styling, double dupatta draping and pinning, heavy lehenga pleating, jewelry and kalira placement, zero-power eye lenses, and premium lashes."
  }
];

export default function MakeupArtistInPanchkulaPage() {
  const breadcrumbsList = [
    { label: 'Makeup Artist in Panchkula', href: '/makeup-artist-in-panchkula' },
  ];

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
        name: 'Makeup Artist in Panchkula',
        item: canonicalUrl,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: 'Bridal & Occasion Makeup Artist in Panchkula',
    serviceType: 'Makeup Artistry',
    description:
      'Premier makeup artist for Panchkula brides. Subtle, skin-like makeup, on-venue service across Sector 20, Sector 11, MDC & Pinjore wedding resorts.',
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
      { '@type': 'City', name: 'Panchkula' },
      { '@type': 'AdministrativeArea', name: 'Panchkula District' },
      { '@type': 'City', name: 'Pinjore' },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Bridal Makeup Panchkula',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 25000,
          priceCurrency: 'INR',
        },
      },
      {
        '@type': 'Offer',
        name: 'Party Makeup Panchkula',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 4000,
          priceCurrency: 'INR',
        },
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: panchkulaFaqs.map((faq) => ({
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
            <div className="inline-flex items-center gap-2 bg-[#8B6F47]/10 text-[#8B6F47] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5">
              <Sparkle className="h-4 w-4" aria-hidden="true" />
              <span>Panchkula On-Venue Luxury Bridal Artistry</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight mb-6">
              Makeup Artist in Panchkula &mdash; Luxury Bridal &amp; Occasion Makeup
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
              Subtle, luminous bridal elegance and contemporary occasion makeup for Panchkula&apos;s most
              discerning brides. Certified by <strong className="text-gray-900 font-semibold">UV Ghai</strong>,
              Bhuvita brings high-end international cosmetics and relaxing on-venue vanity setups directly
              to your home or resort across Sector 20, Sector 11, MDC, and Pinjore.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">Panchkula &amp; MDC</span> Doorstep Service
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">Subtle &amp; Skin-Like</span> Zero Mask
                </div>
              </div>
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
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={WA_PANCHKULA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>Book Panchkula Makeup on WhatsApp</span>
              </a>
              <a
                href="#panchkula-venues"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white font-semibold px-8 py-3.5 rounded-full transition active:scale-95"
              >
                <span>View Venues &amp; Pricing</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Convenient studio trials in Sector 37A or direct on-venue bridal bookings in Panchkula
            </p>
          </div>
        </div>
      </section>

      {/* Coverage & Banquets Section */}
      <section id="panchkula-venues" className="py-16 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              On-Venue Artistry
            </h2>
            <p className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Serving Panchkula Sectors &amp; Wedding Resorts
            </p>
            <p className="text-gray-600 text-base sm:text-lg">
              Whether you are hosting an intimate home ceremony in Sector 20 or a grand reception at a Pinjore resort,
              Bhuvita arrives with punctuality and professional vanity care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F5] rounded-2xl p-7 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                Key Panchkula Sectors
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Doorstep bridal &amp; family vanity setups across:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 font-medium">
                <li>&bull; Sector 20, Sector 21 &amp; Sector 25</li>
                <li>&bull; Sector 11, Sector 12 &amp; Sector 14</li>
                <li>&bull; Sector 4, Sector 6, Sector 7 &amp; Sector 8</li>
              </ul>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-7 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                Mansa Devi Complex (MDC)
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Fast, punctual connectivity across:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 font-medium">
                <li>&bull; MDC Sector 4 &amp; Sector 5 luxury villas</li>
                <li>&bull; Swastik Vihar &amp; Rail Vihar</li>
                <li>&bull; The Lalit Chandigarh / MDC border</li>
              </ul>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-7 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <Crown className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                Pinjore &amp; Kalka Resorts
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Experienced on-venue vanity setups at:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 font-medium">
                <li>&bull; Holiday Inn Chandigarh Panchkula</li>
                <li>&bull; Welcomhotel by ITC Hotels, Bella Vista</li>
                <li>&bull; Golden Tulip Panchkula</li>
                <li>&bull; Heritage marriage palaces along the highway</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Pricing Section */}
      <section className="py-16 sm:py-24 bg-[#FAF7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Artistry That Respects Your Skin
            </h2>
            <p className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Panchkula Bridal &amp; Occasion Packages
            </p>
            <p className="text-gray-600 text-base sm:text-lg">
              We focus on micro-layering and luxury formulations that ensure longevity without making you feel weighed down.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Panchkula Weddings
                </span>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Bridal Makeup
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">₹25,000 <span className="text-xs font-normal text-gray-500">Venue (₹22k Studio)</span></div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Bespoke skin prep, HD skin-like finish, complete bridal hair styling, dupatta &amp; lehenga pleating, jewelry setting, zero-power lenses, and premium lashes.
                </p>
              </div>
              <a
                href={waLink("Hi Bhuvita! I'd like to book Bridal Makeup in Panchkula (₹25,000 Venue / ₹22,000 Studio) on [Date].")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#8B6F47] hover:bg-[#725a38] text-white text-sm font-semibold py-3 rounded-full transition"
              >
                Inquire on WhatsApp
              </a>
            </div>

            <div className="bg-white rounded-2xl p-7 border-2 border-[#8B6F47] shadow-md flex flex-col justify-between relative">
              <div className="absolute top-0 right-0 bg-[#8B6F47] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Evening Glam
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Rings &amp; Cocktails
                </span>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Engagement &amp; Reception
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">₹18,000 <span className="text-xs font-normal text-gray-500">Venue (₹15k Studio)</span></div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Sculpted features, dramatic smokey or soft metallic eyes, Hollywood waves or contemporary updo, zero-power lenses, lashes, and gown draping.
                </p>
              </div>
              <a
                href={waLink("Hi Bhuvita! I'd like to book Engagement/Reception makeup in Panchkula (₹18,000 Venue / ₹15,000 Studio) on [Date].")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-semibold py-3 rounded-full transition shadow-xs"
              >
                Inquire on WhatsApp
              </a>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Family &amp; Guests
                </span>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Party Makeup
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">₹6,000 <span className="text-xs font-normal text-gray-500">Venue (min 2) / ₹4k Studio</span></div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Lightweight HD base, customized hair styling, zero-power lenses, lashes, and saree or dupatta draping.
                </p>
              </div>
              <a
                href={waLink("Hi Bhuvita! I'd like to book Party Makeup in Panchkula (₹6,000 Venue min 2 / ₹4,000 Studio) on [Date].")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#8B6F47] hover:bg-[#725a38] text-white text-sm font-semibold py-3 rounded-full transition"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioShowcase
            imageIds={[17, 1, 9, 3, 7, 21, 24, 32]}
            title="Panchkula Bridal & Evening Looks"
            subtitle="Explore subtle bridal radiance, royal velvet lehengas, and contemporary reception gowns."
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 bg-[#FAF7F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Panchkula Bookings
            </h2>
            <p className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
              Frequently Asked Questions &bull; Panchkula
            </p>
          </div>

          <FaqAccordion faqs={panchkulaFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5C4033] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4A574] block mb-3">
            Panchkula Wedding Dates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
            Reserve Your Panchkula Bridal Vanity with Bhuvita
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Tell Bhuvita your wedding date, function venue in Panchkula, and getting-ready timeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WA_PANCHKULA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-4 rounded-full transition shadow-lg text-base active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chat on WhatsApp &bull; Panchkula</span>
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
