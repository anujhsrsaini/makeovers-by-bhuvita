import React from 'react';
import { Sparkles } from 'lucide-react';

const WHATSAPP_NUMBER = '917888808231';
const WA_ANNOUNCEMENT = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Bhuvita! I'm looking for bridal/party makeup in Chandigarh Tricity. Could you share your packages and date availability?"
)}`;

export default function AnnouncementBar() {
  return (
    <div className="bg-[#5C4033] text-white text-center text-xs sm:text-sm px-4 py-2.5 z-50">
      <a
        href={WA_ANNOUNCEMENT}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 hover:text-[#D4A574] transition-colors"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#D4A574] shrink-0" aria-hidden="true" />
        <span>
          Now booking 2026–27 wedding dates across Chandigarh, Mohali, Panchkula &amp; Zirakpur &mdash;{' '}
          <span className="underline underline-offset-2 font-semibold">Chat on WhatsApp</span>
        </span>
      </a>
    </div>
  );
}
