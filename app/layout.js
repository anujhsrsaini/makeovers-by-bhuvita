import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const isProd = process.env.NODE_ENV === 'production';
const siteUrl = isProd ? 'https://anujhsrsaini.github.io/makeovers-by-bhuvita' : 'http://localhost:3000';

export const metadata = {
  title: 'Makeovers by Bhuvita | Best Bridal Makeup Artist in Chandigarh, Mohali & Panchkula',
  description: 'Professional bridal, party & engagement makeup artist in Chandigarh, Mohali, Panchkula & Tricity. 200+ happy brides, MAC & Bobbi Brown products. HD/Airbrush bridal makeup, pre-wedding functions, destination weddings. Book now!',
  keywords: [
    'bridal makeup artist Chandigarh',
    'makeup artist Mohali',
    'makeup artist Panchkula',
    'bridal makeup Tricity',
    'party makeup Chandigarh',
    'engagement makeup artist Chandigarh',
    'best bridal makeup Chandigarh',
    'wedding makeup artist Mohali',
    'HD airbrush bridal makeup Chandigarh',
    'destination wedding makeup artist',
    'sangeet makeup Chandigarh',
    'mehendi makeup artist Tricity',
    'reception makeup Chandigarh',
    'professional makeup artist Chandigarh',
    'makeovers by bhuvita',
  ],
  openGraph: {
    title: 'Makeovers by Bhuvita | Best Bridal Makeup Artist in Chandigarh Tricity',
    description: 'Professional bridal & party makeup artist in Chandigarh, Mohali & Panchkula. 200+ happy brides. HD/Airbrush makeup, destination weddings. Book your consultation today!',
    url: siteUrl,
    siteName: 'Makeovers by Bhuvita',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/hero-image.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Makeovers by Bhuvita - Bridal Makeup Artist Chandigarh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makeovers by Bhuvita | Bridal Makeup Artist Chandigarh',
    description: 'Professional bridal & party makeup in Chandigarh, Mohali & Panchkula. 200+ happy brides. Book now!',
    images: [`${siteUrl}/hero-image.jpeg`],
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
    name: 'Makeovers by Bhuvita',
    description: 'Professional bridal, party & engagement makeup artist in Chandigarh, Mohali, Panchkula & Tricity. Specializing in HD/Airbrush bridal makeup, pre-wedding functions, and destination weddings.',
    url: siteUrl,
    image: `${siteUrl}/hero-image.jpeg`,
    telephone: '+91-78888-08231',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressRegion: 'Chandigarh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.7333,
      longitude: 76.7794,
    },
    areaServed: [
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'City', name: 'Panchkula' },
      { '@type': 'City', name: 'Zirakpur' },
      { '@type': 'City', name: 'Kharar' },
    ],
    priceRange: '₹8,000 - ₹80,000',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '200',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Makeup Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Bridal Makeup', description: 'HD/Airbrush bridal makeup with hair styling and draping' },
          price: '25000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Party Makeup', description: 'Professional cocktail and reception makeup with hairstyling' },
          price: '8000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Engagement Makeup', description: 'Modern engagement and ring ceremony makeup looks' },
          price: '15000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Destination Wedding Makeup', description: 'Complete bridal makeup services for destination weddings across India and internationally' },
          price: '80000',
          priceCurrency: 'INR',
        },
      ],
    },
    sameAs: [
      'https://www.instagram.com/makeoversbybhuvita',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How far in advance should I book a bridal makeup artist in Chandigarh?', acceptedAnswer: { '@type': 'Answer', text: 'We recommend booking 2-3 months in advance for wedding dates, especially during peak season (October-February). For destination weddings, 4-6 months is ideal.' } },
      { '@type': 'Question', name: 'Do you offer bridal makeup trial sessions?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! A trial session includes a full bridal look with makeup and hair styling. This helps us finalize your perfect look before the wedding day. Trial charges are separate from the wedding day package.' } },
      { '@type': 'Question', name: 'What makeup products and brands do you use?', acceptedAnswer: { '@type': 'Answer', text: 'We use premium brands including MAC, Bobbi Brown, Charlotte Tilbury, and Huda Beauty. All products are genuine, skin-safe, and suited to Indian skin tones and weather conditions.' } },
      { '@type': 'Question', name: 'Do you travel for destination weddings from Chandigarh?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we travel across India and internationally. Travel and accommodation charges apply separately. We have experience with weddings in Goa, Udaipur, Jaipur, Dubai, and more.' } },
      { '@type': 'Question', name: 'How long does bridal makeup take?', acceptedAnswer: { '@type': 'Answer', text: 'A complete bridal look typically takes 2-2.5 hours including makeup, hair styling, and draping. We recommend starting 3 hours before the ceremony for a relaxed experience.' } },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
