import React from 'react';
import Link from 'next/link';
import SubpageLayout from '../components/SubpageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import FaqAccordion from '../components/FaqAccordion';
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
  ShieldAlert,
  HelpCircle,
  DollarSign,
  Briefcase,
  Plane,
  Sparkle,
} from 'lucide-react';

const isProd = process.env.NODE_ENV === 'production';
const siteUrl = isProd
  ? 'https://anujhsrsaini.github.io/makeovers-by-bhuvita'
  : 'http://localhost:3000';
const canonicalUrl = `${siteUrl}/pricing`;

const WHATSAPP_NUMBER = '917888808231';
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const WA_PRICING = waLink(
  "Hi Bhuvita! I'm reviewing your makeup pricing and would like to check package availability for my event on [Date] at [Venue/City]."
);

export const metadata = {
  title: 'Bridal Makeup Charges in Chandigarh | Price List | Makeovers by Bhuvita',
  description:
    'Explore transparent bridal and party makeup charges in Chandigarh by Makeovers by Bhuvita. Bridal packages from ₹22,000 (Studio) / ₹25,000 (Venue), party makeup from ₹4,000. No hidden fees.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Bridal Makeup Charges in Chandigarh | Price List | Makeovers by Bhuvita',
    description:
      'Complete transparent makeup charges and packages in Chandigarh. Bridal from ₹22,000 (Studio) / ₹25,000 (Venue), Party from ₹4,000. No hidden surcharges.',
    url: canonicalUrl,
    siteName: 'Makeovers by Bhuvita',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Makeovers by Bhuvita Makeup Pricing & Packages',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridal Makeup Charges in Chandigarh | Price List | Makeovers by Bhuvita',
    description:
      'Transparent bridal and party makeup packages in Chandigarh. View full price list & book on WhatsApp.',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

const pricingFaqs = [
  {
    question: "What is the starting price for bridal makeup in Chandigarh with Bhuvita?",
    answer: "Our signature wedding day bridal makeup starts from ₹22,000 at our Sector 37A studio and ₹25,000 on-venue across Chandigarh Tricity (including Chandigarh, Mohali, Panchkula, Zirakpur, and Kharar). Luxury Waterproof Bridal is ₹27,000 studio / ₹30,000 on-venue. This is an all-inclusive rate that includes luxury skin prep, HD skin-like foundation base, customized bridal hair styling, zero-power eye lenses, premium eyelashes, jewelry setting, and double dupatta draping. There are zero surprise add-ons."
  },
  {
    question: "Are there any hidden fees or extra charges for hair styling, lashes, or draping?",
    answer: "No, never. Unlike many salons that give a low initial quote and then add separate charges for eyelashes, lenses, jewelry setting, or dupatta pleating, all Makeovers by Bhuvita quotes are completely transparent and all-inclusive of standard styling services."
  },
  {
    question: "How much deposit is required to lock in a wedding date?",
    answer: "A 30% advance booking deposit is required to officially lock in your wedding date on Bhuvita's calendar. Because we take only one or two brides per auspicious date to give our full personal attention, dates cannot be reserved without an advance deposit. The remaining balance is payable on the event date."
  },
  {
    question: "What is your pricing and policy for outstation and destination weddings?",
    answer: "For weddings outside the Chandigarh Tricity across Punjab, Haryana, Himachal Pradesh, or Delhi NCR, outstation bridal makeup starts from ₹35,000 (Signature Bridal) and ₹40,000 (Luxury Waterproof Bridal) per function. Outstation Haldi/Mehndi is ₹15,000, Engagement/Reception is ₹22,000, and HD Party makeup is ₹7,000 per person. Round-trip travel and hotel lodging for Bhuvita and styling assistant are arranged or reimbursed by the client."
  },
  {
    question: "Can I bundle party makeup for my mother, sister, and bridesmaids with my bridal booking?",
    answer: "Yes! Adding party makeup (starting from ₹4,000 at studio / ₹6,000 on-venue per person) to your bridal booking is very common. When booking family members alongside the bride, we bring a dedicated styling assistant to ensure that the entire bridal suite is ready on time without rushing."
  }
];

const packagesList = [
  {
    id: 'bridal',
    title: 'Bridal Makeup',
    badge: 'Signature & Luxury Waterproof',
    price: 'From ₹22,000',
    subtitle: '₹22k Studio / ₹25k Venue • per event',
    description: 'Our signature bridal transformation designed for Anand Karaj, morning weddings, or evening pheras.',
    features: [
      'Signature Bridal: ₹22,000 (Studio) / ₹25,000 (Venue)',
      'Luxury Waterproof Bridal: ₹27,000 (Studio) / ₹30,000 (Venue)',
      'Customized skin prep suited to your skin tone and type',
      'Bridal hair styling of choice (textured bun, waves, or braid)',
      'Zero-power lenses & premium lashes included',
      'Jewellery setting & dupatta draping included',
    ],
    waText: "Hi Bhuvita! I'd like to book Bridal Makeup (₹22,000 Studio / ₹25,000 Venue). My wedding date: [Date], venue: [Venue/City].",
    featured: true,
  },
  {
    id: 'engagement',
    title: 'Engagement & Reception',
    badge: 'Evening Glam',
    price: 'From ₹15,000',
    subtitle: '₹15k Studio / ₹18k Venue / ₹22k Outstation',
    description: 'Sophisticated glamour tailored for cocktail gowns, western silhouettes, Roka, Sangeet, and ring ceremonies.',
    features: [
      'Studio: ₹15,000 | Venue: ₹18,000 | Outstation: ₹22,000',
      'Sculpted high-definition evening contouring & highlighting',
      'Smokey eyes, metallic cut-crease, or romantic shimmer lids',
      'Hairstyling (Hollywood glamour waves, textured ponytails, or updo)',
      'Zero-power lenses & premium false eyelashes included',
      'Gown or lehenga draping & jewellery setting included',
    ],
    waText: "Hi Bhuvita! I'd like to book Engagement/Reception Makeup (₹15,000 Studio / ₹18,000 Venue) on [Date].",
    featured: false,
  },
  {
    id: 'haldi-mehendi',
    title: 'Haldi & Mehendi',
    badge: 'Festive Glow',
    price: 'From ₹9,000',
    subtitle: '₹9k Studio / ₹12k Venue / ₹15k Outstation',
    description: 'Fresh, playful, and sun-friendly artistry with colourful eye makeup for vibrant daytime festivities.',
    features: [
      'Studio: ₹9,000 | Venue: ₹12,000 | Outstation: ₹15,000',
      'Dewy glass-skin base resistant to daytime warmth',
      'Colourful eye makeup matching floral jewelry or lehenga palette',
      'Hairstyling (floral braids, bubble braids, or half-up curls)',
      'Zero-power lenses & premium lashes included',
      'Festive outfit and dupatta draping & jewellery setting included',
    ],
    waText: "Hi Bhuvita! I'd like to book Haldi/Mehendi Makeup (₹9,000 Studio / ₹12,000 Venue) on [Date].",
    featured: false,
  },
  {
    id: 'party',
    title: 'Party Makeup & Saree Draping',
    badge: 'Bridesmaids & Family',
    price: 'From ₹4,000',
    subtitle: 'Studio ₹4k-5k / Venue ₹6k (min 2) / Outstation ₹7k',
    description: 'Flawless camera-ready makeup and hair styling for bridesmaids, sisters, and wedding guests.',
    features: [
      'Basic Party: ₹4,000 (Studio, includes makeup, straight or curls in hairdo)',
      'HD Party: ₹5,000 (Studio, full hairstyling & HD base)',
      'On-Venue HD Party: ₹6,000 / person (minimum 2 makeups required)',
      'Outstation HD Party: ₹7,000 / person',
      'Zero-power lenses, lashes, jewellery setting & dupatta draping (HD)',
      'Saree Draping add-on available at ₹500',
    ],
    waText: "Hi Bhuvita! I'd like to book Party Makeup (from ₹4,000 Studio / ₹6,000 Venue) on [Date]. Number of people: [Number].",
    featured: false,
  },
  {
    id: 'outstation',
    title: 'Outstation Bookings',
    badge: 'Outside Tricity',
    price: 'From ₹35,000',
    subtitle: 'per bridal function + travel & lodging',
    description: 'On-venue bridal and wedding artistry outside Chandigarh Tricity across Punjab, Haryana, Himachal & Delhi NCR.',
    features: [
      'Signature Bridal: ₹35,000 | Luxury Waterproof: ₹40,000',
      'Engagement / Reception / Sangeet / Cocktail: ₹22,000',
      'Haldi & Mehendi: ₹15,000 | HD Party: ₹7,000 / person',
      'Zero-power lenses, premium lashes, jewellery setting & dupatta draping',
      'Full signature luxury kit brought to your venue',
      'Travel and lodging arranged or covered by client at actuals',
    ],
    waText: "Hi Bhuvita! I'd like to inquire about Outstation Makeup (from ₹35,000). My wedding city: [City], date: [Date].",
    featured: false,
  },
];

export default function PricingPage() {
  const breadcrumbsList = [
    { label: 'Packages & Pricing', href: '/pricing' },
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
        name: 'Makeup Packages & Pricing',
        item: canonicalUrl,
      },
    ],
  };

  const offerCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Makeovers by Bhuvita Makeup Pricing & Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Signature Bridal Makeup',
          description: 'Signature wedding day subtle, skin-like bridal makeup.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 22000,
          priceCurrency: 'INR',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Luxury Waterproof Bridal Makeup',
          description: 'Tear-proof waterproof long-wear luxury bridal makeup.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 27000,
          priceCurrency: 'INR',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Engagement & Reception Makeup',
          description: 'Sculpted evening glam for gown or ring ceremony.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 15000,
          priceCurrency: 'INR',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Haldi & Mehendi Makeup',
          description: 'Fresh, colorful daytime festival makeup and florals.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 9000,
          priceCurrency: 'INR',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Party Makeup',
          description: 'Basic and HD party and bridesmaid makeup with hair styling and draping.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 4000,
          priceCurrency: 'INR',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Outstation Makeup Services',
          description: 'On-venue bridal and event makeup outside Chandigarh Tricity.',
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 35000,
          priceCurrency: 'INR',
        },
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pricingFaqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
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
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Transparent Pricing &bull; Zero Hidden Costs</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-900 leading-tight mb-6">
              Makeup Packages &amp; Transparent Pricing in Chandigarh
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
              Honest, upfront pricing for bridal, pre-wedding, and party makeup. No unexpected salon surcharges,
              no extra fees for basic false lashes or draping, and strictly 100% authentic international luxury products.
              Certified by <strong className="text-gray-900 font-semibold">UV Ghai</strong>.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">All-Inclusive</span> Lashes &amp; Draping
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
              <div className="bg-white p-3.5 rounded-xl border border-[#D4A574]/30 shadow-xs flex items-center gap-2.5">
                <Heart className="h-5 w-5 text-[#8B6F47] shrink-0" />
                <div className="text-xs font-medium text-gray-800">
                  <span className="block font-bold text-gray-900">200+ Brides</span> Happy Clients
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={WA_PRICING}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span>Inquire About Availability on WhatsApp</span>
              </a>
              <a
                href="#all-packages"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white font-semibold px-8 py-3.5 rounded-full transition active:scale-95"
              >
                <span>Compare All Packages</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Clear upfront estimates &bull; 30% advance deposit confirms your calendar date
            </p>
          </div>
        </div>
      </section>

      {/* Complete Transparent Price List Cards */}
      <section id="all-packages" className="py-16 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Complete Price List
            </h2>
            <p className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Makeup Services &amp; Packages Breakdown
            </p>
            <p className="text-gray-600 text-base sm:text-lg">
              Explore individual service costs, multi-function bridal packages, and outstation destination options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesList.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.featured
                    ? 'bg-[#FAF7F5] border-2 border-[#8B6F47] shadow-xl md:scale-[1.02]'
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg'
                }`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute top-0 right-0 text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider ${
                      pkg.featured ? 'bg-[#8B6F47] text-white' : 'bg-[#D4A574]/30 text-[#8B6F47]'
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="mb-5">
                    <div className="min-h-[4rem] flex items-center mb-2">
                      <h3 className="font-playfair text-2xl font-bold text-gray-900 leading-tight">
                        {pkg.title}
                      </h3>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-xs text-gray-500 font-medium">{pkg.subtitle}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed min-h-[44px]">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-5 space-y-3 mb-8 text-xs sm:text-sm text-gray-700">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#8B6F47] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={waLink(pkg.waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-semibold transition active:scale-95 ${
                      pkg.featured
                        ? 'bg-[#25D366] hover:bg-[#1DA851] text-white shadow-md'
                        : 'bg-[#8B6F47] hover:bg-[#725a38] text-white'
                    }`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Check Date on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Affects the Price Section */}
      <section className="py-16 sm:py-24 bg-[#FAF7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Honest Breakdown
            </h2>
            <p className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
              What Factors Affect Your Quote?
            </p>
            <p className="text-gray-600 text-base sm:text-lg">
              We believe in total transparency. Here is how your personalized makeup quote is calculated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">
                1. Studio vs On-Venue
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Studio vanity appointments at Sector 37A incur zero travel fee. On-venue doorstep vanity services across Tricity carry standard fixed rates, while outstation travel is quoted based on exact distance.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">
                2. Multi-Event Bookings
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Booking multiple wedding functions together (such as Haldi, Engagement, and Wedding Day) ensures dedicated calendar priority and synchronized look design across your celebration week.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <Gem className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">
                3. Real Florals &amp; Extensions
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Standard styling, padding, and pinning are completely included. If you require specialized 100% human hair extensions or exotic imported fresh flowers, these can be brought by you or arranged at actual cost.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#8B6F47]/10 flex items-center justify-center text-[#8B6F47] mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">
                4. Early Morning Call Times
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Standard bookings cover typical morning and evening pheras schedules. For early Anand Karaj requiring artist arrival prior to 5:00 AM, a modest early-call logistics fee is confirmed upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Session & Inclusions Policy */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B6F47] block mb-2">
                Confidence Before Your Big Day
              </span>
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-6">
                Bridal Preview &amp; Trial Session Policy
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                We believe a bride should feel 100% relaxed and confident leading into her wedding week.
                Bhuvita offers paid bridal consultation and preview sessions exclusively at our Sector 37A studio in Chandigarh.
              </p>
              <div className="space-y-3 text-sm text-gray-700 mb-6">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8B6F47] shrink-0 mt-0.5" />
                  <span>Comprehensive skin diagnosis and customized pre-wedding skincare recommendations</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8B6F47] shrink-0 mt-0.5" />
                  <span>Half-face / full-face color matching to test foundation shade and undertone in natural light</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8B6F47] shrink-0 mt-0.5" />
                  <span>Detailed discussion of bridal jewelry, neckline, dupatta weight, and hair ornamentation</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">
                * Note: Trials are scheduled on weekday studio slots so weekend dates remain dedicated to booked brides.
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-3xl p-8 sm:p-10 border border-[#D4A574]/30 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8B6F47] block mb-2">
                Rate Card Transparency
              </span>
              <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                What&apos;s Included in Every Look
              </h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Every booking strictly follows our official rate card terms:
              </p>

              <div className="mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md inline-block mb-3">
                  Included in Standard Service
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Makeup &amp; Hair styling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Zero-power lenses &amp; Premium Lashes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Jewellery Setting &amp; Dupatta Draping</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200/60 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block mb-2">
                  Exclusions &amp; Add-Ons
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">&bull;</span>
                    <span>Hair Extensions (client provides or at actuals)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">&bull;</span>
                    <span>Hair Accessories &amp; Fresh Flowers (Gajras)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-600 font-bold">&bull;</span>
                    <span>Saree Draping: ₹500</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 sm:py-24 bg-[#FAF7F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
              Common Questions
            </h2>
            <p className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
              Frequently Asked Questions &bull; Pricing &amp; Bookings
            </p>
          </div>

          <FaqAccordion faqs={pricingFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5C4033] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4A574] block mb-3">
            Check Calendar Availability
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-6">
            Get Your Transparent Quote on WhatsApp
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Tell Bhuvita your dates, function types, and venue location. We will confirm date availability and send an exact breakdown.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WA_PRICING}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold px-8 py-4 rounded-full transition shadow-lg text-base active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Get Quote on WhatsApp</span>
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
