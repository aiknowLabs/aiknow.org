# Product Subpages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create three on-brand product subpages (iVahini, Smart Transfer, Flyx) under `products/<slug>/` and make the homepage product cards link to them.

**Architecture:** Lightweight, self-contained static HTML pages sharing one stylesheet (`products/product.css`), reusing the existing logo/favicon/fonts via root-relative paths. The heavy theGem chrome is intentionally NOT replicated; pages are hand-built to match the brand. Homepage cards get wrapped in anchors.

**Tech Stack:** Static HTML5, CSS3. No build step, no JS framework. Site is served at the domain root via `CNAME` (`aiknow.org`), so root-relative paths (`/images/...`, `/css/...`) resolve correctly.

---

## File Structure

- Create: `products/product.css` — shared styles for all three subpages (header, hero, sections, feature cards, CTA, footer, responsive).
- Create: `products/ivahini/index.html` — iVahini subpage.
- Create: `products/smart-transfer/index.html` — Smart Transfer subpage.
- Create: `products/flyx/index.html` — Flyx subpage.
- Modify: `index.html` — wrap the three product `<article>` cards (~lines 1701–1796) in anchors to the new subpages.

Note on paths: subpages live at depth 2 (`products/ivahini/`). Use **root-relative** asset paths (`/images/...`, `/wp-content/...`, `/products/product.css`) so all three pages share identical markup regardless of slug. Internal links use root-relative URLs too (`/`, `/products/flyx/`, `/#careers`).

---

## Task 1: Shared stylesheet

**Files:**
- Create: `products/product.css`

- [ ] **Step 1: Write `products/product.css`**

```css
/* AiKnow product subpages — shared styles */
:root {
  --bg: #2a2b39;
  --bg-2: #20212c;
  --panel: #30313f;
  --text: #e9e9ef;
  --muted: #a9aab8;
  --accent: #ff5e3a;
  --accent-2: #4a90e2;
  --maxw: 1080px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: 'Source Sans Pro', 'Roboto', Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }

.wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }

/* Header */
.site-head {
  position: sticky; top: 0; z-index: 10;
  background: rgba(32,33,44,0.95);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(6px);
}
.site-head .wrap {
  display: flex; align-items: center; justify-content: space-between;
  height: 72px;
}
.site-head .logo img { width: 150px; }
.back-link {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px; letter-spacing: 1px; text-transform: uppercase;
  color: var(--muted);
}
.back-link:hover { color: var(--text); }

/* Hero */
.hero {
  padding: 96px 0 72px;
  background:
    linear-gradient(180deg, rgba(42,43,57,0.65), rgba(32,33,44,0.95)),
    var(--bg);
  text-align: center;
}
.hero .eyebrow {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase; letter-spacing: 3px;
  font-size: 13px; color: var(--accent); margin: 0 0 16px;
}
.hero h1 {
  font-family: 'Roboto', sans-serif; font-weight: 100;
  font-size: 56px; margin: 0 0 18px; line-height: 1.1;
}
.hero p.tagline {
  font-size: 20px; color: var(--muted); max-width: 720px; margin: 0 auto;
}
.hero .hero-img { margin: 48px auto 0; max-width: 640px; border-radius: 8px; overflow: hidden; }

/* Sections */
section.block { padding: 64px 0; border-top: 1px solid rgba(255,255,255,0.05); }
section.block h2 {
  font-family: 'Roboto', sans-serif; font-weight: 300;
  font-size: 32px; margin: 0 0 24px; text-align: center;
}
section.block p.lead { font-size: 18px; color: var(--muted); max-width: 760px; margin: 0 auto; text-align: center; }

/* Feature cards */
.features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
.feature {
  background: var(--panel); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px; padding: 28px;
}
.feature h3 { font-family: 'Montserrat', sans-serif; font-size: 17px; margin: 0 0 10px; }
.feature p { color: var(--muted); font-size: 15px; margin: 0; }

/* Steps */
.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; counter-reset: step; }
.step { text-align: center; }
.step .num {
  width: 44px; height: 44px; line-height: 44px; margin: 0 auto 14px;
  border-radius: 50%; background: var(--accent); color: #fff;
  font-family: 'Montserrat', sans-serif; font-weight: 600;
}
.step h3 { font-size: 16px; margin: 0 0 8px; }
.step p { color: var(--muted); font-size: 14px; margin: 0; }

/* CTA */
.cta { text-align: center; padding: 72px 0; background: var(--bg-2); border-top: 1px solid rgba(255,255,255,0.05); }
.cta h2 { font-family: 'Roboto', sans-serif; font-weight: 300; font-size: 30px; margin: 0 0 24px; }
.btn {
  display: inline-block; padding: 14px 34px; border-radius: 4px;
  background: var(--accent); color: #fff;
  font-family: 'Montserrat', sans-serif; text-transform: uppercase;
  letter-spacing: 1px; font-size: 14px;
}
.btn:hover { background: #ff7a5c; }

/* Footer */
.site-foot { background: #1b1c25; padding: 28px 0; font-size: 14px; color: var(--muted); }
.site-foot .wrap { display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center; }
.site-foot a:hover { color: var(--text); }

@media (max-width: 820px) {
  .hero h1 { font-size: 38px; }
  .features, .steps { grid-template-columns: 1fr; }
  .site-foot .wrap { flex-direction: column; text-align: center; }
}
```

- [ ] **Step 2: Verify the file exists and parses**

Run: `Test-Path d:\projects\aiknow.org\products\product.css`
Expected: `True`

- [ ] **Step 3: Commit**

```bash
git add products/product.css
git commit -m "feat: add shared stylesheet for product subpages"
```

---

## Task 2: iVahini subpage

**Files:**
- Create: `products/ivahini/index.html`

- [ ] **Step 1: Write `products/ivahini/index.html`**

Use this exact structure. The header/footer markup is identical across all three pages (only logo/back-link differ by nothing); the hero + content differ per product.

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>iVahini — India's Roadside Infrastructure OS | AiKnow Labs</title>
  <meta name="description" content="iVahini connects drivers, landowners, fleets, and cities on one intelligent platform — from pre-booking urban parking to NH corridor freight bays and EV charging.">
  <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,600%7CRoboto:100,300,400,700%7CSource+Sans+Pro:300,400" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="/products/product.css" type="text/css">
</head>
<body>
  <header class="site-head">
    <div class="wrap">
      <a class="logo" href="/" rel="home">
        <img src="/wp-content/uploads/thegem-logos/logo_e5c36b652a8bd2bec1ea7f9ee4c4a27c_1x.png"
             srcset="/wp-content/uploads/thegem-logos/logo_e5c36b652a8bd2bec1ea7f9ee4c4a27c_1x.png 1x,/wp-content/uploads/thegem-logos/logo_e5c36b652a8bd2bec1ea7f9ee4c4a27c_2x.png 2x"
             alt="AiKnow Labs">
      </a>
      <a class="back-link" href="/#our_products">← All products</a>
    </div>
  </header>

  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">iVahini</p>
      <h1>India's Roadside Infrastructure OS</h1>
      <p class="tagline">One intelligent platform connecting drivers, landowners, fleets, and cities — building the digital layer India's roads have always been missing.</p>
      <div class="hero-img"><img src="/images/Product-Responsive-Images/5-App.jpeg" alt="iVahini platform"></div>
    </div>
  </section>

  <section class="block">
    <div class="wrap">
      <h2>Overview</h2>
      <p class="lead">iVahini connects drivers, landowners, fleets, and cities on one intelligent platform. From pre-booking urban parking to National Highway corridor freight bays and EV charging, iVahini brings India's roadside infrastructure online — turning idle land and scattered services into a connected, bookable network.</p>
    </div>
  </section>

  <section class="block">
    <div class="wrap">
      <h2>What iVahini does</h2>
      <div class="features">
        <div class="feature"><h3>Pre-booked urban parking</h3><p>Reserve a parking spot before you arrive, so drivers spend less time circling and more time moving.</p></div>
        <div class="feature"><h3>NH corridor freight bays</h3><p>Bookable freight and rest bays along National Highway corridors for fleets and long-haul drivers.</p></div>
        <div class="feature"><h3>EV charging</h3><p>Locate and access EV charging as part of the same roadside network, ready for India's electric transition.</p></div>
        <div class="feature"><h3>Land owners</h3><p>Put roadside land to work by listing it as bookable parking, bays, or charging capacity.</p></div>
        <div class="feature"><h3>Fleets &amp; cities</h3><p>Give fleets and city operators a single digital layer to coordinate roadside infrastructure.</p></div>
        <div class="feature"><h3>One platform</h3><p>Drivers, landowners, fleets, and cities meet in one place instead of fragmented, offline services.</p></div>
      </div>
    </div>
  </section>

  <section class="block">
    <div class="wrap">
      <h2>How it works</h2>
      <div class="steps">
        <div class="step"><div class="num">1</div><h3>Discover</h3><p>Find parking, freight bays, or EV charging near your route.</p></div>
        <div class="step"><div class="num">2</div><h3>Book</h3><p>Pre-book the spot you need ahead of time on the platform.</p></div>
        <div class="step"><div class="num">3</div><h3>Arrive</h3><p>Show up to a reserved space — no circling, no guesswork.</p></div>
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="wrap">
      <h2>Interested in iVahini?</h2>
      <a class="btn" href="/#careers">Get in touch</a>
    </div>
  </section>

  <footer class="site-foot">
    <div class="wrap">
      <span>3rd floor No. 3, Innov8, 20 Main Rd, 7th Block Koramangala, Bangalore 560095.</span>
      <span>AiKnow Labs Pvt. Ltd.</span>
      <span>&copy;2026 All Rights Reserved</span>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Verify markup and asset paths**

Open `products/ivahini/index.html` in a browser. Confirm: logo loads, hero image loads, stylesheet applies (dark theme), "← All products" links to `/#our_products`, CTA links to `/#careers`.

- [ ] **Step 3: Commit**

```bash
git add products/ivahini/index.html
git commit -m "feat: add iVahini product subpage"
```

---

## Task 3: Smart Transfer subpage

**Files:**
- Create: `products/smart-transfer/index.html`

- [ ] **Step 1: Write `products/smart-transfer/index.html`**

Identical header and footer to Task 2. Hero/content below; swap the `<head>` title/description, eyebrow, h1, tagline, hero image, overview, features, and steps:

- `<title>`: `Smart Transfer — Money Transfer Without Borders | AiKnow Labs`
- meta description: `Smart Transfer enables international and domestic peer-to-peer payments through mobile phones and social media apps using digital ledger technology.`
- eyebrow: `Smart Transfer`
- h1: `Money Transfer Without Borders`
- tagline: `International and domestic peer-to-peer payments through the mobile phones and social media apps you already use.`
- hero image: `/images/Product-Responsive-Images/1-App.jpg`
- Overview lead: `Smart Transfer facilitates international and domestic peer-to-peer payments through mobile phones and social media apps, using digital ledger technology to move money quickly and securely between people — without borders getting in the way.`

Feature cards (6):
```html
<div class="feature"><h3>Peer-to-peer</h3><p>Send money directly between people, person to person, without intermediaries in the middle.</p></div>
<div class="feature"><h3>International &amp; domestic</h3><p>Move money across borders or within the country from the same app.</p></div>
<div class="feature"><h3>Through apps you use</h3><p>Transfer via mobile phones and the social media apps already on your phone.</p></div>
<div class="feature"><h3>Digital ledger technology</h3><p>Built on digital ledger technology for secure, traceable transfers.</p></div>
<div class="feature"><h3>Mobile-first</h3><p>Designed for the phone in your pocket — no branch visit required.</p></div>
<div class="feature"><h3>Social &amp; simple</h3><p>Sending money feels as easy as sending a message.</p></div>
```

Steps (3):
```html
<div class="step"><div class="num">1</div><h3>Connect</h3><p>Open Smart Transfer through your mobile or social app.</p></div>
<div class="step"><div class="num">2</div><h3>Send</h3><p>Choose a recipient and send money — domestic or international.</p></div>
<div class="step"><div class="num">3</div><h3>Settle</h3><p>Digital ledger technology settles the transfer securely.</p></div>
```

CTA h2: `Interested in Smart Transfer?`

- [ ] **Step 2: Verify markup and asset paths**

Open `products/smart-transfer/index.html` in a browser. Confirm logo, hero image (`1-App.jpg`), styles, and both internal links work.

- [ ] **Step 3: Commit**

```bash
git add products/smart-transfer/index.html
git commit -m "feat: add Smart Transfer product subpage"
```

---

## Task 4: Flyx subpage

**Files:**
- Create: `products/flyx/index.html`

- [ ] **Step 1: Write `products/flyx/index.html`**

Identical header and footer to Task 2. Per-product content:

- `<title>`: `Flyx — Peer-to-Peer Currency Exchange | AiKnow Labs`
- meta description: `Flyx is a peer-to-peer currency exchange platform that matches you with other customers exchanging the opposite-side currency. Need local currency? Just flyx it.`
- eyebrow: `Flyx`
- h1: `Need local currency? Just flyx it.`
- tagline: `A peer-to-peer exchange platform that matches you with other people exchanging the currency you need.`
- hero image: `/images/Product-Responsive-Images/3-App-358x357.jpg`
- Overview lead: `Flyx is a unique peer-to-peer exchange platform that empowers you to be matched with other customers exchanging the other side's currency. Instead of going through a money changer, Flyx pairs you directly with someone who needs exactly what you have.`

Feature cards (6):
```html
<div class="feature"><h3>Peer-to-peer matching</h3><p>Get matched directly with other customers exchanging the opposite currency.</p></div>
<div class="feature"><h3>Get local currency</h3><p>Need local currency on arrival? Find someone exchanging the other way.</p></div>
<div class="feature"><h3>No middle changer</h3><p>Exchange directly between people instead of through a traditional money changer.</p></div>
<div class="feature"><h3>Two-sided</h3><p>Both sides get the currency they want from a single match.</p></div>
<div class="feature"><h3>Simple</h3><p>"Just flyx it" — request, match, and exchange.</p></div>
<div class="feature"><h3>For travellers</h3><p>Made for people who need the other side's currency, wherever they are.</p></div>
```

Steps (3):
```html
<div class="step"><div class="num">1</div><h3>Request</h3><p>Tell Flyx which currency you have and which you need.</p></div>
<div class="step"><div class="num">2</div><h3>Match</h3><p>Flyx matches you with a customer exchanging the other side.</p></div>
<div class="step"><div class="num">3</div><h3>Exchange</h3><p>Complete the peer-to-peer exchange directly.</p></div>
```

CTA h2: `Interested in Flyx?`

- [ ] **Step 2: Verify markup and asset paths**

Open `products/flyx/index.html` in a browser. Confirm logo, hero image (`3-App-358x357.jpg`), styles, and both internal links work.

- [ ] **Step 3: Commit**

```bash
git add products/flyx/index.html
git commit -m "feat: add Flyx product subpage"
```

---

## Task 5: Link homepage product cards

**Files:**
- Modify: `index.html` (the three `<article>` blocks for post-27459 iVahini, post-27458 Smart Transfer, post-27460 Flyx, ~lines 1701–1796)

Each card currently has a stray `</a>` inside `.post-featured-content` (a leftover with no opening tag). The fix: wrap the `<img>` in a real anchor so the existing `</a>` closes it, AND wrap the title text in an anchor. Do this for each card with its slug.

- [ ] **Step 1: iVahini card — wrap image**

In the `post-27459` article, replace:
```html
                                            <img src="./images/Product-Responsive-Images/5-App.jpeg" width="640"
                                                height="423" class="img-responsive"
                                                alt="photo-1418393781697-0215e2fd73e4-2" />
                                            </a>
```
with:
```html
                                            <a href="/products/ivahini/">
                                            <img src="./images/Product-Responsive-Images/5-App.jpeg" width="640"
                                                height="423" class="img-responsive"
                                                alt="iVahini" />
                                            </a>
```

- [ ] **Step 2: iVahini card — wrap title**

Replace:
```html
                                                <span class="light">India's Roadside Infrastructure OS</span>
```
with:
```html
                                                <a href="/products/ivahini/"><span class="light">India's Roadside Infrastructure OS</span></a>
```

- [ ] **Step 3: Smart Transfer card — wrap image**

In the `post-27458` article, replace:
```html
                                            <img src="./images/Product-Responsive-Images/1-App.jpg" width="640"
                                                height="423" class="img-responsive"
                                                alt="photo-1418393781697-0215e2fd73e4-2" />
                                            </a>
```
with:
```html
                                            <a href="/products/smart-transfer/">
                                            <img src="./images/Product-Responsive-Images/1-App.jpg" width="640"
                                                height="423" class="img-responsive"
                                                alt="Smart Transfer" />
                                            </a>
```

- [ ] **Step 4: Smart Transfer card — wrap title**

Replace:
```html
                                                <span class="light">Money Transfer Without Borders</span>
```
with:
```html
                                                <a href="/products/smart-transfer/"><span class="light">Money Transfer Without Borders</span></a>
```

- [ ] **Step 5: Flyx card — wrap image**

In the `post-27460` article, replace:
```html
                                            <img src="./images/Product-Responsive-Images/3-App-358x357.jpg" width="640"
                                                height="423" class="img-responsive" alt="3-App-358x357.jpg" />

                                        </div>
```
with:
```html
                                            <a href="/products/flyx/">
                                            <img src="./images/Product-Responsive-Images/3-App-358x357.jpg" width="640"
                                                height="423" class="img-responsive" alt="Flyx" />
                                            </a>
                                        </div>
```

- [ ] **Step 6: Flyx card — wrap title**

Replace:
```html
                                                <span class="light">Need local currency?<br /> Just flyx it</span>
```
with:
```html
                                                <a href="/products/flyx/"><span class="light">Need local currency?<br /> Just flyx it</span></a>
```

- [ ] **Step 7: Verify links**

Open `index.html`, scroll to Products. Confirm clicking each card image or title navigates to `/products/ivahini/`, `/products/smart-transfer/`, `/products/flyx/` respectively. Confirm no broken layout in the cards.

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "feat: link homepage product cards to subpages"
```

---

## Self-Review Notes

- **Spec coverage:** structure (Task 1–4), expand-from-summary copy (Tasks 2–4 grounded in spec summaries), card linking + nav (Task 5). All spec sections covered.
- **Path consistency:** subpages use root-relative paths throughout; homepage card links use `/products/<slug>/`. Slugs match folder names: `ivahini`, `smart-transfer`, `flyx`.
- **Copy policy:** all copy derived from the homepage summaries; no invented stats or claims.
- **No test framework:** verification steps are concrete browser/markup checks, appropriate for a static site.
