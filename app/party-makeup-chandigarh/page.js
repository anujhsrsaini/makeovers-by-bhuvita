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
  Users,
  PartyPopper,
  Sparkle,
} from 'lucide-react';

const siteUrl = 'https://makeoversbybhuvita.com';
const canonicalUrl = `${siteUrl}/party-makeup-chandigarh`;

const WHATSAPP_NUMBER = '917888808231';
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const WA_PARTY = waLink(
  "Hi Bhuvita! I'm interested in booking party makeup in Chandigarh for [Date]. Event: [Cocktail / Sangeet / Reception / Bridesmaids]. Number of people: [Number]."
);

export const metadata = {
  title: 'Party Makeup Artist in Chandigarh | Makeovers by Bhuvita',
  description:
    'Book flawless party makeup in Chandigarh for cocktails, sangeet, mehendi & receptions. Basic from ₹4,000, HD from ₹5,000 (Studio) / ₹6,000 (Venue). Book on WhatsApp.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Party Makeup Artist in Chandigarh | Makeovers by Bhuvita',
    description:
      'Chic, camera-ready party makeup in Chandigarh by UV Ghai-certified artist Bhuvita. Basic from ₹4,000, HD from ₹5,000 (Studio) / ₹6,000 (Venue). Book on WhatsApp.',
    url: canonicalUrl,
    siteName: 'Makeovers by Bhuvita',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Party Makeup Artist in Chandigarh - Makeovers by Bhuvita',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Party Makeup Artist in Chandigarh | Makeovers by Bhuvita',
    description:
      'Flawless party, cocktail & sangeet makeup in Chandigarh from ₹4,000. Book on WhatsApp.',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

const partyFaqs = [
  {
    question: "What are party makeup charges in Chandigarh with Makeovers by Bhuvita?",
    answer: "Party makeup starts from ₹4,000 for Basic Party Makeup at our Sector 37A studio (includes makeup and straightening or curls in hairdo) and ₹5,000 for HD Party Makeup at studio. For on-venue service across Chandigarh Tricity, HD Party Makeup is ₹6,000 per person (minimum 2 makeups required), and outstation is ₹7,000. HD packages include makeup, hair styling, zero-power lenses, lashes, jewellery setting, and dupatta draping (saree draping add-on ₹500)."
  },
  {
    question: "Does party makeup include hair styling and saree or dupatta draping?",
    answer: "Yes, 100%! Unlike many salons that charge extra for hair styling, false lashes, and draping, Bhuvita's party makeup service is completely all-inclusive. You will leave fully camera-ready from head to toe."
  },
  {
    question: "How long does a party makeup and hair styling session take per person?",
    answer: "A complete party makeup and hair session typically takes 60 to 75 minutes per client. This ensures ample time for thorough skin hydration, delicate eye blending, secure hair pin placement, and neat dupatta or saree pleating without feeling rushed."
  },
  {
    question: "Can you accommodate a group of bridesmaids or family members at our hotel or home?",
    answer: "Yes! Bhuvita and her trusted styling team frequently handle groups of bridesmaids, mothers-of-the-bride/groom, and wedding guests directly on-venue across Chandigarh, Mohali, Panchkula, and Zirakpur. For groups of 3 or more people, attractive group package rates are offered. Please check on WhatsApp early to reserve enough vanity hours."
  },
  {
    question: "What makeup brands do you use for party makeup?",
    answer: "Bhuvita maintains the exact same luxury standards for party clients as she does for brides. The kit features Charlotte Tilbury, MAC, Huda Beauty, Bobbi Brown, NARS, and Laura Mercier. We never compromise on product quality, ensuring your look remains fresh, sweat-proof, and crease-free for 12+ hours."
  }
];

export default function PartyMakeupChandigarhPage() {
  const breadcrumbsList = [
    { label: 'Party Makeup in Chandigarh', href: '/party-makeup-chandigarh' },
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
        name: 'Party Makeup in Chandigarh',
        item: canonicalUrl,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: 'Party Makeup Artist in Chandigarh',
    serviceType: 'Party & Occasion Makeup Artistry',
    description:
      'Chic, lightweight party and cocktail makeup in Chandigarh by Makeovers by Bhuvita. Basic from ₹4,000, HD from ₹5,000 (Studio) / ₹6,000 (Venue).',
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
        name: 'Party Makeup Chandigarh',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 4000,
          priceCurrency: 'INR',
        },
        description: 'Basic and HD party glam including skin base, hairstyling, lashes & draping.',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: partyFaqs.map((faq) => ({
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
              <PartyPopper className="h-4 w-4" aria-hidden="true" />
              <span>Cocktails &bull; Sangeet &bull; Receptions &bull; Bridesmaids</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight mb-6">
              Party Makeup Artist in Chandigarh &mdash; Cocktails, Sangeet &amp; Receptions
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
              Effortlessly chic, sweat-proof, and camera-ready party glam that lasts all night without feeling
              heavy. Certified by <strong className="text-gray-900 font-semibold">UV Ghai</strong>, Bhuvita
              crafts customized makeup and hair styling for bridesmaids, sisters, mothers, and party guests
              at her Sector 37A studio or on-venue across Chandigarh Tricity.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Sparkle className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">From ₹4,000</span> Studio / ₹6k Venue
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Users className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">Group Packages</span> 3+ Discounts
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Gem className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">100% Luxury</span> Charlotte &amp; MAC
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Award className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">UV Ghai</span> Certified Artist
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={WA_PARTY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>Book Party Makeup on WhatsApp</span>
              </a>
              <a
                href="#party-looks"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white font-semibold px-8 py-3.5 rounded-full transition active:scale-95"
              >
                <span>View Signature Styles</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Hair styling, lashes &amp; draping included with every party makeup look
            </p>
          </div>
        </div>
      </section>

      {/* Signature Looks Covered */}
      <section id="party-looks" className="py-16 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Bespoke Styling For Every Celebration
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Signature Occasion Styles by Bhuvita
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Each occasion demands its own mood. We curate your look to match your outfit silhouette, lighting, and ceremony vibe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-5">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5">
                Sangeet Night Glam
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sweat-proof, radiant base that holds up through high-energy dance performances. Striking glitter eyes, bold flutter lashes, and bouncy, long-lasting curls.
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-5">
                <Crown className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5">
                Cocktail Gown Glam
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sculpted Hollywood red-carpet elegance. Seamless bronze contouring, soft smokey or metallic lids, velvety nude lips, and a sleek modern updo or vintage waves.
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-5">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5">
                Mehendi Festive Glow
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Fresh, dewy glass skin tailored for daytime sun. Pastel washes of color on the lids, rosy stained cheeks, and romantic floral braids or half-up twisted crowns.
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#D4A574]/20 hover:border-[#8B6F47]/40 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-5">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5">
                Bridesmaids &amp; Family
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Elevated elegance tailored to sisters, mothers, and wedding party guests. Camera-flattering without stealing the bride’s spotlight, finished with crisp draping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Group Discounts Section */}
      <section className="py-16 sm:py-24 bg-[#FAF7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Transparent Charges
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Party Makeup Packages in Chandigarh
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Book individual studio sessions in Sector 37A or enjoy on-venue convenience for your entire bridesmaid party.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Solo Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Individual Bookings
                </span>
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900">
                  Basic &amp; HD Party Glam
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">₹4,000</span>
                  <span className="text-sm font-medium text-gray-500">Studio (Basic) / ₹5,000 (HD)</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Camera-ready party makeup at Sector 37A studio or on-venue (₹6,000/person, min 2).
                </p>

                <div className="border-t border-gray-100 pt-6 space-y-3.5 my-6 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Basic Party (Studio): ₹4,000 (makeup, straight or curls in hairdo)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>HD Party (Studio): ₹5,000 (full hairstyle &amp; HD skin base)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>On-Venue HD Party: ₹6,000 / person (minimum 2 makeups required)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Zero-power lenses, lashes, jewelry setting &amp; dupatta draping included (HD)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Saree draping add-on available at ₹500</span>
                  </div>
                </div>
              </div>

              <a
                href={waLink("Hi Bhuvita! I'd like to book Party Makeup (Basic ₹4,000 / HD ₹5,000 Studio / ₹6,000 Venue) on [Date].")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#8B6F47] hover:bg-[#725a38] text-white font-semibold py-3.5 rounded-full transition shadow-xs"
              >
                Book on WhatsApp
              </a>
            </div>

            {/* Group Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#8B6F47] shadow-xl flex flex-col justify-between relative">
              <div className="absolute top-0 right-0 bg-[#8B6F47] text-white text-xs font-semibold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                Group Discount
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6F47] block mb-1">
                  Bridesmaids &amp; Family
                </span>
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900">
                  Group Package (3+ Persons)
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold text-[#8B6F47]">Special Group Rates</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Ideal for wedding party, sisters, and mothers getting ready together on-venue or at studio.
                </p>

                <div className="border-t border-gray-100 pt-6 space-y-3.5 my-6 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Special bundled savings for groups of 3, 4, 5+ people</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Coordinated timing schedule so everyone is ready on time</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Available on-venue across Chandigarh, Mohali, and Panchkula</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Dedicated styling assistant to keep everyone on schedule</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0 mt-0.5" />
                    <span>Individual attention to outfit colors and personal preferences</span>
                  </div>
                </div>
              </div>

              <a
                href={waLink("Hi Bhuvita! I'd like to check Group Party Makeup rates for a group of [3 / 4 / 5+] people on [Date] in Chandigarh/Tricity.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3.5 rounded-full transition shadow-md"
              >
                Inquire for Group Rates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Party Portfolio Showcase */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioShowcase
            imageIds={[17, 25, 3, 7, 19, 32]}
            title="Curated Party &amp; Cocktail Portfolio"
            subtitle="Explore real party guests, bridesmaids, and cocktail looks styled by Bhuvita."
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 bg-[#FAF7F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
              Frequently Asked Questions &bull; Party Makeup
            </h2>
          </div>

          <FaqAccordion faqs={partyFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5C4033] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4A574] block mb-3">
            Book Your Date
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
            Get Ready for Your Next Big Event
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Tell Bhuvita your event date, number of people, and occasion. We will confirm your vanity slot immediately.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WA_PARTY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-4 rounded-full transition shadow-lg text-base active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Chat on WhatsApp &bull; Party Bookings</span>
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
