# 04 — Development Phases

> **Purpose:** The single source of truth for **the plan** — the ordered list of
> development phases, each with deliverables, acceptance criteria, and status.
> One phase at a time; each phase starts only after the previous one is approved.
> **Roadmap (approved 2026-08-02):** the frontend is fully completed before
> backend development begins.

## Table of Contents

1. [Phase Overview](#1-phase-overview)
2. [Phase 1 — Documentation](#2-phase-1--documentation)
3. [Phase 2 — Architecture](#3-phase-2--architecture)
4. [Phase 3 — Frontend Setup](#4-phase-3--frontend-setup)
5. [Phase 4 — Design System](#5-phase-4--design-system)
6. [Phase 5 — Landing Page](#6-phase-5--landing-page)
7. [Phase 6 — Authentication UI (Login & Register)](#7-phase-6--authentication-ui-login--register)
8. [Phase 7 — Dashboard UI](#8-phase-7--dashboard-ui)
9. [Phase 8 — Kanban Board UI](#9-phase-8--kanban-board-ui)
10. [Phase 9 — Backend Setup](#10-phase-9--backend-setup)
11. [Phase 10 — Database & Prisma](#11-phase-10--database--prisma)
12. [Phase 11 — REST API Integration](#12-phase-11--rest-api-integration)
13. [Phase 12 — Testing & Bug Fixes](#13-phase-12--testing--bug-fixes)
14. [Phase 13 — Deployment](#14-phase-13--deployment)

> NOTE: Phases 5–13 are provisional in detail — each is confirmed with the user
> before it starts. The phase order itself is fixed: UI first, then backend.

---

## 1. Phase Overview

| Phase | Name                          | Status        |
| ----- | ----------------------------- | ------------- |
| 1     | Documentation                 | ✅ Completed  |
| 2     | Architecture                  | ✅ Completed  |
| 3     | Frontend Setup                | ✅ Completed  |
| 4     | Design System                 | ✅ Completed  |
| 5     | Landing Page                  | ✅ Completed  |
| 6     | Authentication UI (Login & Register) | ✅ Completed  |
| 7     | Dashboard UI                  | ✅ Completed  |
| 8     | Kanban Board UI               | ✅ Completed  |
| 9     | Backend Setup                 | ✅ Completed  |
| 10    | Database & Prisma             | ✅ Completed  |
| 11    | REST API Integration          | 🚧 In progress (11.1–11.6.5 ✅; 11.7 pending approval) |
| 12    | Testing & Bug Fixes           | ⏳ Not started |
| 13    | Deployment                    | ⏳ Not started |

## 2. Phase 1 — Documentation

✅ **Completed (2026-08-02)**

- [x] Created `PROJECT_REQUIREMENTS.md` (project root).
- [x] Created the `docs/` suite (`01`–`07`) as the single source of truth.
- [x] Established the development rules and workflow in
      [03_DEVELOPMENT_RULES.md](./03_DEVELOPMENT_RULES.md) §1.

## 3. Phase 2 — Architecture

✅ **Completed (2026-08-02)**

- [x] Finalized and approved the tech stack (see [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §2).
- [x] Documented system design, data model, API design, and auth flow.
- [x] Aligned the tech stack across `PROJECT_REQUIREMENTS.md` and `02_ARCHITECTURE.md`.

## 4. Phase 3 — Frontend Setup

✅ **Completed (2026-08-02)**

- [x] **Initialize React Frontend** — Vite 8 + React 19 + JavaScript +
      Tailwind CSS v4 + React Router 7.18.2 (Axios installed and wired in Phase 11.3).
- [x] Set up `client/` folder and `src/` structure per
      [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §4.
- [x] Verified: `npm run build` ✅, `npm run lint` ✅.
- Deferred: Vite dev proxy to the API → added in Phase 11.3.

## 5. Phase 4 — Design System

✅ **Completed (2026-08-02)**

- [x] Defined full visual identity in [05_DESIGN_SYSTEM.md](./05_DESIGN_SYSTEM.md):
      brand personality, colors, typography, spacing, radius, shadows,
      buttons, inputs, cards, icons, breakpoints.
- [x] Added Logo Guidelines (§16) and Motion & Animation Guidelines (§17).
- [x] All tokens map to Tailwind defaults (indigo/slate scales) — minimal config at build time.
- [ ] Pending: wire tokens into Tailwind `@theme` + load Inter font when UI phases start.

## 6. Phase 5 — Landing Page

- [ ] TODO: Wire design tokens into Tailwind (`@theme`) and load Inter font
      ([05_DESIGN_SYSTEM.md](./05_DESIGN_SYSTEM.md)).
- [ ] TODO: Public landing page — hero, features, CTA — following the design system.
- [ ] TODO: Logo lockup per [05_DESIGN_SYSTEM.md](./05_DESIGN_SYSTEM.md) §16 (final mark designed here).

## 7. Phase 6 — Authentication UI (Login & Register)

- [ ] TODO: Login and register pages with forms + client-side validation.
- [ ] TODO: Frontend route guards (protected vs public routes).

## 8. Phase 7 — Dashboard UI

- [ ] TODO: Dashboard layout (sidebar, header) using mock data.
- [ ] TODO: Workspaces overview, project cards, task statistics, empty states.

## 9. Phase 8 — Kanban Board UI

✅ **Completed (2026-08-07) — see [06_PROJECT_MEMORY.md](./06_PROJECT_MEMORY.md) sessions 27–32**

- [x] Board layout with status columns (To Do / In Progress / Done).
- [x] Task cards + status movement (explicit buttons, mock data) — DnD stays
      a v2.0/deferred candidate (Phase 8.3 decision).
- [x] Phase 8.4 UI/UX polish and Phase 8.5 cleanup, QA & finalization
      (audit green; one safe-no-op guard fixed in `moveTask`).
- NOTE: Frontend is now fully completed here, before any backend work —
      **backend begins at Phase 9.**

## 10. Phase 9 — Backend Setup

✅ **Completed (2026-10-22) — see [06_PROJECT_MEMORY.md](./06_PROJECT_MEMORY.md) sessions 33–34**

- [x] Express server scaffold in `server/` (structure per [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §4) — Phase 9.1:
      `src/server.js` (entry) + `src/routes/health.js`, npm scripts (`dev` / `start`),
      `GET /api/health` verified returning `{"status":"ok"}`.
- [x] Phase 9.2 — environment config (`.env` + `.env.example` + dotenv), CORS restricted
      to `CLIENT_ORIGIN`, JSON 404 + central error handler in `middleware/`; verified
      with real HTTP responses (health, CORS allowed/denied, preflight, 404, 500,
      env loading + fallback, `npm start` / `npm run dev`).

## 11. Phase 10 — Database & Prisma

✅ **Completed (2026-10-22) — see [06_PROJECT_MEMORY.md](./06_PROJECT_MEMORY.md) session 35**

- [x] PostgreSQL database `taskflow_dev` + application role; `DATABASE_URL` stored
      only in gitignored `server/.env`, with a placeholder in `.env.example`.
- [x] Prisma 7.10.1 + `@prisma/adapter-pg` + `pg`; `prisma.config.js` supplies the
      CLI datasource URL.
- [x] `server/prisma/schema.prisma`: `User`, `Workspace`, `Project`, `Task`;
      `TaskStatus` / `TaskPriority` enums; foreign keys, delete rules, and indexes.
- [x] Initial migration `20261022145549_init` created with `--create-only`,
      reviewed, then applied; `prisma migrate status` reports the schema is up to date.
- [x] Shared client `server/src/db/prisma.js`; read-only connection check
      `server/src/db/check.js`; `/api/health` remains independent of the database.
- [x] Verified applied migration history, tables, columns, enums, indexes, foreign
      keys, empty row counts, `npm run db:check`, health with an invalid
      `DATABASE_URL`, client lint, and client build.

## 12. Phase 11 — REST API Integration

🚧 **In progress — Phase 11.1 through 11.6.5 complete (2026-10-23).**
Next: Phase 11.7, which still requires separate scope approval.

### Phase 11.1 — Backend auth foundation

- [x] Installed `bcrypt` + `jsonwebtoken`; `npm audit` reports 0 vulnerabilities.
- [x] Added local `JWT_SECRET` (never displayed/committed) and
      `JWT_EXPIRES_IN=7d`; documented both in `.env.example`; `.env` stays ignored.
- [x] Created `src/utils/` (AppError, validation, bcrypt wrapper, JWT wrapper,
      safe user select), `src/middleware/requireAuth.js`, `src/routes/auth.js`,
      and `src/routes/me.js`.
- [x] `POST /api/auth/register` (201), `POST /api/auth/login` (200), and
      `GET /api/me` (Bearer token) implemented; passwords are bcrypt-hashed and
      never returned.
- [x] Lazy `getPrisma()` in `src/db/prisma.js`; `/api/health` remains
      database-independent, verified with an invalid `DATABASE_URL`.
- [x] Central errors now support field details, invalid JSON, duplicate email
      (`409 EMAIL_IN_USE`), and generic safe 5xx responses.
- [x] Verified syntax/imports, `npm run db:check`, 15 HTTP auth/error checks, a
      short-secret 500 path, one temporary test user created and deleted
      (database row counts remain zero), client lint, and client build.

### Phase 11.2 — Workspace, project & task CRUD

- [x] Added owner-scoped CRUD routes for workspaces, projects, and tasks, plus
      nested project/task list/create routes.
- [x] Ownership comes from the JWT; missing/foreign resources return `404`;
      parent IDs come only from URLs; assignees are limited to the workspace owner.
- [x] Validation covers name/title/description limits, status/priority enums,
      positive assignee IDs, and date-only `dueDate` values stored at UTC
      midnight and returned as `YYYY-MM-DD`.
- [x] Split `src/app.js` (exported app) from `src/server.js` (listener) so tests
      can use an ephemeral port.
- [x] Added `TEST_DATABASE_URL` documentation and created isolated
      `taskflow_test`; applied the committed migration once, without changing
      the schema or creating a new migration.
- [x] Added `server/tests/crud.test.js` using Node's built-in test runner and
      `fetch`: fail-closed test-DB guard, two-user ownership matrix, validation,
      dueDate behavior, cascade checks, and exact-ID cleanup.
- [x] Verified `npm test` (9 tests passing), zero application rows in both
      `taskflow_test` and `taskflow_dev` afterward, health/CORS regression,
      server `npm audit` (0 vulnerabilities), client lint, and client build.

### Phase 11.3 — Client API & authentication wiring

- [x] Installed `axios@^1.20.0` (27 packages added); no unrelated upgrades and
      no `npm audit fix` (client audit stays at 3 known high advisories).
- [x] Added `client/src/services/api.js` — one Axios instance (`/api` or
      `VITE_API_URL`, 10s timeout), Bearer request interceptor, normalized errors.
- [x] Added `client/src/services/auth.js` for register, login, and `/api/me`.
- [x] Added `AuthProvider` + `useAuth`, token storage helpers, safe return-path
      validation, and session states (`checking`, `authenticated`,
      `unauthenticated`, `error`); startup `/api/me` restores or clears the
      session, and network/5xx failures offer retry.
- [x] Replaced the mock `isAuthenticated` flag with real JWT auth; only
      `taskflow_token` is stored, and the legacy flag is removed.
- [x] Wired Login/Register to the API with pending states, server field-error
      mapping, and form-level error alerts; passwords are never sent twice.
- [x] Updated both route guards to wait for the session check and preserve the
      intended protected path; added the accessible session loading/retry screen.
- [x] Added real authenticated name, initials, logout, and dashboard greeting;
      mock dashboard/Kanban content is otherwise unchanged.
- [x] Added the Vite `/api` dev proxy to `http://localhost:3000`; backend,
      schema, migrations, and CORS behavior are unchanged.
- [x] Verified: client lint/build; backend `npm test` (9 tests); 12 HTTP/proxy
      checks against `taskflow_test`; 17-check browser auth flow; 10 targeted
      browser checks for protected-route return, greeting, initials, logout, and
      cleanup. Temporary test data was removed.
- [x] Documented the client auth architecture, session flow, and local-only
      verification harnesses; no commits or unrelated files changed.

### Phase 11.4 — Workspace & project CRUD UI

- [x] Added `client/src/services/workspaces.js` and `projects.js` for list/create/
      update/delete calls through the existing Axios instance.
- [x] Rebuilt `ProjectsPage.jsx` with workspace selection, project loading,
      explicit loading/error/retry states, and page-local state only.
- [x] Added `WorkspaceSidebar.jsx`, `ProjectForm.jsx`, `ProjectListItem.jsx`, and
      `Textarea.jsx`; reused `Input`, `EmptyState`, and `FormAlert`.
- [x] Added inline create/rename/delete flows with explicit cascade warnings.
      Failed deletes keep the confirmation open; synchronous `useRef` locks
      prevent duplicate requests.
- [x] Mirrored server limits in client validation (name 1–100, description
      ≤2,000), mapped API field details to inputs, and sent empty descriptions
      as `null`.
- [x] Displayed only real API fields; the Dashboard's mock `ProjectCard` and the
      Kanban data were left unchanged. No modal library or new dependency.
- [x] Verified client lint/build; backend `npm test` (9 tests); an isolated
      14-check browser/API harness against `taskflow_test` (empty state, CRUD,
      limits, reload, load failure/retry, delete failure/duplicate guard,
      cascade, cleanup, no browser exceptions); `taskflow_dev` counts unchanged.

### Phase 11.5 — Task CRUD UI & Kanban persistence

- [x] Added `client/src/services/tasks.js` for list/create/update/delete through
      the existing Axios instance, plus `TaskForm`, `Select`, and shared
      `LoadingPanel`/`ErrorPanel` components.
- [x] Rebuilt `TasksPage.jsx` with URL-backed workspace/project selection
      (`?workspaceId=…&projectId=…`), dependent loads, stale-response guards,
      explicit loading/empty/error/retry states, and `New Task` gating.
- [x] Wired real task create (starts in `TODO`), edit, and inline-confirm delete.
      The form covers title, description, priority, due date, and
      Unassigned/current-user assignee; client validation mirrors the server and
      maps API field details back to inputs.
- [x] Status changes use the existing board buttons and are server-confirmed via
      `PATCH /api/tasks/:taskId`: the card shows a pending indicator, a
      synchronous `useRef` lock blocks duplicates, and a failed request keeps
      the old column and displays an error.
- [x] Centralized column-to-status mapping and task grouping in
      `utils/kanban.js`; the flat API list is grouped into To Do / In Progress /
      Done in the API's oldest-first order. Drag-and-drop and custom ordering
      were not added.
- [x] Cards now render only model-backed data (title, priority, due date,
      assignee, derived `TF-{id}`); unsupported mock tags/estimates were removed.
- [x] Verified client lint/build; backend `npm test` (9 tests); an isolated
      14-check browser/API harness against `taskflow_test` (database target,
      board load, create validation, create/reload, status/reload,
      edit/reload, delete/reload, no leftover rows, exact-ID cleanup);
      `taskflow_dev` counts unchanged; `git diff --check` clean.
- [x] No dependencies, backend, schema, or migration changes.

### Phase 11.6 — API-backed Dashboard, Settings & demo seed

- [x] Added `PATCH /api/me` (name/email with conditional `currentPassword`) and
      `PATCH /api/me/password` (required current password); normalized emails,
      safe user responses, `409 EMAIL_IN_USE`, and field-level validation errors.
- [x] Added `ProfileForm` and `PasswordForm`, plus auth service/context methods.
      The email form reveals the current-password field only when the email
      changes; a successful password change logs out and redirects to `/login`.
- [x] Replaced Dashboard mocks with client-side aggregation over the existing
      workspace/project/task APIs in `utils/dashboard.js`: real counts, completion,
      newest projects with derived progress, Recent Tasks, and loading/error/
      retry/empty states. The mock Recent Activity feed and fake card fields were
      removed.
- [x] Added `server/tests/profile.test.js` covering name updates, email
      re-authentication/duplicates, password validation/change, old/new login,
      existing-token validity, safe responses, and exact-ID cleanup.
- [x] Added guarded, idempotent `server/src/db/seed-demo.js`, `DEMO_*` env
      placeholders, and the `db:seed:demo` script. It refuses production,
      `taskflow_dev`, the development URL, unsafe database names, and missing
      `--confirm`; `taskflow_demo` was not created or seeded.
- [x] Verified: backend `npm test` 17/17; client lint/build; isolated UI harness
      against `taskflow_test` (dashboard stats/cards/recent tasks, profile update,
      conditional email field, password logout, old/new login); seed guard and
      seed run on `taskflow_test` (2 workspaces / 4 projects / 16 tasks, cleaned);
      no leftover rows; `taskflow_dev` untouched; no commits.
- [x] No dependencies, schema, or migration changes.

### Phase 11.6.5 — Calendar (read-only) — approved 2026-10-23

✅ **Completed and verified (2026-10-23).** A separate milestone between Phase 11.6
and Phase 11.7; Phase 11.7 remains unstarted and requires its own scope and
approval. Requirements and full acceptance criteria:
[01_PROJECT_REQUIREMENTS.md](./01_PROJECT_REQUIREMENTS.md) §6.1 and §8.8.

**Implemented:** owner-scoped `GET /api/tasks?from=YYYY-MM-DD&to=YYYY-MM-DD`
(inclusive range ≤ 42 days, deterministic ascending-`dueDate` ordering, project +
workspace context, `meta.undatedCount`), client date helpers in
`utils/calendar.js`, `listTasksInRange` service, and a read-only Calendar page at
`/dashboard/calendar` with URL-backed `?month=YYYY-MM&date=YYYY-MM-DD` state,
Monday-first 42-cell grid, month navigation, Today, selected-day task list,
loading/error/retry/empty states, and an undated-task summary line. No schema,
migration, dependency, or project-file changes beyond the listed ones.

**Implementation gates**

- [x] Scope and acceptance criteria documented in
      [01_PROJECT_REQUIREMENTS.md](./01_PROJECT_REQUIREMENTS.md) §6.1 and §8.8.
- [x] Added the date-range API with authentication, ownership, date-only validation,
      a 42-day maximum range, deterministic ordering, and project/workspace
      context (`routes/tasks.js` `GET /`, `utils/validation.js`
      `validateCalendarRangeInput`, `utils/selects.js` `calendarTaskSelect`).
- [x] Added date helpers and the read-only Calendar UI with URL-backed month/date
      state, loading/error/retry/empty states, and 375px/keyboard support
      (`utils/calendar.js`, `services/tasks.js` `listTasksInRange`,
      `pages/CalendarPage.jsx`).
- [x] Added focused server/API and client helper tests, and ran an isolated browser
      harness against `taskflow_test`: server `npm test` 29/29 (including
      `tests/calendar.test.js` with ownership isolation, validation/boundary
      cases, and exact-ID cleanup), client `npm test` 4/4, client lint + build
      green, and an 18-check isolated Edge/CDP harness (render with cell task
      chips, selection, empty day, overdue + completed treatments, month
      navigation, Today, muted adjacent-month days, keyboard focus, 375px
      overflow check, all-`GET` network audit, backend-down error + Retry
      recovery; temporary harness and profile removed; `taskflow_test`
      globally zero rows afterward). During verification the approved
      FR-30/FR-31 cell summaries with "+N more" overflow, FR-32 overdue/
      completed treatments, and muted adjacent-month days were added to the
      grid.
- [x] Proved the Calendar issues no mutation requests (network audit shows only
      `GET` /api calls) and the milestone made no schema, migration, dependency,
      or runtime-database write.
- [x] Documented the Calendar API contract and data flow in
      `docs/02_ARCHITECTURE.md` §6.7 (decision #14) before writing endpoint code.
- [x] Updated `docs/06_PROJECT_MEMORY.md` and `docs/07_INTERVIEW_NOTES.md` after
      implementation and verification.
- [x] No commits or pushes made.

**Deferred polish (flagged for Phase 12, not a defect):** a URL `date` from a
different month stays selected while navigating months (day header shows that
date with the empty-state line until a cell is clicked); undated tasks appear
only in the summary count per the approved scope.

## 13. Phase 12 — Testing & Bug Fixes

- [ ] TODO: Manual test pass against [01_PROJECT_REQUIREMENTS.md](./01_PROJECT_REQUIREMENTS.md) §12 (success criteria).
- [ ] TODO: Edge cases, validation, error states; `npm run lint` + `npm run build` green.

## 14. Phase 13 — Deployment

- [ ] TODO: Prepare for deployment (env vars, production build, hosting choice).
- [ ] TODO: Deploy frontend + backend + database; final demo walkthrough recorded in
      [07_INTERVIEW_NOTES.md](./07_INTERVIEW_NOTES.md).

---

*Status: Phases 1–10 completed (Phase 8 on 2026-08-07; Phases 9–10 on 2026-10-22).
Phase 11.1 backend auth foundation, Phase 11.2 CRUD APIs, Phase 11.3 client
auth/API integration, Phase 11.4 workspace/project CRUD UI, Phase 11.5 task CRUD
UI/Kanban persistence, Phase 11.6 API-backed Dashboard/Settings/demo seed, and
Phase 11.6.5 read-only Calendar completed/verified 2026-10-23. Roadmap approved:
UI phases 5–8 done first, then backend phases 9–11, then testing (12) and
deployment (13). Next: Phase 11.7 still awaits separate scope approval.
`taskflow_demo` remains uncreated/unseeded.*
