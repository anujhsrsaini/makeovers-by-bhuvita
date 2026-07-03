import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'
import { faqs } from './faq-data'

const inter = Inter({ subsets: ['latin'] })

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-script',
})

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/makeovers-by-bhuvita' : '';
const siteUrl = isProd ? 'https://anujhsrsaini.github.io/makeovers-by-bhuvita/' : 'http://localhost:3000/';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Bridal Makeup Artist in Chandigarh | Makeovers by Bhuvita',
  description: 'Subtle, skin-like bridal makeup by a UV Ghai-certified artist. Studio in Chandigarh, on-venue across Mohali & Panchkula. 200+ brides. Book on WhatsApp.',
  openGraph: {
    title: 'Subtle, Skin-Like Bridal Makeup in Chandigarh | Makeovers by Bhuvita',
    description: 'Subtle, skin-like bridal makeup in Chandigarh, Mohali & Panchkula. UV Ghai-certified artist, 200+ happy brides. Chat on WhatsApp to book your consultation.',
    url: siteUrl,
    siteName: 'Makeovers by Bhuvita',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Makeovers by Bhuvita - Bridal Makeup Artist Chandigarh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridal Makeup Artist in Chandigarh | Makeovers by Bhuvita',
    description: 'Subtle, skin-like bridal makeup in Chandigarh, Mohali & Panchkula. 200+ happy brides. Chat on WhatsApp to book.',
    images: [`${siteUrl}og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${siteUrl}#business`,
    name: 'Makeovers by Bhuvita',
    description: 'UV Ghai-certified makeup artist in Chandigarh specialising in subtle, skin-like bridal makeup. Studio in Sector 37A plus on-venue services across Chandigarh, Mohali and Panchkula, with outstation bridal bookings across India.',
    url: siteUrl,
    image: `${siteUrl}og-image.jpg`,
    telephone: '+91-78888-08231',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 37A',
      addressLocality: 'Chandigarh',
      addressRegion: 'Chandigarh',
      postalCode: '160036',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.7139,
      longitude: 76.7489,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Makeovers+by+Bhuvita+Sector+37A+Chandigarh',
    areaServed: [
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'City', name: 'Panchkula' },
      { '@type': 'City', name: 'Zirakpur' },
      { '@type': 'City', name: 'Kharar' },
    ],
    priceRange: '₹8,000 - ₹80,000',
    // NOTE: aggregateRating intentionally omitted until real, on-page reviews exist.
    // Google can penalize review markup not backed by visible reviews. Re-add once
    // real Google/client reviews are collected and displayed on the page.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Makeup Services',
      itemListElement: [
        // "onwards" pricing uses priceSpecification.minPrice so the schema
        // doesn't assert an exact price the page doesn't promise.
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Bridal Makeup', description: 'Subtle, skin-like bridal makeup with hair styling and draping' },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 25000, priceCurrency: 'INR' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Pre-Wedding Function Makeup', description: 'Makeup and hair styling for mehendi, sangeet and haldi functions' },
          price: '15000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Party Makeup', description: 'Party, cocktail and reception makeup with hairstyling' },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 8000, priceCurrency: 'INR' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Bridal Package', description: 'Complete bridal package covering all wedding functions' },
          price: '60000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Outstation Bridal Makeup', description: 'Bridal makeup for weddings outside the Chandigarh Tricity; travel and stay charged separately' },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 35000, priceCurrency: 'INR' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Destination Wedding Makeup', description: 'Bridal makeup for destination weddings across India; travel and stay charged separately' },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 80000, priceCurrency: 'INR' },
        },
      ],
    },
    sameAs: [
      'https://www.instagram.com/makeoversbybhuvita',
    ],
  };

  // Built from app/faq-data.js — the same array the page renders — so schema
  // answers always match visible text (Google FAQ rich-result requirement).
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href={`${basePath}/sitemap.xml`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${dancingScript.variable}`}>{children}</body>
    </html>
  )
}
