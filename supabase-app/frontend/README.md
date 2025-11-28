# Supabase App

This project is a full-stack application built with Supabase as the backend platform.
It is organized into two independent services:

- **Frontend:** React (using Rspack)
- **Backend:** Node.js with Express
- **Vendor:** Supabase configuration and SQL

---

## Demo

## Project Structure

```
supabase-app/
  frontend/        # React app (Rspack)
  backend/         # Node + Express API
  supabase/        # Supabase SQL, migrations, seed, config
```

---

## Requirements

- Node.js (LTS recommended)
- npm, pnpm, or yarn
- Supabase account and project
- Supabase CLI (optional)

---

## Frontend

The frontend is a React application bundled with **Rspack**.

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

## Backend

The backend is a Node.js server using Express.
It communicates with Supabase using the official Supabase JavaScript client.

### Development

```bash
cd backend
npm install
npm run start
```

### Environment Variables

Create a `.env` file in the `backend` directory:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
PORT=3000
```

The backend should always use the **service role key** for server operations that require bypassing RLS (only on trusted servers).

## Running the Full Stack

1. Start the backend server (Express).
2. Start the frontend (React + Rspack).
3. Confirm that both are properly connected to your Supabase project.

---
