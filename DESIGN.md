---
name: Sally-Nej Dynamic
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#454652'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#757684'
  outline-variant: '#c5c5d4'
  surface-tint: '#4355b9'
  primary: '#24389c'
  on-primary: '#ffffff'
  primary-container: '#3f51b5'
  on-primary-container: '#cacfff'
  inverse-primary: '#bac3ff'
  secondary: '#795902'
  on-secondary: '#ffffff'
  secondary-container: '#fdd275'
  on-secondary-container: '#775800'
  tertiary: '#364360'
  on-tertiary: '#ffffff'
  tertiary-container: '#4e5a79'
  on-tertiary-container: '#c5d2f7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bac3ff'
  on-primary-fixed: '#00105c'
  on-primary-fixed-variant: '#293ca0'
  secondary-fixed: '#ffdf9e'
  secondary-fixed-dim: '#ebc166'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#d9e2ff'
  tertiary-fixed-dim: '#b9c6ea'
  on-tertiary-fixed: '#0d1b36'
  on-tertiary-fixed-variant: '#3a4664'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  title-lg:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  margin-tablet: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system establishes an architectural, trustworthy, and modern identity tailored for premier high-value real estate development and brokerage in Abuja, Nigeria. The visual expression evokes institutional solidity, sophisticated prestige, and contemporary urban elegance. 

The aesthetic is anchored in **Architectural Modernism**: crisp structural lines, intentional asymmetry balanced by disciplined geometric proportions, expansive white space reminiscent of luxury gallery blueprints, and refined tactile detailing. Every interface surface communicates confidence, capital security, and transparent authority for affluent private buyers, diaspora investors, and commercial institutional partners.

## Colors

The color palette pairs the deep authority of structural navy with high-trust royal blue and warm architectural champagne:

- **Primary (`#3F51B5`)**: Royal Blue conveys stability, transactional integrity, and executive authority. Reserved for primary calls-to-action, key interactive states, and major brand anchors.
- **Secondary / Accent (`#C9A24B`)**: Soft Champagne Gold provides a curated luxury accent. Deployed strategically for property exclusivity badges, verified status chips, highlighted metrics, and prestige moments.
- **Tertiary / Deep Canvas (`#14213D`)**: Dark Architectural Navy grounds the typography, dark-mode surfaces, hero cards, and footer layouts. It provides an alternative to pure black with richer depth.
- **Neutral Background (`#F5F7FA`)**: Soft cool stone used for alternating page sections, card basins, and subtle container backdrops.
- **Surface White (`#FFFFFF`)**: Pure crisp white applied to primary card planes and reading surfaces to maximize ambient light and spaciousness.
- **Structural Border (`#E2E8F0`)**: Low-contrast boundary strokes that provide structural clarity without visual noise.

## Typography

The typographic hierarchy is built on an architectural tension between structured geometric headlines and crisp, utilitarian body copy:

- **Headlines & Display (Space Grotesk)**: Chosen from the system library to deliver bold geometric confidence, sharp structural angles, and contemporary premium punch akin to modern architectural schematics. Tight tracking at large sizes provides authoritative presence.
- **Body & Functional Text (Inter)**: The standard for neutral clarity, high legibility across dense property parameters (square footage, title deeds, coordinates), and effortless scanning across financial tables and mobile screens.
- **Caps & Metrics**: All property tags, RC numbers, and metadata utilize `label-md` or `label-sm` with slight positive tracking (`0.04em` to `0.05em`) in medium or semi-bold weights for refined legibility.

## Layout & Spacing

The layout philosophy follows a disciplined **12-column responsive fluid grid** with generous rhythmic vertical intervals:

- **Desktop (1200px+)**: 12-column grid with 24px (`1.5rem`) gutters and outer margins scaling to 48px (`3rem`). Section blocks utilize generous padding (`space-2xl` / 64px) to preserve architectural breathing room.
- **Tablet (768px – 1199px)**: 8-column grid with 20px gutters and 32px (`2rem`) outer margins. Search filters transition from an inline persistent bar into a collapsible horizontal ribbon.
- **Mobile (< 768px)**: 4-column grid with 16px (`1rem`) gutters and 20px (`1.25rem`) outer canvas margins. Property cards shift to full-width horizontal viewports, with listing attributes reflowing into two-column data blocks.

## Elevation & Depth

Visual hierarchy uses a refined combination of **tonal stepping, subtle warm-tinted ambient shadows, and crisp 1px hairpins**:

- **Ground Level (Base Canvas)**: Neutral surface `#F5F7FA` or pure `#FFFFFF` without elevation.
- **Level 1 (Cards & Modules)**: Pure white `#FFFFFF` layered with a crisp boundary outline (`1px solid #E2E8F0`) and an extra-soft, diffuse shadow: `0 4px 20px -2px rgba(20, 33, 61, 0.05)`.
- **Level 2 (Active / Hovered Cards & Search Bars)**: Elevated via `0 12px 32px -4px rgba(20, 33, 61, 0.08)`, paired with a delicate gold or royal blue border accent shift.
- **Level 3 (Floating Actions & Modals)**: Floating filter triggers and bottom action bars use `0 20px 48px -8px rgba(20, 33, 61, 0.16)` with light backdrop blur (`backdrop-filter: blur(12px)`) when semi-transparent.
- **Ghost Borders**: Rather than harsh divider rules, content partitions rely on structural `1px` borders colored in `#E2E8F0` to enforce architectural discipline.

## Shapes

The geometric architecture balances soft precision with modern curvature:

- **Core Radius (`0.5rem` to `0.75rem` / 8px – 12px)**: Used for primary property cards, interactive form fields, image containers, and layout panels. The 12px outer radius (`rounded-xl` in specific token configurations) softens structural masonry while preserving a sharp, contemporary look.
- **Pill Geometry (`9999px`)**: Reserved strictly for badges, status chips (e.g., "Verified Title", "Prime Maitama"), category filter pills, and floating action buttons to contrast cleanly against rectangular property imagery.
- **Internal Nesting**: Inner image assets within 12px cards must carry an 8px radius to maintain harmonious optical concentricity.

## Components

### Buttons
- **Primary Action**: Background Royal Blue (`#3F51B5`), text Pure White (`#FFFFFF`), 10px rounded corners or full pill, font `label-lg`, height 48px, horizontal padding `space-lg`. Subtle hover lift with background transition to `#34449A`.
- **Prestige / Gold Action**: Background Soft Gold (`#C9A24B`), text Dark Navy (`#14213D`), medium tracking. Reserved for high-value VIP bookings and direct agent advisory.
- **Secondary / Outlined**: Transparent background with 1px border `#E2E8F0`, text Dark Navy (`#14213D`), hover background `#F5F7FA`.
- **Floating Action Button (FAB)**: Full circular or pill geometry, Royal Blue with pure white iconography, elevated at Level 3 (`0 12px 28px rgba(63, 81, 181, 0.28)`), positioned for rapid inspection booking or WhatsApp direct connect.

### Chips & Badges
- **Status Pills**: Height 26px–30px, pill-shaped radius (`9999px`), padding 4px 12px.
- **Verified / Premium Badge**: Subtle gold container (`rgba(201, 162, 75, 0.12)`), text `#96742B`, 1px border `rgba(201, 162, 75, 0.25)`, typography `label-sm`.
- **Location & Attribute Chips**: Neutral background `#FFFFFF` with `#E2E8F0` border, text `#14213D`.

### Property Cards
- Surface: `#FFFFFF`, 12px corner radius (`rounded-xl`), 1px structural border `#E2E8F0`.
- Top: 16:10 or 4:3 high-definition image container with embedded status pill pinned to top-left.
- Content body: Padding `space-md` (16px) to `space-lg` (24px). Price rendered in `headline-sm` with Royal Blue `#3F51B5`, address and specifications in `body-sm` using neutral gray typography.
- Bottom spec rail: 3-column micro-grid separated by hairline borders showing bedrooms, bathrooms, and square meters.

### Search & Filter Bar
- Form factor: Floating pill-container or 12px unified horizontal bar, elevation Level 2.
- Fields: Divided by vertical `#E2E8F0` hairline rules. Each selector (Location, Property Type, Price Range) features a `label-sm` muted title over a bold `body-md` selection value.
- Action: Embedded primary search button pinned to the right edge with a bold search glyph.

### Form Inputs & Controls
- Input fields: 48px height, 8px corner radius, background `#FFFFFF`, border 1px solid `#E2E8F0`, typography `body-md`. Focus state uses a 1px border `#3F51B5` and subtle ambient ring `rgba(63, 81, 181, 0.15)`.
- Checkboxes & Radios: 20px geometry, custom accent `#3F51B5`, unselected border `#CBD5E1`.