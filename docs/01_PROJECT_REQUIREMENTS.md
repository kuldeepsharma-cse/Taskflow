# 01 — Project Requirements

> **Purpose:** The single source of truth for **what** TaskFlow is and does.
> This document defines the vision, scope, features, and requirements (v1.0 MVP).
> It supersedes the initial `PROJECT_REQUIREMENTS.md` in the project root.

## Table of Contents

1. [Project Vision](#1-project-vision)
2. [Problem Statement](#2-problem-statement)
3. [Solution](#3-solution)
4. [Project Goals](#4-project-goals)
5. [Target Users](#5-target-users)
6. [MVP Features (v1.0)](#6-mvp-features-v10)
7. [Future Features (v2.0)](#7-future-features-v20)
8. [Functional Requirements](#8-functional-requirements)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Project Scope](#10-project-scope)
11. [Out of Scope (v1.0)](#11-out-of-scope-v10)
12. [Success Criteria](#12-success-criteria)

---

## 1. Project Vision

- TODO: One-paragraph vision statement.

## 2. Problem Statement

- TODO: Define the problem TaskFlow solves and for whom.

## 3. Solution

- TODO: High-level description of the product and its value proposition.

## 4. Project Goals

- TODO: List of measurable goals for v1.0.

## 5. Target Users

- TODO: Define target user groups and their needs.

## 6. MVP Features (v1.0)

- TODO: List every feature shipped in v1.0 (auth, workspaces, projects, tasks, kanban, dashboard, profile).

### 6.1 Approved Calendar Extension (Phase 11.6.5)

- **Status:** Approved 2026-10-23 and implemented/verified 2026-10-23 as a
  separate milestone before Phase 11.7.
- **Purpose:** Provide a read-only month view of tasks with due dates.
- **Scope:** All workspaces owned by the signed-in user, using the existing
  `Task.dueDate` field.
- **Data:** One authenticated, owner-scoped date-range endpoint
  (`GET /api/tasks?from=YYYY-MM-DD&to=YYYY-MM-DD`); no schema change.
- **Boundary:** Read-only. No task creation, editing, deletion, status movement,
  drag-and-drop, reminders, recurrence, or calendar integration.
- **Detailed requirements and acceptance criteria:** §8.8.

## 7. Future Features (v2.0)

- TODO: Features deferred to v2.0. Cross-reference: [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) must stay compatible with these.

## 8. Functional Requirements

- TODO: Numbered functional requirements (FR-xx) with acceptance criteria.

### 8.8 Calendar (Phase 11.6.5, approved and verified 2026-10-23)

**Goal:** Show the signed-in user's tasks with due dates in a read-only month
calendar while preserving the existing task, workspace, and project ownership
rules.

**Functional requirements**

- FR-27: `/dashboard/calendar` must remain inside the protected dashboard layout
  and keep its existing sidebar link active.
- FR-28: The page must show a month grid with seven columns and 42 cells,
  Monday-start weeks, a month/year heading, and Previous, Next, and Today
  controls.
- FR-29: The selected month and optional selected date must be represented in
  the URL (`?month=YYYY-MM&date=YYYY-MM-DD`) so reload and browser history
  preserve the view.
- FR-30: Each task whose `dueDate` falls in the visible six-week range must
  appear exactly once in the matching day cell. Tasks without a `dueDate` or
  outside that range must not appear in the grid.
- FR-31: Day cells must show task summaries and indicate overflow; selecting a
  day must show the full list of tasks due that day with project and workspace
  context.
- FR-32: Non-`DONE` tasks with a due date before today must be marked overdue;
  `DONE` tasks must use a muted treatment. Status and overdue state must not rely
  on color alone.
- FR-33: Tasks without due dates must be summarized separately and must never be
  assigned to a calendar day.
- FR-34: The page must provide loading, error with retry, and empty states.
- FR-35: The page must be read-only. It must not create, update, delete, move, or
  drag tasks, and must not issue mutation requests.
- FR-36: The page must be keyboard usable, have visible focus states, and avoid
  page-level horizontal overflow at a 375px-wide viewport.
- FR-37: Data must come from an authenticated, owner-scoped
  `GET /api/tasks?from=YYYY-MM-DD&to=YYYY-MM-DD` endpoint. Both parameters are
  required date-only values; `from` must not be after `to`; the inclusive range
  must not exceed 42 calendar days. The response must exclude tasks without due
  dates from `data`, include project and workspace context, and return an
  owner-scoped `meta.undatedCount` for the undated summary. Invalid input must
  return the existing validation-error format.
- FR-38: Calendar data must be ordered by `dueDate` and then task ID for
  deterministic rendering and tests.

**Acceptance criteria**

- [x] The Calendar route is protected, the sidebar item is active, and the page
      has a clear "Calendar" heading and read-only description.
- [x] The grid always renders 42 cells with Monday as the first weekday, including
      muted adjacent-month days.
- [x] Previous, Next, and Today update the month, URL, and displayed tasks
      correctly across month and year boundaries.
- [x] Tasks with due dates in the visible range appear once in the correct cell;
      tasks without due dates or outside the range do not appear in cells.
- [x] Selecting a day shows its full task list or an explicit "no tasks" message;
      empty days remain selectable.
- [x] Overdue, completed, and normal tasks are distinguishable by text or accessible
      labels as well as styling.
- [x] The undated-task summary count matches `meta.undatedCount` for the signed-in
      user.
- [x] Loading, API failure with retry, and empty-calendar states are implemented.
- [x] The Calendar makes no task or project mutation requests.
- [x] The API enforces authentication, ownership, date validation, the 42-day
      maximum range, null-date exclusion from `data`, `meta.undatedCount`,
      context, and deterministic ordering.
- [x] Server tests, client helper tests, lint, and production build pass.
- [x] No Prisma schema change, migration, dependency, or Calendar runtime
      database write is added by this milestone.
- [x] The layout remains usable at 375px without horizontal page overflow and all
      interactive controls are keyboard reachable.

*Verified 2026-10-23 by backend `npm test` 29/29, client helper tests 4/4,
lint/build, and an isolated 18-check Edge/CDP harness against `taskflow_test`
(render, chips, treatments, navigation, Today, 375px/focus/muted-day checks,
GET-only network audit, backend-down retry, exact cleanup).*

**Out of scope**

- Week/day views, a separate agenda-only view, filters, search, and multiple
  calendar layouts.
- Creating, editing, deleting, completing, or rescheduling tasks.
- Drag-and-drop, reminders, notifications, recurrence, calendar sync, and
  multi-user sharing.
- New task fields, schema changes, migrations, or a `dueDate` index.

## 9. Non-Functional Requirements

- TODO: Performance, security, usability, reliability, maintainability, scalability requirements.

## 10. Project Scope

- TODO: Boundaries of v1.0: what is included, and the tech stack. Cross-reference: [02_ARCHITECTURE.md](./02_ARCHITECTURE.md).
- Approved Calendar extension (Phase 11.6.5): read-only month view of the
  signed-in user's tasks with due dates, delivered before Phase 11.7.

## 11. Out of Scope (v1.0)

- TODO: Explicitly excluded features for v1.0.
- Calendar editing, drag-and-drop, reminders, recurrence, calendar sync, filters,
  and any Calendar schema/index change. See §8.8 for the complete boundary.

## 12. Success Criteria

- TODO: How we define a successful v1.0 release.

---

*Status: Draft — overall requirements pending approval. The Calendar extension
(§6.1 and §8.8) was approved and implemented on 2026-10-23 as a separate
milestone before Phase 11.7.*
