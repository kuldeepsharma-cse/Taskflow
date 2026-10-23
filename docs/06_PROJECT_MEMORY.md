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
The frontend (Phases 3–8) is complete; the backend scaffold (Phase 9),
PostgreSQL/Prisma foundation (Phase 10), Phase 11.1 auth foundation, Phase 11.2
CRUD APIs, Phase 11.3 client auth/API integration, Phase 11.4
workspace/project CRUD UI, Phase 11.5 task CRUD UI/Kanban persistence, and Phase
11.6 API-backed Dashboard/Settings/demo seed are complete and verified.
(Current phase: [04_DEVELOPMENT_PHASES.md](./04_DEVELOPMENT_PHASES.md) §12 —
Phase 11.7 is next, pending separate approval. `taskflow_demo` remains
uncreated/unseeded.)

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

### 2026-08-06 — Session 22: Phase 7.1 — Dashboard Shell (layout only)
- **Scope (user-approved):** basic dashboard shell only — sidebar navigation, top
  header, main content area, mock data. No project cards, statistics, charts,
  workspaces UI, Kanban, search/notification logic, new routes, backend, API, or DB.
- Renamed `DashboardPlaceholder.jsx` → `DashboardPage.jsx` (move, no delete, per
  user — file preserved). Content replaced with a generic "Welcome back!" heading
  (no hardcoded user name, per user), a one-line description, and a dashed
  empty-state card (§14 token) as the honest placeholder for Phase 7.2 content.
- Created `client/src/layouts/DashboardLayout.jsx` — the app shell (first real use
  of the `layouts/` folder as a **layout route**):
  - **Sidebar** (`hidden lg:flex`, sticky `h-screen`, white + `border-r`): logo
    lockup linking to `/dashboard`; 5 nav items from a data array (`navItems`
    with lucide icon components + `.map()`); **Dashboard** is a real `NavLink`
    (`end`, indigo active state via `isActive`), the other 4 items are visual-only
    spans (`text-slate-400 cursor-default`) until their pages exist — no dead links
    (extends decision 20's "never fake behavior").
  - **Top header** (sticky, `h-14`, white + `border-b`): visual-only search pill
    (Search icon + "Search tasks…"), visual-only bell with red dot, mock avatar
    "AJ", and the **Logout** ghost button (icon + label) — the Phase 6.5 handler
    moved here (clears `isAuthenticated` → `/login`), so logout is preserved.
  - Main area renders `<Outlet />` for the nested page.
- Modified `client/src/routes/AppRoutes.jsx`: `/dashboard` is now a **nested
  layout route** — `RequireAuth` → `<DashboardLayout>` → index `<DashboardPage />`.
  Guards untouched.
- **Installed `lucide-react`** (decision 10 + design system §15 said "installed
  with the UI phase"; first real use — sidebar, search, bell, logout icons, 16px
  `h-4` inline). Replaces the inline-SVG stopgap from the landing phases.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). Audit warning unchanged
  (known react-router advisory, decision 06).

### 2026-08-06 — Session 23: Phase 7.2 — Dashboard Content
- **Scope (user-approved):** dashboard content only — statistics cards, recent
  projects, recent activity, empty state. No changes to routing, auth,
  DashboardLayout, sidebar, header, or any existing navigation. Hardcoded mock
  data inline; no backend/API/Context/localStorage; no new dependencies.
- Created three reusable components in `client/src/components/` (only where they
  remove duplication):
  - **`StatCard.jsx`** — props `icon` (lucide component), `title`, `value`,
    `description`. §14 default card; slate icon tile (`h-10 w-10 rounded-lg
    bg-slate-100 text-slate-600`, §15); `text-sm` slate-500 title, `text-2xl`
    semibold slate-900 value, `text-xs` slate-400 description.
  - **`ProjectCard.jsx`** — one `project` object prop `{ name, description,
    progress, tasks, dueDate, status }`. Status badge map (§6 soft pills: On
    Track green / At Risk amber / Behind red, neutral fallback for unknown
    statuses); progress bar (`bg-slate-100` track, `bg-indigo-600` fill sized by
    inline `style={{ width: '%' }}`) + `%` label; meta row (`ListTodo` "12
    tasks" · `Calendar` "Due Aug 28", `text-xs`, `border-t` divider). Non-
    clickable — no project pages exist yet (decision 20 honesty rule).
  - **`EmptyState.jsx`** — props `icon`, `title`, `description`. §14 dashed
    token (`border-dashed border-slate-300 p-8 sm:p-12 text-center`), 48px
    slate-100 icon tile, `h-6 w-6` muted icon (FeatureCard precedent), `text-base`
    title, `text-sm` description.
- Rewrote `client/src/pages/DashboardPage.jsx` (content only):
  - Three inline mock arrays (`stats` 4 / `projects` 3 / `activities` 4) —
    same pattern as `Features`/`AppWindow`; generic "Welcome back!" heading kept.
  - Statistics grid (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4`):
    Total Projects 12 (FolderKanban), Total Tasks 48 (ListTodo), Completed 31
    (CheckCircle2), Pending 17 (Clock) — 31 + 17 = 48, numbers consistent.
  - Recent Projects: `projects.length === 0 ? <EmptyState /> :` grid of
    `ProjectCard`s (`sm:grid-cols-2 xl:grid-cols-3 gap-4`) — Website Redesign
    72% On Track / Mobile App MVP 45% At Risk / Backend Migration 90% Behind.
  - Recent Activity: white card (§14), dot-indicator rows via `.map()` — same
    visual language as the landing `AppWindow` activity panel.
  - Page rhythm `space-y-8` (section gap, §9).
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-06 — Session 24: Phase 7.3 — Dashboard Navigation & Placeholder Pages
- **Scope (user-approved):** make all 5 sidebar items functional routes; 4
  placeholder pages; no changes to auth, guards, login/register, or dashboard
  content. Frontend-only; no fake functionality, backend, APIs, Context, or
  state management; no new dependencies.
- Created 4 placeholder pages in `client/src/pages/` — each renders **only the
  existing `EmptyState` component** (zero duplicated UI) with the matching
  sidebar icon + feature-specific copy ("…Coming Soon" + "implemented in a
  later phase"):
  - `ProjectsPage.jsx` (FolderKanban), `TasksPage.jsx` (ListTodo),
    `CalendarPage.jsx` (Calendar), `SettingsPage.jsx` (Settings).
- Modified `client/src/routes/AppRoutes.jsx`: added 4 **nested routes** inside
  the protected `/dashboard` layout route (`projects`, `tasks`, `calendar`,
  `settings`) — every page automatically inherits `RequireAuth` + the
  `DashboardLayout` shell. Guards and existing routes untouched.
- Modified `client/src/layouts/DashboardLayout.jsx`: all 5 `navItems` now have
  a `to` route; the visual-only `<span>` branch was removed — every item is a
  `NavLink` with `end` + indigo `isActive` highlighting, so the active state
  follows the URL on every page. Decision 36's "visual-only spans" are now
  obsolete (their pages exist).
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-06 — Session 25: Phase 7.4 — Dashboard UI Polish (visual only)
- **Scope (user-approved):** visual polish only — no new pages, backend, APIs,
  Context, CRUD, fake functionality, routing, or auth changes. All tweaks on
  design-system tokens (§12/§14/§17, 150–200ms).
- `DashboardLayout.jsx`:
  - **Logout** → proper §12 **danger ghost** (`text-red-600 hover:bg-red-50`,
    `rounded-lg h-10 gap-2`, indigo focus ring, `active:scale-95`); label
    `hidden sm:inline` → icon-only + `aria-label` on small screens.
  - **Search pill → real inert `<input type="search">`** (user decision via
    question): §13 styling (`h-10`, `pl-9` icon, `placeholder:text-slate-400`,
    `hover:border-slate-300`, `focus:border-indigo-500` + indigo focus ring,
    `focus:bg-white`, 150ms border transition). Typing is inert — no state,
    no handler, no search logic (Phase 11). Replaces the non-focusable span
    (updates decision 20/38-era "visual-only" approach for the app header).
  - **Avatar** `h-9 w-9` → `h-10 w-10 text-sm` (icon-button token) +
    `select-none`; right cluster `gap-2 sm:gap-4`; bell `h-10 w-10`, dot
    `aria-hidden`.
  - **Header padding** `px-4 sm:px-6` → `px-4 sm:px-6 lg:px-8` (aligns with
    main content); **main** `p-6 sm:p-8` → `p-4 sm:p-6 lg:p-8` (responsive §9).
  - **Sidebar:** active state stronger (`text-indigo-600` → `text-indigo-700`),
    nav + logo transitions `duration-200` → `duration-150` (§17 micro feedback),
    logo link got a focus-visible ring.
- `StatCard.jsx` + `ProjectCard.jsx`: **subtle hover only** — `transition-shadow
  duration-200 hover:border-slate-300 hover:shadow-md` + explicit
  `cursor-default`. Per user's UX rule: no pointer cursor, no translate/scale/
  lift — informational cards never look clickable (§14/§17).
- `EmptyState.jsx`: centered presentation `mx-auto w-full max-w-2xl`, `p-8
  sm:p-12` (both usages: projects section + placeholder pages).
- `DashboardPage.jsx`: rhythm `space-y-8` → `space-y-6 lg:space-y-8`.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.

### 2026-08-07 — Session 32: Phase 8.5 — Kanban Cleanup, QA & Finalization
- **Scope (user-approved):** QA gate only — full audit of the Phase 8 Kanban
  implementation (state flow, architecture, movement, design system, a11y,
  responsive, shared-component and routing regression, code quality,
  build/lint, e2e). No features, no redesign, no dependencies.
- **Audit result (A–K from the plan):** state/immutability/derived counts —
  pass; component chain presentational — pass; all 4 movement transitions —
  pass; design tokens — pass; a11y (h1→h2→h3, real buttons, focus rings,
  aria) — pass; responsive — pass; EmptyState default branch regression-free —
  pass; routing/guards — pass; code quality — pass.
- **One genuine bug found & fixed:** `moveTask()` silently dropped a task
  when `toColumnId` didn't exist in the columns array (task removed from the
  source, never appended). Unreachable from the UI (buttons only ever pass
  ids from `COLUMN_ORDER`), but it violated the helper's documented "unknown
  ids → safe no-op" contract. Fix: `moveTask` now finds `target` alongside
  `source`; if either is missing, returns the input unchanged. Two lines,
  one file (`client/src/utils/kanban.js`). Verified with a node unit check:
  unknown target / task / source all no-op; valid move still works
  immutably.
- **Deferred (documented, unchanged):** `prefers-reduced-motion` global
  override (touches `index.css` — file user deferred); `getAdjacentColumnId`
  returns `todo` for an unknown id when direction=`forward` (unreachable);
  placeholder pages without `h1` (decision 38, by design).
- **Verified:** `npm run build` ✅, `npm run lint` ✅ (oxlint, 0 warnings);
  headless e2E: landing → guard redirects (unauthenticated `/dashboard`,
  `/dashboard/tasks` → `/login`) → login via real form submit → all 5 routes
  render + NavLink active per URL → movement round trip 4/3/0 → 3/4/0 →
  3/3/1 → 3/4/0 → 4/3/0 + extra cycle → responsive @375/768/1440 (no body
  horizontal overflow anywhere; board scrolls horizontally below 1440@1280
  marker; columns fixed 288px; no card overflow; sidebar hidden <1024,
  visible at 1440) → logout → guard still redirects. No white screens.
- **Not done (out of scope, by design):** backend/API, persistence, DnD,
  task CRUD, filters, search logic, optimistic updates, new dependencies.
- **Phase 8 (Kanban Board UI) is complete and interview-ready.**

### 2026-08-07 — Session 31: Phase 8.4 — Kanban UI & UX Polish
- **Scope (user-approved):** polish only — no behavior, routes, or dependency
  changes. Two refinements at approval: (1) keep the completion action label
  as **"Mark Done"** (with a check icon) — completion must feel distinct from
  plain movement; (2) **cursor-pointer on all movement buttons**, cards stay
  `cursor-default`. Also carried: CheckCircle2 icon for Mark Done, hover
  border darkening (`hover:border-indigo-300` / `hover:border-slate-300`).
- Modified `client/src/components/EmptyState.jsx` — new opt-in **`compact`**
  prop (default byte-identical for other pages): `p-4` container, `h-10 w-10`
  icon tile with `h-5 w-5` icon, `text-sm` title, `text-xs` description —
  same dashed §14 card look, sized for 288px lanes (additive-prop recipe,
  same pattern as AppWindow's `detailed`).
- Modified `client/src/components/KanbanColumn.jsx` — short direction-led
  labels: backward `'Back'`, forward = target title (`'In Progress'`) or
  **`'Mark Done'`** for the done lane (special case kept per user); each move
  now carries an `icon` name (`back`/`forward`/`done`) so TaskCard stays fully
  presentational; lane `min-h-52`; header padding unified to
  `px-2.5 pt-2.5 pb-2` (aligns with card area); in-lane `EmptyState` now
  `compact`.
- Modified `client/src/components/TaskCard.jsx` — movement buttons are now
  subtle **tinted secondary actions**: forward = `border-indigo-200
  bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100`,
  back = `border-slate-200 bg-slate-100 text-slate-600 hover:border-slate-300
  hover:bg-slate-200`; shared base with **`cursor-pointer`**, `h-8 rounded-lg
  px-3 text-xs`, 150ms color transitions, `active:scale-95`, indigo
  focus-visible rings; `moveIcons` map (ArrowLeft/ArrowRight/**CheckCircle2**)
  with icons `aria-hidden`; card body keeps `cursor-default`.
- **Verified:** build ✅, lint ✅; headless CDP check — labels per column
  correct (`In Progress` / `Back` + `Mark Done` / `Back`), button `cursor`
  computed as `pointer`, card `cursor` as `default`, Mark Done button carries
  the indigo tint class and Back the slate tint class; full round trip
  4/3/0 → 3/4/0 → 3/3/1 → 3/4/0 → 4/3/0 with EmptyState toggling correctly.
  No new dependencies.
- **Phase 8.4 (Kanban UI & UX Polish) complete.**

### 2026-08-07 — Session 30: Phase 8.3 — Task Movement & State Management
- **Scope (user-approved):** first interactive board behavior — explicit
  movement buttons (no drag-and-drop, no dependencies); teaches useState,
  immutable updates, callbacks. Two refinements at approval: (1) the movement
  algorithm lives in `utils/kanban.js` as the pure `moveTask(...)` helper —
  TasksPage only owns state and calls `setColumns(prev => moveTask(prev, …))`;
  (2) TaskCard stays fully presentational — KanbanColumn computes the moves,
  TaskCard just renders buttons and invokes `onMoveTask`.
- Created `client/src/utils/kanban.js` — pure kanban workflow helpers (no
  React): `COLUMN_ORDER` (`todo → in-progress → done`, single source of truth
  for the workflow), `getAdjacentColumnId(id, direction)` (null at board
  edges), and **`moveTask(columns, taskId, fromColumnId, toColumnId)`** —
  immutable move: source filtered, target appended with spread, other columns
  keep their reference; unknown task/column → returns input unchanged (safe
  no-op). First real use of the `utils/` folder for board logic (precedent:
  `validate.js`).
- Modified `client/src/pages/TasksPage.jsx` — data renamed `initialColumns`;
  **state ownership moved here**: `const [columns, setColumns] =
  useState(initialColumns)`; `handleMoveTask(taskId, fromColumnId, toColumnId)`
  = `setColumns((prevColumns) => moveTask(prevColumns, taskId, fromColumnId,
  toColumnId))` (functional updater); `<KanbanBoard onMoveTask=…>`. No other
  page changes.
- Modified `client/src/components/KanbanBoard.jsx` — accepts + forwards
  `onMoveTask` and `columns` to every `KanbanColumn` (still zero state).
- Modified `client/src/components/KanbanColumn.jsx` — computes each lane's
  `moves` array via `getAdjacentColumnId` + target titles looked up from the
  `columns` prop (no title duplication): backward first, then forward; the
  forward-to-Done label is "Mark Done", others "Move to {Title}"; passes
  `moves`, `columnId`, `onMoveTask` to every `TaskCard`.
- Modified `client/src/components/TaskCard.jsx` — new movement row (ghost sm
  buttons per §12: `h-8 px-3 text-xs`, ArrowLeft/ArrowRight `h-3.5`,
  focus-visible rings, `active:scale-95`) under a `border-t` divider;
  onClick → `onMoveTask(task.id, columnId, move.toId)`; card body keeps
  `cursor-default` (only buttons are controls).
- **Verified with headless CDP click test:** initial 4/3/0 → forward move
  3/4/0 → "Mark Done" 3/3/1 (Done EmptyState disappears automatically) →
  backward move 4/2/1 — counts always derived, buttons correct per column.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.
- **Phase 8.3 (Task Movement & State Management) complete.**

### 2026-08-07 — Session 29: Phase 8.2 — Task Cards
- **Scope (user-approved):** reusable TaskCard + hardcoded mock tasks +
  conditional rendering (`tasks.length === 0 ? EmptyState : TaskCards`).
  Enhancements at approval: task ID (mono, per §7), estimated time, realistic
  mock data (Website Redesign project context), **contextual EmptyState copy
  per column**, and hover styling that feels interactive (lift + border +
  shadow) — still no clicks, no DnD, no state, no dependencies.
- Created `client/src/components/TaskCard.jsx` — §14 compact card (`p-4`):
  header row = mono task ID (`TF-101`, `text-[10px] text-slate-400` + §7 mono
  font) + **priority badge** (lookup map High red / Medium amber / Low green
  soft pills per §6, neutral fallback); `<h3>` title (`truncate`); tags chips
  (`rounded-md bg-slate-100 px-2 py-0.5 text-xs`) only when `tags.length > 0`
  (`flex-wrap`); footer = assignee avatar (h-6 w-6 initials circle, `title`
  tooltip, token-safe indigo/slate color from data) + Clock estimate + Calendar
  due date (`text-xs text-slate-500`). Hover feel: `transition-all duration-200
  hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md` while keeping
  `cursor-default` (honesty rule — no click behavior yet).
- Modified `client/src/components/KanbanColumn.jsx` — card area is now
  conditional: `column.tasks.length === 0 ? <EmptyState icon={ListTodo}
  title={column.emptyTitle} description={column.emptyDescription} /> :
  <div className="space-y-2.5">{column.tasks.map(task => <TaskCard
  key={task.id} task={task} />)}</div>`. Empty-state copy moved into the data
  (data-driven, per-column).
- Modified `client/src/pages/TasksPage.jsx` — realistic mock tasks filling the
  `columns` array (To Do 4 / In Progress 3 / Done 0 — Done intentionally empty
  so the conditional is visible): TF-101…TF-107, priorities spread High/Medium/
  Low, estimates 1h–6h, due dates Aug 10–18, 3 assignees (Aarav Jain AJ
  bg-indigo-600 / Priya Sharma PS bg-slate-600 / Kabir Mehta KM bg-indigo-400),
  0–2 tags each; each column now also carries `emptyTitle` + `emptyDescription`
  contextual copy. Counts still derived from `tasks.length` (decision 41).
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.
- **Phase 8.2 (Task Cards) complete.**

### 2026-08-07 — Session 28: Sidebar navigation bug fix (white screen on Tasks)
- **Bug reported by user:** clicking **Tasks** in the sidebar navigated to a
  completely white page (no sidebar, no content); persisted across restarts
  and hard refreshes.
- **Root cause (proven with headless-browser tests, no code changes first):**
  `navItems` in `DashboardLayout.jsx` used absolute paths (`/tasks`, `/projects`,
  `/calendar`, `/settings`) but `AppRoutes.jsx` defines those pages as **nested
  routes under `/dashboard`** (`/dashboard/tasks`, …). Clicking a nav item
  navigated outside the route table → React Router matched nothing → rendered
  `null` → whole app (shell included) disappeared → white screen. Bug silently
  present since Phase 7.3 — the nav items were never clicked in a browser
  (QA was code-level) and the Dashboard item (`/dashboard`) was correct, so the
  shell looked fine. The Kanban board code itself was never the problem.
- **Evidence:** headless Edge DOM dumps — `/tasks` → empty `#root` (white);
  `/dashboard/tasks` unauthenticated → login redirect (guard chain OK);
  `/dashboard/tasks` authenticated via CDP (localStorage seeded) → board
  rendered perfectly (Tasks header, To Do / In Progress / Done with
  "No tasks yet" empty states).
- **Fix (user-approved, only file):** `DashboardLayout.jsx` — the 4 wrong `to`
  values updated to `/dashboard/projects`, `/dashboard/tasks`,
  `/dashboard/calendar`, `/dashboard/settings`; Dashboard stays `/dashboard`;
  nav comment now warns paths must stay nested. **No other files touched.**
- **Verification:** `npm run build` ✅, `npm run lint` ✅; CDP click-through of
  all 5 sidebar links — every page renders correctly (Dashboard stats grid,
  Kanban board with 3 columns, 3 placeholder pages).
- **Phase 8.1 remains complete** — board layout was correct; navigation is
  now fully functional for the first time since Phase 7.3.

### 2026-08-07 — Session 27: Phase 8.1 — Kanban Board Layout
- **Scope (user-approved):** board layout only — page header + 3 status columns
  (To Do / In Progress / Done) with fixed widths and horizontal scroll below `md`;
  no task cards (8.2), no movement (8.3), no new dependencies. Two adjustments
  at approval: (1) reuse the existing `EmptyState` inside each empty column
  instead of a blank lane; (2) store `tasks: []` per column and derive the header
  count from `column.tasks.length` — no separate count value.
- Created `client/src/components/KanbanColumn.jsx` — one status lane (single
  `column` prop `{ id, title, tasks }`): `bg-slate-100 rounded-xl` lane (§4
  "kanban lanes" token), header with `<h2>` title (`text-sm font-medium
  text-slate-700`) + count pill (`rounded-full bg-white px-2.5 py-0.5 text-xs
  text-slate-500`), card area rendering the shared `EmptyState` (ListTodo icon,
  "No tasks yet" / "Tasks added to this column will appear here.") until 8.2
  fills it with real cards. `w-72 shrink-0` so columns never squeeze.
- Created `client/src/components/KanbanBoard.jsx` — dumb, data-driven board:
  `flex gap-4 overflow-x-auto pb-2` row, `columns.map()` → `<KanbanColumn>`
  (keyed by `column.id`). Below `md` the row scrolls horizontally per §18 —
  columns never stack.
- Rebuilt `client/src/pages/TasksPage.jsx` — no longer the `EmptyState`
  placeholder (resolves the 7.5 heading debt: first real sub-page with a proper
  `h1`): `h1` "Tasks" (`text-xl font-semibold`), one-line description, mock
  `columns` array (todo / in-progress / done, each `tasks: []`) + `<KanbanBoard>`.
  Page rhythm `space-y-6` (§9).
- No changes to `AppRoutes.jsx` / `DashboardLayout.jsx` — `/dashboard/tasks`
  route + sidebar item already existed.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.
- **Phase 8.1 (Board Layout) complete.**

### 2026-08-06 — Session 26: Phase 7.5 — Dashboard Cleanup, QA & Finalization
- **Scope (user-approved):** QA pass only — no new features, no UI redesign, no
  behavior changes. Only measurable improvements; unchanged files left untouched
  (per user: no formatting churn, no renames, minimal diffs to preserve history).
- **Full code review performed** (DashboardLayout, DashboardPage, 4 placeholder
  pages, StatCard, ProjectCard, EmptyState, AppRoutes, guards): routes ↔ sidebar
  nav match (5/5), logout flow intact, guards intact, **no unused imports,
  variables, or dead code**, no duplication worth extracting, design tokens and
  Tailwind usage consistent (§12/§14/§15/§17), all interactive elements have
  focus-visible rings.
- **Changes made (only the 3 genuine gaps found):**
  1. `ProjectCard.jsx` — progress bar now exposes standard progress semantics:
     `role="progressbar"` + `aria-valuenow={progress}` + `aria-valuemin/max` +
     `aria-label="Progress"` (screen readers previously only heard the "72%" text).
  2. `DashboardLayout.jsx` — mock avatar + decorative bell wrapper marked
     `aria-hidden="true"` (avatar previously announced "AJ" — placeholder chrome
     conveys no real info); sidebar `<nav>` got `aria-label="Main navigation"`.
  3. `DashboardLayout.jsx` — trimmed one overly long header comment.
- Everything else verified clean and left untouched.
- Verified: `npm run build` ✅, `npm run lint` ✅ (oxlint). No new dependencies.
- **Remaining debt (documented):** placeholder pages have no `h1` heading (by
  design, decision 38 — single EmptyState); real pages in later phases introduce
  proper heading structure. Search stays inert until Phase 11. Mock data replaced
  by the API in Phase 11. Dashboard frontend now considered production-quality
  and interview-ready — **Phase 7 complete, final**.

### 2026-10-18 — Session 33: Phase 9.1 — Server Scaffold & Health Check
- **Scope (user-approved):** backend foundation only — `server/` scaffold (Express,
  ESM), one health endpoint, npm scripts, docs. No `.env`, CORS, or error middleware
  (9.2); no database/Prisma (Phase 10); no auth/CRUD (Phase 11); no frontend changes;
  `express` is the only dependency.
- Created `server/package.json` — ESM (`"type": "module"`), scripts `dev`
  (`node --watch src/server.js` — Node's built-in reload, no nodemon) and `start`
  (plain `node src/server.js`).
- Created `server/src/server.js` — entry point: creates the Express app, mounts
  `/api`, listens on `process.env.PORT || 3000` with boot log lines.
- Created `server/src/routes/health.js` — first real `routes/` file:
  `GET /api/health` → `{ "status": "ok" }` (establishes the router pattern Phase 11
  reuses).
- **Bug caught during verification:** the health route was first registered as `/`
  under the `/api` mount, so `/api/health` returned Express's `Cannot GET` 404 page
  while the check (non-empty response) passed. Fixed the route path to `/health`;
  re-verified with an exact body match. Lesson recorded in `docs/07` §9.19.
- **Docs:** `docs/02` §4 documents the server layout + §10 backend run steps;
  `docs/04` §1 (Phase 9 → in progress) + §10 (9.1 checked) + status line; this log;
  decision 47; approval recorded; open question added (Axios drift); `docs/07` §9.19.
- **Verified:** `npm start` ✅ — health body `{"status":"ok"}`; `npm run dev` ✅ —
  same with `--watch`; port released cleanly after each shutdown. Client regression:
  `npm run build` ✅, `npm run lint` ✅ (zero client files touched).
- **Not done (by design):** .env/dotenv, CORS, error-handling middleware,
  logging/validation libs, database, auth, CRUD, tests, deployment.

### 2026-10-22 — Session 34: Phase 9.2 — Env Config, CORS & Error Handling
- **Scope (user-approved):** complete Phase 9 — `.env` + `.env.example` + dotenv,
  CORS restricted to the client origin, JSON 404 + central error handler in
  `middleware/`, docs. No database/Prisma (Phase 10), no auth/CRUD (Phase 11),
  no frontend changes, no commits.
- Created `server/.env` (gitignored): `PORT=3000`,
  `CLIENT_ORIGIN=http://localhost:5173`; `server/.env.example` documents both
  keys and stays committable.
- Created `server/src/middleware/notFound.js` — unmatched routes return
  `404 { "error": { "code": "NOT_FOUND", "message": "Route not found" } }`.
- Created `server/src/middleware/errorHandler.js` — four-argument Express error
  middleware: `statusCode = err.statusCode || err.status || 500`; 5xx errors are
  logged in full server-side and returned as a generic `INTERNAL_ERROR`
  (no stacks/SQL/paths leak); 4xx errors expose `err.message`; respects
  `res.headersSent`.
- Modified `server/src/server.js` — `dotenv.config({ quiet: true })` first, then
  `cors` limited to `CLIENT_ORIGIN` via an origin callback, then `/api` routes,
  `notFound`, `errorHandler` (order matters). Installed `cors@^2.8.6` and
  `dotenv@^18.0.8` (0 vulnerabilities).
- **Finding during verification:** the cors package's string origin option sends
  a fixed `Access-Control-Allow-Origin` header even to disallowed origins (the
  browser still blocks the response). The origin callback omits the header
  entirely for other origins, matching the approved deny test.
- **Verified with real responses/headers:** boot log shows port + allowed origin;
  health body `{"status":"ok"}`; allowed origin → `Access-Control-Allow-Origin:
  http://localhost:5173`; denied origin → no ACAO header; OPTIONS preflight →
  `204` + allow headers; unknown `/api/...` and `/` → JSON 404; thrown error →
  `500` generic JSON, no secret text in the body, full error in server stderr;
  `.env` PORT=3001 honored (3000 closed) and restored byte-identically; server
  boots without `.env` using the 3000/default-origin fallbacks; `npm start` ✅,
  `npm run dev` ✅; client build ✅ + lint ✅ (zero client files touched); ports
  released after every test.
- **Docs:** `docs/02` §3/§4/§10; `docs/04` §1 (stale Phase 5–7 rows corrected),
  §4 Axios claim corrected, §10 + status; this log; decisions 48–50; approval
  recorded; Axios open-question corrected; `docs/07` §9.20.
- **Not done (by design):** database/Prisma, auth, CRUD, request body parsing
  (`express.json()`), validation/logging libraries, automated tests, deployment.

### 2026-10-22 — Session 35: Phase 10 — Database & Prisma
- **Scope (user-approved):** PostgreSQL + Prisma foundation only — local
  `taskflow_dev` database, Prisma schema + one initial migration, shared client,
  connection check, docs. No auth/CRUD APIs (Phase 11), no frontend changes, no
  seeds, no commits.
- **Dependencies:** `@prisma/client@7.10.1`, `@prisma/adapter-pg@7.10.1`,
  `pg@8.23.1`, dev `prisma@7.10.1`; `npm audit` reports 0 vulnerabilities.
- **Why Prisma 7.10.1:** current stable; Prisma 6 support ends 2026-11-19; Prisma 8
  is still a release candidate; the newer `prisma-client` generator emits
  TypeScript and conflicts with the JavaScript-only stack. The legacy
  `prisma-client-js` generator works with `@prisma/adapter-pg` + `pg`.
- Created `server/prisma.config.js` — loads `dotenv/config`, sets schema/migrations
  paths, and supplies `DATABASE_URL` to the Prisma CLI.
- Created `server/prisma/schema.prisma` — `User`, `Workspace`, `Project`, `Task`;
  `TaskStatus` / `TaskPriority` enums; unique `User.email`; indexes on
  `Workspace.ownerId`, `Project.workspaceId`, `Task.projectId`,
  `Task.assigneeId`, `Task.status`; delete rules:
  workspace owner `RESTRICT`, project→workspace and task→project `CASCADE`,
  task assignee `SET NULL`.
- Created `server/src/db/prisma.js` — shared adapter-backed Prisma Client.
  The generated client is CommonJS, so the module uses a default import and
  destructures `PrismaClient`; a named import failed with a Node ESM interop error.
- Created `server/src/db/check.js` — read-only `SELECT current_database(),
  current_user` smoke test; `npm run db:check` passes.
- Modified `server/package.json` — Prisma dependencies + `db:generate`,
  `db:migrate`, `db:status`, `db:check` scripts. Modified `.env.example` with a
  placeholder `DATABASE_URL`; the real `.env` is gitignored and never displayed.
- Created migration `20261022145549_init` with
  `prisma migrate dev --create-only --name init`; reviewed the SQL, then applied
  it with `npm run db:migrate`. Prisma reports the schema is up to date.
- **Verified after apply:** `_prisma_migrations` has one finished row with
  `applied_steps_count = 1`; tables `User`, `Workspace`, `Project`, `Task` exist
  and are empty; both enums, all six application indexes, and all four foreign
  keys match the schema; `npm run db:check` passes; `npx prisma validate` passes.
- **DB independence:** `/api/health` returned `{"status":"ok"}` while
  `DATABASE_URL` was deliberately invalid; `server/src/server.js` imported no
  Prisma/database module at that time. Port 3000 was released after the test.
  (Phase 11.1 later introduced lazy `getPrisma()`; see Session 36.)
- **Client regression:** `npm run lint` ✅ and `npm run build` ✅; zero client
  files touched in this phase.
- **Tooling note:** an ad-hoc `psql -c` check initially produced false negatives
  because PowerShell stripped quotes around mixed-case identifiers. Running the
  same read-only SQL via stdin confirmed the tables. Raw SQL must quote `"User"`,
  `"Workspace"`, `"Project"`, and `"Task"`.
- **Docs:** `docs/02` §4/§5/§8/§10; `docs/04` overview + §11 + status; this log;
  decisions 51–53; approvals; open questions; `docs/07` §5, §7, §9.21.
- **Not done (by design):** auth, CRUD APIs, request body parsing, seeds, frontend
  wiring, tests, deployment, documentation of unapproved models/fields.

### 2026-10-23 — Session 36: Phase 11.1 — Backend auth foundation
- **Scope (user-approved):** auth foundation only — bcrypt/JWT dependencies,
  register/login/me endpoints, Bearer middleware, lazy Prisma, error handling,
  and docs. No CRUD, client changes, schema/migrations, seeds, or commits. The
  user allowed exactly one temporary test user; it was created and deleted.
- **Dependencies:** `bcrypt@^6.0.0` + `jsonwebtoken@^9.0.3` (17 packages added);
  `npm audit` reports 0 vulnerabilities; bcrypt load/hash/compare verified.
- **Created:** `server/src/utils/AppError.js`, `validation.js`, `password.js`,
  `token.js`, `selects.js`; `server/src/middleware/requireAuth.js`;
  `server/src/routes/auth.js`; `server/src/routes/me.js`.
- **Modified:** `server/package.json` + lockfile, `.env.example`, `.env` (local
  secret only, never displayed), `src/server.js`, `src/db/prisma.js`,
  `src/db/check.js`, `src/middleware/errorHandler.js`, docs 02/04/06/07.
- **Auth behavior:** register (201) hashes passwords with bcrypt (12 rounds) and
  returns a signed JWT + safe user; login (200) normalizes email and returns the
  same shape; `GET /api/me` requires `Authorization: Bearer <token>`. Duplicate
  email → `409 EMAIL_IN_USE`; bad credentials → generic `401 INVALID_CREDENTIALS`;
  validation → `400 VALIDATION_ERROR` with field details; invalid JSON →
  `400 INVALID_JSON`; unexpected errors → generic `500 INTERNAL_ERROR`.
- **JWT:** HS256, payload `{ sub: "<userId>" }`, default `7d`,
  `JWT_SECRET` minimum 32 characters; a missing/short secret is rejected as a safe
  `500 SERVER_MISCONFIGURED`. Tokens, passwords, and hashes are never returned in
  user responses or logged.
- **Safety:** `utils/selects.js` is the only user shape returned to clients;
  `passwordHash` is never selected for responses. `db:check` now logs only a
  generic success/failure message instead of printing the database name/role.
- **Lazy Prisma:** `src/db/prisma.js` exports `getPrisma()` and creates the
  adapter-backed client on first call. `/api/health` remains database-independent:
  it returned `200 {"status":"ok"}` with a deliberately invalid `DATABASE_URL`,
  and unauthenticated `/api/me` returned 401 without a database connection.
- **Error handling:** central handler now supports safe 4xx details, maps Prisma
  `P2002` to `EMAIL_IN_USE`, handles invalid JSON, hides 5xx internals, and logs
  only safe metadata/stack frames (no request bodies, headers, tokens, or secrets).
- **Verification:** syntax checks on all server files; utility checks (JWT
  payload, bcrypt compare, null-body validation); `npm run db:check`; 15 HTTP
  checks covering health independence, validation, duplicate email, login,
  missing/invalid/non-Bearer tokens, valid `/api/me`, 404, and health regression;
  short-secret failure path; one test user created and deleted; final database row
  counts `{ users: 0, workspaces: 0, projects: 0, tasks: 0 }`; client `npm run
  lint` ✅ and `npm run build` ✅; zero client files touched.
- **Not done (by design):** workspace/project/task CRUD, `PATCH /api/me`, seed
  strategy, Vite proxy, Axios/frontend auth wiring, and commits.

### 2026-10-23 — Session 37: Phase 11.2 — Workspace, project & task CRUD
- **Scope (user-approved):** owner-scoped workspace/project/task CRUD, nested
  project/task list/create routes, validation, date-only `dueDate`, app/server
  split, isolated integration tests, `.env.example` test URL, and docs. No client
  changes, schema/migrations, seeds, new dependencies, or commits.
- **Created:** `server/src/app.js`; `server/src/routes/workspaces.js`,
  `projects.js`, `tasks.js`; `server/src/utils/ownership.js`;
  `server/tests/crud.test.js`.
- **Modified:** `server/src/server.js` (thin listener),
  `server/src/utils/validation.js` (CRUD validation + `parseId`),
  `server/src/utils/selects.js` (workspace/project/task selects +
  `serializeTask`), `server/package.json` (`test` script), `server/.env.example`
  (`TEST_DATABASE_URL` placeholder), docs 02/04/06/07.
- **Dependencies:** none installed; `server/package-lock.json` unchanged.
- **API behavior:** `GET/POST /api/workspaces`,
  `GET/PATCH/DELETE /api/workspaces/:workspaceId`,
  `GET/POST /api/workspaces/:workspaceId/projects`,
  `PATCH/DELETE /api/projects/:projectId`,
  `GET/POST /api/projects/:projectId/tasks`, and
  `PATCH/DELETE /api/tasks/:taskId`. All require Bearer auth. Owners come from
  the JWT; parent IDs come from URLs and cannot be moved by `PATCH`; missing or
  foreign resources return `404 NOT_FOUND`; task assignees are limited to the
  workspace owner.
- **Validation/response behavior:** names 1–100, titles 1–200, descriptions
  ≤2,000; status `TODO|IN_PROGRESS|DONE`; priority `LOW|MEDIUM|HIGH`; PATCH
  requires a recognized field. `dueDate` accepts `YYYY-MM-DD` or `null`, is
  stored at UTC midnight, and is serialized as `YYYY-MM-DD`. Lists use
  `{ data: [...] }`; creates `201`, updates `200`, deletes `204`.
  Workspaces/projects sort newest-first; tasks oldest-first.
- **Testing safety:** user created isolated `taskflow_test`; the committed
  migration was applied to it once (no schema/migration change). The test runner
  refuses to write unless `TEST_DATABASE_URL` exists, differs from
  `DATABASE_URL`, is not production, targets `taskflow_test`, and uses the
  `public` schema; it also verifies `current_database()` before user writes.
  Cleanup deletes only exact tracked IDs (tasks → projects → workspaces → users)
  and verifies they are gone; no truncate/reset/seed/broad cleanup.
- **Verification:** read-only guard check confirmed `taskflow_test/public`;
  `npm test` passed 9 tests / 8 subtests (workspace, project, task, validation,
  two-user ownership, dueDate, cascade, exact-ID cleanup); both
  `taskflow_test` and `taskflow_dev` ended with zero application rows and one
  applied migration; health/CORS regression passed; `db:status` up to date;
  server `npm audit --omit=dev` found 0 vulnerabilities; client lint and build
  passed; zero client files touched.
- **Known risk:** client `npm audit --omit=dev` reports 3 high-severity
  advisories in the existing toolchain (`nanoid`, `source-map-js`, `vite`).
  No upgrade was attempted because dependency changes were outside this
  approved scope.
- **Not done (by design):** `PATCH /api/me`, seed strategy, Vite proxy,
  Axios/frontend wiring, and commits.

### 2026-10-23 — Session 38: Phase 11.3 — Client API & authentication wiring
- **Scope (user-approved):** client API/Axios foundation and real authentication
  against the Phase 11.1 backend; isolated-DB verification, docs, and diff/status
  review. Preserve existing Kanban/WIP changes; Axios only; no backend, schema,
  migration, or development-DB changes; no secrets logged; no commits/pushes;
  stop after 11.3.
- **Dependency:** installed `axios@^1.20.0` (27 packages). No unrelated upgrades
  and no `npm audit fix`; the client audit remains at the existing 3 high
  advisories (`nanoid`, `source-map-js`, `vite`).
- **Created:** `client/src/services/api.js`, `client/src/services/auth.js`,
  `client/src/context/AuthContext.jsx`, `client/src/context/authContext.js`,
  `client/src/utils/authStorage.js`, `client/src/utils/authRedirect.js`,
  `client/src/components/AuthLoadingScreen.jsx`,
  `client/src/components/FormAlert.jsx`.
- **Modified:** `client/package.json` + lockfile, `client/vite.config.js`,
  `client/src/main.jsx`, both auth pages, both route guards,
  `client/src/layouts/DashboardLayout.jsx`,
  `client/src/pages/DashboardPage.jsx`, and `client/src/utils/validate.js`
  (`mapFieldErrors`).
- **Session design:** `AuthProvider` owns `{ user, status, sessionError, login,
  register, logout, retrySession }`. A stored JWT starts in `checking`; `/api/me`
  either hydrates the safe user or a `401` clears the token. Network/5xx failures
  show `AuthLoadingScreen` with retry. Login/register save only
  `taskflow_token`; the mock `isAuthenticated` flag is removed. User data stays
  in React state, never localStorage.
- **HTTP layer:** Axios uses `VITE_API_URL || '/api'` with a 10s timeout, adds
  `Authorization: Bearer <token>`, and normalizes errors to
  `{ status, code, message, details }`. Vite proxies `/api` to
  `http://localhost:3000`; backend/CORS were not changed.
- **Forms/guards:** Login and Register make real calls, disable while pending,
  map server field details onto inputs, and show form alerts for invalid
  credentials, duplicate email, network, and server errors. `RequireAuth`
  redirects to `/login` with the intended `/dashboard/...` path;
  `RedirectIfAuthenticated` validates and uses the same return path. Both wait
  for the session check instead of flashing the wrong page.
- **Dashboard:** real user name powers "Welcome back, {firstName}!", the avatar
  initials (`role="img"` + accessible label), and logout. Mock statistics,
  projects, and Kanban data were intentionally left unchanged.
- **Lint structure:** exporting `AuthProvider` and `useAuth` from one file
  triggered `react(only-export-components)`; split into `AuthContext.jsx`
  (provider) and `authContext.js` (context + hook). Lint is clean.
- **Verification:** backend `npm test` passed 9 tests; 12 API/proxy checks passed
  against isolated `taskflow_test` (health via proxy, register, duplicate email,
  invalid login, login, missing/invalid token, `/me`, validation, safe user,
  exact cleanup); one 17-check browser flow passed (registration, token/legacy
  flag handling, initials, logout, duplicate/invalid login, refresh session,
  backend-down retry, console-secret scan, cleanup); one targeted 10-check browser
  flow passed (unauthenticated `/dashboard/tasks` → `/login`, login returned to
  `/dashboard/tasks`, real greeting, initials, logout, cleanup). Client
  `npm run lint` and `npm run build` pass.
- **Test safety:** every write-enabled verification asserted
  `current_database() = taskflow_test` and removed only its generated user.
  `taskflow_dev` was never written to. Temporary verification scripts were
  deleted.
- **Tooling note:** the targeted browser harness completed all assertions but
  kept its DB pool open during teardown and was terminated after the timeout; no
  app process or test row remained. This was a harness teardown issue, not an
  application failure.
- **Not done (by design):** `PATCH /api/me`, seed strategy, replacing
  dashboard/Kanban mock data with API-backed CRUD, dependency upgrades, backend
  changes, commits, and push.

### 2026-10-23 — Session 39: Phase 11.4 — Workspace & project CRUD UI
- **Scope (user-approved):** API-backed workspace/project management on the
  Projects page, with isolated verification and docs. Preserve all WIP files; no
  backend, schema, migration, auth, dependency, development-DB, or unrelated
  changes; no secrets logged; no commit/push; stop after 11.4.
- **Dependencies:** none installed.
- **Created:** `client/src/services/workspaces.js`,
  `client/src/services/projects.js`, `client/src/components/Textarea.jsx`,
  `WorkspaceSidebar.jsx`, `ProjectForm.jsx`, and `ProjectListItem.jsx`.
- **Modified:** `client/src/pages/ProjectsPage.jsx` (full workspace/project CRUD
  UI) and `client/src/utils/validate.js` (shared name/description rules).
- **Behavior:** workspaces load on mount; projects load whenever selection
  changes. Selection is page-local, keeps a still-existing workspace, and
  otherwise falls back to the newest workspace. Inline forms handle workspace
  create/rename and project create/edit; inline confirmations warn that deleting
  a workspace cascades projects/tasks and deleting a project cascades tasks.
  Failed deletes keep the confirmation open. Synchronous `useRef` locks prevent
  duplicate saves/deletes. Loading, empty, error, and retry states are explicit,
  and stale async results are ignored.
- **Data honesty:** the page displays only real API fields; no fabricated
  status, progress, counts, or due dates. The Dashboard `ProjectCard` and all
  Kanban/dashboard mock data remain untouched.
- **Validation:** client rules mirror the server (name 1–100, description
  ≤2,000); API field details map back to inputs; empty descriptions are sent as
  `null`.
- **Verification:** client `npm run lint` ✅ and `npm run build` ✅; backend
  `npm test` 9/9 ✅; isolated 14-check browser/API harness against `taskflow_test`
  ✅ (empty state, blank/limit validation, workspace/project CRUD, reload,
  simulated load failure + retry, delete failure + duplicate guard, workspace
  cascade, final empty state, zero browser exceptions). The harness used a
  local test-only Express wrapper for failure injection; `taskflow_test` ended
  at zero application rows and `taskflow_dev` counts were unchanged. The
  temporary harness, Edge profile, and test ports were cleaned up; the user's
  existing dev servers on 3000/5173 were untouched.
- **Known risk:** client audit remains at the existing 3 high advisories
  (`nanoid`, `source-map-js`, `vite`); no upgrade was attempted.
- **Not done (by design):** task CRUD UI, API-backed dashboard/Kanban data,
  `PATCH /api/me`, seeds, backend changes, commits, and push.

### 2026-10-23 — Session 40: Phase 11.5 — Task CRUD UI & Kanban persistence
- **Scope (user-approved):** connect the existing Tasks/Kanban UI to the
  verified task APIs; preserve styling and WIP; no backend, schema, migration,
  auth, dependency, or development-DB changes; test only in `taskflow_test`;
  exact-ID cleanup; no secrets; docs only 02/04/06/07 after verification; no
  commit/push; stop after 11.5.
- **Dependencies:** none installed.
- **Created:** `client/src/services/tasks.js`,
  `client/src/components/TaskForm.jsx`, `Select.jsx`, `LoadingPanel.jsx`, and
  `ErrorPanel.jsx`.
- **Modified:** `client/src/pages/TasksPage.jsx` (API-backed board and task
  CRUD), `TaskCard.jsx` (real fields, edit/delete, pending moves),
  `KanbanColumn.jsx`/`KanbanBoard.jsx` (callbacks), `utils/kanban.js`
  (column-to-status map and grouping; removed local `moveTask`),
  `utils/validate.js` (200-character task title rule), and `ProjectsPage.jsx`
  (shared loading/error panels).
- **Selection and loading:** workspace/project ids live in the URL
  (`?workspaceId=…&projectId=…`); dependent loads keep valid selections and
  otherwise choose the first/newest item. Switching clears stale editors,
  tasks, and errors; effect cleanup ignores late responses. The page has
  explicit workspace/project/task loading, empty, error, and retry states.
- **CRUD and status:** create starts in `TODO`; edit covers title, description,
  priority, due date, and Unassigned/current-user assignee. Status changes use
  the existing board buttons and are confirmed by `PATCH` before the card
  moves; `useRef` locks block duplicate moves, failed requests keep the old
  column, and an inline confirmation guards deletion. A latest-project ref
  ignores a create that finishes after the user switches projects.
- **Data honesty and ordering:** cards show only real API fields (title,
  priority, due date, assignee, `TF-{id}`); unsupported tags/estimates were
  removed. A single `COLUMN_STATUS` map drives grouping; the API's
  oldest-first order is preserved, so there is no custom within-column order.
- **Verification:** client `npm run lint` ✅ and `npm run build` ✅; backend
  `npm test` 9/9 ✅; isolated 14-check browser/API harness against
  `taskflow_test` ✅ (database target, board load, create validation,
  create/reload, status/reload, edit/reload, delete/reload, no leftover rows,
  exact-ID cleanup, unchanged `taskflow_dev` counts); `git diff --check` clean
  (CRLF warnings only). Temporary harness was removed after use.
- **Known risk:** client audit remains at the existing 3 high advisories
  (`nanoid`, `source-map-js`, `vite`); no upgrade attempted.
- **Not done (by design):** drag-and-drop, custom Kanban ordering, task
  tags/estimates, API-backed dashboard data, `PATCH /api/me`, seeds, backend
  changes, commits, push, and Phase 11.6.

### 2026-10-23 — Session 41: Phase 11.6 — API-backed Dashboard, Settings & demo seed
- **Scope (user-approved):** API-backed Dashboard, profile/password endpoints and
  Settings UI, plus a guarded demo seed; preserve existing design and working
  features; require the current password for email/password changes; accept
  existing JWT validity after a password change for this phase; test only on
  `taskflow_test`; never write `taskflow_dev`; do not create/seed `taskflow_demo`
  without separate approval; docs only 02/04/06/07 after checks; no
  commit/push; stop after 11.6.
- **Dependencies:** none installed. Schema/migrations unchanged.
- **Created:** `client/src/utils/dashboard.js`,
  `client/src/components/ProfileForm.jsx`, `PasswordForm.jsx`,
  `server/tests/profile.test.js`, and `server/src/db/seed-demo.js`.
- **Modified:** `client/src/pages/DashboardPage.jsx` (API-backed stats/projects/
  recent tasks), `ProjectCard.jsx` (real workspace/task fields and derived
  progress), `SettingsPage.jsx`, `services/auth.js`, `context/AuthContext.jsx`,
  `server/src/routes/me.js`, `server/src/utils/validation.js`,
  `server/package.json` (test + `db:seed:demo` scripts), and
  `server/.env.example` (demo placeholders).
- **Backend contract:** `PATCH /api/me` updates `name`/`email`; changing email
  requires `currentPassword`. Missing/wrong current password is
  `400 VALIDATION_ERROR` on the field (not `401`, to avoid a false session
  logout), duplicate email is `409 EMAIL_IN_USE`, and responses use the safe user
  shape. `PATCH /api/me/password` requires `currentPassword` and enforces the
  existing 6-character/72-byte rules. Existing JWTs remain valid after a change;
  immediate stateless-token revocation is deferred.
- **Settings UI:** two real forms with pending/error/success states and server
  field-detail mapping. The current-password field appears only when the email
  changes; a successful password change logs out the current client and redirects
  to `/login`.
- **Dashboard:** one chained fetch (workspaces → projects → tasks) and pure
  client-side aggregation in `utils/dashboard.js`. It renders real workspace/
  project/task counts, completion percentage, three newest projects with derived
  progress, and five newest updated tasks. The old mock stats, statuses, due
  dates, and Recent Activity feed were removed; loading/error/retry/empty states
  are explicit.
- **Demo seed:** idempotent per demo user; requires `DEMO_DATABASE_URL`,
  `DEMO_USER_EMAIL`, `DEMO_USER_PASSWORD`, and `--confirm`; refuses production,
  `taskflow_dev`, the development URL, non-demo/test database names, and a
  database/schema mismatch. A Prisma `createMany` nested-write mistake was found
  and replaced with nested `create`; cleanup must delete workspaces before the
  user because `Workspace.ownerId` is `RESTRICT`.
- **Verification:** backend `npm test` 17/17 ✅; client `npm run lint` ✅ and
  `npm run build` ✅; isolated Edge/CDP UI harness against `taskflow_test`
  verified dashboard data, real project cards, removed mock activity, profile
  update, conditional email password field, password-change logout, and old/new
  login behavior ✅; the seed guard rejected `taskflow_dev`, and a seeded
  `taskflow_test` run produced 2 workspaces / 4 projects / 16 tasks then cleaned
  up ✅. No leftover rows, no `taskflow_demo` operation, no dependency changes,
  and no commits.
- **Known risks:** client audit remains at the existing 3 high advisories;
  password changes do not invalidate existing JWTs yet; the demo seed is verified
  but `taskflow_demo` itself has not been created/seeded; Dashboard fan-out is
  one request per workspace/project, acceptable for the MVP.
- **Not done (by design):** Phase 11.7, `taskflow_demo` creation/seeding, token
  revocation, commits, and push.

### 2026-10-23 — Session 42: Phase 11.6.5 — Read-only Calendar MVP
- **Scope (user-approved):** standalone milestone before Phase 11.7 per
  `docs/01` §6.1/§8.8 and `docs/04` §11.6.5: owner-scoped date-range tasks
  endpoint, calendar helpers, and a read-only `/dashboard/calendar` page;
  read-only means no task mutations, drag-and-drop, or filters; test fixtures
  only in `taskflow_test`; never `taskflow_dev`; docs updates 01/02/04/06/07
  only after checks; no dependencies, schema, migration, or commit/push.
- **Dependencies:** none installed. Schema/migrations/commits unchanged.
- **Created:** `client/src/pages/CalendarPage.jsx`, `client/src/utils/calendar.js`,
  `client/tests/calendar.test.js`, and `server/tests/calendar.test.js`.
- **Modified:** `server/src/routes/tasks.js` (owner-scoped calendar `GET /`),
  `server/src/utils/validation.js` (`validateCalendarRangeInput`),
  `client/src/services/tasks.js` (`listTasksInRange`), and
  `client/src/layouts/DashboardLayout.jsx` (Calendar became a real `NavLink`;
  decision 36 promise kept).
- **Backend contract:** `GET /api/tasks?from=YYYY-MM-DD&to=YYYY-MM-DD` —
  `requireAuth` + owner scoping; inclusive `gte/lte`; validation error when the
  inclusive range exceeds 42 days (grid cap); undated tasks excluded from
  `data` but reported in `meta.undatedCount`; optional `projectId` and
  `workspaceId` must match the owner; deterministic ordering (date, then id);
  tasks include `{ id, title, priority, status, dueDate, projectId }` plus
  context. A found bug: the route initially passed wrong property names, so
  `gte/lt` were `undefined` and Prisma silently returned *all* owner tasks —
  the ownership test caught it.
- **Calendar page:** URL-backed `?month=YYYY-MM&date=YYYY-MM-DD` state
  (reload-safe, linkable); Monday-first 42-cell grid with muted
  `text-slate-400` adjacent-month days; per-cell task chips (max 2 + "+N more"
  overflow), red `text-red-600` chips with "Overdue: …" labels for overdue,
  line-through muted chips with "Completed: …" labels for DONE tasks; selected
  day list (or explicit "no tasks" message); "N tasks without due dates"
  summary from `meta`; month navigation, Today, loading/error/retry/empty
  states. `isOverdueTask(task, todayKey)` keeps the overdue rule in a tested
  pure helper.
- **Verification:** backend `npm test` 29/29 ✅ (`crud` + `profile` + new
  `calendar.test.js` with ownership isolation, validation/boundary cases,
  context, and exact-ID cleanup); client helper tests 4/4 ✅; client
  `npm run lint` ✅ and `npm run build` ✅; isolated 18-check Edge/CDP harness
  against `taskflow_test` ✅ (render/chips/treatments/selection/empty day,
  month navigation across boundaries, Today, muted + focus + 375px checks,
  all-`GET` network audit, backend-down error + Retry recovery); `taskflow_test`
  globally zero rows afterward; `taskflow_dev` untouched; temporary harness and
  profile removed; `git diff --check` clean (CRLF warnings only).
- **Known deferred polish:** a URL `date` from a different month stays selected
  while navigating months (day header shows it until a new day is clicked)
  — noted as a Phase 12 candidate; client audit unchanged (3 high advisories).
- **Not done (by design):** Phase 11.7, calendar mutations, JWT
  revocation, `taskflow_demo`, commits, and push.

## 4. Decisions Log

| # | Date       | Decision | Reason | Alternatives considered |
| - | ---------- | -------- | ------ | ----------------------- |
| 01 | 2026-08-02 | Documentation lives in `docs/` (`01`–`07`) and is the single source of truth. | Clean root, scales as docs grow. | Files in project root. |
| 02 | 2026-08-02 | Final tech stack approved: React + Vite + JavaScript + Tailwind CSS + React Router + Axios · Node.js + Express · PostgreSQL + Prisma · JWT + bcrypt · Git + GitHub. | Beginner-friendly, industry standard, interview-worthy; aligns both requirements & architecture docs. | TypeScript; SQLite; MongoDB; sessions. |
| 03 | 2026-08-02 | Permanent rule: nothing gets coded until it is documented and approved. | Prevents scope creep; docs stay accurate. | None. |
| 04 | 2026-08-02 | Next phase is Frontend Setup (initialize React frontend) before backend. | User-approved plan. | Backend-first order. |
| 05 | 2026-08-02 | Tailwind CSS v4 via the `@tailwindcss/vite` plugin. | Modern default: no `tailwind.config.js` or PostCSS setup needed. | Tailwind v3 + PostCSS. |
| 06 | 2026-08-02 | Router: `react-router@7.18.2` pinned (not v8, not `react-router-dom`). | v8 requires Node ≥ 22.22 (installed: 22.18); `react-router-dom` was removed in v8; 7.18.2 is the latest 7.x and its single residual advisory (GHSA-qwww-vcr4-c8h2) affects only unstable RSC APIs — not used in our SPA. Clean `npm audit` is not fully possible on Node 22.18. | react-router v8, react-router-dom 7.x. |
| 07 | 2026-08-02 | Frontend folder structure: `src/{assets,components,context,layouts,pages,routes,services,utils}` (context added in Phase 11.3). | Beginner-friendly, conventional, matches architecture doc. | Flat structure. |
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
| 34 | 2026-08-06 | Dashboard shell = **layout route pattern**: `DashboardLayout` (sidebar + header + `<Outlet />`) wraps the index `DashboardPage` under `/dashboard`. `DashboardPlaceholder.jsx` **renamed** (not deleted) to `DashboardPage.jsx` per user. | `layouts/` folder exists for exactly this; standard React Router pattern; Phase 8 (Kanban) reuses the same shell; rename preserves the file. | Single-file replacement in the placeholder. |
| 35 | 2026-08-06 | **lucide-react installed** (first use) — sidebar/icons: LayoutDashboard, FolderKanban, ListTodo, Calendar, Settings, Search, Bell, LogOut (16px `h-4`, stroke 2). | Design system §15 + decision 10 documented it as the UI-phase icon library; consistent stroke style; replaces copied inline SVGs. | Keep inline SVGs / dot indicators. |
| 36 | 2026-08-06 | Sidebar items without a page yet (Projects, Tasks, Calendar, Settings) are **visual-only spans** (`text-slate-400 cursor-default`), not links. | No dead links — same honesty rule as decision 20; they become `NavLink`s when their pages exist. | All items as links to future routes. |
| 37 | 2026-08-06 | Dashboard content built from three reusable components: `StatCard`, `ProjectCard`, `EmptyState` — driven by props; mock data arrays live inline in `DashboardPage` (same pattern as `Features`/`AppWindow`); projects grid renders `EmptyState` when the array is empty (conditional rendering, ready for real data in Phase 11). | One component per repeated UI block — zero duplicated JSX; beginner-friendly props lesson. | Inline markup per section. |
| 38 | 2026-08-06 | Placeholder pages (`Projects`/`Tasks`/`Calendar`/`Settings`) render **only the shared `EmptyState`** (no page header wrapper) and live as **nested routes** under the `/dashboard` layout route. | Every placeholder reuses one component (zero duplicated UI); nesting inherits `RequireAuth` + `DashboardLayout` automatically — no per-page wrappers. | Per-page headers; separate top-level routes. |
| 39 | 2026-08-06 | Dashboard search becomes a **real, inert `<input type="search">`** (styled §13, focus ring, placeholder) instead of a visual-only span. | User-approved via question; focus ring needs a focusable element; typing is uncontrolled and does nothing until Phase 11 — no fake search results, but a standard, honest affordance. | Keep non-focusable span. |
| 40 | 2026-08-06 | Informational cards (`StatCard`, `ProjectCard`) get **subtle hover only**: `hover:border-slate-300 hover:shadow-md` + explicit `cursor-default`; no pointer, translate, scale, or lift. Logout is the §12 **danger ghost** variant. | User's UX rule: informational cards must never look clickable; Logout is a destructive action, so the red variant is semantically correct. | Card lift/pointer hovers; neutral logout. |
| 41 | 2026-08-07 | Kanban board = two dumb, props-driven components: `KanbanBoard` (`columns` array → `.map()` row, `overflow-x-auto` so columns scroll horizontally below `md` instead of stacking) + `KanbanColumn` (`column` object; `w-72 shrink-0` lane, `bg-slate-100` per §4). Header count is **derived from `column.tasks.length`** — no separate count value, so it can never drift from the cards. Empty columns reuse the shared `EmptyState` (user adjustment) until 8.2 adds task cards. `TasksPage` hosts the mock `columns` data (todo / in-progress / done, `tasks: []`). | Reusability (any columns array renders a board — Phase 11 serves any project); single source of truth for counts; no blank lanes during the layout phase; reuses the existing dashboard shell + route (no routing changes). | Separate count field per column; blank lanes; duplicated board markup in the page. |
| 42 | 2026-08-07 | Sidebar nav `to` paths fixed to the **nested routes** (`/dashboard/projects`, `/dashboard/tasks`, `/dashboard/calendar`, `/dashboard/settings`). | Clicking a link to a non-existent route makes React Router match nothing and render `null` — the entire app (shell included) disappears → white screen. Nav paths must always equal the route table exactly; this was the root cause of the Tasks white screen. | Keep absolute `/tasks`-style paths. |
| 43 | 2026-08-07 | Task cards = one data-driven `TaskCard` component (single `task` prop) with: mono task ID (§7 font), §6 priority badge lookup map (High red / Medium amber / Low green, neutral fallback), truncating `<h3>` title, conditional tags chips, footer with assignee avatar (initials circle, color from data) + Clock estimate + Calendar due date. Hover "interactive feel": `-translate-y-0.5` + border + shadow, but `cursor-default` (no click exists yet). Empty-state copy became **column data** (`emptyTitle`/`emptyDescription`) so each column says something contextual; the column body conditionally renders EmptyState vs cards. | Reusability (any task object renders, Phase 11-ready); design-system §7 IDs are mono; §6 pill pattern mirrors ProjectCard; data-driven copy keeps components dumb. | Hardcoded per-column JSX copy; clickable-looking cursor on non-clickable cards. |
| 44 | 2026-08-07 | Board state lives in `TasksPage` (`useState(initialColumns)`) — the highest board component; the movement algorithm is the **pure helper `moveTask()` in `utils/kanban.js`** (immutable: filter out of source, spread-append to target, untouched columns keep references; safe no-op on unknown ids). `KanbanColumn` computes each lane's `moves` (via `getAdjacentColumnId` + titles looked up from `columns`, no duplication); `TaskCard` is fully presentational (renders `moves`, calls `onMoveTask(task.id, columnId, move.toId)`). Callback flows up: TaskCard → KanbanColumn → KanbanBoard → TasksPage. Counts stay derived; functional `setColumns(prev => moveTask(prev, …))`. | Separation of state from presentation; one source of truth; pure helpers are testable and interview-ready; DnD library deferred (docs/04 allows buttons). | Buttons per card; inline mutation; state in a lower component. |
| 45 | 2026-08-07 | Kanban polish: movement buttons are **tinted secondary micro-variants** — forward `border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100`, back `border-slate-200 bg-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-200`, both with **`cursor-pointer`** + 150ms color transitions; labels shortened (backward `'Back'`, forward = target title; **`'Mark Done'` + CheckCircle2 icon retained** for the done lane — completion must feel distinct from plain movement, per user); each `move` carries an `icon` name (`back`/`forward`/`done`) so TaskCard never knows column rules; `EmptyState` gains opt-in `compact` prop (`p-4`, `h-10` tile, `text-sm/xs`) for lanes, default byte-identical; lanes get `min-h-52` + header padding unified to `px-2.5`. | Affordance: light indigo/slate tints signal action without competing with primary buttons; forward=brand indigo, back=neutral slate; icon-as-data keeps presentation components dumb; additive props never break existing callers (AppWindow `detailed` recipe). | Ghost buttons; long "Move to X" labels; separate compact component. |
| 46 | 2026-08-07 | `moveTask()` now validates **both** `source` and `target` existence; if either is missing it returns the input unchanged (matching its documented "unknown ids → safe no-op" contract). | QA audit (Phase 8.5) found the previous code lost the task when `toColumnId` didn't match a column (removed from source, never appended). Unreachable from the UI today — but pure helpers must be safe for any input; smallest fix wins. | Document-only (leave the hole); throw on bad input. |
| 47 | 2026-10-18 | Phase 9.1 backend scaffold conventions: ESM (`"type": "module"`, same as the client), `node --watch` instead of nodemon, `express` as the only dependency, port 3000 via `process.env.PORT` fallback; layout = `server/src/server.js` (entry) + `server/src/routes/` (routers; folders created only when they hold their first real file). | One module style across the repo; zero unnecessary dev dependencies; port becomes configurable in 9.2 (`.env`); the tree stays honest (no empty folders). | nodemon; CommonJS; full pre-built folder skeleton. |
| 48 | 2026-10-22 | Environment config: `dotenv` + `.env` (gitignored) with a committed `.env.example`; code keeps dev defaults (`PORT=3000`, `CLIENT_ORIGIN=http://localhost:5173`) so the server boots without a `.env`; `dotenv.config({ quiet: true })` runs before any `process.env` read. | 12-factor style config, secrets never enter git, no copy-paste constants, safe local defaults. | Hardcoded values; committed `.env`; no defaults (crash without `.env`). |
| 49 | 2026-10-22 | CORS allows exactly `CLIENT_ORIGIN` via an origin callback; no `*`, no `credentials: true` yet. Requests without an Origin header (curl/health checks) pass. | Browsers may only read API responses from the known SPA; the callback omits ACAO for unknown origins (the string form sends a fixed header to everyone). JWT travels in `Authorization`, not cookies, so credentials are unnecessary. | Open `cors()`; string-origin config; wildcard with credentials. |
| 50 | 2026-10-22 | Error handling: `notFound` (JSON 404, code `NOT_FOUND`) + four-argument central `errorHandler` registered last. 5xx responses are always generic `INTERNAL_ERROR` with safe server-side metadata/stack frames logged (no bodies, headers, tokens, or credentials); 4xx may expose `err.message`; `res.headersSent` is respected. | One predictable error shape for the client, no internal details leaked, correct Express middleware ordering, ready for Phase 11 route errors. Phase 11.1 tightened logging to safe metadata/stack frames only. | Express default HTML errors; per-route try/catch responses; leaking `err.message` and stacks on 500. |
| 51 | 2026-10-22 | Database stack: Prisma 7.10.1, legacy `prisma-client-js` generator, `@prisma/adapter-pg@7.10.1`, `pg@8.23.1`; `prisma.config.js` supplies `DATABASE_URL` to the CLI. | Prisma 7 is current stable; Prisma 6 support ends 2026-11-19; Prisma 8 is RC; the new generator emits TypeScript and conflicts with the JavaScript-only stack. Driver adapters are the Prisma 7 runtime model. | Prisma 8 RC; Prisma 6; `prisma-client` generator; raw SQL. |
| 52 | 2026-10-22 | Schema: `TaskStatus` / `TaskPriority` enums; `User.email` unique; workspace owner `RESTRICT`; project→workspace and task→project `CASCADE`; task assignee `SET NULL`; indexes on owner/project/assignee/status. | Enforces valid states and referential integrity while preserving tasks when an assignee is removed. Delete rules match product intent. | String status/priority columns; unrestricted deletes; no indexes. |
| 53 | 2026-10-22 | Migration workflow: generate with `migrate dev --create-only`, review the SQL, then apply with `migrate dev`; commit migrations; never edit an applied migration. A shared adapter-backed client lives in `src/db/prisma.js`; `db:check` is a read-only smoke test. | Human review catches destructive SQL before it reaches the database; committed migrations make environments reproducible; one shared client prevents connection duplication. | Auto-apply during creation; `db push`; multiple ad-hoc clients; editing applied migrations. |
| 54 | 2026-10-23 | Auth foundation: stateless HS256 JWT (`sub` payload, 7-day default, env secret ≥ 32 chars), bcrypt (12 rounds), normalized lowercase email, safe user select, generic invalid-credentials response, and lazy Prisma singleton. MVP token storage is localStorage (implemented with Axios in Phase 11.3), with the XSS trade-off documented; httpOnly cookies are future hardening. | Simple, interview-standard auth; prevents password/hash exposure and email-case duplicates; the lazy client keeps health independent; localStorage is the smallest beginner-friendly SPA flow when mitigations are documented. | Sessions; httpOnly cookies now; eager Prisma connection; verbose login errors. |
| 55 | 2026-10-23 | CRUD ownership is single-owner for v1.0: owner from the JWT, parent IDs from URLs, body ownership IDs ignored, missing/foreign resources return `404`, and assignees must be the workspace owner. | One simple rule is easy to audit, avoids mass-assignment bugs, and avoids leaking whether another user's resource exists. There is no membership table yet. | `403` responses; trust body IDs; any user as assignee. |
| 56 | 2026-10-23 | `dueDate` is date-only: accept `YYYY-MM-DD`/`null`, validate a real calendar date, store UTC midnight, return `YYYY-MM-DD`. | Prevents timezone drift and accidental time components while preserving the existing `DateTime` schema and avoiding a migration. | Store raw strings; accept datetime strings; add a date-only column now. |
| 57 | 2026-10-23 | Split the Express app (`src/app.js`, exported) from the listener (`src/server.js`). | Integration tests can mount the app on an ephemeral port without changing the production entry point; one app definition prevents test/production drift. | Test the listening entry directly; duplicate app setup in tests. |
| 58 | 2026-10-23 | Integration tests use isolated `taskflow_test`, fail closed on unsafe URL/env/schema/DB checks, and clean up exact tracked IDs only. | Protects development data, prevents accidental writes to the wrong database, and guarantees cleanup cannot delete unrelated rows. | Reuse `taskflow_dev`; truncate/reset the test DB; broad deletes. |
| 59 | 2026-10-23 | Auth state lives in `AuthProvider` + `useAuth` (`context/`), API transport lives in `services/`, and presentational pages consume the hook. Session status is explicit (`checking`, `authenticated`, `unauthenticated`, `error`), and startup hydrates through `/api/me`. | One session source of truth; guards can wait for the check instead of trusting a localStorage flag; pages stay readable; token invalidation is centralized. | Read localStorage in each guard; per-page auth calls; client-side "logged in" flag. |
| 60 | 2026-10-23 | Store only `taskflow_token` in localStorage; keep the safe user in React state; remove the legacy `isAuthenticated` flag; attach the Bearer token in an Axios request interceptor. | Smallest beginner-friendly SPA flow; avoids stale duplicated user data; one place attaches auth; documented XSS trade-off with httpOnly cookies as future hardening. | Store user/profile JSON too; httpOnly cookie now; per-request manual headers. |
| 61 | 2026-10-23 | In development, Vite proxies `/api` to `http://localhost:3000`; Axios uses `VITE_API_URL || '/api'`; targeted browser tests use a guarded `taskflow_test` user and exact cleanup. | Same-origin dev requests keep CORS/backend untouched; deployment can set one env var; write verification cannot touch development data. | CORS-only direct calls; hardcoded API host; browser tests against `taskflow_dev`. |
| 62 | 2026-10-23 | The Projects UI uses page-local workspace selection (defaulting to the newest workspace), inline forms/confirmations, and synchronous `useRef` request locks; it renders only real API fields, while the Dashboard's mock `ProjectCard` stays untouched. | No new modal/state dependency; a still-valid selection survives updates; explicit cascade warnings and failure-open confirmations make destructive actions safer; double clicks cannot send duplicate requests; fake status/progress would misrepresent the schema. | Global workspace context; modal library; optimistic updates; reusing mock cards for real projects. |
| 63 | 2026-10-23 | The Tasks UI stores workspace/project selection in the URL, uses a current-project ref for stale creates, waits for server confirmation before moving a card, and groups the flat API list through one column-to-status map; no DnD, custom ordering, global context, or optimistic moves. | URL state preserves the selected board across reload and makes it linkable; server confirmation keeps the board truthful; a synchronous lock prevents duplicate PATCHes; one mapping keeps columns and API statuses aligned. | Local-only selection; optimistic status updates; DnD library; custom Kanban ordering. |
| 64 | 2026-10-23 | Phase 11.6 aggregates dashboard data client-side from the existing list APIs, requires the current password for email/password changes, keeps existing JWTs valid after password changes, and uses a separate guarded `taskflow_test`/`taskflow_demo` seed. | Avoids a new aggregate endpoint/schema change for a small MVP, re-authenticates sensitive edits without a false logout, accepts stateless revocation as a documented trade-off, and keeps demo writes off development data. | Dashboard aggregate endpoint; no re-auth; immediate global token revocation; seed `taskflow_dev`. |
| 65 | 2026-10-23 | Phase 11.6.5 Calendar is read-only: month/date state lives in the URL (`?month=…&date=…`), the owner-scoped range endpoint accepts an inclusive window of at most 42 days, undated tasks surface only as `meta.undatedCount`, and the server returns tasks in ascending `dueDate` order with project/workspace context. | URL state survives reload and history; a bounded range keeps queries predictable without a schema/index change; the meta count keeps undated work visible without polluting the grid; server-side ordering keeps the client grouping deterministic (decision 14 in docs/02). | Cell-level mutations or counts in v1; drag-and-drop; unbounded ranges; client-side ordering. |

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
- ✅ 2026-08-06 — Phase 7.1: dashboard shell plan — approved (with adjustments: rename DashboardPlaceholder → DashboardPage instead of deleting; generic "Welcome back!" greeting instead of hardcoded user name).
- ✅ 2026-08-06 — Phase 7.2: dashboard content plan — approved (scope: statistics cards, recent projects with reusable ProjectCard, EmptyState, recent activity; no routing/layout/navigation changes, mock data only).
- ✅ 2026-08-06 — Phase 7.3: dashboard navigation & placeholder pages plan — approved (scope: all 5 sidebar items become routes; 4 placeholder pages reusing EmptyState; no auth/guard/content changes, frontend-only).
- ✅ 2026-08-06 — Phase 7.4: dashboard UI polish plan — approved (scope: visual only — danger-ghost logout, inert search input per user decision, sidebar/header/avatar polish, subtle card hovers with cursor-default, EmptyState presentation, responsive spacing).
- ✅ 2026-08-06 — Phase 7.5: dashboard cleanup, QA & finalization plan — approved (scope: 3 ARIA fixes only — progressbar semantics, aria-hidden on placeholder chrome, nav label; no formatting churn, renames, or refactors).
- ✅ 2026-08-07 — Phase 8.1: Kanban board layout plan — approved (with adjustments: reuse `EmptyState` inside empty columns instead of blank lanes; derive header counts from `column.tasks.length`, store `tasks: []` per column).
- ✅ 2026-08-07 — Sidebar navigation bug fix — approved (scope: only `DashboardLayout.jsx` — 4 nav `to` values corrected to the nested `/dashboard/...` routes; build + lint + full sidebar re-test).
- ✅ 2026-08-07 — Phase 8.2: task cards plan — approved (with enhancements: mono task ID, estimated time, realistic mock data, contextual EmptyState messages per column, interactive-feel hover without clicks; no DnD/state/editing/modals/dependencies).
- ✅ 2026-08-07 — Phase 8.3: task movement & state management plan — approved (with refinements: movement algorithm extracted to pure `moveTask()` in `utils/kanban.js`, TasksPage only owns state; TaskCard fully presentational — KanbanColumn computes the movement actions).
- ✅ 2026-08-07 — Phase 8.4: Kanban UI & UX polish plan — approved (with refinements: keep "Mark Done" as the completion label with a check icon so it feels distinct from plain movement; cursor-pointer on all movement buttons, cards stay cursor-default).
- ✅ 2026-08-07 — Phase 8.5: Cleanup, QA & Finalization plan — approved (scope: audit + ONE targeted fix — `moveTask` target-column safe-no-op guard; docs updates 01/04-style finalization; e2e regression; no other changes).
- ✅ 2026-10-18 — Phase 9.1: server scaffold & health check plan — approved (scope: `server/` scaffold with Express + `GET /api/health`, npm scripts, docs updates; no `.env`/CORS/error middleware (9.2), no frontend changes, express only).
- ✅ 2026-10-22 — Phase 9.2: environment config, CORS & error handling plan — approved (scope: `.env`/`.env.example` + dotenv, exact-origin CORS, JSON 404 + central error handler, docs; no database/auth/CRUD/frontend changes; verify with real HTTP bodies/headers; no commits).
- ✅ 2026-10-22 — Phase 10: PostgreSQL + Prisma foundation plan — approved (scope: approved schema only, shared client, connection check, initial migration created with `--create-only`, docs; no auth/CRUD/frontend/seeds/commits).
- ✅ 2026-10-22 — Migration review checkpoint — approved after full SQL and verification; user replied `APPLY MIGRATION`.
- ✅ 2026-10-22 — Documentation update after migration — approved; user replied `UPDATE DOCS`.
- ✅ 2026-10-23 — Full Phase 11 plan (subphases 11.1–11.8) — approved.
- ✅ 2026-10-23 — Phase 11.1 exact scope — approved (bcrypt/jsonwebtoken,
  auth/me endpoints, Bearer middleware, lazy Prisma, safe errors, docs; no client,
  schema/migration, seed, or unrelated changes; one temporary test user allowed).
- ✅ 2026-10-23 — Phase 11.2 revised CRUD plan and implementation — approved
  (owner-scoped workspace/project/task CRUD, nested routes, date-only dueDate,
  app/server split, isolated `taskflow_test`, two-user integration tests,
  fail-closed guard, exact-ID cleanup, docs; no schema/migrations, client
  changes, new dependencies, or commits).
- ✅ 2026-10-23 — Phase 11.3 client API/auth plan and implementation — approved
  (Axios + Vite proxy, auth services/context, real login/register/session,
  guards, loading/retry UI, real dashboard user chrome, isolated-DB verification;
  preserve WIP, no backend/schema/migration/dev-DB changes, no secrets, docs only
  02/04/06/07, no commit/push, stop after 11.3).
- ✅ 2026-10-23 — Phase 11.4 workspace/project CRUD UI plan and implementation —
  approved (workspace/project services, API-backed Projects page, inline forms
  and cascade confirmations, duplicate-request guards, client validation;
  preserve WIP, no backend/schema/migration/auth/dependency/dev-DB changes, no
  secrets, docs only 02/04/06/07, isolated `taskflow_test` verification, no
  commit/push, stop after 11.4).
- ✅ 2026-10-23 — Phase 11.5 task CRUD/Kanban persistence plan and
  implementation — approved (task services, API-backed Tasks page, URL
  selection, create/edit/delete/status, server-confirmed moves; preserve WIP,
  no backend/schema/migration/auth/dependency/dev-DB changes, no secrets, docs
  only 02/04/06/07, isolated `taskflow_test` verification, no commit/push, stop
  after 11.5).
- ✅ 2026-10-23 — Phase 11.6 API-backed Dashboard, Settings, and demo seed plan
  and implementation — approved with constraints: preserve existing design/
  features, use existing list APIs for dashboard aggregation, require the current
  password for email/password changes, accept existing JWT validity after a
  password change this phase, never write `taskflow_dev`, verify on
  `taskflow_test`, do not create/seed `taskflow_demo` without separate approval,
  no new dependencies/secrets/commits, docs only 02/04/06/07 after checks, stop
  after 11.6.
- ✅ 2026-10-23 — Read-only Calendar milestone (Phase 11.6.5) plan — approved
  (docs updates in 01 §6.1/§8.8, 04 §11.6.5, and 02 §6.7 before code; read-only
  MVP scope; inclusive range ≤ 42 days; no schema/migration/dependency/commit).
- ✅ 2026-10-23 — Phase 11.6.5 implementation and test-fixture writes to
  `taskflow_test` — approved (user replied "approved"); verified with backend
  `npm test` 29/29, client `npm test` 3/3, lint/build, and a 12-check isolated
  Edge/CDP harness; `taskflow_test` left globally empty; `taskflow_dev` and
  `taskflow_demo` untouched; no commits.

## 6. Open Questions / Blockers

- `PROJECT_REQUIREMENTS.md` (root) is now superseded by `docs/01_PROJECT_REQUIREMENTS.md`.
  It was updated for stack consistency — decide whether to keep or delete it.
- ✅ Token storage decided and implemented 2026-10-23 (Phase 11.3): only
  `taskflow_token` is stored in localStorage; XSS mitigations are documented in
  docs/02 §7. httpOnly cookies remain future hardening.
- Node.js is v22.18.0; React Router v8 requires ≥ 22.22 — upgrade Node later if/when migrating to v8.
- Residual dependency advisory: react-router 7.12–8.2 (GHSA-qwww-vcr4-c8h2, RSC-mode only) — not applicable to our SPA; upgrade path noted in decision 06.
- Inter font + `@theme` wiring still pending (user deferred index.html/index.css changes); system font fallback in use for now. `index.html` now carries `class="scroll-smooth"` only (Session 15).
- ✅ Axios drift resolved 2026-10-23 (Phase 11.3): `axios@^1.20.0` is installed
  and wired; the old docs/04 claim that it was installed in Phase 3 was corrected.
- ✅ Task UI schema reconciliation resolved 2026-10-23 (Phase 11.5): the real
  board shows only model-backed task fields, unsupported tags/estimates were
  removed, and Kanban columns group the API's oldest-first order rather than
  inventing a custom order.
- ✅ Dashboard mock reconciliation resolved 2026-10-23 (Phase 11.6): the Dashboard
  now renders real workspaces/projects/tasks, derives project progress from task
  statuses, and uses “Recent Tasks” instead of the mock activity feed. No schema
  extension was needed.
- ✅ Cross-workspace task assignment resolved for v1.0 (2026-10-23): the API only
  permits the workspace owner as assignee until a `WorkspaceMember` model exists.
- ✅ Email uniqueness normalization resolved 2026-10-23: server trims and
  lowercases emails before validation and database lookups; only the normalized
  form is stored.
- ✅ Seed strategy resolved 2026-10-23 (Phase 11.6): a guarded, idempotent
  `db:seed:demo` script exists and was verified on `taskflow_test`; it never
  targets `taskflow_dev`. Creating/migrating/seeding `taskflow_demo` remains
  blocked pending explicit user approval for that database operation.
- ✅ Profile API resolved 2026-10-23 (Phase 11.6): `PATCH /api/me` and
  `PATCH /api/me/password` are implemented with current-password checks. Existing
  JWTs remain valid after a password change; token revocation is a documented
  future hardening item.
- Client `npm audit --omit=dev` (2026-10-23) reports 3 high-severity advisories in
  `nanoid`, `source-map-js`, and `vite`. No upgrade was applied because it is
  outside the approved Phase 11.2 scope; plan a dedicated dependency-update
  approval before deployment.

## 7. Current Status

- **Current Phase:** Phase 11.6.5 — Calendar (read-only) ([04_DEVELOPMENT_PHASES.md](./04_DEVELOPMENT_PHASES.md) §12) — **complete and verified (2026-10-23)**. Phase 11.7 is next, pending separate approval; `taskflow_demo` remains uncreated/unseeded.
- **Completed:**
  - ✅ Requirements, Architecture, Development Rules, Frontend foundation, Design system, Roadmap (phases 5–13)
  - ✅ Phase 5 — Landing Page (5.1 Navbar, 5.2 Hero, 5.3 Features, 5.4 How It Works, 5.5 Dashboard Preview, 5.6 CTA, 5.7 Footer + 2 polish passes) — complete
  - ✅ Phase 6 — Authentication UI (6.1 routing, 6.2 UI, 6.3 validation, 6.4 mock auth + guards, 6.5 logout) — complete
  - ✅ Phase 7.1 — Dashboard Shell (build ✅, lint ✅): renamed `DashboardPlaceholder` → `DashboardPage.jsx` (generic "Welcome back!" + dashed empty-state card); new `DashboardLayout.jsx` (sticky sidebar `hidden lg:flex` with `NavLink` active states, top header with visual-only search/bell, mock avatar, Logout moved here); `/dashboard` is now a nested layout route (`RequireAuth` → Layout → index Page); `lucide-react` installed (decision 35)
  - ✅ Phase 7.2 — Dashboard Content (build ✅, lint ✅): reusable `StatCard.jsx`,
    `ProjectCard.jsx`, `EmptyState.jsx`; `DashboardPage.jsx` rebuilt with
    statistics grid (4 cards), Recent Projects (3 cards + conditional
    `EmptyState`), Recent Activity list — all hardcoded mock data inline, no
    routing/layout changes
  - ✅ Phase 7.3 — Dashboard Navigation & Placeholder Pages (build ✅, lint ✅):
    all 5 sidebar items are now real `NavLink` routes with URL-driven active
    highlight; 4 placeholder pages (`/dashboard/projects`, `/tasks`,
    `/calendar`, `/settings`) reusing the shared `EmptyState` as nested routes
    under the protected layout — **Phase 7 (Dashboard UI) complete**
  - ✅ Phase 7.4 — Dashboard UI Polish (build ✅, lint ✅): danger-ghost Logout,
    real inert search input (§13 focus ring), avatar/header alignment +
    responsive padding, sidebar active `text-indigo-700` + 150ms hovers,
    subtle `cursor-default` card hovers, centered EmptyState, tighter mobile
    rhythm — visual only, **Phase 7 polish complete**
  - ✅ Phase 7.5 — Dashboard Cleanup, QA & Finalization (build ✅, lint ✅):
    full audit (routes, guards, logout, imports, tokens, Tailwind) clean;
    3 ARIA fixes only (progressbar semantics on ProjectCard, `aria-hidden` on
    placeholder chrome, nav label) — **Phase 7 (Dashboard UI) fully complete,
    production-quality and interview-ready**
  - ✅ Phase 8.1 — Kanban Board Layout (build ✅, lint ✅): new `KanbanBoard.jsx`
    (horizontal-scroll `flex` row, columns never stack below `md` per §18) +
    `KanbanColumn.jsx` (`w-72 shrink-0` slate-100 lane, `<h2>` header with
    count derived from `column.tasks.length`, shared `EmptyState` inside each
    empty column per user adjustment); `TasksPage.jsx` rebuilt as a real board
    page (`h1` "Tasks" + mock columns data `tasks: []` — resolves the 7.5
    placeholder heading debt); no routing/shell changes, no new dependencies.
    **Bug fixed (Session 28):** sidebar nav `to` paths were absolute
    (`/tasks`, …) while routes are nested (`/dashboard/tasks`, …) — clicking
    white-screened since Phase 7.3; corrected to the nested paths and verified
    with a headless click-through of all 5 sidebar items
  - ✅ Phase 8.2 — Task Cards (build ✅, lint ✅): new `TaskCard.jsx` (mono
    task ID, §6 priority badge map, truncating title, conditional tags,
    avatar + Clock estimate + Calendar due date, interactive-feel hover with
    `cursor-default`); `KanbanColumn.jsx` now conditionally renders
    `EmptyState` (contextual `emptyTitle`/`emptyDescription` from data) vs
    `TaskCard` list; `TasksPage.jsx` holds realistic mock tasks (To Do 4 /
    In Progress 3 / Done 0 — Done empty on purpose to show the conditional) —
    no new dependencies, counts stay derived from `tasks.length`
  - ✅ Phase 8.3 — Task Movement & State Management (build ✅, lint ✅): first
    interactive board — `TasksPage` owns state (`useState(initialColumns)` +
    `handleMoveTask` via functional updater); pure `moveTask()` +
    `getAdjacentColumnId` + `COLUMN_ORDER` in `utils/kanban.js`; `KanbanColumn`
    computes per-lane `moves` (back first, then forward; "Mark Done" special
    label); `TaskCard` renders ghost-sm movement buttons (ArrowLeft/ArrowRight,
    focus rings) and calls `onMoveTask` up the chain; CDP-verified forward /
    Mark Done / backward moves with derived counts — no dependencies
  - ✅ Phase 8.4 — Kanban UI & UX Polish (build ✅, lint ✅): tinted secondary
    movement buttons (indigo forward / slate back, hover border darkening,
    cursor-pointer); short labels (`In Progress`, `Back`) with **"Mark Done" +
    CheckCircle2 kept** for completion; `EmptyState` opt-in `compact` variant
    for lanes; lanes `min-h-52` + header padding aligned; CDP-verified labels,
    tints, cursors, and a full 4/3/0 → … → 4/3/0 round trip — no behavior
    changes, no dependencies
  - ✅ Phase 8.5 — Cleanup, QA & Finalization (build ✅, lint ✅): full audit
    (state flow, architecture, movement, tokens, a11y, responsive, EmptyState
    regression, routing, code quality) — clean; **one genuine bug fixed:**
    `moveTask()` now no-ops when the target column doesn't exist (task-loss
    hole, unreachable from the UI but violating the documented safe-no-op
    contract); node unit-checked; e2e regression green (guards, login, 5
    routes, movement round trip, logout, 375/768/1440 layouts with no body
    horizontal overflow) — **no features, one file changed in `client/`**
  - ✅ Phase 9.1 — Server Scaffold & Health Check (boot + curl verified ✅; client build ✅, lint ✅): `server/` created — Express (only dependency, `express@^5.3.0`), ESM + `node --watch` dev script, `npm start` script, `GET /api/health` → `{"status":"ok"}`; docs 02/04/06/07 updated; zero client files touched.
  - ✅ Phase 9.2 — Environment Config, CORS & Error Handling (verified ✅; client build ✅, lint ✅): `.env` / `.env.example` + `dotenv@^18.0.8`; exact-origin `cors@^2.8.6`; `src/middleware/notFound.js` (JSON 404) + `errorHandler.js` (generic 5xx, server-side logging); real HTTP checks for health, CORS allowed/denied, preflight, 404, 500, env loading + fallback — zero client files touched.
  - ✅ Phase 10 — Database & Prisma (verified ✅; client build ✅, lint ✅): PostgreSQL `taskflow_dev` + `taskflow_app`; Prisma 7.10.1 + `@prisma/adapter-pg` + `pg`; schema with four models, two enums, indexes and FK delete rules; `prisma.config.js`; shared adapter-backed client; read-only `db:check`; initial migration `20261022145549_init` applied; tables/enums/indexes/FKs verified; health remains DB-independent; zero client files touched.
  - ✅ Phase 11.1 — Backend Auth Foundation (verified ✅; client build ✅, lint ✅): bcrypt + jsonwebtoken; register/login return JWT + safe user; `GET /api/me` Bearer protection; validation and centralized safe errors; lazy `getPrisma()` keeps health DB-independent; one temporary test user created and deleted; database remains empty; zero client files touched.
  - ✅ Phase 11.2 — Workspace, Project & Task CRUD (verified ✅; client build ✅, lint ✅): owner-scoped CRUD and nested routes; validation, date-only `dueDate`, `app.js`/`server.js` split; guarded two-user integration tests against isolated `taskflow_test`; exact-ID cleanup; both databases empty afterward; zero client files touched.
  - ✅ Phase 11.3 — Client API & Authentication Wiring (verified ✅; lint ✅, build ✅): Axios service layer + Bearer interceptor, Vite `/api` proxy, `AuthProvider`/`useAuth`, `taskflow_token` storage, startup `/api/me`, real login/register/logout, loading/retry states, server field errors, guards with intended-route return, real dashboard greeting/initials; mock dashboard/Kanban data preserved; backend tests + API/proxy + browser flows passed using `taskflow_test`; `taskflow_dev` untouched; client audit still 3 high (not upgraded).
  - ✅ Phase 11.4 — Workspace & Project CRUD UI (verified ✅; lint ✅, build ✅): workspace/project services, API-backed `ProjectsPage` with page-local selection, reusable sidebar/form/list-item components, inline create/rename/delete, cascade warnings, failure-open confirmations, synchronous duplicate-request guards, client validation mirroring server limits; Dashboard/Kanban mock data preserved; backend tests + isolated 14-check browser/API harness passed; `taskflow_test` clean; `taskflow_dev` unchanged; no dependencies.
  - ✅ Phase 11.5 — Task CRUD UI & Kanban Persistence (verified ✅; lint ✅, build ✅): task services, URL-backed workspace/project selection, real create/edit/delete and server-confirmed status moves, pending/retry states, synchronized column-to-status mapping, model-backed cards only; backend tests + isolated 14-check browser/API harness passed; `taskflow_test` clean; `taskflow_dev` unchanged; no dependencies or backend/schema changes.
  - ✅ Phase 11.6 — API-backed Dashboard, Settings & demo seed (verified ✅; lint ✅, build ✅): profile/password endpoints with conditional current-password checks, Settings forms and password-change logout, real Dashboard aggregation with project progress and Recent Tasks, guarded/idempotent demo seed, and profile tests. Backend `npm test` 17/17; isolated UI and seed harnesses passed; `taskflow_test` clean; `taskflow_dev` untouched; no dependencies, schema, migration, commit, or `taskflow_demo` operation.
  - ✅ Phase 11.6.5 — Calendar (read-only) (verified ✅; lint ✅, build ✅): owner-scoped `GET /api/tasks?from&to` (inclusive ≤ 42 days, project/workspace context, `meta.undatedCount`), `utils/calendar.js` helpers + 4 client tests, URL-backed read-only Calendar at `/dashboard/calendar` with Monday-first 42-cell grid, cell task chips (2 per cell + "+N more" overflow), overdue (red chip + visible label) / completed (line-through + Completed badge) treatments, muted adjacent-month days, month navigation, Today, selected-day task list, loading/error/retry/empty states, and undated summary. Backend `npm test` 29/29 (`crud` + `profile` + new `calendar.test.js` with ownership isolation, validation/boundary cases, exact-ID cleanup); 18-check Edge/CDP UI harness passed (render, chips, treatments, selection, empty day, month nav, Today, muted/focus/375px checks, all-`GET` network audit, backend-down error + Retry recovery); `taskflow_test` globally zero rows afterward; `taskflow_dev` untouched; no dependencies, schema, migration, or commits. Known deferred polish: a URL date from another month stays selected while navigating months (flagged for Phase 12).
- **Next Task:**

  - Phase 11.7 — awaiting separate user approval.
  - Phase 12 polish candidate (logged in docs/04 §11.6.5): when navigating
    months, a previously selected URL date from another month stays selected
    (day header + empty-state line) until a new cell is clicked.

---

*Last updated: 2026-10-23.*