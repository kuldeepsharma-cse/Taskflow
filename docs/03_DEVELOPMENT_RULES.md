# 03 — Development Rules

> **Purpose:** The single source of truth for **how we work** on TaskFlow.
> Coding conventions, Git workflow, commit style, quality gates, and the
> AI-assistant working agreement (phase-by-phase development, no unrequested features).

## Table of Contents

1. [Working Agreement](#1-working-agreement)
2. [Coding Conventions](#2-coding-conventions)
3. [Project Structure Rules](#3-project-structure-rules)
4. [Git Workflow](#4-git-workflow)
5. [Commit Message Style](#5-commit-message-style)
6. [Quality Gates](#6-quality-gates)
7. [Testing Rules](#7-testing-rules)
8. [Documentation Rules](#8-documentation-rules)
9. [Do / Don't List](#9-do--dont-list)

---

## 1. Working Agreement

### Permanent Rule

> ### 🔒 Nothing gets coded until it is documented and approved.

Every feature follows this exact workflow:

```
Document → Generate → Review → Test → Update PROJECT_MEMORY.md → Update INTERVIEW_NOTES.md → Commit
```

1. **Document** — write the plan/design in the relevant docs file (`docs/01`–`07`).
2. **Generate** — only after the user approves the documentation.
3. **Review** — self-review the code before showing it.
4. **Test** — verify the feature works (manual/automated, per §6).
5. **Update PROJECT_MEMORY.md** — record what was done, decisions, approvals.
6. **Update INTERVIEW_NOTES.md** — capture what is worth talking about in interviews.
7. **Commit** — commit only after all previous steps pass.

### Other Rules

- Phase-by-phase development; wait for user approval before moving to the next phase
  (see [04_DEVELOPMENT_PHASES.md](./04_DEVELOPMENT_PHASES.md)).
- No features beyond the approved scope (see [01_PROJECT_REQUIREMENTS.md](./01_PROJECT_REQUIREMENTS.md)).
- All decisions are recorded in [06_PROJECT_MEMORY.md](./06_PROJECT_MEMORY.md).
- The docs are the single source of truth — code must match the docs, and docs
  must never contradict each other (e.g., the tech stack in
  [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) matches PROJECT_REQUIREMENTS.md).

## 2. Coding Conventions

- TODO: Language/formatting rules (naming, indentation, linting) for frontend and backend.

## 3. Project Structure Rules

- TODO: Where files live, what belongs in which folder. Cross-reference: [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) §4.

## 4. Git Workflow

- TODO: Branching model (e.g., main + feature branches) and when to commit.

## 5. Commit Message Style

- TODO: Format (e.g., conventional commits) and examples.

## 6. Quality Gates

- TODO: Lint, typecheck, and build commands that must pass before a phase is considered done.

## 7. Testing Rules

- TODO: What must be tested, testing tools, and minimum coverage expectations.

## 8. Documentation Rules

- TODO: When and how docs are updated; these files are the single source of truth.

## 9. Do / Don't List

- TODO: Explicit allowed and forbidden actions (e.g., no over-engineering, no unrequested files).

---

*Status: §1 (Working Agreement) approved 2026-08-02 — permanent rule in effect.
Other sections remain drafts until approved.*
