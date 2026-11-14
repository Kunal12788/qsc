---
name: Sovereign Assay & Hallmark
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#525f75'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0e1c2f'
  on-primary-container: '#77849c'
  inverse-primary: '#bac7e1'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#111c2d'
  on-tertiary-container: '#79849a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3fe'
  primary-fixed-dim: '#bac7e1'
  on-primary-fixed: '#0e1c2f'
  on-primary-fixed-variant: '#3a475c'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
This design system defines an authoritative, enterprise-grade laboratory and metallurgical verification platform. It balances the uncompromising precision of Bureau of Indian Standards (BIS) regulatory compliance with high-value financial technology. 

The aesthetic is Modern Sovereign Corporate—rooted in clean architectural minimalism, ultra-crisp tabular layouts, and tactile authenticity accents reminiscent of certified physical bullion certificates and laser hallmarks. Interfaces must convey absolute mathematical integrity, institutional trust, and forensic calibration, avoiding playful trends in favor of disciplined, high-density clarity.

## Colors
The palette balances institutional navy with precious metal accents against sterile, clinical surfaces:

- **Canvas & Backdrops**: Default canvas is `#FBFBFA` (soft ivory/porcelain), with structural cards resting on `#FFFFFF`. Subtle secondary surface panels use `#F8F9FA`.
- **Primary Sovereign Navy (`#0B192C`)**: Used for high-tier navigation, critical action triggers, and institutional anchor points.
- **Secondary Champagne Gold (`#C5A059`)**: Reserved strictly for authenticity markers, certified XRF assay badges, purity carats (999/916/750), and verification status indicators. Never used for generic body links or non-critical decoration.
- **Structural Slate (`#1E293B`)**: Supports secondary framing, subheaders, and interactive secondary buttons.
- **Borders & Dividers**: Standardize on `#E2E8F0` for table cells and card framing; use a softer `#EEF2F6` for inner list dividers.
- **Typography Tone**: Primary data points and critical labels use `#0F172A`. Supporting metadata and contextual units use `#64748B`.
- **Verification States**: Pass/Compliant uses `#15803D` (deep emerald), Retest/Warning uses `#B45309` (amber), and Fail/Non-compliant uses `#B91C1C` (ruby), framed with 10% opacity fills.

## Typography
Manrope brings architectural distinction and geometric structure to prominent dashboard figures, testing certificate headers, and section groupings. Inter provides high legibility across dense data tables, assay spectral readings, and audit trails.

All numeric figures representing weight, purity percentages, BIS HUID (Hallmark Unique Identification) keys, and batch counts must render with tabular figures (`font-variant-numeric: tabular-nums`). Uppercase styling is strictly reserved for `label-sm` when designating compliance statuses, certificate IDs, and unit descriptors (e.g., `KARAT 22K (916)`, `WEIGHT (G)`).

## Layout & Spacing
The layout follows a 12-column responsive fluid grid designed for dense information displays and multi-pane analytical dashboards:

- **Desktop (>=1280px)**: 12-column grid with `1.5rem` gutters and `2rem` screen margins. Supports collapsible master-detail panels, multi-sample batch spreadsheets, and real-time spectrum graph views.
- **Tablet (768px - 1279px)**: 8-column grid with `1.25rem` gutters and `1.5rem` margins. Side inspection panels convert to docked overlays or drawer views.
- **Mobile (<768px)**: 4-column layout with `1rem` margins and `1rem` gutters. Tables reflow into stacked, scannable assay identification cards.

Vertical rhythm is governed by a strict 4px/8px modular scale. High-density forms and data grids apply compact vertical cell padding (`0.5rem` top/bottom) to maximize scannability during live lab intake.

## Elevation & Depth
Elevation conveys clinical surface separation through subtle tonal boundaries rather than aggressive floating shadows:

- **Level 0 (Flat Canvas)**: `#FBFBFA` baseline with no elevation.
- **Level 1 (Card & Modular Paneling)**: `#FFFFFF` surface enclosed by a 1px solid `#E2E8F0` border, enhanced by a faint ambient floor shadow: `0 1px 3px rgba(11, 25, 44, 0.04), 0 1px 2px rgba(11, 25, 44, 0.02)`.
- **Level 2 (Dropdowns, Flyouts & Action Tooltips)**: `#FFFFFF` surface with `#E2E8F0` border and directional shadow: `0 4px 12px -2px rgba(11, 25, 44, 0.08), 0 2px 6px -1px rgba(11, 25, 44, 0.04)`.
- **Level 3 (Modals & Critical Assay Approvals)**: `#FFFFFF` surface framed by `0 20px 25px -5px rgba(11, 25, 44, 0.12), 0 8px 10px -6px rgba(11, 25, 44, 0.04)` over a 40% opacity backdrop of `#0B192C`.

Precious metal badges utilize no box shadows; their hierarchy is created entirely through dual-tone fills and crisp champagne hairline borders.

## Shapes
A unified roundedness level of `2` provides a balance between contemporary refinement and institutional discipline. Standard cards, analytical view containers, and input fields use an 8px (`0.5rem`) corner radius. 

Micro-elements such as checkboxes, segmented controls, and nested cell badges adopt a tighter 4px (`0.25rem`) profile. Authentic hallmark certificates and purity grade chips use fully rounded capsule contours (`9999px`) to mirror the physical shape of stamped bullion tags and BIS hallmarks.

## Components

### Buttons
- **Primary**: Solid Deep Navy (`#0B192C`) with white text. Hover state shifts to `#1E293B`. Height: 38px (compact) or 44px (standard). Padding: `0.5rem 1.25rem`. Radius: 8px.
- **Secondary**: Crisp white background with a 1px `#E2E8F0` border and `#0F172A` text. Hover introduces `#F8F9FA` background with an `#CBD5E1` border.
- **Tertiary / Utility**: Ghost styling with `#64748B` text, turning to `#0B192C` on hover with a `#F1F5F9` background.
- **Hallmark Verification Action**: Subtle champagne background (`#FAF5EC`) with `#C5A059` border, `#84631D` text, and gold emblem icon.

### Bullion & Assay Badges (Chips)
- **HUID / Purity Chips**: Capsule-shaped badges (`rounded-full`). Purity 999 (24K) and 916 (22K) use `#FAF5EC` fill, `#C5A059` border, and `#84631D` bold monospace text.
- **Status Badges**: Certified (`#F0FDF4` fill, `#15803D` text), In Testing (`#EFF6FF` fill, `#1D4ED8` text), Flagged (`#FEF2F2` fill, `#B91C1C` text). All feature 1px matched borders at 20% alpha.

### Data Tables & Lists
- Table headers use `#F8F9FA` background, uppercase `label-sm` typography with `#64748B`, and 1px bottom border in `#E2E8F0`.
- Rows feature alternating or clean white rows with 1px hairline dividers, hovering to `#F8F9FB`. Numeric assay measurements (specific gravity, XRF spectral readouts) are right-aligned using `data-mono`.

### Form Fields & Inputs
- Inputs feature a 1px `#E2E8F0` outline on `#FFFFFF` ground. Focus shifts the border to `#0B192C` with a 2px outer halo of `rgba(11, 25, 44, 0.08)`.
- Input labels use `label-md` with `#0F172A`. Helper units (e.g., `grams`, `fineness`, `karats`) sit inside the field using right-anchored `#64748B` text.

### Assay Metric Cards
- Standard white ground with subtle border `#E2E8F0`. Upper quadrant displays testing stage and batch ID; central quadrant displays primary weight/purity in `display-lg` Manrope; lower quadrant holds laser-inscribed HUID verification stamps with champagne gold accenting.