# Product Subpages — iVahini, Smart Transfer, Flyx

**Date:** 2026-05-29
**Status:** Approved (design)

## Goal

Create dedicated subpages for the three AiKnow products currently shown only as
non-clickable cards in the `#our_products` section of the single-page site
(`index.html`), and wire the homepage cards to link to them.

## Site context

- `aiknow.org` is a single `index.html` (WordPress / theGem export) served at the
  domain root via `CNAME` (`aiknow.org`).
- Products appear as cards in `#our_products` (index.html ~lines 1698–1796), none
  of which link anywhere today.
- Existing assets reused (root-relative paths work because the site is served at
  the domain root):
  - Logo: `/wp-content/uploads/thegem-logos/logo_ba75128b9cbb2c374979962e6d7c59d9_1x.png` (+2x/3x)
  - Favicons: `/images/favicon/*`
  - Product images: iVahini → `/images/Product-Responsive-Images/5-App.jpeg`,
    Smart Transfer → `/images/Product-Responsive-Images/1-App.jpg`,
    Flyx → `/images/Product-Responsive-Images/3-App-358x357.jpg`
  - Fonts (already loaded site-wide): Montserrat, Roboto, Source Sans Pro

## Structure

```
products/ivahini/index.html
products/smart-transfer/index.html
products/flyx/index.html
products/product.css          # one shared stylesheet for all three pages
```

Resulting URLs: `aiknow.org/products/ivahini/`, `/products/smart-transfer/`,
`/products/flyx/`.

## Approach

Lightweight, hand-built, self-contained pages that match the brand rather than
cloning the heavy theGem revslider/megamenu/isotope chrome (which is fragile to
replicate in a subfolder). Each page:

- Uses root-relative asset paths so the existing logo and favicon load unchanged.
- Links one shared `products/product.css` for layout; pulls brand fonts via the
  same Google Fonts URL used on the homepage.
- Dark, on-brand visual treatment consistent with the homepage hero.

### Per-page layout

1. **Header** — AiKnow logo (links to `/`) + a "← All products" / back-home link.
2. **Hero** — product name + existing tagline.
3. **Overview** — expanded from the homepage summary.
4. **Key features** — 3–4 feature cards.
5. **How it works** — brief steps.
6. **CTA** — "Get in touch", linking to the homepage contact/careers section
   (`/#careers`).
7. **Footer** — reuse the homepage footer (address, company name, socials,
   copyright).

### Taglines / source summaries (from index.html)

- **iVahini** — "India's Roadside Infrastructure OS": connects drivers,
  landowners, fleets, and cities on one intelligent platform; from pre-booking
  urban parking to NH corridor freight bays and EV charging.
- **Smart Transfer** — "Money Transfer Without Borders": international and
  domestic peer-to-peer payments through mobile phones and social media apps
  using digital ledger technology.
- **Flyx** — "Need local currency? Just flyx it": peer-to-peer exchange platform
  matching customers exchanging the opposite-side currency.

## Copy policy

Draft fuller marketing copy grounded strictly in the existing homepage summaries.
No invented facts, statistics, dates, or claims. User reviews and corrects.

## Homepage edits

Wrap each product card's image + title in an `<a>` pointing to its subpage:
`/products/ivahini/`, `/products/smart-transfer/`, `/products/flyx/`. Surgical
edits to the three `<article>` blocks only; no other homepage changes.

## Out of scope

- No changes to the homepage layout, slider, or menu beyond making cards clickable.
- No new product imagery; reuse existing files.
- No backend, forms, or analytics changes.
