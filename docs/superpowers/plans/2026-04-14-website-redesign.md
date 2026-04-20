# TBT Advisory Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete redesign of tbt-advisory.com from a personal profile site to a dark-canvas, modern boutique advisory firm website.

**Architecture:** Scraps all existing section styles and rebuilds with a black-canvas design system. Five new/rewritten section components replace the existing five. A new `GetInTouchModal` component handles the header CTA. All images/visuals are CSS-based (no external CDN) to stay within the existing CSP (`img-src 'self' data:`).

**Tech Stack:** Next.js 14 App Router, React (`use client` where needed), Inter font (already loaded), plain CSS (no Tailwind).

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Rewrite | `app/globals.css` | Complete dark design system — variables, typography, layout |
| Rewrite | `components/Header.js` | Logo left · centered nav · "Get in touch" CTA right · manages modal state |
| Create | `components/GetInTouchModal.js` | Overlay modal: message form (mailto) + book-a-call link |
| Rewrite | `components/sections/Hero.js` | Full-bleed black canvas, centered headline |
| Create | `components/sections/TrackRecord.js` | Stats bar + career milestone cards |
| Create | `components/sections/AboutFirm.js` | About TBT Advisory as a firm |
| Rewrite | `components/sections/Services.js` | 4 service cards with CSS gradient visuals |
| Create | `components/sections/Footer.js` | Legal/contact footer (replaces Imprint) |
| Rewrite | `app/page.js` | Wire new sections in correct order |
| Delete | `components/sections/About.js` | Superseded by TrackRecord |
| Delete | `components/sections/Edge.js` | Superseded by TrackRecord |
| Delete | `components/sections/Imprint.js` | Superseded by Footer |

---

## Design System Reference

```
Background:      #080808
Surface 1:       #111111
Surface 2:       #161616
Border subtle:   rgba(255,255,255,0.07)
Border strong:   rgba(255,255,255,0.14)
Text primary:    #FFFFFF
Text secondary:  rgba(255,255,255,0.55)
Text tertiary:   rgba(255,255,255,0.35)
Accent white:    #FFFFFF
Header height:   64px
Max content:     1120px
Outer padding:   56px (desktop), 32px (tablet), 20px (mobile)
```

Typography scale:
- Hero headline: 80px, weight 300, tracking -0.03em
- Section title: 48px, weight 400, tracking -0.02em
- Card title: 20px, weight 500
- Body: 16px, weight 400, line-height 1.7

---

## Task 1: Rewrite `app/globals.css` — Dark Design System

**Files:**
- Rewrite: `app/globals.css`

- [ ] **Step 1: Replace the entire file with the new dark design system**

```css
/* ===================================================================
   1. CSS VARIABLES & RESET
   =================================================================== */

:root {
    --font-main: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

    /* Colors */
    --bg-base:        #080808;
    --bg-surface-1:   #111111;
    --bg-surface-2:   #161616;
    --border-subtle:  rgba(255, 255, 255, 0.07);
    --border-strong:  rgba(255, 255, 255, 0.14);
    --text-primary:   #FFFFFF;
    --text-secondary: rgba(255, 255, 255, 0.55);
    --text-tertiary:  rgba(255, 255, 255, 0.35);

    /* Layout */
    --content-max-width: 1120px;
    --outer-padding:     56px;
    --header-height:     64px;

    /* Spacing */
    --section-padding-y: 120px;
}

*, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    background-color: var(--bg-base);
}

body {
    background-color: var(--bg-base);
    color: var(--text-primary);
    font-family: var(--font-main);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

section[id] {
    scroll-margin-top: var(--header-height);
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    font-family: var(--font-main);
    cursor: pointer;
}

/* ===================================================================
   2. HEADER
   =================================================================== */

.site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: var(--header-height);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 0 var(--outer-padding);
    border-bottom: 1px solid var(--border-subtle);
    /* Subtle blur background */
    background-color: rgba(8, 8, 8, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: border-color 0.3s ease;
}

@supports not (backdrop-filter: blur(20px)) {
    .site-header {
        background-color: var(--bg-base);
    }
}

.header-logo {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
}

.header-logo-tbt {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-primary);
}

.header-logo-sep {
    color: var(--text-tertiary);
    font-weight: 300;
}

.header-logo-advisory {
    font-size: 14px;
    font-weight: 400;
    color: var(--text-secondary);
    letter-spacing: 0.02em;
}

/* Centered nav */
.header-nav {
    display: flex;
    align-items: center;
    gap: 40px;
    list-style: none;
}

.header-nav a {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.15s ease;
}

.header-nav a:hover {
    color: var(--text-primary);
}

/* Right slot */
.header-cta {
    display: flex;
    justify-content: flex-end;
}

.btn-get-in-touch {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--bg-base);
    background-color: var(--text-primary);
    border: none;
    border-radius: 2px;
    padding: 9px 20px;
    cursor: pointer;
    transition: opacity 0.15s ease;
}

.btn-get-in-touch:hover {
    opacity: 0.85;
}

/* Mobile hamburger */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
}

.mobile-menu-toggle span {
    display: block;
    width: 22px;
    height: 1.5px;
    background-color: var(--text-primary);
    transition: all 0.2s ease;
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(4.5px, 4.5px);
}
.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}
.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(4.5px, -4.5px);
}

/* ===================================================================
   3. GET IN TOUCH MODAL
   =================================================================== */

.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: overlay-in 0.2s ease;
}

@keyframes overlay-in {
    from { opacity: 0; }
    to   { opacity: 1; }
}

.modal-panel {
    background-color: var(--bg-surface-1);
    border: 1px solid var(--border-strong);
    border-radius: 4px;
    width: 100%;
    max-width: 520px;
    padding: 48px;
    position: relative;
    animation: panel-in 0.25s ease;
}

@keyframes panel-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: var(--text-tertiary);
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    transition: color 0.15s ease;
    padding: 4px;
}

.modal-close:hover {
    color: var(--text-primary);
}

.modal-eyebrow {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: 12px;
}

.modal-title {
    font-size: 28px;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.modal-subtitle {
    font-size: 15px;
    color: var(--text-secondary);
    margin-bottom: 36px;
    line-height: 1.5;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-field label {
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-tertiary);
}

.form-field input,
.form-field textarea {
    background-color: var(--bg-surface-2);
    border: 1px solid var(--border-subtle);
    border-radius: 2px;
    color: var(--text-primary);
    font-family: var(--font-main);
    font-size: 15px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.15s ease;
    resize: none;
}

.form-field input::placeholder,
.form-field textarea::placeholder {
    color: var(--text-tertiary);
}

.form-field input:focus,
.form-field textarea:focus {
    border-color: var(--border-strong);
}

.modal-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
}

.btn-send {
    width: 100%;
    padding: 14px;
    background-color: var(--text-primary);
    color: var(--bg-base);
    border: none;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: opacity 0.15s ease;
}

.btn-send:hover {
    opacity: 0.85;
}

.modal-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    color: var(--text-tertiary);
    font-size: 12px;
}

.modal-divider::before,
.modal-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--border-subtle);
}

.btn-book-call {
    width: 100%;
    padding: 14px;
    background-color: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-strong);
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;
    text-align: center;
    display: block;
    text-decoration: none;
}

.btn-book-call:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
}

/* ===================================================================
   4. HERO SECTION
   =================================================================== */

.hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-base);
    position: relative;
    overflow: hidden;
    padding: var(--header-height) var(--outer-padding) 0;
}

/* Subtle radial glow in the center */
.hero-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 70%);
    pointer-events: none;
}

.hero-inner {
    text-align: center;
    max-width: 800px;
    position: relative;
    z-index: 1;
}

.hero-eyebrow {
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: 32px;
}

.hero-headline {
    font-size: 80px;
    font-weight: 300;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin-bottom: 40px;
}

.hero-headline em {
    font-style: italic;
    color: var(--text-secondary);
}

.hero-sub {
    font-size: 17px;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 420px;
    margin: 0 auto 56px;
}

.hero-scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--text-tertiary);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.hero-scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, var(--text-tertiary), transparent);
}

/* ===================================================================
   5. TRACK RECORD SECTION
   =================================================================== */

.track-section {
    background-color: var(--bg-base);
    padding: var(--section-padding-y) var(--outer-padding);
    display: flex;
    justify-content: center;
}

.track-inner {
    width: 100%;
    max-width: var(--content-max-width);
}

.section-eyebrow {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: 16px;
}

.section-heading {
    font-size: 48px;
    font-weight: 400;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 80px;
    max-width: 640px;
}

/* Stats bar */
.stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--border-subtle);
    margin-bottom: 80px;
}

.stat-item {
    padding: 40px 0;
    border-right: 1px solid var(--border-subtle);
}

.stat-item:first-child {
    padding-left: 0;
}

.stat-item:last-child {
    border-right: none;
    padding-right: 0;
}

.stat-number {
    font-size: 52px;
    font-weight: 300;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    line-height: 1.0;
    margin-bottom: 8px;
}

.stat-label {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.4;
    max-width: 160px;
}

/* Milestone cards */
.milestones-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background-color: var(--border-subtle);
}

.milestone-card {
    background-color: var(--bg-base);
    padding: 40px 36px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: background-color 0.2s ease;
}

.milestone-card:hover {
    background-color: var(--bg-surface-1);
}

.milestone-tag {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
}

.milestone-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1.3;
}

.milestone-desc {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.7;
    flex: 1;
}

.milestone-meta {
    font-size: 12px;
    color: var(--text-tertiary);
    letter-spacing: 0.04em;
}

/* ===================================================================
   6. ABOUT FIRM SECTION
   =================================================================== */

.about-section {
    background-color: var(--bg-surface-1);
    padding: var(--section-padding-y) var(--outer-padding);
    display: flex;
    justify-content: center;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
}

.about-inner {
    width: 100%;
    max-width: var(--content-max-width);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
}

.about-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.about-body p {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.8;
}

.about-body p strong {
    color: var(--text-primary);
    font-weight: 500;
}

.about-detail-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.about-detail-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 24px;
    border-top: 1px solid var(--border-subtle);
}

.about-detail-label {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
}

.about-detail-value {
    font-size: 15px;
    color: var(--text-primary);
    line-height: 1.5;
}

/* ===================================================================
   7. SERVICES SECTION
   =================================================================== */

.services-section {
    background-color: var(--bg-base);
    padding: var(--section-padding-y) var(--outer-padding);
    display: flex;
    justify-content: center;
}

.services-inner {
    width: 100%;
    max-width: var(--content-max-width);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background-color: var(--border-subtle);
    margin-top: 64px;
}

.service-card {
    background-color: var(--bg-base);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: background-color 0.3s ease;
}

.service-card:hover {
    background-color: var(--bg-surface-1);
}

.service-visual {
    height: 200px;
    width: 100%;
    position: relative;
    overflow: hidden;
}

/* Unique gradient per service */
.service-visual-1 {
    background: linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #0d0d0d 100%);
}
.service-visual-1::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 30% 60%, rgba(100,120,200,0.18) 0%, transparent 70%);
}

.service-visual-2 {
    background: linear-gradient(135deg, #0d0d0d 0%, #1a1208 50%, #0d0d0d 100%);
}
.service-visual-2::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 70% 40%, rgba(200,160,80,0.15) 0%, transparent 70%);
}

.service-visual-3 {
    background: linear-gradient(135deg, #0d0d0d 0%, #0d1a14 50%, #0d0d0d 100%);
}
.service-visual-3::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 50% 30%, rgba(80,180,140,0.14) 0%, transparent 70%);
}

.service-visual-4 {
    background: linear-gradient(135deg, #0d0d0d 0%, #1a0d1a 50%, #0d0d0d 100%);
}
.service-visual-4::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 60% 70%, rgba(180,100,200,0.13) 0%, transparent 70%);
}

/* Subtle grid overlay on service visuals */
.service-visual::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 32px 32px;
}

.service-content {
    padding: 36px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
}

.service-number {
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--text-tertiary);
}

.service-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--text-primary);
    line-height: 1.3;
}

.service-desc {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.7;
}

/* ===================================================================
   8. FOOTER
   =================================================================== */

.site-footer {
    background-color: var(--bg-surface-1);
    border-top: 1px solid var(--border-subtle);
    padding: 64px var(--outer-padding);
    display: flex;
    justify-content: center;
}

.footer-inner {
    width: 100%;
    max-width: var(--content-max-width);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 48px;
    align-items: start;
}

.footer-brand-tbt {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-primary);
}

.footer-brand-advisory {
    font-size: 14px;
    font-weight: 400;
    color: var(--text-secondary);
}

.footer-tagline {
    font-size: 13px;
    color: var(--text-tertiary);
    margin-top: 12px;
    line-height: 1.5;
}

.footer-col-heading {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: 16px;
}

.footer-contact-text {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 2.0;
}

.footer-contact-text a {
    color: var(--text-secondary);
    text-decoration: underline;
    text-decoration-color: var(--border-strong);
    text-underline-offset: 3px;
    transition: color 0.15s ease;
}

.footer-contact-text a:hover {
    color: var(--text-primary);
}

.footer-legal {
    font-size: 11px;
    color: var(--text-tertiary);
    line-height: 1.8;
}

.footer-bottom {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid var(--border-subtle);
    width: 100%;
    max-width: var(--content-max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-copyright {
    font-size: 12px;
    color: var(--text-tertiary);
}

/* ===================================================================
   9. RESPONSIVE — TABLET (≤1023px)
   =================================================================== */

@media (max-width: 1023px) {
    :root {
        --outer-padding: 32px;
        --section-padding-y: 88px;
    }

    .hero-headline {
        font-size: 60px;
    }

    .section-heading {
        font-size: 38px;
    }

    .stats-row {
        grid-template-columns: repeat(2, 1fr);
    }

    .stat-item:nth-child(2) {
        border-right: none;
    }

    .stat-item:nth-child(3) {
        border-top: 1px solid var(--border-subtle);
    }

    .stat-item:nth-child(4) {
        border-top: 1px solid var(--border-subtle);
        border-right: none;
    }

    .milestones-grid {
        grid-template-columns: 1fr 1fr;
    }

    .about-inner {
        grid-template-columns: 1fr;
        gap: 48px;
    }

    .footer-inner {
        grid-template-columns: 1fr 1fr;
    }

    .footer-inner > *:last-child {
        grid-column: 1 / -1;
    }

    .site-header {
        padding: 0 var(--outer-padding);
    }
}

/* ===================================================================
   10. RESPONSIVE — MOBILE (≤767px)
   =================================================================== */

@media (max-width: 767px) {
    :root {
        --outer-padding: 20px;
        --section-padding-y: 72px;
    }

    /* Header mobile */
    .site-header {
        grid-template-columns: 1fr auto;
        padding: 0 20px;
    }

    .header-nav-wrapper {
        display: none;
    }

    .header-cta {
        display: none;
    }

    .mobile-menu-toggle {
        display: flex;
    }

    /* Mobile nav overlay */
    .mobile-nav-overlay {
        position: fixed;
        inset: 0;
        z-index: 1500;
        background-color: var(--bg-base);
        display: flex;
        flex-direction: column;
        padding: 80px 32px 48px;
        gap: 8px;
        transform: translateX(100%);
        transition: transform 0.25s ease;
    }

    .mobile-nav-overlay.active {
        transform: translateX(0);
    }

    .mobile-nav-overlay a {
        font-size: 32px;
        font-weight: 300;
        letter-spacing: -0.01em;
        color: var(--text-primary);
        padding: 12px 0;
        border-bottom: 1px solid var(--border-subtle);
        display: block;
    }

    .mobile-nav-close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: transparent;
        border: none;
        color: var(--text-secondary);
        font-size: 28px;
        cursor: pointer;
        padding: 8px;
    }

    .mobile-get-in-touch {
        margin-top: 32px;
    }

    .mobile-get-in-touch .btn-get-in-touch {
        width: 100%;
        padding: 14px;
        font-size: 15px;
    }

    /* Hero */
    .hero-headline {
        font-size: 42px;
        letter-spacing: -0.025em;
    }

    .hero-sub {
        font-size: 15px;
    }

    /* Track record */
    .section-heading {
        font-size: 32px;
        margin-bottom: 48px;
    }

    .stats-row {
        grid-template-columns: repeat(2, 1fr);
    }

    .stat-number {
        font-size: 38px;
    }

    .milestones-grid {
        grid-template-columns: 1fr;
    }

    /* Services */
    .services-grid {
        grid-template-columns: 1fr;
    }

    /* About */
    .about-inner {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    /* Footer */
    .footer-inner {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .footer-bottom {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
    }

    /* Modal */
    .modal-panel {
        padding: 32px 24px;
    }

    .modal-title {
        font-size: 24px;
    }
}

@media (max-width: 400px) {
    .hero-headline {
        font-size: 36px;
    }
}
```

- [ ] **Step 2: Verify build compiles cleanly**

```bash
npm run build
```
Expected: Compiled successfully (no CSS errors).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: complete dark design system rewrite for TBT Advisory rebrand"
```

---

## Task 2: Rewrite `components/Header.js`

**Files:**
- Rewrite: `components/Header.js`

- [ ] **Step 1: Replace the header with the 3-column layout + mobile nav overlay**

```jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header({ onGetInTouch }) {
    const [menuOpen, setMenuOpen] = useState(false);

    // Prevent body scroll when mobile nav is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const close = () => setMenuOpen(false);

    return (
        <>
            <header className="site-header">
                {/* Left: Logo */}
                <Link href="/" className="header-logo" onClick={close}>
                    <span className="header-logo-tbt">TBT</span>
                    <span className="header-logo-sep">—</span>
                    <span className="header-logo-advisory">Advisory</span>
                </Link>

                {/* Center: Nav */}
                <div className="header-nav-wrapper">
                    <ul className="header-nav">
                        <li><Link href="#track-record">Work</Link></li>
                        <li><Link href="#about">About</Link></li>
                        <li><Link href="#services">Services</Link></li>
                    </ul>
                </div>

                {/* Right: CTA + Hamburger */}
                <div className="header-cta">
                    <button className="btn-get-in-touch" onClick={onGetInTouch}>
                        Get in touch
                    </button>
                </div>

                <button
                    className={`mobile-menu-toggle${menuOpen ? ' active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </header>

            {/* Mobile Nav Overlay */}
            <nav className={`mobile-nav-overlay${menuOpen ? ' active' : ''}`} aria-hidden={!menuOpen}>
                <button className="mobile-nav-close-btn" onClick={close} aria-label="Close menu">✕</button>
                <Link href="#track-record" onClick={close}>Work</Link>
                <Link href="#about" onClick={close}>About</Link>
                <Link href="#services" onClick={close}>Services</Link>
                <div className="mobile-get-in-touch">
                    <button className="btn-get-in-touch" onClick={() => { close(); onGetInTouch(); }}>
                        Get in touch
                    </button>
                </div>
            </nav>
        </>
    );
}
```

- [ ] **Step 2: Build to confirm no errors**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/Header.js
git commit -m "feat: redesign header with centered nav and Get in touch CTA"
```

---

## Task 3: Create `components/GetInTouchModal.js`

**Files:**
- Create: `components/GetInTouchModal.js`

The modal opens from the header CTA. It offers two paths:
1. **Send a message** — composes a mailto: link from the form fields (name, email, message) and opens it in the user's mail client.
2. **Book a call** — opens a Calendly link in a new tab.

Note: The `CALENDLY_URL` constant is a placeholder. Replace with the actual Calendly URL once available.

- [ ] **Step 1: Create the modal component**

```jsx
'use client';

import { useEffect, useRef } from 'react';

const CONTACT_EMAIL = 'tb@tbt-advisory.com';
const CALENDLY_URL = 'https://calendly.com/tbt-advisory'; // replace with real URL

export default function GetInTouchModal({ onClose }) {
    const nameRef  = useRef(null);
    const emailRef = useRef(null);
    const msgRef   = useRef(null);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const handleSend = (e) => {
        e.preventDefault();
        const name  = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const msg   = msgRef.current.value.trim();
        const subject = encodeURIComponent(`Enquiry from ${name}`);
        const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-panel" role="dialog" aria-modal="true" aria-label="Get in touch">
                <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

                <p className="modal-eyebrow">Contact</p>
                <h2 className="modal-title">Let's talk.</h2>
                <p className="modal-subtitle">
                    Leave a message and we'll follow up, or book a call directly.
                </p>

                <form className="modal-form" onSubmit={handleSend}>
                    <div className="form-field">
                        <label htmlFor="modal-name">Name</label>
                        <input
                            id="modal-name"
                            type="text"
                            ref={nameRef}
                            placeholder="Your name"
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="modal-email">Email</label>
                        <input
                            id="modal-email"
                            type="email"
                            ref={emailRef}
                            placeholder="your@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="modal-message">Message</label>
                        <textarea
                            id="modal-message"
                            ref={msgRef}
                            rows={4}
                            placeholder="Tell us about your situation…"
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn-send">Send message</button>
                        <div className="modal-divider">or</div>
                        <a
                            href={CALENDLY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-book-call"
                        >
                            Book a call
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Build to confirm no errors**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/GetInTouchModal.js
git commit -m "feat: add GetInTouchModal with mailto form and book-a-call link"
```

---

## Task 4: Rewrite `components/sections/Hero.js`

**Files:**
- Rewrite: `components/sections/Hero.js`

- [ ] **Step 1: Replace with the black-canvas centered hero**

```jsx
export default function Hero() {
    return (
        <section id="home" className="hero-section">
            <div className="hero-inner">
                <p className="hero-eyebrow">TBT Advisory</p>
                <h1 className="hero-headline">
                    Commercial advisory<br />
                    <em>&amp; execution.</em>
                </h1>
                <p className="hero-sub">
                    Boutique advisory for high-growth companies and their investors —
                    from strategy to revenue at scale.
                </p>
                <div className="hero-scroll-hint">
                    <div className="hero-scroll-line" />
                    <span>Scroll</span>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Build to confirm no errors**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.js
git commit -m "feat: rewrite Hero section — black canvas, centered headline"
```

---

## Task 5: Create `components/sections/TrackRecord.js`

**Files:**
- Create: `components/sections/TrackRecord.js`

Content is based on Thanh Binh Tran's documented career:
- CCO at Project A (VC/PE, €1B AUM, 100+ portfolio companies including Trade Republic, Sennder, Quantum Systems)
- Founded music+blockchain SaaS (clients: Payday/Steve Aoki/Jay-Z, CRO, Bausa, Lena)
- Head of Business Development at Caroobi (€20M funded automotive marketplace)
- Ran due diligences and scaled commercial strategies from 0 to 250M€+ revenue companies

- [ ] **Step 1: Create the component**

```jsx
const STATS = [
    { number: '€1B+', label: 'Assets under management at Project A' },
    { number: '100+', label: 'Portfolio companies scaled across Europe' },
    { number: '20+', label: 'Commercial strategies built from zero revenue' },
    { number: '250M+', label: 'Peak revenue reached by portfolio companies (€)' },
];

const MILESTONES = [
    {
        tag: 'Venture & Private Equity',
        title: 'Chief Commercial Officer — Project A',
        desc: 'Ran commercial due diligences, sparred founders, and scaled portfolio companies at one of Europe\'s leading VC/PE firms — backers of Trade Republic, Sennder, Quantum Systems, and 100+ others with €1B AUM.',
        meta: 'Berlin · 2020–2024',
    },
    {
        tag: 'Entrepreneurship',
        title: 'Founder — Music & Blockchain SaaS',
        desc: 'Built and scaled a music-tech platform from zero with clients and investors including Payday (label of Steve Aoki & Jay-Z), CRO, Bausa, and Lena. Combined music-industry distribution with blockchain-based rights management.',
        meta: 'Germany · 2017–2020',
    },
    {
        tag: 'Commercial Growth',
        title: 'Head of Business Development — Caroobi',
        desc: 'Drove B2B expansion at Germany\'s funded automotive marketplace, building partnerships and revenue channels from scratch within a company that raised $20M in venture funding.',
        meta: 'Berlin · 2016–2017',
    },
];

export default function TrackRecord() {
    return (
        <section id="track-record" className="track-section">
            <div className="track-inner">
                <p className="section-eyebrow">Track Record</p>
                <h2 className="section-heading">
                    A decade building revenue at the intersection of venture and execution.
                </h2>

                {/* Stats */}
                <div className="stats-row">
                    {STATS.map(({ number, label }) => (
                        <div key={number} className="stat-item">
                            <div className="stat-number">{number}</div>
                            <div className="stat-label">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Milestone cards */}
                <div className="milestones-grid">
                    {MILESTONES.map(({ tag, title, desc, meta }) => (
                        <div key={title} className="milestone-card">
                            <span className="milestone-tag">{tag}</span>
                            <h3 className="milestone-title">{title}</h3>
                            <p className="milestone-desc">{desc}</p>
                            <span className="milestone-meta">{meta}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Build to confirm no errors**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/TrackRecord.js
git commit -m "feat: add TrackRecord section with stats bar and milestone cards"
```

---

## Task 6: Create `components/sections/AboutFirm.js`

**Files:**
- Create: `components/sections/AboutFirm.js`

- [ ] **Step 1: Create the component**

```jsx
const DETAILS = [
    { label: 'Founded', value: '2024, Bonn · Germany' },
    { label: 'Legal entity', value: 'TBT Consulting GmbH' },
    { label: 'Operating as', value: 'TBT Advisory' },
    { label: 'Focus', value: 'Europe — with global reach across VC and PE networks' },
    { label: 'Contact', value: 'tb@tbt-advisory.com' },
];

export default function AboutFirm() {
    return (
        <section id="about" className="about-section">
            <div className="about-inner">
                {/* Left: narrative */}
                <div>
                    <p className="section-eyebrow">About</p>
                    <h2 className="section-heading" style={{ marginBottom: '40px' }}>
                        Where venture-backed insight meets operating discipline.
                    </h2>
                    <div className="about-body">
                        <p>
                            <strong>TBT Advisory</strong> is a boutique commercial advisory firm founded by Thanh Binh Tran.
                            It stems from a simple observation: most high-growth companies know what they want to build —
                            but lack the commercial architecture to scale it reliably.
                        </p>
                        <p>
                            Thanh Binh spent years at the intersection of venture capital and operating reality,
                            sitting on both sides of the table — as a founder navigating early-stage uncertainty,
                            as an operator scaling revenue from zero, and as a CCO at Project A advising 100+ portfolio
                            companies through the hardest commercial inflection points.
                        </p>
                        <p>
                            TBT Advisory distils that experience into a single focused offering: the kind of
                            senior commercial thinking that founders and investors need, without the overhead of a
                            large consulting firm.
                        </p>
                    </div>
                </div>

                {/* Right: detail list */}
                <div className="about-detail-list">
                    {DETAILS.map(({ label, value }) => (
                        <div key={label} className="about-detail-item">
                            <span className="about-detail-label">{label}</span>
                            <span className="about-detail-value">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Build to confirm no errors**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/AboutFirm.js
git commit -m "feat: add AboutFirm section — TBT Advisory narrative and detail list"
```

---

## Task 7: Rewrite `components/sections/Services.js`

**Files:**
- Rewrite: `components/sections/Services.js`

Each service card has a CSS gradient visual panel on top (no external images — stays within CSP) and content below.

- [ ] **Step 1: Replace the file with the new services section**

```jsx
const SERVICES = [
    {
        number: '01',
        title: 'Commercial Strategy & GTM Design',
        desc: 'Define ICP, positioning, pricing, and go-to-market model to create a repeatable revenue engine — built for your specific stage and market.',
        visualClass: 'service-visual-1',
    },
    {
        number: '02',
        title: 'Revenue Organization & Scaling',
        desc: 'Design the sales org, roles, incentives, and playbooks needed to move beyond founder-led sales and scale with predictability.',
        visualClass: 'service-visual-2',
    },
    {
        number: '03',
        title: 'International Expansion (Europe)',
        desc: 'Structure market entry and cross-border rollout to scale revenue across European markets — without fragmentation or wasted headcount.',
        visualClass: 'service-visual-3',
    },
    {
        number: '04',
        title: 'Investor & Board-Level Advisory',
        desc: 'Provide commercial diagnostics, diligence support, and execution-ready plans for investors and boards navigating growth decisions.',
        visualClass: 'service-visual-4',
    },
];

export default function Services() {
    return (
        <section id="services" className="services-section">
            <div className="services-inner">
                <p className="section-eyebrow">Services</p>
                <h2 className="section-heading">
                    Four ways we create commercial value.
                </h2>

                <div className="services-grid">
                    {SERVICES.map(({ number, title, desc, visualClass }) => (
                        <div key={number} className="service-card">
                            <div className={`service-visual ${visualClass}`} />
                            <div className="service-content">
                                <span className="service-number">{number}</span>
                                <h3 className="service-title">{title}</h3>
                                <p className="service-desc">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Build to confirm no errors**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Services.js
git commit -m "feat: rewrite Services section with dark visual cards"
```

---

## Task 8: Create `components/sections/Footer.js`

**Files:**
- Create: `components/sections/Footer.js`

Replaces Imprint. Clean dark footer with three columns: brand+tagline, contact, legal.

- [ ] **Step 1: Create the footer component**

```jsx
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="site-footer">
            <div>
                <div className="footer-inner">
                    {/* Col 1: Brand */}
                    <div>
                        <div>
                            <span className="footer-brand-tbt">TBT</span>
                            {' '}
                            <span className="footer-brand-advisory">Advisory</span>
                        </div>
                        <p className="footer-tagline">
                            Commercial advisory &amp; execution<br />
                            for high-growth companies.
                        </p>
                    </div>

                    {/* Col 2: Contact */}
                    <div>
                        <p className="footer-col-heading">Contact</p>
                        <p className="footer-contact-text">
                            <a href="mailto:tb@tbt-advisory.com">tb@tbt-advisory.com</a><br />
                            Büchelgarten 37<br />
                            53225 Bonn, Germany
                        </p>
                    </div>

                    {/* Col 3: Legal */}
                    <div>
                        <p className="footer-col-heading">Legal</p>
                        <p className="footer-legal">
                            TBT Consulting GmbH<br />
                            Geschäftsführer: Thanh Binh Tran<br />
                            Amtsgericht Berlin-Charlottenburg<br />
                            HRB 218611 B
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <span className="footer-copyright">© {year} TBT Consulting GmbH. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
```

- [ ] **Step 2: Build to confirm no errors**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/Footer.js
git commit -m "feat: add Footer component with contact and legal info"
```

---

## Task 9: Update `app/page.js` and clean up

**Files:**
- Rewrite: `app/page.js`
- Delete: `components/sections/About.js`
- Delete: `components/sections/Edge.js`
- Delete: `components/sections/Imprint.js`

- [ ] **Step 1: Rewrite `app/page.js` to wire modal state and new sections**

```jsx
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import GetInTouchModal from '../components/GetInTouchModal';
import Hero from '../components/sections/Hero';
import TrackRecord from '../components/sections/TrackRecord';
import AboutFirm from '../components/sections/AboutFirm';
import Services from '../components/sections/Services';
import Footer from '../components/sections/Footer';

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Header onGetInTouch={() => setModalOpen(true)} />
            {modalOpen && <GetInTouchModal onClose={() => setModalOpen(false)} />}
            <main>
                <Hero />
                <TrackRecord />
                <AboutFirm />
                <Services />
            </main>
            <Footer />
        </>
    );
}
```

- [ ] **Step 2: Delete the three obsolete section files**

```bash
rm components/sections/About.js components/sections/Edge.js components/sections/Imprint.js
```

- [ ] **Step 3: Run final build to confirm everything compiles**

```bash
npm run build
```
Expected: Compiled successfully, no errors.

- [ ] **Step 4: Run lint**

```bash
npm run lint
```
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire redesigned TBT Advisory site — new sections, modal, dark theme"
```

---

## Self-Review Checklist

### Spec coverage
| Requirement | Task |
|-------------|------|
| Black canvas hero with centered heading | Task 4 |
| "TBT Advisory" logo top left | Task 2 |
| Centered seamless nav bar | Task 2 |
| "Get in touch" CTA top right | Task 2 |
| Contact popup with message + book a call | Task 3 |
| Past work / track record section | Task 5 |
| About section about TBT Advisory firm | Task 6 |
| Services section with 4 pillars + visuals | Task 7 |
| Contact info in footer (not separate section) | Task 8 |
| Dark design system throughout | Task 1 |
| Mobile responsive | Task 1 (responsive CSS) + Task 2 (mobile nav overlay) |
| CSP preserved (no external images) | Tasks 1, 7 (CSS gradients only) |

### Potential issues
- `app/page.js` becomes a client component (`'use client'`) due to `useState`. This is fine for a single-page app; the `metadata` export is already in `layout.js`.
- The `footer-bottom` div wrapping inside `site-footer` needs a flex container — the `.footer-inner` and `.footer-bottom` share the same parent `<div>` inside the `<footer>`. The CSS `.site-footer` is `display: flex; justify-content: center;` so the inner `<div>` needs to be `width: 100%; max-width: var(--content-max-width);`. This is handled by the footer-bottom CSS already targeting `width: 100%; max-width: ...`.

---

## Execution Handoff

Plan saved to `docs/superpowers/plans/2026-04-14-website-redesign.md`.
