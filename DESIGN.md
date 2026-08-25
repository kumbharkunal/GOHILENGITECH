# DESIGN.md

Design specification for the Gohil's Group marketing site.

**Every colour, size, weight, radius, duration and easing value in the codebase must trace back to this file.** If a value is not here, it does not go in the code.

Written before any component, per the `web-design` skill Phase B. Audited against `design-taste-frontend` section 14 before ship.

---

## 0. Provenance of this spec

Nothing here is invented. Every brand value was sampled or measured from the client's own artwork in `client-assets/`:

| Value | How it was obtained |
|---|---|
| All six brand hexes | Median of a clean pixel patch from images 1, 2 and 3 |
| Seam angle `38.1deg` | Linear fit across 38 sampled rows of image 2, slope 0.784, residual under 1px |
| Every contrast ratio | Computed WCAG 2.1 relative luminance, not estimated by eye |
| Type direction | Traced from the client's own Eurostile Extended style wordmark |
| Machine colour split | Sorted every product photograph in images 1, 3, 4, 5 and 6 by hue |

---

## 1. Visual Theme and Atmosphere

### 1.1 The design read

> This is a **counter and catalogue** site for **two Rajkot firms, one that builds machines in orange steel and one that supplies drives in blue castings**, whose single job is **to put Shailesh's or Kishan's number under a plant engineer's thumb inside 60 seconds.**

"Counter" is literal. In Gujarati B2B the shop counter on Dhebar Road is where the transaction happens. This site is that counter extended, not a brochure and not a portfolio.

### 1.2 Atmosphere keywords

`machined` · `rationed` · `ex-stock` · `plain-spoken` · `load-bearing`

Not: sleek, premium, elevated, immersive, crafted.

### 1.3 The organising idea

Every product Gohil **manufactures** is painted orange. Every product Gohil **distributes** is blue or grey casting. That is observable in their own photographs and it maps exactly onto the two divisions.

```
ORANGE  =  Gohil Engitech Co.     =  we build it
STEEL   =  Gohil Industrial Co.   =  we supply it
```

Colour is therefore a **taxonomy, not a decoration**. Orange appears where the subject is something Gohil makes. This is what "ration the orange" means here: not a percentage budget, a semantic rule.

### 1.4 Dial settings

Declared explicitly per `design-taste-frontend` section 1.

| Dial | Value | Reasoning |
|---|---|---|
| `DESIGN_VARIANCE` | **7 / 10** | One strong structural idea (the seam) carried the whole way. Everything else is disciplined and quiet. Not 9, because a purchasing engineer needs to find a phone number, not admire a website. |
| `MOTION_INTENSITY` | **5 / 10** | Scroll-driven seam, restrained section reveals, one marquee. No pins, no cursor effects, no scroll hijack beyond Lenis smoothing. Reduced-motion support is mandatory at this level. |
| `VISUAL_DENSITY` | **6 / 10** | Spec tables and product lists are genuinely dense because buyers want data. Hero and section headers are open. |

**Interaction tier: L2+** (scroll reveal, scrub-driven background, navigation state change). Not L3: no section pinning, no cursor tracking, no page transitions.

---

## 2. Colour Palette and Roles

### 2.1 Tokens

Defined once in `src/styles/globals.css` under Tailwind v4 `@theme`. RGB triplets are provided for `rgb(... / alpha)` usage.

```css
@theme {
  /* Brand, sampled from client artwork */
  --color-orange:        #E8500C;  /* rgb(232 80 12)   */
  --color-orange-text:   #BC410A;  /* rgb(188 65 10)   derived for AA body on light */
  --color-ember:         #F8844C;  /* rgb(248 132 76)  */
  --color-graphite:      #646668;  /* rgb(100 102 104) */
  --color-steel:         #97989A;  /* rgb(151 152 154) */
  --color-mist:          #EAEBED;  /* rgb(234 235 237) */
  --color-ink:           #0E1012;  /* rgb(14 16 18)    */

  /* Reversed panel surfaces. Used by the ink sections and the footer,
     which are the only inversions on an otherwise light site. */
  --color-surface:       #16191C;  /* rgb(22 25 28)    */
  --color-surface-2:     #1E2226;  /* rgb(30 34 38)    */

  /* Machine colours, sampled from the product photography */
  --color-machine-blue:      #4080C0;  /* rgb(64 128 192)  */
  --color-machine-blue-text: #366DA4;  /* rgb(54 109 164)  derived for AA body on light */
  --color-machine-blue-deep: #004068;  /* rgb(0 64 104)    */
  --color-machine-teal:      #0E7C7B;  /* rgb(14 124 123)  */
}
```

### 2.2 Semantic roles

| Semantic token | Value |
|---|---|
| `--bg-page` | `mist` |
| `--bg-surface` | `#FFFFFF` |
| `--bg-surface-raised` | `#FFFFFF` |
| `--bg-inverted` | `ink` |
| `--text-primary` | `ink` |
| `--text-secondary` | `graphite` |
| `--text-accent` | `orange-text` |
| `--text-inverted` | `mist` |
| `--border-hairline` | `steel` at 45% |
| `--border-strong` | `graphite` |
| `--focus-ring` | `orange` |
| `--field-build` | `orange` |
| `--field-supply` | `steel` |

### 2.3 Verified contrast matrix

Computed, not estimated. WCAG 2.1. AA body needs 4.5:1, AA large (18.66px bold or 24px regular and above) needs 3.0:1.

**Light mode, ground `mist #EAEBED`**

| Foreground | Ratio | Verdict | Permitted use |
|---|---|---|---|
| `ink` | **15.98:1** | AAA | Headings, body, any size |
| `graphite` | **4.83:1** | AA body | Secondary text, any size |
| `orange-text` | **4.52:1** | AA body | Small accent text, links, markers |
| `orange-text` on white | **5.39:1** | AA body | Same, on white surfaces |
| `orange` | **3.15:1** | AA large only | Headlines 24px and up, icons, borders, fills |
| `ink` on `orange` fill | **5.07:1** | AA body | **The primary button** |
| `machine-teal` | 4.20:1 | AA large | Diagram accents only |
| `machine-blue` | 3.47:1 | AA large | Diagram accents only |
| `machine-blue-text` | **4.54:1** | AA body | Machine-blue text on light |
| `verified` (teal, darkened) | **4.55:1** | AA body | The `/audit` verified status |
| `steel` | **2.42:1** | **FAIL** | **Strokes and dividers only. Never text.** |
| white on `whatsapp #198845` | **4.52:1** | AA body | The WhatsApp button label |
| white on `whatsapp` as first specced `#1FA855` | **3.09:1** | **FAIL** | Shipped for a while. See 4.3. |
| `steel` on `ink` | **6.60:1** | AA body | Secondary text inside an `on-ink` section |

### 2.4 Rules that fall out of the matrix

1. **The primary CTA is orange fill with an ink label, never white.** White on orange is 3.76:1 and fails AA. Ink on orange is 5.07:1 and passes. It also reads like a machine nameplate, which is the correct register.
2. **`steel` is a stroke token, never a text token on light.** At 2.42:1 on `mist` it fails outright. A component that sets text in `steel` on the page ground is a bug. It is still used freely for hairlines, dividers and the dashed ring in the loader, and it is a legitimate secondary text colour **inside an `on-ink` section**, where it measures 6.60:1. That exception is why the footer is correct and why `/audit` was not: the audit page set an `h2` in `steel` on the light ground and shipped at 2.42:1 until the sweep in `scripts/contrast.mjs` caught it.

   This rule has now been broken twice by me, which means stating it is not enough. `npm run contrast` walks one URL per template and fails the build if any of them regress. Prefer that over discipline.
3. **Small orange text uses `orange-text`, never `orange`.** `orange` is reserved for fills, borders, icons and headlines 24px and above.
4. **`ember` is fill-only** (2.50:1 on white). It never carries text.
5. **Machine colours never carry body copy on light.** They exist to make the product photography sit naturally in the palette and to colour technical diagrams.

### 2.5 Colour consistency lock

One accent colour, `orange`, used identically in every section. The machine colours are diagram-only and never become a second accent. There is no third colour.

---

## 3. Typography

### 3.1 Families

| Role | Family | Fallback stack | Why this face for this brief |
|---|---|---|---|
| Display | **Anybody** var `wght 100-900`, `wdth 50-150` | `'Anybody', 'Arial Narrow', system-ui, sans-serif` | Set at `wdth 125-150` it echoes the client's own Eurostile Extended wordmark. The variable width axis lets the display face physically compress and expand, which is a typographic echo of gear reduction. |
| Body and UI | **IBM Plex Sans** | `'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', sans-serif` | Commissioned by an engineering company. Holds up at 16px on a cheap Android panel. Carries Devanagari and Gujarati if the site is ever localised. |
| Data | **IBM Plex Mono** | `'IBM Plex Mono', ui-monospace, 'Cascadia Mono', Consolas, monospace` | Ratios, kW, HP, RPM, torque, model codes, HSN. Real gearbox datasheets are set in mono. Using it here is honest to the document the buyer already reads. |

Loaded with `next/font/google`, subset `latin`, `display: 'swap'`, exposed as CSS variables. Only the display face used in the hero is preloaded.

**Forbidden faces:** Inter (AI default), Fraunces, Instrument Serif, Michroma, Orbitron, any script face. No serif anywhere: this is an engineering supplier, not a publication.

### 3.2 Scale

Fluid between 360px and 1440px viewport. Ratio approximately 1.25 at mobile and 1.333 at desktop.

| Token | Family | Weight | Width | Size `clamp()` | Line height | Tracking |
|---|---|---|---|---|---|---|
| `display` | Anybody | 800 | 140 | `clamp(2.5rem, 1.833rem + 2.963vw, 4.5rem)` | 0.94 | `-0.02em` |
| `h1` | Anybody | 750 | 130 | `clamp(2.125rem, 1.667rem + 2.037vw, 3.5rem)` | 1.02 | `-0.015em` |
| `h2` | Anybody | 700 | 125 | `clamp(1.625rem, 1.417rem + 0.926vw, 2.25rem)` | 1.10 | `-0.01em` |
| `h3` | IBM Plex Sans | 600 | n/a | `clamp(1.25rem, 1.167rem + 0.370vw, 1.5rem)` | 1.25 | `-0.005em` |
| `body-l` | IBM Plex Sans | 400 | n/a | `clamp(1.125rem, 1.083rem + 0.185vw, 1.25rem)` | 1.55 | `0` |
| `body` | IBM Plex Sans | 400 | n/a | `clamp(1rem, 0.979rem + 0.093vw, 1.0625rem)` | 1.60 | `0` |
| `caption` | IBM Plex Sans | 500 | n/a | `clamp(0.8125rem, 0.792rem + 0.093vw, 0.875rem)` | 1.45 | `0.01em` |
| `micro` | IBM Plex Mono | 500 | n/a | `0.75rem` | 1.35 | `0.06em` |
| `data` | IBM Plex Mono | 400 | n/a | `clamp(0.875rem, 0.854rem + 0.093vw, 0.9375rem)` | 1.5 | `0.01em` |

**Body text never goes below 16px.** This prevents iOS zoom-on-focus and is a hard floor.

### 3.3 Type rules

- `display` and `h1` are Anybody. `h3` and below are IBM Plex Sans. `h2` is the hinge and stays Anybody.
- Anybody is **never** used below 20px. Its wide setting becomes illegible at small sizes.
- Anybody is **never** used to set the company wordmark. The wordmark is vector art in `public/brand/`.
- Any number with a unit (`2.2 kW`, `1440 rpm`, `i = 1:40`, `24 in`) is set in `data` or `micro`, in mono, always.
- One `h1` per page. Real heading hierarchy, never skipping a level for visual reasons.
- No gradient text. No text shadows. No line-broken and italicised headlines.
- Maximum measure for body copy: `68ch`.

### 3.4 Text decoration decision

Per the `web-design` skill's text-decoration decision table, evaluated per level:

| Level | Gradient | Shadow | Verdict |
|---|---|---|---|
| `display` | No | No | Sits on a two-colour field. Any treatment would fight the seam. |
| `h1`, `h2` | No | No | Hierarchy comes from weight, width and colour, not effects. |

The palette has one saturated colour. A gradient would require inventing a second, which breaks the colour consistency lock.

---

## 4. Component Stylings

Every component lists **all five states**. A component shipped without a `focus-visible` state is incomplete.

### 4.1 Button, primary

Machine nameplate. Orange plate, ink label.

| State | Spec |
|---|---|
| default | `bg: orange` · `color: ink` · `border: 1px solid orange` · `radius: --r-sm` · `padding: 14px 22px` · `font: body, 600` · `letter-spacing: 0.01em` |
| hover | `bg: #D1480B` (orange darkened 8%) · no transform · `transition: background 180ms ease-out` |
| active | `bg: #BC410A` · `transform: translateY(1px)` |
| focus-visible | `outline: 2px solid ink` · `outline-offset: 2px` (ink ring on orange gives 5.07:1) |
| disabled | `bg: steel/35` · `color: graphite` · `cursor: not-allowed` · no hover |

Inside a reversed `ink` panel: `bg: ember`, `color: ink`, focus ring `ink`. `ember` on `ink` is 7.62:1.

### 4.2 Button, secondary

| State | Spec |
|---|---|
| default | `bg: transparent` · `color: ink` · `border: 1px solid graphite` · `radius: --r-sm` · same padding |
| hover | `border-color: ink` · `bg: ink/4` |
| active | `bg: ink/8` |
| focus-visible | `outline: 2px solid orange` · `outline-offset: 2px` |
| disabled | `color: steel` · `border-color: steel/40` |

### 4.3 Button, WhatsApp

Deliberately distinct because it carries the entire conversion path. Recognisably WhatsApp green, but darkened until it is legible.

**This spec was wrong once and it is worth recording why.** It originally called for `#1FA855`, claiming 4.52:1 with white. The real figure is **3.09:1**, which fails AA outright, and the button shipped that way on every page until Lighthouse caught it. WhatsApp's own brand green `#25D366` is worse still at 1.98:1. Do not lighten this token back toward the brand colour without recomputing: white text needs a much darker green than the brand palette provides.

| State | Spec |
|---|---|
| default | `bg: #198845` · `color: #FFFFFF` (4.52:1, AA body) · `radius: --r-sm` · leading lucide `MessageCircle` icon at `1em` |
| hover | `bg: #16783D` |
| active | `translateY(1px)` |
| focus-visible | `outline: 2px solid ink` · `outline-offset: 2px` |
| disabled | not applicable, this button is never disabled |

### 4.4 Text input, select, textarea

| State | Spec |
|---|---|
| default | `bg: #FFFFFF` · `color: ink` · `border: 1px solid steel/60` · `radius: --r-sm` · `padding: 12px 14px` · `font-size: 16px` minimum |
| hover | `border-color: graphite` |
| focus-visible | `border-color: orange` · `outline: 2px solid orange/35` · `outline-offset: 0` |
| disabled | `bg: mist` · `color: graphite` · `border-color: steel/35` |
| error | `border-color: #B3261E` · message below in `caption`, colour `#B3261E` (5.36:1 on white) |

Placeholder colour `graphite` (4.83:1). Never `steel`: it fails.
Labels are always visible, never placeholder-only.

### 4.5 Product chip

The unit that carries the real cut-out photography at its native size.

| State | Spec |
|---|---|
| default | `bg: #FFFFFF` · `border: 1px solid steel/40` · `radius: --r-md` · image `object-fit: contain`, padded 12px |
| hover | `border-color: orange` · `transform: scale(1.02)` · `transition: 250ms power2.out` |
| active / tap | `transform: scale(0.99)` |
| focus-visible | `outline: 2px solid orange` · `outline-offset: 2px` |
| disabled | not applicable |

On touch devices the hover state is suppressed entirely via `@media (hover: hover)`.

### 4.6 Spec table

| Element | Spec |
|---|---|
| container | no outer border |
| row | `border-bottom: 1px solid steel/30` only. **Never both top and bottom borders.** |
| last row | no bottom border |
| label cell | `caption`, `graphite`, left aligned |
| value cell | `data` (mono), `ink` |
| zebra striping | none |

### 4.7 Ratio marker

The section marker. Mono, small, orange, sits on the seam.

`font: micro` · `color: orange-text` · `letter-spacing: 0.06em` · no text transform

**Budget: maximum 3 per page.** Enforced by the eyebrow count rule in section 8.

### 4.8 Dealer logo tile

| State | Spec |
|---|---|
| default | `filter: grayscale(1)` · `opacity: 0.75` · logo only, no label |
| hover | `opacity: 1` · no colour restoration |
| focus-visible | `outline: 2px solid orange` · `outline-offset: 4px` |

Permanently greyscale. Third-party marks stay visually subordinate to Gohil's own. Each tile is a link to that principal's page. **No category label under the logo.**

### 4.9 Header

`height: 72px` · one line at desktop · `bg: transparent` over hero, transitioning to `mist/88` with `backdrop-filter: blur(12px)` after 80px of scroll. Blur is capped at 12px per the performance guardrail.

### 4.10 Page loader

Covers the viewport on first load and on every route change. Built from the mark: the orange arc and the G swing into mesh while a dashed `steel` ring turns against them at a reduction.

**The hide is driven by a timer, not by the animation finishing.** An earlier version hung the unmount off the GSAP timeline's `onComplete`, and when the timeline did not start the loader sat at full opacity covering the entire site. A loader that can stick takes the whole page with it, so the timer is the authority and the animation is decoration.

`1250ms` first load, `620ms` route change, `320ms` under reduced motion. It also performs the final scroll reset, because it is the last thing to finish on a navigation.

### 4.11 Hero ring

The product sits inside a ring built from the mark's own geometry: the same 180 degree orange arc, the same `steel` segment, the same gap. It is not a generic circular photo frame, and it crops to the subject, which is the honest way to present photography at the resolution we have.

One slow idle rotation after the load sequence, `transform` only, disabled outright under reduced motion. It is the only continuous motion on the site.

---

## 5. Layout Principles

### 5.1 Grid

- 12 columns, `gap: 24px` desktop, `gap: 16px` mobile.
- Container `max-width: 1280px`, gutter `clamp(20px, 5vw, 64px)`.
- Content is centred, and the seam is kept out of it by the ground rule in 5.1a rather than by biasing the column. The plan called for a bias; the ground turned out to be the stronger guarantee, and it works at viewports a hand tuned bias would not have covered.

### 5.1a The ground rule

**Sustained text lives in a `container-page`, and `container-page` paints `--bg-page`.**

This is the rule that keeps body copy off the orange, and it is worth saying why it is a paint rather than a piece of geometry.

The seam is a rotated half plane behind the whole document. Keeping it away from text by tuning how far it travels is possible but not checkable: a contrast tool walks the stacking order under a paragraph, and the seam field's **bounding box covers the viewport whatever its rotation**, so every transparent paragraph on the site reported as graphite on orange at 1.53:1 even once the geometry was right. Painting the column states the ground as a fact instead of leaving it to be inferred.

Two consequences, both intended:

- `main` sits above the seam (`z-index` 10 against 0), so the column reliably occludes the orange. The seam therefore reads in the **gutters** rather than behind the text, growing on wide viewports where the gutters are wide and closing to a corner on narrow ones.
- A container inside a reversed section must not repaint the light ground. `.on-ink .container-page` clears it. Any new dark section marked `on-ink` inherits that automatically.

`on-ground` remains as an escape hatch for text that genuinely sits outside the column. It should stay rare.

### 5.2 The seam constant

```css
--seam-angle: 38.1deg;   /* measured from image 2, slope 0.784 */
```

Used by the fixed seam layer and by nothing else. **There is exactly one seam on the site.** Per-section diagonal dividers are banned (section 8).

### 5.3 Spacing scale

4px base. `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.

Section vertical rhythm: `clamp(64px, 9vw, 128px)` top and bottom.

### 5.4 Radius scale

One system, applied consistently.

```
--r-sm: 2px    buttons, inputs, chips in text
--r-md: 4px    cards, product chips, panels
--r-lg: 8px    the single largest allowed radius
--r-none: 0    full-bleed structural bars, the seam, section edges
```

Anything above 8px is banned. The client's own artwork is squared.

### 5.5 Section layout families

At least four distinct families across the home page, per the repetition rule.

| Family | Used by |
|---|---|
| A. Two-field split on the seam | Hero, Divisions |
| B. Horizontal scroll-driven strip | Capabilities |
| C. Asymmetric product array (not equal columns) | Gear range, What we build |
| D. Full-bleed inverted panel | Since 1994 |
| E. Utility panel | Ratio Finder, Enquiry |
| F. Logo grid | Dealers |

No two consecutive sections share a family. No three-equal-column feature card row anywhere.

### 5.6 Z-index scale

Documented here, defined in `src/lib/constants.ts`, never inlined as arbitrary values.

```
0    seam layer
10   page content
40   header
50   mobile menu overlay
60   modal and toast
```

---

## 6. Depth and Elevation

No large drop shadows. No glassmorphism. No floating cards.

Depth comes from **layered flat planes and the seam passing behind content**, which is how the client's own artwork works.

| Level | Treatment | Used by |
|---|---|---|
| 0 | Flat on the page ground, no border | Section backgrounds |
| 1 | `1px solid steel/40` hairline | Chips, tables, panels |
| 2 | White surface on `mist` ground, hairline, no shadow | Cards, form panels |
| 3 | `0 1px 0 rgb(14 16 18 / 0.08), 0 8px 24px -12px rgb(14 16 18 / 0.22)` | **The header, and nothing else.** It is the only shadowed element on the site. |


---

## 7. Motion and Interaction

Tier **L2+**. Library: GSAP 3.15 with `@gsap/react` `useGSAP()`, ScrollTrigger, SplitText, DrawSVG. Smooth scroll: Lenis 1.3, driven from `gsap.ticker`.

### 7.1 Global rules

- **Transform and opacity only.** Never animate `width`, `height`, `top`, `left`, `box-shadow` or `filter`.
- **Zero pinned ScrollTriggers on the entire site.** Pinning is the mobile-hostile part and we do not need it.
- **One marquee per page**, maximum.
- `gsap.registerPlugin()` called once in `src/lib/gsap.ts`.
- ScrollTrigger lives on the timeline, never on a child tween.
- Triggers are created top to bottom in page order, or given `refreshPriority`.
- `ScrollTrigger.refresh()` after fonts load and after every route change.
- **No scroll event listeners anywhere.** ScrollTrigger, Lenis, or IntersectionObserver only.
- All motion lives in `'use client'` leaf components.

### 7.2 The motion table

| Element | Trigger | Property | Duration and easing | Mobile | Reduced motion |
|---|---|---|---|---|---|
| Page load | mount, once | logo `drawSVG` then wordmark `y` and `opacity` via SplitText | 1.2s total, `power3.out` | 0.8s, no SplitText | none, final state immediately |
| Seam | `scrub: 0.5` over document | `translate3d` on a rotated layer | scrubbed | corner wedge only | parked at fixed offset, no listener |
| Header | ScrollTrigger `onUpdate` direction | `y`, background opacity | 0.3s `power2.out` | same | always visible, no hide |
| Section entry | `start: 'top 80%'`, once | `y: 24 to 0`, `opacity: 0 to 1` | 0.6s `power3.out`, stagger 0.06s | 0.4s, stagger 0.04s | instant, no offset |
| Capability strip | `scrub: true` | `xPercent` | scrubbed, `ease: 'none'` | reduced travel | static wrapped list |
| Product chip | hover, `@media (hover:hover)` | `scale: 1.02` | 0.25s `power2.out` | none | border colour only |
| Dealer logos | in view, once | `opacity` stagger | 0.4s, 0.04s stagger | same | instant |
| Gearbox exploded SVG | `scrub: true` | `x` and `y` on part groups | scrubbed | static exploded state | static |
| Mobile menu | tap | `clip-path` wipe on the seam angle, items `y` and `opacity` | 0.5s `power4.inOut`, 0.05s stagger | n/a | opacity only, 0.15s |
| Hamburger | tap | `rotation`, `y`, `scaleX` on three bars | 0.4s `power2.inOut` | n/a | instant swap |
| `1994` counter | in view, once | text tween | 1.0s `power1.out` | same | final value |
| Ghost mark | `scrub: true` | `y` only, clamped | scrubbed | disabled | static |

### 7.3 Lenis configuration

```
lerp: 0.1 · duration: 1.1 · wheelMultiplier: 1 · touchMultiplier: 1.5
```

Driven from `gsap.ticker`, not its own RAF, so GSAP and Lenis share one loop.
`lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.lagSmoothing(0)`.

**Disabled entirely under `prefers-reduced-motion: reduce`**, falling back to native scroll.

### 7.4 Scroll to top on navigation

Client requirement. On route change: `lenis.scrollTo(0, { immediate: true })` before paint, then `ScrollTrigger.refresh()`.

Verified against five cases: nav link click, browser back and forward, hard reload mid-page, hash link, mobile menu link tap.

### 7.5 Motion justification

Every animation must be justifiable in one sentence. If it cannot be, it is cut.

| Animation | Justification |
|---|---|
| Seam travel | Encodes which division the current content belongs to. |
| Section entry | Establishes reading order down the page. |
| Capability strip | Shows the list is longer than the viewport. |
| Chip hover | Affordance feedback that the chip is a link. |
| Logo draw | One brand moment on first load, never repeated. |
| Menu wipe | Reuses the brand's own diagonal so the menu feels part of the system. |

---

## 8. Do's and Don'ts

### Do

1. **Do keep a phone number and a WhatsApp button within reach on every page.** The header, the mobile menu, every closing CTA and the footer all carry them. The client asked for the sticky bar to be removed, so reach is carried by the page rather than by a fixed strip.
2. **Do use the real cut-out product photography at its native size.** Roughly 22 images at 101px to 276px. They are real and they are the client's own.
3. **Do set every number with a unit in mono.** Ratios, kW, HP, rpm, inches, feet.
4. **Do label the dealer section exactly "Authorised Dealer".** The client's own wording. Never upgrade it.
5. **Do keep every fact traceable.** Every claim carries a source in `src/data/claims.ts` and appears on `/audit`.
6. **Do use `min-h-[100dvh]`**, never `h-screen`.
7. **Do suppress hover states on touch** with `@media (hover: hover)`.
8. **Do write copy an engineer would say out loud.** "Bonfiglioli AS-series vertical helical, ex-stock Rajkot" beats "premium quality gearboxes".
9. **Do keep the enquiry button's verb constant** through the whole flow: "Send enquiry" leads to "Enquiry sent".

### Don't

1. **Never use an em-dash or an en-dash anywhere visible on the page.** Headlines, body, buttons, alt text, captions, form labels, the address string. Use a hyphen, a comma, a colon or a full stop. This is the single most-violated rule and it is binary.
2. **Never draw a second diagonal.** There is exactly one seam. Per-section angled dividers turn this design into every template with angled section breaks.
3. **Never use `steel` for text on a light ground.** It is 2.42:1 and it fails.
4. **Never put white text on an orange fill.** 3.76:1, fails AA. Ink on orange, always.
5. **Never fabricate a number.** No client counts, project counts, tonnage, turnover or headcount. The only publishable number is "1994", because it is verifiable.
6. **Never publish a price.** The client's own listings contradict each other by five times on the same product.
7. **Never show a certification** we have not confirmed. No ISO, CE or MSME badge appears anywhere.
8. **Never use stock photography**, generic factory shots, hard hats, handshakes or globes with network lines.
9. **Never use an AI-generated image** of their premises, staff or products. Their existing Instagram images are AI-generated and one carries another company's logo. That is the failure we are fixing, not repeating.
10. **Never blur a moving element.** No blur filter on anything animated. `backdrop-filter` is capped at 12px and only on the header.
11. **Never use a large radius or a large drop shadow.** The radius ceiling is 8px and only two elements on the site carry a shadow.
12. **Never number a section as decoration.** Sequential eyebrows are banned. Markers carry a real unit or they do not exist.
13. **Never put a category label under a dealer logo.** Logo wall is logos only. Coverage information belongs in the table on `/brands`.
14. **Never ship a three-equal-column feature card row.**
15. **Never add a scroll cue.** No "Scroll to explore", no animated mouse icon.
16. **Never hardcode a string in JSX.** All copy lives in `src/data/`.

### 8.1 Deliberate deviations from `design-taste-frontend`

Two of the skill's rules are overridden by explicit client requirements. Both are recorded here so the deviation is a decision, not an oversight.

| Skill rule | Deviation | Justification |
|---|---|---|
| Section 4.11 "Page Theme Lock: no section flips to inverted mode mid-page" | The home page and About each carry one `ink` panel inside an otherwise light page. | The client's own Instagram poster is an orange-on-ink layout, so an inverted panel is on-brand. Every ratio inside those panels is verified in section 2.3. Note this is now the ONLY inversion on the site: the dark theme was removed at the client's request, so light is not merely the default, it is the only mode. |
| Section 4.8 "Even minimalist sites need real images. Do not fill the page with hand-rolled SVG" | The hero carries no photograph, and a hand-authored technical SVG carries one section. | Measured: the largest available product image is 251x276px. A photo-led site is not buildable from these assets, and stretching one produces the blurry-hero failure the brief explicitly warns against. Falls back to the skill's own priority 3, "leave clearly-labeled placeholder slots and tell the user". Real client photography is requested in `CONTENT.md` and is on the critical path. The SVG is technical and informational with real callouts, not decorative. |

---

## 9. Responsive Behaviour

### 9.1 Breakpoints

Mobile first, literally. Every component is authored at 360px and works up.

```
base   360px   design target, mid-range Android
sm     480px
md     768px   tablet, heavy visuals gate here
lg     1024px
xl     1280px  container max
2xl    1536px
```

Tested at: **320 · 360 · 390 · 414 · 768 · 1024 · 1440 · 1920 · 2560**, portrait and landscape, plus 200% browser zoom.

### 9.2 Per-component collapse

| Component | Mobile behaviour |
|---|---|
| Header | Logo plus hamburger only. Nav links move into the overlay. |
| Hero | Single column. Seam reduces to a corner wedge. Headline maximum 2 lines. Both CTAs above the fold on a 360x560 viewport. |
| Divisions | Stacks vertically. The seam becomes a horizontal band between the two blocks, still at 38.1deg. |
| Capability strip | Reduced scroll travel. Static wrapped list under reduced motion. |
| Product arrays | 2 columns at 360px, 3 at 768px, asymmetric at 1024px and up. |
| Spec tables | Label above value, stacked, rather than a horizontally scrolling table. |
| Dealer grid | 3 columns at 360px, 5 at 768px. |
| Gearbox SVG | Static exploded state, no scrub. |

### 9.3 Hard rules

- **No horizontal overflow at any width from 320px upward.** Wide content scrolls inside its own container, never the body.
- Minimum tap target 44x44px.
- Minimum body text 16px.
- Images carry explicit `width` and `height` and correct `sizes` to prevent CLS.
- Safe area insets respected on the mobile menu overlay: `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.

---

## 10. Accessibility

Target: **WCAG 2.1 AA**, Lighthouse Accessibility 95 or above.

### 10.1 Colour

All ratios in section 2.3 are computed, not eyeballed. Re-verified in Phase 9 against this table. Colour is never the only carrier of meaning: the build and supply distinction is always accompanied by a text label, never colour alone.

### 10.2 Focus

- Every interactive element has a visible `focus-visible` state.
- Removing the outline without a replacement is banned.
- Focus ring: 2px, `orange` on light grounds, `ember` inside reversed `ink` panels, `ink` on orange fills. Always with `outline-offset` of at least 2px.

### 10.3 Keyboard

- The mobile menu traps focus while open, closes on `Escape`, and restores focus to the trigger.
- The enquiry form is fully operable by keyboard, with a logical tab order.
- Skip to content link as the first focusable element.

### 10.4 Motion

`prefers-reduced-motion: reduce` produces a fully functional, fully readable, non-animated site. Lenis is disabled, all scrubs park at their resolved state, and no layout shift occurs on the transition.

### 10.5 Semantics

- One `h1` per page, no skipped heading levels.
- `nav`, `main`, `footer`, `article` and `section` used correctly.
- Phone numbers are `tel:` links. The address sits in an `address` element.
- Icons that carry meaning have accessible labels. Decorative icons are `aria-hidden`.

### 10.6 Alt text

Describes the actual product, not the file.

- Good: `Cast iron worm reduction gearbox with flange mounted three phase motor`
- Bad: `gearbox image`, `product photo`

Dealer logos take the brand name as alt text. The seam layer is `aria-hidden` with `pointer-events: none`.

---

## 11. Compliance checklist for Phase C

Before any component is considered done:

- [ ] Every colour used is a token from section 2.1, referenced as a CSS variable
- [ ] Every font size used is a token from section 3.2
- [ ] Every radius is from the section 5.4 scale
- [ ] Every animation appears in the section 7.2 table
- [ ] Component has all five states from section 4
- [ ] Zero em-dashes in any user-visible string
- [ ] No string hardcoded in JSX
- [ ] Renders correctly at 320px with no horizontal overflow
- [ ] Renders correctly at 320px and at 200% browser zoom
- [ ] Passes with `prefers-reduced-motion: reduce`
