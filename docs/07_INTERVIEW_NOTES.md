# 07 — Interview Notes

> **Purpose:** The single source of truth for **talking about TaskFlow**.
> Contains talking points, architecture explanations, decision rationales,
> challenges faced, and sample questions — updated continuously so the
> final-year B.Tech project is presentation- and interview-ready.

## Table of Contents

1. [Elevator Pitch](#1-elevator-pitch)
2. [Why I Built This](#2-why-i-built-this)
3. [Tech Stack — Talking Points](#3-tech-stack--talking-points)
4. [Key Decisions — Explanation Scripts](#4-key-decisions--explanation-scripts)
5. [Challenges & How I Solved Them](#5-challenges--how-i-solved-them)
6. [What I Would Improve (v2.0)](#6-what-i-would-improve-v20)
7. [Potential Interview Questions](#7-potential-interview-questions)
8. [Demo Script](#8-demo-script)
9. [Key Learnings — Documentation Phase](#9-key-learnings--documentation-phase)

---

## 1. Elevator Pitch

- TODO: 30-second summary of TaskFlow.

## 2. Why I Built This

- TODO: Motivation and the problem it solves. Cross-reference:
  [01_PROJECT_REQUIREMENTS.md](./01_PROJECT_REQUIREMENTS.md) §2–§3.

## 3. Tech Stack — Talking Points

One talking point per technology (cross-reference:
[02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §2):

- **React + Vite** — component-based UI with a fast modern build tool.
- **JavaScript** — one language across the whole stack; simpler for v1.0.
- **Tailwind CSS** — utility-first styling for fast, consistent UI.
- **React Router** — clean SPA routing with protected routes.
- **Axios** — simple HTTP client; interceptors attach the JWT automatically.
- **Node.js + Express.js** — lightweight, widely used REST API framework.
- **PostgreSQL** — robust production-grade relational database.
- **Prisma ORM** — readable schema, auto migrations, safe queries.
- **JWT + bcrypt** — stateless authentication with secure password hashing.

## 4. Key Decisions — Explanation Scripts

- TODO: How to explain each decision from [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §8
  in an interview (added as development progresses).

## 5. Challenges & How I Solved Them

### 2026-08-02 — React Router version & security advisory

- **Problem:** `npm audit` flagged a high-severity advisory (GHSA-qwww-vcr4-c8h2)
  in react-router 7.12–8.2; the only patched version (8.3.0) requires Node ≥ 22.22
  (installed: 22.18), and v8 removed the `react-router-dom` package.
- **Solution:** Pinned `react-router@7.18.2` (latest 7.x) after verifying the
  advisory affects only unstable RSC-mode APIs — not used in our SPA. Documented
  the residual advisory and the v8 upgrade path in the architecture decision log.

## 6. What I Would Improve (v2.0)

- TODO: Honest list of limitations and planned improvements. Cross-reference:
  [01_PROJECT_REQUIREMENTS.md](./01_PROJECT_REQUIREMENTS.md) §7.

## 7. Potential Interview Questions

> Filled 2026-08-02 — covering everything built so far (docs, frontend setup,
> and the full landing page). Updated as development continues.

### Project & stack

1. **What is TaskFlow?**
   A full-stack project management web app inspired by Huly — workspaces,
   projects, tasks, a Kanban board, and a dashboard — built for students,
   freelancers, and small teams who find Jira too complex.

2. **What is your tech stack and why?**
   React + Vite + JavaScript + Tailwind CSS + React Router + Axios on the
   frontend; Node.js + Express + PostgreSQL + Prisma + JWT + bcrypt planned for
   the backend. Chosen because it is industry-standard, beginner-understandable,
   and interview-worthy.

3. **Why Vite instead of Create React App?**
   Vite is faster (native ES modules), needs less config, and CRA is officially
   deprecated. Vite is the modern React default.

4. **Why JavaScript instead of TypeScript?**
   Chosen deliberately for a first full-stack learning project — simpler without
   types. The architecture stays TypeScript-compatible; types are the planned
   upgrade path.

5. **Why is react-router pinned to 7.18.2?**
   Router v8 requires Node ≥ 22.22; installed is 22.18.0. Upgrading Node later
   allows migrating to v8; 7.18.2 is the latest 7.x. The residual advisory
   (GHSA-qwww-vcr4-c8h2) affects only RSC-mode APIs — not our SPA.

### React fundamentals

6. **What is a React component?**
   A function that takes props (optional) and returns JSX — reusable, composable,
   isolated. `function Hero() { return <section>…</section> }`.

7. **What's the difference between a component and a page?**
   Components are bricks; a page is an assembly of bricks. `LandingPage` is a
   component that composes 8 others.

8. **What are props and why use them?**
   Inputs passed from parent to child (`<StepCard number={1} title="…" />`).
   They make one component usable many times with different data.

9. **What is state and how is it different from props?**
   Props come in from the parent (read-only). State is owned by the component
   and can change — `useState(false)` in the Navbar. Changing state re-renders.

10. **How does the hamburger menu work?**
    `useState(false)` stores open/closed; clicking calls `setMenuOpen(!menuOpen)`;
    `{menuOpen && <div>…}` conditionally renders the menu; `aria-expanded={menuOpen}`
    tells screen readers the state.

11. **What is conditional rendering in React?**
    Using JavaScript conditions inside JSX — `{menuOpen && <div>…}` renders the
    div only when `menuOpen` is true.

12. **Why use `.map()` instead of copying code?**
    Data and UI are separated: the `features` array holds the data, `.map()`
    generates the cards. Adding a 7th feature is one line in the array — no
    duplicated markup.

13. **Why the `key` prop in `.map()`?**
    React uses keys to identify list items so it re-renders only what changed.
    Without keys you get subtle update bugs.

14. **What is the `detailed` prop on AppWindow?**
    A boolean prop controlling which parts render: Hero gets the compact window,
    the Dashboard Preview section the full one (browser header, status cards,
    activity panel). One component, two variants, zero duplication.

15. **Why is "New Task" a `<span>` and not a `<button>`?**
    The landing page is a mockup. A clickable button would be a fake feature —
    users would click and nothing happens. Show the design, never fake behavior.

16. **What is a Fragment and why use it?**
    JSX requires one root element. Fragments (`<>…</>`) group siblings without
    adding a real DOM node — used in HowItWorks for card + connector pairs.

### JSX & styling

17. **Why `className` and not `class`?**
    JSX compiles to JavaScript, where `class` is a reserved keyword.

18. **What does `py-14` mean?**
    Tailwind spacing: 14 × 4px = 56px padding top and bottom. The whole spacing
    system is a 4px grid.

19. **What are Tailwind breakpoints?**
    Responsive prefixes (`sm:`, `md:`, `lg:`). `grid sm:grid-cols-2 lg:grid-cols-3`
    = 1 column on phones, 2 on tablets, 3 on desktop.

20. **What is your design system?**
    Fixed tokens: indigo-600 (`#4F46E5`) primary, slate neutrals, Inter font
    planned, cards `rounded-xl border-slate-200 shadow-sm`, buttons `h-10`/`h-11`
    with 200ms transitions. Every page element follows these tokens.

21. **Why indigo?**
    Modern, calm SaaS look (Linear/Huly-inspired); indigo-600 on white passes
    WCAG AA contrast.

22. **How does smooth scrolling work?**
    `class="scroll-smooth"` on `<html>` adds `scroll-behavior: smooth` so anchor
    clicks (`#features`) glide instead of jump.

23. **What are focus-visible rings?**
    `focus-visible:ring-2 ring-indigo-500/25` — a visible outline shown only on
    *keyboard* navigation (accessibility, WCAG 2.4.7). Mouse users see nothing.

### Architecture & decisions

24. **Why no React Router on the landing page?**
    One page with anchor links needs no router. Router comes when there are
    multiple pages — Login, Dashboard — in Phase 6+.

25. **Why the `src/{components, pages, layouts, services…}` structure?**
    Separation of concerns: components = reusable bricks, pages = assemblies,
    services = API calls (later). Defined in docs/02 so everything is findable.

26. **Why is the dashboard mockup a component?**
    It appears twice (Hero + Preview section). Extracting `AppWindow` with a
    `detailed` prop honors "never duplicate code" — one source of truth.

27. **What is a SPA and its trade-offs?**
    One HTML file; JS renders everything — fast transitions, no reloads.
    Trade-offs: larger initial payload and SEO needs workarounds — acceptable for
    an authenticated app like TaskFlow.

28. **How do you know the page is responsive?**
    `max-w-7xl` containers with `px-4 sm:px-6 lg:px-8`, responsive grids,
    sidebar `hidden sm:flex`, navbar hamburger below `md`.

### Tools & workflow

29. **What does `npm run dev` do?**
    Starts Vite's dev server with hot module replacement — save a file, browser
    updates instantly. Source files are served directly (no build step).

30. **What does `npm run build` produce?**
    An optimized production bundle in `dist/` (minified JS/CSS). `dist/` is in
    .gitignore because it's generated, never hand-written.

31. **What is linting and why do it?**
    A static analyzer (oxlint) scans for bugs and style mistakes without running
    the app. We lint after every change so errors never accumulate.

32. **What is in your .gitignore and why?**
    `node_modules/` (regenerated by `npm install`), `dist/` (build output), logs,
    `.env*` (secrets — never committed), with `!.env.example` kept as the public
    template, plus editor/OS files. Source code, docs, and migrations are never
    ignored.

33. **What is the docs/ folder?**
    Seven numbered documents: requirements (01), architecture (02), dev rules
    (03), roadmap (04), design system (05), project memory (06), interview notes
    (07) — the single source of truth. Code follows docs, never the reverse.

34. **What is your development workflow?**
    Understand task → read docs → explain plan → list files → get approval →
    implement → verify (build + lint) → document in memory. Nothing gets coded
    before it is documented and approved.

35. **What would you improve next?**
    Per roadmap: Auth UI (6), Dashboard UI (7), Kanban UI (8), then backend
    (Express + Prisma + PostgreSQL), REST integration with Axios, testing, and
    deployment. v2.0: comments, roles, real-time updates.

36. **What is a layout route and what does `<Outlet />` do?**
    A route whose element renders a shared shell (sidebar + header) around child
    routes. `<Outlet />` is the placeholder where the matched child renders.
    `/dashboard` is a layout route: `RequireAuth → DashboardLayout → DashboardPage`.

37. **What is `NavLink` and how is it different from `Link`?**
    `NavLink` knows its own active state: `className={({ isActive }) => …}`
    switches to indigo when the URL matches. `Link` just navigates. `end` makes
    the match exact so `/dashboard` stays active only on that page.

38. **Why are Projects/Tasks/Calendar/Settings not links in the sidebar?**
    Their pages don't exist yet — a link would 404 (fake behavior). They render
    as muted visual items and become real `NavLink`s when their routes are added.

39. **Why did we install lucide-react?**
    The design system documents it as the icon library (one consistent stroke
    style). Icons are just React components — storing them in the nav data array
    (`icon: LayoutDashboard`) and rendering `<Icon />` keeps nav items data-driven.

40. **How does the dashboard avoid duplicated JSX?**
    Three reusable components: `StatCard`, `ProjectCard`, `EmptyState`. Each
    takes data via props (`<ProjectCard project={p} />`) and is rendered by
    `.map()` over mock arrays — adding a stat/card is one line in the array.

41. **Why does the progress bar use an inline style?**
    Tailwind can't compute a width from data at build time, so the bar fill
    gets `style={{ width: \`${project.progress}%\` }}` — React's way to pass
    dynamic values straight into CSS.

42. **How does the empty state work if the data is hardcoded?**
    Conditional rendering: `projects.length === 0 ? <EmptyState /> : <grid>`.
    Today the mock array always has items, so the grid shows; when Phase 11
    loads real data, an empty list automatically shows the EmptyState — the
    UI is already wired for it.

43. **Why is ProjectCard not clickable?**
    There is no project page or detail route yet — a clickable card would be a
    fake action (same rule as decision 20). It becomes interactive when the
    Projects feature arrives.

44. **How do the 5 dashboard pages share one shell and one guard?**
    Nested routes. All pages (`dashboard`, `projects`, `tasks`, `calendar`,
    `settings`) sit as children of one layout route: `RequireAuth → DashboardLayout
    → <Outlet />`. Adding a page = one `<Route path=…>` line; the guard and the
    sidebar/header apply automatically.

45. **How does the sidebar know which item is active?**
    Every item is a `NavLink` with `className={({ isActive }) => …}` — React
    Router compares the URL and hands back a boolean, so the active highlight
    updates on navigation with zero extra state. The `end` prop keeps the match
    exact.

46. **Why are the placeholder pages so small?**
    They render one shared `EmptyState` component with different props (icon,
    title, copy). Four pages, zero duplicated UI — the page file is just the
    props for that feature.

47. **What is a "nested route" vs a "layout route"?**
    A layout route is a parent that renders a shared shell; a nested route is a
    child whose element appears inside the parent's `<Outlet />`. Here
    `/dashboard` is the layout route and `projects`, `tasks`, etc. are nested
    routes — the URL is `/dashboard/projects`, the shell stays mounted.

48. **Why is the dashboard search an input that does nothing?**
    It is styled like the real thing (h-10, placeholder, focus ring) but has no
    state or handler — search logic comes in Phase 11. An honest affordance
    beats a fake result list; the focus ring requires a focusable element, so
    the "visual-only span" approach was retired in the header (decision 39).

49. **Why do informational cards not look clickable?**
    `StatCard`/`ProjectCard` hover is only `border-slate-300` + `shadow-md`
    with an explicit `cursor-default` — no pointer cursor, translate, scale,
    or lift. A hover that "lifts" the card promises a click that doesn't
    exist (decision 40).

50. **Why 150ms for nav hovers and 200ms for cards?**
    Design system §17: 200ms default, 100–150ms for micro feedback. Nav rows
    and the logo are micro feedback (fast color change); cards use a shadow
    transition at the default duration. Consistent, calm motion — no bounce
    or stagger.

51. **How do you make a progress bar accessible?**
    `role="progressbar"` + `aria-valuenow/aria-valuemin/aria-valuemax` +
    an accessible name. Without it, a screen reader only hears the "72%"
    text with no context that it is a progress indicator (added in 7.5).

52. **Why is the mock avatar `aria-hidden`?**
    It renders "AJ" — placeholder text with no real user behind it. Screen
    readers would announce meaningless initials, so the chrome is hidden from
    the accessibility tree until the real profile exists.

53. **What does a QA phase look like in practice?**
    Audit first (routes vs nav, guards, logout, unused imports, dead code,
    token consistency, focus rings), then fix only genuine findings — in 7.5
    that was exactly 3 ARIA issues. Unchanged files stay untouched; the diff
    stays small so history stays readable.

## 8. Demo Script

- TODO: Step-by-step live demo walkthrough (added when the app is demoable).

## 9. Key Learnings — Documentation Phase

> Today's study notes (2026-08-02) — what I learned and can now explain.

### 9.1 What is software architecture?

Software architecture is the **high-level structure of a system**: its main
components (frontend, backend, database), how they communicate, and the key
decisions behind them. Good architecture makes the app **maintainable,
scalable, and testable** — it is the blueprint we code against, not the code
itself.

### 9.2 Why documentation comes before coding

- **Clarity:** writing the plan forces me to think before typing.
- **Consistency:** all docs agree on the same stack and scope — no drift.
- **Control:** nothing gets coded until it is documented and approved
  (permanent rule in [03_DEVELOPMENT_RULES.md](./03_DEVELOPMENT_RULES.md) §1).
- **Efficiency:** less rework, fewer surprises, easier review.

### 9.3 The application flow of TaskFlow

1. **Authentication** — user registers or logs in (JWT + bcrypt).
2. **Workspace** — user creates a workspace (isolated space for their work).
3. **Project** — user creates projects inside a workspace.
4. **Task** — user creates tasks inside a project (title, description, status,
   priority, assignee, due date).
5. **Kanban board** — tasks are moved between status columns (To Do →
   In Progress → Done).
6. **Dashboard** — summary of workspaces, projects, and task statistics.
7. **Profile** — manage account details and password.

### 9.4 The chosen technology stack

- **Frontend:** React + Vite + JavaScript + Tailwind CSS + React Router + Axios.
- **Backend:** Node.js + Express.js.
- **Database:** PostgreSQL + Prisma ORM.
- **Auth:** JWT + bcrypt.
- **Version control:** Git + GitHub.

Detailed rationale: [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §2 and §3.

### 9.5 Frontend setup learnings (Phase 3)

- **Vite** generates a modern React project in seconds (`npm create vite@latest`) —
  dev server with hot reload, and production builds are small and fast.
- **Tailwind CSS v4** works as a Vite plugin (`@tailwindcss/vite`) — one line
  (`@import "tailwindcss";`) enables it; no `tailwind.config.js` needed.
- **React Router package name:** since v7 the package is `react-router`, not
  `react-router-dom`. v8 (June 2026) removed `react-router-dom` entirely and
  requires Node ≥ 22.22 — one reason we pinned v7.18.2.
- **Security hygiene:** `npm audit` found a high-severity advisory in React Router
  7.12–8.2 (GHSA-qwww-vcr4-c8h2). It only affects unstable RSC-mode APIs — not our
  SPA — but I verified the patched version and the Node requirement before choosing
  the version. Always check advisories before accepting versions.

### 9.6 Design system learnings (Phase 4)

- **What a design system is:** a set of reusable tokens and rules (colors, type,
  spacing, radius, shadows, component styles) that keep a product visually
  consistent. Tokens come first; components consume them.
- **Why one accent color:** "quiet UI" — neutral slate carries the layout, indigo
  is reserved for interactive/active elements. This is how Linear/Huly feel calm
  yet modern.
- **Accessibility built into tokens:** primary indigo is 4.5:1 on white (WCAG AA);
  semantic colors (green/amber/red) are never used as the only signal.
- **Tailwind makes tokens trivial:** our whole palette maps to Tailwind's default
  scales (indigo-600, slate-200, red-600…), so the design system costs almost no
  custom config — and stays consistent by construction.
- **Typography choice:** Inter at 14px base — denser, tool-like UIs use smaller
  base text than websites; hierarchy comes from weight (500/600) and size, not bold.

### 9.7 Dashboard shell learnings (Phase 7.1)

- **Layout routes are the React Router way to build app shells.** Instead of
  pasting the same sidebar/header into every page, the layout renders once with
  an `<Outlet />` where the matched child page appears. Nested route:
  `RequireAuth` (guard) → `DashboardLayout` (shell) → `DashboardPage` (content).
  This is why the `layouts/` folder exists.
- **`NavLink` vs `Link`:** `Link` navigates blindly; `NavLink` exposes
  `isActive` so the current page is highlighted. The `end` prop makes the match
  exact — without it, `/dashboard` would stay "active" on any deeper path.
- **Icons as data:** lucide-react icons are components, so they live inside the
  nav data array and are rendered with a single `<Icon />` — the array stays the
  single source of truth for the whole nav, same `.map()` pattern as Features.
- **Honesty in UI:** sidebar items for pages that don't exist yet are muted,
  non-clickable spans. A dead link would be fake behavior — the same rule that
  made "New Task" a visual-only `<span>` on the landing page mockups.

### 9.8 Dashboard content learnings (Phase 7.2)

- **Components are data-driven:** `StatCard`, `ProjectCard`, `EmptyState` know
  nothing about the dashboard — they receive everything through props and are
  stamped out with `.map()` from arrays. This is the same recipe as
  `FeatureCard`/`StepCard`: data in one place, UI in another.
- **Props can carry components:** an icon in the data array is a component
  reference (`icon: FolderKanban`); renaming on destructure (`icon: Icon`) and
  rendering `<Icon />` is React's pattern for "render whatever I was given".
- **Dynamic values need inline styles:** `style={{ width: '72%' }}` for the
  progress fill — Tailwind classes are written by hand at build time, so data
  values must go through the `style` prop.
- **Conditional rendering prepares for real data:** `projects.length === 0`
  swaps the grid for `<EmptyState />` today, so the empty UI is already in
  place for Phase 11 — no rework when the API returns zero projects.
- **Statuses map to tokens:** each project status maps to a §6 badge style
  (green/amber/red soft pills) via a plain object lookup — one place decides
  all badge colors.

### 9.9 Navigation & placeholder learnings (Phase 7.3)

- **Nested routes = free sharing.** Placing `projects`, `tasks`, `calendar`,
  `settings` as children of the `/dashboard` layout route means the guard
  (`RequireAuth`) and the shell (`DashboardLayout`) apply to every one of them
  automatically. The URL (`/dashboard/projects`) stays readable, and adding a
  future page is a one-line change in `AppRoutes`.
- **`NavLink` does the highlighting for you.** Instead of reading the URL
  manually and comparing strings, `className` receives `isActive` — the router
  does the match. Data (nav array) and behavior (active styles) stay separate.
- **Placeholders can be one component call.** A "Coming Soon" page is just
  `<EmptyState>` with different props; four pages need four tiny files, not
  four copies of card/dashed-border markup. Same props-driven recipe as
  FeatureCard/StatCard.

### 9.10 Dashboard polish learnings (Phase 7.4)

- **Hover ≠ clickable.** `transition-shadow + hover:shadow-md + hover:border-
  slate-300` gives a gentle response while `cursor-default` tells the truth —
  these cards are informational. If a hover makes something feel tappable, it
  must actually be tappable (decision 40).
- **Danger is a token.** Destructive actions have their own variant: the
  logout button uses §12 danger ghost (`text-red-600 hover:bg-red-50`) — the
  red hue is a semantic signal, not decoration.
- **An affordance can be honest and inert.** The search field is a real
  `<input>` (focusable, focus ring, placeholder) with no handler yet. It
  doesn't fake results; it just waits for Phase 11.
- **Motion durations express hierarchy.** 150ms for micro feedback (nav,
  logo, input border), 200ms for shadow transitions — per §17, never slower
  than 300ms and never decorative.

### 9.11 QA & accessibility learnings (Phase 7.5)

- **QA is audit-then-fix, not refactor.** The checklist ran over every
  dashboard file: routes ↔ nav match, guards, logout, unused imports, dead
  code, token/Tailwind consistency, focus states. Only real findings get
  touched; the rest stays as-is — small diffs keep history readable.
- **ARIA tells assistive tech what the DOM can't.** The progress bar fill is
  just a colored div with a width — `role="progressbar"` + `aria-valuenow`
  + `aria-valuemin/max` turns it into a proper widget for screen readers.
- **Placeholder chrome can be hidden.** Mock avatar ("AJ") and the decorative
  bell have `aria-hidden="true"` — anything that carries no real information
  should stay out of the accessibility tree.
- **Accessible names for landmarks:** `<nav aria-label="Main navigation">`
  disambiguates when multiple nav elements exist later.

---

*Status: §7 and §9 filled 2026-08-02. Other sections are filled continuously during development.*
