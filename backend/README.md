# CivicTrack Node.js backend
Node.js + Express REST API with PostgreSQL. The React/Vite frontend stays in the parent project.

## Setup (Windows PowerShell)
1. Install Node.js LTS and PostgreSQL.
2. Open terminal in this `backend` folder.
3. Run `npm install`
4. Run `Copy-Item .env.example .env`
5. Edit `.env` and replace `YOUR_PASSWORD` with your PostgreSQL password. Never commit `.env`.
6. Run `schema.sql` against the `civictrack` database after your base schema has created `departments` and `locations`.
7. Run `npm run dev`

Test: http://localhost:5000/api/health

## Endpoints
- GET /
- GET /api/health
- GET /api/departments
- GET /api/projects?status=delayed&limit=20&offset=0
- GET /api/projects/:id
- POST /api/projects
- PATCH /api/projects/:id
- GET /api/dashboard/summary

Example POST body:
{"title":"Ward 7 footpath repair","description":"Repair broken footpath slabs","status":"planned","progress_percent":0,"budget_amount":420000}

This is a hackathon starter. Authentication/role permissions are not implemented; do not expose it publicly as-is.
