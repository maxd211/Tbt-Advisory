# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Code Operating Rules

**1. Plan First** — Enter plan mode for any task with 3+ steps or architectural decisions. Stop and re-plan if blocked. Write specs before code.

**2. Subagents** — Use liberally to keep main context clean. One focused task per subagent. Offload research, exploration, parallel work.

**3. Self-Improvement** — After any user correction: update `tasks/lessons.md`. Write rules to prevent recurrence. Review at session start.

**4. Verify Before Done** — Never mark complete without proving it works. Ask: *"Would a staff engineer approve this?"*

**5. Demand Elegance** — For non-trivial changes: ask *"is there a more elegant way?"* Skip for simple obvious fixes.

**6. Autonomous Bug Fixing** — Just fix it. No hand-holding. Point at logs/errors/tests and resolve.

**Task flow:** Plan → `tasks/todo.md` → confirm → implement → mark complete → document → `tasks/lessons.md` on corrections.

**Principles:** Simplicity first. Minimal impact. No lazy fixes. Senior standards.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint via Next.js
npm run start    # Serve production build
```

No test suite is configured.

## Architecture

Single-page marketing website for TBT Advisory, built with Next.js (App Router).

**Entry points:**
- [app/layout.js](app/layout.js) — root layout; sets `<html>`, metadata, and loads the Cookiebot consent script via `next/script` with `strategy="beforeInteractive"`
- [app/page.js](app/page.js) — the entire single-page site as one component; sections are `#home`, `#about`, `#edge`, `#services`, `#contact` (Imprint)
- [components/Header.js](components/Header.js) — sticky nav with mobile hamburger overlay; `'use client'` because it uses `useState`

**Styling:**
All styles live in [app/globals.css](app/globals.css) — no CSS modules, no Tailwind. Layout is controlled via CSS custom properties in `:root` (colors, spacing, breakpoints). Responsive breakpoints: tablet ≤1023px, mobile ≤767px, small mobile ≤400px. Section backgrounds alternate between white and light grey using `.band-*` classes.

**Legal entity:** The company name in code is "TBT Consulting GmbH" (imprint/legal) while the brand shown to users is "TBT Advisory".
