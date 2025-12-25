# Helpdesk Ticket Management System

## Description
A comprehensive ticket management system built with React. It allows users to submit, track, and manage support tickets based on their assigned roles. The system is designed with a modern tech stack, emphasizing type safety and a clear separation of concerns.

## User Roles & Permissions
The application implements Role-Based Access Control (RBAC) to manage user permissions.

*   **Customer:**
    *   Create new support tickets.
    *   View and track the status of their own tickets.

*   **Agent:**
    *   View tickets assigned to them.
    *   Update the status of assigned tickets.

*   **Admin:**
    *   Full access to all tickets in the system.
    *   Assign tickets to available agents.
    *   Manage system settings and user roles.

## Technologies Used
*   **Frontend:** React, Vite, TypeScript
*   **Styling:** MUI (Material-UI)
*   **Routing:** React Router
*   **Server State Management:** React Query
*   **API Communication:** Axios
*   **Global State (Auth):** Context API with `useReducer`

## Key Features
*   **Type Safety:** The project is written in 100% strict TypeScript, ensuring robust and maintainable code. Error handling is managed using `unknown` and Axios type guards.
*   **Route Guards:** Secure routes are protected using role-based guards to ensure users can only access pages appropriate for their permissions.
*   **Global Authentication State:** JWT-based authentication state is managed globally using React's Context API and the `useReducer` hook for predictable state transitions.
*   **REST API Integration:** The application communicates with a backend REST API for all data operations, including authentication, ticket management, and user data retrieval.

## Installation & Setup

### Backend
The backend for this project is required for full functionality.
1.  Clone the repository from GitHub:
    ```bash
    git clone https://github.com/sarataber/helpdesk-api
    ```
2.  Follow the setup instructions provided in the backend repository's `README.md`.

### Frontend
1.  Clone the frontend repository and navigate to the project directory.
2.  Install the necessary dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173` (or the next available port).

## Project Structure
The project follows a feature-based folder structure to keep the codebase organized and scalable.

*   `src/components`: Contains reusable UI components.
    *   `features`: Components related to specific application features (e.g., `AuthForm`, `CreateTicketForm`).
    *   `LayOut`: Components that define the application's layout structure (e.g., `AppShell`, `Header`).
*   `src/context`: Holds the global state management logic, such as `AuthContext`.
*   `src/guards`: Contains the route protection logic (`AuthGuard`, `RoleGuard`).
*   `src/pages`: Top-level components for each application route/page.
*   `src/services`: Modules responsible for making API calls to the backend (e.g., `authService`, `ticketService`).
*   `src/types`: TypeScript type definitions and interfaces used throughout the application.
