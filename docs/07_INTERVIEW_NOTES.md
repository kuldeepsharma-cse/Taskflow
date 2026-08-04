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

---

*Status: §7 and §9 filled 2026-08-02. Other sections are filled continuously during development.*
