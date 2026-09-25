# Campus Portal: Agentic AI Master Instructions

## Global Context (For All Agents)
**Project:** Front-end web application for a University Campus Portal.
**Tech Stack:** React (Vite), Tailwind CSS, React Router. (Adjust if your team prefers another stack).
**Goal:** Build a functional, responsive UI with mock data. 
**Agent Rules:** 
1. Read the existing codebase before generating new files to understand the current architecture.
2. Do not delete or overwrite the previous developer's work unless explicitly instructed or if fixing a critical bug that prevents your phase from functioning.
3. Use clean, modular components.
4. Provide a summary of your git commits at the end of your execution.

---

## Phase 1: Foundation & Core Layout (Developer 1)
**Prerequisites:** Empty directory.
**Instructions for AI:**
1. Initialize a new React project using Vite (or Next.js if preferred).
2. Install Tailwind CSS and configure `tailwind.config.js`.
3. Install a routing library (e.g., `react-router-dom`).
4. Create the base folder structure: `/src/components`, `/src/pages`, `/src/layouts`, `/src/assets`.
5. Build a `MainLayout` component that includes a persistent top Navigation Bar and a collapsible left-side Sidebar. 
6. Set up the basic router with placeholder empty pages for: `/` (Dashboard), `/login`, `/schedule`, and `/grades`.
7. Ensure the app runs without errors and renders the layout.
8. Initialize the git repository, make the initial commit, and stage the repository for Developer 2.

---

## Phase 2: Authentication & Student Dashboard (Developer 2)
**Prerequisites:** Codebase from Phase 1. 
**Instructions for AI:**
1. Analyze the existing codebase, specifically the routing setup and `MainLayout`.
2. Create an Authentication UI (`/pages/Login.jsx` and `/pages/Register.jsx`). These should be clean, modern split-screen designs. They do not need real backend logic, just form validation and mock submit functions.
3. Exclude the Auth pages from the `MainLayout` (they should not have the sidebar).
4. Build the `Dashboard.jsx` page (the `/` route). 
5. Populate the Dashboard with mock UI widgets using Tailwind CSS: a Welcome Card, a "Recent Announcements" list, and a "Quick Links" grid.
6. Verify routing flows correctly from Login to Dashboard.
7. Commit these feature additions sequentially.

---

## Phase 3: Core Academic Features (Developer 3)
**Prerequisites:** Codebase from Phase 2.
**Instructions for AI:**
1. Analyze the existing codebase, noting the design system and layout constraints.
2. Build the `/schedule` route (`Schedule.jsx`). Create a visual weekly timetable component. Populate it with mock data (e.g., "Intro to Computer Science", Monday 9:00 AM).
3. Build the `/grades` route (`Grades.jsx`). Create a responsive data table displaying a mock student transcript (Course Name, Credits, Grade, Term).
4. Add summary cards at the top of the Grades page for "Cumulative GPA" and "Total Credits".
5. Ensure these new pages fit seamlessly into the `MainLayout` created in Phase 1.
6. Commit these feature additions sequentially.

---

## Phase 4: State Management & Final Polish (Developer 4)
**Prerequisites:** Codebase from Phase 3.
**Instructions for AI:**
1. Analyze the entire codebase. Your goal is integration, responsiveness, and polish.
2. Implement a lightweight global state solution (e.g., React Context API or Zustand).
3. Create a mock "User State" that stores a dummy logged-in user. Update the Auth pages (Phase 2) to "log in" and set this state, and update the Layout/Dashboard to display the logged-in user's name.
4. Perform a mobile-responsiveness audit. Ensure the Sidebar (Phase 1) collapses into a hamburger menu on mobile, and the Grades table (Phase 3) scrolls horizontally on small screens.
5. Add UI polish: hover effects on buttons, loading states (simulated with `setTimeout`), and a generic 404 Not Found page.
6. Generate a comprehensive `README.md` detailing how to install dependencies and run the project.
7. Commit final polish and state integration.