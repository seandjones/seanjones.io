---
name: seanjones.io
description: The Price.com platform drawn as a transit system map, ridden from map to terminus.
colors:
  ground: "#ffffff"
  ground-2: "#f3f4f5"
  ink: "#16181c"
  ink-2: "#4a4f57"
  rule: "#d5d8dc"
  line-ai: "#8f5a00"
  line-platform: "#c2302a"
  line-frontend: "#1f5fc7"
  line-extensions: "#137a46"
  line-leadership: "#16181c"
  focus: "#16181c"
  target: "#fff4d6"
  error: "#b3261e"
  scrim: "rgba(22, 24, 28, 0.55)"
  ground-night: "#0f1114"
  ground-2-night: "#171a1e"
  ink-night: "#eceef0"
  ink-2-night: "#b4b9c0"
  rule-night: "#30343a"
  line-ai-night: "#f2b33d"
  line-platform-night: "#ff7468"
  line-frontend-night: "#74a7ff"
  line-extensions-night: "#44c487"
  line-leadership-night: "#eceef0"
  focus-night: "#eceef0"
  target-night: "#2b2615"
  error-night: "#ff8a80"
  scrim-night: "rgba(0, 0, 0, 0.72)"
typography:
  display:
    fontFamily: "Overpass Variable, Overpass, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.2vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Overpass Variable, Overpass, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Overpass Variable, Overpass, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  label:
    fontFamily: "Overpass Variable, Overpass, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  ring: "50%"
  capsule: "13px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section-y: "clamp(4rem, 8vw, 7rem)"
  max: "1320px"
  measure: "58ch"
  stroke: "10px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.15rem 1.4rem 0"
    height: "48px"
  button-solid-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.ground}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.15rem 1.4rem 0"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.ground-2}"
  button-sign-solid:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.15rem 1.4rem 0"
    height: "48px"
  button-sign-solid-hover:
    backgroundColor: "{colors.ground-2}"
  button-sign-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "0.15rem 1.4rem 0"
    height: "48px"
  signage-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.25rem, 3vw, 2.25rem)"
  bullet-platform:
    backgroundColor: "{colors.line-platform}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.1rem 0.6rem 0"
    height: "1.6rem"
  field-input:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.65rem 0.85rem 0.5rem"
    height: "48px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.1rem 0.85rem 0"
    height: "44px"
  nav-link-hover:
    backgroundColor: "{colors.ground-2}"
---

# Design System: seanjones.io

## Overview

**Creative North Star: "The System Map"**

The site is drawn as a transit map of the Price.com platform. Each workstream is a line, each station is a real result, and the page is a ride from the map at the top to a terminus bar at contact. Everything below the map borrows the same signage: the career is a line diagram, independent projects hang off a dashed branch line, and section heads sit on a heavy ink rule like a platform sign.

The material is printed wayfinding. White map ground, ink type, one stroke weight, square corners, no shadows, and colour used only to tell lines apart. Density is high but legible: a small set of type sizes, generous measure limits, and hairline rules between rows rather than boxes around them. A "Night map" theme (set by `data-theme="dark"` on `<html>`, chosen before first paint from storage or `prefers-color-scheme`) swaps the ground to near-black and lifts every line colour so it keeps contrast; the geometry does not change.

The direction rejects the dark glowing developer portfolio with a card grid and a skills wall, and PRODUCT.md rejects template SaaS card grids with icon blocks.

**Key Characteristics:**
- Colour carries line identity: AI, Platform, Frontend, Extensions, Leadership.
- Octilinear map geometry at one 10px stroke weight, with 45° jogs into shared lanes at interchanges.
- Overpass, a highway signage face, at four sizes with tabular numerals.
- Square corners everywhere; only interchange capsules and career rings are round.
- Flat. Depth comes from solid ink panels and 2px ink rules, never shadow.

## Colors

A white and ink map with four saturated line colours plus ink for Leadership, each re-tuned for the night map.

### Primary
- **Ink** (`ink`, night `ink-night`): body text, headings, the solid button, the 2px strong rules (`--rule-strong`), station tick outlines, the career line and the branch line. Ink is also the Leadership line, so the person's own line reads as the map's base colour.

### Secondary
The line palette. Each is used only to identify its line: map strokes, line badges, bullets (including the legend rows), and strip map spines.
- **Signal Amber** (`line-ai`, night `line-ai-night`): the AI line. Text on it uses `--on-line-ai` (white by day, ground by night).
- **Route Red** (`line-platform`, night `line-platform-night`): the Platform line.
- **Route Blue** (`line-frontend`, night `line-frontend-night`): the Frontend line.
- **Route Green** (`line-extensions`, night `line-extensions-night`): the Extensions line.
- **Leadership** (`line-leadership`): equal to ink in both themes; text on it uses `--on-ink`.

### Neutral
- **Map White** (`ground`, night `ground-night`): page ground, station tick fill, interchange ring fill, input background, and the type colour on ink (`--on-ink`, `--on-line`).
- **Platform Grey** (`ground-2`, night `ground-2-night`): the independent projects band, outline and nav hover fill, scrollbar track.
- **Ink Grey** (`ink-2`, night `ink-2-night`): secondary text, intros, captions, form field borders at rest, scrollbar thumb.
- **Hairline** (`rule`, night `rule-night`): 1px dividers between legend rows, case studies and list parts.

### State
- **Focus Ink** (`focus`, night `focus-night`): focus outlines, caret colour, focused field border. Same value as ink, so no line colour doubles as a state.
- **Target Wash** (`target`, night `target-night`): background and 0.5rem outline on the `:target` element after an in-page jump.
- **Error Red** (`error`, night `error-night`): field error border and message, submit error border.
- **Scrim** (`scrim`, night `scrim-night`): the keyboard help dialog backdrop.

### Named Rules
**The Line Identity Rule.** A line colour means that line and nothing else. Never use a line colour for decoration, emphasis, a CTA, or a category that is not one of the five lines. State colours (focus, error, target) are the only other hues.

**The Night Map Rule.** Every colour token has a night value; components reference the custom property, never a hex, so the theme switch needs no component changes.

## Typography

**Display Font:** Overpass Variable (with Overpass, system-ui, sans-serif), self-hosted via `@fontsource-variable/overpass`.
**Body Font:** the same family.

**Character:** One signage face doing every job, the way a transit system uses one lettering. Weight and case separate roles, not a second family.

### Hierarchy
- **Display** (800, fluid 2.5rem to 4.25rem, line-height 1, -0.03em, balanced): the name on the signage panel and each section heading (Work, Experience, Projects, Get in touch).
- **Title** (700, 1.375rem, line-height 1.2, -0.01em, balanced): case study titles, role titles, project titles, dialog titles. Legend figures and the contact email use this size at 800.
- **Body** (400, 1.0625rem, line-height 1.6, tabular numerals): running text, capped at a 58ch measure (52ch in the sign line and case summaries). Buttons use this size at 800.
- **Label** (700, 0.8125rem, line-height 1.3, 0.08em, uppercase): part headings (Problem, What I did, Result), the role line on the sign, Stack, masthead links and the theme toggle (at 800). The map caption, footer, strip interchange notes and career sublines use the label size without uppercase.

Map station labels and line badges are set at 15px inside the SVG viewBox (600 for stations, 800 for interchanges and badges) and scale with the map.

### Named Rules
**The Four Sizes Rule.** There are four type sizes (`--fs-display`, `--fs-title`, `--fs-body`, `--fs-label`). New text picks one of them and varies weight, case or colour instead of adding a size.

**The Tabular Rule.** Numerals are tabular site-wide (`font-variant-numeric: tabular-nums` on body), so figures and dates align like a timetable.

## Layout

Content sits in a centred column of max 1320px with a fluid gutter (`clamp(1rem, 4vw, 3rem)`). Sections pad `clamp(4rem, 8vw, 7rem)` vertically and open with a section head: a display heading over a 2px ink rule, then `clamp(2rem, 4vw, 3.5rem)` before content.

The hero is the map across the top with a two-column base below it: the ink signage panel (7fr) and the results legend (5fr). Case studies are 5fr / 7fr, head and screenshot left, Problem / What I did / Result right. The career diagram uses a 12rem date column beside the role. Independent projects run four across on the branch line, two below 1100px, one below 640px. Contact is 5fr / 7fr, direct links left, form right.

Breakpoints observed: 1099px (projects to two columns), 959px (SVG map replaced by one strip map per line; hero stacks with the sign first, legend as compact rows, then strips), 859px (contact stacks), 759px (career stacks), 719px (masthead nav collapses behind a Menu button), 639px (branch line turns vertical).

The masthead is sticky, 60px tall, ground-filled, with a 2px ink rule below. In-page jumps use `scroll-padding-top: 5rem` and smooth scrolling only under `prefers-reduced-motion: no-preference`. All interactive targets are at least 44px tall; buttons and fields are 48px.

## Elevation & Depth

None. There is no `box-shadow` or `text-shadow` anywhere in the build. Hierarchy comes from fill and line weight: the signage panel (solid ink by day; dark with a light outline on the night map) is the heaviest object, 2px ink rules mark section heads, the masthead and footer, 1px hairlines divide rows, and the Platform Grey band sets the independent projects apart. The keyboard help is a native `<dialog>` with a 2px ink border over a scrim.

### Named Rules
**The Printed Map Rule.** Surfaces are flat at rest and in every state. Hover changes fill (ink to ink grey, transparent to Platform Grey), never elevation.

## Shapes

Corners are square: buttons, fields, bullets, the signage panel, badges, screenshots (2px ink border), the dialog, `kbd` keys, and the theme switch. Fields set `border-radius: 0` explicitly to override platform defaults.

Round forms are reserved for transit conventions. An interchange on the map is a ground-filled capsule with a 4px ink stroke (`rx` 13px, wrapping the two shared lanes). An interchange stop on a strip map and each career station is a ring (50%, 4px ink border); a career stop at the same company as the role above doubles the ring with a 4px outline at 4px offset.

Map geometry is octilinear. Lines are 10px strokes with butt caps and round joins, running horizontally, jogging at 45° into shared lanes 6px either side of the interchange midline, and jogging back out. Stations are white ticks (10 by 20) outlined in 2.5px ink. A line ends in a terminus bar in its own colour. The contact section closes the page with a 10px ink line ending in a 10 by 44 terminus bar. Independent projects hang from a 5px dashed ink branch line with 5px ink ticks per stop; the dash is reserved for that secondary route.

## Components

### Buttons
Signage plates: square, heavy, unmistakable.
- **Shape:** square (0), 2px border in the current colour, min height 48px, padding 0.15rem 1.4rem 0 (the top bias optically centres Overpass caps).
- **Solid:** ink fill, ground text, 800 weight at body size. Hover goes to ink grey.
- **Outline:** transparent with an ink border. Hover fills Platform Grey.
- **Sign variants (on the ink panel):** sign solid is a ground fill with ink text, hovering to Platform Grey; sign outline is a ground-coloured border and text, hovering to a 14% ground tint. Focus outlines inside the panel switch to the on-ink colour.
- **Transition:** background and colour, 160ms on `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`). Disabled is 0.55 opacity with a not-allowed cursor.

### Line Bullets
- **Style:** a square plate 1.6rem tall in the line colour, label size at 800, 0.06em tracking, uppercase, white text (ground on night). Leadership bullets are ink with on-ink text.
- **Use:** naming a line wherever it appears off the map: case study line tags, strip map headings, the current role marker on the career line.

### Signage Panel
Solid ink with on-ink type, no border, no radius. Holds the display name, the label-size role line, one body line at 52ch, and the two sign buttons. One per page, in the hero.

### Results Legend
Rows on hairlines under a 2px ink top rule. Each row pairs a line-coloured key (1.75rem by 8px bar) and a title-size figure with an ink grey caption.

### Inputs / Fields
- **Style:** ground fill, 2px ink grey border, square, min height 48px, padding 0.65rem 0.85rem 0.5rem. Labels sit above in body size at 700. Placeholder is ink grey at full opacity. Textareas are 9rem tall, vertical resize only.
- **Hover / Focus:** hover darkens the border to ink; focus turns it focus ink and adds the global 3px focus outline at 2px offset.
- **Error:** border and message in error red; a submit failure gets a 2px error-bordered box with ink text. Success replaces the form with a 2px ink-bordered panel.

### Navigation
Sticky masthead: brand mark and name at left (mark multiplied on day, inverted on night), label-style links at right (800, uppercase, 44px targets) that fill Platform Grey on hover, then the Night map toggle. Below 720px the links fold behind a square 2px-bordered Menu button into a full-width panel with hairline separators.

### Theme Toggle
Labelled "Night map" in label style. The switch is a square 2px ink frame with a square ink knob that slides 1.1rem on `aria-pressed="true"`, 160ms `--ease-out`, no transition under reduced motion.

### System Map (signature)
An SVG map (viewBox 1200 by 410, max-height max(16rem, 100svh minus 28.5rem) so the name panel and its actions stay in the first viewport down to 720px tall; left-aligned when it shrinks) of five lines, each opening with a line-coloured badge, with linked stations and interchanges. Hovering or focusing a line dims every other line and interchange to 0.16 opacity over 160ms. Station labels underline on hover and focus; focus also strokes the hit area in focus ink. On load each line draws in once (900ms, 90ms stagger per line, `--ease-out`); the draw is skipped entirely under `prefers-reduced-motion: reduce`, and the dimming transition is removed. Below 960px the SVG is hidden and each line becomes a strip map: a bullet heading over an 8px vertical spine in the line colour, white ink-outlined ticks, ringed interchange stops with a "Change for" note.

### Career Line
One 8px ink line down the left with a ground-filled ring per role, doubled where consecutive roles share a company. Dates in a 12rem column, role in title size, company, sublines and descriptions in ink grey at the measure.

### Branch Line
The independent projects: a 5px dashed ink line across the top (down the left on phones) with a short ink tick above each project. Each stop holds a title, a 2px ink-bordered screenshot, an ink grey summary, a visit link, and a details disclosure on a hairline.

### Browser Surfaces
Selection is ink with ground-coloured text. Caret is focus ink. Scrollbar is ink grey on Platform Grey. Focus is a 3px focus ink outline at 3px offset everywhere. `color-scheme` follows the theme.

## Do's and Don'ts

### Do:
- **Do** reference colour through the custom properties (`var(--ink)`, `var(--line-ai)`) so the night map works without component changes.
- **Do** pick one of the four type sizes and vary weight or case instead of adding a size.
- **Do** draw new map or diagram strokes at the 10px stroke weight (8px for strip and career spines), octilinear, with butt caps.
- **Do** keep corners square; use a ring or capsule only for an interchange or a station.
- **Do** mark structure with 2px ink rules and 1px hairlines rather than boxes.
- **Do** give every interactive target at least 44px of height and keep the 3px focus outline.
- **Do** keep motion to 160ms state changes on `--ease-out` and remove it under reduced motion.

### Don't:
- **Don't** use a line colour for anything that is not that line.
- **Don't** add shadows, glows, or elevation on hover.
- **Don't** wrap content in rounded cards or use rounded chips and pill buttons; bullets are square plates.
- **Don't** introduce a second typeface or a fifth type size.
- **Don't** use a dashed line except for a branch route.
- **Don't** add a second load animation; the line draw-in is the one authored moment.
