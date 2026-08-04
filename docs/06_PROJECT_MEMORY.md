# 06 — Project Memory

> **Purpose:** The single source of truth for **what has been decided and done**.
> A chronological log of decisions, approvals, blockers, and changes.
> **Read this file first in any new session** so work continues from the correct state.

## Table of Contents

1. [How to Use This File](#1-how-to-use-this-file)
2. [Project Overview (Snapshot)](#2-project-overview-snapshot)
3. [Session Log](#3-session-log)
4. [Decisions Log](#4-decisions-log)
5. [Approvals](#5-approvals)
6. [Open Questions / Blockers](#6-open-questions--blockers)
7. [Current Status](#7-current-status)

---

## 1. How to Use This File

- **Read me first** in every session; the current state is always in §7.
- **Append** to the logs — never rewrite or delete history.
- Update this file at the end of every feature, per the workflow in
  [03_DEVELOPMENT_RULES.md](./03_DEVELOPMENT_RULES.md) §1.

## 2. Project Overview (Snapshot)

TaskFlow is a simplified, Huly-inspired project management web app for students,
small teams, developers, and freelancers (see
[01_PROJECT_REQUIREMENTS.md](./01_PROJECT_REQUIREMENTS.md)). Documentation is the
single source of truth: requirements, architecture, rules, phases, and design
system are documented in `docs/`. The tech stack is finalized and approved.
Development has not yet started — the next action is to initialize the React frontend.
(Current phase: [04_DEVELOPMENT_PHASES.md](./04_DEVELOPMENT_PHASES.md) §4.)

## 3. Session Log

### 2026-08-02 — Session 1: Initial requirements
- Created `PROJECT_REQUIREMENTS.md` (vision, problem, solution, goals, users,
  MVP/v2.0 features, functional & non-functional requirements, scope, success criteria).

### 2026-08-02 — Session 2: Documentation suite
- Created `docs/01`–`07` (requirements, architecture, development rules, phases,
  design system, project memory, interview notes) as skeletons with TODOs.
- Chose a `docs/` folder over root files for scalability.

### 2026-08-02 — Session 3: Architecture finalized
- Finalized and approved the technology stack (see §4, decision 02).
- Added the permanent rule "Nothing gets coded until it is documented and approved."
- Marked Documentation and Architecture phases completed.
- Aligned the tech stack in `PROJECT_REQUIREMENTS.md` with `02_ARCHITECTURE.md`.

### 2026-08-02 — Session 4: Frontend foundation
- Phase 3 (Frontend Setup) started: scaffolded React app in `client/` using Vite 8 + React 19 (JavaScript).
- Installed and configured Tailwind CSS v4 (`@tailwindcss/vite` plugin, no config file needed).
- Installed React Router as `react-router@7.18.2` (see decision 06).
- Created `src/` structure: `assets`, `components`, `layouts`, `pages`, `routes`, `services`, `utils`.
- Removed Vite demo boilerplate (App.css, logos, demo page). No pages/components created yet.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint).

### 2026-08-02 — Session 5: Design system (Phase 4)
- Documented the full visual identity in [05_DESIGN_SYSTEM.md](./05_DESIGN_SYSTEM.md) (16 sections: brand personality, colors, typography, spacing, radius, shadows, buttons, inputs, cards, icons, breakpoints).
- All tokens use Tailwind defaults (indigo/slate scales) — near-zero custom config needed.
- User renumbered phases: Design System is Phase 4; backend phases shifted to 5–11.

### 2026-08-02 — Session 6: Documentation improvements
- Added **Logo Guidelines** (§16) to [05_DESIGN_SYSTEM.md](./05_DESIGN_SYSTEM.md):
  modern/minimal/geometric mark, "TaskFlow" wordmark, indigo primary + slate
  secondary, scalable SVG (favicon 16px, navbar 32–40px), no logo image created yet.
- Added **Motion & Animation Guidelines** (§17): 200ms default, button hover +
  `scale-95` on click, card shadow-on-hover, input focus transition, fade-only page
  transitions, `prefers-reduced-motion` respected.
- Replaced the roadmap in [04_DEVELOPMENT_PHASES.md](./04_DEVELOPMENT_PHASES.md) with
  the new order: **UI phases 5–8 (Landing, Auth UI, Dashboard UI, Kanban UI) →
  Backend 9–11 (Setup, Database & Prisma, REST API Integration) → Testing (12) →
  Deployment (13)**. Frontend is fully completed before backend begins.

### 2026-08-02 — Session 7: Phase 5.1 — Landing Navbar
- Created `client/src/components/Navbar.jsx` — sticky, responsive navbar with
  temporary text logo, Features/About anchor links, Login + Get Started buttons,
  and a `useState` mobile hamburger menu. Beginner-friendly comments included.
- Created `client/src/pages/LandingPage.jsx` (renders `<Navbar />`; Hero, Features,
  How It Works, CTA, Footer join in 5.2–5.6).
- Modified `client/src/App.jsx` to render `<LandingPage />`.
- **User adjustment:** no changes to `index.html`/`index.css` — Inter font +
  `@theme` wiring stays pending; navbar uses the system font fallback for now.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-02 — Session 8: Phase 5.2 — Hero Section
- Created `client/src/components/Hero.jsx` — centered hero: headline ("Manage your
  projects with clarity and speed."), supporting description, Get Started + Learn
  More buttons (design-system styles, lg size), small supporting line ("Built for
  students, freelancers and small teams."), and a pure-CSS dashboard mockup
  placeholder (sidebar + top bar + 3 kanban columns — no real data).
- Modified `client/src/pages/LandingPage.jsx` to render `<Hero />` after `<Navbar />`.
- Copy for headline + supporting line provided by user at approval.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies,
  no routing, no animations beyond design system §17.

### 2026-08-02 — Session 9: Hero Section refinement (UI only)
- Refined `client/src/components/Hero.jsx`:
  - Height → `min-h-[85vh]` with flex vertical centering; full-width white background.
  - Pill badge above headline: "✨ Modern Project Management" (user-provided text).
  - Content sits slightly lower (`pt-8` / `pb-24`); buttons→mockup gap `mt-20`.
  - Secondary button text → "Learn More →"; both buttons now `inline-flex h-11 items-center justify-center` (identical boxes).
  - Mockup contrast: borders `slate-200` → `slate-300`, shadow `shadow-lg` → `shadow-xl`.
  - **No gradient** — per user decision, keeping Hero white to stay consistent with the Design System.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-02 — Session 10: Phase 5.3 — Features Section
- Created `client/src/components/FeatureCard.jsx` — reusable card component
  (props: `icon`, `title`, `description`); 48×48 icon container (`h-12 w-12`).
- Created `client/src/components/Features.jsx` — badge "Core Features", heading
  "Everything you need to manage your work.", description, and a `features`
  constant array of 6 items rendered via `features.map()`.
- Grid: `gap-4 sm:grid-cols-2 lg:grid-cols-3` (3 desktop / 2 tablet / 1 mobile).
- Modified `client/src/pages/LandingPage.jsx` to render `<Features />` after `<Hero />`.
- User adjustments at approval: reusable FeatureCard component, data array +
  `.map()`, badge text "Core Features" (no emoji), 48×48 icon container.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-02 — Session 11: Phase 5.4 — How It Works Section
- Created `client/src/components/StepCard.jsx` — reusable step card (props:
  `number`, `icon`, `title`, `description`), styled consistently with FeatureCard
  (same card tokens + "Step {number}" indigo label).
- Created `client/src/components/HowItWorks.jsx` — badge "How It Works", heading
  "Get started in three simple steps.", description, `steps` data array rendered
  with `steps.map()`, and connectors between cards (`h-16 w-px` vertical on mobile /
  `lg:h-px lg:w-16` horizontal on desktop) using React `Fragment`.
- Step content matches product spec: Create Workspace → Add Projects & Tasks →
  Track Progress (workspaces, projects/tasks, Kanban — FR-06/07/10/14/19–21).
- Modified `client/src/pages/LandingPage.jsx` to render `<HowItWorks />` after `<Features />`.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-02 — Session 12: Phase 5.5 — Dashboard Preview Section
- Created `client/src/components/DashboardPreview.jsx` — frontend-only app mockup:
  - Browser-style header (3 colored dots + "TaskFlow" title) making it look like a product screenshot.
  - Sidebar (`hidden sm:flex`): logo placeholder + nav items array (Dashboard, Projects, Tasks, Calendar) with dot indicators, first item active (indigo).
  - Main area: project header ("Website Redesign") with **visual-only "New Task" span** (non-interactive per user), status summary cards (To Do 12 / In Progress 7 / Completed 19), Kanban preview (3 columns × 3 task cards from nested data arrays).
  - Activity panel (`hidden lg:flex`): "Recent Activity" list with colored dots, text, and timestamps.
  - All data in arrays rendered with `.map()`; subtle hover only; `overflow-hidden` prevents horizontal scroll.
- Modified `client/src/pages/LandingPage.jsx` to render `<DashboardPreview />` after `<HowItWorks />`.
- User adjustments at approval: New Task is visual-only; added browser/app header bar.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-02 — Session 13: Phase 5.6 — CTA Section
- Created `client/src/components/CTA.jsx` — indigo brand panel
  (`bg-indigo-600 rounded-xl shadow-md py-16 text-center`) for stronger visual
  emphasis: badge "Get Started", heading "Ready to organize your workflow?",
  description, white **Start Building Free** primary button (inverted for contrast
  on indigo) + ghost **Learn More** (`border-white/30`), stacking on mobile.
- Modified `client/src/pages/LandingPage.jsx` to render `<CTA />` after
  `<DashboardPreview />` (Footer follows in Phase 5.7).
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-02 — Session 14: Phase 5.7 — Footer Section
- Created `client/src/components/Footer.jsx` — `bg-white border-t border-slate-200`
  footer: brand block (TaskFlow logo text + description), Product column
  (Features / How It Works / Dashboard Preview), Connect column (GitHub, X,
  LinkedIn placeholders), bottom bar with "© 2026 TaskFlow. All rights reserved."
  and Privacy Policy / Terms of Service links.
- **User adjustment:** footer links match real landing sections — replaced
  "About" with "Dashboard Preview"; added matching `id` anchors:
  - `Features.jsx` → `id="features"`
  - `HowItWorks.jsx` → `id="how-it-works"`
  - `DashboardPreview.jsx` → `id="dashboard-preview"`
- Modified `client/src/pages/LandingPage.jsx` to render `<Footer />` after `<CTA />`.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.
- **Landing page sections now complete:** Navbar, Hero, Features, How It Works,
  Dashboard Preview, CTA, Footer.

### 2026-08-02 — Session 15: Final Landing Page UI Polish (no new features)
- **Hero** (`Hero.jsx`): removed "Built for students, freelancers and small teams.";
  symmetric `py-20` (was `pt-8 pb-24`) → content truly vertically centered in the
  85vh area and section rhythm uniform everywhere (all sections `py-20` = even
  160px gaps); mockup shadow `shadow-xl` → `shadow-lg` (decision 23).
- **Navbar** (`Navbar.jsx`): "About" → **"How It Works"** pointing to
  `#how-it-works` (desktop + mobile menu); links now `rounded-lg px-3 py-2
  hover:bg-slate-100` pill hover (bigger touch target); **Login → ghost button**
  (`text-slate-600 hover:bg-slate-100`, no border) so Get Started remains the only
  primary CTA; both desktop + mobile buttons moved from off-token `py-2` to
  `h-10` (design-system `md` token), mobile buttons `w-full`.
- **DashboardPreview** (`DashboardPreview.jsx`): realistic upgrade — sidebar nav
  array now includes **Settings** (5 items); new full-width **top bar** between
  the browser header and the app: search pill (inline SVG magnifier + "Search
  tasks…"), bell icon with red notification dot, indigo profile avatar ("A");
  "New Task" span `h-9` → `h-10` token alignment. All visual-only.
- **CTA** (`CTA.jsx`): `focus-visible` rings added (white/40 on the indigo panel —
  indigo ring would be invisible on indigo; the ghost button ring stays white).
- **All interactive buttons** (Hero ×2, Navbar Login/Get Started desktop + mobile,
  hamburger, CTA ×2): `focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-indigo-500/25` per design system §12/§14.
- **Smooth scrolling** (decision 25): `class="scroll-smooth"` on `<html>` in
  `client/index.html` — the first (minimal, class-only) change to index.html;
  Inter font + `@theme` wiring still pending.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies,
  no new features, no animations, no gradients.

### 2026-08-02 — Session 16: Final Spacing + Dashboard Preview Refinement (full designer pass)
- **New shared component `AppWindow.jsx`** (decision 26): the realistic app window
  mockup (top bar with search/bell/avatar, sidebar with 5 nav items, 3 Kanban
  columns, and — only with the `detailed` prop — browser header, project header,
  status cards, activity panel). Used by both the Hero (compact, `shadow-lg`) and
  the Dashboard Preview section (detailed, `shadow-sm`). **Eliminates duplication**
  and fixes the biggest visual disconnect: the Hero previously showed a gray
  wireframe skeleton while the section below showed a realistic window — two
  different "products" on one page.
- **Spacing scale** (decision 27, ~30% tighter):
  - Sections: `py-20` → `py-14` (Features, HowItWorks, DashboardPreview)
  - Hero: `min-h-[85vh]` → `min-h-[70vh]`, `py-20` → `py-12`
  - CTA: section `py-20` → `py-12`, panel `py-16` → `py-12`, buttons `mt-8` → `mt-6`
  - Header → content gap: `mt-12` → `mt-8` in all three card sections
  - Hero: buttons `mt-8` → `mt-6`, mockup `mt-20` → `mt-10` (preview closer to CTA)
  - Footer: `py-12` → `py-10`, columns `gap-10` → `gap-8`, bottom bar `mt-12` → `mt-8`
- **App window details** (decision 28): `rounded-xl` → `rounded-lg`; hover
  elevation removed (hover-elevation is card behavior — windows don't lift);
  subtle `border-slate-200 shadow-sm` only; wider `max-w-5xl` → `max-w-6xl`
  (detailed view); internal paddings reduced (browser header `py-3` → `py-2.5`,
  sidebar `p-4`/`py-2` → `p-3`/`py-1.5`, main `p-4 sm:p-6` → `p-3 sm:p-4`,
  status cards `p-4` → `p-3`, kanban columns `p-3` → `p-2.5`, task cards
  `px-3 py-2` → `px-2.5 py-1.5`, activity `p-4` → `p-3`).
- **Step connectors** shortened: `h-16 w-px` / `lg:h-px lg:w-16` → `h-10` / `lg:w-10`
  so cards breathe with the tighter rhythm.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies,
  no colors or typography changed, no new features.

### 2026-08-04 — Session 17: Phase 6.1 — Authentication Routing & Project Structure
- **Scope (user-approved): routing infrastructure only** — no forms, validation,
  auth logic, or backend (all deferred to 6.2).
- Created empty placeholder pages: `LoginPage.jsx`, `RegisterPage.jsx`
  (centered page-name labels), `DashboardPlaceholder.jsx` (shows only
  "Dashboard coming in Phase 7.").
- Created `client/src/routes/AppRoutes.jsx` — the first real use of the `routes/`
  folder: 4 routes (`/` → LandingPage, `/login`, `/register`, `/dashboard`).
- Wrapped `<App />` in `<BrowserRouter>` in `main.jsx`; `App.jsx` now renders
  `<AppRoutes />` instead of `<LandingPage />` (first real use of the router
  installed in Phase 3).
- `Navbar.jsx`: Login/Get Started buttons (desktop + mobile) changed from
  `<a href="#">` to react-router `<Link to="/login">` / `<Link to="/register">`.
- `CTA.jsx`: "Start Building Free" → `<Link to="/register">`.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-04 — Session 18: Phase 6.2 — Authentication UI (Login & Register)
- **Scope (user-approved): UI only** — reusable components + controlled inputs with
  placeholder state; no validation, error messages, localStorage, guards, auth,
  API, password visibility toggle, or remember-me/forgot-password.
- Created `client/src/components/Input.jsx` — reusable controlled form field
  (props: `label`, `type`, `id`, `name`, `value`, `onChange`, `placeholder`,
  `autoComplete`) styled exactly per design system §13 (h-10, rounded-lg,
  slate-300 border, indigo focus ring, label `mb-1.5 text-sm font-medium`).
- Created `client/src/layouts/AuthLayout.jsx` — first real use of the `layouts/`
  folder: centered shell on `bg-slate-50` (`min-h-screen`, `px-4 py-12`,
  `max-w-md`), TaskFlow logo lockup linking back to `/`, white card
  (§14: `rounded-xl border-slate-200 shadow-sm`), `title` prop + `children`.
- Rebuilt `LoginPage.jsx` — `useState` for email/password, two `Input` fields
  (autoComplete email / current-password), full-width primary **Login** button,
  "Don't have an account? Create one" → `/register`.
- Rebuilt `RegisterPage.jsx` — `useState` for name/email/password/confirm,
  four `Input` fields (autoComplete name/email/new-password), full-width primary
  **Create Account** button, "Already have an account? Log in" → `/login`.
- Both forms: `noValidate` (no browser-native bubbles yet) + `onSubmit`
  `preventDefault` (no page reload) — custom validation comes in Phase 6.3.
- Reuse confirmed: both pages share `Input` + `AuthLayout` — zero duplicated markup.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-04 — Session 19: Phase 6.3 — Form Logic & Client-side Validation
- **Scope (user-approved): validation only** — no localStorage, guards, redirects,
  auth, API, password toggle, or remember-me/forgot-password.
- `Input.jsx` extended with an `error` prop: red border + red focus ring
  (`border-red-500 ring-2 ring-red-500/25`) per design system §13, inline helper
  text `text-xs text-red-600` below the field, plus `aria-invalid` /
  `aria-describedby` for screen readers. No duplicate markup — error UI lives in
  the one shared component.
- Created `client/src/utils/validate.js` — `isValidEmail()` (first real use of the
  `utils/` folder): simple `^\S+@\S+\.\S+$`-style check shared by both pages, so
  the email rule is written once.
- `LoginPage.jsx`: rules — email required, email format, password required.
- `RegisterPage.jsx`: rules — name required, email required, email format,
  password ≥ 6 characters, confirm password required + must match password.
- Pattern on both pages (beginner-friendly, no duplication):
  - `errors` state object keyed by field name.
  - `validate()` collects all problems into a fresh `newErrors` object and returns
    valid only if it is empty — submission is blocked when validation fails.
  - One shared `handleChange(field, value)` updates the value and clears that
    field's error while typing (dynamic key + spread).
  - Each validation rule explained with a comment in the code.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-04 — Session 20: Phase 6.4 — Mock Authentication & Route Guards
- **Scope (user-approved): mock auth + guards only** — no backend, API calls,
  Axios, JWT, Context API, logout, remember-me, forgot-password, password toggle,
  or UI/styling changes.
- Created `client/src/routes/RequireAuth.jsx` — route guard for `/dashboard`:
  reads the mock flag (`localStorage.getItem('isAuthenticated') === 'true'`);
  renders `<Navigate to="/login" replace />` when not authenticated, otherwise
  renders `children`.
- Created `client/src/routes/RedirectIfAuthenticated.jsx` — inverse guard for
  `/login` + `/register` (user decision, 2026-08-04): renders `<Navigate
  to="/dashboard" replace />` when already authenticated, otherwise renders
  `children`. Rule 5 written once, both auth pages stay markup-lean.
- `AppRoutes.jsx`: `/dashboard` wrapped in `<RequireAuth>`; `/login` and
  `/register` wrapped in `<RedirectIfAuthenticated>` — guards live in `routes/`,
  pages stay pure.
- `LoginPage.jsx` + `RegisterPage.jsx`: `useNavigate`; on a **valid** submit →
  `localStorage.setItem('isAuthenticated', 'true')` → `navigate('/dashboard')`.
  Invalid submits still blocked by validation (Phase 6.3).
- DashboardPlaceholder untouched — still the Phase 7 placeholder.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.
- **Phase 6 (Authentication UI) is now complete** — matches `docs/04` §7
  (forms + validation + frontend route guards). Mock flag will be replaced by
  real JWT auth in Phase 11 (token storage question still open, §6).

### 2026-08-04 — Session 21: Phase 6.5 — Authentication Polish (Logout)
- **Scope (user-approved): logout only** — no backend, API, JWT, Context API,
  or additional features; guards untouched.
- `DashboardPlaceholder.jsx` only: added a **Logout** ghost button (§12 ghost
  variant: `text-slate-600 hover:bg-slate-100`, h-10, focus ring, active:scale-95)
  below the placeholder text; page wrapper changed to a flex column with `gap-6`
  to stack text + button.
- Handler: `handleLogout()` → `localStorage.removeItem('isAuthenticated')` →
  `navigate('/login')` via `useNavigate`. Mirrors docs/02 §7 step 4 (client
  discards the auth token).
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

## 4. Decisions Log

| # | Date       | Decision | Reason | Alternatives considered |
| - | ---------- | -------- | ------ | ----------------------- |
| 01 | 2026-08-02 | Documentation lives in `docs/` (`01`–`07`) and is the single source of truth. | Clean root, scales as docs grow. | Files in project root. |
| 02 | 2026-08-02 | Final tech stack approved: React + Vite + JavaScript + Tailwind CSS + React Router + Axios · Node.js + Express · PostgreSQL + Prisma · JWT + bcrypt · Git + GitHub. | Beginner-friendly, industry standard, interview-worthy; aligns both requirements & architecture docs. | TypeScript; SQLite; MongoDB; sessions. |
| 03 | 2026-08-02 | Permanent rule: nothing gets coded until it is documented and approved. | Prevents scope creep; docs stay accurate. | None. |
| 04 | 2026-08-02 | Next phase is Frontend Setup (initialize React frontend) before backend. | User-approved plan. | Backend-first order. |
| 05 | 2026-08-02 | Tailwind CSS v4 via the `@tailwindcss/vite` plugin. | Modern default: no `tailwind.config.js` or PostCSS setup needed. | Tailwind v3 + PostCSS. |
| 06 | 2026-08-02 | Router: `react-router@7.18.2` pinned (not v8, not `react-router-dom`). | v8 requires Node ≥ 22.22 (installed: 22.18); `react-router-dom` was removed in v8; 7.18.2 is the latest 7.x and its single residual advisory (GHSA-qwww-vcr4-c8h2) affects only unstable RSC APIs — not used in our SPA. Clean `npm audit` is not fully possible on Node 22.18. | react-router v8, react-router-dom 7.x. |
| 07 | 2026-08-02 | Frontend folder structure: `src/{assets,components,layouts,pages,routes,services,utils}`. | Beginner-friendly, conventional, matches architecture doc. | Flat structure. |
| 08 | 2026-08-02 | Design system: Indigo `#4F46E5` primary + Slate neutrals; light theme only in v1.0. | Modern SaaS look (Linear/Huly-inspired), AA contrast, Tailwind defaults. | Violet, blue, dark-mode-first. |
| 09 | 2026-08-02 | UI font: **Inter** (Google Fonts) with system fallbacks; base size 14px. | Tool-like density, highly readable, free. | System fonts only. |
| 10 | 2026-08-02 | Icons: **lucide-react** (stroke-based). | Consistent line style, free, popular. | Font Awesome, heroicons. |
| 11 | 2026-08-02 | Phase numbering updated by user: Design System = Phase 4; backend phases 5–11. | User-approved plan. | — |
| 12 | 2026-08-02 | New roadmap: UI phases 5–8 → Backend 9–11 → Testing 12 → Deployment 13. Frontend fully completed before backend starts. | User-approved plan. | Previous mixed order. |
| 13 | 2026-08-02 | Logo guidelines: geometric minimal mark, "TaskFlow" wordmark, indigo primary + slate secondary, scalable to 16px favicon. | Brand consistency; no image created yet. | None (guidelines only). |
| 14 | 2026-08-02 | Motion guidelines: 200ms default; button hover + scale-95 active; card shadow hover; input focus fade; fade-only page transitions; reduced-motion support. | Minimal, professional motion. | Bouncy/staggered effects. |
| 15 | 2026-08-02 | Landing navbar: temporary text logo ("Task" slate-900 + "Flow" indigo-600); anchors (not router links) until Phase 6; inline-SVG hamburger (no icon package yet). | Matches design system; minimal scope. | lucide-react icons now. |
| 16 | 2026-08-02 | Hero section: centered Linear-style layout; headline + description + two lg buttons + CSS-only dashboard mockup (slate blocks, no data); copy per user. | Modern SaaS look, beginner-friendly, no mock data code. | Two-column layout; dashed placeholder box. |
| 17 | 2026-08-02 | Hero refinement: `min-h-[85vh]`, pill badge, button alignment via `inline-flex`, mockup `border-slate-300` + `shadow-xl`. Gradient **rejected** by user — white hero keeps design system consistent. | User-approved polish; consistency with docs. | Soft indigo gradient (declined). |
| 18 | 2026-08-02 | Features section: reusable `FeatureCard` component + `features` data array + `.map()`; 48×48 emoji icon tiles; grid `sm:grid-cols-2 lg:grid-cols-3`; badge "Core Features". | Reusability + beginner-friendly data-driven rendering (user-requested). | Inline 6 cards. |
| 19 | 2026-08-02 | How It Works: reusable `StepCard` + `steps` array + `.map()`; connectors between cards (`Fragment`); vertical line on mobile, horizontal on desktop; step content mirrors product spec. | Consistency with FeatureCard pattern; spec-aligned copy. | Static 3 cards, no connectors. |
| 20 | 2026-08-02 | Dashboard Preview: frontend-only mockup with browser chrome header; "New Task" is a non-interactive `<span>` (no fake actions); sidebar/activity hidden on small screens; data arrays + `.map()`. | Realistic product screenshot feel without fake functionality (user-requested). | Plain bordered placeholder. |
| 21 | 2026-08-02 | CTA section: full indigo panel (`bg-indigo-600`) with inverted white primary button + white ghost secondary; stronger emphasis than card sections. | Brand-color moment; consistent with tokens and motion rules. | White card CTA. |
| 22 | 2026-08-02 | Footer: Product links target real sections via `id` anchors (`#features`, `#how-it-works`, `#dashboard-preview`); "About" replaced per user; social + legal links are placeholders. | Working in-page navigation; no dead links in footer. | Dead `#about` link. |
| 23 | 2026-08-02 | Hero mockup shadow aligned `shadow-xl` → `shadow-lg` (design-system max token). | Token consistency in the polish pass (user-approved). | Keep `shadow-xl`. |
| 24 | 2026-08-02 | `focus-visible` rings added to all interactive buttons (`ring-2 ring-indigo-500/25`; white/40 on the indigo CTA panel for visibility). | Design system §12 documents focus rings; keyboard accessibility. | No rings. |
| 25 | 2026-08-02 | Smooth scrolling via `class="scroll-smooth"` on `<html>` in `index.html` (Tailwind utility). | Better in-page anchor navigation UX (user-requested). | CSS `scroll-behavior` in index.css (index.css remains untouched). |
| 26 | 2026-08-02 | New shared `AppWindow.jsx` mockup component (`detailed` prop) used by Hero (compact) and Dashboard Preview (detailed). | One consistent "product" across the page; no duplicate mockup code; beginner-friendly props lesson. | Keep two separate mockups. |
| 27 | 2026-08-02 | Tighter spacing scale (~30%): sections `py-14`, Hero `min-h-[70vh]` + `py-12`, CTA `py-12` + panel `py-12`, content gaps `mt-8`, footer `py-10`. | Page felt stretched; consistent SaaS rhythm (user-requested 25–35%). | Keep `py-20`. |
| 28 | 2026-08-02 | App window styling: `rounded-lg`, no hover elevation, subtle `border-slate-200 shadow-sm` (hero keeps `shadow-lg` as focal anchor), internal paddings reduced. | Windows don't lift like cards; subtle frame reads as a real app screenshot. | Card-style hover elevation. |
| 29 | 2026-08-04 | Phase 6 split into sub-phases: 6.1 routing infrastructure first (empty pages + AppRoutes + BrowserRouter + Link conversions), forms/validation/mock auth deferred to 6.2. | Smallest reviewable increment; router was idle since Phase 3 and everything builds on it. | All of Phase 6 in one go. |
| 30 | 2026-08-04 | Auth UI built from two reusable pieces: `Input` (controlled field, design-system §13) + `AuthLayout` (centered card shell, §14). Forms use `noValidate` + `preventDefault` so no native validation or reloads happen before custom validation (6.3). | One field component, two pages, zero duplicated markup — same pattern as FeatureCard/StepCard. | Inline fields per page. |
| 31 | 2026-08-04 | Validation lives in an `errors` object per page (`validate()` on submit, field error cleared while typing) + one shared `isValidEmail()` in `utils/validate.js`. Error visuals handled by the single `error` prop on `Input`. | Rules differ per page, but the pattern and email rule are shared; keeps logic beginner-readable. | Shared validation module for all rules. |
| 32 | 2026-08-04 | Mock auth via localStorage flag (`isAuthenticated === 'true'`) + two route guards: `RequireAuth` (protects `/dashboard`) and `RedirectIfAuthenticated` (hides `/login`/`/register` when logged in). Guards compose around pages in `AppRoutes` — pages stay pure. | Beginner-friendly way to deliver real frontend guard behavior before the backend (Phase 11); mirrors docs/02 §7.5. | Context API now; single inline check per page. |
| 33 | 2026-08-04 | Logout = ghost button on `DashboardPlaceholder` clearing the mock flag (`localStorage.removeItem`) + `navigate('/login')`. | Completes the mock auth loop (docs/02 §7 step 4) with existing design-system tokens only. | Logout in a future Navbar/profile menu (Phase 7+). |

## 5. Approvals

- ✅ 2026-08-02 — `PROJECT_REQUIREMENTS.md` (initial) — approved.
- ✅ 2026-08-02 — `docs/` documentation suite skeleton — approved.
- ✅ 2026-08-02 — Architecture / final tech stack — approved.
- ✅ 2026-08-02 — Development rules (§1) — approved.
- ✅ 2026-08-02 — Phase 3: frontend foundation (client/, Tailwind, Router, structure) — approved (verified by user moving to Phase 4).
- ✅ 2026-08-02 — Phase 4: design system + logo/motion guidelines — approved (verified by user moving to Phase 5).
- ✅ 2026-08-02 — Phase 5.1: landing navbar plan — approved (with adjustments: no index.html/index.css changes, memory-only update).
- ✅ 2026-08-02 — Phase 5.2: hero section plan — approved (with copy adjustments: headline + supporting line provided by user).
- ✅ 2026-08-02 — Phase 5.2 refinement — approved (adjustment: no background gradient, Hero stays white; badge text "✨ Modern Project Management").
- ✅ 2026-08-02 — Phase 5.3: features section plan — approved (adjustments: reusable FeatureCard component, data array + `.map()`, badge "Core Features", 48×48 icon container).
- ✅ 2026-08-02 — Phase 5.4: How It Works plan — approved (step content per product spec, style consistent with FeatureCard).
- ✅ 2026-08-02 — Phase 5.5: dashboard preview plan — approved (adjustments: "New Task" visual-only, browser header bar added).
- ✅ 2026-08-02 — Phase 5.6: CTA section plan — approved (as presented).
- ✅ 2026-08-02 — Phase 5.7: footer plan — approved (adjustment: links match real sections, "About" → "Dashboard Preview", section `id` anchors added).
- ✅ 2026-08-02 — Final landing page UI polish pass — approved (decisions: hero shadow → `shadow-lg`; focus-visible rings; smooth scrolling via `scroll-smooth`).
- ✅ 2026-08-02 — Final spacing + dashboard preview refinement — approved (adjustment: full designer pass — hero mockup replaced with the shared realistic AppWindow, cohesive hierarchy).
- ✅ 2026-08-04 — Phase 6.1: authentication routing & project structure plan — approved (scope: routing infrastructure only — empty pages, AppRoutes, BrowserRouter, Navbar/CTA Link conversions; no forms, validation, auth, or backend).
- ✅ 2026-08-04 — Phase 6.2: authentication UI plan — approved (scope: UI only — reusable Input + AuthLayout, controlled Login/Register forms; no validation, error messages, localStorage, guards, auth, API, password toggle, remember-me/forgot-password).
- ✅ 2026-08-04 — Phase 6.3: form logic & client-side validation plan — approved (scope: validation only — required/format/length/match rules, inline errors per §13, submission blocked on failure; no localStorage, guards, redirects, auth, API, password toggle, remember-me/forgot-password).
- ✅ 2026-08-04 — Phase 6.4: mock authentication & route guards plan — approved (scope: RequireAuth + RedirectIfAuthenticated guards, localStorage mock flag, redirects on valid submit and on guarded routes; no backend, API, Axios, JWT, Context API, logout, remember-me, forgot-password, password toggle, or UI changes).
- ✅ 2026-08-04 — Phase 6.5: authentication polish (logout) plan — approved (scope: Logout ghost button on DashboardPlaceholder clearing the mock flag and navigating to /login; no backend, API, JWT, Context API, or additional features; guards untouched).

## 6. Open Questions / Blockers

- `PROJECT_REQUIREMENTS.md` (root) is now superseded by `docs/01_PROJECT_REQUIREMENTS.md`.
  It was updated for stack consistency — decide whether to keep or delete it.
- Token storage decision (localStorage vs httpOnly cookie) — pending, needed in the auth phase.
- Node.js is v22.18.0; React Router v8 requires ≥ 22.22 — upgrade Node later if/when migrating to v8.
- Residual dependency advisory: react-router 7.12–8.2 (GHSA-qwww-vcr4-c8h2, RSC-mode only) — not applicable to our SPA; upgrade path noted in decision 06.
- Inter font + `@theme` wiring still pending (user deferred index.html/index.css changes); system font fallback in use for now. `index.html` now carries `class="scroll-smooth"` only (Session 15).

## 7. Current Status

- **Current Phase:** Phase 6 — Authentication UI ([04_DEVELOPMENT_PHASES.md](./04_DEVELOPMENT_PHASES.md) §7)
- **Completed:**
  - ✅ Project Requirements
  - ✅ Architecture
  - ✅ Development Rules
  - ✅ Frontend foundation (Vite + React + Tailwind v4 + React Router + folder structure)
  - ✅ Design system + Logo Guidelines + Motion Guidelines
  - ✅ Roadmap updated: UI-first (phases 5–8), then backend (9–11), testing, deployment
  - ✅ Phase 5.1 — Landing Navbar (build ✅, lint ✅)
  - ✅ Phase 5.2 — Hero Section + UI refinement (build ✅, lint ✅)
  - ✅ Phase 5.3 — Features Section (build ✅, lint ✅)
  - ✅ Phase 5.4 — How It Works Section (build ✅, lint ✅)
  - ✅ Phase 5.5 — Dashboard Preview Section (build ✅, lint ✅)
  - ✅ Phase 5.6 — CTA Section (build ✅, lint ✅)
  - ✅ Phase 5.7 — Footer Section (build ✅, lint ✅) — landing page complete
  - ✅ Final landing page UI polish pass — spacing, hero balance, realistic
    dashboard preview, navbar refinements, focus rings, smooth scroll (build ✅, lint ✅)
  - ✅ Final spacing + dashboard preview refinement — tighter rhythm (~30%),
    Hero `min-h-[70vh]`, shared `AppWindow.jsx` (hero + preview show one product),
    window not card (build ✅, lint ✅)
  - ✅ Phase 6.1 — Authentication Routing & Project Structure (build ✅, lint ✅):
    empty pages (`/login`, `/register`, `/dashboard` placeholder), `AppRoutes.jsx`,
    `BrowserRouter` in main.jsx, Navbar + CTA wired to real routes via `<Link>`
  - ✅ Phase 6.2 — Authentication UI (build ✅, lint ✅): reusable `Input.jsx` +
    `AuthLayout.jsx`, full Login/Register forms (controlled, `noValidate`,
    `preventDefault`) — UI only, no logic
  - ✅ Phase 6.3 — Form Logic & Client-side Validation (build ✅, lint ✅):
    `errors` object pattern, inline errors via `Input` `error` prop (§13 styles,
    aria-invalid), shared `isValidEmail()` in `utils/validate.js` — submission
    blocked when invalid; still no auth
  - ✅ Phase 6.4 — Mock Authentication & Route Guards (build ✅, lint ✅):
    `RequireAuth` + `RedirectIfAuthenticated` guards, localStorage mock flag,
    valid submit → `/dashboard`, guarded route redirects — **Phase 6 complete**
  - ✅ Phase 6.5 — Authentication Polish: Logout (build ✅, lint ✅):
    ghost **Logout** button on `DashboardPlaceholder` clears the mock flag and
    navigates to `/login` — mock auth loop now complete
- **Next Task:**
  - Phase 7 — Dashboard UI (layout with sidebar + header, workspaces overview,
    project cards, task statistics, empty states) — awaiting user approval to start.

---

*Last updated: 2026-08-04.*
