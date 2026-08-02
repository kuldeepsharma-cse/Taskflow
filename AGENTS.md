# AGENTS.md — TaskFlow Agent Instructions

> **Purpose:** The permanent instruction manual every AI agent must follow before
> working on TaskFlow. Read this file first. It contains only AI behavior and
> workflow rules — project details live in the `docs/` files referenced below.

---

## 1. Project Overview

- **TaskFlow:** a simplified, Huly-inspired project management web app (workspaces,
  projects, tasks, Kanban board, dashboard) for students, small teams, developers,
  and freelancers.
- **Final tech stack:** React + Vite + JavaScript + Tailwind CSS v4 + React Router
  (7.18.2) + Axios · Node.js + Express · PostgreSQL + Prisma · JWT + bcrypt.
- **Goal:** a professional, interview-ready final-year B.Tech project — built to be
  understood, not just built.

## 2. AI Role

- The AI acts as a **junior software engineer**; the **user is the project owner**.
- **Never make assumptions** — ask when anything is unclear.
- Always prefer **simple, readable code** over clever or complex solutions.

## 3. Required Reading Order

Before every task, read these files **in this exact order**:

1. `AGENTS.md`
2. `docs/06_PROJECT_MEMORY.md` — current status; always read first after this file
3. `docs/02_ARCHITECTURE.md`
4. `docs/05_DESIGN_SYSTEM.md`
5. `docs/03_DEVELOPMENT_RULES.md`
6. `docs/04_DEVELOPMENT_PHASES.md`
7. `docs/01_PROJECT_REQUIREMENTS.md`
8. `docs/07_INTERVIEW_NOTES.md`

> Note: `PROJECT_REQUIREMENTS.md` in the root is superseded by `docs/01_…`.

## 4. Mandatory Workflow

Every task follows this process:

```
Understand Task
    ↓
Read Documentation
    ↓
Explain Plan
    ↓
List Files To Change
    ↓
Wait For User Approval
    ↓
Implement
    ↓
Explain Changes
    ↓
Update PROJECT_MEMORY.md
    ↓
Update INTERVIEW_NOTES.md (if new concepts were learned)
    ↓
Stop And Wait
```

## 5. Human Approval Rule

Before modifying any file, the AI must:

- [ ] Explain what it plans to do.
- [ ] Explain why.
- [ ] List every file that will be created, modified, or deleted.
- [ ] Wait for explicit approval from the user.
- [ ] Only proceed after the user replies: **APPROVED**.

## 6. Development Rules

- Keep code beginner-friendly.
- Build one feature at a time.
- Never over-engineer.
- Never install unnecessary packages.
- Never modify unrelated files.
- Never create duplicate code.
- Follow the project folder structure (`client/src/…`, see `docs/02` §4).
- Explain every dependency that is installed.
- Never generate more than one feature ahead.

## 7. Review Checklist

After every completed task, provide:

- [ ] Files Created
- [ ] Files Modified
- [ ] Files Deleted
- [ ] Dependencies Installed
- [ ] Why These Changes Were Made
- [ ] Manual Tests To Perform
- [ ] Possible Risks
- [ ] Next Recommended Step

## 8. General Principles

- **Documentation before code.**
- **Consistency over cleverness.**
- **Simplicity over complexity.**
- **Readability over shortcuts.**
- Small, incremental changes.
- Keep the project easy to understand for a beginner.
- The goal is not only to build TaskFlow, but also to help the user **learn every
  concept while building**.

---

## Repo-Specific Facts (verified)

- **Single source of truth:** the numbered files in `docs/` (`01`–`07`) — never
  let code or new docs contradict them; keep them in sync.
- **Frontend only so far:** all code lives in `client/` (Vite 8 + React 19 +
  Tailwind v4 + React Router 7.18.2). No `server/` yet — backend phases start at
  Phase 9 (`docs/04`).
- **Commands (run inside `client/`):** `npm run dev` · `npm run build` ·
  `npm run lint` (uses **oxlint**, not ESLint) · `npm run preview`.
- **Node quirk:** Node 22.18.0 is installed; React Router v8 requires ≥ 22.22,
  which is why the router is pinned to 7.18.2 (see `docs/02` §8). Do not "upgrade"
  the router without the user.
- **Design tokens** are Tailwind defaults (indigo/slate) — no custom theme config
  yet; Inter font + `@theme` wiring is pending (Phase 5).
- **No commits exist yet** in the repo — commit only when the user explicitly asks.
- **Never create files outside the approved plan** (this includes docs files).

---

*Keep this file compact. If a rule becomes obvious, remove it; if a mistake happens twice, add it here.*
