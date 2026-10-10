# CivicTrack Authentication Setup

## Requirements

- Node.js and npm
- Access to the CivicTrack Supabase project

## Install dependencies

```bash
npm install
```

## Configure environment variables

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_SUPABASE_URL` to the Supabase project URL.
3. Set `VITE_SUPABASE_PUBLISHABLE_KEY` to the project's publishable key.
4. Never put a Supabase service-role key or secret key in frontend environment variables.

## Supabase setup

1. Ensure the `profiles` table exists with `id`, `full_name`, `role`, and `created_at`.
2. Enable row-level security on `profiles`.
3. Configure the profile creation trigger for new authentication users.
4. Ensure the profile policies restrict users to their own profile.

## Run locally

```bash
npm run dev
```

## Verify the production build

```bash
npm run build
```

## Authentication files

- `src/lib/supabaseClient.js` — Supabase client.
- `src/lib/auth.js` — signup, login, logout, user, and profile helpers.
- `src/components/AuthForm.jsx` — login and signup UI.
- `src/components/AuthForm.css` — authentication form styles.
