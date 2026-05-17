---
name: Sean Jones Portfolio
description: Evidence-first portfolio system for senior engineering leadership
colors:
  accent-blue: "#0071e3"
  accent-blue-hover: "#0077ed"
  accent-blue-dark: "#2997ff"
  surface-base: "#f5f5f7"
  surface-secondary: "#ffffff"
  surface-dark: "#1c1c1e"
  text-primary: "#1d1d1f"
  text-primary-dark: "#f5f5f7"
  text-secondary: "#6e6e73"
  text-secondary-dark: "#d1d1d6"
  border-light: "#d9d9de"
  border-dark: "#3a3a40"
  error-red: "#d93025"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "100px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent-blue}"
    textColor: "{colors.surface-secondary}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-blue-hover}"
    textColor: "{colors.surface-secondary}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-ghost:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.accent-blue}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  input-default:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  card-surface:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: Sean Jones Portfolio

## Overview

**Creative North Star: "Technical Atelier"**

This system presents engineering leadership through evidence, not theater. The layout is structured for fast scanning, then deeper verification through projects, work history, and contact intent. Visual decisions prioritize credibility, readability, and execution clarity.

Interaction behavior is explicit and controlled. State changes are quick, depth is functional, and accents are reserved for action and navigation. Typography carries hierarchy through weight and proportion, not ornament.

This system explicitly rejects the anti-references in PRODUCT.md: Template SaaS card-grid look with generic icon blocks and repetitive scaffolding, and Corporate sterile resume-page aesthetic that feels static and low-signal.

**Key Characteristics:**
- Evidence-first structure with strong heading and content separation
- Slate-and-cyan palette with one dominant action accent
- Always-layered surfaces with subtle ambient depth
- Measured interaction states with clear feedback
- Consistent section grammar optimized for scan-then-deepen behavior

## Colors

The palette uses slate neutrals with one cyan-blue signal channel for action, wayfinding, and state.

### Primary
- **Signal Blue** (`#0071e3`): Primary actions, key links, and active interaction states.
- **Signal Blue Hover** (`#0077ed`): Hover-state reinforcement for primary interactive controls.

### Secondary
- **Sky Edge Blue** (`#2997ff`): Dark-theme action variant for legibility and interaction contrast.

### Tertiary
- **Alert Red** (`#d93025`): Validation and error signaling only, no decorative use.

### Neutral
- **Slate Mist** (`#f5f5f7`): Light-mode page canvas.
- **Paper Surface** (`#ffffff`): Elevated cards, forms, and panel surfaces.
- **Graphite Surface** (`#1c1c1e`): Dark-mode surface layer.
- **Ink Primary** (`#1d1d1f`): Primary text in light mode.
- **Fog Primary** (`#f5f5f7`): Primary text in dark mode.
- **Ink Secondary** (`#6e6e73`): Supporting text in light mode.
- **Fog Secondary** (`#d1d1d6`): Supporting text in dark mode.

**The Signal Discipline Rule.** The primary accent is reserved for actions and key wayfinding. It is never used as decorative background fill.

## Typography

**Display Font:** `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif`
**Body Font:** `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif`
**Label/Mono Font:** Same family, label role emphasized via tracking and weight

**Character:** Confident, pragmatic, senior. Typography is tuned for signal density, scanability, and decision support.

### Hierarchy
- **Display** (`700`, `clamp(2.25rem, 5vw, 3.5rem)`, `1.1`): Hero identity and top-level page positioning.
- **Headline** (`700`, `clamp(1.75rem, 4vw, 2.5rem)`, `1.2`): Section anchors and structural wayfinding.
- **Title** (`700`, `1.05rem`, `1.25`): Card and modal identifiers.
- **Body** (`400`, `1rem`, `1.65`): Explanatory narrative and outcome detail.
- **Label** (`600`, `0.8125rem`, `0.12em` tracking, uppercase): Metadata and compact UI labeling.

**The Contrast Ladder Rule.** Adjacent hierarchy steps must remain visually distinct through both size and weight contrast. Flat scales are prohibited.

## Elevation

Depth is layered and functional. Surfaces stay legible and separated at rest, then lift slightly on interaction to confirm affordance.

### Shadow Vocabulary
- **Surface Ambient** (`0 2px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)`): Baseline panel separation.
- **Surface Hover** (`0 6px 32px rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.06)`): Interaction confirmation on hoverable surfaces.
- **Hero Ambient** (`0 8px 40px rgba(0, 0, 0, 0.12)`): Focal image emphasis.
- **Modal Depth** (`0 20px 64px rgba(0, 0, 0, 0.35)`): Dialog context separation from background content.

**The Ambient Depth Rule.** Elevation exists to separate layers and states, not to create decorative spectacle.

## Components

### Buttons
- **Shape:** Pill-first controls (`100px` radius) for primary and ghost actions.
- **Primary:** Signal Blue fill with high-contrast light text (`#0071e3` background, `#ffffff` text), medium weight, compact vertical rhythm.
- **Hover / Focus:** Hover darkens to signal-hover blue and adds lift. Focus requires explicit visible ring treatment in implementation.
- **Ghost:** Transparent or surface-backed control with accent border and accent text for secondary actions.

### Navigation Links
- **Style:** Compact rounded pills with muted text by default.
- **State Behavior:** Hover applies soft surface tint and raises text contrast.
- **Mobile Treatment:** Preserve clarity under constrained width while maintaining touch-target quality.

### Cards and Case Study Tiles
- **Corner Style:** Rounded large cards (`16px`) with clear border and ambient shadow.
- **Background:** Neutral surfaces with tokenized border contrast for theme adaptability.
- **Interaction:** Subtle lift plus shadow increase on hover.
- **Content Rhythm:** Title first, concise description second, action trigger last.

### Inputs and Form Fields
- **Style:** Surface-backed fields with controlled border (`1.5px`) and compact internal padding.
- **Focus:** Accent-colored border with soft halo to indicate active input.
- **Error:** Red border and supporting error panel with low-opacity red background tint.

### Modal Panel
- **Style:** Elevated panel with rounded corners (`18px`) and isolated backdrop layer.
- **Behavior:** Grow-in open transition with short ease-out timing and low-amplitude scaling.
- **Dismissal:** Close button, overlay click, and Escape key support.

## Do's and Don'ts

### Do:
- **Do** keep interaction emphasis tied to Signal Blue and reserve it for actions, links, and active states.
- **Do** maintain senior-level readability with clear hierarchy and restrained component ornament.
- **Do** preserve ambient depth layering so cards, forms, and dialogs read as distinct interaction planes.
- **Do** keep section copy concise and outcome-oriented, so evidence remains primary.

### Don't:
- **Don't** drift into Template SaaS card-grid look with generic icon blocks and repetitive scaffolding.
- **Don't** allow a Corporate sterile resume-page aesthetic that feels static and low-signal.
- **Don't** add decorative gradients, side-stripe accents, or default glass effects that do not carry meaning.
- **Don't** flatten hierarchy through near-identical type steps or interchangeable section structures.
