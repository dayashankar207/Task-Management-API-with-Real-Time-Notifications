📦 TaskFlow
📌 Overview

TaskFlow is a Node.js + Express REST API for managing tasks with role-based access control.
It supports task creation, assignment, updates, and deletion with real-time notifications and event broadcasting.

🔐 Authentication uses JWT Access Tokens (short-lived) and Refresh Tokens (stored in HTTP-only cookies).
🗄 PostgreSQL is used for database storage, and Redis for caching and Pub/Sub messaging.

✨ Features

🔑 User Authentication & Roles — Register, login, admin/user access control.

📝 Task Management — Create, assign, update, delete, and fetch tasks.

⚡ Real-Time Updates — Redis Pub/Sub for task event broadcasting.

🚀 Performance Optimization — Redis caching for frequently accessed queries.

🛑 Rate Limiting — Prevent abuse on critical endpoints.

⚙️ Environment Variables

Create a .env file in the root directory:

DATABASE_URL— PostgreSQL connection string.

JWT_SECRET — Secret key for signing access tokens.

JWT_REFRESH_SECRET — Secret key for signing refresh tokens.

PORT — Server port (e.g., 3000).

REDIS_URL — Redis connection URL (e.g., redis://localhost:6379).

SALT_ROUNDS — Bcrypt salt rounds (e.g., 10).

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| POST   | `/auth/register` | Register a new user          |
| POST   | `/auth/login`    | Login and receive tokens     |
| POST   | `/auth/refresh`  | Refresh access token         |
| POST   | `/auth/logout`   | Logout (clear refresh token) |

| Method | Endpoint     | Role       | Description                            |
| ------ | ------------ | ---------- | -------------------------------------- |
| POST   | `/tasks`     | User/Admin | Create a task                          |
| GET    | `/tasks/all` | User/Admin | Fetch all tasks                        |
| GET    | `/tasks/my`  | User/Admin | Fetch tasks assigned to logged-in user |
| PUT    | `/tasks/:id` | Admin      | Update a task                          |
| DELETE | `/tasks/:id` | Admin      | Delete a task                          |
