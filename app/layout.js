import { Inter, Dancing_Script, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-script',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

const siteUrl = 'https://makeoversbybhuvita.com/';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Bridal Makeup Artist in Chandigarh | Makeovers by Bhuvita',
  description: 'UV Ghai-certified bridal makeup artist in Chandigarh specializing in subtle, skin-like makeup. Studio in Sector 37A + on-venue in Mohali, Panchkula & Zirakpur. 200+ brides. Book on WhatsApp.',
  openGraph: {
    title: 'Bridal Makeup Artist in Chandigarh | Makeovers by Bhuvita',
    description: 'UV Ghai-certified bridal makeup artist in Chandigarh specializing in subtle, skin-like makeup. Studio in Sector 37A + on-venue in Mohali, Panchkula & Zirakpur. 200+ brides. Book on WhatsApp.',
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
    description: 'UV Ghai-certified bridal makeup artist in Chandigarh specializing in subtle, skin-like makeup. Studio in Sector 37A + on-venue in Mohali, Panchkula & Zirakpur. 200+ brides. Book on WhatsApp.',
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
    priceRange: '₹4,000 - ₹40,000',
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
          itemOffered: {
            '@type': 'Service',
            name: 'Signature Bridal Makeup',
            description: 'Subtle, skin-like bridal makeup with hair styling, zero-power lenses, lashes, veil setting, and royal lehenga & dupatta draping',
          },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 22000, priceCurrency: 'INR' },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Luxury Waterproof Bridal Makeup',
            description: 'Tear-proof waterproof bridal makeup with hair styling, zero-power lenses, premium lashes, and heavy dupatta draping',
          },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 27000, priceCurrency: 'INR' },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Haldi & Mehendi Makeup',
            description: 'Vibrant eye artistry, dewy radiant skin base, floral hair styling, lenses, lashes, and festive dupatta draping',
          },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 9000, priceCurrency: 'INR' },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Engagement & Reception Makeup',
            description: 'Sculpted evening glam for gowns & western silhouettes, soft shimmer eye artistry, and modern Hollywood curls',
          },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 15000, priceCurrency: 'INR' },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Party Makeup',
            description: 'Basic and HD party makeup with skin-like camera finish, hairstyling, lenses, lashes, and outfit draping',
          },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 4000, priceCurrency: 'INR' },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Outstation Bridal Makeup',
            description: 'Bridal makeup for weddings outside the Chandigarh Tricity; travel and stay charged separately',
          },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: 35000, priceCurrency: 'INR' },
        },
      ],
    },
    sameAs: [
      'https://www.instagram.com/makeoversbybhuvita',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${dancingScript.variable} ${playfair.variable}`}>{children}</body>
    </html>
  )
}
