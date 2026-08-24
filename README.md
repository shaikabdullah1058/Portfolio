# Devfolio — Shaik Mohammad Abdullah

A full-stack developer portfolio built with Next.js 14 (App Router), Tailwind CSS,
and Framer Motion, in a strict black/white/zinc monochrome design system.

## Features
- Sticky translucent header with Cmd+K command palette (search sections, copy email, open GitHub, download resume, toggle theme)
- Animated hero with live IST clock and availability status pill
- Projects showcase: grid/list view toggle, category filters, sliding case-study drawer
- Interactive collapsible experience timeline + education
- Searchable skills matrix grouped by stack layer
- Contact form with client + server-side validation, toast notifications, one-click email copy, and a working `/api/contact` route
- Full dark mode (persisted to localStorage, respects system preference)
- No custom cursor — standard browser cursors preserved throughout
- Respects `prefers-reduced-motion`; visible focus rings; mobile-first responsive layout

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy lives in `/data`:
- `data/projects.js` — project cards & case studies
- `data/experience.js` — work history & education
- `data/skills.js` — skills matrix

Update `lib/utils.js` for social links, and drop your real resume at `public/resume.pdf`.

## Wiring up the contact form

`app/api/contact/route.js` currently logs submissions to the server console.
Swap in an email provider (Resend, Postmark, SendGrid) or a database call there.

## Deploy

Optimized for Vercel:

```bash
vercel deploy
```
