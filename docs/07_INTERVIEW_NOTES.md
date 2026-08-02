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

- TODO: Likely questions and short model answers (one-line answers, not essays).

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

*Status: §9 filled 2026-08-02. Other sections are filled continuously during development.*
