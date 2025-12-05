# Supabase App

This project is a full-stack application using **Supabase**, with a
React frontend and an Express backend.  
The frontend no longer accesses Supabase directly — all database
operations now go through the backend.

## Demo

https://github.com/user-attachments/assets/d9f7a5a1-72f1-4e51-843a-cb63d088d760

## Project Structure

```
supabase-app/
frontend/        # React app (Rspack)
backend/         # Node + Express API (uses Supabase Service Role)
supabase/        # SQL, migrations, seed, config

```

---

## Requirements

- Node.js (LTS recommended)
- npm, pnpm, or yarn
- A Supabase project
- Supabase CLI (optional but recommended)

---

# Frontend

The frontend is a React app bundled with **Rspack**.  
It communicates with the backend via HTTP:

- `GET  /todos`
- `POST /todos`
- `PUT  /todos/:id/toggle`

The frontend does **not** use the Supabase client anymore.

### Development

```bash
cd frontend
npm install
npm run dev
```

### Build

```bash
npm run build
```

---

# Backend

The backend is a Node.js API built with **Express**.
It is responsible for **all interactions with the Supabase database**.

It uses:

- `SUPABASE_SERVICE_ROLE_KEY` for privileged server access
- `cors` and JSON middleware
- REST endpoints consumed by the frontend

### Development

```bash
cd backend
npm install
npm run start
```

---

## Environment Variables

Create a file `backend/.env` with:

```
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### ⚠️ Important: Security Warning

- The backend **must use the Service Role Key** (server-side only).
- **Never expose** the Service Role Key to the frontend.
- Enable **RLS (Row Level Security)** in Supabase when ready.
- The backend will bypass RLS as expected.

---

## API Endpoints

### `GET /todos`

Returns the full list of todos.

### `POST /todos`

Creates a new todo.

```json
{ "text": "my todo" }
```

### `PUT /todos/:id/toggle`

Inverts the `done` status for the given todo.

---

# Running the Full Stack

### 1. Start the backend

```bash
cd backend
npm run start
```

It will run at:

```
http://localhost:3000
```

### 2. Start the frontend

```bash
cd frontend
npm run dev
```

It will typically run at:

```
http://localhost:8080  (or similar)
```

### 3. Open the app

The frontend will call the backend automatically.

---

# Supabase Folder

The `supabase/` directory contains:

- SQL schema (tables, policies)
- Migrations
- Seed data
- Configuration files for Supabase CLI

---

# Notes & Next Steps

- You can extend the backend to support authentication.
- You can enable RLS once you add user-based tables.
- You may containerize both services with Docker.

If you want, I can generate:

- Docker setup (Dockerfile + docker-compose)
- RLS + Auth policies
- TypeScript version of the backend
- Production build workflow
