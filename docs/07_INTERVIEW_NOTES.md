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

### 2026-10-22 — Prisma 7 CommonJS client import

- **Problem:** `server/src/db/prisma.js` initially used
  `import { PrismaClient } from '@prisma/client'`. The legacy `prisma-client-js`
  output is CommonJS, so Node ESM threw:
  `SyntaxError: Named export 'PrismaClient' not found`.
- **Solution:** Imported the module object as a default import and destructured
  `PrismaClient` from it. `npm run db:check` then connected successfully.
  The pattern is documented so future files reuse one shared client instead of
  creating new connections.

### 2026-10-23 — Auth session bootstrap without a flash of protected UI

- **Problem:** route guards can read `localStorage` synchronously, but a stored
  token may be expired or invalid. Trusting it renders the dashboard briefly and
  then kicks the user out; trusting only the network makes every load wait
  without feedback.
- **Solution:** introduced explicit session states (`checking`, `authenticated`,
  `unauthenticated`, `error`). The provider calls `/api/me` on startup: `200`
  hydrates the safe user, `401` clears the token, and network/5xx failures show a
  retry screen instead of logging the user out. Guards render a loading screen
  while `checking`, so protected content never flashes for an invalid session.

### 2026-10-23 — Fast Refresh export warning in the auth context

- **Problem:** exporting both `AuthProvider` (a component) and `useAuth` (a
  hook/constant) from one file triggered the `react(only-export-components)`
  lint warning because Fast Refresh cannot safely hot-replace a mixed module.
- **Solution:** split the module: `AuthContext.jsx` exports only the provider,
  while `authContext.js` owns the context object and `useAuth` hook. Behavior is
  unchanged; lint is clean.

### 2026-10-23 — Testing write-heavy CRUD safely

- **Problem:** CRUD tests create users, workspaces, projects, and tasks. Running
  them against `taskflow_dev` could pollute or delete real development data, and
  broad cleanup (`TRUNCATE`/reset) could erase rows the tests did not create.
- **Solution:** Used an isolated `taskflow_test` database. The runner fails closed
  unless `TEST_DATABASE_URL` is set, differs from `DATABASE_URL`, is not
  production, and targets `taskflow_test` with the `public` schema. It verifies
  `current_database()` before writing, tracks only the exact IDs it creates, and
  deletes tasks → projects → workspaces → users. Both databases ended with zero
  application rows.

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
   frontend; Node.js + Express + PostgreSQL + Prisma + JWT + bcrypt implemented
   on the backend. Chosen because it is industry-standard, beginner-understandable,
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
    Finish the remaining Phase 11 subphase (11.7), then testing and deployment.
    I also want a small, approved dependency-update pass for the client toolchain
    advisories, and a future token-revocation design so a password change can
    invalidate older JWTs. v2.0: comments, roles, real-time updates.

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
    `.map()` over the arrays loaded from the API — adding a stat/card is one line
    in the array.

41. **Why does the progress bar use an inline style?**
    Tailwind can't compute a width from data at build time, so the bar fill
    gets `style={{ width: \`${project.progress}%\` }}` — React's way to pass
    dynamic values straight into CSS.

42. **How does the empty state work with real data?**
    Conditional rendering: `projects.length === 0 ? <EmptyState /> : <grid>`.
    The Dashboard now loads real data, and a new account with no workspaces/
    projects/tasks automatically sees the relevant EmptyState.

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

### Backend (Phase 9)

54. **What is dotenv, and why not hardcode config?**
    dotenv reads key=value pairs from `.env` into `process.env` at boot. Config
    that changes per machine or deployment (port, client origin, later DB
    credentials) lives outside the code; `.env` is gitignored and
    `.env.example` is the committed template. Defaults in code keep local dev
    working even without a `.env`.

55. **What is CORS, and what is a preflight request?**
    Browsers enforce the same-origin policy: JavaScript on `localhost:5173`
    may not read responses from `localhost:3000` unless the API allows it with
    `Access-Control-Allow-Origin`. For non-simple requests the browser first
    sends an `OPTIONS` preflight; the `cors` middleware answers it (204) with
    the allowed methods/headers. TaskFlow allows only the configured
    `CLIENT_ORIGIN`, never `*`.

56. **Why does Express error middleware need four arguments, and why hide 500 details?**
    Express identifies error middleware by its signature `(err, req, res, next)`
    — three arguments would be treated as a normal middleware and never receive
    errors. It must be registered last. Returning a generic message for 5xx
    prevents leaking stacks, SQL, file paths, or secrets; the handler logs only
    safe server-side metadata and stack frames — never request bodies, headers,
    tokens, or credentials. 4xx messages are safe because they describe the
    client's own request.

### Database & Prisma (Phase 10)

57. **Why PostgreSQL and Prisma?**
    PostgreSQL is a production-grade relational database with strong integrity
    guarantees. Prisma gives the project a readable schema, generated type-safe
    queries, and a migration history. Together they match the relational shape
    of users → workspaces → projects → tasks.

58. **What is a migration, and why create it with `--create-only` first?**
    A migration is a versioned SQL file that moves the database from one schema
    state to another. `--create-only` generates the SQL without applying it, so
    a human can review it for destructive or unexpected statements. Once the
    migration is approved, applying it records a row in `_prisma_migrations`.
    Never edit a migration that has already been applied — create a new one.

59. **Why use enums for task status and priority?**
    Enums restrict the database to a known set of values. A task status can only
    be `TODO`, `IN_PROGRESS`, or `DONE`; priority can only be `LOW`, `MEDIUM`,
    or `HIGH`. This prevents silent typos and makes application code and
    reporting more predictable.

60. **Why these foreign-key delete rules?**
    `RESTRICT` prevents deleting a user who still owns workspaces.
    `CASCADE` removes projects when their workspace is deleted, and tasks when
    their project is deleted. `SET NULL` keeps a task when its assignee is
    deleted, but clears the assignment. The rules encode product intent in the
    database rather than relying only on application code.

61. **What is `_prisma_migrations`?**
    It is Prisma's internal bookkeeping table. Each applied migration gets a
    row with a checksum, timestamps, and an applied-step count. It is not an
    application table and must not be edited manually. Before applying the
    initial migration it had zero rows; after applying
    `20261022145549_init` it has one finished row.

62. **Why does `prisma.config.js` exist, and what is `@prisma/adapter-pg`?**
    Prisma 7 moves CLI configuration such as the schema path, migrations path,
    and datasource URL into `prisma.config.js`. At runtime, the `pg` driver
    adapter connects Prisma Client to PostgreSQL. The shared client in
    `src/db/prisma.js` lazily creates the adapter once and reuses one
    `PrismaClient` instance.

63. **Why keep `/api/health` independent of the database?**
    A health endpoint should answer whether the HTTP process is alive. If the
    database is down, that is a dependency failure, not necessarily a reason for
    the process to disappear. TaskFlow uses lazy `getPrisma()`: importing the
    auth routes does not create a database connection, and `/api/health` never
    queries the database. It still returned `{"status":"ok"}` with a deliberately
    invalid `DATABASE_URL`; unauthenticated `/api/me` also returned 401 without a
    connection. Database health, if needed, should be a separate readiness check.

64. **How does JWT authentication work in TaskFlow?**
    Registration and login verify or create a user, then sign an HS256 JWT whose
    `sub` claim is the user id; the default expiry is seven days. The client sends
    it as `Authorization: Bearer <token>`. `requireAuth` verifies the signature and
    expiry, validates the numeric user id, and attaches `{ id }` to the request.
    The server stores no session — logout simply discards the token. The secret
    lives only in the gitignored `.env` and must be at least 32 characters.

65. **Why bcrypt, and why 12 rounds?**
    bcrypt is a salted, deliberately slow password hash, so identical passwords
    produce different hashes and brute-force attempts are expensive. Twelve rounds
    balance security and local login latency. Registration rejects passwords over
    72 bytes (bcrypt's input limit); login uses `bcrypt.compare`, and the plaintext
    password or hash is never stored in client state or returned by the API.

66. **Why generic login errors and safe user selects?**
    A single `401 INVALID_CREDENTIALS` response avoids revealing whether an email
    exists (account enumeration). Responses use the `publicUserSelect` shape
    (`id`, `name`, `email`, timestamps) and never include `passwordHash`. Detailed
    field errors are only for invalid input, not failed credentials.

67. **Why normalize email addresses?**
    The server trims and lowercases every email before validation, lookup, and
    insertion. That prevents duplicate accounts that differ only by case or
    whitespace. The database's unique constraint remains the final guard; Prisma
    `P2002` is mapped to `409 EMAIL_IN_USE` for races.

68. **What is the localStorage XSS trade-off?**
    The MVP stores the JWT under `taskflow_token` in `localStorage` because it is
    the simplest beginner-friendly SPA flow for the Axios integration. The risk is
    that an XSS flaw can read it. Mitigations: React escapes rendered data, the app
    never uses `dangerouslySetInnerHTML`, only the token is stored (never
    passwords/hashes or the user object), and tokens are never logged. A future
    hardening step is an httpOnly, Secure, SameSite cookie, which requires CORS
    credentials and cookie handling.

### CRUD & integration testing (Phase 11.2)

69. **How do you ensure a user can only access their own workspaces, projects, and tasks?**
    The owner comes from the verified JWT, never the request body. Workspace
    queries filter by `ownerId`; project queries require
    `workspace.ownerId = req.user.id`; task queries require
    `project.workspace.ownerId = req.user.id`. A missing row and another user's row
    both produce the same `404 NOT_FOUND`.

70. **Why return 404 instead of 403 for another user's resource?**
    A `403` confirms the resource exists, which leaks information. Returning `404`
    for both missing and foreign rows makes resource enumeration harder. The
    trade-off is slightly less specific diagnostics, which is acceptable for a
    multi-user API.

71. **Why take parent IDs from the URL and the owner from the JWT?**
    URLs identify the resource being addressed; the JWT proves who is asking.
    Accepting `ownerId` or moving a task by sending another `projectId` would be a
    mass-assignment bug. Unknown ownership/parent fields in a body are ignored,
    and `PATCH` updates never move a project or task between parents.

72. **How do you store a date without a timezone?**
    The API accepts only `YYYY-MM-DD` (or `null`), validates that it is a real
    calendar date (so `2026-02-30` fails), and stores it at UTC midnight in the
    existing `DateTime` column. Responses slice the ISO string back to
    `YYYY-MM-DD`, so the client never sees a timezone-shifted date. This avoided a
    schema migration while keeping the API date-only.

73. **Why split `app.js` from `server.js`?**
    `app.js` builds and exports the Express application; `server.js` only starts
    listening. Tests import the app, mount it on port `0`, and use the actual
    routes, middleware, and error handler without a fixed port. Production still
    has one entry point.

74. **How do you test write-heavy CRUD without damaging development data?**
    Tests use isolated `taskflow_test`, with a fail-closed guard on the URL,
    environment, database name, and schema. They verify `current_database()`
    before writing, create two users, exercise the full ownership matrix, and
    clean up exact tracked IDs only. No truncate, reset, seed, or broad delete.

75. **Why can a task only be assigned to the workspace owner right now?**
    The approved schema has no `WorkspaceMember` model, so there is no reliable
    way to prove that another user belongs to the workspace. Restricting the
    assignee to the owner is honest and prevents cross-workspace assignment.
    Memberships and role-based assignment are a v2.0 design.

### Client auth & API integration (Phase 11.3)

76. **How does the frontend know a stored session is still valid?**
    `AuthProvider` starts in `checking` when `taskflow_token` exists, calls
    `GET /api/me` with the Bearer token, and only then becomes `authenticated`.
    A `401` clears the token and becomes `unauthenticated`; a network/5xx failure
    becomes `error` and shows a retry screen.

77. **Why use Context for auth instead of reading localStorage in every guard?**
    The session has one owner. Context exposes the user, session status, login,
    register, logout, and retry in one place; guards and pages consume the same
    state and cannot disagree. localStorage remains only the persistence layer
    for the token, not the source of truth for the UI.

78. **Why are `AuthContext.jsx` and `authContext.js` separate files?**
    React Fast Refresh requires a module to export either components or
    non-components, not both. The provider lives in `.jsx`; the context object
    and `useAuth` hook live in `.js`. The split satisfies
    `react(only-export-components)` without changing behavior.

79. **How is the intended protected route preserved after login?**
    `RequireAuth` redirects to `/login` with
    `state={{ from: location.pathname + location.search }}`. After login,
    `getAuthRedirectPath()` accepts only `/dashboard` or `/dashboard/...` and
    otherwise falls back to `/dashboard`. The allowlist prevents an open redirect.

80. **Why clear the session on `401` but not on a network error?**
    A `401` is the server proving the token is invalid, so keeping it would trap
    the user in a broken session. A network/5xx error says nothing about the
    token; logging the user out would be misleading and destroy a valid session,
    so the UI offers retry instead.

81. **How do backend validation details reach the right form fields?**
    The API returns `details: [{ field, message }]`. `mapFieldErrors()` converts
    that array into an object keyed by field, and the form merges it into its
    existing `errors` state. Unknown fields are ignored; form-level errors
    (invalid credentials, duplicate email, network) use the shared `FormAlert`.

82. **Why does Vite proxy `/api` in development?**
    The browser calls `/api` on the Vite origin, and Vite forwards the request to
    `http://localhost:3000`. That keeps development same-origin, avoids CORS
    configuration changes, and mirrors the production default where the API is
    exposed behind the same origin. `VITE_API_URL` is the escape hatch for a
    separately hosted API.

83. **What did Phase 11.3 deliberately leave alone?**
    The backend, schema, migrations, CORS, and development database; the mock
    dashboard statistics/projects and the entire Kanban board. This phase wired
    authentication and transport only — real workspace/project/task data moves
    in later approved Phase 11 subphases.

### Workspace & project CRUD UI (Phase 11.4)

84. **How does `ProjectsPage` coordinate two related data loads?**
    Two effects own the loads. The first fetches workspaces and chooses the
    selected id: keep it if it still exists, otherwise prefer the newest
    workspace. The second fetches projects whenever that id changes. Each effect
    has an `active` cleanup flag, so a slow response from an old workspace cannot
    overwrite the current one. Switching workspaces also closes the project
    editor and clears the old list while the next request loads.

85. **Why use inline forms and confirmations instead of modals?**
    Inline UI keeps the workspace/project context visible, needs no modal
    dependency, and avoids focus-trap and portal complexity. It fits this
    page-local CRUD scope. A modal system can be introduced when cross-page
    dialogs actually require one.

86. **If a button is disabled while saving, why add `useRef` locks?**
    React state updates are asynchronous. A rapid double click can fire the
    handler twice before the disabled attribute appears in the DOM. The ref is
    set synchronously before the `await`, so the second click returns
    immediately; `finally` releases it. State still drives the visual pending
    state.

87. **How are cascade deletions communicated and verified?**
    The schema defines workspace → projects → tasks and project → tasks as
    `ON DELETE CASCADE`. The confirmations state that consequence before the
    request. On failure, the confirmation remains open with the error, so the
    user can retry safely. The isolated browser harness verified that deleting a
    workspace removed its project and task rows from `taskflow_test`.

88. **Why doesn't the API-backed Projects page show status, progress, or due dates?**
    The approved `Project` model has only `name`, `description`, `workspaceId`,
    and timestamps. Rendering invented values would present fake data as real.
    The Dashboard's Phase 11.6 card also avoids invented fields: it derives
    progress from the project's real task statuses and shows real counts/dates.

89. **What is the client's role in validation if the server validates too?**
    Client validation gives immediate feedback and mirrors the server's limits
    (name 1–100, description ≤2,000). The server remains the security and
    integrity authority. If the server rejects a field, `details[{ field,
    message }]` maps back to the matching input; unknown fields are ignored.

### Task CRUD & Kanban persistence (Phase 11.5)

90. **How does the Tasks page keep workspace, project, and task loads in sync?**
    Three dependent effects own the loads. The workspace effect chooses a valid
    workspace, the project effect reloads whenever that workspace changes, and
    the task effect reloads whenever the selected project is ready. Each effect
    has an `active` cleanup flag, so a late response cannot overwrite the current
    selection. The chosen ids are mirrored into the URL, which preserves the
    board across reload and makes the selection linkable.

91. **Why are card moves server-confirmed instead of optimistic?**
    The card initially stays in its old column. After `PATCH /api/tasks/:taskId`
    succeeds, the response replaces that task in state and the derived columns
    move it. A pending indicator explains the wait, a synchronous `useRef` lock
    rejects duplicate clicks, and a failure keeps the old state visible with an
    error. The board therefore never claims a status the database rejected.

92. **Why use one column-to-status map?**
    `utils/kanban.js` maps `todo → TODO`, `in-progress → IN_PROGRESS`, and
    `done → DONE`. The same map groups server tasks into lanes and converts a
    move target into the PATCH payload. There is no second list of statuses to
    drift out of sync, and the pure helpers stay easy to reason about.

93. **Why doesn't the board support drag-and-drop or custom ordering?**
    The existing Back, forward, and Mark Done buttons already express every
    legal transition, so drag-and-drop would add a dependency and accessibility work
    without adding capability. The schema also has no rank/position field; the
    API returns oldest-first order, and `buildBoardColumns` preserves it. Custom
    ordering would need a schema and API change, so it is deliberately absent.

94. **How did the harness prove persistence without touching development data?**
    It verified `current_database() = 'taskflow_test'` before writing, created a
    unique user/workspace/project/task, and checked create, status, edit, and
    delete across full page reloads. It then confirmed no task rows remained,
    removed the exact ids it created, and compared `taskflow_dev` row counts
    before and after. The 14 checks passed, including unchanged development
    counts.

### Dashboard, profile & demo data (Phase 11.6)

95. **Why aggregate the Dashboard on the client instead of adding an endpoint?**
    The existing list APIs already return the workspaces, projects, and tasks the
    Dashboard needs. `utils/dashboard.js` joins them with maps and sorts them
    into stats, recent projects, and recent tasks. That avoids new API surface
    and schema work for a small MVP. The trade-off is a fan-out of one request
    per workspace/project; a dedicated aggregate endpoint can replace it if the
    data size grows.

96. **Why require the current password to change an email or password?**
    Those are sensitive account changes. Requiring re-authentication means a
    stolen JWT alone cannot take over the account, and the email change also
    confirms the user knows the existing credential before changing their login
    identifier. A wrong current password returns `400 VALIDATION_ERROR`, not
    `401`, because it is a failed confirmation, not an expired session; a `401`
    would make the client clear the token and log the user out.

97. **Why do existing JWTs remain valid after a password change?**
    The API is stateless: a JWT is valid until it expires unless the server keeps
    revocation state. Adding immediate revocation needs a `tokenVersion` or
    password-change timestamp checked by the auth middleware. That is a
    documented future hardening step; this phase accepts the trade-off so the
    scope stays small and the current client flow remains simple.

98. **How is demo data kept away from development data?**
    The seed has its own `DEMO_DATABASE_URL`, refuses production and
    `taskflow_dev`, refuses the same URL as `DATABASE_URL`, and allows only
    `taskflow_demo` or `taskflow_test`. It also requires `--confirm`, verifies
    `current_database()`/`current_schema()` before writing, and is idempotent per
    demo user. The script was verified on `taskflow_test`; `taskflow_demo` was
    not created or seeded without separate approval.

99. **How did the UI verification cover the new flows?**
    An isolated Edge/CDP harness mounted the exported app on port 3100 against
    `taskflow_test`, seeded a unique user/workspace/projects/tasks, and loaded
    Vite on port 5174. It asserted the real dashboard stats, project cards,
    Recent Tasks, and absence of the mock activity feed; updated the profile and
    checked `/api/me`; revealed the email current-password field and hid it again;
    changed the password and asserted logout plus old-password rejection/new-
    password login. It then deleted the exact user/workspaces and confirmed no
    leftovers. The user's dev servers on 3000/5173 were untouched.

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

### 9.12 Kanban board layout learnings (Phase 8.1)

- **Horizontal scroll is a flexbox trick.** Columns get a fixed width +
  `shrink-0` inside a `flex gap-4 overflow-x-auto` row — they can never
  squeeze or stack, so the whole board scrolls sideways on small screens
  (design system §18: "columns scroll horizontally below md instead of
  stacking"). No JavaScript involved — pure layout.
- **Derived values never drift.** The column header count is computed
  (`column.tasks.length`), never stored as a separate number. If a task is
  added or moved, the count updates automatically — there is no second source
  of truth to forget to update (the same idea as the ProjectCard progress bar).
- **A board is just two dumb components.** `KanbanBoard` receives a `columns`
  array and maps it into `KanbanColumn`s; `KanbanColumn` receives one
  `column` object. Neither knows where the data comes from — in Phase 11 the
  same two components can render a real project's tasks from the API.
- **Empty states are reusable everywhere.** Instead of leaving blank lanes,
  the shared `EmptyState` renders inside each empty column. Four placeholder
  pages, the dashboard projects section, and now Kanban columns all reuse one
  component — props change, markup doesn't.
- **A real page finally has a heading.** The Tasks placeholder (a single
  `EmptyState`, no `h1`) became the first real sub-page with proper heading
  structure (`h1` page title + `<h2>` column titles) — the documented heading
  debt from 7.5 is now paid down.

### 9.13 White screen debugging — route mismatch (Phase 8.1 bug fix)

- **A white screen after clicking a link is often a route mismatch, not a render crash.** React Router renders `null` when no route matches the URL — and since the whole app lives inside `<Routes>`, the entire shell (sidebar, header) disappears too. The Tasks page "white screen" turned out to be `NavLink to="/tasks"` while the route table only knows `/dashboard/tasks`.
- **Nav paths must be exact twins of route paths.** Absolute `to` values have to match the route tree (here: nested under `/dashboard`). A one-character mismatch silently renders nothing.
- **How to prove a white screen's cause without guessing:** headless browser tests. Dump the DOM (`--dump-dom`) for the URL in question — an empty `#root` proves "no route matched". Seed mock auth via CDP (`localStorage.setItem`) and click the real links to verify the actual user flow. If the route page renders fine when visited directly, the bug is the link — not the page.
- **Why it survived for so long:** the Dashboard nav item (`/dashboard`) was correct and the QA passes were code-level, so nobody clicked the other four items in a real browser. Functional verification of every link is part of QA, not optional.

### 9.14 Task card learnings (Phase 8.2)

- **Conditional rendering inside a list:** the column body is one ternary —
  `tasks.length === 0 ? <EmptyState /> : <cards map>` — so every column
  automatically shows the right thing. The empty state and the data-driven
  card list live in the same component, and the check is data, not duplicated
  markup per column.
- **Lookup-map styling scales to any dataset:** priorities map to §6 soft pills
  through a plain object (`High: 'bg-red-50 text-red-700'`, …) with a neutral
  fallback — same recipe as ProjectCard's statuses. Unknown priority values
  can never crash or look broken.
- **Context as data, not markup:** each column carries its own
  `emptyTitle`/`emptyDescription`, so "Nothing to do yet" vs "Nothing
  completed yet" is just data — components stay dumb and copy is easy to
  change in one place.
- **Design tokens for tiny details:** IDs use the §7 mono font; estimates and
  dates use lucide icons (Clock/Calendar) at 16px with `text-xs` slate meta
  text; tags are `rounded-md` chips on `slate-100`. Nothing on a card is an
  off-token value.
- **Hover feel without fake clicks:** the card lifts (`-translate-y-0.5` +
  border + shadow) so it *feels* draggable/clickable, but the cursor stays
  default because no interaction exists yet — interaction arrives in 8.3. The
  feel anticipates the feature without pretending it exists.

### 9.15 Task movement & state learnings (Phase 8.3)

- **Lift state to the component that needs the whole picture.** The board's
  columns live in `TasksPage` (`useState(initialColumns)`) because a move
  changes *two* columns — source loses the task, target gains it. Only the
  top component can rebuild the board consistently; everything below stays
  presentational (props in, callbacks out).
- **Unidirectional data flow = props down, events up.** A click on a card
  button calls `onMoveTask(task.id, columnId, toId)`; that callback was passed
  down by reference (TasksPage → KanbanBoard → KanbanColumn → TaskCard) and
  the event bubbles back up to the one owner of the data. The card never
  knows the algorithm — it just reports "move this task here".
- **Immutable updates are the contract.** `moveTask()` never touches the
  input: it builds new arrays with `.filter()`, spread, and `.map()`, keeping
  untouched columns by reference. React compares state references to decide
  re-rendering — mutating would silently break that. The updater form
  (`setColumns(prev => moveTask(prev, …))`) guarantees `prev` is always the
  freshest snapshot, even on rapid clicks.
- **Pure helpers make logic testable and explainable.** The whole movement
  algorithm is one pure function in `utils/kanban.js` with no React imports —
  same input always produces the same output. Unknown task IDs return the
  input unchanged (safe no-op) instead of crashing.
- **Derived UI updates itself.** Counts, card lists, and the empty state all
  derive from `column.tasks.length` — after a move, the header pill, the card
  list, and even "Nothing completed yet" appear/disappear with zero extra
  code. That is "deriving UI from state" in one sentence.
- **Edges express themselves in data, not conditionals.** `getAdjacentColumnId`
  returns `null` at the board edges, so To Do cards simply have no back button
  and Done cards no forward button — no per-column if/else in the card.

### 9.16 Kanban polish learnings (Phase 8.4)

- **Affordance through tinted secondary buttons.** Movement actions went from
  invisible ghost buttons to light tinted ones: indigo-50/200/700 for forward
  (the brand accent = "next step"), slate-100/200/600 for back (neutral =
  "retreat"). Thin borders + light fills + no shadow keep them secondary —
  the eye knows they're clickable without competing with primary buttons.
- **Completion deserves a distinct visual vocabulary.** "Mark Done" keeps a
  full label plus a CheckCircle2 icon — a check mark instead of an arrow — so
  completing a task feels categorically different from moving it. Users
  requested this deliberately: consistent icons for one kind of action,
  a different icon for a bigger commitment.
- **Micro-interaction tokens do the polish work.** 150ms color transitions
  for buttons (vs 200ms card shadows, §17), `active:scale-95` press feedback,
  `hover:border-*-300` darkening layered on `hover:bg-*-100/200` — all from
  the existing token set: no new colors, no invented animations.
- **cursor-pointer vs cursor-default draws the interaction boundary.** The
  card body stays `cursor-default` (clicking it does nothing); only the real
  controls get `cursor-pointer` (Tailwind v4 no longer defaults buttons to
  pointer — it must be explicit). Cursor honesty is part of the UI contract.
- **Icons as data.** Each move object carries an `icon` name (`back` /
  `forward` / `done`) decided by the column; TaskCard maps names to lucide
  components. The dumbest component in the chain never needs to know what
  "done" means in the workflow.
- **Additive props are the safe way to evolve shared components.** `EmptyState`
  gained an opt-in `compact` prop — the default branch is byte-identical, so
  four other pages keep rendering exactly as before. Extending beats copying.

### 9.17 Phase 8 — the whole Kanban in one page (interview-ready summary)

Beginner-friendly walkthrough of the complete board feature. Say it in this
order and you cover state, props, and architecture in 60 seconds:

1. **Component chain = one owner, then pure presenters.**
   `TasksPage` → `KanbanBoard` → `KanbanColumn` → `TaskCard`. Only
   `TasksPage` holds state (`useState`); everything below receives data
   through props and reports events through callbacks — "data flows down,
   events flow up". That is **lifting state up**: the state lives in the
   highest component that needs it (moving a task changes two columns, so
   only the top can rebuild the whole board).
2. **Functional state updates.** `setColumns(prev => moveTask(prev, …))` —
   React guarantees `prev` is the freshest snapshot, so fast clicks can
   never use a stale value (avoids the *stale closure* bug).
3. **Immutability with plain arrays.** `moveTask()` never mutates:
   `source.tasks.filter(...)` removes the task, `[...target.tasks, task]`
   appends it, untouched columns keep their reference. React re-renders
   because state references change. Bonus safety: the helper returns the
   input unchanged for unknown ids (pure = same input → same output).
   - `map` → build new columns; `filter` → remove the moved task;
     `find` → locate source/target/task; spread → copy + append.
4. **Derived state.** Counts, card lists, and empty states all come from
   `column.tasks.length` — move a task and the header pill, the card list,
   and "Nothing completed yet" update themselves with zero extra code.
5. **Stable keys.** Columns keyed by `column.id`, tasks by `task.id`,
   buttons by their target id — React reconciliation stays correct when
   cards travel between lists.
6. **Conditional rendering.** One expression decides the column body:
   `tasks.length === 0 ? <EmptyState compact …/> : <cards/>`. The same
   `EmptyState` is shared app-wide — a `compact` variant for narrow lanes,
   the default for full pages (one component, additive props).
7. **Movement buttons as data.** The column derives `moves` from the
   workflow order (`getAdjacentColumnId` — edges return `null`, so To Do
   has no "Back" and Done no forward button); each move carries a label and
   an icon name, so TaskCard never knows board rules.
8. **Responsive horizontal scroll.** Columns are fixed-width (`w-72
   shrink-0`) inside `overflow-x-auto` — below `md` the board scrolls
   sideways instead of squeezing, exactly as the design system §18 says.
9. **Accessibility in practice.** `h1` page → `h2` columns → `h3` card
   titles; every control is a real `<button>` (Enter/Space work); `focus-
   visible` indigo rings; decorative lucide icons default to `aria-hidden`;
   button names come from labels, not icons — a screen reader hears
   "Mark Done" and sees the same name as a sighted user.
10. **Design-token discipline.** Zero new colors or shadows: tinted
    variants, hover states, and motion all come from the approved token
    set (indigo/slate §2–3, cards §14, motion §17) — consistent UI is
    cheaper than clever UI.
11. **QA = restraint.** Phase 8.5 fixed exactly ONE latent edge case (a
    wrongly-targeted `moveTask` could drop a task — never reachable from
    the UI but unsafe as a pure helper) and left everything else alone.
    Knowing what *not* to change is a professional skill.

### 9.18 Kanban QA learnings (Phase 8.5)

- **Safe helpers must be safe for ANY input.** `moveTask` documented "unknown
  ids → no-op" but only guarded the source; an unknown target silently lost a
  task. A pure function's contract must hold for everything the function
  accepts — reachable or not. 2-line fix, node-verified before the browser.
- **QA gates are checklists, not vibes.** The pass covered state flow,
  architecture, transitions, tokens, a11y, responsive, shared-component
  regression, routing regression, code quality, build/lint, and a headless
  e2e ride — route guards, real login submit, movement round trip, logout,
  3 viewports. Prefer proof (node unit checks + CDP) over "it looks fine".
- **Regression is about protecting the whole app, not just the board.** The
  scariest failure class is the white screen: a nav link that doesn't match
  the route table (Session 28) rendered nothing. Phase 8.5 re-verified all
  five routes, guards, and the sidebar active states — and the fix itself
  touched zero navigation code, so routing cannot regress from it.

### 9.19 Backend scaffold learnings (Phase 9.1)

First backend phase — same recipe as Phase 3: build the foundation, then prove it runs.

- **Node.js is a runtime, not a framework.** `node src/server.js` executes
  JavaScript outside the browser — no DOM, but full access to the network and
  the filesystem. Same language as React, completely different environment.
- **What Express adds.** Node's built-in `http` module works, but routing by
  hand means parsing URLs manually. Express gives us an app object, routers,
  and a middleware pipeline — the industry standard for REST APIs.
- **ESM on both sides.** `"type": "module"` in `server/package.json` makes Node
  use `import`/`export` — the same syntax the client already uses. One module
  system across the repo means one mental model.
- **App vs Router.** `server.js` creates the app and mounts routers
  (`app.use('/api', healthRouter)`); `routes/health.js` declares only its own
  paths. A route is just: HTTP method + path + handler `(req, res) => …`.
  One file per resource keeps Phase 11's routers small and findable.
- **`npm run dev` vs `npm start`.** `start` runs `node src/server.js` (what
  production does); `dev` adds Node's built-in `--watch` flag, which restarts
  the process on file changes — no nodemon dependency needed on Node 22.
- **Ports are doors.** The Vite dev server sits on `:5173`, the API on
  `:3000` — two processes, two addresses, one machine. `process.env.PORT ||
  3000` reads the platform-provided port when hosting provides one (Phase 13)
  and falls back to 3000 locally.
- **Verify bodies, not vibes.** The first health check was registered at the
  wrong path (`/` under the `/api` mount → `GET /api/`), so `/api/health`
  returned a non-empty 404 page while the server booted fine. Checking the
  *body* (`{"status":"ok"}`), not just "did something respond", is what
  caught it.
- **Health checks are an industry habit.** A tiny `GET /api/health` proves the
  process booted and can answer HTTP; deployment platforms ping exactly this
  kind of endpoint to decide whether an app is alive.

### 9.20 Environment, CORS & error-handling learnings (Phase 9.2)

Configuration, cross-origin traffic, and failures — the three things every API
must handle before it can be trusted.

- **Config belongs in the environment, not the code.** `dotenv` loads `.env`
  into `process.env`; `.env` is gitignored while `.env.example` documents the
  keys. Defaults in code (`PORT || 3000`, `CLIENT_ORIGIN || localhost:5173`)
  mean the server still boots on a fresh clone before `.env` exists.
- **CORS is a browser rule, not server security.** The API decides which
  origins may *read* its responses via `Access-Control-Allow-Origin`; curl
  ignores it. The `cors` package's string option sends a fixed header even to
  other origins (the browser blocks the mismatch) — an origin callback lets us
  omit the header entirely for unknown origins.
- **A preflight is the browser asking permission.** Non-simple cross-origin
  requests trigger an `OPTIONS` request first; the middleware answers 204 with
  `Access-Control-Allow-Methods`/`Headers` so the real request can follow.
- **Middleware order is behavior.** The pipeline is dotenv → CORS → routes →
  404 → error handler. A 404 catcher before the routes would swallow every
  request; an error handler before the routes would never see route errors.
- **Error middleware is special.** Express only treats `(err, req, res, next)`
  as error middleware — all four arguments are required, and it runs last.
  Respond generically on 5xx (`Internal server error`) and log only safe
  server-side metadata/stack frames; exposing `err.message`/stacks leaks
  internals, while logging bodies, headers, tokens, or credentials creates a
  second leak.
- **Verify transport, not just status.** Real verification meant checking
  bodies and headers: `204` + ACAO on preflight, no ACAO for a foreign origin,
  exact JSON error shapes, `.env` PORT switching, and the no-`.env` fallback.
  A request that merely "returns something" proves very little — and always
  confirm the process you are testing is running the file you just changed.

### 9.21 Database & Prisma learnings (Phase 10)

The database is the source of truth for relationships and constraints — not just
a place to put JSON.

- **Schema first, SQL second.** `schema.prisma` describes models, relations,
  enums, indexes, and delete rules in one readable file. Prisma generates the
  SQL migration from that schema, so the schema and database stay aligned.
- **A migration is versioned database history.** The SQL file is committed;
  `_prisma_migrations` records what has been applied. `--create-only` separates
  "generate" from "apply" so the SQL can be reviewed before it touches data.
- **Enums encode valid states.** `TaskStatus` and `TaskPriority` prevent invalid
  values at the database boundary, not merely in React state.
- **Foreign keys encode product rules.** `RESTRICT`, `CASCADE`, and `SET NULL`
  decide what happens when a parent row is deleted. These choices are part of
  the design and belong in documentation.
- **Indexes support access patterns.** Owner, workspace, project, assignee, and
  status lookups are indexed because the app filters and groups tasks that way.
- **Prisma 7 separates CLI config from runtime.** `prisma.config.js` supplies
  the datasource URL to the CLI; `@prisma/adapter-pg` connects the runtime client
  through `pg`. The shared client belongs in `src/db/`, not in every route.
- **CommonJS and ESM can disagree.** The generated `prisma-client-js` package is
  CommonJS, so named ESM imports failed. A default import plus destructuring is
  the compatible pattern for this stack.
- **Health and readiness are different.** `/api/health` answers "is the HTTP
  process alive?" without creating a Prisma connection. A database-dependent
  readiness check can be added separately if deployment needs it.
- **Verify the database, not only the command exit code.** Check applied
  migration rows, tables, columns, defaults, enums, indexes, foreign keys, and
  row counts. `db:check` proves connectivity; it does not prove the schema.
- **Quote mixed-case identifiers in raw SQL.** PostgreSQL folds unquoted names
  to lowercase. Use `"User"`, `"Workspace"`, `"Project"`, and `"Task"` in raw
  queries. A PowerShell `psql -c` check initially produced false negatives by
  stripping those quotes; rerunning the SQL through stdin fixed the check.

### 9.22 Auth foundation learnings (Phase 11.1)

Authentication is a boundary: validate input, hash secrets, prove identity, and
never return more than the client needs.

- **Hash passwords; never encrypt them.** bcrypt adds a per-password salt and a
  deliberately expensive work factor (`12` rounds). Store the hash, compare with
  `bcrypt.compare`, and enforce bcrypt's 72-byte limit during validation.
- **A JWT is signed, not encrypted.** Anyone can decode its payload; the signature
  only proves the server issued it. Put a stable identifier (`sub`) and expiry in
  it, never a password or sensitive data. The secret belongs in `.env`, not code.
- **Stateless auth means no server session.** The client sends
  `Authorization: Bearer <token>`; middleware verifies the signature/expiry and
  attaches the user id. Logout only discards the client token.
- **Normalize before lookup.** Trimming and lowercasing emails prevents duplicate
  accounts; the unique constraint still guards concurrent registrations, and
  Prisma `P2002` maps to `409 EMAIL_IN_USE`.
- **Return only safe fields.** One shared `publicUserSelect` prevents accidental
  `passwordHash` exposure across register, login, and `/api/me`.
- **Generic credential errors prevent enumeration.** `INVALID_CREDENTIALS` never
  reveals whether the email exists; validation details are reserved for malformed
  input, not failed logins.
- **Lazy initialization separates import from connection.** `getPrisma()` creates
  the adapter on first call, so `/api/health` stays alive with an invalid
  `DATABASE_URL`. Health and readiness answer different questions.
- **Errors need two audiences.** Clients get consistent, safe codes/messages;
  developers get safe server-side metadata without bodies, headers, tokens, or
  credentials. 5xx details never leave the server.
- **localStorage is a trade-off, not a free choice.** It is simple for an MVP but
  readable by any XSS. Document the risk and mitigations; httpOnly cookies are the
  future hardening path.
- **Clean up test data.** Phase 11.1 created exactly one temporary user, verified
  the flows, deleted it, and confirmed all four table counts were back to zero.

### 9.23 CRUD & test-isolation learnings (Phase 11.2)

CRUD is where authorization, validation, and data integrity meet.

- **Ownership belongs in the query.** Filtering by the JWT user in the database
  query is safer than fetching first and checking later. Nested relation filters
  prove a project belongs to the user's workspace and a task belongs to the
  user's project in one step.
- **Never trust identifiers in the body.** Resolve the owner from the token and
  the parent from the URL. Ignoring extra fields prevents mass-assignment and
  accidental moves between workspaces.
- **404 can be a security choice.** Using `404` for both missing and foreign
  resources avoids confirming that another user's row exists.
- **Validation has layers.** API validation protects the server; database enums,
  foreign keys, and delete rules protect data integrity even if a future code
  path forgets a check.
- **Date-only values need discipline.** Validate the calendar date, normalize to
  UTC midnight, and serialize to `YYYY-MM-DD`. Otherwise a client in another
  timezone can see the previous or next day.
- **Test databases are production code too.** A fail-closed guard is better than
  a comment. Check the environment, URL difference, database name, and schema
  before the first write.
- **Clean up by identity, not by range.** Exact tracked IDs make cleanup
  reversible and prevent a failed test from truncating unrelated data. Verify
  the rows are gone after deletion.
- **Separate app construction from process startup.** Exporting the app makes
  HTTP integration tests possible without a fixed port or duplicated middleware.
- **Dependency audits need a plan.** The server audit is clean, but the client
  toolchain still reports advisories. Recording them honestly and scheduling a
  dedicated upgrade is safer than silently changing dependencies during a
  feature.

### 9.24 Client auth & API integration learnings (Phase 11.3)

Authentication on the client is a state machine plus one HTTP transport layer —
not a boolean flag.

- **A token existing is not the same as being logged in.** The token can be
  expired, revoked, or from another environment. Hydrating through `/api/me`
  proves the session before protected UI renders.
- **Explicit states beat inferred booleans.** `checking`, `authenticated`,
  `unauthenticated`, and `error` each have a different UI. Separating `401` from
  network/5xx failures prevents a temporary outage from destroying a valid
  session.
- **One Axios instance, one policy.** A single request interceptor attaches the
  Bearer token; a single response normalizer produces safe errors. Pages never
  construct URLs or headers themselves.
- **Only persist what must survive a reload.** The JWT is in localStorage; the
  user object stays in React state. This avoids stale profile copies and limits
  what an XSS can read.
- **Return paths need an allowlist.** Router state is user-influenced. Accepting
  only `/dashboard` and `/dashboard/...` keeps the convenience redirect while
  preventing an open redirect.
- **Server error details are a contract.** `details: [{ field, message }]` maps
  directly to inputs, while form-level errors cover credentials, duplicates, and
  connectivity. The UI does not parse arbitrary error strings.
- **Vite's proxy is a development boundary.** Same-origin `/api` requests avoid
  CORS changes and match the eventual same-origin deployment shape. A `VITE_`
  environment variable handles separate origins later.
- **Fast Refresh constrains module exports.** A module must export either
  components or non-components for reliable hot replacement. Splitting the auth
  provider from its hook is a structural fix, not a lint workaround.
- **Test the browser state transitions, not only HTTP.** Browser automation
  verified guard redirect → login return, greeting identity, token cleanup,
  duplicate/invalid login behavior, backend-down retry, and console hygiene —
  while every write stayed in `taskflow_test`.

### 9.25 Workspace & project CRUD UI learnings (Phase 11.4)

A CRUD page is mostly state coordination, failure handling, and data honesty —
not just wiring buttons to endpoints.

- **Services keep pages readable.** `services/workspaces.js` and
  `services/projects.js` own URL construction; the page deals in workspaces,
  projects, and UI state.
- **Related loads need ordering and cancellation.** Workspaces determine which
  projects to fetch. Effect cleanup prevents an old workspace's slower response
  from replacing the current list.
- **Selection needs a rule.** Reusing a still-valid id preserves the user's
  context; falling back to the newest item gives a deterministic first load.
- **Disabled is visual; refs are synchronous.** A `useRef` lock closes the
  double-click gap before React re-renders the disabled button. Both are
  needed for different reasons.
- **Destructive UI must explain the database rule.** The schema cascades
  deletes; the confirmation says so. Failure leaves the confirmation open and
  the data untouched.
- **Show only model-backed data.** It is better to show fewer real fields than
  to make a page look complete with invented status, progress, or dates.
- **Failure paths deserve first-class tests.** The harness simulated workspace
  load failure, verified retry, forced a project-delete failure, and asserted
  that only one DELETE request was sent despite a double click.
- **Test injection should be deterministic.** Edge DevTools Fetch interception
  did not pause the app's XHRs reliably in this environment; a temporary
  test-only Express wrapper around the exported app provided predictable 500s
  and request counting without changing application code.
- **Isolate writes and clean up by identity.** Every check ran against
  `taskflow_test`; the temporary user, workspaces, projects, and task were
  removed by exact id, and `taskflow_dev` counts were unchanged.

### 9.26 Task CRUD & Kanban persistence learnings (Phase 11.5)

A persistent Kanban board is mostly a state-ownership and data-mapping problem;
the buttons are the easy part.

- **A column is a view, not a second data source.** Tasks stay in one flat array
  from the API. `buildBoardColumns` derives the three lanes, so counts and card
  membership cannot drift from the task list.
- **One mapping prevents drift.** The column↔status map is reused for grouping
  and for the PATCH payload. A move is validated before any request is sent.
- **Server confirmation is an honesty guarantee.** An optimistic move can show a
  status the database rejected. Waiting for the response, while showing a
  pending state, keeps the board truthful and makes failure handling simple.
- **Refs close gaps that disabled buttons cannot.** React state updates
  asynchronously, so a rapid double click can enter a handler twice. A
  synchronous `useRef` lock rejects the second request; state still drives the
  visual pending state.
- **URL state is useful for a selected board.** Workspace and project ids survive
  reload and make the selection linkable, and effects can ignore stale responses
  with cleanup flags. A latest-project ref also prevents a late create from
  being inserted into a different project.
- **UI should not invent fields to look complete.** The task model has no tags,
  estimates, or ordering field. Removing those mock elements was more honest than
  persisting fake data, and it keeps the card tied to the API contract.
- **Persistence needs reload tests.** A response alone proves little. The harness
  checked create, status, edit, and delete after reload, then verified no rows
  remained and development counts were unchanged.

### 9.27 Dashboard, profile & demo data learnings (Phase 11.6)

Phase 11.6 was mostly about keeping derived data honest and keeping writes away
from real development data.

- **A Dashboard can be a read model, not a new backend feature.** The existing
  workspaces/projects/tasks endpoints already provide the facts; pure functions
  join and sort them into stats and recent items. This kept the API surface and
  schema unchanged, with request fan-out documented as the trade-off.
- **Derived progress must come from real states.** Project progress is
  `done / total` from the project's tasks. It is not stored in the schema, so it
  cannot drift from the Kanban board, and an empty project honestly shows 0%.
- **Sensitive changes deserve re-authentication.** Requiring the current password
  for email/password changes limits the damage of a stolen token. Returning a
  validation error instead of `401` avoids clearing a still-valid session just
  because the confirmation password was mistyped.
- **Stateless auth needs an explicit revocation plan.** JWTs remain valid after a
  password change until expiry. A future `tokenVersion` check in `requireAuth`
  would invalidate old tokens without changing the login flow.
- **Seed scripts need multiple safety layers.** A separate database URL,
  allow-list of database names, production/dev refusals, `--confirm`, and a
  runtime `current_database()` check each block a different mistake. Idempotence
  makes reruns safe.
- **Client-side joins are testable through the browser.** The isolated harness
  verified the rendered text and interactions, not just API responses, while the
  server-side tests proved the profile/password contract. Exact-ID cleanup kept
  `taskflow_test` clean.

### 9.28 Calendar MVP learnings (Phase 11.6.5)

Phase 11.6.5 added a read-only month Calendar over one new owner-scoped API
without touching the schema.

- **Range endpoints need hard caps.** A `GET /api/tasks?from&to` endpoint could
  scan an unbounded window, so the date-only validation returns a validation
  error when the inclusive range would exceed 42 days (exactly one 6-week grid).
  `gte/lt` semantics were replaced by inclusive `gte/lte` plus the client-side
  42-cell grid, so the filtered window and the rendered grid always agree.
- **`gt: undefined` silently widens a Prisma filter.** When the route passed the
  wrong property names into `dueDate: { gte: range.from, lte: range.to }`, both
  turned out `undefined` and Prisma ignored the filter — the endpoint returned
  every owner task. The integration test caught it immediately, which is exactly
  why the endpoint tests recreate realistic fixtures (dated, undated, foreign
  owner) instead of trusting one happy path.
- **One request can carry its own summary.** `meta.undatedCount` lets the page
  report "N tasks without due dates" without a second endpoint; the server
  acknowledges undated work exists while the grid only renders dated tasks.
- **URL state makes views reload-safe and linkable.** `?month=YYYY-MM&date=
  YYYY-MM-DD` replaces local-only selection state: refresh or shared links land
  on the exact month/day view, mirroring the pattern used for the task board.
- **Read-only is provable, not assumed.** The browser harness recorded every
  `/api` request the page issued and failed if any method other than `GET`
  appeared — turning the "must not mutate tasks" requirement into a test.
- **Accessibility states need text, not only color.** Overdue tasks get a red
  chip *and* an `aria-label` ("Overdue: …") plus a visible "Overdue" badge; done
  tasks get line-through plus a "Completed" badge and label. A color-only rule
  would fail screen readers and color-blind users.
- **Edge-CDP browser checks beat DOM-only tests for stateful UI.** Seed the
  token via `localStorage`, drive real clicks, and assert rendered text/URL —
  then add emulation (`setDeviceMetricsOverride`) for the 375px overflow check
  and read `document.activeElement` for keyboard reachability. All writes stayed
  in `taskflow_test` and exact-ID cleanup left the database empty.

---

*Status: §7 and §9 filled 2026-08-02; backend, Phase 10, Phase 11.1, Phase 11.2,
Phase 11.3, Phase 11.4, Phase 11.5, Phase 11.6, and Phase 11.6.5 notes added
through 2026-10-23. Other sections are filled continuously during development.*
