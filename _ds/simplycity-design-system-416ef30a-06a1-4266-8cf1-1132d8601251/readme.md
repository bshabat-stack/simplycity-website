# SimplyCity Design System

A design system for **SimplyCity** — a **Local SEO agency for small businesses**. SimplyCity's mission is to *bridge the gap between physical stores and the digital world*: getting shops, clinics, trades and restaurants to the top of Google, Maps and every nearby search, so the customers already looking find them first.

This system encodes SimplyCity's brand (from its official Brand Guidelines) into tokens, reusable React components, foundation specimen cards, and a full marketing-website UI kit — everything needed to design on-brand interfaces and assets.

## Source material

- **SimplyCity Brand Guidelines (PDF)** — the ground truth for logo, colour, typography and voice. Uploaded by the user at `uploads/assets-1782896624527.pdf` (24 pages). Key pages rendered to `scraps/` during setup.
  - Logo lockups extracted to `assets/brand/simplycity-logo-white.png` and `…-black.png`.
- No codebase or Figma file was provided; the marketing-website UI kit is an original, on-brand product surface built from the guidelines (the brand has no existing website in the source).

> **Font note:** The brand typeface is **Montserrat**. The PDF did not ship font binaries, so Montserrat is loaded from **Google Fonts** (`tokens/fonts.css`) — this is the exact brand typeface, not a substitute. To self-host, drop woff2 files in `assets/fonts/` and swap the `@import` for local `@font-face` rules. **Ask the user for licensed font files if self-hosting is required.**

---

## CONTENT FUNDAMENTALS — how SimplyCity writes

**Voice:** confident, plain-spoken, and reassuring. SimplyCity talks to busy small-business owners who are not marketers, so it strips jargon and leads with outcomes (calls, customers, foot traffic) rather than mechanics.

- **Person:** Second person — "**you**", "**your** city", "**your** business". The brand is "**we**" ("we tune your profile"). Warm and direct, never corporate-royal.
- **Tone:** Bold and plain. Short declaratives. Confidence without hype — "Rank #1 where your city is searching", "Simple plans. No lock-in."
- **Casing:** Sentence case everywhere in running copy and headlines. **Eyebrows/kickers are UPPERCASE**, wide-tracked. Buttons are sentence case ("Get a free audit", "Claim your free audit").
- **Numbers as proof:** Concrete metrics carry the message — "3.2× more map calls", "#1 avg. local rank", "640+ local businesses", "18 → 1". Prefer a real number to an adjective.
- **Punctuation:** Periods on headlines are used deliberately for a confident full-stop ("…searching."). Em-dashes for asides. Ampersand "&" is fine in short labels ("Main Street & the web").
- **Emoji:** **None.** The brand is bold and modern, not casual — hierarchy comes from weight and the blue, not decoration.
- **CTA vocabulary:** "Get a free audit" / "Claim your free audit" / "See our results" / "Start with [plan]". The free audit is the primary conversion verb throughout.
- **Sample copy:**
  - Hero: *"Rank #1 where your city is searching."* / *"SimplyCity gets local businesses to the top of Google, Maps and everywhere nearby customers look."*
  - Section intro: *"Everything a local business needs to get found. No jargon, no lock-in. Just the handful of things that actually move you up the local results — done properly, every month."*
  - Reassurance: *"No pitch, no obligation — just where you stand and how to climb."*

---

## VISUAL FOUNDATIONS

The brand is **bold, modern, high-contrast, and deliberately minimal**. One colour does the heavy lifting; weight and the capsule shape carry personality.

- **Colour:** A strict brand palette of **Dark Sky Blue `#4C8BF5`, black and white** — *no gradients, no secondary hues* (per the guidelines). Direction B ("Blue Field") makes the brand blue the dominant surface with white knockout type. A cool neutral **ink** scale and muted functional colours (success/warning/error) are a documented **system extension** for real UI (text, borders, form states) — never used decoratively. See `tokens/colors.css`.
- **Typography:** **Montserrat only.** Weight is the hierarchy — 800/900 for display & headlines (tight `-0.03em` tracking, ~0.98 line-height), 700 for headings, 600/700 for UI, 500 for body (relaxed 1.55). Eyebrows are 800 uppercase at `0.16em` tracking. See `tokens/typography.css`.
- **The capsule motif (signature):** The logo knocks "City" out of a **pill**. That pill (radius `999px`) is repeated everywhere — buttons, badges, nav, and *highlighted words in headlines* (a blue or white capsule around a key word). It's the single most recognisable brand device. See `guidelines/brand-capsule.html`.
- **Backgrounds:** Solid colour fields — brand blue or white, occasionally a very light blue tint (`--surface-subtle`) or near-black ink for footers. **No gradients, no textures, no patterns.** Photography (when used) is clean, warm, real local people & places — never busy stock.
- **Corners & shape:** Cards use a large soft radius (`--radius-xl`, 28px); inputs 16px; anything interactive-and-small is a full capsule. Generous, friendly, never sharp.
- **Cards:** White surface, large radius, **soft cool-tinted shadow** (`--shadow-lg`, blue-black at low opacity) — no hard borders on elevated cards. Outline variant uses a 1px `--border-subtle`. A `--shadow-brand` (blue-cast) is used for the "floating on blue" hero/pricing cards.
- **Shadows:** Soft and diffuse, always cool-tinted (`rgba(20,30,60,…)`), never black-harsh. Elevation ramps sm → md → lg → xl, plus the brand-cast float.
- **Borders:** Hairlines are `--border-hairline` (very light). Emphasis outlines (ghost buttons) are **2px** (`--bw-strong`). Focus rings are a 4px soft blue glow.
- **Animation:** Restrained and quick. `--ease-out` (cubic-bezier(.22,1,.36,1)), 120–360ms. Fades and short translate-ups; no bounces, no infinite loops. Nav fades from transparent to frosted-white on scroll.
- **Hover states:** Actions **darken** (blue 500 → 600); cards **lift** (`translateY(-4px)` + stronger shadow); ghost outlines **strengthen** to full ink/white.
- **Press states:** Slight **shrink** (`--press-scale: 0.97`) plus a further darken (blue 700).
- **Transparency & blur:** Used sparingly — the scrolled nav uses `backdrop-filter: blur` over translucent white; the audit modal dims with a translucent ink scrim + light blur. Overlays on the blue use low-opacity white fills (`rgba(255,255,255,.16)`) for badges/ghost buttons.
- **Layout:** 1200px content column, 40px desktop gutters, ~112px vertical section rhythm. Sticky nav. 4px spacing base grid.
- **Imagery vibe:** Warm, clear, real, friendly — subject-forward, uncluttered. See `guidelines/brand-photography.html`.

---

## ICONOGRAPHY

The brand guidelines do not ship a proprietary icon set. This system standardises on **[Lucide](https://lucide.dev)** — an open, MIT-licensed line-icon set whose **clean, rounded, medium-stroke** style matches SimplyCity's friendly-but-modern personality.

- **Style:** Line icons, ~2px stroke, rounded caps/joins. Sized 18–24px in UI, drawn in `currentColor` so they inherit brand blue or ink.
- **How it's loaded:** Via CDN — `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>` — then `lucide.createIcons()`. In React surfaces the `Icon` helper (`ui_kits/website/shared.jsx`) renders `<i data-lucide="name">`.
- **Common glyphs:** `map-pin`, `search`, `star`, `trending-up`, `bar-chart-3`, `check`, `arrow-right`, `store`, `mail`, `phone`.
- **Emoji / unicode as icons:** **Not used.** (The specimen cards use a couple of ✓/✕ marks purely as inline do/don't indicators — not part of the product UI.)
- **Substitution flag:** Lucide is a substitution for a brand-specific set the guidelines don't define. If SimplyCity adopts an official icon library, replace the CDN link and the `Icon` helper. Note: some social/brand glyphs (facebook/instagram/linkedin) are **not** in the current Lucide build — the footer uses `mail`/`phone`/`map-pin` instead.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (import-only). Consumers link this one file.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `readme.md` — this file. `SKILL.md` — Agent-Skill wrapper.
- `_ds_bundle.js` / `_ds_manifest.json` — **generated by the compiler**; do not edit.

**Components** (`components/…`) — React primitives. Namespace: `window.SimplyCityDesignSystem_416ef3`.
- `core/` — **Button**, **Badge**, **Eyebrow**, **Logo**, **Card**, **Stat**, **Avatar**
- `forms/` — **Input**
- `content/` — **Accordion**
- Each has `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`; each dir has a `*.card.html` showcase.

**Foundation cards** (`guidelines/*.html`) — specimen cards for the Design System tab:
- Colors: Brand Blue, Neutrals, Functional
- Type: Display, Headings, Body & Lead, Weights & Eyebrow
- Spacing: Spacing Scale, Radii & Capsule, Elevation
- Brand: Logo — White, Logo — Black, Logo — Misuse, Capsule Motif, Photography

**UI kit** (`ui_kits/website/`) — the SimplyCity marketing site (interactive).
- `index.html` (entry), `shared.jsx`, `NavBar.jsx`, `Hero.jsx`, `Services.jsx`, `Results.jsx`, `Pricing.jsx`, `Faq.jsx`, `CtaFooter.jsx`, `app.jsx` (compose + audit modal).
- Sections: sticky nav → blue hero + live rank card → trust strip → services → results/case-study/testimonials → pricing (monthly/annual toggle) → FAQ → CTA band → footer. The "Get a free audit" buttons open a working modal.

**Assets** (`assets/brand/`) — `simplycity-logo-white.png`, `simplycity-logo-black.png`.
