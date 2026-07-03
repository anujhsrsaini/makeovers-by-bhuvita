# Makeovers by Bhuvita — Master Plan (Best-in-Class Launch)

_Last updated: 2026-07-03. This document is the single source of truth for the site rebuild + deploy. Every audit finding, decision, and verified business fact lives here._

## 1. Goal

Ship a best-in-class single-page portfolio/booking site for Bhuvita (bridal makeup artist, Chandigarh) — top-tier in **SEO**, **performance**, and **conversion** — deployed live on GitHub Pages.

## 2. Verified business facts (source of truth for all copy)

From her Instagram bio @makeoversbybhuvita + client confirmation (2026-07):

| Fact | Status |
|---|---|
| Bhuvita — Makeup Artist, Chandigarh | ✅ Verified |
| Certified by UV Ghai (only stated certification) | ✅ Verified — do NOT claim "Internationally Certified" |
| Specialised in **subtle, skin-like makeup** (key differentiator) | ✅ Verified — brand positioning |
| Studio: Sector 37A, Chandigarh + available on venue | ✅ Verified |
| WhatsApp +91 78888 08231, IG @makeoversbybhuvita | ✅ Verified |
| 200+ brides, 5+ years experience | ✅ Confirmed by client |
| ~5.2k IG followers, 757 posts | ✅ Verified (2026-07) |
| "50+ Destination Weddings", "4.9★ rating" | ❌ Unverified — remove/replace |
| Testimonials (Priya Sharma etc.) | ❌ Placeholder/fake — need real reviews from user; until then do not present as real Google-style reviews |

## 3. Current state (audited 2026-07-03)

- **Stack:** Next.js 15.5 (App Router, `output: 'export'`), React 19.1, Tailwind 4, lucide-react. Single client component `app/page.js` (1,099 lines) + `app/layout.js` (metadata + JSON-LD).
- **Deploy:** GitHub Actions → GitHub Pages at `https://anujhsrsaini.github.io/makeovers-by-bhuvita` (basePath `/makeovers-by-bhuvita`). Workflow: `.github/workflows/nextjs.yml`, triggers on push to `main`.
- **Sections:** Nav, Hero, Stats bar, About, Portfolio (39 images, 4 categories, lightbox), Process, Services & Pricing (8 cards), Testimonials, FAQ (8 + FAQ schema), Contact (WhatsApp/IG/Maps), IG teaser, Footer, sticky WhatsApp CTA.
- **Uncommitted WIP on main:** layout.js + page.js edits, new `public/about-bhuvita.jpeg` (About section). Commit as baseline first.

### Known problems (pre-audit scan)

**Performance (worst area):**
- `public/portfolio` = **32 MB**, images up to 3030×4032 (~1.5 MB each) served raw; `images.unoptimized: true`; no `next/image`, no srcset/sizes, no WebP/AVIF, no width/height attrs (CLS risk).
- Entire page gated behind `pageLoaded` → `opacity-0` until JS hydrates: terrible LCP, blank page for no-JS/slow devices.
- Hero image (1.3 MB, 3030×4032) not preloaded, no `fetchpriority`, rendered via plain `<img>`.
- Google Maps iframe loads on page load (lazy attr helps but still heavy third-party).
- All 39 images imported into one client component; whole page is client-rendered.

**SEO:**
- No `sitemap.xml`, no `robots.txt`.
- Canonical/OG URLs okay-ish but tied to NODE_ENV; no `metadataBase`.
- JSON-LD: BeautySalon + FAQPage exist (good); geo coords are generic Chandigarh, not Sector 37A; consider `MakeupArtist`/`LocalBusiness` type review.
- Single H1 is the nav logo (`<h1>` in nav) — hero headline is `<h2>`: wrong heading hierarchy.
- Generic alt text ("Instagram", "Bridal Makeup").
- No Google Business Profile link/reviews yet (offline task for user).

**Conversion:**
- Unverified claims (50+ destination weddings, 4.9★, fake testimonials) — credibility risk.
- No above-the-fold trust reinforcement beyond one badge; CTA copy generic.
- No pricing anchoring / "most popular" logic beyond one badge; no urgency/scarcity (dates fill up); no lead capture besides WhatsApp.
- IG follower proof (5k+) underused.

**Accessibility:**
- Icon-only buttons missing `aria-label` (mobile menu, carousel arrows, dots, lightbox).
- Carousel/lightbox focus management, `prefers-reduced-motion` not respected.
- Color contrast of `#D4A574` on white needs check.

**Code quality:** monolithic component, fine for scope but split-worthy; `useInView` hook per section OK.

## 4. Strategy

### SEO
1. Correct heading hierarchy (single H1 = brand+primary keyword in hero; nav logo becomes div/span).
2. `app/sitemap.js` + `public/robots.txt` (static-export compatible), `metadataBase`, cleaner canonical.
3. Richer, accurate JSON-LD (BeautySalon w/ Sector 37A geo, sameAs IG, offers matching visible pricing; keep aggregateRating OUT until real reviews).
4. Descriptive alt text everywhere from portfolio.json descriptions.
5. Keyword-aligned copy: "bridal makeup artist in Chandigarh", "subtle makeup", Tricity terms — already decent, tighten.

### Performance (target: Lighthouse ≥95 mobile, LCP < 2.5s on 4G)
1. **Image pipeline** (`scripts/optimize-images.mjs`, sharp is available): resize portfolio to max 1080px long edge, quality ~80 → expect 32 MB → ~3-4 MB; generate 400px thumbs for IG strip; hero at 828/1200/1600 widths; emit WebP + JPEG fallback; update references. Keep originals out of `public/`.
2. Kill the `opacity-0` page gate (CSS-only entrance or none); content visible in initial HTML.
3. `width`/`height` on all imgs (no CLS), `loading="lazy"` + `decoding="async"` below fold, `fetchpriority="high"` + preload for hero.
4. Font: keep Inter via next/font (already optimal, `display:swap` default).
5. Maps iframe → click-to-load facade or keep lazy (decide in implementation).

### Conversion
1. Honest social proof: stats become 200+ Brides / 5+ Years / 5,000+ IG followers / UV Ghai Certified. Remove 4.9★ + 50 destination weddings until verified.
2. Testimonials: keep section but clearly styled as client words without fake Google-review look; plan doc notes user must supply real reviews (WhatsApp screenshots / Google reviews) — highest-impact offline task.
3. Sharpen hero: benefit-led H1, subtitle with differentiator (subtle, skin-like makeup), primary CTA "Chat on WhatsApp" (lower friction than "Book Consultation"), secondary "See Real Brides".
4. Pre-filled WhatsApp messages per service (already good — keep), add response-time expectation ("replies within a few hours").
5. Sticky mobile CTA (already exists — keep), ensure it doesn't cover content (footer padding exists).

### Deploy
1. Commit baseline WIP → agents work → verify → push to `main` → GitHub Actions builds & deploys → verify live URL + spot-check headers, OG tags, sitemap.

## 5. Agent team structure

| Phase | Team | Mode |
|---|---|---|
| A. Audit | 6 parallel read-only auditors: SEO, Performance, Conversion/CRO, Accessibility, Content accuracy (vs §2 facts), Code/deploy | Workflow, parallel |
| B. Synthesis | Main session dedupes → prioritized backlog (§6) | inline |
| C. Implement | 3 parallel agents with strict file ownership: (1) `scripts/` + `public/` image pipeline, (2) `app/page.js`, (3) `app/layout.js` + `app/sitemap.js` + `public/robots.txt` | Workflow, parallel |
| D. Verify | build + lint + screenshot pass, then adversarial review agents on the diff | Workflow |
| E. Deploy | commit, push, watch Actions, verify live | inline |

File-ownership rule: no two implementation agents may touch the same file. Cross-file interface (image filenames/sizes) is fixed in §6 before implementation starts.

## 6. Prioritized backlog

Audit complete (2026-07-03): **74 findings — 17 P0, 32 P1, 25 P2.** Full detail in `docs/AUDIT_FINDINGS.md`. Scope for this launch: **all P0s + all P1s + cheap P2s.**

### P0 (launch blockers)
1. **Honesty sweep** — remove fake testimonials, unverified stats (50+ destination weddings, 4.9★), fabricated Goa/Udaipur/Jaipur/Dubai experience claims (page + FAQ JSON-LD), invented cancellation/refund policy, "International Booking" card, "team" claims. Replace with verified facts: 200+ brides, 5+ yrs, 5,000+ IG community, 750+ looks posted, UV Ghai cert.
2. **Image pipeline** — 32MB → ~3MB via sharp (contract §6.1); dedicated 1200×630 `og-image.jpg` (current OG image is a 1.4MB portrait falsely declared 1200×630 — breaks WhatsApp previews, our #1 share channel).
3. **Kill the `opacity-0` page gate** — content must be visible in initial HTML without JS.
4. **H1 fix** — nav logo `<h1>` → `<div>`; hero heading becomes the sole H1 with "Bridal Makeup Artist in Chandigarh" keywords.
5. **Hidden desktop gallery downloads ~3MB on mobile** — single responsive gallery, no duplicate hidden-DOM image downloads; portfolio is below fold → lazy.
6. **A11y blockers** — aria-labels on ~15 icon-only controls; lightbox becomes a real modal (role=dialog, focus trap, scroll lock, keyboard-openable); contrast fixes (#D4A574 labels, white-on-#25D366, footer white/40-50).

### P1 (high impact)
- Canonical/og:url trailing slash + `metadataBase`; title ≤60 chars leading with "Bridal Makeup Artist in Chandigarh"; description leads with *subtle, skin-like* positioning (not HD/Airbrush); drop "Best" superlative + keywords meta.
- `sitemap.xml` with image entries for all 39 portfolio images (NO robots.txt — ignored on project pages; meta robots already correct).
- JSON-LD: `@id`, `hasMap`, Sector 37A geo, offer catalog matched to visible cards, Dubai/city claims removed from FAQ schema.
- Hero LCP: preload + `fetchpriority="high"` + explicit dimensions; responsive webp variants.
- IG teaser → 400px thumbs; Maps iframe → click-to-load facade; Dancing Script via next/font (kill CSS @import chain).
- `scrollProgress` re-render fix (rAF + refs or isolated child component).
- WhatsApp prefills qualify the lead (function/date/venue placeholders); CTA copy says "Chat on WhatsApp"; response-time expectation set.
- Services terminology fix ("On Studio(Chandigarh) Services" ↔ onVenue confusion); brand list consistent (badge vs FAQ).
- Deploy workflow: `npm ci`, proper caching, drop cache-clean hacks.
- basePath single-sourced via `NEXT_PUBLIC_BASE_PATH` in next.config.mjs.
- Missing bride-critical content: hygiene, trial price/how-to-book, what "subtle, skin-like" means, Tricity travel.
- FAQ aria-expanded/aria-controls; prefers-reduced-motion; carousel aria-live + pause; ≥44px touch targets; descriptive alt text everywhere.

### P2 (included where cheap)
- Custom branded 404; dead `export` script removal; footer year 2026; skip link; visible focus styles; desktop-gallery duplicate-image clamp bug; testimonial auto-rotate touch bug; lightbox effect deps; stats dead code.
- Deferred (post-launch): keyworded image filenames, IG-comment-sourced real reviews, custom domain.

### 6.0 Cross-agent contracts (beyond §6.1 images)
- **og-image:** Agent A produces `public/og-image.jpg` (1200×630, <300KB, landscape attention-crop of hero). Agent C references `${siteUrl}og-image.jpg`.
- **Script font:** Agent C loads `Dancing_Script` via `next/font` exposing CSS var `--font-script` on `<body>`; Agent B's `.font-script` in globals.css uses `var(--font-script)` and the Google Fonts `@import` is deleted.
- **basePath:** Agent C sets `env: { NEXT_PUBLIC_BASE_PATH: isProd ? '/makeovers-by-bhuvita' : '' }` in `next.config.mjs`; Agent B's `getImagePath` uses `process.env.NEXT_PUBLIC_BASE_PATH || ''`.
- **Hero preload:** Agent C adds `<link rel="preload" as="image">` with `imageSrcSet` for `hero-828/1200/1600.webp` in layout head; Agent B renders hero `<img>` with matching srcSet + `fetchPriority="high"`.
- **Stats:** verified set = `200+ Happy Brides · 5+ Years Experience · 5,000+ Instagram Community · 750+ Bridal Looks Shared` (counter targets: 200, 5, 5000, 750).

### 6.1 Image pipeline interface contract (FIXED — all agents code against this)

Inventory: 39 portfolio JPEGs (most 1200px wide but 600KB–1.5MB each, 5 are 2268–3030px wide), hero 3030×4032 @1.3MB, about 852×1400 @456KB. Total public/: ~34MB.

`scripts/optimize-images.mjs` (run locally with `node scripts/optimize-images.mjs`; sharp as devDependency; outputs are committed — CI never needs sharp):

| Source | Outputs |
|---|---|
| `public/portfolio/{id}.jpeg` | `{id}-800.webp` (800w, q75) · `{id}-1200.webp` (1200w, q75) · `{id}-thumb.webp` (400w, q70) · `{id}.jpeg` recompressed in place (max 1200w, mozjpeg q72) |
| `public/hero-image.jpeg` | `hero-828.webp` / `hero-1200.webp` / `hero-1600.webp` (q75) · `hero-image.jpeg` recompressed (max 1200w) |
| `public/about-bhuvita.jpeg` | `about-800.webp` (q75) · `about-bhuvita.jpeg` recompressed (max 800w) |

- Never upscale (skip variants wider than source).
- `portfolio.json`: image agent adds `width` + `height` fields (post-resize intrinsic dimensions of the 800w variant × its height) per entry. page.js reads them for CLS-free rendering.
- page.js renders portfolio images via `<picture><source type="image/webp" srcSet="{id}-800.webp 800w, {id}-1200.webp 1200w" sizes=...><img src="{id}.jpeg" width height loading decoding/></picture>`.
- Expected total weight after: ~3–4MB (≈90% reduction); initial mobile payload ≈300–500KB.

### 6.2 Implementation file ownership (no overlaps)

| Agent | Owns |
|---|---|
| A — images | `scripts/optimize-images.mjs`, all files in `public/` (image binaries + portfolio.json), `package.json`/`package-lock.json` (add sharp devDep, drop dead `export` script) |
| B — page | `app/page.js`, `app/globals.css` |
| C — seo-infra | `app/layout.js`, `app/sitemap.js` (new), `public/robots.txt` (new, exempt from A's public/ ownership), `app/not-found.js` (new), `.github/workflows/nextjs.yml` |

## 7. Offline tasks for the owner (cannot be automated)

1. Collect 5–10 real client reviews (Google Business Profile ideally) — unlocks honest testimonials + aggregateRating schema.
2. Create/claim **Google Business Profile** for "Makeovers by Bhuvita, Sector 37A" — single biggest local-SEO lever.
3. Confirm pricing figures on the site are current.
4. Consider a custom domain (e.g. makeoversbybhuvita.com) — better branding + SEO than github.io subpath.

## 8. Audit findings

_(appended per-dimension after Phase A)_
