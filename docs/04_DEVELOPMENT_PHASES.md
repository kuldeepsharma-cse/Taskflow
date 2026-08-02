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
| 5     | Landing Page                  | ⏳ Not started |
| 6     | Authentication UI (Login & Register) | ⏳ Not started |
| 7     | Dashboard UI                  | ⏳ Not started |
| 8     | Kanban Board UI               | ⏳ Not started |
| 9     | Backend Setup                 | ⏳ Not started |
| 10    | Database & Prisma             | ⏳ Not started |
| 11    | REST API Integration          | ⏳ Not started |
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
      Tailwind CSS v4 + React Router 7.18.2 + Axios (installed).
- [x] Set up `client/` folder and `src/` structure per
      [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §4.
- [x] Verified: `npm run build` ✅, `npm run lint` ✅.
- Deferred: Vite dev proxy to the API → added during REST API Integration (Phase 11).

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

- [ ] TODO: Board layout with status columns (To Do / In Progress / Done).
- [ ] TODO: Task cards + status movement (drag-and-drop or buttons) — mock data.
- [ ] NOTE: Frontend is fully completed here, before any backend work begins.

## 10. Phase 9 — Backend Setup

- [ ] TODO: Express server scaffold in `server/` (structure per [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §4).
- [ ] TODO: Environment config (.env), CORS, error handling, folder structure.

## 11. Phase 10 — Database & Prisma

- [ ] TODO: PostgreSQL database setup + Prisma schema + migrations
      (see [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §5).

## 12. Phase 11 — REST API Integration

- [ ] TODO: Auth endpoints (JWT + bcrypt) and CRUD for workspaces, projects, tasks
      (see [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §6–§7).
- [ ] TODO: Vite dev proxy in `client/` to the API.
- [ ] TODO: Wire the frontend to the API via Axios (replace mock data).

## 13. Phase 12 — Testing & Bug Fixes

- [ ] TODO: Manual test pass against [01_PROJECT_REQUIREMENTS.md](./01_PROJECT_REQUIREMENTS.md) §12 (success criteria).
- [ ] TODO: Edge cases, validation, error states; `npm run lint` + `npm run build` green.

## 14. Phase 13 — Deployment

- [ ] TODO: Prepare for deployment (env vars, production build, hosting choice).
- [ ] TODO: Deploy frontend + backend + database; final demo walkthrough recorded in
      [07_INTERVIEW_NOTES.md](./07_INTERVIEW_NOTES.md).

---

*Status: Phases 1–4 completed (2026-08-02). Roadmap approved: UI phases 5–8 first,
then backend phases 9–11, then testing (12) and deployment (13). Next: Phase 5 — Landing Page.*
