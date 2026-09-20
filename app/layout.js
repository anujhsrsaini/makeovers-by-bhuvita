import { Inter, Dancing_Script, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
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
  description: 'UV Ghai-certified bridal makeup artist in Chandigarh. Subtle, skin-like finish. Sector 37A studio & on-venue across Tricity. 200+ brides. Chat on WhatsApp.',
  openGraph: {
    title: 'Bridal Makeup Artist in Chandigarh | Makeovers by Bhuvita',
    description: 'UV Ghai-certified bridal makeup artist in Chandigarh. Subtle, skin-like finish. Sector 37A studio & on-venue across Tricity. 200+ brides. Chat on WhatsApp.',
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
    description: 'UV Ghai-certified bridal makeup artist in Chandigarh. Subtle, skin-like finish. Sector 37A studio & on-venue across Tricity. 200+ brides. Chat on WhatsApp.',
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
    alternateName: 'Bhuvita Makeup Artist Chandigarh',
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
      latitude: 30.7423,
      longitude: 76.7551,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Makeovers+by+Bhuvita+Sector+37A+Chandigarh',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Monday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Bhuvita',
      jobTitle: 'Master Bridal Makeup Artist & Founder',
      knowsAbout: ['Bridal Makeup', 'HD Makeup', 'Airbrush Makeup', 'Dupatta Draping', 'Skin Prep'],
      award: 'Certified by Master Educator UV Ghai',
    },
    areaServed: [
      { '@type': 'City', name: 'Chandigarh', sameAs: 'https://en.wikipedia.org/wiki/Chandigarh' },
      { '@type': 'City', name: 'Mohali', sameAs: 'https://en.wikipedia.org/wiki/Mohali' },
      { '@type': 'City', name: 'Panchkula', sameAs: 'https://en.wikipedia.org/wiki/Panchkula' },
      { '@type': 'City', name: 'Zirakpur' },
      { '@type': 'City', name: 'Kharar' },
    ],
    priceRange: '₹4,000 - ₹40,000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Bank Transfer',
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
        {/* Google Analytics 4 (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SNCYZKT98V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SNCYZKT98V', {
              page_path: window.location.pathname,
            });

            // Automatic Lead Capture Tracking for WhatsApp & Phone Clicks
            if (typeof window !== 'undefined') {
              document.addEventListener('click', function(e) {
                var target = e.target.closest('a');
                if (!target) return;
                var href = target.getAttribute('href') || '';
                if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) {
                  var isBridal = href.indexOf('Bridal') !== -1 || href.indexOf('bridal') !== -1;
                  var leadValue = isBridal ? 22000 : 4000;
                  gtag('event', 'whatsapp_click', {
                    event_category: 'Lead Capture',
                    event_label: (target.innerText || 'WhatsApp CTA').trim().substring(0, 100),
                    link_url: href,
                    value: leadValue,
                    currency: 'INR'
                  });
                  gtag('event', 'generate_lead', {
                    currency: 'INR',
                    value: leadValue
                  });
                } else if (href.indexOf('tel:') !== -1) {
                  gtag('event', 'phone_click', {
                    event_category: 'Direct Call',
                    phone_number: '+917888808231',
                    value: 15000,
                    currency: 'INR'
                  });
                  gtag('event', 'generate_lead', {
                    currency: 'INR',
                    value: 15000
                  });
                }
              }, { passive: true });
            }
          `}
        </Script>
      </head>
      <body className={`${inter.className} ${dancingScript.variable} ${playfair.variable}`}>{children}</body>
    </html>
  )
}
