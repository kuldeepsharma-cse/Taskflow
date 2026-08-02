# 05 — Design System

> **Purpose:** The single source of truth for **how TaskFlow looks and feels**.
> Defines visual tokens (colors, typography, spacing), component conventions,
> and layout rules so the UI stays consistent and professional.
> This document is **approved** (2026-08-02).

## Table of Contents

1. [Brand Personality](#1-brand-personality)
2. [Primary Color](#2-primary-color)
3. [Secondary Color](#3-secondary-color)
4. [Background Colors](#4-background-colors)
5. [Text Colors](#5-text-colors)
6. [Success / Warning / Error Colors](#6-success--warning--error-colors)
7. [Typography](#7-typography)
8. [Font Sizes](#8-font-sizes)
9. [Spacing System](#9-spacing-system)
10. [Border Radius](#10-border-radius)
11. [Shadow System](#11-shadow-system)
12. [Button Styles](#12-button-styles)
13. [Input Field Styles](#13-input-field-styles)
14. [Card Styles](#14-card-styles)
15. [Icon Style](#15-icon-style)
16. [Logo Guidelines](#16-logo-guidelines)
17. [Motion & Animation Guidelines](#17-motion--animation-guidelines)
18. [Responsive Breakpoints](#18-responsive-breakpoints)

---

## 1. Brand Personality

- **Modern & minimal** — clean surfaces, generous whitespace, no decoration for its own sake.
- **Calm & focused** — helps users concentrate on work; nothing flashy.
- **Professional & trustworthy** — polished enough for a portfolio/demo; inspired by
  Linear, Huly, Notion, and Jira without copying any of them.
- **Approach:** "quiet UI" — neutral grays carry the layout, one accent color (indigo)
  draws attention to actions.

## 2. Primary Color

**Indigo** — the only accent color in the app. Used for: primary buttons, links,
active states, focus rings, and selected items.

| Token          | Hex       | Tailwind class      | Use                                    |
| -------------- | --------- | ------------------- | -------------------------------------- |
| Primary        | `#4F46E5` | `indigo-600`        | Buttons, links, active states          |
| Primary hover  | `#4338CA` | `indigo-700`        | Hover state for primary elements       |
| Primary light  | `#EEF2FF` | `indigo-50`         | Selected/active backgrounds            |
| On primary     | `#FFFFFF` | `white`             | Text/icons on primary surfaces         |

> Chosen because indigo reads as "productive + modern" (Linear-style), has good
> contrast (4.5:1 on white), and exists in Tailwind's default palette — no custom
> config needed.

## 3. Secondary Color

**Slate** — the neutral "workhorse" color. Used for: secondary buttons, borders,
subtle surfaces, and muted UI chrome.

| Token          | Hex       | Tailwind class      | Use                                    |
| -------------- | --------- | ------------------- | -------------------------------------- |
| Secondary      | `#64748B` | `slate-500`         | Secondary buttons, icons, meta text    |
| Secondary dark | `#475569` | `slate-600`         | Secondary button text, secondary text  |
| Border         | `#E2E8F0` | `slate-200`         | Card/input borders                     |
| Subtle surface | `#F1F5F9` | `slate-100`         | Hover fills, chips                     |

## 4. Background Colors

| Token             | Hex       | Tailwind class | Use                                |
| ----------------- | --------- | -------------- | ---------------------------------- |
| App background    | `#F8FAFC` | `slate-50`     | Page/app backdrop                  |
| Surface (card)    | `#FFFFFF` | `white`        | Cards, inputs, panels              |
| Subtle fill       | `#F1F5F9` | `slate-100`    | Hover, disabled fills, kanban lanes |
| Sidebar / chrome  | `#FFFFFF` | `white`        | Sidebar, top bar (with border)     |

> **Light theme only in v1.0** — dark mode is a v2.0 candidate (kept out of scope
> to stay minimal).

## 5. Text Colors

| Token         | Hex       | Tailwind class | Use                              |
| ------------- | --------- | -------------- | -------------------------------- |
| Primary text  | `#0F172A` | `slate-900`    | Headings, main content           |
| Secondary text| `#475569` | `slate-600`    | Body copy, descriptions          |
| Muted text    | `#94A3B8` | `slate-400`    | Placeholders, timestamps, meta   |
| On primary    | `#FFFFFF` | `white`        | Text on primary buttons          |

> Contrast note: `slate-900`/`slate-600` on white pass WCAG AA. `slate-400` is only
> for non-essential/meta text (passes for large text; acceptable for placeholders).

## 6. Success / Warning / Error Colors

| Token   | Hex       | Tailwind class | Soft background | Border/Text     | Use                         |
| ------- | --------- | -------------- | --------------- | --------------- | --------------------------- |
| Success | `#16A34A` | `green-600`    | `green-50`      | `green-700`     | Completed tasks, save OK    |
| Warning | `#D97706` | `amber-600`    | `amber-50`      | `amber-700`     | Due-soon, caution           |
| Error   | `#DC2626` | `red-600`      | `red-50`        | `red-700`       | Validation, failures        |

Pattern: strong color for icons/accents, `-50` backgrounds for banners, `-700`
for readable text on light backgrounds.

## 7. Typography

| Role        | Choice                                   |
| ----------- | ---------------------------------------- |
| UI font     | **Inter** (Google Fonts) — modern SaaS look |
| Fallbacks   | `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| Mono font   | `ui-monospace, "Cascadia Code", "SF Mono", Consolas, monospace` (code, IDs, dates) |
| Weights     | Regular `400` (body), Medium `500` (labels/buttons), Semibold `600` (headings) |
| Usage       | No bold headlines; weight + size carry hierarchy |

> Inter is the font used by Linear/Huly-style products: neutral, highly readable,
> and free. Loaded via Google Fonts when UI implementation starts (documented in
> PROJECT_MEMORY.md as an approved decision).

## 8. Font Sizes

| Token   | Size       | Line-height | Tailwind | Use                              |
| ------- | ---------- | ----------- | -------- | -------------------------------- |
| xs      | 12px       | 16px        | `text-xs`| Labels, badges, timestamps       |
| sm      | 14px       | 20px        | `text-sm`| **Default app text**, inputs, buttons |
| base    | 16px       | 24px        | `text-base` | Large body, empty states     |
| lg      | 18px       | 28px        | `text-lg`| Card/section titles              |
| xl      | 20px       | 28px        | `text-xl`| Page titles                      |
| 2xl     | 24px       | 32px        | `text-2xl`| Page hero / welcome             |
| 3xl     | 30px       | 36px        | `text-3xl`| Empty-state headlines            |

> The app runs at `text-sm` (14px) as its base — denser, tool-like, Linear-inspired.

## 9. Spacing System

4px base grid, using Tailwind's default scale:

| Step | 1  | 2  | 3  | 4  | 5  | 6  | 8  | 10 | 12 | 16 |
| ---- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| px   | 4  | 8  | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 |

Layout rules:
- Page padding: `24–32px` (`p-6` / `p-8`)
- Section gap: `32px` (`gap-8`)
- Card padding: `24px` (`p-6`); compact cards `16px` (`p-4`)
- Card grid gaps: `16px` (`gap-4`)
- Control/internal spacing: `8–12px` (`gap-2`/`gap-3`)
- Never use odd values off the 4px grid.

## 10. Border Radius

| Token  | Value | Tailwind | Use                      |
| ------ | ----- | -------- | ------------------------ |
| sm     | 6px   | `rounded-md` | Tags, small chips     |
| md     | 8px   | `rounded-lg` | Buttons, inputs        |
| lg     | 12px  | `rounded-xl` | Cards, task cards       |
| xl     | 16px  | `rounded-2xl` | Modals, large panels    |
| full   | 999px | `rounded-full` | Avatars, pill badges  |

## 11. Shadow System

| Token     | Tailwind   | Use                                  |
| --------- | ---------- | ------------------------------------ |
| Card      | `shadow-sm`| Default cards (subtle, low elevation) |
| Elevated  | `shadow-md`| Dropdowns, hovered cards             |
| Overlay   | `shadow-lg`| Modals, popovers                     |
| Focus ring| `ring-2 ring-indigo-500/25` | Keyboard focus on inputs/buttons |

All shadows use the slate tint (`rgb(15 23 42 / …)`) — calm and neutral, never colorful.

## 12. Button Styles

Shared: `rounded-lg`, `font-medium text-sm`, focus ring on keyboard focus,
`disabled:opacity-50 disabled:cursor-not-allowed`.

| Variant  | Classes                                                     |
| -------- | ----------------------------------------------------------- |
| Primary  | `bg-indigo-600 text-white hover:bg-indigo-700`              |
| Secondary| `bg-white text-slate-700 border border-slate-300 hover:bg-slate-50` |
| Ghost    | `text-slate-600 hover:bg-slate-100` (no border)             |
| Danger   | `bg-red-600 text-white hover:bg-red-700`                    |
| Danger ghost | `text-red-600 hover:bg-red-50`                          |

| Size | Classes                        |
| ---- | ------------------------------ |
| sm   | `h-8 px-3 text-xs`             |
| md   | `h-10 px-4` (default)          |
| lg   | `h-11 px-5 text-base`          |
| Icon | `h-10 w-10` (square, icon only)|

## 13. Input Field Styles

- **Base:** `h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400`
- **Focus:** `border-indigo-500 ring-2 ring-indigo-500/25 outline-none`
- **Error:** `border-red-500 ring-2 ring-red-500/25` + helper text `text-xs text-red-600`
- **Disabled:** `bg-slate-50 text-slate-400 cursor-not-allowed`
- **Labels:** `text-sm font-medium text-slate-700` above the field, `mb-1.5`
- **Textarea:** same base, `py-2 min-h-20`
- **Select:** same base styling
- **Checkbox/Radio:** `accent-indigo-600`

## 14. Card Styles

- **Default:** `bg-white rounded-xl border border-slate-200 shadow-sm p-6`
- **Compact:** `p-4` (e.g., Kanban task cards)
- **Clickable:** add `hover:border-slate-300 hover:shadow-md transition`
- **Empty state:** `bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center`

## 15. Icon Style

- **Library:** `lucide-react` (stroke-based, consistent line style) — installed with the UI phase.
- **Stroke:** default `2` (lucide default); `1.75` allowed for dense UIs.
- **Sizes:** `16px` inline/meta · `18–20px` buttons/actions · `24px` empty states.
- **Color:** inherits text color via `currentColor`; neutral `text-slate-500`;
  brand/active `text-indigo-600`; never multiple colors in one icon.
- **Decorative icons:** avoid; icons carry meaning (actions, statuses).

## 16. Logo Guidelines

- **Logo style:** modern, minimal, geometric — matches the brand personality (§1).
- **App name:** **TaskFlow** — wordmark "TaskFlow" next to the icon.
- **Icon:** simple, geometric, and recognizable at small sizes (e.g., an abstract
  check/task mark). The final mark is designed during the UI phase — not yet.
- **Primary color:** Indigo `#4F46E5` — the icon's main color.
- **Secondary color:** Slate `#64748B` — supporting elements (e.g., wordmark or
  accent strokes on light backgrounds).
- **Scalability:**
  - Designed as SVG — must remain readable at `16px` (favicon) and `32–40px` (navbar).
  - Wordmark/icon lockup only at large sizes; icon-only below `24px`.
  - Provide single-color versions: solid indigo and solid white (dark surfaces).
- **Clear space:** padding around the logo equal to one icon width (e.g., `32px`
  icon → `32px` clear space on all sides).
- Do not create the logo image yet; this section only documents the guidelines.

## 17. Motion & Animation Guidelines

- **Default duration:** `200ms`, ease-out curve. Faster (`100–150ms`) for micro
  feedback, never slower than `300ms`.
- **Buttons:** subtle color/background transition on hover; `scale-95` on active
  (while clicking) — e.g., `transition-colors duration-200 active:scale-95`.
- **Cards:** slightly stronger shadow on hover (`shadow-sm` → `shadow-md`) with
  `transition-shadow duration-200`.
- **Inputs:** smooth focus transition — border color + focus ring fade in
  (`transition-colors duration-200`).
- **Page transitions:** simple fade only (opacity, `150–200ms`). No slides,
  parallax, or staggered effects.
- **Principles:** minimal and professional; avoid unnecessary animations; no
  bounce, spin, or looping effects; respect `prefers-reduced-motion` by disabling
  non-essential animations.

## 18. Responsive Breakpoints

Tailwind defaults (mobile-first):

| Breakpoint | Min-width | Behavior                                 |
| ---------- | --------- | ---------------------------------------- |
| sm         | 640px     | Base layout usable                       |
| md         | 768px     | Kanban starts horizontal scroll          |
| lg         | 1024px    | Sidebar expands; 2-column grids          |
| xl         | 1280px    | **Primary target** — full app layout     |
| 2xl        | 1536px    | Max content width capped (`max-w-7xl`)   |

Rules:
- Build desktop-first, verify down to `md`; below `md` the app remains *usable* but
  is not a v1 priority (mobile is a v2.0 candidate).
- Kanban: columns scroll horizontally below `md` instead of stacking.

---

## Accessibility Baseline

- All interactive elements have visible `:focus-visible` (indigo focus ring).
- Text contrast ≥ WCAG AA (see §5). Error/success never conveyed by color alone.
- Semantic HTML (`button`, `label`, `nav`) + keyboard navigation for all controls.

## Do / Don't List

- **Do** use only tokens from this document; keep the 4px grid; prefer `text-sm` UI;
  use indigo only for interactive/active elements.
- **Don't** invent new colors, add gradients, use drop shadows with color tints,
  add animations without purpose, or mix icon libraries.

---

*Status: Approved — 2026-08-02 (incl. §16 Logo Guidelines, §17 Motion & Animation Guidelines).
Implementation (Tailwind `@theme` wiring + Inter font) starts when UI phases begin.*
