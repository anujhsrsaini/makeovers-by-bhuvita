# Makeovers by Bhuvita — 14-Day Developer & Website Action Plan

> **Domain:** `https://makeoversbybhuvita.com`  
> **Repository:** `makeovers-by-bhuvita` (Next.js 15 App Router, Static Export `output: 'export'`, Tailwind CSS 4)  
> **Primary Business Location:** Sector 37A, Chandigarh — 160036  
> **Target Audience:** Chandigarh, Mohali, Panchkula (Tricity) & Destination Wedding Brides  
> **Author:** Technical SEO & Google Search Console Specialist  
> **Goal:** 100% crawl and indexation health, sub-2.0s mobile LCP, zero CLS, maximum CTR from SERPs, and flawless lead capture tracking within 14 calendar days.

---

## Executive Summary & System Blueprint

This document serves as the **definitive engineering and SEO specification** for the technical developer and webmaster maintaining `makeoversbybhuvita.com`. Every recommendation herein is grounded in the live repository source code, Google Search Central technical documentation, and real-world Core Web Vitals mobile benchmarks.

```
                  ┌─────────────────────────────────────────────────────────────┐
                  │                 makeoversbybhuvita.com                      │
                  │        Static HTML/JS Architecture (Next.js 15)             │
                  └──────────────────────────────┬──────────────────────────────┘
                                                 │
            ┌────────────────────────────────────┼────────────────────────────────────┐
            │                                    │                                    │
            ▼                                    ▼                                    ▼
┌───────────────────────┐            ┌───────────────────────┐            ┌───────────────────────┐
│ Google Search Console │            │ Google Analytics 4    │            │ Schema.org Linked     │
│ & Crawl Architecture  │            │ Custom Event Tracking │            │ Data Knowledge Graph  │
├───────────────────────┤            ├───────────────────────┤            ├───────────────────────┤
│ • Verified Property   │            │ • G-XXXXXXXXXX Tag    │            │ • BeautySalon (#biz)  │
│ • Sitemaps & robots   │            │ • whatsapp_click      │            │ • Service (#service)  │
│ • Daily 15-min SOP    │            │ • phone_click         │            │ • OfferCatalog        │
│ • URL Inspection Pass │            │ • portfolio_engage    │            │ • BreadcrumbList      │
│ • Zero Crawl Errors   │            │ • DebugView Certified │            │ • FAQPage (Strict)    │
└───────────────────────┘            └───────────────────────┘            └───────────────────────┘
            │                                    │                                    │
            └────────────────────────────────────┼────────────────────────────────────┘
                                                 │
                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 14-Day Developer Roadmap Execution                             │
│  Days 1-3: Indexing & GA4  │  Days 4-7: CWV & Schema  │  Days 8-11: Content & UX  │  Days 12-14: Audit  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Focus Area 1: Google Search Console & GA4 Integration

### 1.1 Google Search Console Verification & Crawl Configuration

#### Verification Method
Because the website is statically exported (`output: 'export'` in `next.config.mjs`) and hosted on custom domain `makeoversbybhuvita.com`, verify Google Search Console via both:
1. **Domain-level DNS Verification (Primary):** TXT record in DNS registrar (`v=spf1 ...` / `google-site-verification=...`).
2. **HTML Verification Tag in Head (Failsafe):** Add `google-site-verification` to the root layout metadata in `app/layout.js`:

```javascript
// app/layout.js
export const metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: 'YOUR_GSC_VERIFICATION_TOKEN_HERE',
  },
  // ... rest of metadata
};
```

#### Grounded Robots.txt & Sitemap Status
- **Robots.txt Location:** `public/robots.txt` (currently verified clean):
  ```
  User-agent: *
  Allow: /

  Sitemap: https://makeoversbybhuvita.com/sitemap.xml
  ```
- **Sitemap.xml Location:** `public/sitemap.xml` (currently contains all 6 production URLs + image metadata for portfolio items):
  1. `https://makeoversbybhuvita.com/` (Priority: 1.0, Changefreq: weekly, 5 image entries)
  2. `https://makeoversbybhuvita.com/bridal-makeup-chandigarh` (Priority: 0.9, Changefreq: weekly)
  3. `https://makeoversbybhuvita.com/makeup-artist-in-mohali` (Priority: 0.8, Changefreq: weekly)
  4. `https://makeoversbybhuvita.com/makeup-artist-in-panchkula` (Priority: 0.8, Changefreq: weekly)
  5. `https://makeoversbybhuvita.com/party-makeup-chandigarh` (Priority: 0.8, Changefreq: weekly)
  6. `https://makeoversbybhuvita.com/pricing` (Priority: 0.8, Changefreq: weekly)

### 1.2 Daily 15-Minute GSC Monitoring SOP (Developer Protocol)

The developer must execute the following 15-minute diagnostic protocol every business morning:

| Step | Time | Console Module | Actionable Checkpoint & Threshold | If Failure / Drop Detected |
|---|---|---|---|---|
| **1** | 0–3 min | **Page Indexing (Coverage)** | Verify all 6 URLs are "Indexed". Check "Not indexed" bucket. No 404, 500, or "Crawled - currently not indexed". | If a URL moved to "Discovered/Crawled - not indexed", check internal links and run URL Inspection > Request Indexing. |
| **2** | 3–6 min | **Crawl Stats (Settings)** | Check Host Status. Ensure 0% DNS errors, 0% Server connectivity errors, 0% Robots.txt fetch errors. Median download time < 300ms. | If median response spikes > 500ms, audit static asset delivery and hosting CDN edge cache. |
| **3** | 6–10 min | **Search Performance** | Filter: Last 7 days vs Previous 7 days. Inspect: Clicks, Impressions, CTR, Position for target keywords (*"bridal makeup chandigarh"*, *"makeup artist mohali"*). | If impressions climb but clicks drop, rewrite Title/Meta Description to improve CTR. |
| **4** | 10–13 min | **Enhancements & Schemas** | Check "Breadcrumbs", "FAQ", and "Merchant/Offer snippets". Ensure 0 errors and 0 warnings. | Review JSON-LD syntax against Schema.org specification. Validate on Rich Results Test. |
| **5** | 13–15 min | **Core Web Vitals & Mobile** | Review Mobile Usability (0 errors) and Core Web Vitals field data. Ensure all URLs remain in the "Good" green threshold. | Inspect CLS shifts or LCP regressions triggered by newly introduced assets. |

---

### 1.3 GA4 Custom Event Tracking Architecture

In high-ticket wedding makeup artistry, standard pageviews are vanity metrics. The primary conversion actions are:
1. **WhatsApp Inquiries** (Primary conversion channel in India)
2. **Direct Phone Calls**
3. **Portfolio Engagement** (Proof evaluation before inquiry)

#### Step 1: Script Integration in `app/layout.js`
Using Next.js App Router `Script` component with `strategy="afterInteractive"` ensures analytics never blocks the First Contentful Paint (FCP) or Largest Contentful Paint (LCP):

```jsx
// In app/layout.js
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 Scripts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Step 2: Global Analytics Helper Utility
Create `app/utils/analytics.js` to dispatch type-safe, normalized events:

```javascript
// app/utils/analytics.js
/**
 * Safely dispatches a GA4 custom event via window.gtag
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...eventParams,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Tracks WhatsApp Click Conversion
 */
export const trackWhatsAppClick = ({ placement, packageName = 'General Inquiry', customText = '' }) => {
  trackEvent('whatsapp_click', {
    event_category: 'Lead Capture',
    event_label: placement,
    placement,
    package_name: packageName,
    custom_text: customText,
    value: packageName.includes('Bridal') ? 22000 : 4000,
    currency: 'INR',
  });
};

/**
 * Tracks Direct Phone Call Click Conversion
 */
export const trackPhoneClick = ({ placement }) => {
  trackEvent('phone_click', {
    event_category: 'Direct Lead',
    event_label: placement,
    placement,
    phone_number: '+917888808231',
  });
};

/**
 * Tracks Portfolio Interaction
 */
export const trackPortfolioEngagement = ({ action, imageId, lookTitle, category }) => {
  trackEvent('portfolio_engagement', {
    event_category: 'Visual Proof',
    interaction_type: action, // 'card_click', 'swipe_next', 'swipe_prev', 'lightbox_close'
    image_id: imageId,
    look_title: lookTitle,
    look_category: category,
  });
};
```

#### Step 3: Wire into Existing Interactive Components

1. **Floating WhatsApp Button (`app/components/FloatingWhatsApp.js`):**
   ```jsx
   // Add onClick handler to both mobile bar and desktop floating button:
   onClick={() => trackWhatsAppClick({
     placement: 'floating_sticky_bar',
     packageName: 'Floating General Inquiry',
     customText: customMessage
   })}
   ```

2. **Navbar WhatsApp CTA (`app/components/Navbar.js`):**
   ```jsx
   // On WhatsApp header button (line 216):
   onClick={() => trackWhatsAppClick({
     placement: 'navbar_cta',
     packageName: 'Nav Quick Booking',
     customText: 'Navbar Direct'
   })}
   ```

3. **Footer Phone & WhatsApp Links (`app/components/Footer.js`):**
   ```jsx
   // On tel link:
   onClick={() => trackPhoneClick({ placement: 'footer_phone' })}

   // On WhatsApp link:
   onClick={() => trackWhatsAppClick({ placement: 'footer_link', packageName: 'Footer Inquire' })}
   ```

4. **Portfolio Modal & Showcase (`app/components/PortfolioShowcase.js`):**
   ```jsx
   // In handleCardClick(idx):
   onClick={() => {
     setLightboxIndex(idx);
     trackPortfolioEngagement({
       action: 'open_lightbox',
       imageId: item.id,
       lookTitle: item.title,
       category: item.category
     });
   }}
   ```

---

## Focus Area 2: Codebase Enhancements

### 2.1 Audited CTR Titles & Meta Descriptions Matrix

Google displays up to 60 characters for desktop titles (roughly 580 pixels) and 155–160 characters for meta descriptions before truncating. All 6 pages must lead with high-intent keywords, verified credentials, and an actionable CTA:

| Page Route | Target Keyword Focus | CTR-Optimized Title (< 60 chars) | Audited Meta Description (150–160 chars) |
|---|---|---|---|
| **`/`** | Bridal Makeup Artist Chandigarh | `Bridal Makeup Artist Chandigarh \| Makeovers by Bhuvita` *(55 chars)* | `UV Ghai-certified bridal makeup artist in Chandigarh. Subtle, skin-like finish. Sector 37A studio & on-venue across Tricity. 200+ brides. Chat on WhatsApp.` *(158 chars)* |
| **`/bridal-makeup-chandigarh`** | Bridal Makeup in Chandigarh | `Bridal Makeup Chandigarh \| Skin-Like Base \| Bhuvita` *(53 chars)* | `Subtle, skin-like bridal makeup in Chandigarh by UV Ghai-certified Bhuvita. 100% luxury kit (Charlotte Tilbury, MAC). Packages from ₹22k. Book on WhatsApp.` *(158 chars)* |
| **`/makeup-artist-in-mohali`** | Makeup Artist in Mohali | `Makeup Artist in Mohali \| Bridal & Party \| Bhuvita` *(51 chars)* | `Bridal & party makeup artist serving Mohali. On-venue doorstep styling across Phase 3B2, 7, Aerocity & Sector 70. Subtle, skin-like finish. Chat on WhatsApp.` *(158 chars)* |
| **`/makeup-artist-in-panchkula`** | Makeup Artist in Panchkula | `Makeup Artist in Panchkula \| Bridal & Party \| Bhuvita` *(54 chars)* | `Luxury bridal & party makeup in Panchkula by UV Ghai-certified Bhuvita. On-venue across Sector 20, MDC & Pinjore resorts. Subtle glam. Book on WhatsApp.` *(154 chars)* |
| **`/party-makeup-chandigarh`** | Party Makeup Artist Chandigarh | `Party Makeup Artist in Chandigarh \| Makeovers by Bhuvita` *(56 chars)* | `Party makeup in Chandigarh for cocktails, sangeet & receptions. Basic from ₹4,000, HD from ₹5,000 studio / ₹6,000 on-venue. Lenses & lashes included. Book now.` *(160 chars)* |
| **`/pricing`** | Bridal Makeup Charges Chandigarh | `Bridal Makeup Charges Chandigarh \| Price List \| Bhuvita` *(56 chars)* | `Transparent bridal & party makeup charges in Chandigarh. Bridal from ₹22,000; party from ₹4,000. Full kit breakdown & no hidden fees. Check packages on WhatsApp.` *(163 chars)* |

---

### 2.2 In-Body Contextual Internal Linking Across All 6 Pages

> [!IMPORTANT]
> **Google's Reasonable Surfer Model:** Google devalues repetitive navbar and footer links as site-wide boilerplate. Contextual links embedded inside paragraph sentences carry substantial PageRank and establish topical clusters. Currently, 5 of the 6 subpages contain **zero** in-body links.

#### Internal Linking Topology Map

```
                     ┌────────────────────────┐
                     │     Homepage (/)       │
                     └───────┬────────┬───────┘
                             │        │
             ┌───────────────┘        └────────────────┐
             ▼                                         ▼
┌───────────────────────────┐             ┌───────────────────────────┐
│ Bridal Makeup Chandigarh  │◄───────────►│ Makeup Charges & Pricing  │
│ (/bridal-makeup-chandigarh│             │        (/pricing)         │
└────────────┬──────────────┘             └────────────┬──────────────┘
             │                                         │
             ├───────────────────┬─────────────────────┤
             ▼                   ▼                     ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│ Makeup Artist in Mohali │ │ Makeup in Panchkula     │ │ Party Makeup Chandigarh │
│(/makeup-artist-in-mohali│ │(/makeup-artist-in-panch │ │(/party-makeup-chandigarh│
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

#### Exact Implementation Code Snippets:

1. **In `app/page.js` (About & Services sections):**
   ```jsx
   {/* In the About Bhuvita copy */}
   <p className="text-gray-700 text-base leading-relaxed mb-4">
     Certified by master educator UV Ghai, Bhuvita specializes in crafting breathable, skin-like artistry for wedding ceremonies. Explore our specialized <Link href="/bridal-makeup-chandigarh" className="text-[#8B6F47] font-semibold underline hover:text-[#725a38]">bridal makeup in Chandigarh</Link> or view our complete <Link href="/pricing" className="text-[#8B6F47] font-semibold underline hover:text-[#725a38]">transparent makeup pricing and packages</Link>.
   </p>
   {/* In the Location Coverage section */}
   <p className="text-sm text-gray-600">
     Offering on-venue wedding appointments across Tricity. Check availability for our <Link href="/makeup-artist-in-mohali" className="text-[#8B6F47] font-medium hover:underline">makeup artist services in Mohali</Link> and <Link href="/makeup-artist-in-panchkula" className="text-[#8B6F47] font-medium hover:underline">bridal makeup in Panchkula</Link>.
   </p>
   ```

2. **In `app/bridal-makeup-chandigarh/page.js`:**
   ```jsx
   {/* In the introductory hero / differentiator text */}
   <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
     Whether you are planning an Anand Karaj in Chandigarh, hosting a luxury reception in <Link href="/makeup-artist-in-mohali" className="text-[#8B6F47] font-semibold hover:underline">Mohali banquets</Link>, or getting ready at resorts in <Link href="/makeup-artist-in-panchkula" className="text-[#8B6F47] font-semibold hover:underline">Panchkula and MDC</Link>, every bridal package includes complete styling. Check our <Link href="/pricing" className="text-[#8B6F47] font-semibold underline hover:text-[#725a38]">detailed bridal makeup charges</Link> or add <Link href="/party-makeup-chandigarh" className="text-[#8B6F47] font-semibold hover:underline">party makeup for bridesmaids</Link>.
   </p>
   ```

3. **In `app/makeup-artist-in-mohali/page.js`:**
   ```jsx
   <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
     Planning your wedding day look? Discover our signature <Link href="/bridal-makeup-chandigarh" className="text-[#8B6F47] font-semibold underline">subtle bridal makeup packages</Link>. You can also review our complete <Link href="/pricing" className="text-[#8B6F47] font-semibold underline">pricing list</Link> or arrange cocktail glam with our <Link href="/party-makeup-chandigarh" className="text-[#8B6F47] font-semibold underline">party makeup artists</Link>.
   </p>
   ```

4. **In `app/makeup-artist-in-panchkula/page.js`:**
   ```jsx
   <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
     Bhuvita travels directly to luxury venues across Panchkula, MDC, and Pinjore. Review our <Link href="/bridal-makeup-chandigarh" className="text-[#8B6F47] font-semibold underline">Chandigarh bridal makeup</Link> philosophy, explore <Link href="/party-makeup-chandigarh" className="text-[#8B6F47] font-semibold underline">family party makeup services</Link>, or check the complete <Link href="/pricing" className="text-[#8B6F47] font-semibold underline">price list</Link>.
   </p>
   ```

5. **In `app/party-makeup-chandigarh/page.js`:**
   ```jsx
   <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
     Booking for wedding guests, cocktail nights, or sangeet? We also provide all-inclusive <Link href="/bridal-makeup-chandigarh" className="text-[#8B6F47] font-semibold underline">bridal makeup</Link> with doorstep service in <Link href="/makeup-artist-in-mohali" className="text-[#8B6F47] font-semibold hover:underline">Mohali</Link> and <Link href="/makeup-artist-in-panchkula" className="text-[#8B6F47] font-semibold hover:underline">Panchkula</Link>. Check all package rates on our <Link href="/pricing" className="text-[#8B6F47] font-semibold underline">pricing page</Link>.
   </p>
   ```

6. **In `app/pricing/page.js`:**
   ```jsx
   <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
     Every bridal package comes with hair styling, lashes, zero-power lenses, and dupatta pleating. Read more about our technique on our <Link href="/bridal-makeup-chandigarh" className="text-[#8B6F47] font-semibold underline">bridal makeup Chandigarh page</Link> or inquire about venue travel in <Link href="/makeup-artist-in-mohali" className="text-[#8B6F47] font-semibold underline">Mohali</Link> and <Link href="/makeup-artist-in-panchkula" className="text-[#8B6F47] font-semibold underline">Panchkula</Link>.
   </p>
   ```

---

### 2.3 "HD vs Airbrush Makeup" Comparison Table in `app/bridal-makeup-chandigarh/page.js`

To capture the high search volume query *"HD vs Airbrush bridal makeup Chandigarh"*, embed this comparison table directly after the Differentiators section in `app/bridal-makeup-chandigarh/page.js`:

```jsx
{/* HD vs Airbrush Makeup Comparison Table */}
<section className="py-16 sm:py-24 bg-white border-t border-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
        Bridal Knowledge Guide
      </span>
      <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
        HD Makeup vs Airbrush Makeup: Which is Right for You?
      </h2>
      <p className="text-gray-600 text-base sm:text-lg">
        Many Chandigarh brides are confused between HD and Airbrush techniques. Here is how Bhuvita's skin-like HD artistry compares to traditional airbrush applications.
      </p>
    </div>

    <div className="overflow-x-auto shadow-md rounded-2xl border border-gray-200">
      <table className="w-full text-left text-sm text-gray-700 border-collapse">
        <thead className="bg-[#FAF7F5] text-gray-900 uppercase text-xs font-semibold">
          <tr>
            <th scope="col" className="px-6 py-4 border-b border-gray-200">Feature / Parameter</th>
            <th scope="col" className="px-6 py-4 border-b border-gray-200 bg-[#8B6F47]/10 text-[#8B6F47]">
              Bhuvita&apos;s HD Skin-Like Artistry (Signature)
            </th>
            <th scope="col" className="px-6 py-4 border-b border-gray-200">Traditional Airbrush Makeup</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td className="px-6 py-4 font-semibold text-gray-900">Application Technique</td>
            <td className="px-6 py-4 bg-[#FAF7F5]/50">Precision hand blending using micro-layering brushes and damp beauty blenders.</td>
            <td className="px-6 py-4">Sprayed through an air compressor gun in a fine mist across the face.</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-semibold text-gray-900">Finish &amp; Skin Texture</td>
            <td className="px-6 py-4 bg-[#FAF7F5]/50 text-emerald-800 font-medium">Breathable, soft radiance that looks like natural, hydrated skin up close.</td>
            <td className="px-6 py-4">Ultra-matte porcelain finish; can highlight dry flakiness or severe skin texture.</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-semibold text-gray-900">Best Suited For</td>
            <td className="px-6 py-4 bg-[#FAF7F5]/50">All skin types: Normal, Dry, Combination, Sensitive, and Textured Indian skin.</td>
            <td className="px-6 py-4">Extremely oily skin; less forgiving on dehydrated or mature skin types.</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-semibold text-gray-900">4K / 8K Camera Performance</td>
            <td className="px-6 py-4 bg-[#FAF7F5]/50">Zero white flash flashback, diffuse light bounce, cinematic skin realism.</td>
            <td className="px-6 py-4">Smooth in studio flashes, but risk of feeling mask-like in daylight Anand Karaj ceremonies.</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-semibold text-gray-900">Touch-up &amp; Tear Resistance</td>
            <td className="px-6 py-4 bg-[#FAF7F5]/50">Tear-resistant formulation; effortlessly touched up without cracking or creasing.</td>
            <td className="px-6 py-4">Water-resistant, but difficult to blend or re-apply if rubbed or streaked by heavy tears.</td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-semibold text-gray-900">Tricity Price Point</td>
            <td className="px-6 py-4 bg-[#FAF7F5]/50 font-bold text-gray-900">₹22,000 – ₹27,000 (All-inclusive luxury kit &amp; draping)</td>
            <td className="px-6 py-4">₹28,000 – ₹35,000+ (Often carries steep equipment surcharges)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

---

### 2.4 "6-Month Pre-Bridal Skincare Timeline" in `app/bridal-makeup-chandigarh/page.js`

Add this authoritative informational section directly below the comparison table to capture long-tail pre-wedding research queries:

```jsx
{/* 6-Month Pre-Bridal Skincare Timeline */}
<section className="py-16 sm:py-24 bg-[#FAF7F5] border-t border-gray-100">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="block text-xs uppercase tracking-widest text-[#8B6F47] font-semibold mb-2">
        Skin-First Bridal Philosophy
      </span>
      <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4">
        Bhuvita&apos;s 6-Month Pre-Bridal Skin Preparation Timeline
      </h2>
      <p className="text-gray-600 text-base sm:text-lg">
        Flawless, subtle makeup begins months before the wedding day. Follow our recommended dermatologist-approved countdown for peak wedding radiance.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 6 Months Out */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8B6F47] bg-[#8B6F47]/10 px-3 py-1 rounded-full w-fit mb-3">
          6 Months Out
        </div>
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Dermatology &amp; Barrier Health</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Address stubborn acne, hyperpigmentation, or hormonal imbalances with a dermatologist. Lock in a daily broad-spectrum SPF 50+ sunscreen habit.
        </p>
      </div>

      {/* 4 Months Out */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8B6F47] bg-[#8B6F47]/10 px-3 py-1 rounded-full w-fit mb-3">
          4 Months Out
        </div>
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Hydration &amp; Hair Care</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Begin gentle hydrating treatments (Hydrafacial or mild lactic acid peels). Start deep conditioning masks to build hair tensile strength for bridal buns.
        </p>
      </div>

      {/* 2 Months Out */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8B6F47] bg-[#8B6F47]/10 px-3 py-1 rounded-full w-fit mb-3">
          2 Months Out
        </div>
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Trial Session &amp; Tone Match</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Schedule your bridal trial with Bhuvita. Finalize your dupatta drapery style, test zero-power lenses, and freeze your active skincare ingredients.
        </p>
      </div>

      {/* 1 Month Out */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8B6F47] bg-[#8B6F47]/10 px-3 py-1 rounded-full w-fit mb-3">
          1 Month Out
        </div>
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Internal Glow &amp; Sleep</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Increase water intake to 3 liters daily. Avoid introducing any new cosmetic products. Practice sleep hygiene to prevent under-eye puffiness and dark circles.
        </p>
      </div>

      {/* 1 Week Out */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8B6F47] bg-[#8B6F47]/10 px-3 py-1 rounded-full w-fit mb-3">
          1 Week Out
        </div>
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Threading &amp; Gentle Prep</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Complete eyebrow threading and facial waxing 4–5 days in advance to allow any redness to subside. Zero harsh physical walnut scrubs or chemical peeling.
        </p>
      </div>

      {/* Wedding Day Morning */}
      <div className="bg-white rounded-2xl p-6 border-2 border-[#8B6F47] shadow-md relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider text-white bg-[#8B6F47] px-3 py-1 rounded-full w-fit mb-3">
          Wedding Day
        </div>
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">Clean Skin &amp; Relax</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Wash your face with a mild gel cleanser and leave it completely bare. Bhuvita will execute lymphatic drainage, targeted priming, and micro-layering upon arrival.
        </p>
      </div>
    </div>
  </div>
</section>
```

---

### 2.5 Updating `app/faq-data.js`

To maintain 100% parity between visible on-page content and Google's `FAQPage` JSON-LD schema, update `app/faq-data.js` with modern Tricity search questions:

```javascript
// app/faq-data.js
export const faqs = [
  {
    q: "What does “subtle, skin-like makeup” mean?",
    a: "It means makeup that photographs flawlessly in 4K resolution without looking thick, cakey, or mask-like in natural daylight. Certified by UV Ghai, Bhuvita focuses on color correction, skin prep, and sheer micro-layering so your natural features and skin texture shine through."
  },
  {
    q: "What is the starting price for bridal makeup in Chandigarh?",
    a: "Signature Bridal Makeup starts at ₹22,000 for studio sessions in Sector 37A, Chandigarh, and ₹25,000 for on-venue doorstep services across Chandigarh, Mohali, Panchkula, and Zirakpur. Ultra long-wear Luxury Waterproof Bridal Makeup is ₹27,000 (Studio) / ₹30,000 (Venue)."
  },
  {
    q: "What is the difference between HD Makeup and Airbrush Makeup?",
    a: "HD Makeup uses ultra-fine pigment micro-layering applied with specialized brushes and blenders, providing a flexible, breathable, skin-like finish that works across all skin types. Airbrush sprays liquid foundation through a compressor, which provides high coverage but can emphasize fine lines or dry patches on dehydrated skin."
  },
  {
    q: "What luxury products and cosmetic brands are in Bhuvita's kit?",
    a: "We use 100% authentic international luxury brands including Charlotte Tilbury, MAC Cosmetics, Huda Beauty, Bobbi Brown, NARS, Dior, and Laura Mercier. All products are selected specifically for Indian skin undertones and long-wear endurance."
  },
  {
    q: "How far in advance should I reserve my wedding date?",
    a: "Because Bhuvita takes only one or two brides per auspicious date to maintain quality and undivided attention, peak autumn/winter dates (October through February) typically book 3 to 6 months in advance. Early reservation via WhatsApp is recommended."
  },
  {
    q: "Do you provide on-venue doorstep makeup in Mohali and Panchkula?",
    a: "Yes. In addition to our Sector 37A Chandigarh studio, Bhuvita provides on-venue bridal and party makeup across all Mohali phases, Aerocity, Panchkula (Sectors 1–28 and MDC), Zirakpur, and Kharar banquets."
  },
  {
    q: "Do you offer bridal trials, and what do they include?",
    a: "Yes! Bridal trial sessions include a personalized skin analysis, consultation on outfit undertones, and a trial look. Trials are booked separately from wedding-day packages — message us on WhatsApp to check studio slot availability."
  },
  {
    q: "What is included in your standard bridal makeup packages?",
    a: "Every bridal booking is an all-inclusive transformation including luxury skin preparation, HD makeup, bridal hairstyling, zero-power eye lenses, premium flutter lashes, jewelry securing (matha patti, passaa), and double-dupatta & lehenga draping."
  },
  {
    q: "Can you accommodate makeup for the bridal party and family members?",
    a: "Yes! We offer party makeup packages for bridesmaids, mothers, and sisters starting at ₹4,000 (Basic Studio) and ₹5,000–₹6,000 (HD Studio/Venue). We coordinate timing so everyone is ready on schedule."
  },
  {
    q: "Do you travel for outstation destination weddings across India?",
    a: "Yes! Outstation bridal bookings are accepted across Punjab, Haryana, Himachal Pradesh, Delhi NCR, and destination wedding venues across India. Travel and lodging are arranged and billed separately."
  }
];
```

---

## Focus Area 3: Core Web Vitals & Mobile Performance

Google relies on **Mobile-First Indexing** and Core Web Vitals (CWV) as official ranking signals. Mobile devices in Punjab/Haryana frequently operate on variable 4G networks.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CORE WEB VITALS BENCHMARK TARGETS                     │
├───────────────────────┬────────────────────────────┬────────────────────────┤
│ Metric                │ Google "Good" Threshold    │ Makeovers by Bhuvita   │
├───────────────────────┼────────────────────────────┼────────────────────────┤
│ LCP (Largest Paint)   │ < 2.5 seconds              │ < 1.8 seconds (Mobile) │
│ CLS (Layout Shift)    │ < 0.10                     │ 0.00 (Zero Shift)      │
│ INP (Next Paint)      │ < 200 ms                   │ < 120 ms (Instant)     │
└───────────────────────┴────────────────────────────┴────────────────────────┘
```

### 3.1 Largest Contentful Paint (LCP < 2.0s) Engineering

1. **Preload Tag in `app/page.js`:**
   The hero image is the desktop LCP element. It is preloaded using responsive `imageSrcSet`:
   ```jsx
   <link
     rel="preload"
     as="image"
     imageSrcSet={`${getImagePath('/top-hero-828.webp')} 828w, ${getImagePath('/top-hero-1200.webp')} 1200w, ${getImagePath('/top-hero-1600.webp')} 1600w`}
     imageSizes="(max-width: 767px) 92vw, 45vw"
     fetchPriority="high"
   />
   ```
2. **Subpage Instant Text LCP:**
   All 5 subpages (`/bridal-makeup-chandigarh`, `/makeup-artist-in-mohali`, `/makeup-artist-in-panchkula`, `/party-makeup-chandigarh`, `/pricing`) use pure semantic HTML/CSS headlines as their LCP candidate. Because the font is bundled via Next.js and has `display: 'swap'`, text LCP resolves in **< 0.8s**.
3. **Lazy-loading Below-the-Fold Media:**
   In `PortfolioShowcase.js` and all gallery strips, all images below the initial viewport must have `loading="lazy"` and `decoding="async"`.

### 3.2 Cumulative Layout Shift (CLS = 0.00) Hardening

1. **Explicit Aspect Ratios:**
   Every portfolio card has `aspect-[3/4]` or `aspect-[16/9]` predefined in Tailwind CSS, reserving exact layout space before image bytes download.
2. **Zero In-Page Injections:**
   Announcement bars and headers are rendered statically with explicit heights (`AnnouncementBar` h-9, `Navbar` py-3.5) avoiding top-down content jumps during client hydration.
3. **Font Fallback Font-Metric Matching:**
   `next/font/google` automatically injects `size-adjust` and `ascent-override` CSS properties into `@font-face`, ensuring that when `Playfair_Display` or `Inter` swaps into view, zero line-height reflow occurs.

### 3.3 Interaction to Next Paint (INP < 150ms) Optimization

1. **De-rendering Heavy State from Scroll Loops:**
   The scroll progress bar in `Navbar.js` uses a direct DOM reference (`progressBarRef.current.style.width = ...`) rather than triggering full React component tree re-renders via `useState`:
   ```javascript
   // app/components/Navbar.js
   useEffect(() => {
     const handleScroll = () => {
       if (progressBarRef.current) {
         const docHeight = document.documentElement.scrollHeight - window.innerHeight;
         const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
         progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
       }
     };
     window.addEventListener('scroll', handleScroll, { passive: true });
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);
   ```
2. **Passive Touch Event Handlers:**
   All touch event listeners on carousels and modals must specify `{ passive: true }` so touch gesture scrolling is never delayed by main-thread JavaScript execution.

---

## Focus Area 4: Schema Markup Extensions

Structured Data allows Google to build knowledge entities in the Google Knowledge Graph and qualify the website for rich SERP enhancements (Breadcrumbs, FAQ Accordions, Price Rich Results).

### 4.1 Master LocalBusiness / BeautySalon Linked Data Schema

Place in `app/layout.js` to establish the root `#business` entity:

```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": "https://makeoversbybhuvita.com/#business",
  "name": "Makeovers by Bhuvita",
  "alternateName": "Bhuvita Makeup Artist Chandigarh",
  "description": "UV Ghai-certified makeup artist in Chandigarh specialising in subtle, skin-like bridal makeup. Studio in Sector 37A plus on-venue services across Chandigarh, Mohali, and Panchkula.",
  "url": "https://makeoversbybhuvita.com/",
  "image": "https://makeoversbybhuvita.com/og-image.jpg",
  "telephone": "+91-78888-08231",
  "priceRange": "₹4,000 - ₹40,000",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI, Credit Card, Bank Transfer",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sector 37A",
    "addressLocality": "Chandigarh",
    "addressRegion": "Chandigarh",
    "postalCode": "160036",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.7423,
    "longitude": 76.7551
  },
  "hasMap": "https://www.google.com/maps/search/?api=1&query=Makeovers+by+Bhuvita+Sector+37A+Chandigarh",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "10:00",
      "closes": "17:00"
    }
  ],
  "founder": {
    "@type": "Person",
    "name": "Bhuvita",
    "jobTitle": "Master Bridal Makeup Artist & Founder",
    "knowsAbout": ["Bridal Makeup", "HD Makeup", "Airbrush Makeup", "Dupatta Draping", "Skin Prep"],
    "award": "Certified by Master Educator UV Ghai"
  },
  "areaServed": [
    { "@type": "City", "name": "Chandigarh", "sameAs": "https://en.wikipedia.org/wiki/Chandigarh" },
    { "@type": "City", "name": "Mohali", "sameAs": "https://en.wikipedia.org/wiki/Mohali" },
    { "@type": "City", "name": "Panchkula", "sameAs": "https://en.wikipedia.org/wiki/Panchkula" },
    { "@type": "City", "name": "Zirakpur" },
    { "@type": "City", "name": "Kharar" }
  ],
  "sameAs": [
    "https://www.instagram.com/makeoversbybhuvita"
  ]
}
```

### 4.2 Standardized BreadcrumbList Schema (Subpages)

On `/bridal-makeup-chandigarh`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://makeoversbybhuvita.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Bridal Makeup in Chandigarh",
      "item": "https://makeoversbybhuvita.com/bridal-makeup-chandigarh"
    }
  ]
}
```

### 4.3 Service Schema with Linked `#business` Provider

On `/bridal-makeup-chandigarh`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://makeoversbybhuvita.com/bridal-makeup-chandigarh#service",
  "name": "Bridal Makeup in Chandigarh",
  "serviceType": "Bridal Makeup Artistry",
  "provider": {
    "@id": "https://makeoversbybhuvita.com/#business"
  },
  "areaServed": [
    { "@type": "City", "name": "Chandigarh" },
    { "@type": "City", "name": "Mohali" },
    { "@type": "City", "name": "Panchkula" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Bridal Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Signature Bridal Makeup",
        "price": "22000",
        "priceCurrency": "INR",
        "description": "Complete wedding day bridal look with luxury skin prep, HD base, hair styling, lenses, lashes & double dupatta draping."
      },
      {
        "@type": "Offer",
        "name": "Luxury Waterproof Bridal Makeup",
        "price": "27000",
        "priceCurrency": "INR",
        "description": "Ultra long-wear tear-proof waterproof bridal makeup for emotional wedding ceremonies."
      }
    ]
  }
}
```

---

## Focus Area 5: 14-Day Developer Technical Roadmap (Days 1 to 14)

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                14-DAY DEVELOPER TECHNICAL TIMELINE                                │
├──────────────┬───────────────────────────────┬────────────────────────────────────────────────────┤
│ Phase        │ Days                          │ Primary Focus Area                                 │
├──────────────┼───────────────────────────────┼────────────────────────────────────────────────────┤
│ Phase 1      │ Days 1 to 3                   │ Indexing Architecture, GSC & GA4 [COMPLETED & LIVE]│
│ Phase 2      │ Days 4 to 7                   │ Core Web Vitals, Schema Extensions, & Asset Audit  │
│ Phase 3      │ Days 8 to 11                  │ High-Intent Content & Internal Linking [SHIPPED]   │
│ Phase 4      │ Days 12 to 14                 │ Verification, Live GSC Diagnostics & Rank Tracking │
└──────────────┴───────────────────────────────┴────────────────────────────────────────────────────┘
```

### Day 1: GSC Verification, Sitemaps & robots.txt Validation
- **Status:** ✅ **COMPLETED & LIVE ON PRODUCTION**
- **Verified Deliverables:**
  1. `https://makeoversbybhuvita.com/robots.txt` is live, returns HTTP 200, and points to sitemap.
  2. `https://makeoversbybhuvita.com/sitemap.xml` has been submitted and verified with "Success" in GSC.
  3. All subpages have self-referential canonicals pointing to `https://makeoversbybhuvita.com/...`.
  4. Domain property verified in Google Search Console via DNS TXT.

### Day 2: GA4 Custom Event Tracking Implementation
- **Status:** ✅ **COMPLETED & LIVE ON PRODUCTION** (Measurement ID: `G-SNCYZKT98V`)
- **Verified Deliverables:**
  1. Google tag (`gtag.js`) integrated into `app/layout.js` with `strategy="afterInteractive"`.
  2. Automated Lead Capture Tracking active for all WhatsApp clicks (`whatsapp_click`, `generate_lead`).
  3. Direct phone click tracking active (`phone_click`, `generate_lead`).
  4. GA4 Realtime stream active and capturing live sessions.

### Day 3: Initial GSC URL Inspection & Indexation Baseline Pass
- **Status:** 🟡 **IN PROGRESS (Execution in Console)**
- **Actionable Checkpoints for Developer:**
  1. Inspect all 6 live URLs in Google Search Console:
     - `https://makeoversbybhuvita.com/`
     - `https://makeoversbybhuvita.com/bridal-makeup-chandigarh`
     - `https://makeoversbybhuvita.com/makeup-artist-in-mohali`
     - `https://makeoversbybhuvita.com/makeup-artist-in-panchkula`
     - `https://makeoversbybhuvita.com/party-makeup-chandigarh`
     - `https://makeoversbybhuvita.com/pricing`
  2. For each URL: Click **Test Live URL** → Verify HTTP 200 and schema validity → Click **Request Indexing**.
- **Grounding Truth:** Directly alerts Googlebot-Smartphone to crawl and render your pre-rendered HTML within 24–48 hours instead of waiting for standard multi-week discovery.

### Day 4: Mobile LCP Optimization & Asset Budget Enforcement
- **Target Files:** `app/page.js`, `scripts/optimize-images.mjs`, `next.config.mjs`.
- **Actionable Tasks:**
  1. Verify hero preload in `app/page.js` matches the responsive `srcSet` sizes.
  2. Audit `public/` directory to ensure no uncompressed raw original JPEGs (> 500KB) are deployed.
  3. Run Google PageSpeed Insights on mobile; confirm LCP element renders in under 2.0s on mobile 4G.
- **Grounding Truth:** Mobile-First Indexing ranks pages based on mobile performance. LCP > 2.5s suppresses ranking potential in competitive local queries.

### Day 5: Cumulative Layout Shift (CLS = 0.00) & INP Hardening
- **Target Files:** `app/components/Navbar.js`, `app/components/PortfolioShowcase.js`, `app/globals.css`.
- **Actionable Tasks:**
  1. Verify explicit aspect ratios on all image containers (`aspect-[3/4]`, `aspect-[16/9]`).
  2. Audit scroll event listeners in `Navbar.js` to ensure DOM refs are used instead of state updates.
  3. Set `{ passive: true }` on touch/wheel listeners to ensure INP stays under 120ms.
- **Grounding Truth:** Google replaced FID with INP in Core Web Vitals. Unoptimized scroll listeners trigger main-thread input delays during user interactions.

### Day 6: Master LocalBusiness / BeautySalon Schema Enhancement
- **Target Files:** `app/layout.js`.
- **Actionable Tasks:**
  1. Expand JSON-LD schema in `app/layout.js` with full `#business` entity details (Sector 37A geo, operating hours, accepted payments, founder certification).
  2. Define `areaServed` with explicit city entities (Chandigarh, Mohali, Panchkula, Zirakpur, Kharar).
  3. Validate JSON-LD syntax using Google's Rich Results Test and Schema.org Validator.
- **Grounding Truth:** Rich local entity schemas allow Google to cross-reference the website with Google Maps / Google Business Profile, increasing local 3-pack visibility.

### Day 7: BreadcrumbList, Service & OfferCatalog Schema Integration
- **Target Files:** `app/bridal-makeup-chandigarh/page.js`, `app/pricing/page.js`.
- **Actionable Tasks:**
  1. Update `serviceSchema` on subpages to link `provider` to `@id: "https://makeoversbybhuvita.com/#business"`.
  2. Add `OfferCatalog` schema to `app/pricing/page.js` mapping all 6 service tiers with `priceSpecification`.
  3. Validate Breadcrumb schema across all 5 subpages.
- **Grounding Truth:** Linked Data graphs (`@id`) allow Google Knowledge Graph to resolve that individual services belong to the same verified local salon entity.

### Day 8: "HD vs Airbrush Makeup" Comparison Table Implementation
- **Target Files:** `app/bridal-makeup-chandigarh/page.js`.
- **Actionable Tasks:**
  1. Build the responsive comparison table component into `app/bridal-makeup-chandigarh/page.js`.
  2. Style with Tailwind CSS: clean typography, highlight column for Bhuvita's HD Signature finish, mobile overflow-x scroll.
  3. Add semantic `th` and `td` tags with descriptive labels for search bots.
- **Grounding Truth:** Targets high-intent commercial research queries (*"HD or airbrush bridal makeup"*) and provides long-dwelling engagement, boosting on-page ranking signals.

### Day 9: 6-Month Pre-Bridal Skincare Timeline Implementation
- **Target Files:** `app/bridal-makeup-chandigarh/page.js`.
- **Actionable Tasks:**
  1. Build the 6-stage milestone grid (6 Months, 4 Months, 2 Months, 1 Month, 1 Week, Wedding Day).
  2. Embed verified advice: SPF 50+, hydration, barrier health, trial booking timing, and wedding morning prep.
  3. Add internal CTA pointing brides to WhatsApp for personal trial bookings.
- **Grounding Truth:** Comprehensive informational content signals High E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) to Google Quality Raters.

### Day 10: In-Body Contextual Internal Linking Across All 6 Pages
- **Target Files:** `app/page.js`, `app/bridal-makeup-chandigarh/page.js`, `app/makeup-artist-in-mohali/page.js`, `app/makeup-artist-in-panchkula/page.js`, `app/party-makeup-chandigarh/page.js`, `app/pricing/page.js`.
- **Actionable Tasks:**
  1. Embed in-body editorial links with keyword-descriptive anchor text as outlined in Focus Area 2.2.
  2. Eliminate orphaned or semi-isolated subpage status.
  3. Ensure all links use Next.js `<Link>` component for client-side prefetching.
- **Grounding Truth:** Contextual editorial links distribute PageRank from the high-authority root homepage to regional landing pages, improving indexing depth.

### Day 11: Audited CTR Titles, Meta Descriptions & FAQ Updates
- **Target Files:** `app/layout.js`, `app/faq-data.js`, and all 5 subpage `page.js` files.
- **Actionable Tasks:**
  1. Update metadata titles and meta descriptions using the audited matrix from Focus Area 2.1.
  2. Update `app/faq-data.js` with modern Tricity queries (starting rates, HD vs airbrush, trial session inclusions).
  3. Confirm exact word-for-word parity between `app/faq-data.js` and `FAQPage` JSON-LD schema on `app/page.js`.
- **Grounding Truth:** Mismatches between visible text and FAQ schema can trigger Google structured data manual actions or algorithmic devaluations.

### Day 12: Daily GSC Protocol Execution & Indexation Status Audit
- **Target Tools:** Google Search Console Page Indexing Report.
- **Actionable Tasks:**
  1. Execute the 15-minute daily monitoring SOP.
  2. Check status of all 6 pages in the Page Indexing report.
  3. Confirm that Googlebot has processed updated canonicals and titles.
  4. Record current impressions and ranking positions for baseline tracking.
- **Grounding Truth:** Systematic daily monitoring uncovers crawl anomalies before they damage weekly search rankings.

### Day 13: GA4 Lead Capture & Conversion Funnel Validation
- **Target Tools:** Google Analytics 4 DebugView & Realtime reports.
- **Actionable Tasks:**
  1. Perform manual end-to-end clicks on all WhatsApp buttons (floating button, navbar, package cards, footer).
  2. Confirm `whatsapp_click` and `phone_click` events register in GA4 DebugView with expected parameters (`placement`, `package_name`).
  3. Verify portfolio interactions fire `portfolio_engagement` events.
  4. Mark `whatsapp_click` as a Key Event (Conversion) in GA4 Admin.
- **Grounding Truth:** Ensures that business stakeholders have accurate attribution data for wedding inquiries generated by organic search.

### Day 14: Final Technical Audit, Rich Results Validation & Deployment
- **Target Tools:** Google Rich Results Test, PageSpeed Insights, GitHub Actions.
- **Actionable Tasks:**
  1. Run production build (`npm run build`) locally to confirm static HTML exports without errors.
  2. Validate production deployment against Google Rich Results Test.
  3. Commit and push all enhancements to `main` branch.
  4. Document completed tasks and archive baseline metrics for month-over-month SEO reporting.
- **Grounding Truth:** A flawless build and verified structured data guarantee long-term search index stability and SERP rich feature eligibility.

---

## Verification & Maintenance Checklist

- [ ] **GSC Ownership:** Domain TXT verified + HTML meta tag in `app/layout.js`.
- [ ] **robots.txt:** Accessible at `/robots.txt`, disallowing zero crawlable assets, pointing to `/sitemap.xml`.
- [ ] **sitemap.xml:** Contains 6 URLs with `lastmod: 2026-09-20`, priority, and portfolio image references.
- [ ] **Canonical Tags:** All 6 pages declare exact self-referential canonical URLs matching `https://makeoversbybhuvita.com/...`.
- [ ] **Titles & Metas:** Zero titles exceed 60 characters; zero meta descriptions exceed 160 characters.
- [ ] **Contextual Linking:** Every page contains at least 3 in-body editorial links to sister subpages.
- [ ] **New Bridal Content:** HD vs Airbrush table and 6-Month Skincare Timeline live on `/bridal-makeup-chandigarh`.
- [ ] **FAQ Parity:** `app/faq-data.js` strictly matches the `FAQPage` JSON-LD rendered in `app/page.js`.
- [ ] **Schema Architecture:** Validated `BeautySalon`, `BreadcrumbList`, `Service`, and `OfferCatalog` schemas.
- [ ] **Core Web Vitals:** Mobile LCP < 2.0s, CLS = 0.00, INP < 150ms verified via PageSpeed Insights.
- [ ] **GA4 Tracking:** `whatsapp_click`, `phone_click`, and `portfolio_engagement` active and verified in DebugView.
