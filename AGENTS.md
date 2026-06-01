<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


---
name: Midnight Harbor
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#ffc640'
  on-secondary: '#402d00'
  secondary-container: '#e3aa00'
  on-secondary-container: '#5a4100'
  tertiary: '#c5c9ff'
  on-tertiary: '#131e8c'
  tertiary-container: '#a3abff'
  on-tertiary-container: '#2c37a0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#ffdf9f'
  secondary-fixed-dim: '#f9bd22'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#e0e0ff'
  tertiary-fixed-dim: '#bdc2ff'
  on-tertiary-fixed: '#000767'
  on-tertiary-fixed-variant: '#2f3aa3'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 16px
  container-padding-desktop: 32px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system shifts the "Friendly Casino" aesthetic into a sophisticated, high-energy dark mode. The brand personality is welcoming yet premium, evoking the atmosphere of an upscale evening lounge rather than a frantic arcade. It targets users seeking entertainment and accomplishment through missions, utilizing deep nocturnal tones to reduce eye strain during long sessions while allowing rewards to "pop" with maximum vibrance.

The style is a blend of **Corporate Modern** and **Glassmorphism**. It utilizes soft, rounded geometry to maintain friendliness, while layering translucent surfaces and vibrant accents to create a sense of depth and excitement. The emotional response should be one of focused playfulness and rewarding progression.

## Colors

The palette is anchored by a deep navy base (`#0f172a`) to provide a stable, immersive background. Secondary surfaces and cards use a lighter dark-gray (`#1e293b`) to establish hierarchy.

- **Primary (Light Blue):** Optimized for dark backgrounds, used for progress bars, active states, and primary branding elements.
- **Accent (Vibrant Gold):** Reserved exclusively for high-value actions, reward claims, and "Mission Accomplished" states.
- **Typography:** Pure white is avoided for long-form reading to prevent haloing; instead, a near-white (`#f8fafc`) and a soft slate-gray (`#94a3b8`) are used for primary and secondary information respectively.

## Typography

The typography strategy focuses on "friendly readability." **Plus Jakarta Sans** provides a modern, slightly rounded geometric feel for headings, making mission titles feel approachable. **Be Vietnam Pro** is used for body text and labels due to its excellent legibility on dark backgrounds and its warm, contemporary tone.

Large headlines use tighter letter-spacing and heavy weights to create a sense of impact, while small labels use slightly increased tracking to ensure clarity against dark UI surfaces.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model with a base-8 spacing scale. 

- **Mobile:** 4-column layout with 16px margins. Content cards are typically full-width or side-by-side in pairs.
- **Desktop:** 12-column layout with a max-width of 1280px. 32px margins and 24px gutters.
- **Vertical Rhythm:** A "Stack" philosophy is applied where related elements (like a mission title and its progress bar) are separated by `stack-sm`, while distinct mission categories are separated by `stack-lg`. 

The layout should feel airy and spacious to counteract the visual weight of the dark color palette.

## Elevation & Depth

Hierarchy in this design system is established through **Tonal Layering** and **Glassmorphism**, rather than traditional heavy shadows.

1.  **Level 0 (Base):** The deep navy `#0f172a` background.
2.  **Level 1 (Cards):** Surfaces use `#1e293b` with a subtle 1px inner border of 10% white to define edges.
3.  **Level 2 (Modals/Popovers):** These use a translucent version of the surface color with a `backdrop-filter: blur(12px)` and a slightly brighter border (20% white).
4.  **Shadows:** When used, shadows are highly diffused and tinted with the primary blue (`rgba(56, 189, 248, 0.1)`) to create a subtle neon-glow effect rather than a "black" shadow.

## Shapes

To maintain the "friendly" narrative, the design system employs a **Rounded** shape language.

- **Standard Buttons/Inputs:** 0.5rem (8px) corner radius.
- **Mission Cards:** 1rem (16px) corner radius for a softer, more inviting appearance.
- **Interactive Containers:** 1.5rem (24px) for large hero sections or featured mission blocks.
- **Status Pills:** Fully rounded (pill-shaped) to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Light blue background with navy text. High contrast for immediate visibility.
- **Action/Reward (CTA):** Vibrant gold background with navy text. Used sparingly for "Claim Reward" or "Start Mission."
- **Ghost:** Transparent background with a 1px primary-colored border.

### Mission Cards
Cards feature a dark gray background (`#1e293b`). Progress bars inside cards use a muted primary blue track with a glowing, vibrant primary blue fill. Icons are encased in a circular "coin" shape.

### Chips & Badges
Small, pill-shaped markers for categories (e.g., "Daily," "Epic"). These should use low-opacity versions of the primary or secondary colors with bright text to ensure they don't compete with main buttons.

### Input Fields
Inputs use a darker variant of the surface color to look recessed. On focus, the border glows with the primary blue color.

### Progress Indicators
Linear bars for mission completion. The "fill" should have a subtle horizontal gradient and a slight outer glow to signify energy and movement.