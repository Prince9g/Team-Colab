Team Task Management System (Frontend)
1️⃣ Authentication & Access Control
What is being built

A secure login-based access system that allows only authorized team members to use the application.

Why this feature is required

The application is designed for internal team usage, not public users.

Task data and dashboards must be visible only to authenticated users.

Different users (Lead and Member) must see different screens.

How it is implemented

A Login page is provided instead of a public signup page.

Users are assumed to be created by a Lead/Admin.

Authentication state is managed using a centralized AuthContext.

JWT tokens are handled by the backend using HttpOnly cookies, improving security.

On app load, the frontend verifies authentication using a /auth/me API call.

Auth state is exposed globally to all components via Context API.

2️⃣ Role-Based Routing (Protected Routes)
What is being built

A routing system that restricts access to pages based on user authentication and role.

Why this feature is required

Leads and Members should not access each other’s dashboards.

Unauthenticated users must not access protected pages.

Role-based navigation improves security and UX.

How it is implemented

A reusable ProtectedRoute component wraps all secured routes.

It checks authentication state and user role from AuthContext.

Users are redirected to login if not authenticated.

If the role does not match, users are redirected to their respective dashboard.

Loading states are handled to prevent UI flicker.

3️⃣ Application Layout (Sidebar + Navbar)
What is being built

A consistent layout system that provides navigation and structure across the application.

Why this feature is required

Dashboards and task pages need a consistent UI.

Navigation should be easily accessible.

Layout should scale as more pages are added.

How it is implemented

A Layout wrapper component is created using React Router’s nested routing.

The layout contains:

A Sidebar for navigation (Dashboard, Tasks).

A Navbar for user info and actions.

The main content area uses <Outlet /> to render child pages dynamically.

This layout is reused across all protected pages.

4️⃣ Lead Dashboard
What is being built

A dashboard that provides team-level insights to Leads.

Why this feature is required

Leads need visibility into overall task progress.

High-level metrics help in monitoring productivity.

Visual summaries improve decision-making.

How it is implemented

The LeadDashboard acts as a container page.

It uses reusable UI components instead of hardcoding layouts.

StatsCard components display key metrics such as total tasks and team members.

StatusChart visually represents task distribution (Todo, In Progress, Done).

Data is currently mocked and structured to be easily replaced by API responses.

5️⃣ Member Dashboard
What is being built

A simplified dashboard focused on an individual member’s tasks.

Why this feature is required

Members do not need team-wide analytics.

They need quick insight into their own workload.

How it is implemented

MemberDashboard reuses the same StatsCard component.

It displays only personal task statistics.

No chart or team data is shown, keeping the UI clean and focused.

6️⃣ Kanban Task Board
What is being built

A Kanban-style task management board with task status tracking.

Why this feature is required

Visual task tracking improves clarity.

Status-based workflow (Todo → In Progress → Done) is intuitive.

Allows users to manage work efficiently.

How it is implemented

The Tasks page acts as the state owner for all tasks.

Tasks are grouped by status into three columns.

TaskColumn components render each status column.

TaskCard components display individual task details.

StatusButton allows valid status transitions.

State updates follow unidirectional data flow, ensuring predictable behavior.

The design is API-ready and easily extendable.