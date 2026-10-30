# EMIS — Redesign Concept

Unofficial redesign concept for the website of [EMIS](https://emis.ao) (Empresa Interbancária de Serviços), the company behind Angola's MULTICAIXA network, MULTICAIXA Express, KWiK, STC and RUPE.

This is a personal UI/UX case study. It is not affiliated with or endorsed by EMIS.

## Getting started

Requirements: Node.js 18 or later.

```bash
git clone https://github.com/mariosalembe23/emis-redesign.git
cd emis-redesign
npm install
npm run dev
```

Open the URL that Vite prints (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # type-check and production build into dist/
npm run preview   # serve the production build
```

## Stack

- [React 19](https://react.dev) + TypeScript
- [Vite 6](https://vitejs.dev)
- [Tailwind CSS 4](https://tailwindcss.com) (configured through `@theme` in `src/theme.css`)
- Fonts: Plus Jakarta Sans and JetBrains Mono (Google Fonts)
- Icons: [Glassius](https://glassius.himersus.com), 3D glass icons rendered as inline SVG (`src/lib/icons`)

No UI kit, no animation library: every component and animation is written by hand.

## Project structure

```
src/
├── App.tsx               page composition and section separators
├── theme.css             design tokens, buttons, cards and all keyframes
├── index.css             Tailwind entry
├── angolaDots.ts         dot grid of Angola, one entry per dot with its province
├── assets/               EMIS logo, bank logos, brand images and certification seals
├── lib/icons/            Glassius icon set and SVG renderer
└── components/
    ├── Hero.tsx          navigation, headline and the animated "beam" diagram
    ├── Dashboard.tsx     two dashboard mockups in perspective
    ├── Sections.tsx      partners, about, systems, impact, Angola map, statistics,
    │                     brands, certifications, CTA and footer
    ├── GlassIcon.tsx     Glassius icon tinted to the EMIS palette
    └── ui.tsx            Reveal, Counter, Container and small helpers
```

## How it was built

**Brand.** The palette comes straight from the EMIS logo: navy `#001862` and cyan `#00CCD3`, on a pale `#F7F9FD` background. Every icon is a Glassius glass icon recoloured with those two tones, so the illustrations feel part of the brand rather than a generic set.

**Layout.** Sections are stacked full width and separated by thin hatched bands, with hatched rails framing the page on both sides. The page uses container queries (`@bsm`, `@bmd`, `@blg`, `@bxl`) instead of viewport breakpoints, so it adapts to the width of its container and can be embedded anywhere, including inside a video frame.

**Content.** Figures, product descriptions, partner banks and certifications are taken from the public emis.ao website: 398.431.150 card operations, 16.582.800 KWiK operations, 4.413.110 credit transfers, 20 shareholder banks, PCI DSS / PIN / 3DS and Uptime Institute Tier III. Charts that would need data EMIS does not publish (monthly evolution, channel split, adoption by province) are labelled as illustrative.

**Hero diagram.** The beam is a fixed 1160 × 380 board. Cards are positioned in percentages of that board and the SVG wires are cubic Bézier curves computed from the card edges to three ports on each side of the EMIS tile, so lines and cards always stay aligned. Lines draw in with `stroke-dashoffset` and a dot travels along each wire with SVG `animateMotion`.

**Dashboard mockup.** Built with regular components (KPI cards with sparklines, bar chart, dot matrix, donut, area chart) at a fixed design size, then scaled to the page width with a `ResizeObserver`. Both devices are tilted with CSS 3D transforms and only their upper part is shown.

**Angola map.** A hex dot grid of the country generated from geoBoundaries province shapes. Each dot is coloured by province and pops in with a staggered delay based on its position, so the map draws itself from top to bottom.

**Motion.** All animations are plain CSS keyframes in `theme.css`, staggered through a `--d` custom property set inline (`style={d(120)}`). Sections use a small `Reveal` component built on `IntersectionObserver`; when a section enters the viewport its children rise in, charts draw, bars grow and counters count up. A light sweep (`.shine`) passes over the main tiles and buttons. Everything is disabled under `prefers-reduced-motion`.

## Credits

- Concept, design and development: [Mário Salembe](https://www.linkedin.com/in/mariosalembe/)
- Icons: [Glassius](https://glassius.himersus.com)
- Angola boundaries: [geoBoundaries](https://www.geoboundaries.org) (CC BY 4.0)

## Disclaimer

EMIS, MULTICAIXA, MULTICAIXA Express, KWiK and the bank logos are trademarks of their respective owners and are used here only to illustrate the concept. Do not use this project as an official EMIS website.
