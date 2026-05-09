# Handoff: Horizonstone Technology — Marketing Site Redesign

## Overview
This is a complete redesign of `horizonstonetech.com` — a one-page marketing site for an AI engineering studio that builds custom AI agents, automations, and software for small and mid-sized teams. The redesign moves the brand from a generic WordPress template to a modern, editorial, product-grade marketing site.

## About the Design Files
The files in `design/` are **design references created in HTML/JSX** — a working prototype showing intended look, behavior, and interaction. They are **not production code to copy directly**.

Your task is to **recreate these designs in the target codebase's environment** using its established patterns and libraries. Recommended stacks:

- **Next.js 14+ (App Router) + Tailwind CSS** — best fit; the design is content-heavy with no client state beyond a theme toggle, so RSC + minimal client islands is ideal
- **Astro** — also great for a marketing site like this; ship near-zero JS by default
- **Plain Vite + React** — fine if the rest of the company already runs on it

If no codebase exists yet, **start a fresh Next.js + Tailwind + TypeScript project**. Deploy to Vercel.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are decided. Recreate pixel-perfect using the target stack's primitives.

## Brand
- **Name**: Horizonstone Technology Inc.
- **Tagline**: "Empowering small business with AI"
- **Logo**: stone-on-horizon glyph (faceted hex sitting atop a horizon bar) with a small accent node on the stone reading as a connection point / signal. SVG source is in `design/sections.jsx` → `Logomark` component. Copy verbatim.
- **Voice**: practical, senior, no-hype. "We build the AI systems that actually ship." Not "transform your business with cutting-edge AI."

## Page Structure (single long-scroll homepage)

### 1. Nav (fixed, top)
- Logomark + "Horizonstone" wordmark (left)
- Links: Services, Process, Work, About (center-right)
- Primary CTA "Book a call" (right, accent-colored button)
- **Behavior**: transparent on top of page; on scroll past 30px, gains `backdrop-filter: blur(20px) saturate(140%)`, semi-opaque bg, and a 1px bottom border. 220ms ease transition.

### 2. Hero
- **Layout**: 2-column grid `1.4fr 1fr`, gap 80px, items aligned to bottom of grid row.
- **Left column**:
  - Eyebrow: mono uppercase "AI ENGINEERING — EST. VANCOUVER, BC" with a 22×1px accent rule before the text
  - H1 (display serif): "Practical AI / for businesses / *ready to grow.*" — last line italic, accent color. `clamp(56px, 8vw, 124px)`, line-height 0.96, letter-spacing -0.02em
  - Subhead (~19px, ink-2): "Horizonstone is a small AI engineering studio. We build custom agents, automations, and AI-powered software for small and mid-sized teams — fixed scope, senior engineers, code you own."
  - Two CTAs: primary "Book a discovery call" + ghost "See how we work"
- **Right column** — `HeroVisual` component, an aspect-1:1.1 framed panel containing:
  - Corner accent ticks (4 corners, 8×8px, accent-color L-shapes)
  - Header strip: mono "// LIVE.AGENT" left, mono "● ACTIVE" accent-colored right, separated by 1px line below
  - Mock terminal output (mono 12px, ink-2/ink-3 for prompt vs response, accent for ✓ success line)
  - Inline SVG line chart (300×80 viewBox) with accent gradient fill, 1.5px stroke, dot markers at each data point. Caption: "Tickets resolved / day · +312% in 30d"
  - Bottom strip with two stat blocks: "HOURS SAVED / WEEK" → `42.` (56px serif, period in accent) and "UPTIME" → `99.97%`
- **Marquee row** at bottom of section: top-bordered, mono uppercase, "Trusted by SMB teams across" + sectors (Healthcare · Professional Services · E-commerce · Logistics · SaaS)

### 3. Services (`#services`)
- **Section label**: "§ 01 — SERVICES" (mono, 12px, accent-colored §, bottom-bordered)
- **Header row**: 2-column grid `1fr 1.6fr`. Left: H2 serif "Four things / we do *well.*" Right: 18px paragraph "We don't sell models. We sell working systems — built specifically for your team, deployed in your environment, and priced before we start."
- **Grid**: 2×2 of service cards, hairline 1px borders between cards (border-collapse style — top+left border on container, right+bottom on each cell). Each card 44px×40px padding, min-height 360px, flex column gap 24px.
  - Card head row: mono "01" (accent) left, mono "FIXED-PRICE" (ink-3) right
  - Title (serif 36px)
  - Body (15px ink-2)
  - 2-column item list at bottom, each item with a 4×4 accent square bullet
- **Service content** — copy exactly:
  1. **Custom AI Agents** — "Internal copilots, customer-facing chat, agentic workflows. Built on your data, scoped to your processes — not a generic wrapper around an API." Items: Retrieval over your docs · Multi-step reasoning · Tool & API integration · Human-in-the-loop
  2. **Process Automation** — "Document processing, data extraction, system-to-system integration. Replace the boring spreadsheet work that's eating your team's week." Items: Invoice & form extraction · CRM/ERP sync · Email & ticket triage · Reporting pipelines
  3. **AI-Powered Software** — "Full-stack web applications with AI woven into the core flow — not bolted on. Production-ready, security-reviewed, owned by you." Items: Custom dashboards · Internal tools · Customer portals · Mobile-ready PWAs
  4. **Strategy & Audit** — "Two weeks. We sit with your team, map your bottlenecks, and tell you where AI actually helps — and where it doesn't." Items: Workflow mapping · Tooling assessment · ROI projections · Implementation roadmap

### 4. Process (`#process`)
- Section label "§ 02 — HOW WE WORK"
- H2: "From "we should look into AI" / to *shipping in 8 weeks.*"
- **Timeline**: 4-column horizontal grid. Each step has:
  - 1px top border (line-2)
  - 9×9 circle dot at top-left, offset -5px above the border, accent-colored
  - Top mono row: step number left ("01"), week range right ("Week 0")
  - Title (serif 40px)
  - Body (14px ink-2)
  - Footer with dashed top border, mono "↳ Free / Proposal / Working software / Warranty + handoff" (accent)
- **Steps**: Discover (Week 0, Free) · Scope (Week 1, Proposal) · Build (Weeks 2–8, Working software) · Support (Week 8+, Warranty + handoff)

### 5. Selected Work (`#work`)
- Section label "§ 03 — SELECTED WORK"
- Header: H2 "Real systems, / *real numbers.*" + small mono note "Client names withheld under NDA. Metrics measured 30–90 days post-launch."
- **Case rows**: stacked links, each a 5-column grid `120px 1.4fr 2fr 200px 30px`, 44px vertical padding, hairline border between rows. On hover: subtle accent tint background (6% accent), arrow shifts +4px right and turns accent-colored. 200ms ease.
  - Col 1: sector label (mono accent uppercase)
  - Col 2: client name (mono ink-3) + title (serif 28px)
  - Col 3: body paragraph (14px ink-2)
  - Col 4: metric (serif 48px) + metricLabel (mono 11px ink-3 uppercase), right-aligned
  - Col 5: arrow "→" (22px)
- **Cases** (placeholders — replace with real ones):
  1. Healthcare · Multi-location dental group · "Voice-AI appointment confirmation" · 84% fewer no-shows
  2. Professional Services · Regional accounting firm · "Document intake & classification" · 12hrs saved per week
  3. E-commerce · DTC home goods brand · "Tier-1 support copilot" · +34% support response speed

### 6. Approach (`#about`)
- Section label "§ 04 — THE APPROACH"
- 2-column grid `1fr 1.4fr`. Left: sticky H2 "Four / *commitments.*" + subhead. Right: 4 stacked principle blocks.
- Each principle block: 2-col grid `60px 1fr`, gap 24px, top hairline.
  - Roman numeral (serif italic 28px, accent)
  - Title (serif 30px) + body (15px ink-2)
- **Principles**: I. No juniors on your project · II. Fixed scope, fixed price · III. You own everything · IV. Boring tech where boring works

### 7. CTA (`#contact`)
- Top hairline border
- Radial accent glow at top-center (14% accent → transparent)
- Centered eyebrow "READY WHEN YOU ARE"
- H2 (huge): "Tell us where the / *bottleneck is.*" — `clamp(56px, 8vw, 120px)`
- Centered subhead
- Two CTAs centered: `mailto:hello@horizonstonetech.com` primary + ghost "Book a 30-min call"

### 8. Footer
- 4-column grid `1.5fr 1fr 1fr 1fr`. Cols: brand block (logo+tagline) · Services links · Company links · Contact info
- Bottom row: copyright left + "Crafted in Vancouver · Shipping worldwide" right (mono uppercase)

## Design Tokens

### Colors (CSS custom properties)
The site supports 5 palettes via a Tweaks panel. Default is **Glacier**. Each palette is `[bg, ink, accent]`; secondary inks are derived from `ink` + alpha.

| Palette | bg | ink | accent |
|---|---|---|---|
| **Glacier** (default) | `#F4F6F8` | `#0F1B2D` | `#3D6B8C` |
| Slate + Teal | `#EEF1F5` | `#101820` | `#0E7C7B` |
| Mist + Steel | `#F2F4F7` | `#1A2433` | `#5A7A99` |
| Deep Navy + Ice | `#0B1220` | `#E6ECF2` | `#6FA8DC` |
| Graphite + Seafoam | `#0E1418` | `#DCE3EA` | `#7AB8B3` |

Derived tokens (apply per palette via JS at runtime; see `app.jsx`):
- `--ink-2` = `ink` + alpha `0xC2` on light themes, `0xB0` on dark
- `--ink-3` = `ink` + alpha `0x80` on light, `0x60` on dark
- `--line` = `ink` + `0x22` light / `0x1A` dark
- `--line-2` = `ink` + `0x38` light / `0x2E` dark
- Tinted backgrounds use `color-mix(in oklab, var(--accent) X%, transparent)`

Light/dark detection: relative luminance of `bg` > 160.

### Typography
- **Display serif**: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) — used for H1/H2/H3, italics often colored with `--accent`
- **Sans (body)**: [Geist](https://fonts.google.com/specimen/Geist), weights 300/400/500/600
- **Mono**: [Geist Mono](https://fonts.google.com/specimen/Geist+Mono), weights 400/500
- Hierarchy:
  - H1 hero: `clamp(56px, 8vw, 124px)`, line-height 0.96, letter-spacing -0.02em
  - H2 section: `clamp(40px, 5vw, 72px)`, line-height 1.0, letter-spacing -0.02em
  - H2 CTA: `clamp(56px, 8vw, 120px)`, letter-spacing -0.025em
  - H3 service card: 36px serif
  - H3 process step: 40px serif
  - H3 case row: 28px serif
  - H3 principle: 30px serif
  - Body lead: 19px / line-height 1.55
  - Body: 15-16px / line-height 1.6
  - Small/mono labels: 11-12px, letter-spacing 0.10–0.14em, uppercase
- ::selection: `bg: var(--accent)`, `color: var(--bg)`

### Spacing
- Section vertical padding: 140px top / 80–100px bottom
- Container max-width: 1280px, horizontal padding 32px
- Card padding: 44px×40px
- Standard gap: 24/32/40/60/80px scale

### Borders & Shapes
- All borders are hairline (1px), color from `--line` or `--line-2`
- **No border-radius anywhere** — flat, editorial. Buttons, cards, panels are all sharp-cornered.
- Dashed dividers used only for in-card sub-dividers (process step deliverable footer)

### Effects
- Body has fixed background: dual radial accent gradients top-right and mid-left (22% + 8% accent in oklab → transparent)
- Body grain overlay: SVG fractalNoise filter, 3.5% opacity, mix-blend-mode: overlay, fixed-positioned, pointer-events none, z-index 1
- All transitions: 180–220ms ease

## Interactions
- Nav blur on scroll (>30px)
- Case row hover: bg tint + arrow translate + arrow color
- Button hover: (none defined currently — add subtle lighten)
- Theme palette switcher: lives in a Tweaks panel during design, but in production should be either (a) removed entirely (ship the default Glacier palette), or (b) implemented as a discreet theme toggle in the footer if you want users to choose
- All section IDs allow anchor navigation from nav links

## State Management
None beyond a single nav scroll state. The "live agent" terminal in the hero is purely decorative (a `setInterval` updating an unused tick state — can be removed in production unless you want to wire it to a real demo).

## Assets
- Fonts: Google Fonts (Instrument Serif, Geist, Geist Mono)
- Logomark: SVG, inline, 52×32 viewBox. See `Logomark` in `sections.jsx`.
- No external images — every visual is HTML/CSS/SVG. Hero chart is hand-coded SVG; replace with real telemetry if you wire up a live demo.

## Production Recommendations
1. **Remove the Tweaks panel entirely** — it's a design-time tool. Ship the default palette only, or surface a single light/dark toggle.
2. **Replace placeholder content**: the case study client names ("Multi-location dental group" etc.) and metrics ("84% fewer no-shows" etc.) are illustrative — substitute real ones (anonymized if needed).
3. **Wire CTAs**: `mailto:hello@horizonstonetech.com` is a placeholder; confirm the real email. The "Book a 30-min call" buttons should link to a real Cal.com / SavvyCal / Calendly URL.
4. **SEO**: add real `<meta>` description, OG image, JSON-LD `Organization` schema.
5. **Accessibility**: H1 is the page title — keep it. Verify contrast on light palette (Glacier passes AA at 12.4:1 for ink, 4.7:1 for accent on `bg`).
6. **Performance**: preload Instrument Serif since it's above-the-fold. Tree-shake the unused tick interval in `HeroVisual` for production. The radial gradient + grain combo is GPU-cheap, no concerns.
7. **Mobile**: the design is desktop-first as drafted. Add breakpoints — collapse 2-column grids to single column under 900px, reduce H1 sizes via the existing `clamp()` (already partly responsive), stack the case row grid into a vertical card layout under 768px.

## Files
- `design/index.html` — entry point + global CSS variables, font imports, body backgrounds
- `design/app.jsx` — root component, palette runtime swap, Tweaks panel wiring
- `design/sections.jsx` — all section components (Nav, Hero, HeroVisual, Services, Process, Cases, Approach, CTA, Footer) + `Logomark`, `Button`, `Eyebrow`, `SectionLabel`, `Container`
- `design/tweaks-panel.jsx` — design-time tool, **do not port to production**
