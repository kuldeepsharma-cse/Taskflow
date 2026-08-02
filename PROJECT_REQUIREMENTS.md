# TaskFlow — Project Requirements

> A simplified, Huly-inspired project management application.
> Version: v1.0 (MVP) · Status: Draft · Author: Project Team

---

## 1. Project Vision

TaskFlow aims to make project management simple, fast, and accessible for students,
small teams, developers, and freelancers. Inspired by Huly's clean approach to
collaboration, TaskFlow strips away enterprise complexity and focuses on the
essentials: organizing work into workspaces, projects, and tasks — and tracking
progress visually through a Kanban board.

## 2. Problem Statement

Managing projects is often over-complicated. Popular tools like Jira and
enterprise platforms are powerful but:

- **Too complex** for beginners and small teams.
- **Expensive** for students and freelancers.
- **Overwhelming** — most users only need tasks, a board, and a dashboard.
- **Time-consuming** to set up and learn.

Students and small teams need a lightweight, free, and easy-to-use tool that lets
them plan work, assign tasks, and see progress at a glance — without a steep
learning curve.

## 3. Solution

TaskFlow is a full-stack web application that provides:

- **User authentication** — sign up, log in, and secure sessions.
- **Workspaces** — isolated spaces where teams organize their work.
- **Projects** — logical containers for tasks within a workspace.
- **Tasks** — trackable work items with status, priority, and assignment.
- **Kanban board** — drag-and-drop visual task management.
- **Dashboard** — an at-a-glance overview of activity and progress.
- **User profile** — manage personal account details.

All of this in a clean, minimal, beginner-friendly interface built with a
modern full-stack stack.

## 4. Project Goals

1. Build a working, production-quality MVP with the core features listed above.
2. Keep the codebase clean, well-documented, and easy to understand.
3. Use modern, industry-standard technologies that are valuable on a resume.
4. Design for scalability — the architecture should comfortably support v2.0 features.
5. Provide a polished, professional UI that demonstrates front-end skills.
6. Complete the project within the timeline of a final-year B.Tech project.

## 5. Target Users

| User Group    | Need                                                          |
| ------------- | ------------------------------------------------------------- |
| Students      | Simple task tracking for assignments, exams, and group work.  |
| Small Teams   | Shared workspace with clear task ownership and status.        |
| Developers    | Lightweight sprint/issue tracking without heavy configuration.|
| Freelancers   | Manage client projects and deadlines in one place.            |

## 6. MVP Features (v1.0)

1. **User Authentication**
   - Sign up, login, and logout.
   - Password hashing (bcrypt).
   - Session or JWT-based authentication.
   - Protected routes (users must be logged in to access the app).

2. **Workspaces**
   - Create, view, edit, and delete workspaces.
   - Each workspace is isolated (users only see workspaces they belong to).

3. **Projects**
   - Create, view, edit, and delete projects within a workspace.
   - Projects belong to exactly one workspace.

4. **Tasks**
   - Create, edit, delete, and mark tasks as complete.
   - Task fields: title, description, status, priority, assignee, and due date.
   - Tasks belong to exactly one project.

5. **Kanban Board**
   - Visual board per project, grouped by task status
     (e.g., To Do, In Progress, Done).
   - Move tasks between columns (drag-and-drop or button-based).

6. **Dashboard**
   - Overview of the user's workspaces and recent activity.
   - Summary stats such as total tasks and tasks per status.

7. **User Profile**
   - View and edit profile details (name, email, etc.).
   - Change password.

## 7. Future Features (v2.0)

- Team member invitations and roles (Owner / Admin / Member).
- Task comments and activity history.
- Task labels, tags, and custom fields.
- File attachments on tasks.
- Notifications (in-app and email).
- Advanced dashboard with charts and analytics.
- Real-time collaboration (WebSockets).
- Dark mode and theme customization.
- Mobile responsive PWA version.
- Search and advanced filters across tasks.

## 8. Functional Requirements

### 8.1 Authentication
- FR-01: Users can register with name, email, and password.
- FR-02: Users can log in with email and password.
- FR-03: Passwords must be securely hashed before storage.
- FR-04: Logged-in users must be able to log out.
- FR-05: Protected pages must redirect unauthenticated users to the login page.

### 8.2 Workspaces
- FR-06: Authenticated users can create a workspace.
- FR-07: Authenticated users can view a list of their workspaces.
- FR-08: Workspace owners can rename or delete a workspace.
- FR-09: A user can only access workspaces they created or belong to.

### 8.3 Projects
- FR-10: Users can create a project inside a workspace.
- FR-11: Users can view all projects in a workspace.
- FR-12: Project owners can edit project details.
- FR-13: Project owners can delete a project (and its tasks).

### 8.4 Tasks
- FR-14: Users can create a task inside a project.
- FR-15: Tasks have title, description, status, priority, assignee, and due date.
- FR-16: Users can edit task fields.
- FR-17: Users can delete a task.
- FR-18: Users can change a task's status.

### 8.5 Kanban Board
- FR-19: Each project displays a Kanban board with status columns.
- FR-20: Tasks appear in the column matching their status.
- FR-21: Moving a task to another column updates its status.

### 8.6 Dashboard
- FR-22: The dashboard shows the user's workspaces with project and task counts.
- FR-23: The dashboard shows task statistics (total, to-do, in progress, done).

### 8.7 Profile
- FR-24: Users can view their profile.
- FR-25: Users can update their name and email.
- FR-26: Users can change their password.

## 9. Non-Functional Requirements

- **Performance:** Page loads should feel instant (< 2 seconds) on a standard
  connection. Database queries should be indexed and efficient.
- **Security:** Passwords hashed with bcrypt; JWT or secure sessions; API inputs
  validated and sanitized; no sensitive data exposed.
- **Usability:** Intuitive, clean UI; the core flow (create workspace → project →
  task) must be learnable in under 5 minutes.
- **Reliability:** The app should handle errors gracefully with clear messages;
  no data loss on validation failures.
- **Maintainability:** Clean, modular, documented code; consistent naming; version
  control (Git) with meaningful commits.
- **Scalability:** Separation of frontend, backend, and database so v2.0 features
  can be added without rewriting.
- **Accessibility & Responsiveness:** Usable on desktop and common screen sizes;
  semantic HTML and keyboard-friendly controls where practical.

## 10. Project Scope

**In scope (v1.0):**
- Full-stack web application with authentication.
- Single-user team model: the workspace creator manages all content
  (multi-member invitations are deferred to v2.0).
- CRUD operations for workspaces, projects, and tasks.
- Kanban board with status-based task movement.
- Dashboard and profile pages.
- Basic data validation and error handling.

**Tech stack (final — see docs/02_ARCHITECTURE.md):**
- **Frontend:** React + Vite, JavaScript, Tailwind CSS, React Router, Axios.
- **Backend:** Node.js with Express.js (REST API).
- **Database:** PostgreSQL with Prisma ORM.
- **Authentication:** JWT (JSON Web Tokens) + bcrypt.
- **Version control:** Git + GitHub.

## 11. Out of Scope (v1.0)

- Multi-user collaboration, invitations, and roles.
- Comments, mentions, and activity feeds.
- Real-time updates (WebSockets).
- File uploads and attachments.
- Email notifications.
- Advanced analytics and reporting.
- Mobile native apps.
- Payments or billing.

> Note: v2.0 features are listed in Section 7.

## 12. Success Criteria

The MVP is considered successful when:

1. A new user can register, log in, create a workspace, create a project,
   add tasks, and move them across the Kanban board — without assistance.
2. All CRUD operations persist correctly across sessions (data survives logout/relogin).
3. Authentication properly protects routes and user data.
4. The application runs with zero critical bugs during the final demonstration.
5. The codebase is clean, documented, and reproducible
   (a fresh setup can run the app by following the README).
6. The project is presentable in an interview: architecture, decisions, and
   challenges can be explained clearly.
7. The design and functionality are solid enough to extend into v2.0 features.

---

*End of document — TaskFlow MVP Requirements*
