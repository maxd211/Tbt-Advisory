# Security Hardening & Code Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all identified security vulnerabilities, self-host fonts to remove GDPR-risky third-party requests, add HTTP security headers, and split the monolithic `page.js` into focused section components.

**Architecture:** Static Next.js App Router site. No server actions, no API routes, no database — all changes are build-time config, component extraction, and dependency updates. No unit tests exist or are warranted for a static marketing page; each task is verified with `npm run build` and a local dev check.

**Tech Stack:** Next.js 16 (App Router), React 18, plain CSS (globals.css), `next/font/google` for font self-hosting.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `package.json` | Pin `next` to `16.2.3`, pin `react`/`react-dom` |
| Create | `next.config.mjs` | Security headers (CSP, X-Frame-Options, etc.) |
| Modify | `app/layout.js` | Replace `@import` font with `next/font/google`, apply to `<body>` |
| Modify | `app/globals.css` | Remove `@import` line, reference `--font-main` var already defined |
| Create | `components/sections/Hero.js` | Hero section markup |
| Create | `components/sections/About.js` | About section markup |
| Create | `components/sections/Edge.js` | Edge section markup |
| Create | `components/sections/Services.js` | Services section markup |
| Create | `components/sections/Imprint.js` | Imprint/contact section markup |
| Modify | `app/page.js` | Replace inline sections with component imports |

---

## Task 1: Pin dependencies and resolve audit vulnerabilities

**Files:**
- Modify: `package.json`

npm audit reports Next.js 16.1.1 is installed. The fix is `16.2.3`. `react`/`react-dom` are also pinned to `"latest"` which is unpredictable. Pin everything.

- [ ] **Step 1: Update `package.json` dependencies**

Replace the entire `dependencies` block in `package.json`:

```json
"dependencies": {
  "next": "16.2.3",
  "react": "18.3.1",
  "react-dom": "18.3.1"
}
```

- [ ] **Step 2: Run audit fix for transitive dev vulnerabilities**

```bash
npm audit fix
```

Expected output ends with: `fixed N of N vulnerabilities` — it will update `picomatch`, `minimatch`, `flatted`, `ajv`, `brace-expansion` in the lock file.

- [ ] **Step 3: Verify clean install**

```bash
npm install
npm audit
```

Expected: `found 0 vulnerabilities` (or only unfixable dev-only ones).

- [ ] **Step 4: Verify build still passes**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: pin next to 16.2.3, fix audit vulnerabilities"
```

---

## Task 2: Self-host fonts with `next/font/google`

**Files:**
- Modify: `app/layout.js`
- Modify: `app/globals.css`

The current `@import url('https://fonts.googleapis.com/...')` in globals.css fires before Cookiebot consent loads, sending visitor IPs to Google — a GDPR risk for a German entity. `next/font/google` downloads the font at build time and serves it from the same origin.

- [ ] **Step 1: Remove the `@import` line from `app/globals.css`**

Delete line 1:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

Leave `--font-main` in `:root` unchanged — it already has system font fallbacks so the page won't break if the variable fails.

- [ ] **Step 2: Update `app/layout.js` to use `next/font/google`**

Replace the entire file content:

```js
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    title: 'TBT Advisory | Global Strategy',
    description: 'Commercial advisory & execution.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <Script
                    id="Cookiebot"
                    src="https://consent.cookiebot.com/uc.js"
                    data-cbid="49067d3a-76f2-4edf-8fe9-dfacf982f191"
                    data-blockingmode="auto"
                    strategy="beforeInteractive"
                />
            </head>
            <body className={inter.variable}>
                {children}
            </body>
        </html>
    );
}
```

- [ ] **Step 3: Update `--font-main` in `app/globals.css` to reference the CSS variable**

Find in `:root`:
```css
--font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Replace with:
```css
--font-main: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

- [ ] **Step 4: Verify build and check network requests**

```bash
npm run build && npm run start
```

Open `http://localhost:3000` in a browser. Open DevTools → Network tab → filter by "google". Expected: **zero requests** to `fonts.googleapis.com` or `fonts.gstatic.com`. Font files should be served from `/_next/static/media/`.

- [ ] **Step 5: Commit**

```bash
git add app/layout.js app/globals.css
git commit -m "feat: self-host Inter via next/font to remove pre-consent Google request"
```

---

## Task 3: Add HTTP security headers

**Files:**
- Create: `next.config.mjs`

Adds `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and a `Content-Security-Policy` that allows only Cookiebot's domains and self-hosted assets.

- [ ] **Step 1: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const csp = [
    "default-src 'self'",
    // Cookiebot consent script + CDN; 'unsafe-inline' required by Next.js hydration
    "script-src 'self' 'unsafe-inline' https://consent.cookiebot.com https://consentcdn.cookiebot.com",
    // Next.js injects inline styles during hydration
    "style-src 'self' 'unsafe-inline'",
    // Profile image is served from same origin; data: for any base64 images
    "img-src 'self' data:",
    // Self-hosted fonts only (after next/font migration)
    "font-src 'self'",
    // Cookiebot telemetry endpoint
    "connect-src 'self' https://consentcdn.cookiebot.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ');

const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    { key: 'Content-Security-Policy', value: csp },
                ],
            },
        ];
    },
};

export default nextConfig;
```

- [ ] **Step 2: Build and verify headers are present**

```bash
npm run build && npm run start
```

In a separate terminal:
```bash
curl -I http://localhost:3000
```

Expected output includes:
```
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
content-security-policy: default-src 'self'; script-src ...
```

- [ ] **Step 3: Verify Cookiebot loads correctly in browser**

Open `http://localhost:3000`. The Cookiebot consent banner should appear. Open DevTools → Console. Expected: no CSP violation errors (red `Refused to load...` messages).

If you see a CSP violation for Cookiebot, add the blocked domain to the appropriate directive in `next.config.mjs` and rebuild.

- [ ] **Step 4: Commit**

```bash
git add next.config.mjs
git commit -m "feat: add security headers (CSP, X-Frame-Options, Referrer-Policy)"
```

---

## Task 4: Extract page sections into components

**Files:**
- Create: `components/sections/Hero.js`
- Create: `components/sections/About.js`
- Create: `components/sections/Edge.js`
- Create: `components/sections/Services.js`
- Create: `components/sections/Imprint.js`
- Modify: `app/page.js`

`page.js` currently has 118 lines of mixed markup for five independent sections. Extracting each section makes each unit readable in isolation and independently editable.

- [ ] **Step 1: Create `components/sections/Hero.js`**

```js
export default function Hero() {
    return (
        <div className="section-band band-hero">
            <section id="home" className="hero">
                <div className="hero-content-new">
                    <div className="hero-left">
                        <h1 className="hero-headline-new">
                            Commercial advisory &amp; execution.
                        </h1>
                    </div>
                    <div className="hero-right">
                        <img
                            src="/profile.png"
                            alt="Professional headshot"
                            className="hero-image"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
```

- [ ] **Step 2: Create `components/sections/About.js`**

```js
export default function About() {
    return (
        <div className="section-band band-about">
            <div className="section-inner">
                <section id="about">
                    <h2 className="section-title">About</h2>
                    <div className="about-section">
                        <p className="about-text">
                            Ex Chief Commercial Officer at Project A, the VC and PE behind Trade
                            Republic, Sennder, Quantum Systems, Arx and 100+ other investments &amp;
                            €1B assets under management. In my role I ran due diligences, sparred
                            founders and scaled our portfolio with the help of the operational teams.
                        </p>
                        <p className="about-text">
                            Prior I founded a music &amp; blockchain SaaS with clients and investors
                            incl. Payday (Label of Steve Aoki &amp; Jay-Z), CRO, Bausa, Lena etc.,
                            an NGO against extreme poverty and acted as Head of Business Development
                            of automotive marketplace caroobi ($20M funding).
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
```

- [ ] **Step 3: Create `components/sections/Edge.js`**

```js
export default function Edge() {
    return (
        <div className="section-band band-edge">
            <div className="section-inner">
                <section id="edge">
                    <h2 className="section-title">Edge</h2>
                    <div className="about-section">
                        <p className="about-text">
                            My edge is rooted in the breadth of my experience. My teams and I have
                            built and scaled 20+ commercial strategies starting from 0€ revenue ideas
                            to 250M+ € revenue companies — all of which were VC or PE funded.
                            Industries I worked in include logistics, defense, automotive, NGOs,
                            insurances, banking, music etc.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
```

- [ ] **Step 4: Create `components/sections/Services.js`**

```js
const SERVICES = [
    {
        title: 'Commercial Strategy & GTM Design',
        description:
            'Define ICP, positioning, pricing, and GTM model to create a repeatable revenue engine.',
    },
    {
        title: 'Revenue Organization & Scaling',
        description:
            'Design sales org, roles, incentives, and playbooks to move beyond founder-led sales.',
    },
    {
        title: 'International Expansion (Europe)',
        description:
            'Structure market entry and rollout to scale revenue across European markets without fragmentation.',
    },
    {
        title: 'Investor & Board-Level Commercial Advisory',
        description:
            'Provide commercial diagnostics, diligence support, and execution plans for investors and boards.',
    },
];

export default function Services() {
    return (
        <div className="section-band band-services">
            <div className="section-inner">
                <section id="services">
                    <h2 className="section-title">Services</h2>
                    <div className="services-list">
                        {SERVICES.map(({ title, description }) => (
                            <div key={title} className="service-item">
                                <h3 className="service-title">{title}</h3>
                                <p className="service-desc">{description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
```

- [ ] **Step 5: Create `components/sections/Imprint.js`**

```js
export default function Imprint() {
    return (
        <div className="section-band band-imprint">
            <div className="section-inner">
                <section id="contact">
                    <h2 className="section-title">Imprint</h2>
                    <div className="contact-info">
                        <p className="contact-text">
                            <strong>TBT Consulting GmbH</strong>
                            Büchelgarten 37<br />
                            53225 Bonn<br />
                            Email:{' '}
                            <a href="mailto:tb@tbt-advisory.com">tb@tbt-advisory.com</a>
                            <br /><br />
                            Geschäftsführer: Thanh Binh Tran<br />
                            Amtsgericht Berlin-Charlottenburg: HRB 218611 B
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
```

- [ ] **Step 6: Replace `app/page.js` with composed sections**

```js
import Header from '../components/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Edge from '../components/sections/Edge';
import Services from '../components/sections/Services';
import Imprint from '../components/sections/Imprint';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <About />
                <Edge />
                <Services />
                <Imprint />
            </main>
        </>
    );
}
```

- [ ] **Step 7: Build and visually verify**

```bash
npm run build && npm run start
```

Open `http://localhost:3000`. Check each section renders identically to before:
- Hero: headline left, photo right, correct layout on mobile
- About: two paragraphs
- Edge: one paragraph
- Services: 2×2 grid of service cards
- Imprint: address block with clickable email

- [ ] **Step 8: Commit**

```bash
git add components/sections/ app/page.js
git commit -m "refactor: extract page sections into focused components"
```

---

## Self-Review

**Spec coverage:**
- [x] Pin `next` version → Task 1
- [x] `npm audit fix` for transitive dev deps → Task 1
- [x] Self-host fonts (GDPR / pre-consent IP leak) → Task 2
- [x] Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy) → Task 3
- [x] HTTPS enforcement note: intentionally omitted — Vercel handles this at CDN; app-level redirect in next.config is redundant when deployed to Vercel
- [x] Component extraction / code organisation → Task 4

**Placeholder scan:** None found. All code blocks are complete.

**Type consistency:** No TypeScript. Component names and CSS class names are consistent across tasks.
