---
name: MOTIX Motorsport Performance
description: Premium automotive & motorcycle spare parts e-commerce with interactive 360° studio cockpit experience
colors:
  primary: "#E63946"
  primary-hover: "#FF3B4C"
  primary-glow: "#FF4D5E"
  primary-active: "#D62839"
  primary-dark: "#C1121F"
  secondary: "#FF5722"
  secondary-light: "#FF8A50"
  secondary-dark: "#E64A19"
  neutral-bg: "#07090E"
  neutral-surface: "#0E121A"
  neutral-surface-elevated: "#141A26"
  neutral-card: "#111622"
  neutral-border: "#1E2738"
  neutral-divider: "#262D3D"
  text-primary: "#F3F4F6"
  text-secondary: "#9CA3AF"
  accent-green: "#10B981"
  accent-gold: "#F59E0B"
typography:
  display:
    fontFamily: "Chakra Petch, Prompt, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Chakra Petch, Prompt, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Chakra Petch, Prompt, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
  body:
    fontFamily: "Prompt, Plus Jakarta Sans, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Chakra Petch, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  card-default:
    backgroundColor: "{colors.neutral-card}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: MOTIX Motorsport Performance

## Overview

**Creative North Star: "The High-Velocity Pit Studio"**

MOTIX merges the visceral mechanical urgency of an endurance racing pit stop with the clinical precision of a modern automotive design studio. The interface communicates speed, engineering rigor, and structural authority from the very first frame. Carbon dark finishes, crimson racing highlights, and tachometer-inspired amber accents evoke the cockpit telemetry of high-performance vehicles, while clean spatial grouping and crisp tabular typography ensure effortless discovery for performance enthusiasts and professional mechanics alike.

Surfaces feel solid and layered, like machined aluminum and dark composite bodywork. Instead of floating in arbitrary empty space, interface elements nest inside structured chassis cards bounded by 1px hairline alloy borders. High-contrast solid text and illuminated badges maintain immediate scanability under any lighting condition, while micro-interactions deliver instant tactile feedback.

**Key Characteristics:**
- **Mechanical Precision**: Sharp geometries, technical angularity in display headings (`Chakra Petch`), and disciplined data alignment.
- **Cockpit Atmosphere**: Deep slate-carbon canvas (`#07090E`) with luminous red (`#E63946`) and performance orange (`#FF5722`) highlights.
- **Glass Telemetry**: Subtle translucent overlays (`rgba(22, 28, 42, 0.8)`) with frosted backdrop blurs (`12px–16px`) simulating instrumentation HUD panels.
- **Zero Cosmetic Slop**: Solid, high-contrast typographic rendering with complete rejection of AI-tell gradient text, decorative grid wallpaper, and cartoonish bounce easing.

## Colors

The MOTIX color palette is grounded in automotive racing darks, accented by high-visibility competition signaling colors.

### Primary
- **Racing Red** (`#E63946`): Signature brand color. Used for primary CTAs, active selection states, key promotional badges, and focus rings.
- **Racing Red Hover** (`#FF3B4C`): Illuminating hover state for primary interactive elements.
- **Deep Crimson** (`#C1121F`): Gradient termination and active-press shade for primary buttons.

### Secondary
- **Performance Orange** (`#FF5722`): Secondary accent for delivery badges, limited-time highlights, and vehicle selector indicators.
- **Tachometer Amber** (`#FF8A50`): Warm warning and countdown accent.
- **Exhaust Orange** (`#E64A19`): Deepened secondary state for active presses.

### Neutral
- **Asphalt Carbon** (`#07090E`): Base root canvas background.
- **Cockpit Surface** (`#0E121A`): Secondary background for elevated containers and headers.
- **Chassis Slate** (`#111622`): Standard background for cards, product tiles, and modals.
- **Chassis Border** (`#1E2738`): 1px structural boundary dividing panels and card containers.
- **White-Hot** (`#F3F4F6`): High-contrast primary reading text and metric values.
- **Muted Steel** (`#9CA3AF`): Secondary descriptions, specifications, and SKU captions.

### Accent
- **Diagnostic Green** (`#10B981`): In-stock indicators, verified fitment badges, and success toasts.
- **Telemetry Gold** (`#F59E0B`): Member tiers, star ratings, and warranty badges.

### Named Rules
**The Rarity of Red Rule.** Primary Racing Red (`#E63946`) covers no more than 8% of any rendered viewport. Its purpose is conversion focus and urgent telemetry; when applied everywhere, it commands nothing.

**The No-Gradient-Text Rule.** Headings, hero display lines, and metrics use solid `#FFFFFF`, `#F3F4F6`, or `#FF6B6B`. Never use `bg-clip-text text-transparent` gradients.

## Typography

**Display Font:** `Chakra Petch` (with fallback to `Prompt`, `sans-serif`)
**Body Font:** `Prompt`, `Plus Jakarta Sans` (with fallback to `system-ui`, `sans-serif`)
**Label/Mono Font:** `Chakra Petch`, monospace

**Character:** Technical display geometry with angular racing letterforms paired with highly legible, modern bilingual Thai-Latin body type.

### Hierarchy
- **Display** (Bold 700, `clamp(2.5rem, 6vw, 4.5rem)`, line-height `1.05`, tracking `-0.02em`): Hero headlines and major campaign statements.
- **Headline** (Bold 700, `clamp(1.75rem, 3.5vw, 2.5rem)`, line-height `1.2`, tracking `-0.01em`): Section titles, modal headers, product names on detail pages.
- **Title** (SemiBold 600, `1.125rem` to `1.25rem`, line-height `1.4`, tracking `0.02em`): Card headers, drawer titles, form fieldset legends.
- **Body** (Regular 400 / Medium 500, `0.9375rem` [15px] to `1rem` [16px], line-height `1.6`, max measure `65–75ch`): Description paragraphs, specifications, reviews, and instructions.
- **Label** (Bold 700, `0.75rem` [12px], tracking `0.05em`, uppercase): Telemetry badges, SKU numbers, category chips, status tags.
- **Caption / Metric** (Medium 500 / Bold 700, `0.6875rem` [11px], line-height `1.3`): Telemetry chips, SKU captions, compact legal disclaimers.
- **Micro** (Bold 700, `0.625rem` [10px], line-height `1.2`, uppercase): Ultra-dense table tags, status pills, badge markers.
- **Sub-micro** (Bold 700, `0.5625rem` [9px]): Miniature badge indicators.

### Named Rules
**The Telemetry Uppercase Rule.** All system status indicators, badges, and SKUs are styled in uppercase `Chakra Petch` with `0.05em` letter-spacing.

## Layout

MOTIX utilizes a 12-column responsive fluid grid designed for scanning complex spare parts inventories:
- **Max Container Width**: `1280px` (`max-w-7xl`) centered with responsive gutter padding (`px-4 sm:px-6 lg:px-8`).
- **Breakpoints**: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- **Rhythm & Density**: Compact vertical spacing for high-density catalog search and vehicle matching, opening into generous padding (`py-12 lg:py-16`) between major visual sections.
- **Touch Target Floor**: Interactive controls (steppers, filter chips, pagination, icon triggers) maintain a strict minimum bounding box of `44x44px` on mobile viewports.

## Elevation & Depth

Depth in MOTIX is created through tonal layering and glass cockpit materials rather than heavy drop shadows.

- **Tonal Planes**: `#07090E` (Canvas) → `#0E121A` (Shelves & Bars) → `#111622` (Cards) → `#161B27` (Control wells).
- **Glass Cockpit**: Translucent background with `backdrop-filter: blur(12px)` and a 1px alloy border (`rgba(255, 255, 255, 0.08)`).
- **Directional Halos**:
  - `glow-red` (`box-shadow: 0 0 25px -4px rgba(230, 57, 70, 0.45)`): Applied to active racing badges and primary spotlight elements.
  - `glow-orange` (`box-shadow: 0 0 25px -4px rgba(255, 87, 34, 0.45)`): Applied to flash deal timers and urgent alerts.

### Named Rules
**The Boundary Before Shadow Rule.** Surface elevation must first be established by background tone contrast and a 1px boundary border (`#1E2738`); shadows are reserved strictly for interactive hover states and active dialogs.

## Shapes

- **Radius Ramp**:
  - `sm` (`6px`): Status tags, input elements, coupon chips.
  - `md` (`8px`): Buttons, quantity steppers, dropdown menus.
  - `lg` (`12px`): Inner cards, media containers, thumbnails.
  - `xl` (`16px`–`24px`): Feature cards, modals, hero banners.
  - `full` (`9999px`): Notification pills, brand avatars, telemetry chips.
- **Chassis Borders**: Solid 1px borders (`#1E2738`) on dark surfaces, shifting to `rgba(230, 57, 70, 0.4)` on hover.

## Components

### Buttons
- **Shape**: Rounded rectangular (`rounded-lg` / 8px).
- **Primary**: Gradient fill (`linear-gradient(to right, #E63946, #C1121F)`), white bold text, red glow shadow (`0 4px 14px rgba(230, 57, 70, 0.35)`), active scale `0.98`.
- **Secondary**: Performance orange gradient (`#FF5722` to `#E64A19`), white bold text.
- **Outline**: Transparent background, slate-700 border, hover red border with `rgba(230, 57, 70, 0.1)` wash.
- **Dark**: Deep slate `#181D28` with subtle alloy border `#2B354A`.

### Chips & Badges
- **Telemetry Chip**: `bg-red-500/15`, `text-[#FF6B6B]`, `border border-red-500/30`, font `Chakra Petch`.
- **Vehicle Match Chip**: Emerald pill with check icon indicating 100% fitment verification.

### Cards / Containers
- **Standard Card**: Background `#111622`, border `#1E2738`, border-radius `16px`, padding `16px–24px`.
- **Glass Card**: Background `rgba(22, 28, 42, 0.8)`, `backdrop-filter: blur(12px)`, border `rgba(255, 255, 255, 0.07)`, hover translate `-3px`.

### Inputs / Fields
- **Search & Text Inputs**: Background `#0E1119`, border `#2A344A`, border-radius `12px`, font-mono for SKU codes and VIN lookups.
- **Focus**: Border `#E63946` with subtle ambient red focus ring.

### Signature Component: 360° Studio Showcase & Pit-Stop Vehicle Finder
- **360° Studio Viewer**: Clean high-contrast neutral studio canvas (`radial-gradient(#FFFFFF, #F1F4F8)`) with smooth drag gesture controls and rotation telemetry indicators.
- **Vehicle Finder**: Quick-filter cascade (Type → Brand → Model → Year) persisting user garage context across sessions.

## Do's and Don'ts

### Do:
- **Do** maintain bilingual translation coverage for English and Thai via `src/locales/` on all user-facing views.
- **Do** enforce minimum `44x44px` touch bounding boxes on all mobile interactive controls.
- **Do** use `Chakra Petch` for technical labels, badges, headers, and numeric prices.
- **Do** use physics-based exponential easing (`cubic-bezier(0.16, 1, 0.3, 1)`) for UI transitions.
- **Do** provide `motion-reduce:animate-none` fallbacks for all continuous pulse/spin animations.

### Don't:
- **Don't** use decorative gradient text (`bg-clip-text text-transparent`) on headings or prices.
- **Don't** use cartoonish bounce easing (`animate-bounce`).
- **Don't** apply decorative multi-axis grid overlays (`racing-grid`) on content surfaces.
- **Don't** hardcode raw Thai or English strings without wiring them through `useTranslation()`.
- **Don't** render clickable actions as plain `<span>` or `<div>` without semantic `<button>` tags and keyboard focus handlers.
