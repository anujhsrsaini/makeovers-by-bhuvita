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
  Calendar,
  MessageCircle,
  Phone,
  ArrowRight,
  Award,
  Car,
  Building2,
} from 'lucide-react';

const siteUrl = 'https://makeoversbybhuvita.com';
const canonicalUrl = `${siteUrl}/makeup-artist-in-mohali`;

const WHATSAPP_NUMBER = '917888808231';
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const WA_MOHALI = waLink(
  "Hi Bhuvita! I'm looking for a makeup artist in Mohali for my wedding/event on [Date] at [Venue/Phase in Mohali]. Could you share availability and packages?"
);

export const metadata = {
  title: 'Best Makeup Artist in Mohali | Bridal & Party | Makeovers by Bhuvita',
  description:
    'Top-rated bridal and party makeup artist in Mohali. Studio minutes away in Sector 37A plus on-venue doorstep services across Phase 3B2, Phase 7, Aerocity & Sector 70. Book on WhatsApp.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Best Makeup Artist in Mohali | Bridal & Party | Makeovers by Bhuvita',
    description:
      'Looking for the best makeup artist in Mohali? UV Ghai-certified artist Bhuvita offers subtle, skin-like bridal & party makeup. On-venue service across all Mohali phases.',
    url: canonicalUrl,
    siteName: 'Makeovers by Bhuvita',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Makeup Artist in Mohali - Makeovers by Bhuvita',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Makeup Artist in Mohali | Bridal & Party | Makeovers by Bhuvita',
    description:
      'Subtle, skin-like bridal & party makeup in Mohali. On-venue doorstep service across Phase 3B2, Phase 7, Aerocity, Homeland Heights.',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

const mohaliFaqs = [
  {
    question: "Do you travel directly to homes, hotels, and banquets across Mohali?",
    answer: "Yes, absolutely! Bhuvita offers full on-venue doorstep bridal and party makeup services across all Mohali sectors and phases. Whether you are getting ready at home in Phase 7, a villa in Homeland Heights or Aerocity, or at banquet venues such as Forest Hill Resort, The Palm, or Wyndham Chandigarh Mohali, Bhuvita brings her complete luxury kit, professional vanity lighting, and styling equipment to your location."
  },
  {
    question: "Where is your studio located relative to Mohali?",
    answer: "Our private bridal studio is located in Sector 37A, Chandigarh — right on the immediate border of Mohali. It is literally a 5 to 10 minute drive from Mohali Phase 1, Phase 2, Phase 3B2, Phase 5, Phase 6, and Phase 7. This central location makes it effortless for Mohali brides and families to visit for trials or studio vanity appointments without navigating heavy city traffic."
  },
  {
    question: "Are there extra travel charges for on-venue bridal makeup in Mohali?",
    answer: "Because our Sector 37A studio is directly adjacent to Mohali, local on-venue travel to central Mohali phases (Phase 1 through 11, Sector 70, Sector 71) is seamlessly accommodated within our standard bridal booking terms. For peripheral venues (such as outer Aerocity, Kharar border, or Forest Hill), a nominal convenience conveyance fee is clearly communicated upfront with zero hidden costs."
  },
  {
    question: "Can you accommodate bridesmaid and family makeup alongside the bride in Mohali?",
    answer: "Yes! In addition to the bride's signature look, Bhuvita and her styling assistant cater to sisters, mothers, and bridesmaids (party makeup starting from ₹4,000 at studio / ₹6,000 on-venue per person, min 2). Time slots are coordinated in advance so everyone is impeccably ready well before the baraat arrives."
  },
  {
    question: "How do I book my bridal date for a wedding in Mohali?",
    answer: "Simply send a message on WhatsApp with your wedding date, event timings (morning Anand Karaj or evening pheras), and your Mohali venue or home address. Bhuvita will confirm date availability, share package details, and secure your date upon receipt of an advance booking token."
  }
];

export default function MakeupArtistInMohaliPage() {
  const breadcrumbsList = [
    { label: 'Makeup Artist in Mohali', href: '/makeup-artist-in-mohali' },
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
        name: 'Makeup Artist in Mohali',
        item: canonicalUrl,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: 'Bridal & Party Makeup Artist in Mohali',
    serviceType: 'Makeup Artistry',
    description:
      'Premier makeup artist serving Mohali with subtle, skin-like bridal and party makeup. On-venue services across Phase 3B2, Phase 7, Aerocity, and Sector 70.',
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
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'AdministrativeArea', name: 'SAS Nagar' },
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'Panchkula' },
      { '@type': 'City', name: 'Zirakpur' },
      { '@type': 'City', name: 'Kharar' },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Bridal Makeup Mohali',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 25000,
          priceCurrency: 'INR',
        },
      },
      {
        '@type': 'Offer',
        name: 'Party Makeup Mohali',
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
    mainEntity: mohaliFaqs.map((faq) => ({
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
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>Studio Minutes Away in Sector 37A &bull; On-Venue Across Mohali</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight mb-6">
              Best Makeup Artist in Mohali &mdash; Bridal &amp; Party Artistry
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
              Luxury bridal transformations and radiant occasion makeup for Mohali&apos;s most stylish brides.
              Certified by <strong className="text-gray-900 font-semibold">UV Ghai</strong>, Bhuvita delivers
              weightless, skin-like artistry at her Sector 37A studio or directly at your hotel or residence in
              Phase 3B2, Phase 7, Sector 70, Aerocity, and beyond.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Building2 className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">All Mohali</span> Phases Covered
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Car className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">Doorstep Vanity</span> Setup
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Award className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">UV Ghai</span> Certified
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Heart className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">200+ Brides</span> Styled
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={WA_MOHALI}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>Book Mohali Makeup on WhatsApp</span>
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white font-semibold px-8 py-3.5 rounded-full transition active:scale-95"
              >
                <span>View Mohali Rates &amp; Services</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sector 37A studio is 5–10 mins from Phase 3B2, Phase 5 &amp; Phase 7
            </p>
          </div>
        </div>
      </section>

      {/* Local Neighborhood Coverage Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Doorstep Convenience
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              On-Venue Bridal &amp; Occasion Makeup Across Mohali
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              No need to navigate wedding-day traffic or stress over salon delays.
              Bhuvita brings a full bridal vanity experience directly to your wedding venue or home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F5] rounded-2xl p-7 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                Central Mohali Phases
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Rapid 5 to 10 minute dispatch to:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 font-medium">
                <li>&bull; Phase 3B2, Phase 5, Phase 7 &amp; Phase 8</li>
                <li>&bull; Phase 1, Phase 2 &amp; Phase 6</li>
                <li>&bull; Sector 70 &amp; Sector 71 residential sectors</li>
              </ul>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-7 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                Aerocity, JLPL &amp; Luxury Highrises
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Seamless vanity setup in private suites at:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 font-medium">
                <li>&bull; Homeland Heights (Sector 70)</li>
                <li>&bull; JLPL Falcon View (Sector 66A)</li>
                <li>&bull; Aerocity &amp; IT City residences</li>
                <li>&bull; Wave Estate (Sector 85 &amp; 99)</li>
              </ul>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-7 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <Crown className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">
                Top Mohali Resorts &amp; Banquets
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Punctual on-venue bridal service at top venues:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 font-medium">
                <li>&bull; Forest Hill Golf &amp; Country Resort</li>
                <li>&bull; Wyndham Chandigarh Mohali</li>
                <li>&bull; Radisson RED Chandigarh Mohali</li>
                <li>&bull; The Palm &amp; local marriage palaces</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing Cards */}
      <section id="pricing" className="py-16 sm:py-24 bg-[#FAF7F5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Mohali Makeup Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Services Tailored for Mohali Brides &amp; Families
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Transparent packages with no hidden studio markup. Premium international brands guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Bridal */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Signature Wedding
                </span>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Bridal Makeup
                </h3>
                <div className="text-2xl font-bold text-gray-900 mb-4">₹25,000 <span className="text-xs font-normal text-gray-500">Venue (₹22k Studio)</span></div>
                <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                  HD skin-like finish, customized bridal hairstyling, zero-power lenses, premium lashes, veil &amp; lehenga draping, jewelry setting.
                </p>
              </div>
              <a
                href={waLink("Hi Bhuvita! I'd like to book Bridal Makeup in Mohali (₹25,000 Venue / ₹22,000 Studio) for [Date].")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#8B6F47] hover:bg-[#725a38] text-white text-xs font-semibold py-2.5 rounded-full transition"
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* Pre-wedding */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Festive Radiance
                </span>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Haldi &amp; Mehendi
                </h3>
                <div className="text-2xl font-bold text-gray-900 mb-4">₹12,000 <span className="text-xs font-normal text-gray-500">Venue (₹9k Studio)</span></div>
                <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                  Playful colorful eye makeup, dewy glass-skin base, fresh floral hairstyle, lenses, lashes &amp; festive dupatta draping.
                </p>
              </div>
              <a
                href={waLink("Hi Bhuvita! I'd like to book Haldi/Mehendi makeup in Mohali (₹12,000 Venue / ₹9,000 Studio) for [Date].")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#8B6F47] hover:bg-[#725a38] text-white text-xs font-semibold py-2.5 rounded-full transition"
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* Engagement */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Modern Glam
                </span>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Engagement &amp; Sangeet
                </h3>
                <div className="text-2xl font-bold text-gray-900 mb-4">₹18,000 <span className="text-xs font-normal text-gray-500">Venue (₹15k Studio)</span></div>
                <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                  Sculpted evening glam, cocktail gown styling, lenses, lashes, jewelry setting, and Hollywood waves or textured updo.
                </p>
              </div>
              <a
                href={waLink("Hi Bhuvita! I'd like to book Engagement/Sangeet makeup in Mohali (₹18,000 Venue / ₹15,000 Studio) for [Date].")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#8B6F47] hover:bg-[#725a38] text-white text-xs font-semibold py-2.5 rounded-full transition"
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* Party */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Bridesmaids &amp; Family
                </span>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                  Party Makeup
                </h3>
                <div className="text-2xl font-bold text-gray-900 mb-4">₹6,000 <span className="text-xs font-normal text-gray-500">Venue (min 2) / ₹4k Studio</span></div>
                <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                  Lightweight HD skin-like makeup, elegant hairstyling, lenses, lashes, and saree or dupatta draping.
                </p>
              </div>
              <a
                href={waLink("Hi Bhuvita! I'd like to book Party Makeup in Mohali (₹6,000 Venue min 2 / ₹4,000 Studio) for [Date].")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#8B6F47] hover:bg-[#725a38] text-white text-xs font-semibold py-2.5 rounded-full transition"
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
            imageIds={[17, 2, 6, 1, 19, 21, 26, 30]}
            title="Bridal & Occasion Looks Loved by Mohali Brides"
            subtitle="From radiant morning Anand Karaj looks to evening cocktail glam, see our handcrafted artistry."
          />
        </div>
      </section>

      {/* Mohali FAQs */}
      <section className="py-16 sm:py-24 bg-[#FAF7F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Mohali Bookings &amp; Logistics
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
              Frequently Asked Questions &bull; Mohali
            </h2>
          </div>

          <FaqAccordion faqs={mohaliFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5C4033] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4A574] block mb-3">
            Mohali Bridal Bookings
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
            Book Your Mohali Wedding Date with Bhuvita
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Tell us your date and venue in Mohali. We will check calendar availability and reserve your spot.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WA_MOHALI}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-4 rounded-full transition shadow-lg text-base active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chat on WhatsApp &bull; Mohali</span>
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
