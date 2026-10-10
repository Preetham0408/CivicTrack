# CivicTrack — Civic Issue & Project Tracking Platform

CivicTrack is a web application designed to improve transparency and coordination in civic administration. It helps communities report local issues and enables teams to track civic projects, monitor progress, and access project information through a centralized platform.

## Live Demo

- **Frontend:** [View CivicTrack on Vercel](https://civic-track-brown.vercel.app/)
- **GitHub Repository:** https://github.com/Preetham0408/CivicTrack

## Features

- **User Authentication:** Sign-in and sign-up using Supabase Authentication.
- **Dashboard:** A centralized interface for viewing civic information and project summaries.
- **Civic Issue Reporting:** A planned workflow for reporting local problems such as damaged roads and footpaths.
- **Project Tracking:** REST API support for retrieving and updating project information.
- **Progress Monitoring:** Project status and progress percentage tracking.
- **Department Information:** API support for retrieving departments.
- **Responsive Interface:** A React-based interface for accessing the application through a web browser.

*Note: Feature availability depends on the current integration of the frontend, authentication, backend, and database. Not all API features are necessarily connected to the user interface yet.*

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, JavaScript, Vite |
| Styling | CSS, Tailwind CSS |
| Authentication | Supabase Auth |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Deployment | Vercel (frontend) |
| Version Control | Git and GitHub |

## Project Structure

```text
CivicTrack/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── lib/
│   │   ├── auth.js
│   │   └── supabaseClient.js
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── backend/
│   ├── app/
│   ├── server.js
│   ├── schema.sql
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── .env.example
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project locally:

- [Node.js LTS](https://nodejs.org/)
- npm
- A [Supabase](https://supabase.com/) project for authentication
- PostgreSQL, if running the backend locally

### 1. Clone the repository

```bash
git clone https://github.com/Preetham0408/CivicTrack.git
cd CivicTrack
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure Supabase

Create a `.env.local` file in the project root, in the same directory as the frontend `package.json`.

Add your Supabase project credentials:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Replace the example values with your actual Supabase project URL and publishable key.

Ensure that Supabase Authentication is configured for your project. Configure the permitted redirect URLs and email-confirmation settings according to your authentication flow.

**Security:** Never commit `.env.local`, database passwords, service-role keys, or other secrets to GitHub.

### 4. Start the frontend

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

http://localhost:5173

### 5. Configure the backend

Open a second terminal:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Edit `backend/.env` with your local PostgreSQL connection settings. Create the required database and tables according to `backend/README.md` and `backend/schema.sql`.

Start the backend using the script defined in `backend/package.json`, typically:

```bash
npm run dev
```

The backend API is expected to run on port `5000`, depending on the configured environment.

Health endpoint:

http://localhost:5000/api/health

See [`backend/README.md`](backend/README.md) for backend-specific setup instructions.

## Backend API

The backend provides REST API endpoints for civic project information.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Root endpoint |
| GET | `/api/health` | Health check |
| GET | `/api/departments` | Retrieve departments |
| GET | `/api/projects` | Retrieve projects, with optional filters |
| GET | `/api/projects/:id` | Retrieve a project |
| POST | `/api/projects` | Create a project |
| PATCH | `/api/projects/:id` | Update a project |
| GET | `/api/dashboard/summary` | Retrieve dashboard summary information |

Example project creation request:

```json
{
  "title": "Ward 7 footpath repair",
  "description": "Repair broken footpath slabs",
  "status": "planned",
  "progress_percent": 0,
  "budget_amount": 420000
}
```

For example, projects can be queried with:

```text
GET /api/projects?status=delayed&limit=20&offset=0
```

## Deployment on Vercel

The frontend can be deployed on Vercel.

1. Push the latest frontend code to GitHub.
2. Import the CivicTrack repository into [Vercel](https://vercel.com/).
3. Configure the project with the appropriate frontend root directory and build settings.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the Vercel project's environment variables.
5. Deploy the project and verify the production URL.

If the Express backend is hosted separately, configure its deployment and database connection independently. Update the frontend API base URL to point to the deployed backend and configure appropriate CORS settings.

Vercel frontend deployment does not automatically deploy the PostgreSQL database or guarantee that the backend API is publicly accessible.

## Team Development

CivicTrack is developed collaboratively using Git and GitHub.

- `main` — main project branch.
- `integration` — shared branch for integrating and testing team changes.
- Feature branches — separate branches for frontend, authentication, and backend development.

Recommended workflow:

1. Create a feature branch from the appropriate shared branch.
2. Implement and test your changes.
3. Push the branch to GitHub.
4. Open a pull request.
5. Review and test the changes before merging.

## Current Limitations

- Backend authentication and role-based permissions must be implemented and verified before public production use.
- The frontend, API, and PostgreSQL database must be configured and tested together.
- Some frontend pages or API integrations may still require completion.
- Production deployment requires appropriate security, error handling, database configuration, and access controls.

## Future Improvements

- Role-based access for citizens, departments, and administrators.
- End-to-end integration between report submission and the backend database.
- Real-time project status updates.
- Image attachments and location-based issue reporting.
- Improved analytics and project transparency.
- Automated testing and production monitoring.

## Contributing

Contributions are welcome.

1. Fork the repository or create a feature branch.
2. Make your changes.
3. Test the frontend and any affected backend functionality.
4. Submit a pull request with a clear description of the changes.

## License

No license has been specified yet. Unless a license is added to the repository, reuse and redistribution are subject to the default copyright rules.

---

**CivicTrack — Building more transparent, coordinated, and accountable communities.**
