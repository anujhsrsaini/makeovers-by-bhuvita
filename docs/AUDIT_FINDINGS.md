# Audit Findings — Full Detail (2026-07-03)

_Produced by 6 parallel audit agents. Source of truth for the implementation backlog in MASTER_PLAN.md §6._

## SEO (local SEO for bridal makeup artist Chandigarh queries)

**Summary:** The site has a decent metadata/JSON-LD foundation (BeautySalon + FAQPage schema, canonical, OG/Twitter tags, meta robots) but ships three launch-blocking SEO defects: the only H1 on the page is the nav logo (the keyword-rich hero headline is an H2), the OG image is a 3030x4032 1.4MB portrait falsely declared as 1200x630 (which will break/crop WhatsApp link previews — the primary conversion channel), and the page still displays unverified claims (4.9-star rating, 50+ destination weddings) and six fabricated testimonials that contradict the verified business facts. There is no sitemap, the canonical points at a 301-redirecting non-trailing-slash URL, and alt text/image filenames waste 39 portfolio images' worth of image-search potential.

### [P0] Page has no keyword-bearing H1 — the H1 is the nav logo

app/page.js line 332: the <h1> is the navbar brand 'Makeovers by Bhuvita' in a decorative script font. The actual hero headline 'Making Your Dream Day Beautiful' (line 379) is an <h2> and contains zero target keywords. For the query class 'bridal makeup artist chandigarh', Google sees an H1 that is only a brand name and a hero H2 with no service or location terms. Section headings ('My Portfolio', 'Happy Brides', 'Get In Touch') are also keyword-empty H2s.

**Fix:** In app/page.js: (1) change the nav brand at line 332 from <h1> to <div> or <span> (keep the same classes); (2) change the hero heading at line 379 from <h2> to <h1> and rewrite it to include the money keyword while staying on-brand, e.g. 'Bridal Makeup Artist in Chandigarh for Your <span class="text-gradient-gold">Dream Day</span>' or keep the emotional line and add a keyworded subheading span. Also enrich section H2s: 'My Portfolio' → 'Bridal Makeup Portfolio', 'Services & Pricing' → 'Bridal & Party Makeup Prices in Chandigarh', 'Happy Brides' → 'Reviews from Chandigarh & Tricity Brides'. Verify exactly one H1 remains.

**Files:** app/page.js

### [P0] OG/Twitter image is a 1.4MB 3030x4032 portrait declared as 1200x630 — WhatsApp link previews (the primary conversion channel) will fail or crop badly

app/layout.js lines 36-43 and 49 point og:image and twitter:image at /hero-image.jpeg and declare width 1200 / height 630. The actual file (public/hero-image.jpeg) is 3030x4032 pixels and 1,410,151 bytes. WhatsApp (where this site will overwhelmingly be shared, given the wa.me CTA strategy) rejects or degrades OG images this large, and the portrait aspect ratio guarantees an ugly crop on Facebook/Twitter cards even when it does render. The declared dimensions are simply false, which some scrapers use for layout.

**Fix:** Use sharp locally (it is available) to generate a dedicated public/og-image.jpg: 1200x630, landscape crop of the hero shot, quality ~80, target under 300KB (e.g. `npx sharp-cli` or a small node script: sharp('public/hero-image.jpeg').resize(1200, 630, {fit:'cover', position:'attention'}).jpeg({quality:80}).toFile('public/og-image.jpg')). Update openGraph.images[0].url and twitter.images in app/layout.js to `${siteUrl}/og-image.jpg` and keep width 1200 / height 630 (now truthful). After deploy, validate with the Facebook Sharing Debugger and by sending the link in a WhatsApp chat.

**Files:** app/layout.js, public/hero-image.jpeg

### [P0] Unverified stats (4.9-star rating, 50+ destination weddings) and six fabricated testimonials are live on the page

app/page.js lines 243-248 render '50+ Destination Weddings' and '4.9★ Average Rating' in the animated stats bar — both explicitly flagged as UNVERIFIED in the business facts. Lines 143-186 render six placeholder testimonials with invented names (Priya Sharma, Ananya Patel, etc.) and invented events including a fake Udaipur destination wedding. The FAQ (page.js line 270) and FAQPage JSON-LD (layout.js line 135) also claim experience with weddings in 'Goa, Udaipur, Jaipur, Dubai'. The code's own comments acknowledge these are placeholders. Beyond the honesty constraint, fake review content is an E-E-A-T liability, and if aggregateRating is ever re-added to the schema while backed by fabricated on-page reviews, that is exactly the pattern Google's structured-data spam policies penalize.

**Fix:** Before launch: (1) in the stats array (page.js ~line 243), replace the two unverified entries with verified ones, e.g. { number: '200+', label: 'Happy Brides' }, { number: '5+', label: 'Years Experience' }, { number: '5,000+', label: 'Instagram Community' }, { number: '100%', label: 'UV Ghai Certified' } — and update the animated-counter targets array at line 93 to match; (2) replace the six testimonials with real quotes sourced from her Instagram comments/DMs (with permission) or temporarily reduce the section to an Instagram-review link block; (3) edit the destination-wedding FAQ answer in BOTH page.js (line 270) and the FAQPage JSON-LD in layout.js (line 135) to drop the specific city list unless verified, e.g. 'Yes, we take outstation and destination bookings across India; travel and stay are charged separately.'

**Files:** app/page.js, app/layout.js

### [P1] Canonical and og:url point at a URL that 301-redirects (missing trailing slash)

app/layout.js line 7 sets siteUrl to 'https://anujhsrsaini.github.io/makeovers-by-bhuvita' (no trailing slash) and uses it for alternates.canonical (line 52) and openGraph.url (line 32). GitHub Pages 301-redirects /makeovers-by-bhuvita to /makeovers-by-bhuvita/. A canonical that points through a redirect sends Google a mixed signal about the preferred URL and wastes the (single) page's canonical hint.

**Fix:** Change line 7 to include the trailing slash: `const siteUrl = isProd ? 'https://anujhsrsaini.github.io/makeovers-by-bhuvita/' : 'http://localhost:3000/';` and make image URL concatenations use `${siteUrl}og-image.jpg` (no leading slash) so paths don't double up. Also add `metadataBase: new URL(siteUrl)` to the metadata export so Next.js resolves any relative metadata URLs correctly and stops warning at build.

**Files:** app/layout.js

### [P1] No sitemap.xml (and no way to have a robots.txt on a project page)

There is no sitemap anywhere in the repo (checked app/ and public/). Note the subtlety: robots.txt is only honored at the origin root (anujhsrsaini.github.io/robots.txt), which this project-page repo cannot serve — a robots.txt inside /makeovers-by-bhuvita/ is ignored by crawlers, so do NOT add one; the meta robots tag already present in layout.js (lines 54-57) is the correct mechanism here. A sitemap, however, works fine because Search Console accepts sitemaps at any path. With 39 portfolio images, an image sitemap is the cheapest way to get this work into Google Images, which is a real discovery surface for makeup artists.

**Fix:** Add public/sitemap.xml (static file — simplest for a one-page static export) containing the single URL https://anujhsrsaini.github.io/makeovers-by-bhuvita/ with <image:image> entries (xmlns:image="http://www.google.com/schemas/sitemap-image/1.1") for all 39 /portfolio/*.jpeg files plus hero-image.jpeg, using the portfolio.json descriptions as <image:title>. Then verify the site in Google Search Console (URL-prefix property for https://anujhsrsaini.github.io/makeovers-by-bhuvita/) and submit the sitemap there. Do not create a robots.txt.

**Files:** public/, app/layout.js

### [P1] Title tag is 84 characters and back-loads nothing — gets truncated in SERPs

app/layout.js line 10: 'Makeovers by Bhuvita | Best Bridal Makeup Artist in Chandigarh, Mohali & Panchkula' is ~84 chars; Google truncates around 55-60. The brand name consumes the visible prefix while the money keywords risk being cut. Also 'Best' is a superlative claim Google increasingly rewrites titles around.

**Fix:** Rewrite to front-load the query and fit ~58 chars: 'Bridal Makeup Artist in Chandigarh | Makeovers by Bhuvita'. Optionally work the differentiator into the meta description instead, e.g. lead the description with 'UV Ghai-certified bridal makeup artist specialising in subtle, skin-like makeup. Studio in Sector 37A Chandigarh + on-venue across Mohali & Panchkula. 200+ brides…' — the current description also doesn't mention the subtle-makeup USP or the studio location, both of which are verified differentiators.

**Files:** app/layout.js

### [P1] JSON-LD BeautySalon is good but incomplete/imprecise: city-center geo coords, no @id, no opening hours, no hasMap

app/layout.js lines 61-126: (1) geo is 30.7333/76.7794 — generic Chandigarh city center (Sector 17 area), not Sector 37A, which is ~30.726/76.744; wrong coords weaken local relevance signals and could conflict with a future Google Business Profile. (2) No @id, so the entity can't be referenced/deduped. (3) No openingHoursSpecification — a strongly recommended LocalBusiness property. (4) No hasMap linking to the Google Maps location already used in the contact iframe. Positives worth keeping: aggregateRating correctly omitted (the code comment shows this was deliberate — good, it avoids the exact penalty pattern), Offer prices match on-page prices, FAQPage mainEntity text matches visible FAQ answers verbatim (5 of the 8 on-page FAQs — that subset relationship is fine).

**Fix:** In the jsonLd object: add `'@id': `${siteUrl}#business``; correct geo to the actual studio pin (open the studio in Google Maps, copy exact coords — approximately latitude 30.726, longitude 76.744 for Sector 37A, but verify the real pin); add `openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '09:00', closes: '20:00' }]` with her real hours; add `hasMap: 'https://www.google.com/maps/search/?api=1&query=Makeovers+by+Bhuvita+Sector+37A+Chandigarh'`. After deploy, validate with Google's Rich Results Test. Note: expect no FAQ rich result regardless — since Aug 2023 Google restricts FAQ rich results to government/health sites — the markup is harmless and still aids comprehension, so keep it but keep it synced with visible FAQs.

**Files:** app/layout.js

### [P1] Weak/generic alt text: hero says 'Bridal Makeup', six Instagram-teaser images say 'Instagram', portfolio alts lack location and brand

app/page.js line 399: hero alt is just 'Bridal Makeup'. Lines 952-957: six portfolio images in the Instagram teaser all have alt='Instagram' — literally the least descriptive possible value for six large bridal photos. Portfolio alts (lines 531, 570, 1066) reuse portfolio.json descriptions like 'Traditional Bridal Look' — serviceable but with 39 images this is the site's biggest untapped Google Images surface and none of the alts carry 'Chandigarh' or the artist's name. The about photo alt (line 454) is actually the best on the site — use it as the template.

**Fix:** (1) Hero alt → 'Bride with subtle, skin-like bridal makeup by Makeovers by Bhuvita, Chandigarh'. (2) Instagram teaser: since these reuse portfolio images, import their descriptions — change alt to `${portfolioImages[imgNum-1].description} - Makeovers by Bhuvita on Instagram` or map from portfolioData. (3) Enrich a handful of portfolio.json descriptions with natural location/service phrasing (don't stuff all 39 — vary them), e.g. 'Traditional Hindu bridal makeup, Chandigarh wedding', 'Engagement makeup look for a Mohali bride'; these flow automatically into gallery alts and the lightbox.

**Files:** app/page.js, public/portfolio/portfolio.json

### [P1] areaServed cities (Zirakpur, Kharar) exist only in schema, never in visible copy; no 'areas served' content on page

app/layout.js lines 82-88 declare Chandigarh, Mohali, Panchkula, Zirakpur and Kharar as served areas, but Zirakpur and Kharar appear nowhere in the rendered page. Schema unsupported by visible content carries little weight, and 'makeup artist zirakpur/kharar' are lower-competition queries this site could actually win. The visible copy also never states the studio address + service area together in crawlable text (the contact section comes close).

**Fix:** Add one crawlable sentence in the contact or footer section of app/page.js, e.g.: 'Studio at Sector 37A, Chandigarh — bridal and party makeup on-venue across Chandigarh, Mohali, Panchkula, Zirakpur and Kharar.' This aligns visible content with the schema's areaServed and adds long-tail location coverage at zero design cost.

**Files:** app/page.js, app/layout.js

### [P1] Quick local-SEO wins compatible with GitHub Pages (off-page + platform)

The single highest-leverage item is a custom domain: anujhsrsaini.github.io/makeovers-by-bhuvita is a personal-subdomain project path — the domain signals (anujhsrsaini) have nothing to do with the business, the URL is unclickable on a business card, and root-level robots.txt is impossible. GitHub Pages fully supports custom domains with free HTTPS. Second: a Google Business Profile for 'Makeovers by Bhuvita' (Sector 37A studio) is the actual ranking surface for 'bridal makeup artist chandigarh' — the map pack dominates these SERPs far more than organic links; the website field should link to this site and NAP (name/address/phone +91 78888 08231) must match the site exactly. Third: the Instagram bio link (5.2k followers) should point at this site to drive the crawl-discovery and traffic signals a brand-new domain needs.

**Fix:** (1) Buy makeoversbybhuvita.com (or .in), add a CNAME file to public/ containing the domain, configure DNS (CNAME → anujhsrsaini.github.io), enable HTTPS in repo Pages settings, then set basePath/assetPrefix to '' in next.config.mjs and update siteUrl in app/layout.js — this simultaneously kills the basePath complexity and the subpath-robots limitation. (2) Create/claim the Google Business Profile with exact-match NAP and this site as the website; collect real Google reviews there (which later unlock a legitimate aggregateRating). (3) Update the Instagram bio link. (4) List on WedMeGood / WeddingWire India / Justdial with identical NAP for citations.

**Files:** next.config.mjs, .github/workflows/nextjs.yml

### [P2] Pre-rendered HTML shows '0' stats and opacity-0 sections until JS runs

app/page.js line 424-427: the stats render the literal string '0' server-side (statsInView is false at build), and every section below the fold is in an opacity-0 translate-y-8 state in the static HTML (e.g. lines 420, 493, 661). Googlebot renders JS so this usually resolves, but the initial crawl snapshot and any non-rendering crawler sees zeroed stats and visually hidden content, and rendering-queue delays make indexing of the real content slower for a brand-new site.

**Fix:** Render the real stat values in the initial markup and animate FROM them (or only animate when JS confirms it will run): change line 424-427 to fall back to stat.number instead of '0' when !statsInView, i.e. `{statsInView ? … : stat.number}`. For the fade-in sections, gate the opacity-0 initial class behind a `jsEnabled` state set in a useEffect, so the no-JS/static snapshot shows fully visible content.

**Files:** app/page.js

### [P2] Image filenames are 1.jpeg–39.jpeg — zero keyword signal for image search

public/portfolio/ contains 39 numerically named files. Descriptive filenames are a confirmed (minor) image-search ranking factor and improve image-sitemap quality. This matters more than usual here because bridal makeup is a heavily image-driven vertical.

**Fix:** Rename files to keyworded slugs derived from portfolio.json, e.g. 1.jpeg → traditional-bridal-makeup-chandigarh-01.jpeg, and update the 'file' field in portfolio.json accordingly (a 10-line node script can do both from the JSON). Do this in the same commit as the image-compression work presumably coming from the performance audit (the 32MB of originals need resizing anyway), so URLs only change once. Also update the six hardcoded imgNum references in the Instagram teaser (page.js line 944).

**Files:** public/portfolio/, public/portfolio/portfolio.json

### [P2] Housekeeping: metadataBase missing, keywords meta is dead weight, no branded 404; .nojekyll confirmed NOT needed

(1) No metadataBase in app/layout.js — currently masked by manually absolute URLs but Next 15 warns and any future relative metadata URL would mis-resolve. (2) The 15-entry keywords array (lines 12-28) has been ignored by Google since 2009 — harmless but dead weight that tempts keyword-stuffing habits. (3) No app/not-found.js; Next export emits a default unbranded 404.html which GitHub Pages will serve for bad paths — a branded one with a link home recovers mistyped/truncated WhatsApp-shared URLs. (4) Verified non-issue: no .nojekyll exists, but the site deploys via actions/deploy-pages (workflow uses upload-pages-artifact + deploy-pages), which bypasses Jekyll processing entirely, so _next/ assets are safe — do not spend time on it.

**Fix:** (1) Add `metadataBase: new URL(siteUrl)` to the metadata export. (2) Delete the keywords array. (3) Create app/not-found.js exporting a simple branded component with an H1 ('Page not found'), a link to '/', and the WhatsApp CTA — it will be statically exported as 404.html automatically.

**Files:** app/layout.js, app/not-found.js, .github/workflows/nextjs.yml

## Performance / Core Web Vitals on mobile 4G

**Summary:** The site ships ~5.1MB of images on initial mobile load (hero 1.41MB at 3030x4032, plus ~3MB of eager portfolio JPEGs that are display:none on mobile) with zero srcset/sizes, and the entire page is statically rendered with opacity-0, so first paint and LCP are blocked until the JS bundle downloads, hydrates, and a 100ms timer plus 700ms fade complete — realistically 6-10s LCP on 4G. A build-time sharp pipeline plus removing the opacity gate, preloading the hero, lazy-loading everything below the fold, and swapping the Maps iframe for a facade would cut initial weight to ~450-500KB (roughly 90%) and bring LCP to ~2s. The JS side is mostly fine (next/font Inter, tree-shaken lucide, 4KB portfolio.json), but the scroll-progress state re-renders the whole 1099-line tree on every scroll frame.

### [P0] Whole page statically rendered opacity-0 until hydration — blanks first paint and delays LCP by seconds

app/page.js:321 wraps the entire page in `transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`, and pageLoaded is set by a 100ms setTimeout after hydration (lines 73-76). Because pageLoaded=false at prerender time, the static HTML GitHub Pages serves has opacity-0 baked in: the browser paints nothing meaningful until the ~180KB JS bundle downloads and executes, React hydrates, the timer fires, and the 700ms fade runs. On 4G this pushes FCP/LCP from ~1.5s to 5-8s+ and makes the site a white screen for users with JS disabled or a failed chunk load. This single line likely dominates every other LCP problem.

**Fix:** Delete the pageLoaded state, its useEffect (lines 73-76), and the conditional classes on line 321 (keep just `min-h-screen bg-[#FAF7F5]`). If an entrance animation is wanted, apply a pure-CSS `@keyframes fadeIn` animation (starting from the painted state via `animation-fill-mode: backwards`) to below-the-fold decorative elements only — never to the root wrapper or the hero/LCP element.

**Files:** app/page.js

### [P0] All images served as full-resolution originals (32MB portfolio, 1.4MB hero) with no srcset/sizes — build a sharp pipeline

Measured: hero-image.jpeg is 3030x4032 / 1.41MB but displayed at max ~600px tall (h-96 on mobile ≈ 384px); portfolio/1.jpeg 3030x4032 1.41MB, 5.jpeg 2268x4032 1.61MB, 10.jpeg 1200x2133 1.27MB, 30.jpeg 1200x2133 1.21MB; about-bhuvita.jpeg 852x1400 464KB. 39 portfolio JPEGs total 32MB. Every <img> in page.js is a bare src with no srcset, sizes, width, or height (lines 399, 454, 529-534, 568-573, 952-957, 1064-1068). next/image is unusable at runtime (unoptimized static export), so a mobile bride on 4G downloads 3030px images for a 400px slot — each swipe in the gallery costs ~0.8-1.6MB, and browsing the full 'All' category approaches 32MB.

**Fix:** Add sharp as a devDependency and create scripts/optimize-images.mjs: read public/portfolio/*.jpeg + hero-image.jpeg + about-bhuvita.jpeg, and for each emit public/img/{basename}-{w}.webp at widths [480, 800, 1200] (hero also 1600) with sharp().resize({width: w, withoutEnlargement: true}).webp({quality: 72, effort: 5}), plus a {basename}-{w}.jpg fallback via .jpeg({quality: 70, mozjpeg: true}) at the 800 width only. Wire it as "prebuild": "node scripts/optimize-images.mjs" in package.json (runs in the GitHub Action before next build; sharp installs fine on ubuntu-latest), or run once locally and commit public/img/. Move the 32MB originals out of public/ (e.g. to assets-src/) so they are not deployed. In page.js add a helper: const imgSrcSet = (name) => [480,800,1200].map(w => `${getImagePath(`/img/${name}-${w}.webp`)} ${w}w`).join(', ') and use <img src={800.jpg fallback} srcSet={imgSrcSet(name)} sizes="(max-width: 767px) 92vw, 30vw" width={800} height={1067}> for gallery images; hero gets sizes="(max-width: 767px) 92vw, 45vw". Expected sizes at quality 72 webp: 480w ≈ 35-55KB, 800w ≈ 70-110KB, 1200w ≈ 130-190KB. Before: ~5.1MB initial mobile payload (hero 1.41MB + about 0.46MB + eager gallery ~2.96MB + ~250KB JS/CSS/fonts), ~11.5MB after scrolling the page. After: ~450-500KB initial, ~1.2-1.8MB fully browsed — a ~90% cut; image LCP candidate drops from 1.41MB to ~50KB.

**Files:** public/hero-image.jpeg, public/portfolio/, public/about-bhuvita.jpeg, app/page.js, package.json

### [P0] Hidden desktop gallery eagerly downloads ~3MB on mobile; first-3-eager heuristic is wrong (portfolio is below the fold)

The desktop gallery (page.js:520, `hidden md:block`) renders 3 <img> tags with loading="eager" for imageIndex < 3 (line 532). display:none does NOT prevent fetching for eager images, so mobile users download portfolio/1.jpeg (1.41MB), 2.jpeg (392KB), and 3.jpeg (1.22MB) — ~2.96MB — for a gallery they can never see, competing with the hero for 4G bandwidth during initial load. The eager choice is also wrong on desktop: the portfolio section is well below the fold, so eager-loading it steals priority from the actual LCP. The mobile gallery (line 571) has the same `currentImage === 0 ? "eager"` issue.

**Fix:** Set loading="lazy" and decoding="async" on ALL portfolio gallery images (desktop line 532 and mobile line 571) — lazy images inside display:none subtrees are not fetched by Chrome/Firefox, which also fixes the hidden-gallery download. The only eager/high-priority image on the page should be the hero. Optionally, to warm the next swipe on mobile, preload currentImage+1 via `new Image().src = filteredImages[currentImage+1]?.url` in an effect.

**Files:** app/page.js

### [P1] Hero LCP image has no preload, no fetchpriority, no dimensions

page.js:399 renders the hero as a plain <img> with no fetchPriority, width/height, or preload hint. After the opacity gate is removed, this image is the LCP element on desktop and shares LCP with the H2 on mobile. It currently sits at default priority behind CSS/JS/fonts, and about-bhuvita.jpeg (line 454, no loading attribute = eager) plus the eager gallery images compete with it.

**Fix:** Once the sharp pipeline exists: (1) add fetchPriority="high" and explicit width/height to the hero <img> in page.js; (2) in app/layout.js <head>, add <link rel="preload" as="image" imageSrcSet="{prefix}/img/hero-480.webp 480w, {prefix}/img/hero-800.webp 800w, {prefix}/img/hero-1200.webp 1200w" imageSizes="(max-width: 767px) 92vw, 45vw" fetchPriority="high"> (hardcode the /makeovers-by-bhuvita prefix using the same isProd check already in layout.js); (3) add loading="lazy" to about-bhuvita.jpeg (line 454) — the About section is below the fold.

**Files:** app/page.js, app/layout.js

### [P1] Instagram teaser loads 6.2MB of full-size images into ~110px thumbnails

page.js:944-957 renders portfolio images 5, 11, 17, 24, 30, 36 (measured total 6.23MB: 1.61+1.25+0.63+0.74+1.21+0.80MB) into an aspect-square grid whose cells are ~110px wide on a 375px phone (grid-cols-3) and ~180px on desktop (sm:grid-cols-6). They are loading="lazy" so they don't hit initial load, but any user who scrolls to the footer pulls 6.2MB — the single largest below-fold cost on the page.

**Fix:** Have the sharp script also emit a 320px square-cropped thumb per teaser image: sharp(src).resize(320, 320, {fit: 'cover'}).webp({quality: 70}) → public/img/thumbs/{n}-320.webp (~10-18KB each). Point the teaser <img> tags at the thumbs with width={320} height={320}. Reduces this section from 6.23MB to ~80KB (98.7%).

**Files:** app/page.js

### [P1] Google Maps iframe costs ~1-1.5MB of third-party JS/tiles — replace with a static facade

page.js:915-921 embeds maps.google.com/maps?...output=embed. loading="lazy" is correctly set, but once the contact section scrolls into view the embed pulls ~1-1.5MB of Google Maps JS, tiles, and fonts and spins up a heavyweight iframe — significant main-thread and data cost on a low-end phone, for a map the user will almost always just tap to open the Maps app (a link to maps.google.com already exists at line 903).

**Fix:** Replace the iframe with a click-to-load facade: render a static map-style placeholder (a small local image or a styled div with a MapPin icon and 'Sector 37A, Chandigarh — tap to open map') that on click either (a) sets a showMap state that mounts the current iframe, or (b) simply links to the existing https://www.google.com/maps/search/... URL (simplest, zero third-party cost). Option (b) is recommended for this audience since the conversion action is WhatsApp, not the embedded map.

**Files:** app/page.js

### [P1] scrollProgress state re-renders the entire 1099-line component on every scroll event

The scroll handler (page.js:79-88) calls setScrollProgress with a new float on every scroll event, forcing React to re-render and reconcile the whole page tree (all sections, 39-image maps, testimonial carousel) continuously while scrolling. On a mid-range Android this causes dropped frames and high INP during the most common interaction on the page. setScrolled/setShowBackToTop are booleans that rarely flip, so they are cheap; scrollProgress is the problem.

**Fix:** Extract the progress bar into its own tiny component (e.g. function ScrollProgressBar() with its own useEffect scroll listener) so only that component re-renders — or better, keep zero React state: hold a ref to the bar div and in a requestAnimationFrame-throttled scroll handler set barRef.current.style.width directly. Also remove `transition-all duration-150` from the bar (line 324) since it fights the per-frame width updates.

**Files:** app/page.js

### [P1] Dancing Script font loaded via render-blocking CSS @import chain

globals.css:8 uses @import url('https://fonts.googleapis.com/css2?family=Dancing+Script...'). This creates a serial render-blocking chain on 4G: download compiled CSS → discover @import → DNS+TLS+fetch fonts.googleapis.com CSS → fetch font from fonts.gstatic.com — typically +600-1200ms before the brand heading renders. It is also the only external-origin request besides the map (Inter is correctly self-hosted via next/font). Additionally globals.css:3-5 keeps legacy @tailwind base/components/utilities directives alongside Tailwind v4's @import "tailwindcss" — redundant.

**Fix:** In app/layout.js: import { Dancing_Script } from 'next/font/google'; const dancing = Dancing_Script({ subsets: ['latin'], weight: ['400','700'], display: 'swap', variable: '--font-dancing' }); add dancing.variable to the body className. In globals.css delete line 8 and the @tailwind directives (lines 3-5), and change .font-script to font-family: var(--font-dancing), cursive. This self-hosts the font on the same origin with automatic preload.

**Files:** app/globals.css, app/layout.js

### [P1] 1.41MB hero image downloaded twice under two URLs (hero-image.jpeg and portfolio/1.jpeg are byte-identical)

public/hero-image.jpeg and public/portfolio/1.jpeg are both 1,410,151 bytes (identical file). The hero loads /hero-image.jpeg while the portfolio gallery loads /portfolio/1.jpeg — the browser cannot dedupe different URLs, so the same 1.41MB is fetched twice (currently both eagerly, per findings above).

**Fix:** The sharp pipeline naturally fixes the weight, but also dedupe the source: either point portfolio.json entry id:1 at the hero asset name so both use the same generated /img/hero-*.webp files, or drop image 1 from portfolio.json since it already headlines the page.

**Files:** public/hero-image.jpeg, public/portfolio/1.jpeg, public/portfolio/portfolio.json

### [P2] Infinite repaint animations (shimmer, box-shadow pulse) and no prefers-reduced-motion support

animate-shimmer (globals.css:68-77, used on the hero accent at page.js:402) animates background-position and animate-pulse-slow (lines 32-39, WhatsApp FAB) animates box-shadow — neither is compositor-friendly, so both trigger continuous repaints for the life of the page on battery-constrained phones. The two blur-3xl decorative blobs (page.js:373-374, 658) also cost GPU memory on low-end devices. No @media (prefers-reduced-motion) exists anywhere.

**Fix:** In globals.css add `@media (prefers-reduced-motion: reduce) { .animate-shimmer, .animate-pulse-slow, .animate-float, .animate-count-bounce { animation: none; } html { scroll-behavior: auto; } }`. Convert pulse-slow to a compositable transform/opacity pulse on a ::after pseudo-element (animate `transform: scale()` + `opacity` instead of box-shadow spread). Consider removing animate-shimmer entirely — it is behind the hero card at opacity-30 and barely visible.

**Files:** app/globals.css, app/page.js

### [P2] OG/social preview image is the raw 1.41MB portrait hero declared as 1200x630

layout.js:36-43 declares hero-image.jpeg as a 1200x630 og:image, but the file is 3030x4032 portrait and 1.41MB. WhatsApp — the primary sharing channel for this audience — is slow to fetch large preview images and may skip previews over ~600KB, and the portrait crop will render poorly in link cards. Every share of the site to a bride's family group is a conversion opportunity riding on this preview.

**Fix:** Add an og-image step to the sharp script: sharp('assets-src/hero-image.jpeg').resize(1200, 630, {fit: 'cover', position: 'attention'}).jpeg({quality: 78, mozjpeg: true}) → public/og-image.jpg (~80-120KB), and point openGraph.images and twitter.images in layout.js at ${siteUrl}/og-image.jpg.

**Files:** app/layout.js

### [P2] Housekeeping: broken `next export` script and missing image decode hints

package.json's "export" script runs `next export`, which was removed in Next 13.4+ / errors on Next 15 (output:'export' in next.config.mjs already handles it) — a trap for whoever deploys manually. Separately, no <img> on the page has decoding="async", and the lightbox (page.js:1064) shows the full original with no smaller variant.

**Fix:** Delete the "export" script from package.json. Add decoding="async" to all <img> elements. Point the lightbox img at the 1200w variant from the sharp pipeline (srcSet with 800w/1200w, sizes="100vw") instead of the original.

**Files:** package.json, app/page.js

## Conversion rate optimization (WhatsApp inquiry funnel, mobile-first)

**Summary:** The funnel mechanics are genuinely good — sticky mobile WhatsApp bar, per-package prefilled CTAs, FAQ, map, and a clear single conversion action — but the site's trust layer is its biggest conversion liability: six fabricated testimonials, an invented 4.9★ rating and '50+ destination weddings' stat, and unverified Dubai/Goa capability and refund-policy claims sit alongside the true 200+ brides / UV Ghai credentials and will collapse credibility for any bride who cross-checks Instagram. Fixing honesty (P0s), sharpening the generic hero headline around the verified 'subtle, skin-like' differentiator, and adding lead-qualifying WhatsApp prefills are the highest-leverage changes; pricing clarity (studio vs on-venue), money-objection FAQs, and image weight round out the list.

### [P0] Six fabricated testimonials with fake names are live and auto-rotating

app/page.js lines 143-186 ship six placeholder reviews (Priya Sharma, Ananya Patel, Kavya Reddy, Meera Kapoor, Simran Kaur, Ritu Agarwal) with invented dates and a fabricated 'Destination Wedding - January 2024 ... traveled to Udaipur' story. The code comment at line 140 already admits they are placeholders. Brides in this market cross-check Instagram; a single bride noticing these names never appear in tagged posts destroys trust in every other claim on the page, and fake reviews violate consumer-protection norms. This is the #1 credibility risk on the site.

**Fix:** Delete the current testimonials array. Interim replacement (before real reviews are collected): convert the section into a 'Real Brides, Real Reviews' block with copy — heading: 'Hear It From Real Brides'; body: 'Every look on this page is a real bride. See their tagged photos, stories and comments on Instagram — 5,000+ brides and followers can't be wrong.'; CTA button: 'See Real Bride Reviews on Instagram' linking to https://www.instagram.com/makeoversbybhuvita. Permanent fix: ask Bhuvita to collect 4-6 real WhatsApp/Google reviews (with first name + event month + permission), display them as screenshots or quoted text with 'via WhatsApp' / 'via Google' source labels, and only then re-add aggregateRating to layout.js JSON-LD.

**Files:** app/page.js

### [P0] Unverified '50+ Destination Weddings' and '4.9★ Average Rating' stats in the social-proof bar

app/page.js lines 243-248 (stats array) and line 93 (animated counter targets [200, 5, 50, 4.9]) display '50+ Destination Weddings' and '4.9★ Average Rating' — both flagged UNVERIFIED. A 4.9 rating with zero visible reviews anywhere (no Google Business link, no review sources) is easily falsifiable and sits directly under the hero, poisoning the two claims that ARE true (200+ brides, 5+ years).

**Fix:** Replace the stats array with four verified items: [{ number: '200+', label: 'Happy Brides' }, { number: '5+', label: 'Years Experience' }, { number: '5,000+', label: 'Instagram Community' }, { number: '2', label: 'Ways to Book: Studio & On-Venue' }] — or drop to 3 stats plus a 'UV Ghai Certified' badge tile. Update the counter targets at line 93 to [200, 5, 5000] and delete the index===3 decimal-star branch at lines 101 and 425.

**Files:** app/page.js

### [P0] Invented capability and policy claims in FAQ, JSON-LD, and services (Dubai/Goa/Udaipur experience, International Booking, refund policy)

Three clusters of unverified copy stated as fact: (1) page.js line 270 and layout.js line 135 FAQ claim 'We have experience with weddings in Goa, Udaipur, Jaipur, Dubai, and more' — unverified, and it is also embedded in FAQPage structured data Google can surface; (2) the 'International Booking / Overseas Weddings' service card (page.js lines 235-239) claims a capability with no evidence; (3) page.js line 272 publishes a cancellation policy ('full refund minus the booking amount' at 30+ days) and line 273 promises a 'personalized touch-up kit' — if Bhuvita never agreed to these, the site is creating contractual expectations she must honor.

**Fix:** FAQ line 270 → 'Yes — we take on-venue and outstation bookings across India. Travel and stay are charged separately; share your city and dates on WhatsApp for a quote.' (mirror the same text in layout.js faqJsonLd line 135). Remove the 'International Booking' card or relabel it 'Custom / Outstation Enquiry — Price on Request' with honest features ('Tell us your city and functions', 'Travel & stay extra'). Replace the cancellation FAQ answer with 'Cancellation and rescheduling terms are shared at the time of booking — message us on WhatsApp and we'll walk you through them.' until Bhuvita confirms a real policy. Confirm the touch-up kit is actually provided before keeping line 273.

**Files:** app/page.js, app/layout.js

### [P1] Hero headline is generic and buries the differentiator; CTA doesn't signal it opens WhatsApp

Line 380: 'Making Your Dream Day Beautiful' could be any vendor in any city — it names no service, no location, no differentiator. The brand's actual moat (subtle, skin-like makeup) is relegated to the subhead. The primary CTA 'Book Consultation' (line 386-391) opens WhatsApp with no warning and no WhatsApp icon; brides on mobile hesitate on CTAs whose destination is unclear, and 'Book' implies commitment when the real action is a free chat.

**Fix:** Replace the h2 with one of: (a) 'Subtle, Skin-Like Bridal Makeup in Chandigarh' (safest, SEO-aligned); (b) 'Look Like Yourself — Only Radiant' with sub-line 'Bridal makeup that enhances, never masks. Chandigarh · Mohali · Panchkula'; (c) 'The Bride Everyone Remembers. Makeup Nobody Notices.' Keep the existing subhead but shorten to: 'UV Ghai–certified artist. 200+ brides in 5+ years. Studio in Sector 37A or at your venue across the Tricity.' Change the CTA label to 'Chat on WhatsApp — Free Consultation' and add the WhatsApp/MessageCircle icon inside the button so the destination is obvious.

**Files:** app/page.js

### [P1] WhatsApp prefill messages don't qualify the lead — every inquiry starts a 5-message back-and-forth

All prefills (hero line 386, about line 478, contact line 885, sticky bar line 1018, service cards lines 194-238) say only 'I am interested in X'. Bhuvita's first reply must always ask date, city, and functions — friction that loses warm leads, and gives her no way to prioritize serious brides. The service-card prefills also omit the price the bride just saw, losing anchoring context.

**Fix:** Restructure prefills to capture qualification in the first message. Hero/sticky/contact: 'Hi Bhuvita! I'm looking for bridal makeup. My date: ___ | City/venue: ___ | Functions needed: ___'. Service cards: template `Hi Bhuvita, I'd like a quote for ${service.title} (${service.price}). My event date is ___ and location is ___`. Brides fill blanks before sending or send as-is — either way Bhuvita gets package + intent context. Encode via encodeURIComponent as the card CTAs already do.

**Files:** app/page.js

### [P1] 'Best Bridal Makeup Artist' superlative in title/OG metadata is an unverifiable claim

layout.js lines 10, 19, 30 use 'Best Bridal Makeup Artist in Chandigarh...'. With zero published reviews this is puffery that clashes with the honesty repositioning, and it is the first text a bride sees in the WhatsApp/Google link preview when the site is shared.

**Fix:** Title → 'Makeovers by Bhuvita | Bridal Makeup Artist in Chandigarh, Mohali & Panchkula — Subtle, Skin-Like Makeup'. OG title → 'Bridal Makeup Artist in Chandigarh Tricity | Subtle, Skin-Like Looks'. Keep '200+ happy brides' in descriptions (verified) and remove 'Best'. Also remove the 'best bridal makeup Chandigarh' phrasing risk by leaving the keywords array as-is (keywords meta is ignored by Google, harmless) but never rendering 'Best' in visible/preview text.

**Files:** app/layout.js

### [P1] Pricing section terminology is confused: 'On Studio(Chandigarh) Services' heading vs 'on-venue' data vs hero's 'studio + on-venue' promise

Line 682 heading reads 'On Studio(Chandigarh) Services' (typo, missing space, unclear meaning) while the data key is services.onVenue and card prefills say 'on-studio'. The About section promises 'studio in Sector 37A AND on-venue across Chandigarh, Mohali & Panchkula'. A bride cannot tell whether ₹25,000 covers the artist coming to her venue in Mohali — the single most common pricing question — so she either bounces or asks, adding friction.

**Fix:** Rename the heading to 'Studio & On-Venue Services (Chandigarh Tricity)' and add one line under it: 'Prices below cover both studio (Sector 37A) and on-venue bookings within Chandigarh, Mohali & Panchkula.' (confirm with Bhuvita whether on-venue carries a surcharge; if it does, state it: '+ ₹X for on-venue'). Align card prefill texts to say 'bridal makeup (studio/on-venue)'. Rename 'Outstation Services' subtitle to 'Outside Tricity — travel & stay extra'.

**Files:** app/page.js

### [P1] Hero image is 1.3MB and portfolio JPEGs total 32MB — first impression stalls on 4G before the CTA renders

The hero <img> (page.js line 399) loads a 1.3MB JPEG; portfolio images are up to 3030x4032 originals served raw. On mediocre 4G the visual proof (the product IS the photos) arrives seconds late, and slow LCP directly suppresses mobile conversion. Static export blocks runtime next/image, but sharp is available at build time. (Overlaps the performance dimension — listed here because the hero photo is the conversion asset.)

**Fix:** Add a build-time sharp script (e.g. scripts/optimize-images.mjs run in the prebuild step of .github/workflows/nextjs.yml) that emits ~1200px-wide, quality-72 WebP/JPEG variants of hero-image and all portfolio files into public/, and point src at the resized versions (or add srcset with 480/800/1200w variants). Target: hero under 150KB, portfolio images under 200KB each.

**Files:** public/hero-image.jpeg, public/portfolio, app/page.js

### [P2] Contact section offers no way to call, and sets no response expectation

In the contact card (page.js lines 883-911) the phone number is wrapped in a WhatsApp link with a chat icon — a bride (or her mother, a frequent decision-maker in this market) who wants to CALL has to hunt for the tiny footer tel: link. There is also no reply-time reassurance, so messaging feels like shouting into a void.

**Fix:** Add a fourth item to the contact grid: <a href='tel:+917888808231'> with a Phone icon and label 'Call: +91 78888 08231'. Under the grid add a single reassurance line (verify wording with Bhuvita): 'WhatsApp is fastest — replies usually within a few hours, 10am–8pm.'

**Files:** app/page.js

### [P2] FAQ misses the three questions brides actually ask before messaging: booking amount, trial price, on-venue travel within Tricity

The 8 FAQs (page.js lines 265-274) cover logistics but skip money-objection handlers. The trial FAQ even says 'Trial charges are separate' without a number, which reads as evasive. Unanswered price-mechanics questions are the top reason brides silently bounce instead of messaging.

**Fix:** After confirming numbers with Bhuvita, add three FAQs: (1) 'How do I confirm my date?' → 'A booking amount of ₹___ reserves your date; the balance is due on the event day.'; (2) 'How much does a trial cost?' → 'Trials are ₹___ at the Sector 37A studio, adjustable against your package if you book.' (only if true); (3) 'Do you charge extra to come to my venue in Mohali/Panchkula?' → honest answer. Mirror any added FAQs into faqJsonLd in layout.js. If Bhuvita won't fix numbers, use 'message us on WhatsApp for the current trial price' — still better than 'charges are separate'.

**Files:** app/page.js, app/layout.js

### [P2] Service-card CTAs say 'Book Now' — higher perceived commitment than the actual action (a WhatsApp chat)

Cards at lines 700-707 and 732-739 use 'Book Now'/'Inquire Now'. 'Book Now' next to a ₹60,000 price implies a purchase commitment and deters comparison-shopping brides, when clicking merely opens a chat. Also the 'Popular' badge (line 686) sits on the cheapest full-bridal card — fine for anchoring entry, but the ₹60,000 all-functions package is where 'Popular'/'Best Value' framing would lift average order value.

**Fix:** Change all card CTAs to 'Get Quote on WhatsApp' (one consistent label). Move the badge to the Bridal Package card with label 'Best Value — All Functions', and add a one-line strike-anchor under its price if truthful: 'vs ₹70,000+ booked separately'. Keep 'Popular' on Bridal Makeup only if it genuinely is the most-booked service.

**Files:** app/page.js

### [P2] Trust-badge product brands contradict the FAQ brand list, and 'On-Time Guarantee' is an unverified promise

Trust badge (line 253) lists 'MAC, Bobbi Brown, Charlotte Tilbury, Huda Beauty & NARS' while the FAQ (line 268) and layout.js FAQ JSON-LD (line 134) list only four brands (no NARS). Small, but a detail-checking bride notices, and this page's whole strategy is now honesty. 'On-Time Guarantee' (line 255) is a guarantee with no stated remedy — either it means something or it's noise.

**Fix:** Pick the true brand list with Bhuvita and use it identically in the badge, the FAQ answer, and faqJsonLd. Replace 'On-Time Guarantee' with the verifiable 'Punctual, On-Time Service' — or, if she'll stand behind it, define it: 'On-time or your trial is free' (only with her sign-off).

**Files:** app/page.js

## Accessibility (WCAG 2.1 AA) + Mobile UX

**Summary:** The site fails WCAG 2.1 AA on its most basic requirements: roughly fifteen icon-only controls (menu, every carousel arrow, dots, lightbox, footer and WhatsApp CTAs) have no accessible name, the lightbox is unreachable and untrappable for keyboard users, and computed contrast shows the primary WhatsApp conversion CTA at 1.98:1 and all gold section labels at ~2.2:1. Secondary but significant gaps include missing aria-expanded on FAQs, zero prefers-reduced-motion handling with an unpausable auto-rotating carousel, 8px touch targets on testimonial dots, and wrong alt text on the Instagram teaser grid. All fixes are localized to app/page.js and app/globals.css and implementable without any server-side capability.

### [P0] ~15 icon-only controls have no accessible name (menu, all carousel arrows, dots, lightbox controls, footer/WhatsApp icons)

Screen-reader users hear 'button' with no name for: mobile menu toggle (page.js:346), desktop portfolio arrows (545, 553), mobile portfolio arrows (580, 588), testimonial arrows (800, 806), testimonial dot buttons (816), lightbox close/prev/next (1045, 1054, 1077), back-to-top (1088, has title= only, which is unreliable), footer Instagram/WhatsApp/Phone circular links (993, 996, 999), desktop floating WhatsApp link (1028, title= only). All contain only lucide/SVG icons. This is a WCAG 4.1.2 failure on nearly every interactive control on the page, including conversion-critical WhatsApp links.

**Fix:** Add aria-label to each: menu button aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} plus aria-expanded={isMenuOpen} and aria-controls on the menu div; carousel arrows aria-label="Previous photo"/"Next photo"; testimonial arrows aria-label="Previous testimonial"/"Next testimonial"; dots aria-label={`Go to testimonial ${index+1}`} and aria-current={currentTestimonial===index}; lightbox aria-label="Close image viewer"/"Previous image"/"Next image"; back-to-top aria-label="Back to top"; footer links aria-label="Instagram"/"WhatsApp"/"Call +91 78888 08231"; floating WhatsApp aria-label="Chat on WhatsApp". Add aria-hidden="true" (lucide accepts it as a prop) to every icon that sits next to visible text so it is not double-announced.

**Files:** app/page.js

### [P0] Lightbox is not a modal: no focus trap, no role, background scrollable, and keyboard users cannot even open it

The lightbox (page.js:1039-1085) is a plain div — no role="dialog", no aria-modal, focus never moves into it on open or back to the trigger on close, Tab reaches the page behind it, and body scroll is not locked (on mobile the page scrolls behind the overlay). Worse, the gallery items that open it are plain divs with onClick (desktop page.js:527, mobile 567) — not focusable, no role, no Enter/Space handler — so keyboard and switch users can never open the lightbox at all, and the existing Escape/arrow-key support (128-138) is unreachable to them.

**Fix:** 1) Change the two gallery click targets from <div onClick> to <button type="button" className="block w-full text-left" onClick={...} aria-label={`View ${filteredImages[i].description} full size`}> (or add role="button", tabIndex={0}, onKeyDown Enter/Space). 2) On the lightbox container add role="dialog" aria-modal="true" aria-label="Portfolio image viewer". 3) In the existing lightbox useEffect: save document.activeElement on open, call closeButtonRef.current?.focus() (add a ref to the close button), set document.body.style.overflow='hidden', and on cleanup restore overflow and refocus the saved element. 4) Extend the keydown handler to trap Tab: query the dialog's focusable elements and wrap focus at the ends.

**Files:** app/page.js

### [P0] Contrast failures: #D4A574 section labels (2.2:1), white-on-#25D366 WhatsApp CTA (2.0:1), footer white/50 & white/40, #8B6F47 on #F5E6D3 buttons

Computed WCAG ratios: #D4A574 eyebrow labels ('01 / Portfolio' etc., page.js:464, 494, 616, 662, 760, 835, 875) = 2.23:1 on white / 2.09:1 on #FAF7F5 — fails AA 4.5:1 badly at text-sm. White on #25D366 (mobile sticky WhatsApp bar page.js:1016 and desktop float 1028) = 1.98:1 — the PRIMARY conversion CTA is the least readable element on the page. Footer white/50 phone (1003) = 3.71:1 and white/40 copyright (1009) = 2.92:1 fail. 'Book Now' #8B6F47 on #F5E6D3 (704, 736) = 3.84:1 fails for its ~16px text. #8B6F47 on #FAF7F5 (inactive category tabs, 508; about chips, 473) = 4.41:1, just under 4.5. Passing for reference: #8B6F47 on white 4.71, white/80 and white/70 on #5C4033, #D4A574 stat numbers on #5C4033 4.22 (large text, needs 3:1).

**Fix:** Darken the eyebrow labels to #8B6F47 (4.7:1) or #A0784A-on-white equivalents — e.g. replace text-[#D4A574] with text-[#8B6F47] on those seven labels (keep #D4A574 only on the dark #5C4033 band, where it passes). Change WhatsApp CTA background from #25D366 to WhatsApp dark teal #075E54 (white text ≈ 7:1) or at minimum #128C7E with text-lg font-bold; apply to bar, floating button, and the pulse keyframe color in globals.css. Footer: bump text-white/50 and text-white/40 to text-white/70 (5.6:1). 'Book Now' cards: swap to solid bg-[#8B6F47] text-white (4.7:1) or darken text to #6B5637 on #F5E6D3. Inactive category tabs: use text-[#6B5637] (~6:1 on #FAF7F5).

**Files:** app/page.js, app/globals.css

### [P1] FAQ accordion buttons missing aria-expanded/aria-controls; collapsed answers stay in the accessibility tree

FAQ toggle buttons (page.js:843-849) expose no expanded state (WCAG 4.1.2), and the answer panels (850-852) are collapsed only visually via max-h-0/opacity-0 — screen readers still read every 'hidden' answer, so the visual and SR experiences diverge.

**Fix:** On each FAQ button add aria-expanded={activeFaq === index} and aria-controls={`faq-answer-${index}`}; on the answer div add id={`faq-answer-${index}`}, role="region", and aria-hidden={activeFaq !== index} (or toggle the `inert` attribute) so collapsed answers are removed from the accessibility tree while the height animation still works. Also wrap each question <span> in an <h3> for landmark navigation.

**Files:** app/page.js

### [P1] No prefers-reduced-motion support anywhere; testimonial carousel auto-rotates with no accessible pause (WCAG 2.2.2, 2.3.3)

globals.css defines 7 infinite/entrance animations (shimmer, float, pulse-slow, fadeIn, slideUp, countBounce) plus html{scroll-behavior:smooth}, and page.js runs JS-driven stat counters and a 5s auto-rotating testimonial carousel — none respect prefers-reduced-motion. The carousel's only pause mechanism is mouse hover (page.js:768-771); keyboard users have no way to pause it, and moving content that changes every 5s while a SR is reading violates 2.2.2. (Side note: onTouchStart sets isTestimonialHovered true and never resets it, so on mobile one touch permanently kills auto-rotation — inconsistent behavior.)

**Fix:** In globals.css add: @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } html { scroll-behavior: auto; } }. In page.js gate the auto-rotate interval and the stats rAF loop behind a matchMedia('(prefers-reduced-motion: reduce)') check (skip animation, set final values directly). Additionally pause auto-rotation on focus-within: add onFocus={() => setIsTestimonialHovered(true)} onBlur={() => setIsTestimonialHovered(false)} to the carousel wrapper, or add a visible pause button.

**Files:** app/globals.css, app/page.js

### [P1] Carousel state changes are silent to screen readers; all 6 testimonial slides are always exposed

Portfolio carousel: pressing next/prev updates the image and the '1 / 39' counter (page.js:602-608) with no announcement. Testimonial carousel renders all six slides in a translateX strip (774-796); off-screen slides remain fully readable by AT, so SR users hear six testimonials with no indication of which is 'current', and auto-rotation shifts content mid-read.

**Fix:** Portfolio: add aria-live="polite" to the counter div at 603 and aria-roledescription="carousel" aria-label="Portfolio gallery" to the carousel container; give the mobile slide an aria-label like `${description}, photo ${currentImage+1} of ${filteredImages.length}`. Testimonials: on the strip container add aria-live="polite" (it flips to off while auto-rotating if you prefer); on each slide add role="group" aria-roledescription="slide" aria-label={`Testimonial ${i+1} of ${testimonials.length}`} and aria-hidden={i !== currentTestimonial} so only the visible slide is exposed.

**Files:** app/page.js

### [P1] Touch targets below minimum: 8px testimonial dots, 24px menu button

Testimonial dot buttons are w-2 h-2 = 8x8px (page.js:819) — far under the 24px WCAG 2.5.8 minimum and Apple/Android 44-48px guidance; on a phone they are nearly impossible to tap. The mobile menu button (346) is just a 24px icon with no padding. Mobile carousel arrows (p-2 + 24px icon = 40px) are marginal.

**Fix:** Dots: wrap the visual dot in a larger hit area — className="p-2.5 -m-1 flex items-center justify-center" on the button with an inner <span className={`block h-2 rounded-full ...`} /> carrying the current w-2/w-8 styling (44px effective target, same look). Menu button: add p-2 -m-2. Mobile arrows: change p-2 to p-3.

**Files:** app/page.js

### [P1] Non-descriptive / wrong alt text: Instagram teaser alt="Instagram" x6, hero alt="Bridal Makeup"

The six Instagram teaser images (page.js:954) all have alt="Instagram", so SR users hear 'Instagram, link, Instagram' six times; the images are the sole content of their links, so the links' accessible names are wrong. Hero image alt="Bridal Makeup" (399) is generic for the page's most important image. Portfolio alts from portfolio.json ('Traditional Bridal Look', etc.) are acceptable but several duplicate exactly.

**Fix:** Instagram teaser: set alt="" on the images and aria-label="See more of our work on Instagram @makeoversbybhuvita" on each <a>. Hero: alt="Bride with subtle, skin-like bridal makeup by Makeovers by Bhuvita, Chandigarh". Optionally differentiate duplicate descriptions in portfolio.json (they double as visible captions and lightbox alt).

**Files:** app/page.js, public/portfolio/portfolio.json

### [P2] Body scroll and viewport issues in lightbox on mobile; no swipe support in lightbox

Beyond the focus problems (covered in P0), mobile-specific lightbox UX: the page behind the overlay still scrolls (rubber-banding moves the gallery underneath), 85vh sizing can be mis-measured under mobile URL bars, and there is no touch-swipe navigation even though both page carousels support it — mobile users must hit small edge buttons.

**Fix:** Add the body overflow lock from the P0 lightbox fix; use max-h-[85dvh] instead of 85vh; reuse the existing touchStartX pattern by attaching handlePortfolioTouchStart-style onTouchStart/onTouchEnd handlers to the lightbox container that call setLightboxImage(±1).

**Files:** app/page.js

### [P2] No skip link and no visible branded focus styles

Keyboard users must tab through the entire nav on every page load (no 'skip to content'), and all controls rely on default browser focus rings, which are hard to see against the cream/gold palette on some elements (e.g., white arrows on white cards).

**Fix:** Add as first child of the page div: <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:bg-white focus:px-4 focus:py-2 focus:rounded">Skip to content</a>. In globals.css add a global focus style: :focus-visible { outline: 3px solid #8B6F47; outline-offset: 2px; }.

**Files:** app/page.js, app/globals.css

### [P2] Star ratings conveyed only by icons; gradient headings dip below large-text contrast

Testimonial ratings render five Star icons (page.js:781-783) with no text alternative. The .text-gradient-gold headings pass through #D4A574 mid-gradient (2.23:1 on white) — even at large-text threshold (3:1) the lightest glyph regions fail; on text-4xl bold it is borderline in practice.

**Fix:** Wrap the stars container with role="img" aria-label={`Rated ${testimonial.rating} out of 5 stars`} and aria-hidden="true" on the icons. Tighten the gradient in globals.css to stay dark, e.g. linear-gradient(135deg, #8B6F47 0%, #A98B5F 50%, #8B6F47 100%) (≈3.5:1 at midpoint).

**Files:** app/page.js, app/globals.css

### [P2] Mobile menu can clip its last link; minor heading-structure cleanups

The open mobile menu uses max-h-64 (256px) but its content is ~260px (6 links x 40px + 20px padding, page.js:356-367), so 'Contact' can be partially cut off. Heading structure is mostly sound (single h1 at 332, h2 per section), but service cards use h3 (689, 721) at the same level as their group headings 'On Studio Services'/'Outstation Services' (682, 715), and FAQ questions are plain spans.

**Fix:** Change max-h-64 to max-h-80. Demote service card titles to h4 (or wrap groups differently), and make FAQ questions h3 elements containing the button text (covered in FAQ finding).

**Files:** app/page.js

### [P2] Google Fonts @import for Dancing Script breaks self-hosting intent and delays script text; iframe title already present (pass)

globals.css:8 pulls Dancing Script from fonts.googleapis.com via CSS @import — render-blocking on mediocre 4G and a FOUT source for the brand wordmark, while Inter is properly self-hosted via next/font. Noted as mobile-UX adjacent. For completeness: the Google Maps iframe DOES have a title (page.js:916) — no action needed there.

**Fix:** Replace the @import with next/font/google: const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400','700'], variable: '--font-script' }) in layout.js, add the variable class to <body>, and change .font-script to font-family: var(--font-script), cursive.

**Files:** app/globals.css, app/layout.js

## Content accuracy & brand consistency

**Summary:** The hero and About sections are now honest and correctly anchored on the verified facts (UV Ghai certification, subtle skin-like makeup, Sector 37A studio, 200+ brides, 5+ years), but the rest of the site still carries fabricated material: six fake testimonials rendered live in a carousel, two unverified stats ("50+ Destination Weddings", "4.9 Average Rating") animated in the social-proof bar, invented destination/international experience (Goa/Udaipur/Jaipur/Dubai) repeated in the FAQ, a service card, and Google-facing JSON-LD, plus a made-up cancellation/refund policy. The SEO layer (title/description/OG/keywords/JSON-LD offers) also contradicts the "subtle makeup" positioning by leading with HD/Airbrush glam, and services/pricing copy is internally inconsistent ("On Studio(Chandigarh)" heading on a data key named onVenue, JSON-LD offers that don't match the on-page cards).

### [P0] Six fake placeholder testimonials render live in the Testimonials carousel

app/page.js lines 143-186 define six invented reviews (Priya Sharma, Ananya Patel, Kavya Reddy, Meera Kapoor, Simran Kaur, Ritu Agarwal) with fabricated events and 5-star ratings. The code comment at lines 140-142 acknowledges they are placeholders, but the section (lines 756-829) is fully rendered, auto-rotates every 5s, is linked from both nav menus and the footer ('Testimonials'), and one review ('Bhuvita traveled to Udaipur for my destination wedding') reinforces the separately-unverified destination-wedding claim. The dates (Nov 2023 - Mar 2024) also read as 2.5 years stale in July 2026. Fake reviews are the single biggest credibility/legal risk on the page — a bride who asks any of these 'clients' for a reference discovers the fabrication instantly.

**Fix:** Until real reviews exist: (1) delete the `testimonials` array, the entire `<section id="testimonials">` block (lines 756-829), the testimonial state/handlers (currentTestimonial, isTestimonialHovered, touchStartXTestimonial, handleTestimonialTouchStart/End, the auto-rotate useEffect at lines 311-318), and the 'Testimonials' links in desktop nav (line 341), mobile nav (line 365), and footer quick links (line 984). (2) In its place, add a small 'Real brides, real reviews' block that embeds 2-3 actual screenshots (WhatsApp thank-you messages or Instagram comments Bhuvita already has, exported as images into public/) with first-name-only attribution and permission, or simply a CTA: heading 'See real bridal transformations' with a button linking to https://www.instagram.com/makeoversbybhuvita. When genuine reviews are collected, restore the carousel with real names/events and re-add aggregateRating in layout.js as the existing comment instructs.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P0] Unverified stats '50+ Destination Weddings' and '4.9 Average Rating' shown in the social-proof bar

app/page.js lines 243-248 define the stats array; lines 93 and 100-101 animate targets [200, 5, 50, 4.9] with special-casing for the 4.9 decimal and a star glyph at render (lines 424-427). Per the verified facts, 200+ brides and 5+ years are TRUE, but '50+ Destination Weddings' and '4.9 Average Rating' are unverified — the rating especially so, since no real reviews have been collected anywhere (the layout.js comment at lines 90-92 already concedes this by omitting aggregateRating). Displaying a numeric rating with zero underlying reviews is the same class of fabrication as the fake testimonials.

**Fix:** Replace the last two stats with verified facts. In page.js: change `const stats` to [{ number: "200+", label: "Happy Brides" }, { number: "5+", label: "Years Experience" }, { number: "5,000+", label: "Instagram Community" }, { number: "2", label: "Ways to Book — Studio & On-Venue" }] (or make the 4th a non-numeric 'UV Ghai' / 'Certified Artist' tile). Update the counter targets at line 93 to [200, 5, 5000, 2], delete the index===3 decimal special case at line 101 and the `${animatedStats[3]}★` branch at line 425 (render `5,000+` with toLocaleString for index 2). If the 4th tile is non-numeric, render stat.number directly for that index instead of animating.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P0] Fabricated destination/international experience: 'weddings in Goa, Udaipur, Jaipur, Dubai' claimed in FAQ, service card, and Google-facing FAQ JSON-LD

Three places assert specific past destination/international experience that is unverified: (1) page.js line 270 FAQ answer: 'We have experience with weddings in Goa, Udaipur, Jaipur, Dubai, and more'; (2) layout.js line 135 repeats this verbatim inside FAQPage JSON-LD, i.e. it is asserted directly to Google as structured data; (3) page.js lines 235-239 'International Booking' service card promises 'Overseas Weddings', 'Visa & Travel Extra', 'Extended Stay Options', 'Luxury Service'. The JSON-LD business description (layout.js line 65) and the Destination Wedding offer description (line 117, 'across India and internationally') also assert international service. Only '50+ Destination Weddings' being unverified makes all of these fabrications until confirmed.

**Fix:** Make travel copy forward-looking (availability) instead of backward-looking (experience). page.js line 270 → a: "Yes — Bhuvita is available on-venue across Chandigarh, Mohali and Panchkula, and takes outstation and destination wedding bookings across India. Travel and accommodation are charged separately, and international enquiries are welcome on request." Mirror the same text in layout.js faqJsonLd line 135. Replace the 'International Booking' card (page.js 235-239) with a verified offering, e.g. title: "Engagement / Ring Ceremony", price: "₹15,000 onwards", features: ["Soft, skin-like glam", "Hair Styling", "Studio or On-Venue"], whatsapptext: "Hi Bhuvita, I am interested in engagement makeup" — or keep it but retitle 'International Enquiries' with a single honest feature list ('On request · travel & stay extra'). In layout.js line 117 change the offer description to 'Complete bridal makeup services for outstation and destination weddings across India' and in line 65 keep 'destination weddings' only if Bhuvita confirms she offers (not necessarily has done 50 of) them.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js, /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/layout.js

### [P0] Invented cancellation/refund policy commits the business to terms nobody agreed to

page.js line 272: 'Cancellations made 30+ days before the event receive a full refund minus the booking amount.' This is a concrete, publicly published refund commitment that appears to be placeholder copy — nothing in the verified facts confirms Bhuvita has this policy. A bride could reasonably hold her to it. Same risk class applies to the 'On-Time Guarantee' trust badge (line 255) — 'guarantee' is a promise word — and to the touch-up kit FAQ (line 273) promising 'a personalized touch-up kit with blotting papers, lipstick, and setting spray' in 'every bridal package'.

**Fix:** Until Bhuvita confirms exact terms, replace line 272's answer with: "Booking, rescheduling and cancellation terms are shared clearly at the time of booking, before any advance is paid. Message us on WhatsApp and we'll walk you through them — we always try to accommodate date changes where possible." Change the trust badge at line 255 from 'On-Time Guarantee' to 'Always On Time' or 'Punctual, Stress-Free Mornings' (descriptive, not a guarantee). For line 273, either confirm the kit contents with Bhuvita or soften to: "Bridal packages include touch-up support so you stay fresh through the celebrations — ask about the touch-up kit when booking."

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P1] SEO metadata leads with 'HD/Airbrush' glam, directly contradicting the verified 'subtle, skin-like makeup' positioning

The on-page hero/About correctly sell 'subtle, skin-like makeup', but the search-facing layer says the opposite: layout.js line 11 meta description headlines 'HD/Airbrush bridal makeup'; line 21 keyword 'HD airbrush bridal makeup Chandigarh'; line 31 OG description repeats 'HD/Airbrush makeup'; line 99 JSON-LD Bridal Makeup offer is described as 'HD/Airbrush bridal makeup'. In page.js, the first feature of the flagship Bridal Makeup card (line 193) is 'HD/Airbrush Makeup' and the portfolio filter category is named 'HD/Party Makeups' (line 116 and 12 entries in portfolio.json). A bride clicking from a 'subtle makeup' search sees glam-first copy; a bride who saw the subtle-focused IG bio sees an HD-first site. The differentiator gets buried on every surface except the hero.

**Fix:** layout.js line 11 → description: 'UV Ghai–certified bridal makeup artist in Chandigarh (Sector 37A studio), Mohali & Panchkula. Specialising in subtle, skin-like makeup that lets you look like yourself — 200+ brides, 5+ years. Bridal, engagement, party & pre-wedding looks, studio or on-venue. Chat on WhatsApp to book.' Line 31 OG description → 'Subtle, skin-like bridal makeup in Chandigarh, Mohali & Panchkula. UV Ghai–certified, 200+ happy brides. Book your consultation on WhatsApp.' Swap keyword line 21 for 'subtle bridal makeup Chandigarh' and 'natural skin-like bridal makeup'. layout.js line 99 offer description → 'Subtle, skin-like bridal makeup (HD/airbrush available) with hair styling and draping'. page.js line 193 features → ["Subtle, Skin-Like Base (HD/Airbrush available)", "Hair Styling", "Draping", "Touch-up Kit"]. Rename the portfolio category from 'HD/Party Makeups' to 'Party & Festive' in page.js line 116 AND in all 12 matching entries of public/portfolio/portfolio.json (the filter matches on exact string).

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/layout.js, /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P1] 'On Studio(Chandigarh) Services' heading is broken English, mislabels the onVenue data, and hides whether Mohali/Panchkula on-venue is covered

page.js line 682 heading reads 'On Studio(Chandigarh) Services' (missing space, non-idiomatic 'On Studio') over a data key named `onVenue` (line 189). The hero (line 383) and About (line 470) promise service 'on-venue across Chandigarh, Mohali & Panchkula', but the services section never says whether these prices cover on-venue in the Tricity or studio-only — the WhatsApp prefill texts (lines 194, 212) even say 'on-studio bridal makeup', which will confuse the conversation Bhuvita receives. A Mohali bride cannot tell if ₹25,000 applies to her venue.

**Fix:** Change line 682 to 'Chandigarh Tricity — Studio (Sector 37A) & On-Venue'. Add one line under the heading: <p className="text-center text-gray-600 -mt-4 mb-8 text-sm">Prices apply at the Sector 37A studio and on-venue across Chandigarh, Mohali &amp; Panchkula.</p> (confirm with Bhuvita whether on-venue carries a travel charge; if it does, say 'nominal travel charge for on-venue' instead). Rename the data key `onVenue` → `tricity` for clarity (update the .map at line 684). Update whatsapptext values at lines 194 and 212 to 'Hi Bhuvita, I am interested in bridal makeup (Chandigarh Tricity)' and '...the complete bridal package (Chandigarh Tricity)'.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P1] JSON-LD offer catalog doesn't match the on-page service cards

layout.js lines 96-121 list offers: Bridal Makeup ₹25,000, Party Makeup ₹8,000, 'Engagement Makeup' ₹15,000, Destination Wedding ₹80,000. The page has no service called 'Engagement Makeup' — the ₹15,000 card is 'Pre-Wedding Functions (Mehendi/Sangeet/Haldi)' (page.js lines 197-201). The page's ₹60,000 'Bridal Package' and ₹35,000 'Outstation Bridal' are absent from the schema. Structured data that disagrees with visible content risks rich-result penalties and confuses brides who arrive via a Google snippet quoting a service the page doesn't name. Note prices themselves are stated only as `price` without ₹X-onwards semantics; the page says 'onwards'.

**Fix:** Align layout.js itemListElement 1:1 with the page cards: Bridal Makeup 25000 ('Subtle, skin-like bridal makeup with hair styling and draping'), Pre-Wedding Functions 15000 ('Mehendi, Sangeet and Haldi makeup and hair, per function'), Party Makeup 8000, Complete Bridal Package 60000 ('All wedding functions covered'), Outstation Bridal 35000, Destination Wedding 80000. For 'onwards' pricing, use PriceSpecification with minPrice instead of price, e.g. priceSpecification: { '@type': 'PriceSpecification', minPrice: 25000, priceCurrency: 'INR' }. Also verify every rupee figure with Bhuvita before launch — no price in the repo is in the verified-facts list.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/layout.js, /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P1] Product-brand list inconsistent between trust badge and FAQ (NARS appears in one, not the other) and is unverified

Trust badge (page.js line 253) claims 'MAC, Bobbi Brown, Charlotte Tilbury, Huda Beauty & NARS Products', while the FAQ answer (page.js line 268) and FAQ JSON-LD (layout.js line 134) list only 'MAC, Bobbi Brown, Charlotte Tilbury, and Huda Beauty'. The meta description (layout.js line 11) names 'MAC & Bobbi Brown'. Git history shows brands were expanded speculatively ('Expand premium product brands in trust badge'); none of these are in the verified-facts list. A bride comparing artists reads kit brands closely — naming brands not actually in the kit is checkable at the trial and damages trust.

**Fix:** Ask Bhuvita for her actual kit list (or pull it from her IG highlights), then use the identical list in all four places: page.js line 253 badge, page.js line 268 FAQ, layout.js line 134 faqJsonLd, layout.js line 11 meta description. Until confirmed, use the safe generic: badge 'Premium, Skin-Safe Products' and FAQ 'We work with premium professional brands chosen for Indian skin tones and long wear in North Indian weather. Ask us on WhatsApp about the exact products used for your look.'

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js, /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/layout.js

### [P1] Team-size claims ('Team Available', 'Dedicated Team', 'Our team can handle multiple people') are unverified for what appears to be a solo artist

page.js line 219 ('Team Available'), line 231 ('Dedicated Team'), and the FAQ at line 269 ('Our team can handle multiple people') assert a team. The verified facts describe one artist (Bhuvita, studio + on-venue). If a bride books family makeup for 6 people expecting a team and one artist arrives, that is an on-the-day failure. The site also alternates voice between 'we/our' (services, FAQ, footer) and 'she/Bhuvita' (About), which weakens the personal-artist brand that subtle-makeup buyers respond to.

**Fix:** Confirm with Bhuvita whether she brings assistant artists. If solo: line 269 → 'Yes! Bridesmaid and family makeup can be added to any package. Let us know the headcount when booking so enough time is scheduled (an assistant artist can be arranged for larger parties).' Remove 'Team Available' (line 219) and 'Dedicated Team' (line 231), replacing with verified features like 'Multiple looks per day' and 'Flexible schedule'. Pick one voice — recommended: first person singular-adjacent brand voice ('Bhuvita' in About, 'we' elsewhere is acceptable) but stop implying headcount.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P1] Missing content brides decide on: hygiene practices, trial price/how-to-book, and what 'subtle, skin-like' actually means

The page has a 'Hygiene First' badge (line 254) with zero supporting detail anywhere, a Trial FAQ (line 267) that says charges are 'separate' without a number or a booking path, and the brand differentiator 'subtle, skin-like makeup' is asserted in hero/About but never explained or shown (no before/after, no 'why subtle photographs better' copy). These are the top questions Chandigarh brides ask before opening WhatsApp; answering them on-page raises conversion and lets the WhatsApp conversation start warmer.

**Fix:** Add three FAQ entries to the `faqs` array (and mirror in layout.js faqJsonLd): (1) q: 'What does "subtle, skin-like makeup" mean?' a: 'It means makeup that photographs beautifully but still looks like your own skin up close — no heavy, mask-like base. Bhuvita builds coverage only where needed so you look like the best, most rested version of yourself.' (2) q: 'How do you maintain hygiene?' a: (confirm specifics with Bhuvita, e.g.) 'Brushes and sponges are cleaned and sanitised between clients, products are decanted or used with disposable applicators, and kits are restocked regularly.' (3) q: 'How do I book a trial?' a: 'Message us on WhatsApp with your wedding date and function list — we’ll share trial availability and charges (adjustable against your package on booking, if applicable — confirm this policy with Bhuvita).' Add a WhatsApp CTA under the trial FAQ with prefill 'Hi Bhuvita, I’d like to book a bridal trial'.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P2] Page title and OG title claim 'Best Bridal Makeup Artist' — an unverifiable superlative

layout.js line 10 title and line 30 OG title say 'Best Bridal Makeup Artist in Chandigarh...'. With no ratings or awards to back it (aggregateRating deliberately omitted at lines 90-92), 'Best' is puffery that clashes with the otherwise honest repositioning, reads as SEO-spam to savvy brides, and gets truncated anyway (the title is ~85 chars; Google shows ~60).

**Fix:** layout.js line 10 → 'Bridal Makeup Artist in Chandigarh | Makeovers by Bhuvita' (58 chars, keyword-first). Line 30 OG title → 'Makeovers by Bhuvita — Subtle Bridal Makeup, Chandigarh Tricity'. Keep 'best bridal makeup Chandigarh' as a keywords entry if desired (line 19) since meta keywords are not user-visible.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/layout.js

### [P2] Process timeline implies the trial is a standard included step, while the FAQ says trial charges are separate

processSteps line 260 presents 'Trial Session — Test your complete look before the big day' as step 2 of every engagement, with no cost signal; FAQ line 267 then says trial charges are separate from the package. A bride can reasonably read the timeline as trial-included and feel bait-and-switched in the WhatsApp chat. Also step 1 says consultation happens 'over a WhatsApp call' — confirm Bhuvita actually does calls rather than chat.

**Fix:** Line 260 desc → 'Optional paid trial to finalise your exact look before the wedding day' (or, if Bhuvita adjusts trial cost against bookings, 'Trial session to lock your look — charges adjustable on booking'). Line 259 desc → 'Share your date, functions, outfits and inspiration over WhatsApp' unless calls are confirmed.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

### [P2] JSON-LD geo coordinates are generic Chandigarh city-centre, not the Sector 37A studio

layout.js lines 77-81 use 30.7333, 76.7794 — the generic Chandigarh centroid, several km from Sector 37A (approx 30.7375, 76.7450). The address block and map embed correctly say Sector 37A, so the schema contradicts them; local-SEO proximity ranking for Mohali-side searches (Sector 37A borders Mohali) is the exact area she serves.

**Fix:** Get the studio's exact pin from Bhuvita (Google Maps 'share > lat,lng') and set geo.latitude/longitude to it; as an interim, use Sector 37A centroid ~{ latitude: 30.7375, longitude: 76.7450 }. Also update the postalCode if the studio's is not 160036 (Sector 37A is commonly 160036 — verify).

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/layout.js

### [P2] Footer copyright year is stale (2025) and portfolio image alt text on the Instagram teaser is non-descriptive

page.js line 1009 hardcodes '© 2025' (current date: July 2026) — a stale year quietly signals an abandoned business, which matters for a trust-driven purchase. Line 954 gives the six Instagram-teaser images alt="Instagram", losing descriptive value (the main gallery correctly uses per-image descriptions).

**Fix:** Line 1009 → `© {new Date().getFullYear()} Makeovers by Bhuvita. All rights reserved.` (fine in a client component). Line 954: look up the matching portfolio.json entry for each imgNum and use its description as alt, e.g. alt={`${portfolioImages.find(p => p.file === `${imgNum}.jpeg`)?.description ?? 'Bridal makeup'} — Makeovers by Bhuvita on Instagram`}.

**Files:** /Users/anuj/Personal Projects/makeoversbybhuvita/makeovers-by-bhuvita-claude/app/page.js

## Code quality + deploy pipeline

**Summary:** The codebase builds cleanly (Next 15.5 static export, 0 eslint errors, out/ generated with 404.html) and the deploy pipeline works, but it ships hardcoded unverified claims (50+ destination weddings, 4.9 rating, six fake testimonials) that must be removed before launch. The biggest engineering issues are a scroll handler that re-renders the entire 1099-line component on every scroll tick (jank on the target mobile audience), a non-reproducible CI install (`npm install --legacy-peer-deps` plus cache-defeating steps instead of `npm ci` — lockfile verified in sync), and the basePath string duplicated across three files via NODE_ENV coupling. Remaining items are robustness/dead-code cleanups: broken `next export` script, unbranded 404, gallery edge-case duplicates, a touch handler that permanently kills testimonial rotation, and suppressed hook deps.

### [P0] Unverified/fabricated claims are hardcoded in page.js (stats counter + placeholder testimonials)

app/page.js line 93 hardcodes animated-counter targets `[200, 5, 50, 4.9]` and lines 243-248 the stats array including '50+ Destination Weddings' and '4.9 Average Rating' — both UNVERIFIED per the business facts. Lines 143-186 ship six placeholder testimonials with fake names (the code's own comment at line 140 admits this). This overlaps the content dimension but the fix is code: these render on the live site today. Also note services data (line 235-239) advertises 'International Booking' and the FAQ claims Dubai experience — unverifiable.

**Fix:** In app/page.js: change stats targets to verified values only — `const targets = [200, 5]` and reduce the stats array to '200+ Happy Brides', '5+ Years Experience', plus verified substitutes (e.g. 'UV Ghai Certified', '5k+ Instagram'); update the render logic that special-cases index 3 for the decimal. Remove or comment out the testimonials section (and its carousel state/effects) until real reviews exist, or replace entries with real client reviews. Keep layout.js aggregateRating omitted as it already is.

**Files:** app/page.js

### [P1] Every scroll event re-renders the entire 1099-line component (scrollProgress state)

The scroll handler (lines 79-88) calls setScrolled, setShowBackToTop and setScrollProgress on every scroll tick. setScrollProgress produces a new value on essentially every pixel of scroll, forcing a full re-render of the whole page tree — including re-mapping portfolioData (39 items), testimonials, services, faqs, and re-evaluating 39 <img> nodes — continuously while scrolling. On the target audience's mid-range Android phones this is sustained main-thread work during scroll (jank). setScrolled/setShowBackToTop are booleans so they only re-render on threshold crossings; scrollProgress is the offender.

**Fix:** Extract the progress bar into its own tiny component that owns the scroll listener and scrollProgress state (only that 3px div re-renders), or drop React state for it entirely: keep a ref to the bar div and set `barRef.current.style.width = pct + '%'` inside a requestAnimationFrame-throttled handler. Same pattern optionally for BackToTop. Additionally move all static data (testimonials, services, stats, trustBadges, processSteps, faqs, portfolioCategories, getImagePath, and the portfolioData.map) to module scope above the component so they are created once, not per render.

**Files:** app/page.js

### [P1] Deploy workflow: npm install --legacy-peer-deps instead of npm ci; cache-defeating steps

The workflow runs `npm cache clean --force`, sets the registry, then `npm install --legacy-peer-deps`. Problems: (1) `npm install` ignores the committed package-lock.json's exact tree for semver-ranged deps (lucide-react ^0.541.0, eslint ^9, tailwindcss ^4), so CI can silently build with different versions than were tested locally; (2) `--legacy-peer-deps` is unnecessary — I verified `npm ls` shows zero peer conflicts and the lockfile is in sync with package.json (lockfileVersion 3); (3) `npm cache clean --force` wipes the cache that `setup-node cache: 'npm'` just restored, making the cache setting pointless and slowing every build; (4) the registry override is a no-op default. Missing `.nojekyll` is NOT an issue here: actions/deploy-pages serves the artifact as-is without Jekyll, so `_next/` works (verified 404.html and _next/ in out/). Action versions (checkout@v4, setup-node@v4, upload-pages-artifact@v3, deploy-pages@v4) are current.

**Fix:** Replace the three steps 'Clean npm cache' + 'Install dependencies' with a single step: `run: npm ci`. Keep `cache: 'npm'` in setup-node. Optionally add `actions/configure-pages@v5` before build (enables Pages automatically) and `public/.nojekyll` as belt-and-braces if the deploy method ever changes to branch-based.

**Files:** .github/workflows/nextjs.yml

### [P1] basePath '/makeovers-by-bhuvita' duplicated in 3 files via NODE_ENV coupling

The basePath string is independently derived from NODE_ENV in next.config.mjs (lines 2, 9-10), app/page.js getImagePath (lines 111-114, oddly indented and re-created every render inside the component), and app/layout.js siteUrl (lines 6-7). If the repo is ever renamed or moved to a custom domain, three places must change in lockstep; a miss silently 404s every image (src attributes bypass Next's basePath handling for plain <img>). It also breaks under `NODE_ENV=production next dev` or any non-standard env.

**Fix:** Single source of truth: in next.config.mjs define `const basePath = isProd ? '/makeovers-by-bhuvita' : '';` and add `env: { NEXT_PUBLIC_BASE_PATH: basePath }` to the config (Next inlines this at build time, works with static export). Create app/lib/site.js exporting `export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''; export const getImagePath = (p) => BASE_PATH + p; export const SITE_URL = ...`. Import in page.js (delete the inline getImagePath) and layout.js.

**Files:** app/page.js, app/layout.js, next.config.mjs

### [P2] Broken 'export' script in package.json (next export removed in Next 14+)

`"export": "next build && next export"` — the `next export` command was removed; running `npm run export` on Next 15.5 errors. With `output: 'export'` in next.config.mjs, `npm run build` already writes out/. The `start` script is also misleading: `next start` does not work with output:'export' (it errors telling you to use a static server).

**Fix:** Delete the `export` script. Optionally replace `start` with `"serve": "npx serve out"` for local preview of the static export, or delete it too.

**Files:** package.json

### [P2] No custom 404 page — deep-link typos show unbranded default Next 404

Build emits out/404.html (GitHub Pages serves it correctly for this project site), but it is the default '404: This page could not be found.' — no branding, no nav back, no WhatsApp CTA. Any mistyped shared link (e.g. from an Instagram bio edit) dead-ends a prospective bride.

**Fix:** Create app/not-found.js: a small server component matching the site palette (#FAF7F5 / #8B6F47) with 'Page not found', a link to `/` (Next will apply basePath automatically to <Link href="/">), and the wa.me/917888808231 CTA. Rebuild — it replaces out/404.html automatically.

**Files:** app/not-found.js

### [P2] Desktop gallery renders duplicate images at edge indexes (Math.min clamp)

Line 524: `const imageIndex = Math.min(currentImage + offset, filteredImages.length - 1)` renders the same image 2-3 times whenever a filtered category has <3 images, or when currentImage exceeds maxDesktopIndex — reachable today by swiping to the last image on mobile (currentImage up to length-1) then rotating/resizing to desktop width: the last image renders three times side-by-side. Current categories all have >=6 images so only the resize path triggers it.

**Fix:** Replace the [0,1,2].map + clamp with `filteredImages.slice(startIndex, startIndex + 3).map(...)` where `startIndex = Math.min(currentImage, maxDesktopIndex)`, and clamp currentImage in nextImage to maxDesktopIndex for the desktop arrows (or clamp on render as shown). Also fix the counter (line 605) which shows a single index while desktop displays 3 images.

**Files:** app/page.js

### [P2] Testimonial auto-rotate permanently stops after the first touch on mobile

Line 770: `onTouchStart={(e) => { setIsTestimonialHovered(true); ... }}` sets the pause flag but `onTouchEnd` (line 771) never resets it, and mouseLeave never fires on touch devices. After one swipe, the 5s auto-rotation (effect at lines 312-318) is disabled for the rest of the session — most brides will only ever see one testimonial. May be semi-intentional 'pause on interaction' but permanent stop is unlikely the intent.

**Fix:** In the testimonial onTouchEnd handler, after handleTestimonialTouchEnd(e), schedule `setTimeout(() => setIsTestimonialHovered(false), 8000)` (store/clear the timer id in a ref to avoid races), so rotation resumes after a grace period.

**Files:** app/page.js

### [P2] Lightbox keyboard-nav effect suppresses exhaustive-deps and omits filteredImages

Effect at lines 128-138 depends on `filteredImages.length` in its ArrowRight bound check but declares only [lightboxImage] with an eslint-disable (line 137). It is safe today only because the category tabs are unreachable while the z-[100] lightbox overlay is open. Any future change (e.g. closing lightbox without unmount, category keyboard shortcut) makes the bound stale, allowing lightboxImage to index past filteredImages and crash at line 1065 (`filteredImages[lightboxImage].url` on undefined). Similar suppressed-deps pattern in useInView (line 19), where the `options` parameter is also dead — no call site passes it, and it would be a new object every render anyway.

**Fix:** Change deps to `[lightboxImage, filteredImages.length]` and remove the eslint-disable; use functional updates `setLightboxImage(i => Math.min(i + 1, filteredImages.length - 1))`. Belt-and-braces: in handleCategoryChange also call `setLightboxImage(null)`. In useInView, delete the unused options parameter.

**Files:** app/page.js

### [P2] Dead code: stats[].number field, WaveDivider 'from' prop

The `number` property in the stats array (lines 243-248) is never rendered — displayed values come from animatedStats — so the two arrays can drift (they already encode the same facts twice: lines 93 and 244-247). WaveDivider declares and receives a `from` prop at all three call sites (lines 415, 653, 754) but only `to` is used as the SVG fill. eslint (next/core-web-vitals) passes with 0 errors and 6 no-img-element warnings (image optimization is the perf dimension's remit); bare `"lint": "eslint"` works under ESLint 9 flat config.

**Fix:** Derive both counter targets and labels from one array, e.g. `const stats = [{ target: 200, suffix: '+', label: 'Happy Brides' }, ...]`, and remove the `from` prop from WaveDivider's signature and call sites.

**Files:** app/page.js
