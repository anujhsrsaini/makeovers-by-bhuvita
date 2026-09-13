import React from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const WHATSAPP_NUMBER = '917888808231';
const WA_FOOTER = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Bhuvita! I'd like to check availability and pricing for my wedding/event date."
)}`;
const INSTAGRAM_URL = 'https://www.instagram.com/makeoversbybhuvita';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Makeovers+by+Bhuvita+Sector+37A+Chandigarh';

const SERVICE_AREAS = [
  'Sector 37A Studio',
  'Chandigarh',
  'Mohali Phase 1–11',
  'Panchkula & MDC',
  'Aerocity Mohali',
  'Zirakpur',
  'Kharar',
  'Pinjore & Kalka',
  'Destination Weddings',
];

export default function Footer() {
  return (
    <footer className="bg-[#5C4033] text-white pt-14 pb-28 md:pb-12 mt-16 border-t border-[#8B6F47]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 mb-12">
          {/* Col 1: Brand & Studio Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex flex-col group cursor-pointer"
              aria-label="Makeovers by Bhuvita - Return to homepage"
            >
              <span className="text-2xl sm:text-3xl font-script text-[#D4A574] group-hover:text-white transition-colors leading-tight">
                Makeovers by Bhuvita
              </span>
              <span className="text-[10px] tracking-widest uppercase text-white/60 font-sans -mt-0.5">
                Subtle &bull; Skin-Like &bull; Bridal
              </span>
            </Link>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              UV Ghai-certified bridal makeup artist specializing in breathable, radiant makeup. Private studio in Sector 37A, Chandigarh + on-venue artistry across Chandigarh, Mohali, Panchkula, Zirakpur, and Kharar.
            </p>
            <div className="flex items-start gap-2 text-xs text-white/80 pt-1">
              <MapPin className="h-4 w-4 text-[#D4A574] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Sector 37A, Chandigarh — 160036</span>
            </div>
          </div>

          {/* Col 2: Pages & Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A574] mb-4">
              Pages &amp; Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#D4A574]/60" aria-hidden="true" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/bridal-makeup-chandigarh" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#D4A574]/60" aria-hidden="true" />
                  <span>Bridal Makeup in Chandigarh</span>
                </Link>
              </li>
              <li>
                <Link href="/makeup-artist-in-mohali" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#D4A574]/60" aria-hidden="true" />
                  <span>Makeup Artist in Mohali</span>
                </Link>
              </li>
              <li>
                <Link href="/makeup-artist-in-panchkula" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#D4A574]/60" aria-hidden="true" />
                  <span>Makeup Artist in Panchkula</span>
                </Link>
              </li>
              <li>
                <Link href="/party-makeup-chandigarh" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#D4A574]/60" aria-hidden="true" />
                  <span>Party Makeup in Chandigarh</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-[#D4A574]/60" aria-hidden="true" />
                  <span>Packages &amp; Pricing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas Badges */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A574] mb-4">
              Service Areas
            </h4>
            <p className="text-xs text-white/70 mb-3 leading-relaxed">
              Studio sessions in Sector 37A and on-venue services across Tricity and destination weddings:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area}
                  className="bg-white/10 hover:bg-[#D4A574]/20 border border-white/10 rounded-md px-2.5 py-1 text-[11px] text-white/85 transition"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A574] mb-4">
              Connect With Bhuvita
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/85">
              <a
                href="tel:+917888808231"
                className="flex items-center gap-2.5 hover:text-[#D4A574] transition-colors"
                aria-label="Call +91 78888 08231"
              >
                <Phone className="h-4 w-4 text-[#D4A574] shrink-0" aria-hidden="true" />
                <span>+91 78888 08231</span>
              </a>
              <a
                href={WA_FOOTER}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#D4A574] transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#D4A574] transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="h-4 w-4 text-[#E1306C] shrink-0" aria-hidden="true" />
                <span>@makeoversbybhuvita (5K+ community)</span>
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#D4A574] transition-colors"
                aria-label="Studio location on Google Maps"
              >
                <MapPin className="h-4 w-4 text-[#D4A574] shrink-0" aria-hidden="true" />
                <span>View Studio on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credential Row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Makeovers by Bhuvita. All rights reserved. Sector 37A, Chandigarh.
          </p>
          <div className="flex items-center gap-1.5 text-white/80">
            <ShieldCheck className="h-4 w-4 text-[#D4A574]" aria-hidden="true" />
            <span>Certified UV Ghai Makeup Artist &bull; 200+ Brides Styled</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
